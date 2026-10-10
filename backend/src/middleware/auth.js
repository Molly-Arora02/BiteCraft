const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // Token can come from the Authorization header ("Bearer <token>")
    // or from the httpOnly cookie set during login
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        // Verify token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded payload (userId, role) to req.user
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You do not have permission to access this route"
            });
        }

        next();
    };
};

module.exports = { auth, authorizeRoles };