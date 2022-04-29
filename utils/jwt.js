import jwt from "jsonwebtoken";

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

export const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user, jti) => {
  return jwt.sign({ userId: user.id, jti }, JWT_REFRESH_SECRET, {
    expiresIn: "8h",
  });
};

export const generateTokens = (user, jti) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};
