const express = require('express');

const bodyParser = require('body-parser');

const {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
    isAuth,
} = require('../../commons/helper')

const userSchema = require('../../models/User');
const { hash, compare } = require('bcrypt');
const { use } = require('./bookmarks');

// Create a user route
const userRoute = express.Router();

module.exports = userRoute;

userRoute.route('/register').post(function (req, res) {

    let user = new userSchema(req.body);

    user.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).json(err.message);
        });

});

userRoute.route('/login').post(async (req, res) => {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email: email });

    if (!user) {
        return res.send({ accessToken: '' });
    }

    const valid = await compare(password, user.password).catch(err => {
        res.json(err.message);
    });

    if (!valid) {
        throw new Error("Incorrect password");
    }

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    user.refreshToken = refreshToken;

    sendRefreshToken(res, refreshToken);

    return res.send({ accessToken });
});

userRoute.route('/logout').post(function (req, res) {
    res.clearCookie('refreshtoken', { path: '/refresh_token' });
    return res.send({
        message: 'Logged out',
    })
});

userRoute.route('/').get(function (req, res) {
    userSchema.find(function (err, userList) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        }
        else {
            res.json(userList);
        }
    });

})

userRoute.route('/protected').post(function (req, res) {
    try {
        const userId = isAuth(req);
        if (userId !== null) {
            res.send({
                data: 'This is protected data.',
            })
        }
    } catch(err) {
        res.send({
            error: `${err.message}`,
        })
    }
})

userRoute.route('/').delete(function (req, res) {
    userSchema.remove({}, function (err) {
        if (err) {
            res.json(err);
        }
        else {
            res.json('All Users Deleted Successfully');
        }
    });
})