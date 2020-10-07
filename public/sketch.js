//check README.md for more information

/// <reference path="TSDef/p5.global-mode.d.ts" />

//create a socket connection
var socket;
var pointer;
var prevCellAdded;
var sinceLastAdd = 0;
var clstCellInd;
var cellToAdd;
//I send updates at the same rate as the server update
var UPDATE_TIME = 1000 / 60;

var cellClientProps;


//setup is called when all the assets have been loaded
function preload() {
    //load the image and store it in pointer
    pointer = loadImage('assets/pointer.png');
}

function setup() {
    //create a canvas
    createCanvas(1280, 720);

    //I create socket but I wait to assign all the functions before opening a connection
    socket = io({
        autoConnect: false
    });

    //detects a server connection 
    socket.on('connect', onConnect);
    //handles the messages from the server, the parameter is a string
    socket.on('message', onMessage);
    //handles the user action broadcast by the server, the parameter is an object
    socket.on('state', updateState);

    socket.open();

    //every x time I update the server on my position
    setInterval(function () {
        socket.emit('clientUpdate', { x: mouseX, y: mouseY, addCell: cellToAdd});
        if (cellToAdd!=null) {
            prevAddedInd = cellToAdd;
            sinceLastAdd = 200;
            cellToAdd = null;
        }
        if (sinceLastAdd>0) sinceLastAdd--;
    }, UPDATE_TIME);
    noCursor();
}

//this p5 function is called continuously 60 times per second by default
//we are not using it yet, we update the canvas only when we receive new updates, see below
function draw() {
}

function mousePressed() {
    if (sinceLastAdd==0 || clstCellInd != prevAddedInd) {
        cellToAdd = clstCellInd;
    }
}
function mouseDragged() {
    mousePressed();
}


//called by the server every 30 fps
function updateState(state) {
    cellClientProps = updateCellClientProps(state, cellClientProps);
    //draw a white background
    background(255, 255, 255);

    for (var playerId in state.players) {
        if (state.players.hasOwnProperty(playerId)) {
            let plyr = state.players[playerId];
            let color = plyr.blob.color;
            stroke(color[0],color[1],color[2]);
            for (var i=0; i<plyr.blob.cellInds.length; i++) {
                let c = cellClientProps.ps[plyr.blob.cellInds[i]];
                let a = plyr.blob.amts[i];
                strokeWeight(sqrt(a));
                point(c.x,c.y);
            }
        }
    }

    stroke(0);strokeWeight(12);
    for (let i=0; i<cellClientProps.ps.length; i++) {
        let p = cellClientProps.ps[i];
        point(p.x,p.y);
    }
    image(pointer, mouseX, mouseY);
}

//connected to the server
function onConnect() {
    if (socket.id) {
        console.log("Connected to the server");
        socket.emit('newPlayer', { x: mouseX, y: mouseY});
    }
}

//a message from the server
function onMessage(msg) {
    if (socket.id) {
        console.log("Message from server: " + msg);
    }
}