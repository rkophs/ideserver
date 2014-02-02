var fs = require('fs');
var prompt = require('prompt');
var hash = require('./pass').hash;

var onErr = function(err) {
    console.log(err);
    return 1;
};

var properties = [
    {
        name: 'username',
        validator: /^[a-zA-Z0-9\s\-]+$/,
        warning: 'Username must be only letters, numbers, spaces, or dashes'
    },
    {
        name: 'password',
        hidden: true
    },
    {
        name: 'ssl key file (.key)'
    },
    {
        name: 'ssl certificate (.crt)'
    },
    {
        name: 'port',
        validator: /^[a-zA-Z0-9\s\-]+$/,
        warning: 'Username must be only numbers'
    }
];

var configure = function() {
    console.log("Welcome to your new IDE server.\nPress enter to skip an of the following prompts.");
    console.log("If you skip a prompt, it's previous entry will persist if existent,\n otherwise a default will be set.");
    prompt.get(properties, function(err, result){
        if(err){
            return onErr(err);
        }
        console.log('Command-line input received:');
        console.log(result);
    });
    var file_name = "conf.json";
    var conf_obj = JSON.parse(fs.readFileSync(file_name));
    console.log(conf_obj);
};

configure();
