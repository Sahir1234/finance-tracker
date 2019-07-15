
const mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 2814;


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SCorp123$%^",
  database: "user_info"
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.listen(port, () => console.log('Server Running at localhost:' + port));

app.get('/', function(req, res) {
  console.log("GET /");
  res.render('index');
});

app.post('/', function(req, res) {
  console.log("POST /");
  if(req.body.action == 'signUp') {
    console.log(req.body);
    console.log("Creating Account...");
  }
  res.render('index');
});

app.post('/home', function(req, res) {
  console.log("POST /home");
  console.log(req.body);
  if(req.body.action == 'logIn') {
    if(validateCredentials()) {
      res.render('home', { firstName: 'Sahir', lastName: 'Mody' });
    } else {
      res.redirect('/');
    }
  } else if(req.body.action == 'create') {
    console.log('Creating Expense...');
  } else if(req.body.action == 'edit') {
    console.log('Editting Expense...');
  } else if(req.body.action == 'delete') {
    console.log('Deleting Expense...');
  }
  res.render('home', { firstName: 'Sahir', lastName: 'Mody' });

});

function validateCredentials() {

  return true;

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

