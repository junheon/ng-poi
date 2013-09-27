'use strict';

angular.module('mission11App')
  .controller('MainCtrl', function ($scope, $http) {
    window.navigator.geolocation.getCurrentPosition(function (position) {
      var poiURL = 'https://apis.skplanetx.com/tmap/pois/search/around';

      $scope.page       = 0;
      $scope.perPage    = 10;
      $scope.totalCount = 10;
      $scope.pages      = 1;
      $scope.pois       = [];

      $scope.fetchPois = function () {
        if ($scope.page >= $scope.pages) {
          return;
        }

        $scope.page++;

        var params = $.param({
          version       : 1,
          page          : $scope.page,
          count         : $scope.perPage,
          bizAppId      : '',
          categories    : '한식;중식;일식;양식',
          centerLon     : position.coords.longitude,
          centerLat     : position.coords.latitude,
          radius        : 3,
          reqCoordType  : 'WGS84GEO',
          resCoordType  : 'WGS84GEO',
          callback      : ''
        });

        $http({
          method  : 'get',
          url     : [poiURL, params].join('?'),
          headers : {
            appKey : '358b11d1-64e8-362d-973b-7c5cbbc0f74c'
          }
        }).success(function (data) {
          $scope.pages = Math.round(data.searchPoiInfo.totalCount / $scope.perPage);

          angular.forEach(data.searchPoiInfo.pois.poi, function (poi) {
            $scope.pois.push(poi);
          });
        });
      };

      $scope.fetchPois();
    });
  });
