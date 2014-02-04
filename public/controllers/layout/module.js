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
        template: "<div class=\"panel-editor shadow\">" + 
                        "<div id=\"{{panel}}\" class=\"editor\"></div>" +
                    "</div>",
        link: function(scope, element, attrs) {
            
//            angular.element("#" + attrs.id).ready(function() {
//                var e = ace.edit(attrs.id);
//                e.setTheme("ace/theme/twilight");
//                var mode = "json";
//                setMode(e, mode);
//            });
        }
    };
})
