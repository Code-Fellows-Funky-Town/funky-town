'use strict';

var formLogin = document.getElementById('login');
var walk = document.getElementById('walk');
var listOfActivities = [];
var currentUser = {};
var distanceTest = 2;
var excersiceProperties = [
    ['walk', 3.0, 2.5],
    ['run', 11, 6.7],
    ['bike', 9.3, 14]
];
var typeTest = 'walk';

// object constructer for users

function User(name, email, age, weight) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.weight = weight;
}


function Activity(type, distance) {
    this.type = type;
    this.distance = distance;
    this.duration = this.duration();
    this.calories = this.calorieCount();
    listOfActivities.push(this);
}

function newActivity() {
    var type = typeTest;
    // var type = event.target.id;
    var distance = distanceTest;
    new Activity(type, distance);
    localStorage.setItem('activities-' + currentUser.email, JSON.stringify(listOfActivities));
}

function newUser(event) {
    event.preventDefault();
    var name = event.target.name.value;
    var email = event.target.email.value;
    var age = parseInt(event.target.age.value);
    var weight = parseInt(event.target.weight.value);
    currentUser = new User(name, email, age, weight);
    localStorage.setItem('user-' + currentUser.email, JSON.stringify(currentUser));


    console.log(currentUser);
}


formLogin.addEventListener('submit', newUser);

// walk.addEventListener('click', newActivity);

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
console.log(currentUser.weight);


console.log(listOfActivities);