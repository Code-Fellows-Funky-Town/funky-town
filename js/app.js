'use strict';

var formLogin = document.getElementById('login');
var walk = document.getElementById('walk');
var listOfActivities = [];
var listOfUsers = [];

// object constructer for users

function User(name, email, age, weight) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.weight = weight;
    listOfUsers.push(this);
}

var a = new User('James', 'a@a.com', 7, 180);

console.log(listOfUsers);



function Activity(type) {
    this.type = type;
    this.distance = 0;
    this.calories = 0;
    listOfActivities.push(this);
}

function newActivity(event) {
    var type = event.target.id;
    new Activity(type);
    console.log(listOfActivities);
}

function newUser(event) {
    event.preventDefault();
    var name = event.target.name.value;
    var email = event.target.email.value;
    var age = parseInt(event.target.age.value);
    var weight = parseInt(event.target.weight.value);
    new User(name, email, age, weight);


    console.log(listOfUsers);
}

// formLogin.addEventListener('submit', newUser);
walk.addEventListener('click', newActivity);























function testApp() {
    console.log('testApp');
}

testApp();


// Calories calculation test
var met = [
    ['walk', 3.0],
    ['run', 11],
    ['bike', 9.3]
];

console.log(met[0][0]);
console.log(met[0][1]);

var user1 = {
    weight: 100, // weight in pounds
};

console.log(user1.weight);

var activityRun = {
    type: 'run',
    distance: 0.5, // miles
    duration: 0.08 // hurs
};

console.log(activityRun.type);


function calories() {
    // get acitivity value
    // get weight value
    var metTest = 0;
    for (var i = 0; i < met.length; i++) {
        if (met[i][0] === activityRun.type) {
            metTest = met[i][1];
        }
    }

    console.log(metTest);


    var calories = 0.175 * metTest * user1.weight / 2.2 * activityRun.duration;
    console.log(calories);
}
calories();