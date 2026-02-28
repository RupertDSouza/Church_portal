const app = require("./backend/app");
const connectToDatabase = require("./backend/config/db");
const seedMassTimings = require("./backend/config/seedMass");

const port = process.env.PORT || 3000;

connectToDatabase().then(async () => {
    await seedMassTimings();          // one-time seed — no-op if already seeded
    app.listen(port, "0.0.0.0", () => {
        console.log("Server is listening on port", port);
    });
});

