'use strict';

var walk = document.getElementById('walk');
var run = document.getElementById('run');
var bike = document.getElementById('bike');
var listOfActivities = [];
var currentUser = {};
var excersiceProperties = [
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
  for (var i = 0; i < excersiceProperties.length; i++) {
    if (excersiceProperties[i][0] === this.type) {
      speed = excersiceProperties[i][2];
    }
  }
  return this.distance / speed;
};

// Calories calculation test
Activity.prototype.calorieCount = function() {
  var met = 0;
  for (var i = 0; i < excersiceProperties.length; i++) {
    if (excersiceProperties[i][0] === this.type) {
      met = excersiceProperties[i][1];
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

walk.addEventListener('click', newActivity);
run.addEventListener('click', newActivity);
bike.addEventListener('click', newActivity);
