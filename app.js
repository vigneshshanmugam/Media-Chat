var express = require("express");

var app = express();
app.use(express.logger());
app.use('/js', express.static('src/js'));
app.use('/', express.static('src/'));

app.get('/', function(request, response) {
  response.sendfile('src/index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});