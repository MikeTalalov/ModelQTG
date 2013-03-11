/**
 * @author bonovisio
 */

const ASSETS_LENGTH = 3;
var assetsNames=['body', 'head', 'hand'];

var assets={bodyassets:[], handassets:[], headassets:[]};

var curHeadIndex;
var curBodyIndex;
var curHandsIndex;

for(var j = 0; j<assetsNames.length; j++){
	var asset = assets[ assetsNames[j] + 'assets' ];
	
	for(var i = 0; i< ASSETS_LENGTH; i++){
		Ti.include('assets/'+assetsNames[j]+'asset'+(i+1)+'.json');
		var f = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), 'assets/'+ assetsNames[j]+'asset'+(i+1)+'.json'); 
		var contents = f.read().text;
		var json = JSON.parse(contents);
		asset.push(json);
	}
}


var changeCurrentAsset = function(_type, _dir){
	var curIndex;
	
	if(_type==='body') curIndex = curBodyIndex;
	else if(_type==='head') curIndex = curHeadIndex;
	else curIndex = curHandsIndex;
	
	if(!_dir){
		curIndex = 0;
	}else if(_dir>=0){
		curIndex++;
		if( curIndex >= ASSETS_LENGTH ) curIndex=0;
	}else{
		curIndex--;
		if( curIndex < 0) curIndex=ASSETS_LENGTH-1;
	}
	
	if(_type==='body') curBodyIndex = curIndex;
	else if(_type==='head') curHeadIndex = curIndex;
	else curHandsIndex = curIndex;
}

exports.changeCurrentAsset = changeCurrentAsset;

changeCurrentAsset('body');
changeCurrentAsset('head');
changeCurrentAsset('hands');

exports.leftHandAsset = function(){
	var asset = [];
	var json = assets.handassets[curHandsIndex];
	for (var i = 0; i < json.length; i++){
		asset.push({p1: json[i].leftHand.shoulder.rotation, p2: json[i].leftHand.forearm.rotation, p3: json[i].leftHand.palm.rotation});
	};
	return asset;
};
exports.rightHandAsset = function(){
	var asset = [];
	var json = assets.handassets[curHandsIndex];
	for (var i = 0; i < json.length; i++){
		asset.push({p1: json[i].rightHand.shoulder.rotation, p2: json[i].rightHand.forearm.rotation, p3: json[i].rightHand.palm.rotation});
	};
	return asset;
};

exports.headAsset = function(){
	var asset = [];
	var json = assets.headassets[curHeadIndex];
	for (var i = 0; i < json.length; i++){
		asset.push({headRotation: json[i].head.rotation, neckRotation: json[i].neck.rotation});
	};
	return asset;
};

exports.leftLegAsset = function(){
	var asset = [];
	var json = assets.bodyassets[curBodyIndex];
	for (var i = 0; i < json.length; i++){
		asset.push({p1: json[i].leftLeg.thigh.rotation, p2: json[i].leftLeg.shin.rotation, p3: json[i].leftLeg.foot.rotation});
	};
	return asset;
};
exports.rightLegAsset = function(){
	var asset = [];
	var json = assets.bodyassets[curBodyIndex];
	for (var i = 0; i < json.length; i++){
		asset.push({p1: json[i].rightLeg.thigh.rotation, p2: json[i].rightLeg.shin.rotation, p3: json[i].rightLeg.foot.rotation});
	};
	return asset;
};
exports.bodyAsset = function(){
	var asset = [];
	var json = assets.bodyassets[curBodyIndex];
	for (var i = 0; i < json.length; i++){
		asset.push({rotation: json[i].body.rotation, deltaX: json[i].body.x, deltaY: json[i].body.y});
	};
	return asset;
};