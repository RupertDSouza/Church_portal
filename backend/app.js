const express = require("express");
const router = require("./routes/index");
const connectToDatabase = require("./config/db");
const bodyParse = require("body-parser");
const path = require("path");
const app = express();
const sequelize = require('./config/sequelize');



const port = process.env.PORT || 3000;

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log("Server is listening");
  });
});

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to sql has been established successfully.');

    await sequelize.sync({ force: false }); // Set to `true` if you want to drop and recreate tables on every sync
    console.log('Database sync complete.');


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

syncDatabase();

app.use("/app", router);


app.set('views', path.join(__dirname, '../views'));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page', message: 'Welcome to the Home Page!' });
});

app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.render(page, { title: `${page.charAt(0).toUpperCase() + page.slice(1)} Page`, message: `Welcome to the ${page.charAt(0).toUpperCase() + page.slice(1)} Page!` });
});

