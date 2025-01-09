import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static('public'));
app.use(cookieParser());

// Importing routes

import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.route.js"
import mapRoutes from "./routes/map.route.js";

// Routes declaration
app.use('/api/users', userRoutes);
app.use('/api/captains', captainRoutes);
app.use('/api/map',mapRoutes)

export { app };