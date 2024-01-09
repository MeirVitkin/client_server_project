const mySql = require('mySql2/promise');
require("dotenv").config();

const pool = mySql.createPool({
    host: 'localhost',
    user: 'root',
    database: "data_base",
    password: process.env.SQL_PASSWORD || "123456"
})

module.exports = pool;