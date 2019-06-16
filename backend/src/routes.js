const express = require('express');
const PostController = require('./controllers/Post');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', PostController.like);

module.exports = routes;
