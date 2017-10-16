var express = require('express');
var path = require('path');

var app = express();
app.set('port', 3003);
app.use(express.static(path.join(__dirname, '/public')));

// Production error handler
if (app.get('env') === 'production') {
	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.sendStatus(err.status || 500);
	});
}

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
