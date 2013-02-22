exports.setResolution = function(game){
	
	Ti.App.RES = '320';
	
	if(game.screen.width>360){
		Ti.App.RES = '480';
	}
	if(game.screen.width>500){
		Ti.App.RES = '640';
	}
	if(game.screen.width>660){
		Ti.App.RES = '768';
	}
	if(game.screen.width>1500){
		Ti.App.RES = '1536';
	}
}