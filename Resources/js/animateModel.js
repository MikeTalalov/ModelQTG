/**
 * @author bonovisio
 */

// CONSTANTS

const RIGHT_HAND = 'rightHand';
const LEFT_HAND = 'leftHand';
const RIGHT_LEG = 'rightLeg';
const LEFT_LEG = 'leftLeg';
const HEAD = 'head';

// VARS

var qtg = require('com.googlecode.quicktigame2d');
var utils = require('js/utils');
var importAsset = require('js/importAsset');
var globals = require('js/globals');

var rad = Math.PI/180;
var speed = Math.round(1000/30);

var assetBody = importAsset.bodyAsset();
var assetHead = importAsset.headAsset();
var assetLH = importAsset.leftHandAsset();
var assetRH = importAsset.rightHandAsset();
var assetLL = importAsset.leftLegAsset();
var assetRL = importAsset.rightLegAsset();

var deltaX;
var deltaY;
var body;

var leftHand={p1:null, p2:null, p3:null};
var rightHand={p1:null, p2:null, p3:null};
var leftLeg={p1:null, p2:null, p3:null};
var rightLeg={p1:null, p2:null, p3:null};
var head={neck:null, head:null};
var pants;

var totalFrame=0;
var layouts = utils.getLayoutsJSON();

// EXPORTS

exports.setLimbParts = function(type, p1, p2, p3){
	switch(type){
		case LEFT_HAND:
			leftHand.p1 = p1;
			leftHand.p2 = p2;
			leftHand.p3 = p3;
		break;
		
		case RIGHT_HAND:
			rightHand.p1 = p1;
			rightHand.p2 = p2;
			rightHand.p3 = p3;
		break;
		
		case LEFT_LEG:
			leftLeg.p1 = p1;
			leftLeg.p2 = p2;
			leftLeg.p3 = p3;
		break;
		
		case RIGHT_LEG:
			rightLeg.p1 = p1;
			rightLeg.p2 = p2;
			rightLeg.p3 = p3;
		break;
		
		case HEAD:
			head.neck = p1;
			head.head = p2;
		break;
	}
}

exports.setPants = function(_pants){
	pants=_pants;
}

exports.animateBody = function(_body){
	
	var bodyRot = 0;
	var frame = 0;
	body = _body;
	// test
	var movement = function(){
		
		totalFrame++;
		
		bodyRot = assetBody[totalFrame%assetBody.length].rotation;
		deltaX = assetBody[totalFrame%assetBody.length].deltaX;
		deltaY = assetBody[totalFrame%assetBody.length].deltaY;
		body.setCenter({'x':Ti.App.bodyX+deltaX, 'y':Ti.App.bodyY+deltaY-Ti.App.bodyOffset});
		body.rotateFrom(bodyRot, body.width*0.5, body.height*0.5);
		
		var f0 = totalFrame%assetBody.length;
		var f1 = animateHead(totalFrame);
		var f2 = animateLimb(RIGHT_HAND, totalFrame);
		var f3 = animateLimb(LEFT_HAND, totalFrame);
		var f4 = animateLimb(RIGHT_LEG, totalFrame);
		var f5 = animateLimb(LEFT_LEG, totalFrame);
		animatePants(totalFrame);
		
		if(f0===0 && f1===0 && f2===0 && f3===0 && f4===0 && f5===0){
			totalFrame=0;
		}
	};
	
	setInterval(movement, speed);
};

exports.changeAsset = function(_part){
	if(_part === 'body'){
		assetBody = importAsset.bodyAsset();
		assetLL = importAsset.leftLegAsset();
		assetRL = importAsset.rightLegAsset();
	}else if(_part ==='head'){
		assetHead = importAsset.headAsset();
	}else{
		assetLH = importAsset.leftHandAsset();
		assetRH = importAsset.rightHandAsset();
	}
}

// FUNCTIONS

function animateHead(frame){
	var neckRot = assetHead[frame%assetHead.length].neckRotation;
	var headRot = assetHead[frame%assetHead.length].headRotation;
	
	head.neck.setCenter({
		x:body.center.x + xR(body.angle)*body.height*0.5,
		y:body.center.y - yR(body.angle)*body.height*0.5
	})
	head.neck.rotateFrom(neckRot+body.angle, head.neck.width*0.5, head.neck.height*0.9);
	
	head.head.rotate(headRot+body.angle);
	head.head.setCenter({
		x: head.neck.center.x + xR(neckRot+body.angle)*(head.head.height/2+head.neck.height/4), 
		y: head.neck.center.y - yR(neckRot+body.angle)*(head.head.height/2+head.neck.height/4)
	});
	
	return frame%assetHead.length;
};

function animatePants(frame){
	pants.setCenter({
		x:body.center.x + xR(body.angle)*(body.height*0.5-pants.height/2),
		y:body.center.y + yR(body.angle)*(body.height*0.5-pants.height/2)
	})
	pants.rotateFrom(body.angle, pants.width*0.5, pants.height*0.5);
};

function animateLimb(type, frame){
	var limb;
	var asset;
	var angle;
	var D = Ti.App.D;
	
	switch(type){
		case RIGHT_HAND:
			limb = rightHand;
			asset = assetRH;
			angle = 270+(body.angle-Ti.App.a)-layouts[globals.currentBody].hands.angle;
			D*=layouts[globals.currentBody].hands.length;
		break;
		case LEFT_HAND:
			limb = leftHand;
			asset = assetLH;
			angle = 270+(body.angle+Ti.App.a)+layouts[globals.currentBody].hands.angle;
			D*=layouts[globals.currentBody].hands.length;
		break;
		case RIGHT_LEG:
			limb = rightLeg;
			asset = assetRL;
			angle = 90+(body.angle)+layouts[globals.currentBody].legs.angle;
			D*=layouts[globals.currentBody].legs.length;
		break;
		case LEFT_LEG:
			limb = leftLeg;
			asset = assetLL;
			angle = 90+(body.angle)-layouts[globals.currentBody].legs.angle;	
			D*=layouts[globals.currentBody].legs.length;
		break;
	}
	var p1Rot = asset[frame%asset.length].p1+body.angle;
	var p2Rot = asset[frame%asset.length].p2+body.angle;
	var p3Rot = asset[frame%asset.length].p2+body.angle;
	
	var p1 = limb.p1;
	var p2 = limb.p2;
	var p3 = limb.p3;
	p1.rotateFrom(p1Rot, p1.width*0.5, p1.height*0.1);
	
	var dX = body.center.x+D*yR(angle);
	var dY = body.center.y+D*xR(angle);
	
	var determ = -p1.width/2;
	p1.move(dX+determ, dY);
	
	p2.rotateFrom(p2Rot, p2.width*0.5, p2.height*0.1);
	var x1 = Math.round( p1.x- p1.height*0.8*xR(p1Rot) );
	var y1 = Math.round( p1.y + p1.height*0.8*yR(p1Rot));
	p2.move(x1, y1);
	
	p3.rotateFrom(p3Rot, p3.width*0.5, p3.height*0.5);
	var x2 = Math.round(x1 - p2.height*0.9*xR(p2Rot));
	var y2 = Math.round(y1 + p2.height*0.9*yR(p2Rot))
	p3.move(x2,y2);
	
	return frame%asset.length;
};

function xR(part){
	return Math.sin(part*rad);
};

function yR(part){
	return Math.cos(part*rad);
};
