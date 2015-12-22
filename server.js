var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Include our static files
app.use(express.static(__dirname + '/build'));

// Serve our react app
app.get('/', function(req, res) {
	  res.sendFile(__dirname + '/index.html');
});

// Receive email for registration process
app.post('/registrationEmail', function(req, res) {
    var email = req.body.registrationEmail;

    // Send email to backend when we have the route
    //console.log("Post received: %s", email);

    // Redirect to passcode page
    res.redirect('/#/registration/code');
});

app.listen(5000);
