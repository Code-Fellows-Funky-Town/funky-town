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


function calories () {
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
