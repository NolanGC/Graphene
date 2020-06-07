var currentDraggable = null;
var currentNodeNumber = 1;
var adjListRepresentation = "";
var creatingEdge = false;
var firstNode = null;
var midClick = false;
var weightBuffer = "";
var simple = false;

function setup() {
  createCanvas(windowWidth - 200, windowHeight - 20);
  textSize(50);
  textAlign(CENTER);
  background(0);
  g = new Graph();

  clearButton = createButton("clear");
  clearButton.position(0, 130);
  clearButton.size(80, 40);
  clearButton.mousePressed(clearGraph);
  copyButton = createButton("copy input");
  copyButton.position(windowWidth - 200, windowHeight - 100);
  copyButton.size(199, 100);
  copyButton.mousePressed(copyToClipboard);
  data = createElement('textarea', adjListRepresentation);
  data.size(194, windowHeight - 100);
  data.position(windowWidth - 200, 0);
  data.changed(mergeChanges);
  weighted = createCheckbox("weighted?");
  weighted.changed(weightedChecked);
  weighted.position(0, 80);
  directed = createCheckbox("directed?");
  directed.changed(directedChecked);
  directed.position(0, 100);
  randomButton = createButton("random");
  randomButton.position(0, 180);
  randomButton.mousePressed(generateRandomGraph);
  randomButton.size(80, 40);
  simple = createCheckbox("simple?");
  simple.changed(setSimple);
  simple.position(0, 230);
  n = createInput("n")
  n.position(0, 250);
  n.size(20, 20);
  m = createInput("m")
  m.position(0, 280);
  m.size(20, 20);
  minW = createInput('min weight')
  maxW = createInput('max weight')
  minW.position(0, 300);
  maxW.position(0, 320);
  minW.size(80, 20);
  maxW.size(80, 20);
}

function draw() {
  textSize(20);
  background(220);
  text("n - new node          e - new edge (esc to cancel)          d - delete node under cursor", windowWidth / 2 - 100, 20);
  g.draw();
  if (creatingEdge) {
    text("Select two nodes to create an edge. \n (for weighted edges, type the weight before selecting the nodes)", windowWidth / 2 - 100, 80);
  }
  textSize(35);
  text("GRAPHENE", 100, 30);
}

function mouseReleased() {
  midClick = false;
  currentDraggable = null;
}

function newNode() {
  g.addNode(currentNodeNumber, mouseX, mouseY);
  currentNodeNumber += 1;
  g.generateData();
  data.value(adjListRepresentation);
}

function newEdge() {
  creatingEdge = true;
}

function clearGraph() {
  g.nodes = []
  g.edges = []
  adjListRepresentation = "";
  currentNodeNumber = 1;
  g.generateData();
  data.value(adjListRepresentation);
}

function copyToClipboard() {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = adjListRepresentation;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function keyTyped() {
  if (creatingEdge && key === '-' || key === '0' || key === '1' || key === '2' || key === '3' || key === '4' || key === '5' || key === '6' || key === '7' || key === '8' || key === '9') {
    weightBuffer += key;
  }

  if (key === 'e') {
    newEdge();
  }
  if (key === 'n') {
    newNode();
  }
  if (key === 'd') {
    for (var i = 0; i < g.nodes.length; i++) {
      if (dist(g.nodes[i].x, g.nodes[i].y, mouseX, mouseY) < g.nodes[i].r) {
        g.removeNode(g.nodes[i]);
      }
    }
    g.generateData();
    data.value(adjListRepresentation);
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    if (creatingEdge) {
      creatingEdge = false;
      firstNode = null;
    }
  }
}

function mergeChanges() {

}

function weightedChecked() {
  if (this.checked()) {
    g.weighted = true;
  } else {
    g.weighted = false;
  }
  clearGraph();
}

function directedChecked() {
  if (this.checked()) {
    g.directed = true;
  } else {
    g.directed = false;
  }
  clearGraph();
}

function generateRandomGraph() {
  clearGraph();
  if (n.value() == "n" || m.value() == "m") {
    g.randomGraph(5, 5);
  } else {
    g.randomGraph(n.value(), m.value());
  }
  g.generateData();
  data.value(adjListRepresentation);
}

function setSimple() {
  if (this.checked()) {
    simple = true;
  } else {
    simple = false;
  }
}