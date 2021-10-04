const bodyParser = require("body-parser");
const express = require("express");
const { mount } = require("./lib/server/rest/connectionsapi");
const WebRtcConnectionManager = require("./lib/server/connections/webrtcconnectionmanager");

const app = express();

app.use(bodyParser.json());

const viewer = WebRtcConnectionManager.create(require("./modules/viewer"));
const broadcaster = WebRtcConnectionManager.create(
  require("./modules/broadcaster")
);

mount(app, viewer, "/viewer");
mount(app, broadcaster, "/broadcaster");

const server = app.listen(3000, () => {
  const address = server.address();
  console.log(`http://localhost:${address.port}\n`);

  server.once("close", () => {
    viewer.close();
    broadcaster.close();
  });
});
