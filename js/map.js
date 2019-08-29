'use strict';

// Activity object references for candidate activities.  
// Of these the user selected activity will be appended to the current user's activity list in the User object .
var walkActivity = {};
var runActivity = {};
var bikeActivity = {};

// Output HTML elements to be set one time by initMapPage().
var elDistance = {};

var elWalkTime = {};
var elWalkCal = {};

var elRunTime = {};
var elRunCal = {};

var elBikeTime = {};
var elBikeCal = {};

// Global variables for route tracing
var canvas = document.getElementById("map_canvas");
var ctx = canvas.getContext("2d");
var path = [];

// paint is set to true if mouse movement on canvas should paint, false if not
var paint;

// Functions for route changes that require a redraw and stats change -------------------------

function resetPath() {
  path = [];
  updatePath();
}

function endPath() {
  // TODO: endPath if we need it.  Strip if we don't...
  updatePath();
}

function undoPath() {
  removeDistance(path, 50, true);
  if (path.length === 1) {
    // if path is only one point, remove completely
    path = [];
  }
  updatePath();
}

// Canvas drawing event handlers -------------------------------------------------------------------

function onContextMenu(e) {
  e.preventDefault();
}

function onMousedown(e) {
  if (e.button === 2) {
    undoPath();
    return;
  } else {
    var x = e.offsetX;
    var y = e.offsetY;

    paint = true;
    addPointToPath(x, y);
    updatePath();
  }
}

function onMousemove(e) {
  var x = e.offsetX;
  var y = e.offsetY;

  if (paint) {
    addPointToPath(x, y, true);
    updatePath();
  }
}

function onMouseup(e) {
  paint = false;
}

function onMouseleave(e) {
  paint = false;
}

// Path drawing functions used by the canvas mouse event handlers -------------------------------------

/**
 * Add a new point to the end of the path array.
 * 
 * @param {*} x X coordinate
 * @param {*} y Y coordinate
 */
function addPointToPath(x, y) {
  path.push([x, y]);
}

/**
 * Called after any change to the route path to update the the page rendering and distance information.
 * This pixel to mile conversion factor is applied here before calling the distance property setter on the Activity 
 * objects.
 */
function updatePath() {
  redrawPath();
  var distanceInPx = totalPathDistance(path);
  var distanceInFeet = distanceInPx * 5.265;
  var distanceInMiles = distanceInFeet / 5280;
  console.log(`Pixel distance: ${distanceInPx.toFixed(3)}  Feet: ${distanceInFeet.toFixed(3)}  Miles: ${distanceInMiles.toFixed(3)}`);

  walkActivity.distance = distanceInMiles;
  runActivity.distance = distanceInMiles;
  bikeActivity.distance = distanceInMiles;

  elDistance = document.getElementById('distance');
  // elDistance.textContent = `DISTANCE: ${distanceInMiles} MILES`;

  elWalkTime.textContent = `TIME: ${formatHours(walkActivity.timeInHours())}`;
  elWalkCal.textContent = `CALORIES: ${walkActivity.calorieCount().toFixed(1)}`;

  elRunTime.textContent = `TIME: ${formatHours(runActivity.timeInHours())}`;
  elRunCal.textContent = `CALORIES: ${runActivity.calorieCount().toFixed(1)}`;

  elBikeTime.textContent = `TIME: ${formatHours(bikeActivity.timeInHours())}`;
  elBikeCal.textContent = `CALORIES: ${bikeActivity.calorieCount().toFixed(1)}`;
}

// Actual rendering to the canvas ----------------------------------------------------------------------------

/**
 * Clears the canvas and draws the current path.
 * 
 * For simple operation this is called after every update to the path, completely redrawing the path.
 * Although it would be more efficient to draw only what is new, this seems to work fast enough
 * for our purposes.
 *
 */
function redrawPath() {
  console.time('redrawPath');
  // Clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (path.length > 0) {
    ctx.strokeStyle = "#ee2211";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);
    for (var i = 0; i < path.length; i++) {
      ctx.lineTo(path[i][0], path[i][1]);
    }
    ctx.stroke();
  }
  console.timeEnd('redrawPath');
}

// Geometry Helper Functions ----------------------------------------

