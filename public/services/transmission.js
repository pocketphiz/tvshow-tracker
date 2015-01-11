'use strict';

angular.module('MyApp')
    .factory('Transmission', ['$http', '$location', '$rootScope', '$alert',
      function($http, $location, $rootScope, $alert) {
          return {
              download: function (torrent) {
                  return $http.post('/api/download', torrent)
                      .success(function (data) {
                          $alert({
                              title: 'Added torrent to queue',
                              content: torrent.showName,
                              placement: 'top-right',
                              type: 'success',
                              duration: 3
                          });
                      })
                      .error(function (err) {
                          $alert({
                              title: 'Error!',
                              content: 'Failed to queue torrent' + err,
                              placement: 'top-right',
                              type: 'danger',
                              duration: 3
                          });
                      });
              }
          };
      }]);