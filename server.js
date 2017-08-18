const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const morgan = require("morgan");
const session = require("express-session");
const routes = require("./routes/index.js");
const app = express();
// **********CREATE YOUR ENGINE HERE*********
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'mustache');
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(morgan('dev'));

app.use(session({
  secret: 'we-mobbin' ,
  resave: false,
  saveUninitialized: false
}));
app.use(routes);

app.listen(8081, function () {
  console.log(' we-mobbin on local host 8081');

});
