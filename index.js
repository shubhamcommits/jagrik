const express = require("express");
const app = express();
const port = 3000;
const config = require("./config");

var OpenTok = require("opentok"),
  opentok = new OpenTok(config.API_KEY, config.API_SECRET);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/createSession", (req, res) => {
  opentok.createSession(function (err, session) {
    if (err) return console.log(err);
    token = session.generateToken();
    // save the sessionId
    res.send({ sessionId: session.sessionId, token });
  });
});

app.get("/joinSession", (req, res) => {
  let sessionId = req.headers.sessionid;
  const token = opentok.generateToken(sessionId);
  res.send(token);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
