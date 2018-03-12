const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bearRoutes = require('./bears/bearRoutes');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

mongoose
  .connect('mongodb://localhost/BookKeeper')
  .then(conn => {
    console.log('connected to mongo');
  })
  .catch(err => {
    console.log('error connect to mongo');
	});

server.use('/api/bears', bearRoutes);



const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
