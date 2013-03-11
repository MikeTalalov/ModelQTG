var qtg = require('com.googlecode.quicktigame2d');

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
    Ti.App.b = Math.asin( (Ti.App.bodyWidth*e.value/100)/Ti.App.D) * 180/Math.PI;
    Ti.API.info(e.value/100);
});

exports.drawLegSlider = function(toWin, toGame){
	toWin.add(label);
	toWin.add(slider);
	Ti.App.legDistance = slider.value/100;
};