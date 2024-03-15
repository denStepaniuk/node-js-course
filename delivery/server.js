const express = require("express");
const {router} = require("./router/router");

class Server {
  constructor(localPort) {
    this.app = express();
    this.localPort = localPort;
  }

  getLocalPort(){
    return this.localPort;
  }

  handleRoutes(router) {
    this.app.use(router);
  }

  start(){
    this.handleRoutes(router);
    this.app.listen(this.getLocalPort(), () => {
      console.log(`App started on port: ${this.getLocalPort()}`);
    })
  }
}

module.exports = {
  Server
}