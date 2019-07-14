// maximum number of characters allowed in names and passwords
const maxNameLength = 20;

/*
Animation for the tabs on the page
*/
function openPage(pageName, element) {
  var i, tabContent, tablinks;
  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabLinks = document.getElementsByClassName("tabLink");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  element.style.backgroundColor = "lightblue";
}

/*

*/
function signUpVerify(form) {
  var fname = form.firstName.value;
  var lname = form.lastName.value;
  var user = form.newUsername.value;
  var pass = form.newPassword.value;

  if(fname.length > maxNameLength ||
            lname.length > maxNameLength ||
            user.length > maxNameLength ||
            pass.length > maxNameLength.length) {
      alert("PLEASE OBEY THE 20 CHARACTER LIMIT WITH YOUR ENTRIES!");
    return false;
  } else {
    return true;
  }

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
    return false;
  }

  document.getElementById("newExpense").style.display="none";
  return true;

}


function submitEdittedExpense() {
  var entry = $( "input[type=editEntry]" ).val();
  var description = $( "input[type=editDescription]" ).val();
  var cost = $( "input[type=editCost]" ).val();
  var date = $( "input[type=editDate]" ).val();

  if(!entry) {
    alert("PLEASE ENTER THE ENTRY NUMBER!");
    return false;
  } else if(isNaN(parseInt(Number(String(entry))))) {
    alert("PLEASE ENTER A VALID ENTRY NUMBER!")
    return false;
  } else if(!validEntryFields(description, cost, date)) {
    return false;
  }

  document.getElementById("editExpense").style.display="none";
  return true;
}

function submitDeletedExpense() {
  var entry = $( "input[type=deleteEntry]" ).val();
  if(!entry) {
    alert("PLEASE ENTER THE ENTRY NUMBER!");
    return false;
  } else if(isNaN(parseInt(Number(String(entry))))) {
    alert("PLEASE ENTER A VALID ENTRY NUMBER!")
    return false;
  }

  document.getElementById("deleteExpense").style.display="none";
  return true;
}

