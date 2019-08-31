var con = require("../db");

exports.index = function(req, res) {
  con.query("SELECT * FROM goods", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

exports.get = function(req, res) {
  const resObj = {};
  const goodsClause = `\`Name\`='${req.params.goods_id}'`;
  const sellsClause = `\`good\`='${req.params.goods_id}'`;

  const goodsQuery = `SELECT * FROM goods WHERE ${goodsClause}`;
  const sellsQuery = `SELECT * FROM sells WHERE ${sellsClause}`;
  con.query(goodsQuery, (err, rows) => {
    if (err) throw err;
    resObj.info = rows[0];
    con.query(sellsQuery, (err, rows) => {
      if (err) throw err;
      resObj.sells = rows;
      res.json(resObj);
    });
  });
};
