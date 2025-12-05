const sqlite = require('sqlite3');
const db = new sqlite.Database('3alemny.db')

const createUserTable = `CREATE TABLE IF NOT EXISTS USER (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT NOT NULL,   
    EMAIL TEXT UNIQUE NOT NULL,
    ROLE TEXT NOT NULL,
    PASSWORD TEXT NOT NULL
)`;

module.exports = {
    db,
    createUserTable,
};

