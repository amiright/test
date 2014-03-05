var http = require('http');
var mongoose = require('mongoose');
var express = require('express');

var app = express();

var db;

var config = {
	"USER": "bbhadmin",
	"PASS": "ahorsewithnoname"
	"HOST": "ds033459.mongolab.com",
	"PORT": "33459",
	"DATABASE": "bbh_db"
};

var dbPath = "mongodb://"+config.USER+":"+config.PASS+"@"+config.HOST+":"+config.PORT+"/"+config.DATABASE;

var standardGreeting = 'Hello World!';

var greetingSchema = mongoose.Schema({
	sentence: String
});
var Greeting = mongoose.model('Greeting', greetingSchema);

db = mongoose.connect(dbPath);

mongoose.connection.once('open', function(){
	var greeting;
	Greeting.find(function(err, greetings){
		if(!greetings){
			greeting = new Greeting({sentence: standardGreeting});
			greeting.save();
		}
	});
});

app.get('/', function(req, res){
	Greeting.findOne(function(err, greeting){
		res.send(greeting.sentence);
	});
});

app.use(function(err, req, res, next){
	if(req.xhr){
		res.send(500, 'Something went wrong!');
	}
	else {
		next(err);
	}
});


console.log('starting the express server');
app.listen(8080);
console.log('Webserver is listening on port 8080');