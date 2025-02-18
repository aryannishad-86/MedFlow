import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        console.log('Incoming request headers:', req.headers); // Debug log
        
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('Extracted token:', token); // Debug log
        
        if (!token) {
            console.log('No token provided'); // Debug log
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded); // Debug log

            // Add user data to request
            req.user = decoded;
            
            next();
        } catch (jwtError) {
            console.error('JWT verification failed:', jwtError); // Debug log
            return res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        console.error('Auth middleware error:', error); // Debug log
        res.status(500).json({ error: 'Auth middleware error', details: error.message });
    }
};

// Optional: Add other auth middleware functions here
export const isDoctor = (req, res, next) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ error: 'Access denied. Doctors only.' });
    }
    next();
};

export const isPatient = (req, res, next) => {
    if (req.user.role !== 'patient') {
        return res.status(403).json({ error: 'Access denied. Patients only.' });
    }
    next();
};
