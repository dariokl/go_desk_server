import bcrypt from "bcrypt";
import db from "../../utils/db.js";

export const createUser = (user) => {
  return db.user.create({
    data: { ...user, password: bcrypt.hashSync(user.password, 12) },
  });
};

export const findByEmail = (email) => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

export const findById = (id) => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};
