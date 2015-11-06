var async = require('async');
var $ = require('jquerygo');
var request = require('request');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

$.config.addJQuery = true;
var url='',date, write_path = 'D:\Walls\\Bing';

async.series([
	$.go('visit','http://www.bing.com'),
	$.go('waitForPage'),
	$.go('waitForElement','#bgDiv'),
	//$.go('capture',__dirname + '\\window.png'),
	function(done){
		$('#bgDiv').css('background-image',function(e){
			url = e;
			done();
		});
	},
	function(done){
		url = url.substring(4,url.length-1);
		done();
	},
	function(done){
		date = moment(new Date()).format("YYYY-MM-DD");
		done();
	}
], function(){
	var filename = "BingWallpaper-"+date+".jpg";
	request(url).pipe(fs.createWriteStream(write_path+'\\'+filename));
	$.close();		
});
