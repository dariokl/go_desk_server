import app from "./app.js";
import { config } from "dotenv";

config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});
