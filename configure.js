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
        name: 'ssl_key'
    },
    {
        name: 'ssl_crt'
    },
    {
        name: 'port',
        validator: /^[a-zA-Z0-9\s\-]+$/,
        warning: 'Username must be only numbers'
    }
];

var process_result = function(result) {
    var file_name = "conf.json";
    var conf_obj = JSON.parse(fs.readFileSync(file_name));

    if (result.ssl_key.length > 0) {
        conf_obj.configuration.ssl_key = result.ssl_key;
    } else if (conf_obj.configuration.ssl_key.length === 0) {
        onErr("An ssl_key must be provided to run the IDE Server over HTTPS");
    }

    if (result.ssl_crt.length > 0) {
        conf_obj.configuration.ssl_crt = result.ssl_crt;
    } else if (conf_obj.configuration.ssl_crt.length === 0) {
        onErr("An ssl_crt must be provided to run the IDE Server over HTTPS");
    }

    if (result.port.length > 0) {
        conf_obj.configuration.port = parseInt(result.port);
    } else if (!conf_obj.configuration.port) {
        conf_obj.configuration.port = 443;
    }

    if (result.username.length > 0) {
        conf_obj.user.name = result.username;
    } else if (!conf_obj.user.name) {
        conf_obj.user.name = "admin";
    }

    var password = "";
    if (result.password.length > 0) {
        password = result.password;
    } else if (!conf_obj.user.hash) {
        password = "password";
    }

    if (password.length > 0) {
        hash(password, function(err, salt, hash) {
            if (err) {
                onErr(err);
                return 1;
            }
            conf_obj.user.salt = salt;
            conf_obj.user.hash = hash;
            fs.writeFileSync(file_name, JSON.stringify(conf_obj, null, '\t'));
            console.log('Configured!\n');
        });
    } else {
        fs.writeFileSync(file_name, JSON.stringify(conf_obj, null, '\t'));
        console.log('Configured!\n');
    }
};

var configure = function() {
    console.log("Welcome to your new IDE server.\nPress enter to skip any of the following prompts.");
    prompt.get(properties, function(err, result) {
        if (err) {
            return onErr(err);
        }
        process_result(result);
    });
};

configure();
