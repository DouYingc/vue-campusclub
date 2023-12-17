const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jxy123321',
  database: 'campusclubs_data',
  useConnectionPooling: true,
  debug: true
})


module.exports = db