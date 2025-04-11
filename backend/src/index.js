import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from "path"
import axios from 'axios'   // ✅ Import axios

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './lib/db.js'
import { app, server } from './lib/socket.js'
import { dexterchat } from './controller/dexter.controller.js'
import { harleyChat } from './controller/harley.controller.js'
import { protectRoute } from "./middleware/auth.middleware.js";
import { tylerChat } from './controller/tyler.controller.js'


dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.post("/api/generate",protectRoute,dexterchat );
app.post("/api/generate/harley",protectRoute,harleyChat );
app.post("/api/generate/tyler",protectRoute,tylerChat );

if (process.env.NODE_ENV === "production") {  
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../", "frontend", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log('Server is running on PORT', PORT);
    connectDB();
});
