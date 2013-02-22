var qtg = require('com.googlecode.quicktigame2d');

var ob;
var thighRot = 0;
var shinRot = 0;
var frameCount = 0;

var assets=[[-30, -15, 16, 30, 15, 16],
			[0, 25, 8, -20, 40, 8],
			[90, 45, 16, 120, 20, 16]]

function LeftLeg() {
	ob = this;
	
	ob.thigh = qtg.createSprite({image:'images/limb_'+Ti.App.RES+'.png'});
	ob.shin = qtg.createSprite({image:'images/limb_'+Ti.App.RES+'.png'});

	setInterval(movement, 30);
}

function movement(){
	thighRot = assets[Ti.App.currentAssert][0]+assets[Ti.App.currentAssert][1]*Math.sin(frameCount/assets[Ti.App.currentAssert][2]);
	shinRot = assets[Ti.App.currentAssert][3]+assets[Ti.App.currentAssert][4]*Math.sin(frameCount/assets[Ti.App.currentAssert][5]);
	frameCount++;
	
	var legTransform  = qtg.createTransform();
	legTransform.duration = 30;
	legTransform.rotateFrom(thighRot, 0.5*ob.thigh.width, 0.1*ob.thigh.height);
	ob.thigh.transform(legTransform);
	
	var shinTransform  = qtg.createTransform();
	shinTransform.duration = 30;
	shinTransform.rotateFrom(shinRot, 0.5*ob.shin.width, 0.1*ob.shin.height);
	shinTransform.move(ob.thigh.x - ob.thigh.height*Math.sin(thighRot*Math.PI/180)*0.8, ob.thigh.y+ob.thigh.height*Math.cos(thighRot*Math.PI/180)*0.8);
	ob.shin.transform(shinTransform);
}

module.exports = LeftLeg;