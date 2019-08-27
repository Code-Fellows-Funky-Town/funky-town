'use strict';

// Canvas test code

var canvas = document.getElementById("map_canvas");
var context = canvas.getContext("2d");

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

/**
* From 'CREATE A DRAWING APP WITH HTML5 CANVAS AND JAVASCRIPT'
by William Malone
* 
* http: //www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
*
*/ 
function redraw() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for (var i = 0; i < clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }  
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();
  }  
}  

function onMousedown(e) {
  // var mouseX = e.pageX - this.offsetLeft;
  // var mouseY = e.pageY - this.offsetTop;
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;
  console.log(mouseX, mouseY);
  paint = true;
  addClick(mouseX, mouseY);
  redraw();
}  

function onMousemove(e) {
  // var mouseX = e.pageX - this.offsetLeft;
  // var mouseY = e.pageY - this.offsetTop;
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;

  if (paint) {
    addClick(mouseX, mouseY, true);
    redraw();
  }  
}  

function onMouseup(e) {
  paint = false;
}  

function onMouseleave(e) {
  paint = false;
}

/**
 * This does whatever
 *
 * @param {*} x X coordinate
 * @param {*} y
 * @param {*} dragging
 */
function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
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
function initMapCanvas() {
  canvas.addEventListener('mousedown', onMousedown);
  canvas.addEventListener('mouseup', onMouseup);
  canvas.addEventListener('mousemove', onMousemove);
  canvas.addEventListener('mouseleave', onMouseleave);
}


function testMap() {
  console.log('testMap');
}

testMap();
initMapCanvas();