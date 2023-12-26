const jwt = require("jsonwebtoken");

const authenticateTokenGraphql = (req) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET); // replace 'process.env.JWT_SECRET' with your secret key
    } catch (error) {
        return null;
    }
};
module.exports = authenticateTokenGraphql