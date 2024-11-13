import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/connection";
import authRouter from "./routers/authRouter";
import warRouter from "./routers/warRouter";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

dbConnection();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/war", warRouter);

io.of('/attack').on('connection', (socket) => {
    console.log('An attacker connected');
    socket.on('launch_attack', (data) => {
        io.of('/defense').emit('incoming_attack', data);
    });
});

io.of('/defense').on('connection', (socket) => {
    console.log('A defender connected');
    socket.on('intercept_attack', (data) => {
        io.of('/attack').emit('interception_result', data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on Port ${PORT} with WebSocket support...`);
});