/**
 * Shifts the path by the given offset.
 * 
 * This function would be used if a sliding map is implemented.
 *
 * @param {*} path
 * @param {*} xOffset
 * @param {*} yOffset
 */
function translatePath(path, xOffset, yOffset) {
  for (var i = 0; i < path.length; i++) {
    path[i][0] += xOffset;
    path[i][1] += yOffset;
  }
}

/**
 * Calculate the total length of the given path.
 *
 * @param {*} path
 * @returns Total path length
 */
function totalPathDistance(path) {
  var len = 0;
  var x = 0;
  var y = 0;
  var dx = 0;
  var dy = 0;
  var lastX = 0;
  var lastY = 0;

  for (var i = 0; i < path.length; i++) {
    x = path[i][0];
    y = path[i][1];
    if (i > 0) {
      dx = x - lastX;
      dy = y - lastY;
      len += Math.sqrt(dx * dx + dy * dy);
    }
    lastX = x;
    lastY = y;
  }
  return len;
}

/**
 * Remove segments from the tail end of the given path.
 *
 * @param {*} path Reference to the path that will be shortened
 * @param {*} distance Length to be removed
 * @param {*} atLeast If true, remove the next remaining segment that would exceed the given distance to remove, otherwise leave that segment.
 * 
 */
function removeDistance(path, distance, atLeast) {
  var len = 0;
  var x = 0;
  var y = 0;
  var dx = 0;
  var dy = 0;
  var lastX = 0;
  var lastY = 0;
  var remove = 0;

  for (var i = path.length - 1; i >= 0; i--) {
    x = path[i][0];
    y = path[i][1];
    if (i < path.length - 1) {
      dx = x - lastX;
      dy = y - lastY;
      len += Math.sqrt(dx * dx + dy * dy);
      if (atLeast) {
        remove++
        if (len > distance) {
          break;
        }
      } else {
        if (len > distance) {
          break;
        }
        remove++;
      }
    }
    lastX = x;
    lastY = y;
  }
  console.log(`remove ${remove}`);
  path.splice(path.length - remove);
}

// --------------------------------------------------------

function formatHours(hours) {
  var h = Math.floor(hours);
  var m = Math.floor((hours * 60) % 60);
  var s = Math.floor((hours * 3600) % 60);
  return `${h.toString()}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Sidebar event handlers ---------------------------------

function onActivityClick(e) {
  if (path.length > 0) {
    var activityType = e.target.id;
    var selectedActivity = {};

    switch (activityType) {
      case 'walk':
        selectedActivity = walkActivity;
        break;
      case 'run':
        selectedActivity = runActivity;
        break;
      case 'bike':
        selectedActivity = bikeActivity;
        break;
    }

    currentUser.addActivity(selectedActivity);
    location.href = 'stat.html';
  } else {
    alert('Please enter your route before selecting an activity.')
  }
}

// Page setup functions -----------------------------------

function initMapCanvas() {
  canvas.addEventListener('mousedown', onMousedown);
  canvas.addEventListener('mouseup', onMouseup);
  canvas.addEventListener('mousemove', onMousemove);
  canvas.addEventListener('mouseleave', onMouseleave);
  canvas.addEventListener('contextmenu', onContextMenu)
}

function initActivityButtonHandlers() {
  var walk = document.getElementById('walk');
  var run = document.getElementById('run');
  var bike = document.getElementById('bike');
  
  walk.addEventListener('click', onActivityClick);
  run.addEventListener('click', onActivityClick);
  bike.addEventListener('click', onActivityClick);
}

function initTemplateActivities() {
  walkActivity = new Activity('walk');
  runActivity = new Activity('run');
  bikeActivity = new Activity('bike');
}

function linkSidebarElements() {
  elDistance = document.getElementById('distance');
  
  elWalkTime = document.getElementById('walk_time');
  elWalkCal = document.getElementById('walk_calories');
  
  elRunTime = document.getElementById('run_time');
  elRunCal = document.getElementById('run_calories');
  
  elBikeTime = document.getElementById('bike_time');
  elBikeCal = document.getElementById('bike_calories');
}

function onDOMContentLoaded(e) {
  linkSidebarElements();
  initActivityButtonHandlers();
}

function initMapPage() {
  console.time('initMapPage');
  initTemplateActivities();
  initMapCanvas();
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
  console.timeEnd('initMapPage');
}

initMapPage();