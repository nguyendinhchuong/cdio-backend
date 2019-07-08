var mysql = require('mysql');

var db_config = {
  host     : '172.29.64.132',
  user     : 'namtv',
  password : 'Aa123456',
  database : 'cdio_db',
}
var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function(err) {
    if (err) {
      console.log('error when connection to db: ', err);
      setTimeout(handleDisconnect,2000);
    }
  });

  connection.on('error',function(err) {
    console.log('db error: ',err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  })
}
handleDisconnect();
//connection.connect();
module.exports = connection;