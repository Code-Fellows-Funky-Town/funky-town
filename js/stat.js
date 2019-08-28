'use strict';
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

var act1 = [
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

var userInfo = document.getElementById('user-info'); //create a section in stat.html with id "user-info"
var userCheck = JSON.parse(localStorage.getItem('userId'));
var userEmail = 'user-' + userCheck.email;
var currentUser = JSON.parse(localStorage.getItem(userEmail));
var labels = ['Walk', 'Run', 'Bike'];
var dataCalories = [];
var dataDistance = [];

var h2 = document.createElement('h2');
userInfo.appendChild(h2);
h2.textContent = 'Name: ' + currentUser.name;
userInfo.appendChild(h2);

var h3 = document.createElement('h3');
userInfo.appendChild(h3);
h3.textContent = 'age: ' + currentUser.age;

h3 = document.createElement('h3');
userInfo.appendChild(h3);
h3.textContent = 'current weight: ' + currentUser.currentWeight + 'lbs';

h3 = document.createElement('h3');
userInfo.appendChild(h3);
h3.textContent = 'target Weight: ' + currentUser.targetWeight + 'lbs';

h3 = document.createElement('h3');
userInfo.appendChild(h3);
h3.textContent = 'calories to be burnt: ' + (currentUser.currentWeight - currentUser.targetWeight) * 3500 + ' calories';



function generateData() {
  var userActivties = 'activities-' + userCheck.email;
  var activities = JSON.parse(localStorage.getItem(userActivties));
  console.log(activities);
  var sumWalkCal = 0;
  var sumRunCal = 0;
  var sumBikeCal = 0;
  var sumWalkDis = 0;
  var sumRunDis = 0;
  var sumBikeDis = 0;

  for (var i = 0; i < activities.length; i++) {
    if(activities[i].type === 'walk') {
      sumWalkCal += activities[i].calorieCount;
      sumWalkDis += activities[i].distance;
    }
    else if (activities[i].type === 'run') {
      sumRunCal += activities[i].calorieCount;
      sumRunDis += activities[i].distance;
    }
    else if (activities[i].type === 'bike') {
      sumBikeCal += activities[i].calorieCount;
      sumBikeDis+= activities[i].distance;
    }
  }
  dataCalories = [sumWalkCal, sumRunCal, sumBikeCal];
  dataDistance = [sumWalkDis, sumRunDis, sumBikeDis];
}

generateData();


var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Total Calories Burnt',
      data: dataCalories,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
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


var ctx = document.getElementById('chart1').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Total Distance Traveled',
      data: dataDistance,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
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







/*







var ctx = document.getElementById('chart').getContext('2d');

var allData = [

  { name: 'WALKING', calories: 42, duration: 60, },
  { name: 'RUNNING', calories: 130, duration: 30, },
  { name: 'BIKING', calories: 75, duration: 10, },
];

var labels = [];
var data1 = [];
var data2 = [];
var data3 = [];
var colors = ['yellow', 'blue', 'pink', 'salmon', 'orange', 'red'];


for (var i = 0; i < allData.length; i++) {

  labels.push(allData[i].name);
  data1.push(allData[i].calories);
  data2.push(allData[i].duration);
  data3.push(Math.floor(allData[i].calories / allData[i].duration));
}


makeChart(data1, data2, data3, labels);

function makeChart(data, labels) {



  var chart = new Chart(ctx, {

    type: 'bar',

    data: {

      labels: labels,

      datasets: [{

        label: 'CALORIES',

        backgroundColor: colors,

        borderColor: 'white',

        data: data1,


      },

      {

        label: 'DURATION',

        backgroundColor: colors,

        borderColor: 'white',

        data: data2,


      },

      {

        label: 'COMPARISION',

        backgroundColor: colors,

        borderColor: 'white',

        data: data3,


      },


      ]

    },

    options: {
      legend: {
        display: true,
        labels: {
          fontColor: 'rgb(255, 99, 132)',

        }
      }
    }

  });


}

var ctx = document.getElementById('chart').getContext('2d');

var allData1 = [

  { name: 'WALKING', calories: 42, duration: 60, },
  { name: 'RUNNING', calories: 130, duration: 30, },
  { name: 'BIKING', calories: 75, duration: 10, },
];

var labels2 = [];
var data4 = [];
var data5 = [];
var data6 = [];
var colors2 = ['yellow', 'blue', 'pink', 'salmon', 'orange', 'red'];


for (var i = 0; i < allData1.length; i++) {

  labels2.push(allData1[i].name);
  data4.push(allData1[i].calories);
  data5.push(allData1[i].duration);
  data6.push(Math.floor(allData1[i].calories / allData1[i].duration));
}


makeChart1(data4, data5, data6, labels2);

function makeChart1(data, labels) {



  var chart = new Chart1(ctx, {

    type: 'polarArea',

    data: {

      labels: labels2,

      datasets: [{

        label: 'CALORIES',

        backgroundColor: colors2,

        borderColor: 'white',

        data: data4,


      },

      {

        label: 'DURATION',

        backgroundColor: colors2,

        borderColor: 'white',

        data: data5,


      },

      {

        label: 'COMPARISION',

        backgroundColor: colors2,

        borderColor: 'white',

        data: data6,


      },


      ]

    },

    options: {
      legend: {
        display: true,
        labels: {
          fontColor: 'rgb(255, 99, 132)',

        }
      }
    }

  });


}
*/
