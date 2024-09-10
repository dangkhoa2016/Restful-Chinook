const db = require('./db-connection');

const extractQuery = (query) => {
  // generate query where
  const params = [];
  const where = [];
  Object.keys(query).forEach(key => {
    if (key != 'field' && key != 'value') {
      where.push(`${key} = ?`);
      console.log(`[extractQuery] ${key}`, query[key]);
      params.push(query[key]);
    }
  });

  return {
    where: where.join(' AND '),
    params: params
  };
};

const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)); };

class Helper {
  async getAll(tableName, options = {}) {

    // console.log('[getAll] sleep 4s');
    // await sleep(4000);

    let { limit, offset } = options;
    if (!limit)
      limit = 10;
    if (!offset)
      offset = 0;

    const sql = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;
    console.log(`[getAll] ${sql}`);

    const countQuery = `SELECT COUNT(*) FROM ${tableName}`;
    console.log(`[getAll] ${countQuery}`);

    try {
      const rows = await db.asyncAll(sql, [limit, offset]);
      console.log('rows', rows);
      const total = await db.asyncGet(countQuery);
      console.log('total', total);

      return { status: 200, result: { "rows": rows, "total": total["COUNT(*)"] } };
    } catch (ex) {
      return { status: 500, result: { "error": ex.message } };
    }
  }

  async getById(tableName, query) {
    const { where, params } = extractQuery(query);
    if (!where || !params.length)
      return { status: 400, result: { "error": "Please provide field and value" } };

    const sql = `SELECT * FROM ${tableName} where ${where}`;
    console.log(`[getById] ${sql}`, params);

    try {
      const rows = await db.asyncGet(sql, params);
      return { status: 200, result: rows };
    } catch (ex) {
      return { status: 500, result: { "error": ex.message } };
    }
  }

  async getByRawQuery(query) {
    if (!query)
      return { status: 400, result: { "error": "Please provide query" } };

    console.log('[getByRawQuery] query', query);

    try {
      const rows = await db.asyncAll(query);
      return { status: 200, result: rows };
    } catch (ex) {
      return { status: 500, result: { "error": ex.message } };
    }
  }

  async getByQuery(tableName, query) {
    const { where, params } = extractQuery(query);
    if (!where || !params.length)
      return { status: 400, result: { "error": "Please provide field and value" } };

    const sql = `SELECT * FROM ${tableName} where ${where}`;
    console.log(`[getByQuery] select: ${sql}`, params);
    const countQuery = `SELECT COUNT(*) FROM ${tableName} where ${where}`;
    console.log(`[getByQuery] count: ${countQuery}`, params);

    try {
      const rows = await db.asyncGet(sql, params);
      console.log('[getByQuery] rows', rows);
      const total = await db.asyncGet(countQuery, params);
      console.log('[getByQuery] total', total);
      return { status: 200, result: { "rows": rows, "total": total["COUNT(*)"] } };
    } catch (ex) {
      return { status: 500, result: { "error": ex.message } };
    }
  }

  async create(tableName, data) {
    if (!data || Object.keys(data).length === 0)
      return { status: 422, result: { "error": "Please provide data" } };

    const keys = Object.keys(data).join(',');
    const fields = Object.keys(data).map(() => '?').join(',');
    const values = Object.values(data);

    const sql = `INSERT INTO ${tableName} (${keys}) VALUES (${fields}) RETURNING *;`;
    console.log(`[create] ${sql}`, values);

    try {
      const rows = await db.asyncGet(sql, values);
      console.log('[create] rows', rows);
      /*
      // get last inserted id
      const { id } = await db.asyncGet(`SELECT last_insert_rowid() as id`);
      console.log('lastInsertId', id);
      rows.id = id;
      */
      return { status: 201, result: rows };
    } catch (ex) {
      console.log('[create] error', ex);
      return { status: 500, result: { "error": ex.message } };
    }
  }

  async update(tableName, data, query) {
    if (!data)
      return { status: 422, result: { "error": "Please provide data" } };

    let { where, params } = extractQuery(query);
    if (!where || !params.length)
      return { status: 400, result: { "error": "Please provide field and value" } };

    const isExists = await this.getById(tableName, query);
    if (isExists.status === 500)
      return isExists;
    else if (isExists.status === 400)
      return { status: 404, result: { "error": "Not found" } };
    else if (isExists.status === 200 && !isExists.result)
      return { status: 404, result: { "error": "Not found" } };

    const setFields = Object.keys(data).map(key => `${key} = ?`).join(',');
    if (Object.keys(data).length === 0)
      return { status: 422, result: { "error": "Please provide data" } };

    const values = Object.values(data);
    const updateParams = [...values, ...params];

    let sql = `UPDATE ${tableName} SET ${setFields} WHERE ${where}`;
    console.log(`[update]: ${sql}`, params);

    try {
      await db.asyncRun(sql, updateParams);
      sql = `SELECT * FROM ${tableName} WHERE ${where}`;
      const row = await db.asyncGet(sql, params);
      return { status: 200, result: row };
    } catch (ex) {
      console.log('[update] error', ex);
      return { status: 500, result: { "error": ex.message } };
    }
  }

  async delete(tableName, query) {
    const { where, params } = extractQuery(query);
    if (!where || !params.length)
      return { status: 400, result: { "error": "Please provide field and value" } };

    const sql = `DELETE FROM ${tableName} WHERE ${where}`;
    console.log(`[delete]: ${sql}`, params);

    try {
      const rows = await db.asyncRun(sql, params);
      console.log('[delete] rows', rows);
      return { status: 200, result: { [params]: 'Deleted' } };
    }
    catch (ex) {
      return { status: 500, result: { "error": ex.message } };
    }
  }
}

module.exports = new Helper();
