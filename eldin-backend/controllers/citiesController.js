var con = require("../db");
exports.index = function(req, res) {
  const query =
    "SELECT t1.cityName as name, t1.userName as owner, t1.citySize, t1.totalTiles, t1.population, t1.nation, t2.hasMarket FROM (SELECT cities.cityName, owns.userName, cities.citySize, cities.totalTiles, cities.population, cities.nation FROM cities INNER JOIN owns ON cities.cityName=owns.cityName WHERE owns.isPrimary=true) as t1, (SELECT cityName, CASE WHEN building='Market' THEN true ELSE false END AS hasMarket FROM buildings GROUP BY cityName) as t2 WHERE t1.cityName = t2.cityName";
  con.query(query, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

exports.get = function(req, res) {
  const resObj = {};
  const whereClause = `\`cityName\`='${req.params.city_id}'`;

  const citiesQuery = `SELECT * FROM cities WHERE ${whereClause}`;
  const buildingsQuery = `SELECT * FROM buildings WHERE ${whereClause}`;
  const sellsQuery = `SELECT * FROM sells WHERE ${whereClause}`;
  const helpsQuery = `SELECT * FROM helps WHERE ${whereClause}`;
  const ownsQuery = `SELECT * FROM owns WHERE ${whereClause}`;
  const livesInQuery = `SELECT * FROM livesin WHERE ${whereClause}`;
  con.query(citiesQuery, (err, rows) => {
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
          con.query(buildingsQuery, (err, rows) => {
            if (err) throw err;
            resObj.buildings = rows;
            con.query(sellsQuery, (err, rows) => {
              if (err) throw err;
              resObj.sells = rows;
              res.json(resObj);
            });
          });
        });
      });
    });
  });
};
