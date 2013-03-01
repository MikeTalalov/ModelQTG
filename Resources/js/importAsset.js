var url = 'js/asset.json';
var json;
  
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
        
        json = JSON.parse(this.responseText);
        Ti.API.info(json.length);
    }
});



var leftHandAsset = function(){
	var asset = [-20, 20, 20, 20, -10, 10, 10, 10, 10];
	
	return asset;
};
var rightHandAsset = function(){
	var asset = [30, 30, 10, -20, 20, 16, 10, 10, 16];
	
	return asset;
};
var leftLegAsset = function(){
	var asset = [-20, 20, 20, 20, -10, 10, 10, 10, 10];
	
	return asset;
};
var rightLegAsset = function(){
	var asset = [30, 30, 10, -20, 20, 16, 10, 10, 16];
	
	return asset;
};

exports.leftHandAsset = leftHandAsset;
exports.rightHandAsset = rightHandAsset;
exports.leftLegAsset = leftLegAsset;
exports.rightLegAsset = rightLegAsset;