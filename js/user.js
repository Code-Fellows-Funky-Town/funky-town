'use strict';

var greeting = document.getElementById('greeting');
var enter = document.getElementById('enter');
var currentUser = JSON.parse(localStorage.getItem('userId'));
var userEmail = 'user-' + currentUser.email;

function User(name, email, age, currentWeight, targetWeight) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.currentWeight = currentWeight;
    this.targetWeight = targetWeight;
}

function updateUser(e) {
    e.preventDefault();
    userData = {
        name: e.target.name.value,
        email: e.target.email.value,
        age: parseInt(e.target.age.value),
        currentWeight: parseInt(e.target.currentWeight.value),
        targetWeight: parseInt(e.target.targetWeight.value),
    };
    localStorage.setItem('user-' + userData.email, JSON.stringify(userData));
    location.href = 'map.html';
}

function newUser(e) {
    e.preventDefault();
    var name = e.target.name.value;
    var email = e.target.email.value;
    var age = parseInt(e.target.age.value);
    var currentWeight = parseInt(e.target.currentWeight.value);
    var targetWeight = parseInt(e.target.targetWeight.value);
    var newUser = new User(name, email, age, currentWeight, targetWeight);
    localStorage.setItem('user-' + newUser.email, JSON.stringify(newUser));
    location.href = 'map.html';
}

// Retrieves the user instance based on the entered id and auto fills the form
function autoFill() {
    document.getElementsByTagName('input')[0].value = userData.name;
    document.getElementsByTagName('input')[1].value = userData.email;
    document.getElementsByTagName('input')[2].value = userData.age;
    document.getElementsByTagName('input')[3].value = userData.currentWeight;
    document.getElementsByTagName('input')[4].value = userData.targetWeight;
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
    h2.textContent = 'Hello ' + currentUser.name + '! Please provide the below infomration!';
    greeting.appendChild(h2);
    document.getElementsByTagName('input')[0].value = currentUser.name;
    document.getElementsByTagName('input')[1].value = currentUser.email;
    enter.addEventListener('submit', newUser);
}