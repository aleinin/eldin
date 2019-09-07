var con = require("../db");

exports.index = function(req, res) {
  con.query("SELECT * FROM goods", (err, goods) => {
    if (err) throw err;
    con.query("SELECT * FROM sells", (err, sells) => {
      if (err) throw err;

      goods.forEach(good => {
        good.soldIn = sells.filter(sell => sell.good === good.name).length;
        return good;
      });
      res.json(goods);
    });
  });
};

exports.get = function(req, res) {
  const resObj = {};
  const goodsClause = `\`name\`='${req.params.goods_id}'`;
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
