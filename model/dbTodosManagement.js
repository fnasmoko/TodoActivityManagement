const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'todos_management'
})

module.exports = db