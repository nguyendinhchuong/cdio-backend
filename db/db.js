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
    connection = mysql.createConnection(db_config);
      connection.connect(function(err) {
        if (err) {
          console.log('error when connection to db: ', err);
          //setTimeout(handleDisconnect,2000);
        }
      });
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('> Re-connecting lost main MySQL connection: ' + err.stack);

      connection = mysql.createConnection(db_config);
      connection.connect(function(err) {
        if (err) {
          console.log('error when connection to db: ', err);
          //setTimeout(handleDisconnect,2000);
        }
      });
    } else {
      throw err;
    }
  })
}
handleDisconnect();
//connection.connect();
module.exports = connection;