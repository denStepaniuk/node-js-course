const {Server} = require('./delivery/server')
require('dotenv').config();

const localPort = process.env.local_port

const bootstrap = () => {
  const app = new Server(localPort);
  app.start();
}

bootstrap()