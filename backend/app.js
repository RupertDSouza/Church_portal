const express = require("express");
const router = require("./routes/index");
const connectToDatabase = require("./config/db");
const bodyParse = require("body-parser");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.use("/app", router);

app.use(express.static("../public"));
app.get(
  "/",
  express.static(
    path.join(
      __dirname,
      "../public/css",
      "../public/js",
      "../public/fonts",
      "../public/sass"
    )
  )
);

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log("Server is listening");
  });
});
