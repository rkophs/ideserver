/*Created by Express
 * 
 * Created By: Express (https://github.com/visionmedia/express)
 * Updated By: Ryan Kophs
 */

var crypto = require('crypto');
var len = 128;          //Byte size
var iterations = 12000; //Iteration passes

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */
exports.hash = function(pwd, salt, fn) {
    if (3 === arguments.length) {
        //Salt was provided:
        crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash) {
            fn(err, hash.toString('base64'));
        });
    } else {
        //Salt was not provided:
        fn = salt;
        crypto.randomBytes(len, function(err, salt) {
            if (err)
                return fn(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash) {
                if (err)
                    return fn(err);
                fn(null, salt, hash.toString('base64'));
            });
        });
    }
};
