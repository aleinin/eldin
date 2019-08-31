var con = require("../db");

exports.index = function(req, res) {
  con.query("SELECT * FROM buildings", (err, rows) => {
    if (err) throw err;
    rows = rows.map(row => row.building);
    res.json(createBuildingsRes(rows));
  });
};

exports.get = function(req, res) {
  const query = `SELECT * FROM buildings WHERE \`building\`=${req.params.buildings_id}`;
  console.log(query);
  con.query(query, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

function count(itemToCount, list) {
  let count = 0;
  for (let item of list) {
    if (item === itemToCount) {
      count += 1;
    }
  }
  return count;
}

function createBuildingsRes(list) {
  let resp = [];
  while (list.length > 0) {
    const foundIn = count(list[0], list);
    resp.push({ building: list[0], foundIn });
    list = list.filter(row => row !== list[0]);
  }
  return resp;
}
