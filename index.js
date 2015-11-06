var async = require('async');
var $ = require('jquerygo');
var request = require('request');
var fs = require('fs');
var path = require('path');

$.config.addJQuery = true;
var url='', write_path = 'D:\Walls\\Bing';

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
	}
], function(){
	console.log(url);

	var filename = path.basename(url);
	request(url).pipe(fs.createWriteStream(write_path+'\\'+filename));
	
	$.close();		
});
