'use strict';

var currentUser = {};

function User(name, email, age, currentWeight, targetWeight) {
  var userKey = 'user-' + email;
  var obj = JSON.parse(localStorage.getItem(userKey));
  this.activityList = [];
  if (obj) {
    this.name = obj.name;
    this.email = obj.email;
    this.age = obj.age;
    this.currentWeight = obj.currentWeight;
    this.targetWeight = obj.targetWeight;
    this.loadActivities();
  } else {
    this.name = name;
    this.email = email;
    this.age = age;
    this.currentWeight = currentWeight;
    this.targetWeight = targetWeight;
    this.saveToLocalStorage();
  }
  currentUser = this;
}

User.prototype.activitiesKey = function () {
  return 'activities-' + this.email;
};

User.prototype.userKey = function () {
  return 'user-' + this.email;
};

/**
 * To be called only by the User constructor.
 *
 */
User.prototype.loadActivities = function() {
  if (this.email) {
    var key = this.activitiesKey();
    var arr = JSON.parse(localStorage.getItem(key));
    if (arr) {
      this.activityList = [];
      for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        var act = new Activity();
        act.type = obj.type;
        act.distance = obj.distance;
        this.activityList.push(act);
      }
    }
  }
};

User.prototype.saveActivityList = function() {
  if (this.email && this.activityList.length > 0) {
    var key = this.activitiesKey();
    var str = JSON.stringify(this.activityList);
    localStorage.setItem(key, str);
  }
};

User.prototype.addActivity = function(activity) {
  this.activityList.push(activity);
  this.saveActivityList();
};

User.prototype.userDataComplete = function() {
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
  localStorage.setItem(this.userKey(), JSON.stringify(userData));
  this.saveActivityList();
};

/**
 * Nested array index:
 * 0 - Activity type
 * 1 - Average MET - Metabolic Equivalent of Task
 * 2 - Average speed in miles per hour
 */
var exerciseProperties = [
  ['walk', 3.0, 2.5],
  ['run', 11, 6.7],
  ['bike', 9.3, 14]
];

/**
 * Activity constructor function
 *
 * @param {*} type
 * @param {*} distance
 */
function Activity(type, distance) {
  this.type = type;
  this.distance = distance;
}

Activity.prototype.timeInHours = function() {
  var speed = 0;
  for (var i = 0; i < exerciseProperties.length; i++) {
    if (exerciseProperties[i][0] === this.type) {
      speed = exerciseProperties[i][2];
      break;
    }
  }
  return this.distance / speed;
};

// Calories calculation test
Activity.prototype.calorieCount = function() {
  // Metabolic Equivalent of Task (MET)
  var met = 0;
  for (var i = 0; i < exerciseProperties.length; i++) {
    if (exerciseProperties[i][0] === this.type) {
      met = exerciseProperties[i][1];
      break;
    }
  }
  return met * currentUser.currentWeight / 2.2 * this.timeInHours();
};

Activity.prototype.distance = function(distance) {
  this.distance = distance;
};

// Helper Functions -----------------------------------------------------

/* exported addElement */
/**
 * This is a helper function to add an element with given tag name optional text, class name, and id to the given parent
 *
 * @param {*} parent
 * @param {*} tagName
 * @param {*} text
 * @param {*} className
 * @param {*} id
 * @returns
 */
function addElement(parent, tagName, text, className, id) {
  var newElement = document.createElement(tagName);
  if (text) {
    newElement.textContent = text;
  }
  if (className) {
    newElement.className = className;
  }
  if (id) {
    newElement.id = id;
  }
  if (parent) {
    parent.appendChild(newElement);
  }
  return newElement;
}

/************************************************************************** */

function initCurrentUser() {
  var obj = JSON.parse(localStorage.getItem('userId'));
  new User(obj.name, obj.email);
}

initCurrentUser();
