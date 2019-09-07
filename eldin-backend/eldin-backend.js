let cors = require("cors");
let apiRoutes = require("./api-routes");
let express = require("express");
let bodyParser = require("body-parser");

function main() {
  let app = express();
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(cors());
  var port = 9090;
  app.use("/api", apiRoutes);
  app.listen(port, function() {
    console.log("Running Eldin-Backend on port " + port);
  });
}

main();
