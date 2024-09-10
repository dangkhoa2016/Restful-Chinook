const db = require('./db-connection');
// const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)); };

const handleError = (ex, function_name) => {
  console.log(`[${function_name}] error`, ex); // skipcq: JS-0002
  return { status: 500, result: { error: ex.message } };
};

const extractQuery = (query) => {
  if (!query || Object.keys(query).length === 0)
    return {};
  delete query.limit;
  delete query.offset;

  // generate query where
  const params = [];
  const where = [];
  Object.keys(query).forEach(key => {
    if (key !== 'field' && key !== 'value') {
      where.push(`${key} = ?`);
      // console.log(`[extractQuery] ${key}`, query[key]);
      params.push(query[key]);
    }
  });

  return {
    where: where.join(' AND '),
    params
  };
};

class Helper {
  static async getAll(tableName, options = {}) {

    // console.log('[getAll] sleep 4s');
    // await sleep(4000);

    let { limit, offset } = options;
    if (!limit)
      limit = 10;
    if (!offset)
      offset = 0;

    const sql = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;
    // console.log(`[getAll] ${sql}`);

    const countQuery = `SELECT COUNT(*) FROM ${tableName}`;
    // console.log(`[getAll] ${countQuery}`);

    try {
      const rows = await db.asyncAll(sql, [limit, offset]);
      // console.log('rows', rows);
      const total = await db.asyncGet(countQuery);
      // console.log('total', total);

      return { status: 200, result: { rows, total: total["COUNT(*)"] } };
    } catch (ex) {
      return handleError(ex, 'getAll');
    }
  }

  static async getById(tableName, query) {
    const { where, params } = extractQuery(query);
    if (!where || !params.length)
      return { status: 400, result: { error: 'Please provide field and value' } };

    const sql = `SELECT * FROM ${tableName} where ${where}`;
    // console.log(`[getById] ${sql}`, params);

    try {
      const rows = await db.asyncGet(sql, params);
      return { status: 200, result: rows };
    } catch (ex) {
      return handleError(ex, 'getById');
    }
  }

  static async executeQuery(sql, params, countQuery, limit, offset) {
    try {
      const rows = await db.asyncAll(sql, params.concat(limit, offset));
      // console.log('[executeQuery] rows', rows);
      let total = 0;
      if (countQuery) {
        const result = await db.asyncGet(countQuery, params);
        // console.log('[executeQuery] total', result);
        total = result["COUNT(*)"];
      }
      return { status: 200, result: { rows, total } };
    } catch (ex) {
      return handleError(ex, 'executeQuery');
    }
  }
  
  getByRawQuery(query, params = [], options = {}) {
    if (!query) {
      return { status: 400, result: { error: 'Please provide query' } };
    }
  
    const { limit = 10, offset = 0 } = options;
  
    // console.log('[getByRawQuery] query', query);
    const sql = `${query} LIMIT ? OFFSET ?`;
    // console.log(`[getByRawQuery] select: ${sql}`, params.concat(limit, offset));

    const countQuery = `SELECT COUNT(*) FROM (${query})`;
    // console.log(`[getByRawQuery] count: ${countQuery}`, params);
  
    return this.executeQuery(sql, params, countQuery, limit, offset);
  }
  
  getByQuery(tableName, query, options = {}) {
    const { where, params } = extractQuery(query);
  
    const { limit = 10, offset = 0, count = true } = options;
  
    if (!where || !params.length) {
      return { status: 400, result: { error: 'Please provide field and value' } };
    }
  
    const sql = `SELECT * FROM ${tableName} WHERE ${where} LIMIT ? OFFSET ?`;
    // console.log(`[getByQuery] select: ${sql}`, params.concat(limit, offset));

    let countQuery = '';
    if (count) {
      countQuery = `SELECT COUNT(*) FROM ${tableName} WHERE ${where}`;
      // console.log(`[getByQuery] count: ${countQuery}`, params);
    }
  
    return this.executeQuery(sql, params, countQuery, limit, offset);
  }

  async checkExists(tableName, query) {
    const isExists = await this.getById(tableName, query);
  
    if (!isExists)
      return null;
  
    switch (isExists.status) {
      case 500:
        return isExists;
      case 400:
        return { status: 404, result: { error: 'Not found' } };
      case 200:
        return isExists.result ? null : { status: 404, result: { error: 'Not found' } };
      default:
        return { status: 500, result: { error: 'Unexpected status' } }; // Optional handling for unexpected statuses
    }
  }

  verifyData(tableName, data, query) {
    if (!data || Object.keys(data).length === 0)
      return { status: 422, result: { error: 'Please provide data' } };

    const { where, params } = extractQuery(query);
    if (!where || !params.length)
      return { status: 400, result: { error: 'Please provide field and value' } };

    return this.checkExists(tableName, query);
  }

  async update(tableName, data, query) {
    const hasError = await this.verifyData(tableName, data, query);
    if (hasError)
      return hasError;

    const { where, params } = extractQuery(query);

    const setFields = Object.keys(data).map(key => `${key} = ?`).join(',');
    const values = Object.values(data);
    const updateParams = [...values, ...params];

    let sql = `UPDATE ${tableName} SET ${setFields} WHERE ${where}`;
    // console.log(`[update]: ${sql}`, params);

    try {
      await db.asyncRun(sql, updateParams);
      sql = `SELECT * FROM ${tableName} WHERE ${where}`;
      const row = await db.asyncGet(sql, params);
      return { status: 200, result: row };
    } catch (ex) {
      return handleError(ex, 'update');
    }
  }

  static async delete(tableName, query) {
    const { where, params } = extractQuery(query);
    if (!where || !params.length)
      return { status: 400, result: { error: 'Please provide field and value' } };

    const sql = `DELETE FROM ${tableName} WHERE ${where}`;
    // console.log(`[delete]: ${sql}`, params);

    try {
      await db.asyncRun(sql, params);
      // const rows = await db.asyncRun(sql, params);
      // console.log('[delete] rows', rows);
      return { status: 200, result: { [params]: 'Deleted' } };
    }
    catch (ex) {
      return handleError(ex, 'delete');
    }
  }

  static async create (tableName, data) {
    if (!data || Object.keys(data).length === 0)
      return { status: 422, result: { "error": "Please provide data" } };

    const keys = Object.keys(data).join(',');
    const fields = Object.keys(data).map(() => '?').join(',');
    const values = Object.values(data);

    const sql = `INSERT INTO ${tableName} (${keys}) VALUES (${fields}) RETURNING *;`;
    // console.log(`[create] ${sql}`, values);

    try {
      const rows = await db.asyncGet(sql, values);
      // console.log('[create] rows', rows);

      /*
      // get last inserted id
      const { id } = await db.asyncGet(`SELECT last_insert_rowid() as id`);
      console.log('lastInsertId', id);
      rows.id = id;
      */

      return { status: 201, result: rows };
    } catch (ex) {
      // console.log('[create] error', ex);
      return { status: 500, result: { "error": ex.message } };
    }
  }
}

module.exports = new Helper();
