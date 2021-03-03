const fetch = require("node-fetch");

const User = require("../models/user");

exports.importdata = async (req, res) => {
  let msg = "";
  if (process.env.BRURL) {
    await fetch(process.env.BRURL, { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        User.insertMany(json[process.env.JSONRESULT]).then(() => {
          msg += "Data Inserted for Brazil<br>";
        });
      })
      .catch((err) => {
        msg += "ERROR: Brazil's data is not inserted<br>";
      });
  } else {
    msg += "URL for BRAZIL is not given<br>";
  }
  if (process.env.AUURL) {
    await fetch(process.env.AUURL, { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        User.insertMany(json[process.env.JSONRESULT]).then(() => {
          msg += "Data Inserted for Australia<br>";
        });
      })
      .catch((err) => {
        msg += "ERROR: Australia's data is not inserted<br>";
      });
  } else {
    msg += "URL for Australia is not given<br>";
  }
  if (process.env.CAURL) {
    await fetch(process.env.CAURL, { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        User.insertMany(json[process.env.JSONRESULT]).then(() => {
          msg += "Data Inserted for Canada<br>";
        });
      })
      .catch((err) => {
        msg += "ERROR: Canada's data is not inserted<br>";
      });
  } else {
    msg += "URL for Canada is not given<br>";
  }
  if (process.env.FRURL) {
    await fetch(process.env.FRURL, { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        User.insertMany(json[process.env.JSONRESULT]).then(() => {
          msg += "Data Inserted for France<br>";
        });
      })
      .catch((err) => {
        msg += "ERROR: France's data is not inserted<br>";
      });
  } else {
    msg += "URL for France is not given<br>";
  }
  if (process.env.GBURL) {
    await fetch(process.env.GBURL, { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        User.insertMany(json[process.env.JSONRESULT]).then(() => {
          msg += "Data Inserted for Great Britain<br>";
        });
      })
      .catch((err) => {
        msg += "ERROR: Great Britain's data is not inserted<br>";
      });
  } else {
    msg += "URL for Britain is not given<br>";
  }
  if (process.env.USURL) {
    await fetch(process.env.USURL, { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        User.insertMany(json[process.env.JSONRESULT]).then(() => {
          msg += "Data Inserted for USA<br>";
        });
      })
      .catch((err) => {
        msg += "ERROR: USA's data is not inserted<br>";
      });
  } else {
    console.log("URL for USA is not given<br>");
  }
  res.send(msg);
};
