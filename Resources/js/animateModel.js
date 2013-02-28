/**
 * @author bonovisio
 */
var qtg = require('com.googlecode.quicktigame2d');

var rad = Math.PI/180;
var xR = function(part){
	return Math.sin(part*rad);
};

var yR = function(part){
	return Math.cos(part*rad);
};

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

var animateLimb = function(p1, p2, p3, assets){
	
	var p1Rot = 0;
	var p2Rot = 0;
	var p3Rot = 0;
	var frameCount = 0;
	
	var movement = function(){
		p1Rot = assets[0]+assets[1]*Math.sin(frameCount/assets[2]);
		p2Rot = assets[3]+assets[4]*Math.sin(frameCount/assets[5]);
		p3Rot = assets[6]+assets[7]*Math.sin(frameCount/assets[8]);
		frameCount++;
		
		var p1Transform = qtg.createTransform({duration:30});
		p1Transform.rotateFrom(p1Rot, p1.width*0.5, p1.height*0.1);
		p1.transform(p1Transform);
		
		var p2Transform = qtg.createTransform({duration:30});
		p2Transform.rotateFrom(p2Rot, p2.width*0.5, p2.height*0.1);
		p2Transform.move(p1.x - p1.height*0.8*xR(p1Rot), p1.y+p1.height*0.8*yR(p1Rot));
		p2.transform(p2Transform);
		
		var p3Transform = qtg.createTransform({duration:30});
		p3Transform.rotateFrom(p3Rot, p3.width*0.5, p3.height*0.1);
		p3Transform.move(p2.x - p2.height*0.9*xR(p2Rot), p2.y+p2.height*0.9*yR(p2Rot));
		p3.transform(p3Transform);
	};
	
	setInterval(movement, 30);
};

exports.animateHead = animateHead;
exports.animateLimb = animateLimb;