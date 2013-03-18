/**
 * @author bonovisio
 */

//fps label
exports.createLabel = function(){
  return Titanium.UI.createLabel({
    color:'black',
    backgroundColor:'white',
    text:'0.0 FPS',
    font:{fontSize:20,fontFamily:'Helvetica Neue'},
    textAlign:'center',
    width:'auto',
    height:'auto',
    top: 0,
    left: 0
  });
}

//fps counter
var mFrameCount = 0;
var mNow = +new Date();

exports.updateFPS = function(label){
  mFrameCount++;
  if (+new Date() - mNow > 5000){
    var fps = mFrameCount / 5.0;
    label.text = fps + " FPS";
    mFrameCount = 0;
    mNow = +new Date();
  }
}

//set resolution for sprite loading
exports.setResolution = function(game){
	resolution = '320';
	if(game.screen.width>360){resolution = '480'};
	if(game.screen.width>500){resolution = '640'};
	if(game.screen.width>660){resolution = '768'};
	if(game.screen.width>1500){resolution = '1536'};
	return resolution;
}

exports.getResourcesJSON = function(){
	Ti.include('json/resources.json');
	var f = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), 'json/resources.json'); 
	var contents = f.read().text;
	return JSON.parse(contents)[0];
}