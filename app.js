
var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./libs/log')(module);

var app = express();

app.engine('ejs', require('ejs-locals'));



app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next){
	res.render("index", {
	  body: '<b>Hello</b>'
	});
});


app.use(function(err,req,res,next){
	if (app.get('env') == 'development'){
		var errorHandler = express.errorHandler();
		errorHandler(err,req,res,next);

	} else {
		res.send(500);
	}
});
/*
var routes = require('./routes');
var user = require('./routes/user');




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


*/

http.createServer(app).listen(config.get('port'), function(){
  console.log('Express server listening on port ' + config.get('port'));
});