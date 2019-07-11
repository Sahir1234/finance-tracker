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

  alert(user);
  alert(pass);
  alert('NOT RECOGNIZED, ACCESS NOT APPROVED');
}

function signUp() {
  var fname = $( "input[type=firstName]" ).val();
  var lname = $( "input[type=lastName]" ).val();
  var user = $( "input[type=newUsername]" ).val();
  var pass = $( "input[type=newPassword]" ).val();

  if(!fname) {
    alert("PLEASE ENTER YOUR FIRST NAME!");
    return;
  else if(!lname) {
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
