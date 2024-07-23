const express = require("express");
const router = require("./routes/index");
const connectToDatabase = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const sequelize = require("./config/sequelize");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log("Server is listening on port", port);
  });
});

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection to SQL has been established successfully.");

    await sequelize.sync({ force: false }); // Set to `true` if you want to drop and recreate tables on every sync
    console.log("Database sync complete.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

syncDatabase();

app.use("/app", router);

app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "html");

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "../public", "index.html")));

// Ignore favicon.ico requests
// app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "favicon.ico"));
});

app.get("/", (req, res, next) => {
  res.render(
    "index",
    { title: "Home Page", message: "Welcome to the Home Page!" },
    (err, html) => {
      if (err) {
        console.error("Error rendering 'index' view:", err);
        return next(err);
      }
      res.send(html);
    }
  );
});

app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  console.log(`Attempting to render page: ${page}`);
  res.render(
    page,
    {
      title: `${page.charAt(0).toUpperCase() + page.slice(1)} Page`,
      message: `Welcome to the ${
        page.charAt(0).toUpperCase() + page.slice(1)
      } Page!`,
    },
    (err, html) => {
      if (err) {
        console.error(`Error rendering page: ${page}`, err);
        return next(err);
      }
      res.send(html);
    }
  );
});

// Catch-all route for debugging
app.use((req, res, next) => {
  console.log(`Unhandled route: ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error handling middleware triggered:", err);
  res.status(500).send("An error occurred!");
});
