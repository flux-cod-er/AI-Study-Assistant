import express from "express";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import documentRoutes from "./routes/document.routes.js";
import aiRoutes from "./routes/ai.routes.js";
const app = express();
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/user", userRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
export default app;