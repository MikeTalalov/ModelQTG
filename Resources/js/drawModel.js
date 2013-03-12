/**
 * @author bonovisio
 */

var qtg = require('com.googlecode.quicktigame2d');
var myAnimatedModel = require('js/animateModel');
var utils = require('js/utils');

var placeToCenter = function(sO, tG, tS){
	var gameCenterX = tG.screen.width/2;
	var gameCenterY = tG.screen.height*0.56;
	var sCenterX = sO.width/2;
	var sCenterY = sO.height/2;
	
	sO.move(gameCenterX-sCenterX, gameCenterY-sCenterY);
};

var body;
var head;

var drawModel = function(toGame, toScene){
//=========================================
	var bodySpr = qtg.createSpriteSheet({image:'images/ss/bodies/body_'+Ti.App.res+'.xml'});
	body = bodySpr;
	Ti.App.bodyGlobal = bodySpr;
	var neckSpr = qtg.createSprite({image:'images/parts/neck_'+Ti.App.res+'.png'});
	var headSpr = qtg.createSpriteSheet({image:'images/ss/heads/headsheet_'+Ti.App.res+'.xml'});
	head = headSpr;
	//left leg
	var leftThighSpr = qtg.createSprite({image:'images/parts/limb_'+Ti.App.res+'.png'});
	var leftShinSpr = qtg.createSprite({image:'images/parts/limb_'+Ti.App.res+'.png'});
	var leftFootSpr = qtg.createSprite({image:'images/parts/foot_'+Ti.App.res+'.png'});
	//right leg
	var rightThighSpr = qtg.createSprite({image:'images/parts/limb_'+Ti.App.res+'.png'});
	var rightShinSpr = qtg.createSprite({image:'images/parts/limb_'+Ti.App.res+'.png'});
	var rightFootSpr = qtg.createSprite({image:'images/parts/foot_'+Ti.App.res+'.png'});
	//left hand
	var leftShoulderSpr = qtg.createSprite({image:'images/parts/limb_'+Ti.App.res+'.png'});
	var leftForearmSpr = qtg.createSprite({image:'images/parts/limb_'+Ti.App.res+'.png'});
	var leftPalmSpr = qtg.createSprite({image:'images/parts/palm_'+Ti.App.res+'.png'});
	//right hand
	var rightShoulderSpr = qtg.createSprite({image:'images/parts/limb_'+Ti.App.res+'.png'});
	var rightForearmSpr = qtg.createSprite({image:'images/parts/limb_'+Ti.App.res+'.png'});
	var rightPalmSpr = qtg.createSprite({image:'images/parts/palm_'+Ti.App.res+'.png'});
	
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
		Ti.App.bodyX = bodySpr.center.x;
		Ti.App.bodyY = bodySpr.center.y;
		Ti.App.D = Math.sqrt(Math.pow(bodySpr.width/2, 2) + Math.pow(bodySpr.height/2, 2));
		Ti.App.a = Math.asin( (bodySpr.width/2)/Ti.App.D) * 180/Math.PI;
		Ti.App.b = Math.acos( (bodySpr.height/2)/Ti.App.D) * 180/Math.PI;
		Ti.App.D *= 0.9;
	};
	
	var drawPart = function(childSpr, parentSpr, attachPoint, zIndex){
		//bodySpr.addTransformChildWithRelativePosition(childSpr);
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
setTimeout(function(){
	myAnimatedModel.setLimbParts('leftHand', leftShoulderSpr, leftForearmSpr, leftPalmSpr);
	myAnimatedModel.setLimbParts('rightHand', rightShoulderSpr, rightForearmSpr, rightPalmSpr);
	myAnimatedModel.setLimbParts('leftLeg', leftThighSpr, leftShinSpr, leftFootSpr);
	myAnimatedModel.setLimbParts('rightLeg', rightThighSpr, rightShinSpr, rightFootSpr);
	myAnimatedModel.setLimbParts('head', neckSpr, headSpr);
	
	myAnimatedModel.animateBody(bodySpr);
}, 1000)
//=========================================	
};

exports.changeBody = function(e){
	var target;
	if(e.source.name === 'image0' || e.source.name === 'image1') target = body;
	else target = head;
	
	var frame = target.frame;
	frame++;
	if(frame>=target.frameCount) frame = 0;

	target.frame = frame;
}

exports.drawModel = drawModel;