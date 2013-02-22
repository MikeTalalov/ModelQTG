var qtg = require('com.googlecode.quicktigame2d');

var ob;
var shoulderRot = 0;
var forearmRot = 0;
var frameCount = 0;

var assets=[[-50, -25, 16, -65, -50, 16],
			[0, 25, 8, -20, 40, 8],
			[90, 45, 16, 120, 20, 16]]

function LeftHand() {
	ob = this;
	
	ob.hand = qtg.createSprite({image:'images/limb_'+Ti.App.RES+'.png'});
	ob.forearm = qtg.createSprite({image:'images/limb_'+Ti.App.RES+'.png'});

	setInterval(movement, 30);
}

function movement(){
	shoulderRot = assets[Ti.App.currentAssert][0]+assets[Ti.App.currentAssert][1]*Math.sin(frameCount/assets[Ti.App.currentAssert][2]);
	forearmRot = assets[Ti.App.currentAssert][3]+assets[Ti.App.currentAssert][4]*Math.sin(frameCount/assets[Ti.App.currentAssert][5]);
	frameCount++;
	
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