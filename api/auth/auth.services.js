import db from "../../utils/db.js";
import hashToken from "../../utils/hashToken.js";

export const addRefreshToken = ({ jti, refreshToken, userId }) => {
  return db.refreshToken.create({
    data: {
      id: jti,
      token: hashToken(refreshToken),
      userId,
    },
  });
};
