
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const redis = require('redis');
const client = redis.createClient();
const bodyParser = require('body-parser');
const app = express();
const port = 2814;

/**
 * We set the Express view engine so that it reads HTML files and uses the stylesheet
 * and client-side scripts found in the public directory.
 */
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

/**
 * We set up the session so that it connects to the Redis server so that each session saves its variables
 * independently and multiple apps can be run at the same time. YOU MUST  START UP THE REDIS SERVER BEFORE
 * YOU START THIS SERVER SO THAT THE USER DATA CAN BE LOGGED PROPERLY.
 */
app.use(session({
  secret: "Shh, its a secret!", 
  saveUninitialized: true, 
  resave: false,
  store: new redisStore({ host: 'localhost', port: 6379, client: client}),
  cookie: {
    maxAge: Date.now() + (7 * 24 * 60 * 60 * 1000)
  }
}));

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
 * Main page route for when the user first visits the site.
 */
app.get('/', function(req, res) {
  console.log(req.session);
  req.session.username = "";
  req.session.fname = "";
  req.session.lname = "";
  req.session.data = null;
  console.log("GET /");
  res.render('index', {error: null} );
});

/**
 * Main page route for when the user submits the sign-up page or the user logs out of 
 * 
 */
app.post('/', function(req, res) {
  console.log("POST /");
  if(req.body.action == 'signUp') {
    console.log(req.body);
    signingUp(req, res);
  } else {
    req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.render('index', {error: null});
    });
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
      req.session.username = req.body.username;
      req.session.fname = result[0].first_name;
      req.session.lname = result[0].last_name;
      refreshData(req, res);
    } else {
      res.redirect('/');
    }
  });
}

function addingEntry (req, res) {
  console.log('Creating Expense...');

  var findQuery = `SELECT MAX(entry_number) 
  FROM expenses WHERE username = \"` + req.session.username + `\";`;

  con.query(findQuery, function(err, result) {
    if(err) throw err;
    var entry = 0
    if(result.length > 0) {
      entry = result[0]['MAX(entry_number)'] + 1;
    }
    var insertQuery = `INSERT INTO expenses (username,description, date, cost, entry_number) 
    VALUES (\"` + req.session.username + `\" , \"` +  String(req.body.description) + `\" 
    , \"` +  String(req.body.date) +`\" , \"` +  String(req.body.cost) +`\", ` + String(entry) + `);`;

    con.query(insertQuery, function(err) {
      if(err) throw err;
      refreshData(req, res);
    });
  });
}

function updatingEntry (req, res) {
  console.log('Editting Expense...');
  var query = `UPDATE expenses
  SET description = \"` + String(req.body.editDescription) + `\", date = \"` + String(req.body.editDate) + `\", cost = \"` + String(req.body.editCost) + `\"
  WHERE username = \"` + req.session.username + `\" AND entry_number = ` + String(req.body.editEntry) + `;`;
  con.query(query, function (err) {
    if (err) throw err;
    refreshData(req, res);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deletingEntry (req, res) {
  console.log('Deleting Expense...');
  var query = `DELETE FROM expenses 
  WHERE username = \"` + req.session.username + `\" AND entry_number = ` + String(req.body.deleteEntry) + `;`;
  con.query(query, function (err) {
    if (err) throw err;
    refreshData(req, res);
  });
}

/**
 * Refreshes the user data and renders the home page with the new data.
 * 
 * @param {object} req HTTP response 
 * @param {object} res HTTP response 
 */
function refreshData (req, res) {
  var dataQuery = `SELECT entry_number, description, cost, date FROM expenses WHERE username = \"` + req.session.username + `\";`;
  con.query(dataQuery, function (err, nextResult) {
    if(err) throw err;
    req.session.data = JSON.stringify(nextResult);
    res.render('home', { firstName: req.session.fname, lastName: req.session.lname, journalData: req.session.data });
  });
}
