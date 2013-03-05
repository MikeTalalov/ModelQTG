/**
 * @author bonovisio
 */

var qtg = require('com.googlecode.quicktigame2d');
var rad = Math.PI/180;
var speed = 30;
var xR = function(part){
	return Math.sin(part*rad);
};

var yR = function(part){
	return Math.cos(part*rad);
};

exports.animateBody = function(body, asset){
	
	var bodyRot = 0;
	var frame = 0;
	var movement = function(){
		(frame<(asset.length-1))? frame++ : frame = 0;
		
		bodyRot = asset[frame].rotation;
		deltaX = asset[frame].deltaX;
		deltaY = asset[frame].deltaY;
		Ti.App.deltaX = deltaX;
		Ti.App.deltaY = deltaY;
		
		body.setCenter({'x':Ti.App.bodyX+deltaX, 'y':Ti.App.bodyY+deltaY});
		body.rotateFrom(bodyRot, body.width*0.5, body.height*0.5);
		//body.move(Ti.App.bodyX+deltaX, Ti.App.bodyY+deltaY);
	};
	
	setInterval(movement, speed);
};

exports.animateHead = function(neck, head,  asset){
	
	var neckRot = 0;
	var headRot = 0;
	var frame = 0;
	var movement = function(){
		(frame<(asset.length-1))? frame++ : frame = 0;
		
		neckRot = asset[frame].neckRotation;
		headRot = asset[frame].headRotation;
		
		neck.rotateFrom(neckRot+Ti.App.body.angle, neck.width*0.5, neck.height*0.9);
		neck.move(Ti.App.body.x + xR(Ti.App.body.angle)*Ti.App.body.height*0.5, Ti.App.body.y-yR(Ti.App.body.angle)*Ti.App.body.height*0.5)
		
		head.rotateFrom(headRot, head.width*0.5, head.height*0.5);
		var x1 = Math.round( neck.x - head.width*0.5 + neck.width*0.5 + neck.height*xR(neckRot) );
		var y1 = Math.round( neck.y - head.height*0.5 - neck.height*yR(neckRot));
		head.move(x1, y1);
	};
	
	setInterval(movement, speed);
};

exports.animateLimb = function(p1, p2, p3, asset, type){
	var p1Rot = 0;
	var p2Rot = 0;
	var p3Rot = 0;
	var frame = 0;
	
	var movement = function(){
		p1Rot = asset[frame].p1+Ti.App.body.angle;
		p2Rot = asset[frame].p2+Ti.App.body.angle;
		p3Rot = asset[frame].p2+Ti.App.body.angle;
		
		(frame<(asset.length-1))? frame++ : frame = 0;
		
		p1.rotateFrom(p1Rot, p1.width*0.5, p1.height*0.1);
		
		var ang;
		var ds = Math.sqrt( Math.pow(p1.width*0.5, 2) + Math.pow(p1.height*0.1, 2) );
		var as = Math.asin( (p1.width*0.5)/ds ) * 180/Math.PI;
		var ang2 = 270+(p1Rot-as);
		
		switch(type){
			case 'LT':
				ang = 270+(Ti.App.body.angle+Ti.App.a);	
			break;
			case 'RT':
				ang = 270+(Ti.App.body.angle-Ti.App.a);
			break;
			case 'LB':
				ang = 90+(Ti.App.body.angle-Ti.App.a);	
			break;
			case 'RB':
				ang = 90+(Ti.App.body.angle+Ti.App.a);
			break;
		}
		
		var dX = Ti.App.body.center.x+Ti.App.D*yR(ang);
		var dY = Ti.App.body.center.y+Ti.App.D*xR(ang);
		
		var dXs = ds*Math.cos( (ang2)*Math.PI/180 );
		var dYs = ds*Math.sin( (ang2)*Math.PI/180 );
		
		p1.move(dX+dXs, dY+dYs);
		//p1.move(dX, dY);
		//Ti.App.heart.setCenter({x:45+dXs, y:45+dYs});
		
		p2.rotateFrom(p2Rot, p2.width*0.5, p2.height*0.1);
		var x1 = Math.round( p1.x- p1.height*0.8*xR(p1Rot) );
		var y1 = Math.round( p1.y + p1.height*0.8*yR(p1Rot));
		p2.move(x1, y1);
		
		p3.rotateFrom(p3Rot, p3.width*0.5, p3.height*0.5);
		var x2 = Math.round(x1 - p2.height*0.9*xR(p2Rot));
		var y2 = Math.round(y1 + p2.height*0.9*yR(p2Rot))
		p3.move(x2,y2);
	};
	
	setInterval(movement, speed);
};
