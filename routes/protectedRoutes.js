const jwt = require('jsonwebtoken');

function tokenVerification(req, res, next) {
  const jwToken = req.header('auth-token');
  if (!jwToken) return res.status(401).send('Unauthorized User');

  try {
    req.user = jwt.verify(jwToken, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(400).send('Unauthorized User(tkn)');
  }
}

module.exports = tokenVerification;
