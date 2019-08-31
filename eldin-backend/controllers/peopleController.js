var con = require("../db");
var combineLatest = require("rxjs");

exports.index = function(req, res) {
  con.query("SELECT * FROM people", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

exports.get = function(req, res) {
  const resObj = {};
  const whereClause = `\`Username\`='${req.params.people_id}'`;

  const peopleQuery = `SELECT * FROM people WHERE ${whereClause}`;
  const helpsQuery = `SELECT * FROM helps WHERE ${whereClause}`;
  const ownsQuery = `SELECT * FROM own WHERE ${whereClause}`;
  const livesInQuery = `SELECT * FROM livesin WHERE ${whereClause}`;
  const peopleQuery$ = con.query(peopleQuery, (err, rows));
  const helpsQuery$ = con.query(peopleQuery, (err, rows));
  const ownsQuery$ = con.query(peopleQuery, (err, rows));
  const livesQuery$ = con.query(peopleQuery, (err, rows));
  combineLatest(peopleQuery$, helpsQuery$, ownsQuery$, livesQuery$).subscribe(
    ([peope, helps, owns, lives]) => {
      console.log(people);
      console.log(helps);
      console.log(owns);
      console.log(lives);
    }
  );
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
