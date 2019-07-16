// maximum number of characters allowed in names and passwords
const maxNameLength = 20;

/**
 * Animation for the tabs on the main page
 * 
 * @param {}
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

/**
 * Checks to make sure that all of the information used to sign up
 * is within the character limit of the SQL database
 * 
 * @param {form element}: 
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
 * 
 * 
 * @param {*} description 
 * @param {*} cost 
 * @param {*} date 
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
 * 
 * @param {*} form 
 * @return {boolean} true if all of the values have been filled in for submitting 
 * a new expense, false otherwise
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
 * 
 * 
 * @param {*} form 
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
 * Checks that the entry number entered in the form to delete an expense is
 * valid and 
 * 
 * @param {*} form 
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
