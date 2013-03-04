/**
 * @author bonovisio
 */

var qtg = require('com.googlecode.quicktigame2d');
var myAnimatedModel = require('js/animateModel');
var importAsset = require('js/importAsset');
var utils = require('js/utils');

var assetLH = importAsset.leftHandAsset();
var assetRH = importAsset.rightHandAsset();
var assetLL = importAsset.leftLegAsset();
var assetRL = importAsset.rightLegAsset();

var placeToCenter = function(sO, tG, tS){
	var gameCenterX = tG.screen.width/2;
	var gameCenterY = tG.screen.height*0.56;
	var sCenterX = sO.width/2;
	var sCenterY = sO.height/2;
	
	sO.move(gameCenterX-sCenterX, gameCenterY-sCenterY);
};

var drawModel = function(toGame, toScene){
//=========================================
	var res = utils.setResolution(toGame);
	var bodySpr = qtg.createSprite({image:'images/body_'+res+'.png'});
	var neckSpr = qtg.createSprite({image:'images/neck_'+res+'.png'});
	var headSpr = qtg.createSpriteSheet({image:'images/headsheet_'+res+'.xml'});
	//left leg
	var leftThighSpr = qtg.createSprite({image:'images/limb_'+res+'.png'});
	var leftShinSpr = qtg.createSprite({image:'images/limb_'+res+'.png'});
	var leftFootSpr = qtg.createSprite({image:'images/foot_'+res+'.png'});
	//right leg
	var rightThighSpr = qtg.createSprite({image:'images/limb_'+res+'.png'});
	var rightShinSpr = qtg.createSprite({image:'images/limb_'+res+'.png'});
	var rightFootSpr = qtg.createSprite({image:'images/foot_'+res+'.png'});
	//left hand
	var leftShoulderSpr = qtg.createSprite({image:'images/limb_'+res+'.png'});
	var leftForearmSpr = qtg.createSprite({image:'images/limb_'+res+'.png'});
	var leftPalmSpr = qtg.createSprite({image:'images/palm_'+res+'.png'});
	//right hand
	var rightShoulderSpr = qtg.createSprite({image:'images/limb_'+res+'.png'});
	var rightForearmSpr = qtg.createSprite({image:'images/limb_'+res+'.png'});
	var rightPalmSpr = qtg.createSprite({image:'images/palm_'+res+'.png'});
	
	//attach points
	var neckPoint = {x: (bodySpr.width/2)-(neckSpr.width/2), y: -neckSpr.height*0.8};
	var headPoint = {x: (neckSpr.width/2)-(headSpr.width/2), y: -headSpr.height*0.9};
	
	var leftThighPoint = {x: (bodySpr.width/2)+(bodySpr.width*0.14), y: bodySpr.height*0.92};
	var leftShinPoint = {x: (leftThighSpr.width/2)-(leftShinSpr.width/2), y: leftThighSpr.height*0.92};
	var leftFootPoint = {x: (leftShinSpr.width/2)-(leftFootSpr.width/2), y: leftShinSpr.height*0.92};
	
	var rightThighPoint = {x: (bodySpr.width/2)-(bodySpr.width*0.5), y: bodySpr.height*0.92};
	var rightShinPoint = {x: (rightThighSpr.width/2)-(rightShinSpr.width/2), y: rightThighSpr.height*0.92};
	var rightFootPoint = {x: (rightShinSpr.width/2)-(rightFootSpr.width/2), y: rightShinSpr.height*0.92};
	
	var leftShoulderPoint = {x: (bodySpr.width/2)+(bodySpr.width*0.2), y: bodySpr.height*0.02};
	var leftForearmPoint = {x: (leftShoulderSpr.width/2)-(leftForearmSpr.width/2), y: leftShoulderSpr.height*0.92};
	var leftPalmPoint = {x: (leftForearmSpr.width/2)-(leftPalmSpr.width/2), y: leftForearmSpr.height*0.92};
	
	var rightShoulderPoint = {x: (bodySpr.width/2)-(bodySpr.width*0.6), y: bodySpr.height*0.02};
	var rightForearmPoint = {x: (rightShoulderSpr.width/2)-(rightForearmSpr.width/2), y: rightShoulderSpr.height*0.92};
	var rightPalmPoint = {x: (rightForearmSpr.width/2)-(rightPalmSpr.width/2), y: rightForearmSpr.height*0.92};
	//===
	var drawBody = function(){
		placeToCenter(bodySpr, toGame, toScene);
		bodySpr.z = 80;
		toScene.add(bodySpr);
	};
	
	var drawPart = function(childSpr, parentSpr, attachPoint, zIndex){
		bodySpr.addTransformChildWithRelativePosition(childSpr);
		childSpr.move(parentSpr.x+attachPoint.x, parentSpr.y+attachPoint.y);
		childSpr.z = zIndex;
		toScene.add(childSpr);	
	};
	
	//draw section
	drawBody();
	drawPart(neckSpr, bodySpr, neckPoint, 70);
	drawPart(headSpr, neckSpr, headPoint, 80);
	//===draw left leg
	drawPart(leftThighSpr, bodySpr, leftThighPoint, 70);
	drawPart(leftShinSpr, leftThighSpr, leftShinPoint, 60);
	drawPart(leftFootSpr, leftShinSpr, leftFootPoint, 70);
	//===draw right leg
	drawPart(rightThighSpr, bodySpr, rightThighPoint, 70);
	drawPart(rightShinSpr, rightThighSpr, rightShinPoint, 60);
	drawPart(rightFootSpr, rightShinSpr, rightFootPoint, 70);
	//===draw left hand
	drawPart(leftShoulderSpr, bodySpr, leftShoulderPoint, 90);
	drawPart(leftForearmSpr, leftShoulderSpr, leftForearmPoint, 80);
	drawPart(leftPalmSpr, leftForearmSpr, leftPalmPoint, 90);
	//===draw right hand
	drawPart(rightShoulderSpr, bodySpr, rightShoulderPoint, 90);
	drawPart(rightForearmSpr, rightShoulderSpr, rightForearmPoint, 80);
	drawPart(rightPalmSpr, rightForearmSpr, rightPalmPoint, 90);
	
	
//=========================================
	myAnimatedModel.animateHead(neckSpr, headSpr);
	myAnimatedModel.animateLimb(leftShoulderSpr, leftForearmSpr, leftPalmSpr, assetLH);
	myAnimatedModel.animateLimb(rightShoulderSpr, rightForearmSpr, rightPalmSpr, assetRH, true);
	myAnimatedModel.animateLimb(leftThighSpr, leftShinSpr, leftFootSpr, assetLL);
	myAnimatedModel.animateLimb(rightThighSpr, rightShinSpr, rightFootSpr, assetRL);
	//var tf = qtg.createTransform();
	//tf.duration = 8000;
	//tf.x = 230;
	//tf.y = 200;
	//bodySpr.transform(tf);
//=========================================	
};

exports.drawModel = drawModel;