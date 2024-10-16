var db = require('../api/libs/db-connection');

const tableName = 'invoices';

(async () => {
  // Retrieve column information
  db.all(`PRAGMA table_info(${tableName})`, (error, columns) => {
    if (error) {
      console.error(error);
      return;
    }

    // Display the column names
    const columnNames = columns.map(column => column.name);
    console.log(`Columns of table '${tableName}':`, columnNames); // skipcq: JS-0002
  });

  // Don't forget to close the database connection when done
  db.close();

})();
