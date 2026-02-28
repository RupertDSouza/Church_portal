const Mass = require("../models/mongodb/massModel");

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Seeds one Mass document per day (7 total).
 * Idempotent — skips days that already exist.
 */
async function seedMassTimings() {
    try {
        for (const name of DAYS) {
            const exists = await Mass.findOne({ name });
            if (!exists) {
                await Mass.create({ name, masses: [] });
                console.log(`Mass seeded: ${name}`);
            }
        }
    } catch (err) {
        console.error("Mass seed error:", err);
    }
}

module.exports = seedMassTimings;
