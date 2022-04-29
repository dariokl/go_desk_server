import express from "express";
import helmet from "helmet";
import cors from "cors";

import api from "./api/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", api);

export default app;
