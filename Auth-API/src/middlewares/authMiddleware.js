import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No Token, unauthorized" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;
