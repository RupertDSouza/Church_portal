const express = require("express");
const router = require("./routes/router");
const connectToDatabase = require("./config/db");
const bodyparse = require("body-parser");
const app = express();

const port = process.env.PORT || 3000;

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log("Server is listening");
  });
});

app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json());

app.use("/app", router);
