const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 5000;
const app = express();
const server = http.Server(app);
const io = socketIO(server);

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
});

app.use(
  '/files',
  express.static(path.resolve(__dirname, '../uploads/resized'))
);
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cors());
app.use(routes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
