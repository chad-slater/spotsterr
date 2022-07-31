const express = require("express");
const router = express.Router();
const { getTabs } = require("../controllers/songsterrController");

router.route("/").post(getTabs);

module.exports = router;
