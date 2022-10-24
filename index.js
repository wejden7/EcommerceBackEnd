const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const port =process.env.PORT|| 3006;

const passport = require("passport");

var cors = require("cors");

require("dotenv").config();

require("./src/config/passport");

require("./src/config/conextion_bd");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(express.static('storage'))

app.use(require("./src/router/index.router"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
    