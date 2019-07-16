// maximum number of characters allowed in names and passwords
const maxNameLength = 20;

/**
 * Animation for the tabs on the main page
 * 
 * @param {string} pageName name of the page that needs to be diplayed after the tab click
 * @param {HTML Element} element the tab button that got clicked
 */
function openPage(pageName, element) {
  var i, tabContent, tablinks;

  // clear the pages and the tab colors so they can be reset
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



/**
 * Checks to make sure that all of the information used to sign up
 * is within the character limit of the SQL database fields
 * 
 * @param {HTML element} form where user enters data and where we read it from
 * @return {boolean} true all of the fields are within the correct limits and false otherwise
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

/**
 * Checks if the fields entered in one of the forms to modify journal data are
 * within the character limits of the SQL database fields
 * 
 * @param {string} description description of the purchase
 * @param {string} cost cost of the item purchased
 * @param {string} date date of purchase
 * @return {boolean} true all of the fields are within the correct limits and false otherwise
 */
function validEntryFields(description, cost, date) {

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


/**
 * Makes sure that the new expense submitted by a user conforms to the character limits of the
 * SQL Database and returns true if they do, false otherwise. It then closes the form if the
 * submissions are valid
 * 
 * @param {HTML Element} form where user enters description of purchase, cost of purchase
 * and date of puerchase
 * @return {boolean} true if all of the values have a correct number of characters, false otherwise
 */
function checkNewExpense(form) {
  var description = form.description.value;
  var cost =  form.cost.value;
  var date = form.date.value;

  if(!validEntryFields(description, cost, date)) {
    return false;
  }

  document.getElementById("newExpense").style.display="none";
  return true;

}


/**
 * Checks that all of the user inputs for editting an entry are valid within the constraints
 * of the SQL database and closes the expense editting form if they are
 * 
* @param {HTML Element} form where user enters description of purchase, cost of purchase
 * and date of puerchase
 * @return {boolean} true if all of the values entered are valid for the database, false otherwise
 */
function checkEdittedExpense(form) {
  var entry = form.editEntry.value;
  var description = form.editDescription.value;
  var cost = form.editCost.value;
  var date = form.editDate.value;

   if(isNaN(parseInt(Number(String(entry))))) {
    alert("PLEASE ENTER A VALID ENTRY NUMBER!")
    return false;
  } else if(!validEntryFields(description, cost, date)) {
    return false;
  }

  document.getElementById("editExpense").style.display="none";
  return true;
}


/**
 * Checks that the entry number entered in the form to delete an expense is an actual number and closes 
 * the deletion form if it is.
 * 
 * @param {HTML Element} form where user enters the entry number they wish to delete
 * @return {boolean} true if the user has entered a valid entry number and false otherwise
 */
function checkDeletedExpense(form) {
  var entry = form.deleteEntry.value;
  if(isNaN(parseInt(Number(String(entry))))) {
    alert("PLEASE ENTER A VALID ENTRY NUMBER!")
    return false;
  }

  document.getElementById("deleteExpense").style.display="none";
  return true;
}
