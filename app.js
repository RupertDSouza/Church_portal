const express = require("express");
const route = require("./routes/router");
const connectToDatabase = require("./config/db");
const app = express();

const port = process.env.PORT || 3000;

app.use("/app", route);

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log("Server is listening");
  });
});
