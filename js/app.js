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

//object constructer for activities

function Activity(type, distance) {
    this.type = type;
    this.distance = distance;
    this.duration = this.duration();
    this.calories = this.calorieCount();
    listOfActivities.push(this);
}

//function takes in activity type and distance and sends the data to local storage
function newActivity() {
    var type = typeTest;
    var distance = distanceTest;
    new Activity(type, distance);
    localStorage.setItem('activities-' + currentUser.email, JSON.stringify(listOfActivities));
}

// function for the form to create new user
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

//form event listenser that is use to fire the newUsers function when the button is clicked on
formLogin.addEventListener('submit', newUser);

// walk.addEventListener('click', newActivity);

//duration prototype uses a for loop to find the activity type being used. once we know the type we know the speed of that activity. 
// from dividing the distance traveled from the speed we can find out the duration of the activity
Activity.prototype.duration = function() {
    var speed = 0;
    for (var i = 0; i < excersiceProperties.length; i++) {
        if (excersiceProperties[i][0] === this.type) {
            speed = excersiceProperties[i][2];
        }
    }
    return this.distance / speed;
};


//the calorieCount prototype uses a for loop to run throught the exersice array to get the type of exercise being use.
//afer knowing the exersice we can use the 'met' value. Wtith the met value we multiply it by the users weight. 
//Divide that by 2.2 (because we are trying to get the wight in pounds vs kilos). We then multiply that number by the duration of the exersice.
// that number will give us the calories burned during the exersice.
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