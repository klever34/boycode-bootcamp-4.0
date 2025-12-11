const express = require("express");
const router = express.Router();
const c = require("../controllers/exerciseController");
const validate = require("../middleware/validate");

// simple exercise validator
function exerciseValidator(body) {
  if (!body.name) return { error: "name required" };
  if (!["strength", "cardio", "flexibility"].includes(body.category))
    return { error: "invalid category" };
  if (!["easy", "medium", "hard"].includes(body.difficulty))
    return { error: "invalid difficulty" };
  if (!(body.duration > 0)) return { error: "invalid duration" };
  return { error: null };
}

router.get("/", c.getAll);
router.get("/:id", c.getOne);
router.post("/", validate(exerciseValidator), c.create);
router.put("/:id", c.update);
router.patch("/:id", c.update);
router.delete("/:id", c.delete);

module.exports = router;
