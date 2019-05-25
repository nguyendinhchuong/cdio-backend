var mysql = require('mysql')

var connection = mysql.createConnection({


  host     : '172.29.64.132',
  user     : 'namtv',
  password : 'Aa123456',
  database : 'cdio_db'
  // host     : 'localhost',
  // user     : 'root',
  // password : 'hoangphupy',
  // database : 'syllabusdb'

});
connection.connect();
module.exports = connection;