const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInVzZXJuYW1lIjoiam9obiIsImlhdCI6MTY4NTQ5OTQ0MCwiZXhwIjoxNjg1NTAwMDQwfQ.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"

  console.log("auth middleware is called");

  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Access denied. No token provided. Please Login to Continue",
    });
  }

  //decode this token
  try {
    console.log("token decoding");
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //here we verify token and then decode user details and pass again to our varible
    console.log(decodeTokenInfo);

    //we store data in userinfo but with req so we access anywhere with this request
    req.userInfo = decodeTokenInfo;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied. No token provided. Please Login to Continue",
    });
  }
};

module.exports = authMiddleware;





// User Login
//    ↓
// Server creates JWT token with user data + secret key (expires in 30 min)
//    ↓
// Token is sent back to client (browser/mobile app)
//    ↓
// Client stores token securely (localStorage/cookie)
//    ↓
// Client sends requests to protected routes with token in "Authorization: Bearer <token>" header
//    ↓
// Server Middleware extracts token from header
//    ↓
// Server verifies token with secret key
//      ├── Valid? → Attach user info to request → Continue to route handler → Response sent
//      └── Invalid? → Send "Access Denied" response (401 Unauthorized)
