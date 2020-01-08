
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
 * independently and multiple apps can be run at the same time. Note that when running the app locally, 
 * only one session will be created so you cannot run multiple sessions of the app when developing.
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

/**
 * YOU MUST START UP THE REDIS SERVER BEFORE YOU START THIS SERVER SO THAT THE USER DATA CAN BE LOGGED PROPERLY.
 */
app.listen(port, () => console.log('Server Running at localhost:' + port));


/**
 * NOTE: If this app is installed on your local system, you will need to change
 * this information to the data for your local MySQL databases so that the app can properly connect.
 */
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ENTERPASSWORDHERE",
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

  // Data that will be shown on the account homepage
  req.session.username = "";
  req.session.fname = "";
  req.session.lname = "";
  req.session.data = null;

  console.log("GET /");
  res.render('index', {error: null} );
});


/**
 * Main page route for when the user submits the sign-up page or the user 
 * logs out of their account.
 */
app.post('/', function(req, res) {

  console.log("POST /");

  if(req.body.action == 'signUp') {
    console.log(req.body);
    signingUp(req, res);

  } else {
    // When user logs out, erase the session information and go to the home page
    req.session.destroy((err) => {
      if(err) throw err;
      res.render('index', {error: null});
    });
  }
});


/**
 * Account homepage where users can see all of their entries and add/edit/delete any entries
 * as necessary.
 */
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


/**
 * Processes request when user submits the Sign-Up Form and creates their
 * account if the username they have selected was not taken.
 * 
 * @param {object} req HTTP POST request server receives when user submits Sign-Up form
 * @param {object} res HTTP response sent after request has been processed
 */
function signingUp (req, res) {

  console.log("Creating Account...");

  // this query checks if the username that the new user has selected has already been registered
  var checkQuery = `SELECT username FROM meta_data WHERE username = \"` + String(req.body.newUsername) + `\";`;

  con.query(checkQuery, function(err, result) {

    if (err) throw err;

    if(result.length > 0) {
      console.log('Username Taken...');
      res.render('index', {error: "*** USERNAME TAKEN. SELECT A NEW ONE! ***"});

    } else {

      // this query inserts all the data that the  user submitted as a new account
      var createAccountQuery = `INSERT INTO meta_data (first_name, last_name, username, password)
      VALUES (\"` + String(req.body.firstName) + `\" , \"` +  String(req.body.lastName) + `\" 
      , \"` +  String(req.body.newUsername) +`\" , \"` +  String(req.body.newPassword) +`\");`;
      
      con.query(createAccountQuery, function(err) {
        if(err) throw err;

        // return to the login portal once the account has been created
        res.render('index', {error: null});
      });
    }
  });
}


/**
 * Processes the request made when a user attempts to login and directs them to the correct
 * page based on whether their credentials are valid.
 * 
 * @param {object} req HTTP POST request server receives when user attempts to log in
 * @param {object} res HTTP response sent after request has been processed
 */
function loggingIn (req, res) {

  var query = `SELECT first_name, last_name FROM meta_data 
  WHERE username = \"` + String(req.body.username) + `\" AND password = \"` + String(req.body.password) + `\";`;

  con.query(query, function (err, result) {
    if (err) throw err;

    // if the query finds account matching the username and password entered, then we update the session variables
    // and the data and log in, otherwise we return to the home page
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


/**
 * Processes request and adds user's new entry to their journal with the next entry number that has not been used.
 * 
 * @param {object} req HTTP POST request server receives when user attempts to add an entry to their journal
 * @param {object} res HTTP response sent after request has been processed 
 */
function addingEntry (req, res) {

  console.log('Creating Expense...');

  // this query finds the highest entry number so that the next entry will have the next number and no entries have the same entry numbers
  var findQuery = `SELECT MAX(entry_number) 
  FROM expenses WHERE username = \"` + req.session.username + `\";`;

  con.query(findQuery, function(err, result) {
    if(err) throw err;
    var entry = 0;
    if(result.length > 0) {
      entry = result[0]['MAX(entry_number)'] + 1;
    }

    // this query adds all of the user's data to the expenses table in the DB
    var insertQuery = `INSERT INTO expenses (username,description, date, cost, entry_number) 
    VALUES (\"` + req.session.username + `\" , \"` +  String(req.body.description) + `\" 
    , \"` +  String(req.body.date) +`\" , \"` +  String(req.body.cost) +`\", ` + String(entry) + `);`;

    con.query(insertQuery, function(err) {
      if(err) throw err;
      refreshData(req, res);
    });
  });
}


/**
 * Processes request to update an existing entry with new data entered by user.
 * 
 * @param {object} req HTTP POST request server receives when user attempts to update an entry in their journal
 * @param {object} res HTTP response sent after request has been processed 
 */
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
 * Processes request to delete an entry based on its entry number entered by the user.
 * 
 * @param {object} req HTTP POST request server receives when user attempts to delete an entry from their journal
 * @param {object} res HTTP response sent after request has been processed 
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
 * Refreshes the user data and renders the accouunt home page with the new data.
 * 
 * @param {object} req HTTP POST request server receives when user performs an action on the account home page
 * @param {object} res HTTP response sent after request has been processed 
 */
function refreshData (req, res) {

  var dataQuery = `SELECT entry_number, description, cost, date FROM expenses WHERE username = \"` + req.session.username + `\";`;

  con.query(dataQuery, function (err, nextResult) {
    if(err) throw err;
    req.session.data = JSON.stringify(nextResult);
    res.render('home', { firstName: req.session.fname, lastName: req.session.lname, journalData: req.session.data });
  });
}
