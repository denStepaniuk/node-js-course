require("dotenv").config();
const {local_port} = require("./app-utils/config/config")
const {Server} = require("./delivery/server")

const bootstrap = () => {
  const app = new Server(local_port);
  app.start();
}

bootstrap()