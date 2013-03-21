/**
 * @author bonovisio
 */

var qtg = require('com.googlecode.quicktigame2d');
var myAnimatedModel = require('js/animateModel');
var utils = require('js/utils');
var globals = require('js/globals');

var res = utils.getResourcesJSON();
var layouts = utils.getLayoutsJSON();
var paths = res.bodypartPaths;

var placeToCenter = function(sO, tG, tS){
	var gameCenterX = tG.screen.width/2;
	var gameCenterY = tG.screen.height*0.56;

	var sCenterX = sO.width/2;
	var sCenterY = sO.height/2;
	
	sO.move(gameCenterX-sCenterX, gameCenterY-sCenterY);
};

var body;

var head;
var neck;

var rightShoulder;
var rightForearm;
var rightPalm;
var leftShoulder;
var leftForearm;
var leftPalm;

var pants;
var rightThigh;
var rightShin;
var rightFoot;
var leftThigh
var leftShin;
var leftFoot;

var drawModel = function(toGame, toScene){
//=========================================
	body = qtg.createSpriteSheet({image:paths.body+'body_'+Ti.App.res+'.xml'});
	Ti.App.bodyGlobal = body;
	Ti.App.bodyOffset=0;
	neck = qtg.createSpriteSheet({image:paths.neck+'neck_'+Ti.App.res+'.xml'});
	head = qtg.createSpriteSheet({image:paths.head+'head_'+Ti.App.res+'.xml'});
	
	//left leg
	leftThigh = qtg.createSpriteSheet({image:paths.thigh+'lthigh_'+Ti.App.res+'.xml'});
	leftShin = qtg.createSpriteSheet({image:paths.shin+'lshin_'+Ti.App.res+'.xml'});
	leftFoot = qtg.createSpriteSheet({image:paths.foot+'lfoot_'+Ti.App.res+'.xml'});
	//right leg
	rightThigh = qtg.createSpriteSheet({image:paths.thigh+'rthigh_'+Ti.App.res+'.xml'});
	rightShin = qtg.createSpriteSheet({image:paths.shin+'rshin_'+Ti.App.res+'.xml'});
	rightFoot = qtg.createSpriteSheet({image:paths.foot+'rfoot_'+Ti.App.res+'.xml'});
	// pants
	pants = qtg.createSpriteSheet({image:paths.pants+'pants_'+Ti.App.res+'.xml'});
	
	//left hand
	leftShoulder = qtg.createSpriteSheet({image:paths.shoulder+'lshoulder_'+Ti.App.res+'.xml'});
	leftForearm = qtg.createSpriteSheet({image:paths.forearm+'lforearm_'+Ti.App.res+'.xml'});
	leftPalm = qtg.createSpriteSheet({image:paths.palm+'lpalm_'+Ti.App.res+'.xml'});
	//right hand
	rightShoulder = qtg.createSpriteSheet({image:paths.shoulder+'rshoulder_'+Ti.App.res+'.xml'});
	rightForearm = qtg.createSpriteSheet({image:paths.forearm+'rforearm_'+Ti.App.res+'.xml'});
	rightPalm = qtg.createSpriteSheet({image:paths.palm+'rpalm_'+Ti.App.res+'.xml'});
	
	//attach points
	var neckPoint = {x: (body.width/2)-(neck.width/2), y: -neck.height*0.8};
	var headPoint = {x: (neck.width/2)-(head.width/2), y: -head.height*0.9};
	
	var leftThighPoint = {x: (body.width/2)+(body.width*0.14), y: body.height*0.92};
	var leftShinPoint = {x: (leftThigh.width/2)-(leftShin.width/2), y: leftThigh.height*0.92};
	var leftFootPoint = {x: (leftShin.width/2)-(leftFoot.width/2), y: leftShin.height*0.92};
	
	var rightThighPoint = {x: (body.width/2)-(body.width*0.5), y: body.height*0.92};
	var rightShinPoint = {x: (rightThigh.width/2)-(rightShin.width/2), y: rightThigh.height*0.92};
	var rightFootPoint = {x: (rightShin.width/2)-(rightFoot.width/2), y: rightShin.height*0.92};
	
	var leftShoulderPoint = {x: (body.width/2)+(body.width*0.2), y: body.height*0.02};
	var leftForearmPoint = {x: (leftShoulder.width/2)-(leftForearm.width/2), y: leftShoulder.height*0.92};
	var leftPalmPoint = {x: (leftForearm.width/2)-(leftPalm.width/2), y: leftForearm.height*0.92};
	
	var rightShoulderPoint = {x: (body.width/2)-(body.width*0.6), y: body.height*0.02};
	var rightForearmPoint = {x: (rightShoulder.width/2)-(rightForearm.width/2), y: rightShoulder.height*0.92};
	var rightPalmPoint = {x: (rightForearm.width/2)-(rightPalm.width/2), y: rightForearm.height*0.92};
	
	var pantsPoint = {x: (body.width-pants.width)/2, y: body.height-pants.height};
	//===
	var drawBody = function(){
		placeToCenter(body, toGame, toScene);
		body.z = 80;
		toScene.add(body);
		Ti.App.bodyX = body.center.x;
		Ti.App.bodyY = body.center.y;
		Ti.App.D = Math.sqrt(Math.pow(body.width/2, 2) + Math.pow(body.height/2, 2));
		Ti.App.a = Math.asin( (body.width/2)/Ti.App.D) * 180/Math.PI;
	};
	
	var drawPart = function(child, parent, attachPoint, zIndex){
		child.move(parent.x+attachPoint.x, parent.y+attachPoint.y);
		child.z = zIndex;
		toScene.add(child);	
	};
	
	//draw section
	drawBody();
	drawPart(neck, body, neckPoint, 70);
	drawPart(head, neck, headPoint, 80);
	//===draw left leg
	drawPart(leftThigh, body, leftThighPoint, 70);
	drawPart(leftShin, leftThigh, leftShinPoint, 60);
	drawPart(leftFoot, leftShin, leftFootPoint, 70);
	//===draw right leg
	drawPart(rightThigh, body, rightThighPoint, 70);
	drawPart(rightShin, rightThigh, rightShinPoint, 60);
	drawPart(rightFoot, rightShin, rightFootPoint, 70);
	// PANTS
	drawPart(pants, body, pantsPoint, 90);
	//===draw left hand
	drawPart(leftShoulder, body, leftShoulderPoint, 90);
	drawPart(leftForearm, leftShoulder, leftForearmPoint, 80);
	drawPart(leftPalm, leftForearm, leftPalmPoint, 90);
	//===draw right hand
	drawPart(rightShoulder, body, rightShoulderPoint, 90);
	drawPart(rightForearm, rightShoulder, rightForearmPoint, 80);
	drawPart(rightPalm, rightForearm, rightPalmPoint, 90);
	
	
//=========================================
setTimeout(function(){
	myAnimatedModel.setLimbParts('leftHand', leftShoulder, leftForearm, leftPalm);
	myAnimatedModel.setLimbParts('rightHand', rightShoulder, rightForearm, rightPalm);
	myAnimatedModel.setLimbParts('leftLeg', leftThigh, leftShin, leftFoot);
	myAnimatedModel.setLimbParts('rightLeg', rightThigh, rightShin, rightFoot);
	myAnimatedModel.setLimbParts('head', neck, head);
	myAnimatedModel.setPants(pants);
	
	myAnimatedModel.animateBody(body);
	
	var player = Ti.Media.createSound({url:"sounds/dance.mp3"});
	//player.play();
}, 50)
//=========================================	
};

exports.changeBody = function(_type, _num){
	var target=[];
	if(_type === 'body'){
		target.push(body);
		globals.currentBody = _num;
	}else if(_type === 'head'){
		target.push(neck);
		target.push(head);
	}else if(_type === 'legs'){
		target.push(pants);
		target.push(rightThigh);
		target.push(rightShin);
		target.push(rightFoot);
		target.push(leftThigh);
		target.push(leftShin);
		target.push(leftFoot);
	}else{
		target.push(rightShoulder);
		target.push(rightForearm);
		target.push(rightPalm);
		target.push(leftShoulder);
		target.push(leftForearm);
		target.push(leftPalm);
	}
	
	for(var i =0; i< target.length; i++){
		target[i].frame = _num;

		var t  = qtg.createTransform();
		var k = body.width*layouts[globals.currentBody].pantsModifier/pants.width;
		t.scale(k, k*2.2);
		pants.transform(t);
	}
	
	Ti.App.D = Math.sqrt(Math.pow(body.width/2, 2) + Math.pow(body.height/2, 2));
	Ti.App.a = Math.asin( (body.width/2)/Ti.App.D) * 180/Math.PI;
}

exports.drawModel = drawModel;