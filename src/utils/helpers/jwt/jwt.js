const { process } = require("dotenv").config();

const jwt = require("jsonwebtoken");

const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.REFRESH_PRIVATE_TOKEN_KEY;

const option = { expiresIn: "30 minutes" };
const refreshOptions = { expiresIn: "30 minutes" };

const generateJwt = (payload) => {
  return jwt.sign(payload, tokenPrivateKey, option);
};

const refreshJwt = (payload) => {
  return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
};

const verifyJwt = (token) => {
  return jwt.verify(token, tokenPrivateKey);
};

const verifyRefreshJwt = (token) => {
  return jwt.verify(token, refreshTokenPrivateKey);
};

const getTokenFromHeaders = (header) => {
  let token = header["authorization"];
  token = token ? token.slice(7, token.length) : null;

  return token;
};

module.exports = {
  generateJwt,
  refreshJwt,
  verifyJwt,
  verifyRefreshJwt,
  getTokenFromHeaders,
};
