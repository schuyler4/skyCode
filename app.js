const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const blueBird = require('bluebird');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const app = express();

const client = redis.createClient(6379, 'localhost');
const secret = require('./secret.js');

app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({
  secret: secret.session,
  store: new RedisStore({host: 'localhost', port: 6379, client: client, ttl:100000}),
  saveUninitialized: false,
  resave: false
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect(secret.database);
mongoose.Promise = blueBird;

require('./routes/user.js')(app);
require('./routes/basic.js')(app);

app.listen(3000);
console.log("listening on port 3000");
