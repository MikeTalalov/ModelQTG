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
	
	var assets=[0, 10, 16, 0, 20, 16];
	var neckRot = 0;
	var headRot = 0;
	var frameCount = 0;
	
	var movement = function(){
		neckRot = assets[0]+assets[1]*Math.sin(frameCount/assets[2]);
		headRot = assets[3]+assets[4]*Math.sin(frameCount/assets[5]);
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
	
	setInterval(movement, 40);
};

var animateLimb = function(p1, p2, p3, asset, _toTrace){
	var p1Rot = 0;
	var p2Rot = 0;
	var p3Rot = 0;
	var frame = 0;
	
	var movement = function(){
		p1Rot = asset[frame].p1;
		p2Rot = asset[frame].p2;
		p3Rot = asset[frame].p2;
		
		(frame<(asset.length-1))? frame++ : frame = 0;
		p1.rotateFrom(p1Rot, p1.width*0.5, p1.height*0.1);
		

		p2.rotateFrom(p2Rot, p2.width*0.5, p2.height*0.1);
		var x1 = Math.round( p1.x- p1.height*0.8*xR(p1Rot) );
		var y1 = Math.round( p1.y + p1.height*0.8*yR(p1Rot));
		p2.move(x1, y1);
		
		p3.rotateFrom(p3Rot, p3.width*0.5, p3.height*0.5);
		var x2 = Math.round(x1 - p2.height*0.9*xR(p2Rot));
		var y2 = Math.round(y1 + p2.height*0.9*yR(p2Rot))
		p3.move(x2,y2);
	};
	
	setInterval(movement, 800);
};

exports.animateHead = animateHead;
exports.animateLimb = animateLimb;