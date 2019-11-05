var con = require("../db");

exports.index = function(req, res) {
  resObj = {};
  con.query(
    "SELECT nation, userName as owner, cities.cityName as capital, count(*) as members FROM cities INNER JOIN (SELECT userName, cityName from owns WHERE isPrimary=true) primaryOwners ON cities.cityName = primaryOwners.cityName WHERE nation !='None' GROUP BY nation",
    (err, rows) => {
      if (err) throw err;
      rows.forEach(row => {
        if (row.nation.includes("[Capital]")) {
          const nationName = row.nation.replace(" [Capital]", "");
          const nation = rows.find(row => row.nation === nationName);
          nation.members += 1;
          nation.owner = row.owner;
          nation.capital = row.capital;
        }
      });
      rows = rows.filter(row => !row.nation.includes("[Capital]"));
      res.json(rows);
    }
  );
};

exports.get = function(req, res) {
  request = req.params.nation_id.replace("'", "''");
  resObj = {};
  const infoQuery = `SELECT nation, userName as owner, cities.cityName as capital, count(*) as members FROM cities INNER JOIN (SELECT userName, cityName from owns WHERE isPrimary=true) primaryOwners ON cities.cityName = primaryOwners.cityName WHERE nation LIKE '${request}%' GROUP BY nation`;
  const memberQuery = `SELECT cityName, citySize, population from cities where nation LIKE '${request}%'`;
  const buildingQuery = `SELECT building FROM buildings INNER join cities ON buildings.cityName=cities.cityName WHERE nation='${request}' AND building='Embassy' OR building='Keep' OR building='Jail' OR building='Trade Guild' OR building='Wagon Yard' GROUP BY building`;
  con.query(infoQuery, (err, rows) => {
    if (err) throw err;
    rows.forEach(row => {
      if (row.nation.includes("[Capital]")) {
        const nationName = row.nation.replace(" [Capital]", "");
        const nation = rows.find(row => row.nation === nationName);
        nation.members += 1;
        nation.owner = row.owner;
        nation.capital = row.capital;
      }
    });
    rows = rows.filter(row => !row.nation.includes("[Capital]"));
    resObj.info = rows[0];
    con.query(memberQuery, (err, rows) => {
      if (err) throw err;
      resObj.members = rows;
      con.query(buildingQuery, (err, rows) => {
        if (err) throw err;
        resObj.buildings = rows.map(building => building.building);
        res.json(resObj);
      });
    });
  });
};
