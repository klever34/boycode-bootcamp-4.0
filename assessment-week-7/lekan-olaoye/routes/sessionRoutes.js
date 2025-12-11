const express = require("express");
const router = express.Router();
const c = require("../controllers/sessionController");
const validate = require("../middleware/validate");

// simple session validator
function sessionValidator(body) {
  if (isNaN(body.reps)) return { error: "reps must be number" };
  if (isNaN(body.sets)) return { error: "sets must be number" };
  if (!body.exerciseId) return { error: "exerciseId required" };
  return { error: null };
}

router.get("/", c.getAll);
router.get("/:id", c.getOne);
// Validate body and ensure exercise exists in controller
router.post("/", validate(sessionValidator), c.create);
router.delete("/:id", c.delete);

module.exports = router;
