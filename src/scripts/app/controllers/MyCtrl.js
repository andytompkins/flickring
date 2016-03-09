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
    
});
