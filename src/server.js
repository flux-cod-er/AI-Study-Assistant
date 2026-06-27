import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
console.log("PORT =", process.env.PORT);
console.log("GEMINI =", process.env.GEMINI_API_KEY);

const PORT = process.env.PORT || 5000;
await connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});