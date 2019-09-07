var con = require("../db");

exports.index = function(req, res) {
  con.query("SELECT * FROM cities", (err, cities) => {
    if (err) throw err;
    con.query("SELECT * FROM owns", (err, owners) => {
      if (err) throw err;
      con.query(
        "SELECT * FROM buildings WHERE `building`='Market'",
        (err, buildings) => {
          if (err) throw err;
          cities.forEach(city => {
            city.owners = owners
              .filter(owner => owner.cityName === city.cityName)
              .map(owner => owner.userName);
            city.hasMarket =
              buildings.filter(building => building.cityName === city.cityName)
                .length > 0;
            return city;
          });
          res.json(cities);
        }
      );
    });
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
