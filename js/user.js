'use strict';

/* global currentUser */ // From app.js

// TODO: SOC; page specific code should be in the page specific JS file.
// Shared code should be in app.js or other purpose specific JS file.
var greeting = document.getElementById('greeting');
var enter = document.getElementById('enter');

function onSubmit(e) {
  e.preventDefault();
  var cu = currentUser;
  cu.name = e.target.name.value;
  cu.email = e.target.email.value;
  cu.age = parseInt(e.target.age.value);
  cu.currentWeight = parseInt(e.target.currentWeight.value);
  cu.targetWeight = parseInt(e.target.targetWeight.value);

  cu.saveToLocalStorage();
  location.href = 'map.html';
}

// Retrieves the user instance based on the entered id and auto fills the form
function populateUserForm() {
  // TODO: Works but this is brittle.  For example what is the form is re-ordered?  This code would also have to be changed.  Would future you know to do that?
  document.getElementsByTagName('input')[0].value = currentUser.name;
  document.getElementsByTagName('input')[1].value = currentUser.email;
  document.getElementsByTagName('input')[2].value = currentUser.age;
  document.getElementsByTagName('input')[3].value = currentUser.currentWeight;
  document.getElementsByTagName('input')[4].value = currentUser.targetWeight;
}

// Compares email against the localStorage to find an existing user instance
// If true, prints a welcoming message to the returning user and asks to confirm the information
// If true, invokes autoFill function
// Else, prints a greeting message to a new user and asks to fill out the form
function userPageInit() {
  if (currentUser.userDataComplete()) {
    var h2 = document.createElement('h2');
    greeting.appendChild(h2);
    h2.textContent = 'Welcome back ' + currentUser.name + '! Please check if the below information is up to date!';
    greeting.appendChild(h2);
  } else {
    h2 = document.createElement('h2');
    greeting.appendChild(h2);
    h2.textContent = 'Hello ' + currentUser.name + '! Please provide the below information!';
    greeting.appendChild(h2);
  }
  populateUserForm();
  enter.addEventListener('submit', onSubmit);
}

userPageInit();
