'use strict';

var ctx = document.getElementById('chart').getContext('2d');

var allData = [

  {name:'WALKING', calories: 42, duration: 60,},
  {name:'RUNNING', calories:130, duration: 30,},
  {name:'BIKING', calories: 75, duration: 10, },];

var labels = [];
var data1 = [];
var data2 = [];
var data3 = [];
var colors = ['yellow', 'blue', 'pink', 'salmon', 'orange', 'red'];


for (var i = 0; i < allData.length; i++) {

  labels.push(allData[i].name);
  data1.push(allData[i].calories);
  data2.push(allData[i].duration);
  data3.push(Math.floor( allData[i].calories/allData[i].duration));
}


makeChart(data1, data2, data3, labels);

function makeChart(data, labels) {



  var chart = new Chart(ctx, {

    type: 'polarArea',

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

  {name:'WALKING', calories: 42, duration: 60,},
  {name:'RUNNING', calories:130, duration: 30,},
  {name:'BIKING', calories: 75, duration: 10, },];

var labels2 = [];
var data4 = [];
var data5 = [];
var data6 = [];
var colors2 = ['yellow', 'blue', 'pink', 'salmon', 'orange', 'red'];


for (var i = 0; i < allData1.length; i++) {

  labels2.push(allData1[i].name);
  data4.push(allData1[i].calories);
  data5.push(allData1[i].duration);
  data6.push(Math.floor( allData1[i].calories/allData1[i].duration));
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
