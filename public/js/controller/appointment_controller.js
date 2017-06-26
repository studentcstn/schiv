schiv_module.controller('appointment_controller', function($scope, $http, $rootScope) {
    $scope.appointment = {
        frequency: 0
    };
    $scope.appointment_build = {
        frequency: [
            {id: 0, name: "frequent"},
            {id: 1, name: "singular"}
            ],
        day: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        date: "(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[0-2])[.][0-9]{4}",
        time: "([0]?[0-9]|1[0-2])[:][0-5][0-9]"
    };

    $scope.newAppointment = {day: ""};

    $scope.appointment_close = function () {
        $rootScope.$broadcast("hide", "show_appointment");
        $scope.newAppointment = {day: ""};
    };

    $scope.create = function () {
        appointment.createAppointment($http, $rootScope, "create_s", "create_f", $scope.newAppointment.day, $scope.newAppointment.from, $scope.newAppointment.to, $scope.newAppointment.description)
    };
    $scope.$on("create_s", function (event, data) {

        $scope.newAppointment = {day: ""};
    });
    $scope.$on("create_f", function (event, data) {
        error(data)
    });

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    }
});