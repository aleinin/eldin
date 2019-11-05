let router = require("express").Router();
var peopleController = require("./controllers/peopleController");
var citiesController = require("./controllers/citiesController");
var goodsController = require("./controllers/goodsController");
var buildingsController = require("./controllers/buildingsController");
var timeController = require("./controllers/timeController");
var nationController = require("./controllers/nationController");
var captchaController = require("./controllers/captchaController");

router.route("/people").get(peopleController.index);
router.route("/people/:people_id").get(peopleController.get);

router.route("/cities").get(citiesController.index);
router.route("/cities/:city_id").get(citiesController.get);

router.route("/goods").get(goodsController.index);
router.route("/goods/:goods_id").get(goodsController.get);

router.route("/buildings").get(buildingsController.index);
router.route("/buildings/:buildings_id").get(buildingsController.get);

router.route("/nations").get(nationController.index);
router.route("/nations/:nation_id").get(nationController.get);

router.route("/updated").get(timeController.index);

router.route("/captcha").get(captchaController.index);

module.exports = router;
