/**
 * @author bonovisio
 */

var qtg = require('com.googlecode.quicktigame2d');
var utils = require('js/utils');
var myModel = require('js/drawModel');
var gameMenu = require('js/drawGameMenu');
var myAnimatedModel = require('js/animateModel');
var globals = require('js/globals');

var gameView;
var menuScene;
var gameScene;

Ti.UI.orientation = Ti.UI.PORTRAIT; 
var winMain = Ti.UI.createWindow({
	backgroundColor: '#d9ccb9',
	fullscreen: true,
	navBarHidden: true
});

createGameView();
winMain.add(gameView);
winMain.open();

// GameView
function createGameView(){
	gameView = qtg.createGameView();
	gameView.color(0.8, 1, 0.7);
	gameView.fps = 33;
	gameView.debug = true;
	gameView.addEventListener('swipe', onSwipe);
	gameView.addEventListener('longpress', onLongpress);
	gameView.addEventListener('onload', onGameLoad);
	gameView.addEventListener('singletap', onTap);
}

// MENU FN's
function createMenuScene(){
	menuScene = qtg.createScene();
	var bg = qtg.createSprite({image:'images/menu/mainmenu/menubg_'+Ti.App.res+'.png'});
	menuScene.add(bg);
	
	var btn = qtg.createSprite({image:'images/menu/mainmenu/startBtn_'+Ti.App.res+'.png'});
	menuScene.add(btn);
	btn.tag = 'startBtn';
	btn.setCenter({x:gameView.screen.width/2, y:gameView.screen.height-btn.height});
	globals.menulisteners.push(btn);
}

// GAME FN's
function createGameScene(){
	gameScene = qtg.createScene();
	gameScene.addEventListener('onload', onGameSceneLoad);
	var gameBg = qtg.createSprite({image:'images/bg/bg_'+Ti.App.res+'.png'});
	gameScene.add(gameBg);
	
	setTimeout(function(){
		gameMenu.drawLegSlider(winMain, gameView);
		gameMenu.drawGameMenu(winMain, gameView);
		gameMenu.drawArrows(winMain, gameView);
	}, 150);
	myModel.drawModel(gameView, gameScene);
	
	Ti.App.state = 'game';
}

// EVENTS
function onSwipe(e){
	(e.y>gameView.size.height*0.8)&&(e.direction == 'up')? gameMenu.moveUp(gameView) : 
	(e.y>gameView.size.height*0.7)&&(e.direction == 'down')? gameMenu.moveDown(gameView) : Ti.API.info(e.direction);
}

function onLongpress(e){
	gameMenu.setArrowsVisible();
}

function onGameLoad(e){
	Ti.App.res = utils.setResolution(gameView);
	createMenuScene();
	gameView.pushScene(menuScene);
	gameView.start();
	Ti.App.state = 'mainMenu';
}

function onGameSceneLoad(e){
	
}

function onTap(e){
	var target;
	
	switch(Ti.App.state){
		case 'mainMenu':
			for(var i=0; i< globals.menulisteners.length; i++){
				if(globals.menulisteners[i].contains(e.x, e.y)){
					target = globals.menulisteners[i];
					break;
				}
			}
		break;
		case 'game':

		break;
	}
	
	switch(target.tag){	
		case 'startBtn':
			createGameScene()
			gameView.replaceScene(gameScene);
			gameView.startCurrentScene();
		break;
	}
}


// GLOBAL
globals.onSwipe = onSwipe;
globals.getGameView = function(){return gameView};
