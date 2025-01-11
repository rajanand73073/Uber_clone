import { Server as SocketIo } from "socket.io"; // Correct import
import { Captain } from "../src/models/captain.model.js";
import { User } from "./models/user.model.js";
import { log } from "console";

let io; // Declare io variable globally bcoz const require value immediately
let activeCaptain;

const initializeSocket = (server) => {
  io = new SocketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log("user", userId);

      if (userType === "Captain") {
        await Captain.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
        activeCaptain = await Captain.findById(userId);
      } else if (userType === "User") {
        await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log("message", messageObject.data.user);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data.user);
  } else {
    console.log("Socket.io not initialized.");
  }
};

export { initializeSocket, sendMessageToSocketId, activeCaptain };
