schiv_module.controller('index_controller', function($scope, $http, $rootScope) {

    $scope.$on('login_success', function () {
        $scope.getDocentList();
    });
    $scope.$on("show_index", function () {
        $scope.getDocentList();
    });

});
