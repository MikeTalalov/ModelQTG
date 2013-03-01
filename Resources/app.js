/**
 * @author bonovisio
 */
// ------------------------------
// modules import section
// ------------------------------
var qtg = require('com.googlecode.quicktigame2d');
var utils = require('js/utils');
var myModel = require('js/drawModel');

// ------------------------------
// init section
// ------------------------------
var fpsLabel = utils.createLabel();

Ti.UI.orientation = Ti.UI.PORTRAIT; 
var winMain = Ti.UI.createWindow({
	title: 'Super Game',
	backgroundColor: '#d9ccb9',
	fullscreen: true,
	navBarHidden: true
});

var game = qtg.createGameView();
var scene = qtg.createScene();
game.opaque = false;
game.fps = 30;
game.debug = true;
scene.alpha = 0.0; //for iOS

winMain.addEventListener('open', function(e) {
	//nothing to do
});

game.addEventListener('onload', function(e){
	myModel.drawModel(game, scene);
	game.pushScene(scene);
	game.start();
	
	
	var f = Ti.Filesystem.getFile('js/asset.json');
	var contents = f.read().text;
	var json = JSON.parse(contents);
	Ti.API.info(json[0].body.rotation);
	
});

game.addEventListener('enterframe', function(e) {
    //nothing to do
    utils.updateFPS(fpsLabel);
});

// ------------------------------
// run section
// ------------------------------
winMain.add(fpsLabel);
winMain.add(game);
winMain.open();

/*
var handArrowLeft, handArrowRight;

Ti.App.currentAssert = 0;

game.addEventListener('onload', function(e){
	functions.setResolution(game);
//---arrows click
	addElementsToStage();
	game.addEventListener('click', clickEvent);
});

//==============================================================================

function addElementsToStage(){
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
*/