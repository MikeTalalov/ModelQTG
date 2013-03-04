/**
 * @author bonovisio
 */

alert(Ti.Filesystem.getResourcesDirectory());
Ti.include('js/asset.json');
var f = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(),'js/asset.json'); 
//var f = Ti.Filesystem.getFile('js/asset.json');
var contents = f.read().text;
var json = JSON.parse(contents);

var leftHandAsset = function(){
	var asset = [];
	for (var i = 0; i < (json.length-1); i++){
		asset.push({p1: json[i].leftHand.shoulder.rotation, p2: json[i].leftHand.forearm.rotation, p3: json[i].leftHand.palm.rotation});
	};
	return asset;
};
var rightHandAsset = function(){
	var asset = [];
	for (var i = 0; i < (json.length-1); i++){
		asset.push({p1: json[i].rightHand.shoulder.rotation, p2: json[i].rightHand.forearm.rotation, p3: json[i].rightHand.palm.rotation});
	};
	return asset;
};
var leftLegAsset = function(){
	var asset = [];
	for (var i = 0; i < (json.length-1); i++){
		asset.push({p1: json[i].leftLeg.thigh.rotation, p2: json[i].leftLeg.shin.rotation, p3: json[i].leftLeg.foot.rotation});
	};
	return asset;
};
var rightLegAsset = function(){
	var asset = [];
	for (var i = 0; i < (json.length-1); i++){
		asset.push({p1: json[i].rightLeg.thigh.rotation, p2: json[i].rightLeg.shin.rotation, p3: json[i].rightLeg.foot.rotation});
	};
	return asset;
};

exports.leftHandAsset = leftHandAsset;
exports.rightHandAsset = rightHandAsset;
exports.leftLegAsset = leftLegAsset;
exports.rightLegAsset = rightLegAsset;