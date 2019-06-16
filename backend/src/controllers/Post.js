const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const image = `${author}.${Date.now()}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', image));

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image,
    });

    req.io.emit('post', post);

    res.json(post);
  },

  async like(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes++;

    await post.save();

    req.io.emit('like', post);

    return res.json(post);
  },
};
