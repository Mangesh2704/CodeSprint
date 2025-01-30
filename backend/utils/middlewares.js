export const isLoggedIn = (req, res, next) => {
    if (req.session && req.session.user) {
        console.log("Session Info: ", req.session); // Print session info if it exists
        next();
    } else {
        return res.status(401).json({ message: 'Access denied. Please log in.' });
    }
};
