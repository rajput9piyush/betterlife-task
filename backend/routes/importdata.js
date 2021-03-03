const express = require("express");

const {importdata} = require("../components/importdata");

const router = express.Router();

router.get("/", importdata);

module.exports = router;