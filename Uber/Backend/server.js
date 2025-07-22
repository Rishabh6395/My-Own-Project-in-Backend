const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket"); // <-- import

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server); // <-- call here

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
