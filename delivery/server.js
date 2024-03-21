const express = require("express");
const path = require("path");
const {router} = require("./router/router");
const nunjucks = require("nunjucks");
const {urlencoded} = require("express");

class Server {
  constructor(localPort) {
    this.app = express();
    this.localPort = localPort;
  }

  getLocalPort(){
    return this.localPort;
  }

  handleRoutes(appRouter) {
    this.app.use(appRouter);
  }

  start(){
    nunjucks.configure("views", {
      autoescape: true,
      express: this.app
    });
    this.handleRoutes(router);
    this.app.use(urlencoded({extended: false}))
    this.app.listen(this.getLocalPort(), () => {
      console.log(`App started on port: ${this.getLocalPort()}`);
    })
  }
}

module.exports = {
  Server
}