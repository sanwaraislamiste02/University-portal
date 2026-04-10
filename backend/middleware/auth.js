const jwt = require("jsonwebtoken");
const SECRET = "mysecretkey";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;   // ✅ attach user info
    next();               // ✅ go to next route

  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};