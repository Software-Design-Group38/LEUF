const mysql = require('mysql2')
require('dotenv/config')

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    //port: process.env.DB_PORT
})

module.exports = db