const express = require("express");
const createRouter = require("./genericRouter");

// ── Unique routes (custom logic – kept as separate files) ─────────
const authrouter = require("./authRouter");
const adminrouter = require("./adminRouter");
const emailRouter = require("./emailRouter");

const router = express.Router();

// ── Generic CRUD routes ───────────────────────────────────────────
// To add a new resource: add one entry here with { path, model, access }.
const routes = [
  // admin-only
  { path: "ward", model: require("../models/mongodb/wardModel"), access: ["admin"] },
  { path: "priest", model: require("../models/mongodb/priestModel"), access: ["admin"] },
  { path: "association", model: require("../models/mongodb/associationModel"), access: ["admin"] },
  { path: "associatonMember", model: require("../models/mongodb/associatonMemberModel"), access: ["admin"] },
  { path: "commission", model: require("../models/mongodb/commissionModel"), access: ["admin"] },
  { path: "commissionMember", model: require("../models/mongodb/commissionMemberModel"), access: ["admin"] },
  { path: "institution", model: require("../models/mongodb/institutionModel"), access: ["admin"] },
  { path: "obituary", model: require("../models/mongodb/obituaryModel"), access: ["admin"] },
  { path: "parishcouncil", model: require("../models/mongodb/parishcouncilModel"), access: ["admin"] },
  { path: "user", model: require("../models/mongodb/userModel"), access: ["admin"] },
  { path: "church", model: require("../models/mongodb/churchModel"), access: ["admin"] },
  { path: "document", model: require("../models/mongodb/documentModel"), access: ["admin"] },
  { path: "poster", model: require("../models/mongodb/posterModel"), access: ["admin"] },
  { path: "priestMessage", model: require("../models/mongodb/priestMessageModel"), access: ["admin"] },
  { path: "spotlight", model: require("../models/mongodb/spotlightModel"), access: ["admin"] },

  // admin + priest
  { path: "news", model: require("../models/mongodb/newsModel"), access: ["admin", "priest"] },
  { path: "mass", model: require("../models/mongodb/massModel"), access: ["admin", "priest"] },
  { path: "reading", model: require("../models/mongodb/readingsModel"), access: ["admin", "priest"] },
  { path: "payment", model: require("../models/sequelize/paymentModel"), access: ["admin", "priest"] },

  // student
  { path: "student", model: require("../models/sequelize/studentModel"), access: "student" },
];

routes.forEach(({ path, model, access }) =>
  router.use(createRouter(path, model, access))
);

// ── Unique routes ─────────────────────────────────────────────────
router.use(authrouter, adminrouter, emailRouter);

module.exports = router;
