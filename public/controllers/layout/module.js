var ideApp = angular.module("ideApp", []);

ideApp.controller('LayoutControl', function($scope){
    
}).directive('layout',function(){
    return {
        restrict: "E",
        templateUrl: 'module.html'
    };
});
