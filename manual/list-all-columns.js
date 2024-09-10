const db = require('../api/libs/db-connection');

const tableName = 'invoices';

const run = () => {
  return new Promise((resolve, reject) => {
    db.all(`PRAGMA table_info(${tableName})`, (error, columns) => {
      if (error) {
        reject(error);
        return;
      }

      const columnNames = columns.map(column => column.name);
      resolve(columnNames);
    });
  });
}

(async () => {
  await run()
    .then(columnNames => {
      console.log(`Columns of table '${tableName}':`, columnNames); // skipcq: JS-0002
      db.close();
    })
    .catch(error => {
      console.error(error);
      db.close();
    });
})();
