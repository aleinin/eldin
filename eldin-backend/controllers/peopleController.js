var con = require("../db");

exports.index = function(req, res) {
  con.query("SELECT * FROM people", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

exports.get = function(req, res) {
  const resObj = {};
  request = req.params.people_id.replace("'", "''");
  const whereClause = `\`Username\`='${request}'`;

  const peopleQuery = `SELECT * FROM people WHERE ${whereClause}`;
  const helpsQuery = `SELECT * FROM helps WHERE ${whereClause}`;
  const ownsQuery = `SELECT * FROM owns WHERE ${whereClause}`;
  const livesInQuery = `SELECT * FROM livesin WHERE ${whereClause}`;
  con.query(peopleQuery, (err, rows) => {
    if (err) throw err;
    resObj.info = rows[0];
    con.query(helpsQuery, (err, rows) => {
      if (err) throw err;
      resObj.helps = rows;
      con.query(ownsQuery, (err, rows) => {
        if (err) throw err;
        resObj.owns = rows;
        con.query(livesInQuery, (err, rows) => {
          if (err) throw err;
          resObj.lives = rows;
          res.json(resObj);
        });
      });
    });
  });
};
