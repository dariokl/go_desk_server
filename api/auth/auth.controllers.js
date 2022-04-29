import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { findByEmail } from "../users/user.services";
import { generateTokens } from "../../utils/jwt";
import { addRefreshToken } from "./auth.services";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("You must provide email and a password");
    }

    const existingUser = await findByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const jti = uuidv4();

    const { accessToken, refreshToken } = generateTokens(jti);
    await addRefreshToken({ jti, refreshToken, userId: existingUser.id });
    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};
