const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io = null;

/**
 * Initializes the Socket.IO server and attaches it to the HTTP server.
 * @param {http.Server} server - The HTTP server instance.
 */
function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      try {
        if(userType === "user") {
            await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if(userType === "captain") {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (err) {
        console.error(`Error joining room:`, err);
      }
    });

    socket.on("message", (data) => {
      console.log(`Received message from ${socket.id}:`, data);
      // socket.broadcast.emit("message", data); // Optional broadcasting
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}

/**
 * Sends a message to a specific socket ID.
 * @param {string} socketId - The target socket ID.
 * @param {string} event - The event name.
 * @param {any} message - The message payload.
 */
function sendMessageToSocketId(socketId, event, message) {
  if (io) {
    io.to(socketId).emit(event, message);
    console.log(`Sent event '${event}' to socket ${socketId}:`, message);
  } else {
    console.log("Socket.io not initialized.");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
