const app = require("./backend/app");
const connectToDatabase = require("./backend/config/db");

const port = process.env.PORT || 3000;

connectToDatabase().then(() => {
    app.listen(port, "0.0.0.0", () => {
        console.log("Server is listening on port", port);
    });
});
