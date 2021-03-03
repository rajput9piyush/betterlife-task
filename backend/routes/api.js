const express = require("express");

const {API, API2} = require("../components/api");

const router = express.Router();

router.get("/", API);
router.get("/2", API2)

module.exports = router;