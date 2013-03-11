/**
 * @author bonovisio
 */

var qtg = require('com.googlecode.quicktigame2d');
var utils = require('js/utils');
var myModel = require('js/drawModel');
var gameMenu = require('js/drawGameMenu');
var myAnimatedModel = require('js/animateModel');
var drawSlider = require('js/setLegsDistance');

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
scene.color(0.8, 1, 0.7);

winMain.addEventListener('open', function(e) {
	//nothing to do
});

game.addEventListener('onload', function(e){
	Ti.App.res = utils.setResolution(game);
	drawSlider.drawLegSlider(winMain, game);
	myModel.drawModel(game, scene);
	gameMenu.drawGameMenu(winMain, game);
	gameMenu.drawArrows(winMain, game);
	game.pushScene(scene);
	game.start();
});

game.addEventListener('swipe', function(e){
	(e.y>game.size.height*0.8)&&(e.direction == 'up')? gameMenu.moveUp() : 
	(e.y>game.size.height*0.7)&&(e.direction == 'down')? gameMenu.moveDown() : Ti.API.info(e.direction);
});

game.addEventListener('longpress', function(e){
	gameMenu.setArrowsVisible();
});

winMain.add(game);
winMain.open();