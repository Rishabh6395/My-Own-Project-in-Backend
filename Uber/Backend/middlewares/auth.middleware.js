// Complete auth.middleware.js with all required imports and fixes

const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

// Auth User Middleware
module.exports.authUser = async (req, res, next) => {
    console.log('🔍 AuthUser Middleware Debug:');
    
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    
    console.log('Token found:', !!token);

    if (!token) {
        console.log('❌ No token provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded successfully:', { id: decoded._id });
        
        const user = await userModel.findById(decoded._id);
        console.log('User found:', !!user);

        if (!user) {
            console.log('❌ User not found in database');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check if token is blacklisted
        const isTokenBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isTokenBlacklisted) {
            console.log('❌ Token is blacklisted');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        console.log('✅ User authenticated and attached to request');
        return next();

    } catch (error) {
        console.log('❌ Token verification failed:', error.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Auth Captain Middleware
module.exports.authCaptain = async (req, res, next) => {
    console.log('🔍 AuthCaptain Middleware Debug:');
    console.log('Headers:', req.headers);
    console.log('Cookies:', req.cookies);
    
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    
    console.log('Token found:', !!token);
    console.log('Token value:', token ? token.substring(0, 20) + '...' : 'None');

    if (!token) {
        console.log('❌ No token provided');
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded successfully:', { id: decoded._id });
        
        const captain = await captainModel.findById(decoded._id);
        console.log('Captain found:', !!captain);
        console.log('Captain data:', captain ? {
            id: captain._id,
            name: captain.fullname?.firstname,
            email: captain.email
        } : 'None');

        if (!captain) {
            console.log('❌ Captain not found in database');
            return res.status(401).json({ message: 'Unauthorized - Captain not found' });
        }

        // Check if token is blacklisted
        const isTokenBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isTokenBlacklisted) {
            console.log('❌ Token is blacklisted');
            return res.status(401).json({ message: 'Unauthorized - Token blacklisted' });
        }

        req.captain = captain;
        console.log('✅ Captain authenticated and attached to request');
        console.log('req.captain._id:', req.captain._id);
        return next();

    } catch (error) {
        console.log('❌ Token verification failed:', error.message);
        console.log('Error stack:', error.stack);
        return res.status(401).json({ message: 'Unauthorized - Token verification failed' });
    }
};