'use strict';

/* global currentUser */ // From app.js

var enter = document.getElementById('enter');

/**
 * On form submission, assign the values in the form to the corresponding
 * currentUser User object properties and navigate to the map.html page.
 *
 * @param {*} e
 */
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

/**
 * Retrieves the user instance based on the entered id and auto fills the form.
 *
 */
function populateUserForm() {
  var cu = currentUser;
  enter.name.value = cu.name;
  enter.email.value = cu.email;
  enter.age.value = cu.age;
  enter.currentWeight.value = cu.currentWeight;
  enter.targetWeight.value = cu.targetWeight;
}

/**
 * Compares email against the localStorage to find an existing user instance
 * If true, prints a welcoming message to the returning user and asks to confirm the information
 * Else, prints a greeting message to a new user and asks to fill out the form
 *
 */
function userPageInit() {
  var h2 = document.createElement('h2');
  if (currentUser.userDataComplete()) {
    h2.textContent = 'Welcome back ' + currentUser.name + '! Please check if the below information is up to date!';
  } else {
    h2.textContent = 'Hello ' + currentUser.name + '! Please provide the below information!';
  }
  var greeting = document.getElementById('greeting');
  greeting.appendChild(h2);
  populateUserForm();
  enter.addEventListener('submit', onSubmit);
}

userPageInit();
