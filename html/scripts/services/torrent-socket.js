'use strict';

angular.module('MVFlix-torrent-server-app')
  .factory('torrentSocket', function (socketFactory) {
    return socketFactory();
  });
