import express from "express";
import { v4 as uuidv4 } from "uuid";

import * as userServices from "./user.services.js";
import * as authServices from "../auth/auth.services.js";
import { generateTokens } from "../../utils/jwt.js";

export const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("You must provide email and a password");
    }

    const existingUser = await userServices.findByEmail(email);
    if (existingUser) {
      res.status(400);
      throw new Error("Email already in use.");
    }

    const user = await userServices.createUser({ email, password });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);

    await authServices.addRefreshToken({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
