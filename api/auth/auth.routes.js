import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import hashToken from "../../utils/hashToken.js";

import { createUser } from "../users/user.controllers.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login)

export default router;
