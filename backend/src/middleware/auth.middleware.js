import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token found" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized, token not valid" });
        }

        // Find user by the decoded ID and exclude password field
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }

        // Attach the user to the request object
        req.user = user;

        // Log user for debugging (optional)
        // console.log("User in protect route: ", user);

        // Continue to the next middleware/route handler
        next();
    } catch (error) {
        // Log the error and return server error response
        console.error("Error in protect route: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
