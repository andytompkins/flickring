import mCtrls from './_mCtrls';
import debug from 'debug';
import loader from '../../utilities/loader';

var log = debug('Ctrls');

mCtrls.controller('MyCtrl', function ($scope) {
  
    $scope.images = [];
    $scope.current = 0;
    
    $scope.appData = loader.getLoader('main').getResult('app-data');
    console.log("appData:");
    console.dir($scope.appData);
    
    let flickr = new Flickr({
      api_key: "84591107291ef03adcc9712424c8e135"
    });
    
    $scope.loadRecord = function() {
      flickr.photos.search({
        text: $scope.appData[$scope.current].PrimaryAddress.CITY + "+" + $scope.appData[$scope.current].PrimaryAddress.STATE
      }, function(err, result) {
        if (err) { throw new Error(err); }
        console.dir(result);
        $scope.images.length = 0;
        let photo = result.photos.photo[0];
        let url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + 'm.jpg';
        $scope.images.push({
          'url': url,
          'alt': photo.title
        });
      });
    };
    
    $scope.loadRecord();
    
});
