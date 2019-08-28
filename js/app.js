'use strict';

// TODO: SOC; page specific code should be in the page specific JS file.
var walk = document.getElementById('walk');
var run = document.getElementById('run');
var bike = document.getElementById('bike');

var currentUser = {};

function User(userKey, name, email) {
  var obj = JSON.parse(localStorage.getItem(userKey));
  if (obj) {
    this.name = obj.name;
    this.email = obj.email;
    this.age = obj.age;
    this.currentWeight = obj.currentWeight;
    this.targetWeight = obj.targetWeight;
  } else {
    this.name = name;
    this.email = email;
  }
}

User.prototype.exists = function() {
  return (typeof this.currentWeight === 'number');
};

User.prototype.saveToLocalStorage = function() {
  var userData = {
    name: this.name,
    email: this.email,
    age: this.age,
    targetWeight: this.targetWeight,
    currentWeight: this.currentWeight,
  };
 
  localStorage.setItem('user-' + userData.email, JSON.stringify(userData));
};

Activity.prototype.saveToLocalStorage = function() {

};

var listOfActivities = [];
var currentUser = {};
var exerciseProperties = [
  ['walk', 3.0, 2.5],
  ['run', 11, 6.7],
  ['bike', 9.3, 14]
];

function Activity(type) {
  this.type = type;
  this.distance = this.distance();
  this.duration = this.duration();
  this.calories = this.calorieCount();
  listOfActivities.push(this);
}

Activity.prototype.duration = function() {
  var speed = 0;
  // TODO: better way?
  for (var i = 0; i < exerciseProperties.length; i++) {
    if (exerciseProperties[i][0] === this.type) {
      speed = exerciseProperties[i][2];
    }
  }
  return this.distance / speed;
};

// Calories calculation test
Activity.prototype.calorieCount = function () {
  // TODO: what does met stand for?  Comment or change variable name.  Should be obvious to user.
  var met = 0;
  for (var i = 0; i < exerciseProperties.length; i++) {
    if (exerciseProperties[i][0] === this.type) {
      met = exerciseProperties[i][1];
    }
  }
  return met * currentUser.weight / 2.2 * this.duration;
};

Activity.prototype.distance = function(distance) {
  this.distance = distance;
};

function newActivity() {
  var type = event.target.id;
  new Activity(type);
  localStorage.setItem('activities-' + currentUser.email, JSON.stringify(listOfActivities));
}

// TODO: SOC; page specific code should be in the page specific JS file.
// walk.addEventListener('click', newActivity);
// run.addEventListener('click', newActivity);
// bike.addEventListener('click', newActivity);

function initCurrentUser() {
  var obj = JSON.parse(localStorage.getItem('userId'));
  var userKey = 'user-' + obj.email;
  currentUser = new User(userKey, obj.name, obj.email);
}

initCurrentUser();
