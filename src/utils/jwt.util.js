import jwt from "jsonwebtoken";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';
const REFRESH_EXPIRES_IN= process.env.REFRESH_TOKEN_EXPIRES_IN;
const ACCESS_EXPIRES_IN= process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
export const JwtUtils = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN, ACCESS_EXPIRES_IN); 
  },

  generateRefreshToken: (payload) => {
    return jwt.sign(payload, REFRESH_SECRET, REFRESH_EXPIRES_IN); 
  },

  verifyAccessToken: (token) => {
    return jwt.verify(token, ACCESS_TOKEN);
  },

  verifyRefreshToken: (token) => {
    return jwt.verify(token, REFRESH_SECRET);
  }
};