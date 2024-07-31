const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const userRouter = require("./routes/user.route");
const receipeRouter = require("./routes/recipe.route");
// const User = require("./database/models/user.model");
const path = require("path");
require("dotenv").config();
require("./database/connection");

const app = express();
const server = http.createServer(app);

//Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use(userRouter);
app.use(receipeRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});
