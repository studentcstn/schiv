schiv_module.controller('settings_controller', function($scope, $http, $rootScope){
    $scope.$on("show_settings", function () {
        $scope.setting();
    });


});