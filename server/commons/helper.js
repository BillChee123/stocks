const { verify, sign } = require("jsonwebtoken");

/**
 * Citation:
 *  - https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 * 
 * Encryption algorithm using the sha256 algorithm.
 * 
 * @param {*} message The given message to be encrypted.
 */
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

/**
 * Checks if the given email is valid.
 * 
 * @param {*} email The email input.
 * 
 */
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function isAuth(req) {
    const authorization = req.headers['authorization'];
    if (!authorization) throw new Error("You need to login");
    const token = authorization.split(' ')[1];
    const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    return userId
}

const createAccessToken = (userId) => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    })
};

const createRefreshToken = (userId) => {
    return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    })
};

const sendAccessToken = (res, req, accesstoken) => {
    res.send({
        accesstoken,
        email: req.body.email
    })
}

const sendRefreshToken = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/refresh_token'
    })
}

module.exports = {
    sha256,
    validateEmail,
    isAuth,
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
}