var qtg = require('com.googlecode.quicktigame2d');

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


var name = null;
var leftMargin = 2;

for (var i = 1; i < 8*10; i++){
	name = 'image'+i;
	var name = Ti.UI.createImageView({
		image:'/images/items/item'+(1+i%8)+'.png',
		top: 10,
		left: leftMargin
	});
	scrollView.add(name);
	leftMargin+=32;
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