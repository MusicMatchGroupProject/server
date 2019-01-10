const bcrypt = require('bcryptjs');

function hashPass(passowrd) {
    return bcrypt.hashSync(passowrd, process.env.BCRYPT_SALT);
};

function comparePass(passowrd, hash) {
    return bcrypt.compareSync(passowrd, hash);
};

module.exports = { hashPass, comparePass };