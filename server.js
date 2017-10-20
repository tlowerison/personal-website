var express = require('express');
var path = require('path');
var dotenv = require('dotenv');

/** Load environment variables from .env file **/
dotenv.load();

var app = express();
app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, 'public')));

// Production error handler
if (app.get('env') === 'production') {
	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.sendStatus(err.status || 500);
	});
}

app.get('/img/mountains.svg?lastmod=', function(req, res) {
	res.sendFile('/public/img/mountains.png');
});

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
