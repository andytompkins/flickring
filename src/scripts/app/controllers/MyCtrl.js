import mCtrls from './_mCtrls';
import debug from 'debug';
import loader from '../../utilities/loader';

var log = debug('Ctrls');

mCtrls.controller('MyCtrl', function ($scope) {
  
    let maxImages = 20;
  
    $scope.images = [];
    $scope.current = 0;
    
    $scope.appData = loader.getLoader('main').getResult('app-data');
    //console.log("appData:");
    //console.dir($scope.appData);
    
    let flickr = new Flickr({
      api_key: "84591107291ef03adcc9712424c8e135"
    });
    
    $scope.loadRecord = function() {
      flickr.photos.search({
        sort: 'random',
        tag_mode: 'all',
        safe_search: 1,
        tags: $scope.appData[$scope.current].PrimaryAddress.CITY + "," + $scope.appData[$scope.current].PrimaryAddress.STATE
      }, function(err, result) {
        if (err) { throw new Error(err); }
        //console.dir(result);
        let images = [];
        let numPhotos = (result.photos.photo.length > maxImages) ? maxImages : result.photos.photo.length;
        for (let i = 0; i < numPhotos; i++) {
          let photo = result.photos.photo[i];
          let url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + 'm.jpg';
          //console.log("pushing " + photo.title);
          images.push({
            'id': i,
            'src': url,
            'title': photo.title
          });
        }
        $scope.images.length = 0;
        //console.log("setting images");
        $scope.images = images;
        $scope.$digest();
      });
    };
    
    $scope.loadRecord();
    
    $scope.clickLeft = function(e) {
      if ($scope.current === 0) {
        $scope.current = $scope.appData.length - 1;
      } else {
        $scope.current--;
      }
      $scope.loadRecord();
    };
    
    $scope.clickRight = function(e) {
      if ($scope.current === $scope.appData.length - 1) {
        $scope.current = 0;
      } else {
        $scope.current++;
      }
      $scope.loadRecord();
    };
    
});
