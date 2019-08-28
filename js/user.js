'use strict';

// TODO: SOC; page specific code should be in the page specific JS file.
// Shared code should be in app.js or other purpose specific JS file.
var greeting = document.getElementById('greeting');
var enter = document.getElementById('enter');

var currentUser = JSON.parse(localStorage.getItem('userId'));
var userEmail = 'user-' + currentUser.email;

function User(name, email, age, weight) {
  this.name = name;
  this.email = email;
  this.age = age;
  this.weight = weight;
}

// TODO: SOC; event handlers should be on page specific script, then call.
function updateUser(e) {
  e.preventDefault();
  userData = {
    name: e.target.name.value,
    email: e.target.email.value,
    age: parseInt(e.target.age.value),
    weight: parseInt(e.target.weight.value)
  };
  // TODO: Objects should update local storage with a single method for that specific purpose.
  localStorage.setItem('user-' + userData.email, JSON.stringify(userData));
  location.href = 'map.html';
}

function newUser(e) {
  e.preventDefault();
  var name = e.target.name.value;
  var email = e.target.email.value;
  var age = parseInt(e.target.age.value);
  var weight = parseInt(e.target.weight.value);
  var newUser = new User(name, email, age, weight);
  // TODO: Objects should update local storage with a single method for that specific purpose.
  localStorage.setItem('user-' + newUser.email, JSON.stringify(newUser));
  location.href = 'map.html';
}

// Retrieves the user instance based on the entered id and auto fills the form
function autoFill() {
  // TODO: Works but this is brittle.  For example what is the form is re-ordered?  This code would also have to be changed.  Would future you know to do that?
  document.getElementsByTagName('input')[0].value = userData.name;
  document.getElementsByTagName('input')[1].value = userData.email;
  document.getElementsByTagName('input')[2].value = userData.age;
  document.getElementsByTagName('input')[3].value = userData.weight;
}

// Compares email against the localStorage to find an existing user instance
// If true, prints a welcoming message to the returning user and asks to confirm the information
// If true, invokes autoFill function
// Else, prints a greeting message to a new user and asks to fill out the form
if (localStorage.getItem(userEmail)) {
  var h2 = document.createElement('h2');
  greeting.appendChild(h2);
  h2.textContent = 'Welcome back ' + currentUser.name + '! Please check if the below information is up to date!';
  greeting.appendChild(h2);
  var userData = JSON.parse(localStorage.getItem(userEmail));
  autoFill();
  enter.addEventListener('submit', updateUser);
} else {
  h2 = document.createElement('h2');
  greeting.appendChild(h2);
  h2.textContent = 'Hello ' + currentUser.name + '! Please provide the below information!';
  greeting.appendChild(h2);
  document.getElementsByTagName('input')[0].value = currentUser.name;
  document.getElementsByTagName('input')[1].value = currentUser.email;
  enter.addEventListener('submit', newUser);
}