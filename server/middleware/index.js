const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ success: false, errMsg: 401 });
  }
  const [_, token] = header.split(' ');

  jwt.verify(token, process.env.SECRET, (err, decode) => {
    if (err) {
      return res.status(403).json({ success: false, errMsg: 401 });
    }
    req.user = decode;
    next();
  });
};
