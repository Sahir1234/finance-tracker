
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 2814;

/**
 * These global variables store data for the user currently logged in. However, this makes 
 * having multiple sessions of the app running at the same time dangerous because the threads
 * will interfere with this data. This is one limitation of the app in its current version that
 * I plan to fix in future updates by incoroporating Express sessions.
 */
var username = "";
var fname = "";
var lname = "";
var data = null;

/**
 * We set the Express view engine so that it reads HTML files and uses the stylesheet
 * and client-side scripts found in the public directory.
 */
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(session({secret: "Shh, its a secret!", saveUninitialized: false, resave: false}));

/**
 * Body parser allows us to read HTTP requests for information
 */
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.listen(port, () => console.log('Server Running at localhost:' + port));


/**
 * NOTE: If this app is installed on your local system, you will need to change
 * this information to the data for your local MySQL databases so that the app can properly connect.
 */
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SCorp123$%^",
  database: "user_info"
});

con.connect(function(err) {
  if(err) throw err;
});


/**
 * 
 */
app.get('/', function(req, res) {
  username = "";
  fname = "";
  lname = "";
  data = null;
  console.log("GET /");
  res.render('index', {error: null} );
});

app.post('/', function(req, res) {
  username = "";
  fname = "";
  lname = "";
  data = null;
  console.log("POST /");
  if(req.body.action == 'signUp') {
    console.log(req.body);
    signingUp(req, res);
  } else {
    res.render('index', {error: null});
  }
});

app.post('/home', function(req, res) {
  console.log("POST /home");
  console.log(req.body);

  if(req.body.action == 'logIn') {
    loggingIn(req, res);

  } else if(req.body.action == 'create') {
    addingEntry(req, res);

  } else if(req.body.action == 'edit') {
    updatingEntry(req, res);

  } else if(req.body.action == 'delete') {
    deletingEntry(req, res);
  }
});

function signingUp (req, res) {
  if(req.body.action == 'signUp') {
    console.log("Creating Account...");
    var checkQuery = `SELECT username FROM meta_data WHERE username = \"` + String(req.body.newUsername) + `\";`;
    con.query(checkQuery, function(err, result) {
      if (err) throw err;
      if(result.length > 0) {
        console.log('Username Taken...');
        res.render('index', {error: "*** USERNAME TAKEN. SELECT A NEW ONE! ***"});
      } else {
        var createAccountQuery = `INSERT INTO meta_data (first_name, last_name, username, password)
        VALUES (\"` + String(req.body.firstName) + `\" , \"` +  String(req.body.lastName) + `\" 
        , \"` +  String(req.body.newUsername) +`\" , \"` +  String(req.body.newPassword) +`\");`;
        con.query(createAccountQuery, function(err) {
          if(err) throw err;
          res.render('index', {error: null});
        });
      }
    });
  }
}

function loggingIn (req, res) {
  var query = `SELECT first_name, last_name FROM meta_data 
  WHERE username = \"` + String(req.body.username) + `\" AND password = \"` + String(req.body.password) + `\";`;
  con.query(query, function (err, result) {
    if (err) throw err;
    if(result.length  > 0){
      username = req.body.username;
      fname = result[0].first_name;
      lname = result[0].last_name;
      refreshData(res);
    } else {
      res.redirect('/');
    }
  });
}

function addingEntry (req, res) {
  console.log('Creating Expense...');

  var findQuery = `SELECT MAX(entry_number) 
  FROM expenses WHERE username = \"` + username + `\";`;

  con.query(findQuery, function(err, result) {
    if(err) throw err;
    var entry = 0
    if(result.length > 0) {
      entry = result[0]['MAX(entry_number)'] + 1;
    }
    var insertQuery = `INSERT INTO expenses (username,description, date, cost, entry_number) 
    VALUES (\"` + username + `\" , \"` +  String(req.body.description) + `\" 
    , \"` +  String(req.body.date) +`\" , \"` +  String(req.body.cost) +`\", ` + String(entry) + `);`;

    con.query(insertQuery, function(err) {
      if(err) throw err;
      refreshData(res);
    });
  });
}

function updatingEntry (req, res) {
  console.log('Editting Expense...');
  var query = `UPDATE expenses
  SET description = \"` + String(req.body.editDescription) + `\", date = \"` + String(req.body.editDate) + `\", cost = \"` + String(req.body.editCost) + `\"
  WHERE username = \"` + username + `\" AND entry_number = ` + String(req.body.editEntry) + `;`;
  con.query(query, function (err) {
    if (err) throw err;
    refreshData(res);
  });
}

function deletingEntry (req, res) {
  console.log('Deleting Expense...');
  var query = `DELETE FROM expenses 
  WHERE username = \"` + username + `\" AND entry_number = ` + String(req.body.deleteEntry) + `;`;
  con.query(query, function (err) {
    if (err) throw err;
    refreshData(res);
  });
}

/**
 * 
 * 
 * @param {object} res HTTP response 
 */
function refreshData (res) {
  var dataQuery = `SELECT entry_number, description, cost, date FROM expenses WHERE username = \"` + username + `\";`;
  con.query(dataQuery, function (err, nextResult) {
    if(err) throw err;
    data = JSON.stringify(nextResult);
    res.render('home', { firstName: fname, lastName: lname, journalData: data });
  });
}
