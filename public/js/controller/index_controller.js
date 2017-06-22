schiv_module.controller('index_controller', function($scope, $http, $rootScope) {

    $scope.$on("show_index", function () {
        docent.getDocentList();

    });

});
