schiv_module.controller("navigation_controller", function ($scope) {
    $scope.show_index = true;
    $scope.show_past = false;
    $scope.show_settings = false;


    $scope.index = function () {
        $scope.show_index = true;
        $scope.show_past = false;
        $scope.show_settings = false;
    };
    $scope.past = function () {
        $scope.show_index = false;
        $scope.show_past = true;
        $scope.show_settings = false;
    };
    $scope.settings = function () {
        $scope.show_index = false;
        $scope.show_past = false;
        $scope.show_settings = true;
    };
});