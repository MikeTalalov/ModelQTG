var functions = require('ru/bono/functions');
var qtg = require('com.googlecode.quicktigame2d');

var head;
var neck;
var body;
var rightHand1;
var rightHand2;
var leftHand1;
var leftHand2
var rightLeg;
var leftLeg;

var handArrowLeft;
var handArrowRight

Ti.App.currentAssert=0;

Ti.UI.orientation = Ti.UI.PORTRAIT;

Ti.App.window = Ti.UI.createWindow({
		title: 'Super game',
		exitOnClose: true});
	
var game = qtg.createGameView();
var scene = qtg.createScene();

game.addEventListener('onload', function(e) {
	functions.setResolution(game);
	game.pushScene(scene);
	game.start();
	
	createHead();
	createNeck();
	createBody();
	createRightHand();
	createLeftHand();
	createHandArrows();
	
	addElementsToStage();
	
	game.addEventListener('click', clickEvent);
});

Ti.App.window.add(game);
Ti.App.window.open({fullscreen:true, navBarHidden:true});

function createHead(){
	head = qtg.createSpriteSheet({image:'images/headsheet_'+Ti.App.RES+'.xml'});
	head.animate(0, 500, 2000, -1);
	head.y = 20;
	head.x = game.screen.width/2 - head.width/2;
}

function createNeck(){
	neck = qtg.createSprite({image:'images/neck_'+Ti.App.RES+'.png'});
	
	neck.y = head.y+head.height*0.95;
	neck.x = game.screen.width/2 - neck.width/2;
}

function createBody(){
	body = qtg.createSprite({image:'images/body_'+Ti.App.RES+'.png'});
	
	body.y = neck.y+neck.height*0.95;
	body.x = game.screen.width/2 - body.width/2;
}

function createRightHand(){
	var RightHand = require('ru/bono/RightHand');
	var hand = new RightHand();
	rightHand1 = hand.hand;
	rightHand2 = hand.forearm;
	rightHand1.x = game.screen.width/2-(body.width/2) - rightHand1.width/2;
	rightHand1.y = body.y+rightHand1.width/2;
	rightHand2.move(rightHand1.x, rightHand1.y+rightHand1.height*0.95);
}

function createLeftHand(){
	var LeftHand = require('ru/bono/LeftHand');
	var hand = new LeftHand();
	leftHand1 = hand.hand;
	leftHand2 = hand.forearm;
	leftHand1.x = game.screen.width/2+body.width/2 - leftHand1.width/2;
	leftHand1.y = body.y+leftHand1.width/2;
	leftHand2.move(leftHand1.x, leftHand1.y+leftHand1.height*0.95);
}

function createHandArrows(){
	handArrowLeft = qtg.createSprite({image:'images/arrow_'+Ti.App.RES+'.png'});
	handArrowLeft.y = rightHand1.y+50;
	handArrowLeft.x = 10;
	handArrowLeft.rotate(180);
	
	handArrowRight = qtg.createSprite({image:'images/arrow_'+Ti.App.RES+'.png'});
	handArrowRight.y = rightHand1.y+50;
	handArrowRight.x = game.screen.width - handArrowRight.width - 10;
}

function addElementsToStage(){
	scene.add(neck);
	scene.add(head);
	scene.add(body);
	
	scene.add(rightHand1);
	scene.add(rightHand2);
	scene.add(leftHand1);
	scene.add(leftHand2);
	scene.add(handArrowLeft);
	scene.add(handArrowRight);
}

function clickEvent(e) {
  var scaleX = game.screen.width   / game.size.width;
  var scaleY = game.screen.height  / game.size.height;
    
  var x = e.x * scaleX;
  var y = e.y * scaleY;
    
  if (handArrowLeft.contains(x, y)) {
    Ti.App.currentAssert--;
    if(Ti.App.currentAssert<0) Ti.App.currentAssert=2;
  } else if (handArrowRight.contains(x, y)) {
    Ti.App.currentAssert++;
    if(Ti.App.currentAssert>2) Ti.App.currentAssert=0;
  }
}