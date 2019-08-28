'use strict';

// TODO: SOC; page specific code should be in the page specific JS file.
var walk = document.getElementById('walk');
var run = document.getElementById('run');
var bike = document.getElementById('bike');

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
walk.addEventListener('click', newActivity);
run.addEventListener('click', newActivity);
bike.addEventListener('click', newActivity);
