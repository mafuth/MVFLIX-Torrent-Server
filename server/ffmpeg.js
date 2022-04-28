'use strict';

var path = require('path'),
  fs = require('fs'),
  pump = require('pump');

module.exports = function (req, res, torrent, file) {
  var param = req.query.ffmpeg,
    ffmpeg = require('fluent-ffmpeg');

  res.type('video/mp4');
  var command = ffmpeg(file.createReadStream())
    .outputOptions([
      '-c:v libx264',
      '-g 52',
      '-movflags frag_keyframe+empty_moov',
      '-f mp4',
      '-threads 20',
      '-deadline realtime',
      '-error-resilient 1'
    ])
    .on('start', function (cmd) {
      console.log(cmd);
    })
    .on('error', function (err) {
      console.error(err);
    });
  pump(command, res);
}