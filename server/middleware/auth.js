// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const authHeader = req.header("Authorization");
//   if (!authHeader) return res.status(401).send("Access denied. No token provided.");

//   const token = authHeader.split(' ')[1]; // Extract the token from the 'Bearer <token>' format

//   try {
//     const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
//     req.user = decoded;  // Attaching the decoded user payload to req.user
//     next();
//   } catch (ex) {
//     res.status(400).send("Invalid token.");
//   }
// };


const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>' format

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;  // Attach the decoded user payload to req.user
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
