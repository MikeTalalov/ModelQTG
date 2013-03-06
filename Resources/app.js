/**
 * @author bonovisio
 */

var qtg = require('com.googlecode.quicktigame2d');
var utils = require('js/utils');
var myModel = require('js/drawModel');

//init section
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
game.color(0.8, 1, 0.7)
game.opaque = false;
game.fps = 25;
game.debug = true;
//scene.alpha = 0.0; //for iOS
scene.color(0.8, 1, 0.7);

winMain.addEventListener('open', function(e) {
	//nothing to do
});

game.addEventListener('onload', function(e){
	myModel.drawModel(game, scene);
	game.pushScene(scene);
	game.start();
});

winMain.add(game);
winMain.open();

