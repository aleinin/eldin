var con = require("../db");

const goodsQuery =
  "SELECT name, sell, buy, boostable, t1, t2, t3, boostBuilding, COALESCE(t2.tradedIn, 0) as tradedIn FROM goods as t1 LEFT JOIN (SELECT good, count(*) as tradedIn FROM sells GROUP BY good) as t2 ON t1.name=t2.good";
exports.index = function(req, res) {
  con.query(goodsQuery, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

exports.get = function(req, res) {
  const resObj = {};
  const goodsClause = ` WHERE \`Name\`='${req.params.goods_id}'`;
  const sellsClause = `\`good\`='${req.params.goods_id}'`;

  const sellsQuery = `SELECT * FROM sells WHERE ${sellsClause}`;
  con.query(goodsQuery + goodsClause, (err, rows) => {
    if (err) throw err;
    resObj.info = rows[0];
    con.query(sellsQuery, (err, rows) => {
      if (err) throw err;
      resObj.sells = rows;
      resObj.sells.map(sell => {
        sell.buy = resObj.info.buy;
        if (sell.tier === null) {
          sell.sell = resObj.info.sell;
        } else if (sell.tier === 0) {
          sell.sell = resObj.info.sell;
          sell.tier = "T0";
        } else if (sell.tier === 1) {
          sell.sell = resObj.info.t1;
          sell.tier = "T1";
        } else if (sell.tier === 2) {
          sell.sell = resObj.info.t2;
          sell.tier = "T2";
        } else {
          sell.sell = resObj.info.t3;
          sell.tier = "T3";
        }
        return sell;
      });
      res.json(resObj);
    });
  });
};
