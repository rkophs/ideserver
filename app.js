/**
 * Module dependencies.
 */

var https = require('https');
var url = require("url");
var fs = require('fs');

var express = require('express');
var hash = require('./pass').hash;
var conf = JSON.parse(fs.readFileSync("conf.json"));

var options = {
    key: fs.readFileSync(conf.configuration.ssl_key),
    cert: fs.readFileSync(conf.configuration.ssl_crt)
};

var app = module.exports = express();
app.use(express.compress());

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

// middleware
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.cookieParser('secret stuff'));
app.use(express.session());

// Session-persisted message middleware
app.use(function(req, res, next) {
    var err = req.session.error
            , msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err)
        res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg)
        res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
    if(conf.user.name !== name){
        return fn(new Error('cannot find user'));
    }

    hash(pass, conf.user.salt, function(err, hash) {
        if (err)
            return fn(err);
        if (hash === conf.user.hash)
            return fn(null, conf.user);
        fn(new Error('Invalid password'));
    });
}

function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

app.get('/', function(req, res) {
    res.redirect('login');
});

app.get('/logout', function(req, res) {
    req.session.destroy(function() {
        res.redirect('/');
    });
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/:file', restrict, function(req, res){
    res.render(req.params.file);
});

app.post('/login', function(req, res) {
    authenticate(req.body.username, req.body.password, function(err, user) {
        if (user) {
            // Regenerate session when signing in
            // to prevent fixation 
            req.session.regenerate(function() {
                // Store the user's primary key 
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = user;
                res.redirect('ide');
            });
        } else {
            res.redirect('login');
        }
    });
});

https.createServer(options, app).listen(conf.configuration.port);
