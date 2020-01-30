//  File that contains the server
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

// settings

//Server static assets if in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.set("port", process.env.PORT || 4000);

// middlewares: they execute before reaching the routes
// I'll use cors to connect two servers and exchange date between each other
app.use(cors());
// Now my server understand json formats and strings
app.use(express.json());
// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/todos", require("./routes/todos"));

module.exports = app;
