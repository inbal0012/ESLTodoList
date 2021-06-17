const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routers/todos');
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todos', {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once('open', function () {
  console.log('MongoDB connection established successfully');
});

app.use('/todos', todoRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, function () {
  console.log('Server is running on Port: ' + PORT);
});
