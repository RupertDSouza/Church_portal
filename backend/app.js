const express = require("express");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const sequelize = require("./config/sequelize");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// Set the view engine to EJS
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "../public")));

// Ignore favicon.ico requests
// app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    message: "Welcome to the Home Page!",
  });
});

app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  console.log(`Attempting to render page: ${page}`);
  res.render(page, (err, html) => {
    if (err) {
      console.error(`Error rendering page: ${page}`, err);
      return next(err);
    }
    res.send(html);
  });
});

app.get("/admin/:page", (req, res, next) => {
  const page = req.params.page;
  console.log(`Attempting to render page: ${page}`);
  res.render(`admin/${page}`, (err, html) => {
    if (err) {
      console.error(`Error rendering page: ${page}`, err);
      return next(err);
    }
    res.send(html);
  });
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

// const priestMessageModel = require("./models/mongodb/priestMessageModel");

// app.get("/priest_message", async (req, res, next) => {
//   try {
//     // Fetch the most recent/active priest record
//     const priests = await priestMessageModel.find().sort({ fromDate: -1 }).limit(1);
//     const ogImage =
//       priests.length > 0 && priests[0].image
//         ? priests[0].image
//         : "https://holyspiritmukka.in/images/holy-spirit-church.jpg"; // fallback
//     res.render("priest_message", { ogImage });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = app;