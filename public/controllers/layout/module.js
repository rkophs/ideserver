var ideApp = angular.module("ideApp", []);

ideApp.controller('LayoutControl', function($scope) {

    var _d = {
        editors: ["e1", "e2"],
        editor_margin: 10
    };

    $scope.init = function() {
        $scope.data = {};
        _.defaults($scope.data, _d);

        //Only to be used in setting up ng-repeat dependencies!
        var count = $scope.data.editors.length;
        $scope.data.editor_width = (100 / count);

    };

    $scope.set_ace = function(el) {
        angular.element("#" + el).ready(function() {
            var e = ace.edit(el);
            e.setTheme("ace/theme/twilight");
            var mode = "json";
            setMode(e, mode);
        });
    };

}).directive('layout', function() {
    return {
        restrict: "E",
        templateUrl: 'controllers/layout/module.html',
        link: function(scope, element, attrs) {
            var e1 = ace.edit("e1");
            e1.setTheme("ace/theme/twilight");
            var mode = "json";
            setMode(e1, mode);
        }
    };
});
