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

    $scope.newAppointment = {day: ""};

    $scope.appointment_close = function () {
        $rootScope.$broadcast("hide", "show_appointment");
        $scope.newAppointment = {};
    };

    $scope.create = function () {
        appointment.createAppointment($http, $rootScope, "create_s", "create_f", $scope.newAppointment.day, $scope.newAppointment.time_from, $scope.newAppointment.time_to, $rootScope.newAppointment.description)
    };
    $scope.$on("create_s", function (event, data) {

    });
    $scope.$on("create_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });
});