var fs = require('fs');
var prompt = require('prompt');

var onErr = function(err) {
    console.log(err);
    return 1;
};
var list_options = function() {
    console.log("1. ssl_key <path_to_key>");
    console.log("2. ssl_crt <path_to_crt>");
    console.log("3. port <listening_port_#>");
    console.log("4. useradd <user_name>");
    console.log("5. exit");
};
var properties = [
    {
        name: 'username',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Username must be only letters, spaces, or dashes'
    },
    {
        name: 'password',
        hidden: true
    }

];

var configure = function() {
    console.log("Welcome to your new IDE server.\nThe following is a list of configuration options:");
    list_options();
    prommpt.get(properties, function(err, result){
        if(err){
            return onErr(err);
        }
        console.log('Command-line input received:');
        console.log('  Username: ' + result.username);
        console.log('  Password: ' + result.password);
    });
};

configure();