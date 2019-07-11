
class Server {

  constructor() {
    const http = require('http');
    const mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "SCorp123$%^",
      database: "user_info"
    });
  }
}

con.connect(function(err) {
  if (err) throw err;
  var query = "SELECT * FROM meta_data"
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result[0].username);
    console.log('Closing Connection...');
    con.end(function(err) {
      if (err) {
        return console.log('error:' + err.message);
      }
      console.log('Closed the Database Connection Successfully!');
    });
  });
});
