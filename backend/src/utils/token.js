import jwt from 'jsonwebtoken';

import config from '#config';

// Middleware to generate JWT token
export function generateToken(userId) {
    return jwt.sign(
        { userId: userId },
        config.jwt_secret,
        { expiresIn: '10 days' },
    );
}

// Middleware to verify JWT token
export function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    });
}
