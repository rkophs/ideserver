var ideApp = angular.module("ideApp", []);

ideApp.controller('LayoutControl', function($scope) {

    var _d = {
        editors: ["e1"],
        editor_margin: 10,
        next_editor_id: 2
    };

    $scope.init = function() {
        _d.languages = languages;
        $scope.data = {};
        _.defaults($scope.data, _d);
        console.log($scope.data);

        //Only to be used in setting up ng-repeat dependencies!
        var count = $scope.data.editors.length;
        $scope.data.editor_width = (100 / count);

    };

    $scope.add_panel = function() {
        var count = $scope.data.editors.length + 1;
        $scope.data.editor_width = (100 / count);
        $scope.data.editors.push("e" + $scope.data.next_editor_id);
        $scope.data.next_editor_id += 1;
        console.log("added: " + "e" + ($scope.data.next_editor_id - 1));
    };

    $scope.delete_panel = function(id) {
        console.log("deleted: " + id);
        $scope.data.editors = _.without($scope.data.editors, id);
        var count = $scope.data.editors.length;
        $scope.data.editor_width = (100 / count);
    };

}).directive('layout', function() {
    return {
        restrict: "E",
        templateUrl: 'controllers/layout/module.html'
    };
}).directive('editor', function() {
    return {
        restrict: "E",
        template: "<div class=\"editor\"></div>",
        link: function(scope, element, attrs) {
            var el = element.children()[0];
            $(el).attr("id", attrs.id);
            var e = ace.edit(attrs.id);
            e.setTheme("ace/theme/twilight");
            var mode = "json";
            setMode(e, mode);
        }
    };
});
