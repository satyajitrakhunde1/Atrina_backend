const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (requiredRole) => async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        if (requiredRole && user.role !== requiredRole) {
            return res.status(403).send({ error: 'Forbidden' });
        }

        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
