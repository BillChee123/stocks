const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/**
 * Declares Bookmark Schema.
 * TODO: Override the cleartext password with the hashed one.
 */
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

/**
 * Citations:
 *  - https://stackoverflow.com/questions/14588032/mongoose-password-hashing
 *  - https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
 */
UserSchema.pre('save', function(next) {
    var user = this;

    const SALT_WORK_FACTOR = 10;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema)
