const jwt = require("jsonwebtoken");
const JWT_SECRET = "Sunbeam@DMCFeb2025"; // Ideally, use process.env.JWT_SECRET

function createToken(user) {
    const payload = {
        user_id: user.user_id,
        email: user.email,
        user_type: user.user_type
    };
    const options = { expiresIn: "1h" }; // Token expiration time
    return jwt.sign(payload, JWT_SECRET, options); // Use JWT_SECRET here
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        console.log("Token verification failed:", err);
        return null;
    }
}

// JWT authentication middleware -- verify the JWT token
function jwtAuth(req, resp, next) {
    // Allow certain URLs without authentication
    const nonProtectedUrls = ["/users/signin", "/users/signup"];
    if (nonProtectedUrls.includes(req.url)) {
        next();
        return;
    }

    // Check for authorization header
    if (!req.headers.authorization) {
        return resp.status(403).send("Unauthorized Access - No authorization header");
    }

    // Get the token from the authorization header
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
        return resp.status(403).send("Unauthorized Access - Invalid token format");
    }

    // Verify the token
    const decoded = verifyToken(token);
    console.log("Incoming user token:", decoded);

    // If token is not valid, return error (403)
    if (!decoded) {
        return resp.status(403).send("Unauthorized Access - Invalid token");
    } else {
        // Attach user information to the request object
        req.user = { user_id: decoded.user_id, user_type: decoded.user_type };
        next();
    }
}

module.exports = {
    createToken,
    jwtAuth,
};
