var qtg = require('com.googlecode.quicktigame2d');
var myDrawModel = require('js/drawModel');
var myAnimatedModel = require('js/animateModel');
var importAsset = require('js/importAsset');

var scrollView = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: false,
  showHorizontalScrollIndicator: true,
  height: '100%',
  width: '100%'
});

var menuView = Titanium.UI.createView({
		borderRadius:0,
		backgroundColor:'red',
		opacity: 0.5,
		left: 0
	});

var leftMargin = 2;

for (var i = 0; i < 8*10; i++){
	var item = Ti.UI.createImageView({
		image:'/images/items/item'+(i%8)+'.png',
		top: 10,
		left: leftMargin
	});
	item.name = 'image'+i;
	scrollView.add(item);
	leftMargin+=32;
	item.addEventListener('click', myDrawModel.changeBody);
};
	
exports.drawGameMenu = function(toWin, toGame){
	menuView.setWidth(toGame.screen.width);
	menuView.setHeight(toGame.screen.height*0.25);
	menuView.setTop(toGame.screen.height*0.98);
	menuView.add(scrollView);
	toWin.add(menuView);
}

exports.moveUp = function(){
	var menuMoveUp = Titanium.UI.createAnimation({
		duration: 500,
		top: game.size.height*0.8
	});
	menuView.animate(menuMoveUp)
};

exports.moveDown = function(){
	var menuMoveDown = Titanium.UI.createAnimation({
		duration: 500,
		top: game.size.height*0.98
	});
	menuView.animate(menuMoveDown)
};

var leftBodyArr;
var rightBodyArr;
var leftHeadArr;
var rightHeadArr;
var leftHandsArr;
var rightHandsArr;
var arrows;

exports.drawArrows = function(_win, _game){
	var img = 'images/arrow/arrow_'+Ti.App.res + '.png';
	var imgS = 'images/arrow/arrowS_'+Ti.App.res + '.png'
	
	leftBodyArr = Ti.UI.createButton({backgroundImage:img, backgroundSelectedImage:imgS, top:350, left:5, transform:Ti.UI.create2DMatrix().scale(-1, 1), name:'leftBodyArr' });
	rightBodyArr = Ti.UI.createButton({backgroundImage:img, backgroundSelectedImage:imgS, top:350, right:5, name:'rightBodyArr' });
	leftHeadArr = Ti.UI.createButton({backgroundImage:img, backgroundSelectedImage:imgS, top:50, left:5, transform:Ti.UI.create2DMatrix().scale(-1, 1), name:'leftHeadArr' });
	rightHeadArr = Ti.UI.createButton({backgroundImage:img, backgroundSelectedImage:imgS, top:50, right:5, name:'rightHeadArr' });
	leftHandsArr = Ti.UI.createButton({backgroundImage:img, backgroundSelectedImage:imgS, top:200, left:5, transform:Ti.UI.create2DMatrix().scale(-1, 1), name:'leftHandsArr' });
	rightHandsArr = Ti.UI.createButton({backgroundImage:img, backgroundSelectedImage:imgS, top:200, right:5, name:'rightHandsArr' });
	
	arrows = [leftBodyArr, rightBodyArr, leftHeadArr, rightHeadArr, leftHandsArr, rightHandsArr]; 
	for(var i= 0; i< arrows.length; i++){
		_win.add(arrows[i]);
		arrows[i].width = 63*(Ti.App.res/320);
		arrows[i].height = arrows[i].width;
		arrows[i].visible=false;
		arrows[i].addEventListener('click', onClick);
	}
}

function onClick(e){
	var part;
	var dir;
	for(var i=0; i< arrows.length; i++){
		if(e.source === arrows[i]){
			if( arrows[i].name.indexOf('right')!=-1) dir = 'right';
			else dir = 'left';

			if( arrows[i].name.indexOf('Body') != -1 ) part = 'body';
			else if( arrows[i].name.indexOf('Head') != -1 ) part = 'head';
			else part = 'hands';
			
			break;
		}
	}
	importAsset.changeCurrentAsset(part, dir);
	myAnimatedModel.changeAsset(part);
}

exports.setArrowsVisible=function(){
	var vis = arrows[0].visible;
	vis = !vis;	
	for(var i= 0; i< arrows.length; i++){
		arrows[i].visible = vis;
	}
}

//leg slider
var slider = Titanium.UI.createSlider({
	top: 50,
    min: 0,
    max: 100,
    width: '100%',
    value: 50
});

var label = Ti.UI.createLabel({
    text: slider.value,
    width: '100%',
    height: 'auto',
    top: 30,
    left: 0,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });

slider.addEventListener('change', function(e) {
    label.text = String.format("%3.1f", e.value);
    Ti.App.Dmod = Math.sqrt(Math.pow(Ti.App.bodyGlobal.width*e.value/2, 2) + Math.pow(Ti.App.bodyGlobal.height/2, 2))*0.9;
    Ti.App.b = Math.asin( (Ti.App.bodyGlobal.width*e.value/100)/Ti.App.Dmod) * 180/Math.PI;
    Ti.API.info(e.value/100);
});

exports.drawLegSlider = function(toWin, toGame){
	toWin.add(label);
	toWin.add(slider);
	Ti.App.legDistance = slider.value/100;
};
