'use strict';

var userInfo = document.getElementById('user-info');

var labels = ['Walk', 'Run', 'Bike'];
var dataCalories = [];
var dataDistance = [];

function printProfile() {
  var h2 = document.createElement('h2');
  userInfo.appendChild(h2);
  h2.textContent = 'Name: ' + currentUser.name;
  userInfo.appendChild(h2);

  var h3 = document.createElement('h3');
  userInfo.appendChild(h3);
  h3.textContent = 'Age: ' + currentUser.age;

  h3 = document.createElement('h3');
  userInfo.appendChild(h3);
  h3.textContent = 'Current Weight: ' + currentUser.currentWeight + 'lbs';

  h3 = document.createElement('h3');
  userInfo.appendChild(h3);
  h3.textContent = 'Target Weight: ' + currentUser.targetWeight + 'lbs';

  h3 = document.createElement('h3');
  userInfo.appendChild(h3);
  h3.textContent = 'Calories to be burnt: ' + (currentUser.currentWeight - currentUser.targetWeight) * 3500 + ' calories';
}

function generateData() {
  var activities = currentUser.activityList;
  console.log(activities);
  var sumWalkCal = 0;
  var sumRunCal = 0;
  var sumBikeCal = 0;
  var sumWalkDis = 0;
  var sumRunDis = 0;
  var sumBikeDis = 0;

  for (var i = 0; i < activities.length; i++) {
    if (activities[i].type === 'walk') {
      sumWalkCal += activities[i].calorieCount();
      sumWalkDis += activities[i].distance;
    } else if (activities[i].type === 'run') {
      sumRunCal += activities[i].calorieCount();
      sumRunDis += activities[i].distance;
    } else if (activities[i].type === 'bike') {
      sumBikeCal += activities[i].calorieCount();
      sumBikeDis += activities[i].distance;
    }
  }
  dataCalories = [sumWalkCal, sumRunCal, sumBikeCal];
  dataDistance = [sumWalkDis, sumRunDis, sumBikeDis];
}

function renderCalorieReport() {
  
  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Calories Burnt',
        data: dataCalories,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(0, 100, 0, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(0, 100, 0, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function renderDistanceReport() {

  var ctx = document.getElementById('chart1').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Distance Traveled',
        data: dataDistance,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(0, 100, 0, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(0, 100, 0, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

/**
 * Simulate user data in local storage for testing.
 *
 */
function statsTest() {

  var userId = {
    name: 'Jeremiah',
    email: 'jeremiah.kim@hotmail.com',
  };
  localStorage.setItem('userId', JSON.stringify(userId));

  var user1 = {
    name: 'Jeremiah',
    email: 'jeremiah.kim@hotmail.com',
    age: 65,
    currentWeight: 200,
    targetWeight: 150
  };

  localStorage.setItem('user-jeremiah.kim@hotmail.com', JSON.stringify(user1));

  var act1 = [{
      type: 'walk',
      distance: 1,
      duration: 1,
      calorieCount: 100
    },
    {
      type: 'run',
      distance: 1,
      duration: 1,
      calorieCount: 100
    },
    {
      type: 'run',
      distance: 1,
      duration: 1,
      calorieCount: 100
    },
    {
      type: 'walk',
      distance: 1,
      duration: 1,
      calorieCount: 100
    },
    {
      type: 'run',
      distance: 1,
      duration: 1,
      calorieCount: 100
    },
    {
      type: 'bike',
      distance: 1,
      duration: 1,
      calorieCount: 100
    }
  ];
  localStorage.setItem('activities-jeremiah.kim@hotmail.com', JSON.stringify(act1));

  initCurrentUser();
}

function runStatsPage() {
  printProfile();
  generateData();
  renderCalorieReport();
  renderDistanceReport();
}

function testStatsPage() {
  statsTest();
  runStatsPage();
}

runStatsPage();
