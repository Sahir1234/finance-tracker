
const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 2814;

app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log('Server Running...'));
/*
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SCorp123$%^",
  database: "user_info"
});

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
*/

