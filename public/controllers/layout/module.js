var ideApp = angular.module("ideApp", []);

ideApp.controller('LayoutControl', function($scope) {
    
    angular.element(document).ready(function(){
        console.log("init called");
        var e1 = ace.edit("e1");
        e1.setTheme("ace/theme/twilight");
        var mode = "json";
        setMode(e1, mode);
    });
    
    $scope.init = function() {
        
    };
    
}).directive('layout', function() {
    return {
        restrict: "E",
        templateUrl: 'controllers/layout/module.html'
    };
});
