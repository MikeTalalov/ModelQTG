var qtg = require('com.googlecode.quicktigame2d');
var myDrawModel = require('js/drawModel');
var myAnimatedModel = require('js/animateModel');
var importAsset = require('js/importAsset');

/**
 * monster creation menu with part items
 */

//partsMenuView - the main view for all menu views
var partsMenuView = Ti.UI.createView({
	borderRadius:0,
	opacity: 1,
	left: 0
});

var makeMenuProps = function(typeOfMenu, res, zI) {
	var props = {
		zIndex: zI,
		borderRadius: 0,
		opacity: 1,
		left: 0,
		height: '100%',
		width: '100%'
	};
	props.image = 'images/menu/'+typeOfMenu+'/'+typeOfMenu+'_off_'+res+'.png';
	return props;
};

var makeScrollProps = function() {
	var props = {
		contentWidth: 'auto',
		contentHeight: 'auto',
		showVerticalScrollIndicator: false,
		showHorizontalScrollIndicator: false,
		height: '60%',
		width: '100%'
	};
	return props;
};

var fillItemList = function(o, typeOfMenu) {
	var leftMargin = 2;
	for (var i = 0; i < 8*10; i++){
		name = 'image'+i;
		var name = Ti.UI.createImageView({
			image:'/images/items/item'+(0+i%8)+'.png',
			top: headList.height/4,
			left: leftMargin
		});
		o.add(name);
		leftMargin+=32;
	};
};	

exports.drawGameMenu = function(toWin, toGame){
	var scrW = toGame.screen.width;
	var scrH = toGame.screen.height*0.25;
	var scrT = toGame.screen.height*0.95;
	
	//partsMenuView.add(scrollView);
	partsMenuView.width = scrW;
	partsMenuView.height = scrH;
	partsMenuView.top = scrT;
	
	headMenu = Ti.UI.createImageView(makeMenuProps('head', Ti.App.res, 1));
	bodyMenu = Ti.UI.createImageView(makeMenuProps('body', Ti.App.res, 0));
	handsMenu = Ti.UI.createImageView(makeMenuProps('hands', Ti.App.res, 0));
	legsMenu = Ti.UI.createImageView(makeMenuProps('legs', Ti.App.res, 0));

	headList = Ti.UI.createScrollView(makeScrollProps());
	fillItemList(headList, 'head');
	
	bodyList = Ti.UI.createScrollView(makeScrollProps());
	fillItemList(bodyList, 'body');
	
	headMenu.add(headList);
	bodyMenu.add(bodyList);
	//handsMenu.add(handsList);
	//legsMenu.add(legsList);
	
	partsMenuView.add(headMenu);
	partsMenuView.add(bodyMenu);
	partsMenuView.add(handsMenu);
	partsMenuView.add(legsMenu);
	
	toWin.add(partsMenuView);
}

partsMenuView.addEventListener('click', function(e){
	var w = partsMenuView.width, h = partsMenuView.height;
	if ( (e.x>w-w) && (e.x<w/4) && (e.y<h/5) ) {
		partsMenuView.children[0].zIndex = 1; partsMenuView.children[0].setImage('images/menu/head/head_on_'+Ti.App.res+'.png');
		partsMenuView.children[1].zIndex = 0; partsMenuView.children[1].setImage('images/menu/body/body_off_'+Ti.App.res+'.png');
		partsMenuView.children[2].zIndex = 0; partsMenuView.children[2].setImage('images/menu/hands/hands_off_'+Ti.App.res+'.png');
		partsMenuView.children[3].zIndex = 0; partsMenuView.children[3].setImage('images/menu/legs/legs_off_'+Ti.App.res+'.png');
	};
	if ( (e.x>w/4) && (e.x<w/4*2) && (e.y<h/5) ) {
		partsMenuView.children[0].zIndex = 0; partsMenuView.children[0].setImage('images/menu/head/head_off_'+Ti.App.res+'.png');
		partsMenuView.children[1].zIndex = 1; partsMenuView.children[1].setImage('images/menu/body/body_on_'+Ti.App.res+'.png');
		partsMenuView.children[2].zIndex = 0; partsMenuView.children[2].setImage('images/menu/hands/hands_off_'+Ti.App.res+'.png');
		partsMenuView.children[3].zIndex = 0; partsMenuView.children[3].setImage('images/menu/legs/legs_off_'+Ti.App.res+'.png');
	};
	if ( (e.x>w/4*2) && (e.x<w/4*3) && (e.y<h/5) ) {
		partsMenuView.children[0].zIndex = 0; partsMenuView.children[0].setImage('images/menu/head/head_off_'+Ti.App.res+'.png');
		partsMenuView.children[1].zIndex = 0; partsMenuView.children[1].setImage('images/menu/body/body_off_'+Ti.App.res+'.png');
		partsMenuView.children[2].zIndex = 1; partsMenuView.children[2].setImage('images/menu/hands/hands_on_'+Ti.App.res+'.png');
		partsMenuView.children[3].zIndex = 0; partsMenuView.children[3].setImage('images/menu/legs/legs_off_'+Ti.App.res+'.png');
	};
	if ( (e.x>w/4*3) && (e.x<w) && (e.y<h/5) ) {
		partsMenuView.children[0].zIndex = 0; partsMenuView.children[0].setImage('images/menu/head/head_off_'+Ti.App.res+'.png');
		partsMenuView.children[1].zIndex = 0; partsMenuView.children[1].setImage('images/menu/body/body_off_'+Ti.App.res+'.png');
		partsMenuView.children[2].zIndex = 0; partsMenuView.children[2].setImage('images/menu/hands/hands_off_'+Ti.App.res+'.png');
		partsMenuView.children[3].zIndex = 1; partsMenuView.children[3].setImage('images/menu/legs/legs_on_'+Ti.App.res+'.png');
	};
});

exports.moveUp = function(){
	var menuMoveUp = Titanium.UI.createAnimation({
		duration: 500,
		top: game.size.height*0.75
	});
	partsMenuView.animate(menuMoveUp);
};

exports.moveDown = function(){
	var menuMoveDown = Titanium.UI.createAnimation({
		duration: 500,
		top: game.size.height*0.95
	});
	partsMenuView.animate(menuMoveDown);
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
