var con = require("../db");

exports.index = function(req, res) {
  con.query(
    "SELECT building, tier as tiered, count(*) as foundIn from buildings group by building",
    (err, rows) => {
      if (err) throw err;
      rows.map(row => {
        row.tiered = row.tiered !== null ? "Yes" : "No";
      });
      res.json(rows);
    }
  );
};

exports.get = function(req, res) {
  request = req.params.buildings_id.replace("'", "''");
  resObj = {};
  con.query(
    `SELECT building, tier as tiered, count(*) as foundIn from buildings WHERE building='${request}' group by building `,
    (err, rows) => {
      if (err) throw err;
      rows.map(row => {
        row.tiered = row.tiered !== null ? "Yes" : "No";
      });
      resObj.info = rows[0];
      const query = `SELECT * FROM buildings WHERE \`building\`='${request}'`;
      con.query(query, (err, rows) => {
        if (err) throw err;
        resObj.built = rows;
        resObj.built.map(cityBuilt => {
          if (cityBuilt.tier === 1) {
            cityBuilt.tier = "T1";
          } else if (cityBuilt.tier === 2) {
            cityBuilt.tier = "T2";
          } else if (cityBuilt.tier === 3) {
            cityBuilt.tier = "T3";
          }
          return cityBuilt;
        });
        res.json(resObj);
      });
    }
  );
};
