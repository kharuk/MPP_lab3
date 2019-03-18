const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db_connection');
const router = require('./routes/api');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

db.authenticate()
    .then(() => console.log("Successful connection"))
    .catch(err => console.log("bad connect"));

app.use(router);

app.listen(8080, () => {
  console.log(`Server started on port 8080`);
});