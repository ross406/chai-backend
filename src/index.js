import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

import connectDB from "./db/index.js";

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    const { default: app } = await import("./app.js");

    await connectDB();
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  } catch (error) {
    console.error("MONGODB connection failed: ", error);
    throw error;
  }
})();
