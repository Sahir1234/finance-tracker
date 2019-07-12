// const http = require('http');
// const url = require('url');
// const mysql = require('mysql');

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

/*
const express = require('express')
const app = express()
const path = require('path')
const port = 3000

/*
* Route to render HTML Page
*
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
})

app.listen(port, () => console.log('App listening on port 3000'))
*/












const maxNameLength = 20;


function credentialsEntered (username, password) {
  if(!username) {
    alert("PLEASE ENTER A USERNAME!")
  } else if(!password) {
    alert("PLEASE ENTER A PASSWORD!")
  } else {
    return true;
  }
  return false;
}



function login() {
  var user = $( "input[type=username]" ).val();
  var pass = $( "input[type=password]" ).val();

  if(!credentialsEntered(user, pass)) {
    return;
  }
  
  var xhttp = new XMLHttpRequest();

  document.getElementById("loginPortal").style.display="none";
  document.getElementById("accountHome").style.display="block";

  var name = "GET NAME FROM SQL"

  $(document).ready(function () {
    $("#name").text(name);
  });
}



function signUp() {
  var fname = $( "input[type=firstName]" ).val();
  var lname = $( "input[type=lastName]" ).val();
  var user = $( "input[type=newUsername]" ).val();
  var pass = $( "input[type=newPassword]" ).val();

  if(!fname) {
    alert("PLEASE ENTER YOUR FIRST NAME!");
    return;
  } else if(!lname) {
    alert("PLEASE ENTER YOUR LAST NAME!");
    return;
  } else if(!credentialsEntered(user, pass)) {
    return;
  } else if(fname.length > maxNameLength ||
            lname.length > maxNameLength ||
            user.length > maxNameLength ||
            pass.length > maxNameLength.length) {
      alert("PLEASE OBEY THE 20 CHARACTER LIMIT WITH YOUR ENTRIES!");
    return;
  }

  document.getElementById('signUpForm').style.display = 'none';
  alert("SEND MESSAGE ONCE SQL DATABASE HAS BEEN CONENCTED PROPERLY AND ACCOUNT HAS SUCCESSFULLY BEEN CREATED");
}


function validEntryFields(description, cost, date) {

  if(!description || !cost || !date) {
    alert("PLEASE FILL IN ALL THE FIELDS!");
    return false;
  }

  if(description.length > 250) {
    alert("PLEASE SHORTEN YOUR DESCRIPTION OF THE EXPENSE!");
  } else if(date.length > 45) {
    alert("PLEASE SHORTEN YOUR DESCRIPTION OF THE DATE/TIME OF PURCHASE!");
  } else if(isNaN(Number(String(cost)))) {
    alert("PLEASE ENTER A VALID DOLLAR AMOUNT!");
  } else {
    return true;
  }

  return false;
}


function submitNewExpense() {
  var description = $( "input[type=description]" ).val();
  var cost = $( "input[type=cost]" ).val();
  var date = $( "input[type=date]" ).val();

  if(!validEntryFields(description, cost, date)) {
    return;
  }

  document.getElementById("newExpense").style.display="none";
  alert("SQL RESPONSE ONCE EXPENSE HAS BEEN ADDED TO THE DATABASE");

}


function submitEdittedExpense() {
  var entry = $( "input[type=editEntry]" ).val();
  var description = $( "input[type=editDescription]" ).val();
  var cost = $( "input[type=editCost]" ).val();
  var date = $( "input[type=editDate]" ).val();

  if(!entry) {
    alert("PLEASE ENTER THE ENTRY NUMBER!");
    return;
  } else if(isNaN(parseInt(Number(String(entry))))) {
    alert("PLEASE ENTER A VALID ENTRY NUMBER!")
    return;
  } else if(!validEntryFields(description, cost, date)) {
    return;
  }

  document.getElementById("editExpense").style.display="none";
  alert("SQL RESPONSE ONCE EXPENSE HAS BEEN CHANGED IN THE DATABASE");
}


