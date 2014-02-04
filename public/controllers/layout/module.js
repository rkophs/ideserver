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

}).directive('layout', function() {
    return {
        restrict: "E",
        templateUrl: 'controllers/layout/module.html',
    };
}).directive('editor', function() {
    return {
        restrict: "E",
        templateUrl: 'controllers/editor/module.html',
        link: function(scope, element, attrs){
            var child = element.children()[0];
            console.log(child);
//            var e = ace.edit(child.attr("id"));
//            e.setTheme("ace/theme/twilight");
//            var mode = "json";
//            setMode(e, mode);
        }
    };
})
