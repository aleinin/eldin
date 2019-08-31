var con = require("../db");

exports.index = function(req, res) {
  con.query("SELECT * FROM updated", (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
};
