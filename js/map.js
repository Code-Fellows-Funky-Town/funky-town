'use strict';

var canvas = document.getElementById("map_canvas");
var ctx = canvas.getContext("2d");

var path = [];
var paint;

function resetPath() {
  path = [];
  updatePath();
}

function endPath() {
  // TODO: endPath

  updatePath();
}

function undoPath() {
  removeDistance(path, 30, true);
  if (path.length === 1) {
    // if path is only one point, remove completely
    path = [];
  }
  updatePath();
}

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

/**
 * Add a new point to the end of the path array.
 * 
 * @param {*} x X coordinate
 * @param {*} y Y coordinate
 */
function addPointToPath(x, y) {
  path.push([x, y]);
}

function updatePath() {
  redrawPath();
  var distanceInPx = totalPathDistance(path);
  console.log(`Pixel distance: ${distanceInPx}`);
}

function redrawPath() {
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
}

/**
* From 'CREATE A DRAWING APP WITH HTML5 CANVAS AND JAVASCRIPT'
by William Malone
* 
* http: //www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
*
*/
function redrawX() {
  // Clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.strokeStyle = "#ee2211";
  ctx.lineJoin = "round";
  ctx.lineWidth = 4;

  for (var i = 0; i < clickX.length; i++) {
    ctx.beginPath();
    if (clickDrag[i] && i) {
      ctx.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      ctx.moveTo(clickX[i], clickY[i]);
    }
    ctx.lineTo(clickX[i], clickY[i]);
    ctx.closePath();
    ctx.stroke();
  }
}

/**
 * From: https: //stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse
 * 
 * Here 's the most straightforward way to create a drawing application with canvas:

 1. Attach a mousedown, mousemove, and mouseup event listener to the canvas DOM

 2. on mousedown, get the mouse coordinates, and use the moveTo() method to position your drawing cursor and the beginPath() method to begin a new drawing path.

 3. on mousemove, continuously add a new point to the path with lineTo(), and color the last segment with stroke().
 on mouseup, set a flag to disable the drawing.
 4. From there, you can add all kinds of other features like giving the user the ability to choose a line thickness, color, brush strokes, and even layers.
 *
 */

// Geometry Helper Functions ----------------------------------------

/**
 * Calculate the total length of the given path.
 *
 * @param {*} path
 * @returns
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

/**
 * Ramer - Douglas - Peucker Line Simplification Algorithm
 * 
 * Reduces the number of points used to define the shape of the a line. 
 * 
 * From rosettacode.org https://rosettacode.org/wiki/Ramer-Douglas-Peucker_line_simplification
 * 
 * TODO: Re-write as ES5 code and remove if we don't use
 *
 * @param {*} l
 * @param {*} epsilon
 * @returns
 */
const RDP = (l, epsilon) => {
  const last = l.length - 1;
  const p1 = l[0];
  const p2 = l[last];
  const x21 = p2.x - p1.x;
  const y21 = p2.y - p1.y;

  const [dMax, x] = l.slice(1, last)
    .map(p => Math.abs(y21 * p.x - x21 * p.y + p2.x * p1.y - p2.y * p1.x))
    .reduce((p, c, i) => {
      const v = Math.max(p[0], c);
      return [v, v === p[0] ? p[1] : i + 1];
    }, [-1, 0]);

  if (dMax > epsilon) {
    return [...RDP(l.slice(0, x + 1), epsilon), ...RDP(l.slice(x), epsilon).slice(1)];
  }
  return [l[0], l[last]]
};


function testRDP() {
  const points = [{
      x: 0,
      y: 0
    },
    {
      x: 1,
      y: 0.1
    },
    {
      x: 2,
      y: -0.1
    },
    {
      x: 3,
      y: 5
    },
    {
      x: 4,
      y: 6
    },
    {
      x: 5,
      y: 7
    },
    {
      x: 6,
      y: 8.1
    },
    {
      x: 7,
      y: 9
    },
    {
      x: 8,
      y: 9
    },
    {
      x: 9,
      y: 9
    }
  ];
  console.log(RDP(points, 1));
}


function initMapCanvas() {
  canvas.addEventListener('mousedown', onMousedown);
  canvas.addEventListener('mouseup', onMouseup);
  canvas.addEventListener('mousemove', onMousemove);
  canvas.addEventListener('mouseleave', onMouseleave);
  canvas.addEventListener('contextmenu', onContextMenu)
}

function testMap() {
  console.log('testMap');
}

testMap();
initMapCanvas();