'use strict';

angular.module('mission11App')
  .controller('PoiDetailCtrl', function ($scope, $routeParams, $http) {

    google.maps.visualRefresh = true;

    angular.extend($scope, {
      position: {
        coords: {
          // latitude:   $scope.poi.lat, // initial map center latitude
          // longitude:  $scope.poi.lon // initial map center longitude
          latitude  : 44,
          longitude : -73
        }
      },

      /** the initial center of the map */
      centerProperty: {
        // latitude: $scope.poi.lat, // initial map center latitude
        // longitude: $scope.poi.lon // initial map center longitude
        latitude  : 44,
        longitude : -73
      },

      /** the initial zoom level of the map */
      zoomProperty: 4,

      /** list of markers to put in the map */
      markersProperty: [ {
        // latitude: $scope.poi.lat, // initial map center latitude
        // longitude: $scope.poi.lon // initial map center longitude
        latitude  : 44,
        longitude : -73
      }],

      // These 2 properties will be set when clicking on the map
      clickedLatitudeProperty: null,
      clickedLongitudeProperty: null,

      eventsProperty: {
        click: function (mapModel, eventName, originalEventArgs) {
          // 'this' is the directive's scope
          $log.log("user defined event on map directive with scope", this);
          $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
        }
      }
    });

    $scope.poiId = $routeParams.poiId;
    $scope.poiFetched = false;

    var poiURL, params;

    poiURL = 'https://apis.skplanetx.com/tmap/pois/' + $routeParams.poiId;
    
    params = $.param({
      version       : 1,
      bizAppId      : '',
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
      $scope.poi = data.poiDetailInfo;

      angular.extend($scope, {
        position: {
          coords: {
            latitude:   $scope.poi.lat, // initial map center latitude
            longitude:  $scope.poi.lon // initial map center longitude
          }
        },

        /** the initial center of the map */
        centerProperty: {
          latitude: $scope.poi.lat, // initial map center latitude
          longitude: $scope.poi.lon // initial map center longitude
        },

        /** the initial zoom level of the map */
        zoomProperty: 16,

        /** list of markers to put in the map */
        markersProperty: [ {
          latitude: $scope.poi.lat, // initial map center latitude
          longitude: $scope.poi.lon // initial map center longitude
        }],

        // These 2 properties will be set when clicking on the map
        clickedLatitudeProperty: null,
        clickedLongitudeProperty: null,

        eventsProperty: {
          click: function (mapModel, eventName, originalEventArgs) {
            // 'this' is the directive's scope
            $log.log("user defined event on map directive with scope", this);
            $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
          }
        }
      });

      prettyPrint();
    });
  });
