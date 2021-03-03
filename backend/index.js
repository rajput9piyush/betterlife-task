require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const homepage = require("./routes/homepage");
const ImportData = require("./routes/importdata");
const API = require("./routes/api");

const app = express();

mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("ERROR: In Database Connection");
  });

app.use(cors());
app.use(bodyParser.json());

app.use("/", homepage);
app.use("/importdata", ImportData);
app.use("/api", API);

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on PORT ${process.env.PORT}`);
});
