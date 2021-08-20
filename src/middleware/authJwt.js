const jwt = require("jsonwebtoken");
const { getTokenFromHeaders, verifyJwt } = require("../utils/helpers/jwt/jwt");

module.exports = (req, res, next) => {
  const { url: path } = req;

  const excludedPath = ["/register", "/login"];
  const isExcludedpath = !!excludedPath.find((p) => p.startsWith(path));

  if (isExcludedpath) return next();

  const token = getTokenFromHeaders(req.headers);

  if (!token) {
    return res.status(401).send({ error: "no token provided" });
  }

  // const parts = token.split(" ");

  // if (parts.length !== 2) {
  //   return res.status(401).send({ error: "token error" });
  // }

  // const [bearer, tkn] = parts;

  // if (!/^Bearer$/i.test(bearer)) {
  //   return res.status(401).send({ error: "token malformatted" });
  // }

  try {
    const decoded = verifyJwt(token);

    req.userId = decoded.id;
    next();
  } catch (err) {
    // console.log(err);
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send({ error: "expired token" });
    }
  }
};
