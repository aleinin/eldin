let router = require("express").Router();
var peopleController = require("./controllers/peopleController");
var citiesController = require("./controllers/citiesController");
var goodsController = require("./controllers/goodsController");
var buildingsController = require("./controllers/buildingsController");
var timeController = require("./controllers/timeController");

router.route("/people").get(peopleController.index);
router.route("/people/:people_id").get(peopleController.get);

router.route("/cities").get(citiesController.index);
router.route("/cities/:city_id").get(citiesController.get);

router.route("/goods").get(goodsController.index);
router.route("/goods/:goods_id").get(goodsController.get);

router.route("/buildings").get(buildingsController.index);
router.route("/buildings/:buildings_id").get(buildingsController.get);

router.route("/updated").get(timeController.index);

module.exports = router;
