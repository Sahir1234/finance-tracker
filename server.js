const http = require('http');
const url = require('url');
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SCorp123$%^",
  database: "user_info"
});

function authenticateUser(){
  console.log("AUTHENTICTED");
}
/*
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

//create a server object:
http.createServer(function (req, res) {
  console.log(con);
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080);

