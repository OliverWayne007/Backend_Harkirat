const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password , salt);
}

const verifyPassword = (plainPassword , hashedPassword) => {
    return bcrypt.compareSync(plainPassword , hashedPassword);
}

module.exports = { hashPassword , verifyPassword };