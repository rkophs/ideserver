var ideApp = angular.module("ideApp", ['ui.bootstrap']);

var LayoutControl = function($scope, $modal, $log) {
    var _d = {
        editors: [
            { "id": "e1",
                "language": "json",
                "filename": "example.json"}
        ],
        editor_margin: 10,
        next_editor_id: 2
    };

    $scope.init = function() {
        _d.languages = languages;
        $scope.data = {};
        _.defaults($scope.data, _d);

        //Only to be used in setting up ng-repeat dependencies!
        var count = $scope.data.editors.length;
        $scope.data.editor_width = (100 / count);

    };

    $scope.add_panel = function() {
        var count = $scope.data.editors.length + 1;
        $scope.data.editor_width = (100 / count);
        var id = "e" + $scope.data.next_editor_id;
        $scope.data.editors.push({"id":id, 
                                    "language": "json",
                                    "filename": "example.json"});
        $scope.data.next_editor_id += 1;
    };

    $scope.delete_panel = function(id) {
        $scope.data.editors = _.without($scope.data.editors, 
                                    _.findWhere($scope.data.editors, {id: id}));
        var count = $scope.data.editors.length;
        $scope.data.editor_width = (100 / count);
    };
    
    $scope.set_color = function(id){
        return getRGB(id);
    }

    $scope.select_language = function(id) {
        var modalInstance = $modal.open({
            templateUrl: "myModalContent.html",
            controller: ModalInstanceCtrl,
            resolve: {
                languages: function() {
                    return $scope.data.languages;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            var editor = _.findWhere($scope.data.editors, {id : id});
            editor.language = selectedItem;
            var e = ace.edit(id);
            console.log(selectedItem);
            var mode = selectedItem;
            setMode(e, mode);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

};

ideApp.directive('layout', function() {
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

var ModalInstanceCtrl = function($scope, $modalInstance, languages) {

    $scope.languages = languages;
    $scope.selected = {
        language: "json"
    };

    $scope.ok = function() {
        $modalInstance.close($scope.selected.language);
    };

    $scope.update = function(lang) {
        $scope.selected.language = lang;
        $modalInstance.close($scope.selected.language);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};
