var mysql = require('mysql')

var connection = mysql.createConnection({


  // host     : '172.29.64.132',
  // user     : 'namtv',
  // password : 'Aa123456',
  // database : 'cdio_db',
  // user     : 'root',
  // password : 'hoangphupy',
  // database : 'syllabusdb'
  host     : 'localhost',
  user     : 'root',
  password : 'mug3nnsx',
  database : 'cdio_db'

});
connection.connect();
module.exports = connection;