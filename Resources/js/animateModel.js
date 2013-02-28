/**
 * @author bonovisio
 */
var qtg = require('com.googlecode.quicktigame2d');

var animateHead = function(neck, head){
	
	var assets=[[0, 10, 16, 0, 20, 16],
				[0, 25, 8, -20, 40, 8],
				[90, 45, 16, 120, 20, 16]]
	var neckRot = 0;
	var headRot = 0;
	var frameCount = 0;
	
	var movement = function(){
		neckRot = assets[0][0]+assets[0][1]*Math.sin(frameCount/assets[0][2]);
		headRot = assets[0][3]+assets[0][4]*Math.sin(frameCount/assets[0][5]);
		frameCount++;
		
		var neckTransform = qtg.createTransform();
		neckTransform.duration = 30;
		neckTransform.rotateFrom(neckRot, neck.width*0.5, neck.height*0.9);
		neck.transform(neckTransform);
		
		var headTransform = qtg.createTransform();
		headTransform.duration = 30;
		headTransform.rotateFrom(headRot, head.width*0.5, head.height*0.9);
		//headTransform.move(neck.x - neck.height*Math.sin(neckRot*Math.PI/180)*0.8, neck.y-neck.height*Math.cos(neckRot*Math.PI/180)*0.8);
		head.transform(headTransform);
	};
	
	setInterval(movement, 30);
};

var animateLeftHand = function(shoulder, forearm, palm){
	
	var assets=[[-30, 10, 10, 20, 20, 16, 10, 10, 16],
				[0, 25, 8, -20, 40, 8],
				[90, 45, 16, 120, 20, 16]]
	var shoulderRot = 0;
	var headRot = 0;
	var palmRot = 0;
	var frameCount = 0;
	
	var movement = function(){
		shoulderRot = assets[0][0]+assets[0][1]*Math.sin(frameCount/assets[0][2]);
		forearmRot = assets[0][3]+assets[0][4]*Math.sin(frameCount/assets[0][5]);
		palmRot = assets[0][6]+assets[0][7]*Math.sin(frameCount/assets[0][8]);
		frameCount++;
		
		var shoulderTransform = qtg.createTransform();
		shoulderTransform.duration = 30;
		shoulderTransform.rotateFrom(shoulderRot, shoulder.width*0.5, shoulder.height*0.1);
		shoulder.transform(shoulderTransform);
		
		var forearmTransform = qtg.createTransform();
		forearmTransform.duration = 30;
		forearmTransform.rotateFrom(forearmRot, forearm.width*0.5, forearm.height*0.1);
		forearmTransform.move(shoulder.x - shoulder.height*Math.sin(shoulderRot*Math.PI/180)*0.8, shoulder.y+shoulder.height*Math.cos(shoulderRot*Math.PI/180)*0.8);
		forearm.transform(forearmTransform);
		
		var palmTransform = qtg.createTransform();
		palmTransform.duration = 30;
		palmTransform.rotateFrom(palmRot, palm.width*0.5, palm.height*0.1);
		palmTransform.move(forearm.x - forearm.height*Math.sin(forearmRot*Math.PI/180)*0.92, forearm.y+shoulder.height*Math.cos(forearmRot*Math.PI/180)*0.92);
		palm.transform(palmTransform);
	};
	
	setInterval(movement, 30);
};

exports.animateHead = animateHead;
exports.animateLeftHand = animateLeftHand;

//==========
/*
function movement(){

	var handTransform  = qtg.createTransform();
	handTransform.duration = 30;
	handTransform.rotateFrom(shoulderRot, 0.5*ob.hand.width, 0.1*ob.hand.height);
	ob.hand.transform(handTransform);
	
	var forearmTransform  = qtg.createTransform();
	forearmTransform.duration = 30;
	forearmTransform.rotateFrom(forearmRot, 0.5*ob.forearm.width, 0.1*ob.forearm.height);
	forearmTransform.move(ob.hand.x - ob.hand.height*Math.sin(shoulderRot*Math.PI/180)*0.8, ob.hand.y+ob.hand.height*Math.cos(shoulderRot*Math.PI/180)*0.8);
	ob.forearm.transform(forearmTransform);
}

module.exports = LeftHand;
*/