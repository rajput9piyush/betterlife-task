const mongoose = require("mongoose");

const User = require("../models/user");

exports.API = async (req, res) => {
  mongoose
    .connect(process.env.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((err) => {
      console.log(err);
    });
  const countryCode = req.query["nat"] ? req.query["nat"] : "US";
  const page = req.query["page"] ? req.query["page"] : 1;
  const results = req.query["results"] ? req.query["results"] : 10;
  const gen = req.query["gender"];
  //   console.log(req.query["page"]);
  try {
    let count;
    if (gen) {
      var details = await User.find({ gender: gen, nat: countryCode })
        .limit(results * 1)
        .skip((page - 1) * results);
      count = await User.countDocuments({ gender: gen, nat: countryCode });
    } else {
      var details = await User.find({ nat: countryCode })
        .limit(results * 1)
        .skip((page - 1) * results);
      count = await User.countDocuments({ nat: countryCode });
    }
    res.json({
      details,
      totalPages: Math.ceil(count / results),
      currentPage: page * 1,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.API2 = async (req, res) => {
  mongoose
    .connect(process.env.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((err) => {
      console.log(err);
    });
  var gender;
  await User.collection.distinct("gender", function (error, results) {
    results = JSON.stringify(Object.assign({}, results));
    results = JSON.parse(results);
    console.log(results);
    gender = results;
  });
  var countryCode;
  await User.collection.distinct("nat", function (error, results) {
    results = JSON.stringify(Object.assign({}, results));
    results = JSON.parse(results);
    console.log(results);
    countryCode = results;
  });
  setTimeout(() => {
    console.log(countryCode);
    console.log(gender);

    res.json({
      gender,
      countryCode,
    });
  }, 1000);
};
