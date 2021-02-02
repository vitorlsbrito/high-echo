require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        req.isAdmin = jwt.decode(token).admin;

        return next();
    } catch(err) {
        console.log(`ERROR: ${ err }`);
        return res.status(400).json({ error: 'Invalid token' });
    }
}
