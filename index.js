var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('./sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

app.get("/", (req, res) => {
	console.log("request received");
	res.json({
		type: true,
		message: 'authorized'			
	});
});

app.use(function (req, res, next) {
  res.status(404).send("(404) Page not found!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('(500) Server error!!');
});
// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

console.log("http server listen on port 8080");
httpServer.listen(8080);
console.log("https server listen on port 8443");
httpsServer.listen(8443);
