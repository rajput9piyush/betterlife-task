const express = require("express");

const {homepage} = require("../components/homepage");

const router = express.Router();

router.get("/", homepage);

module.exports = router;