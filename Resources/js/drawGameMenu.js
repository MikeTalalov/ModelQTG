var qtg = require('com.googlecode.quicktigame2d');
var myDrawModel = require('js/drawModel');
var myAnimatedModel = require('js/animateModel');
var importAsset = require('js/importAsset');

//monster creation menu

var partsMenuView = Ti.UI.createView({
	backgroundColor:'red',
	borderRadius:0,
	opacity: 0.9,
	left: 0
});

function itemMenu() {
	var menu = Titanium.UI.createImageView({
		image: null,
		borderRadius:0,
		opacity: 0.9,
		left: 0,
		height: '100%',
		width: '100%'
	});
	return menu;
};
itemMenu.prototype.setImage = function(){this.image = 'images/menu/hands_on.png'};

var headMenuView = new itemMenu();
headMenuView.setImage;
var addItemsMenues = function(toView) {
	toView.add(headMenuView);
};

/*
 
var scrollView = Ti.UI.createScrollView({
	contentWidth: 'auto',
	contentHeight: 'auto',
	showVerticalScrollIndicator: false,
	showHorizontalScrollIndicator: true,
	height: '100%',
	width: '100%'
});

var itemsView = Ti.UI.createImageView({
	borderRadius:0,
	opacity: 0.9,
	left: 0
});

function itemsMenu() {
	
};
itemsMenu.prototype = {
	
};




//===============
// Конструктор.
function NewClass(){
  this.property = 123; // открытое свойство (this)
  var name  = "somebody"; // закрытое свойство (var)
  
  // Создаем методы класса прямо в конструкторе.
  this.method1 = function(x) {
    alert("Вызван method1("+x+")");
  }
  
  // То же самое.
  this.method2 = function(x) {
    alert("Вызван method2("+x+")");
    this.method1();
  }
  
  // Метод для установки значения закрытого свойства.
  this.setName = function(n) {
    name = n;
  }
}

// Создаем объект и проверяем работу.
var obj = new NewClass();
obj.method1(10);



/*
 * пример наследования
 * 
 // Базовый "класс".
function Base() {}
Base.prototype.f1 = function() { alert(1) }

// Производный "класс".
function Derive() {}
Derive.prototype = new Base(); // без new нельзя!
Derive.prototype.f2 = function() { alert(2) }

var obj = new Derive();
obj.f1(); // вызывается функция базового объекта



//===============
var headMenuView = Titanium.UI.createImageView({
	image: 'images/menu/head_on.png',
	borderRadius:0,
	//backgroundColor:'red',
	opacity: 0.9,
	left: 0
});

var bodyMenuView = Titanium.UI.createImageView({
	image: 'images/menu/body_on.png',
	borderRadius:0,
	//backgroundColor:'red',
	opacity: 0.9,
	left: 0
});

var handsMenuView = Titanium.UI.createImageView({
	image: 'images/menu/hands_on.png',
	borderRadius:0,
	//backgroundColor:'red',
	opacity: 0.9,
	left: 0
});

var legssMenuView = Titanium.UI.createImageView({
	image: 'images/menu/legs_on.png',
	borderRadius:0,
	//backgroundColor:'red',
	opacity: 0.9,
	left: 0
});

var leftMargin = 2;
for (var i = 0; i < 8*10; i++){
	var item = Ti.UI.createImageView({
		image:'/images/items/item'+(i%8)+'.png',
		top: headMenuView.height*0.2,
		left: leftMargin
	});
	item.name = 'image'+i;
	scrollView.add(item);
	leftMargin+=32;
	item.addEventListener('click', myDrawModel.changeBody);
};
*/

exports.drawGameMenu = function(toWin, toGame){
	var scrW = toGame.screen.width;
	var scrH = toGame.screen.height*0.25;
	var scrT = toGame.screen.height*0.95;
	
	partsMenuView.setWidth(scrW);
	partsMenuView.setHeight(scrH);
	partsMenuView.setTop(scrT);
	addItemsMenues(partsMenuView);
	//partsMenuView.add(scrollView);
	toWin.add(partsMenuView);
	alert(headMenuView.opacity);
}

exports.moveUp = function(){
	var menuMoveUp = Titanium.UI.createAnimation({
		duration: 500,
		top: game.size.height*0.8
	});
	partsMenuView.animate(menuMoveUp)
};

exports.moveDown = function(){
	var menuMoveDown = Titanium.UI.createAnimation({
		duration: 500,
		top: game.size.height*0.95
	});
	partsMenuView.animate(menuMoveDown)
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
