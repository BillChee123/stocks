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

module.exports = {
    validateEmail,
    sha256,
}
