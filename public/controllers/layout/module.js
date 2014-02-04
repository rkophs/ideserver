var ideApp = angular.module("ideApp", []);

ideApp.controller('LayoutControl', function($scope) {
    $scope.init = function() {

    };

}).directive('layout', function() {
    return {
        restrict: "E",
        templateUrl: 'controllers/layout/module.html',
        link: function(scope, element, attrs){
            var e1 = ace.edit("e1");
            e1.setTheme("ace/theme/twilight");
            var mode = "json";
            setMode(e1, mode);
        }
    };
});
