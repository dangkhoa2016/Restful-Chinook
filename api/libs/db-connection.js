const path = require('path');
const config = require('../../config');
// console.log('config', config);
const sqlite3 = require('sqlite3').verbose();
const DB_PATH = path.join(__dirname, '../..', config.DB_PATH, config.DB_NAME);
// console.log('DB_PATH', DB_PATH);

const util = require('util');

const db = new sqlite3.Database(DB_PATH);

db.asyncRun = util.promisify(db.run);
db.asyncGet = util.promisify(db.get);
db.asyncAll = util.promisify(db.all);
db.asyncClose = util.promisify(db.close);
db.asyncEach = util.promisify(db.each);
db.asyncMap = util.promisify(db.map);
db.asyncExec = util.promisify(db.exec);
db.asyncPrepare = util.promisify(db.prepare);

module.exports = db;
