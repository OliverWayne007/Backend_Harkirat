const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.jwt_secret_key || "You have failed this key";

const generateJwtToken = (payload) => {
    const jwt_token = jwt.sign(payload , jwtSecretKey);
    return jwt_token;
}

const verifyJwtToken = (token) => {
    return jwt.verify(token , jwtSecretKey);
}

module.exports = { generateJwtToken , verifyJwtToken };