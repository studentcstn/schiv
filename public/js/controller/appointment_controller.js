schiv_module.controller('appointment_controller', function($scope, $http, $rootScope) {
    $scope.appointment = {
        frequency: 0
    };
    $scope.appointment_build = {
        frequency: [
            {id: 0, name: "frequent"},
            {id: 1, name: "singular"}
            ],
        day: ["Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        date: "[0123][0-9][.][012][0-9][.][0-9]{4}",
        time: "[012][0-9][:][0-5][0-9]"
    };

    $scope.appointment_close = function () {
        $rootScope.$broadcast("hide", "show_appointment");
    };
});