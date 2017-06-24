schiv_module.controller('past_controller', function($scope, $http, $rootScope) {


    $scope.$on("show_past", function () {
        if (user.type === "Docent") {
            docent();
        } else {
            student();
        }
    });


    var student = function () {
        appointment_request.getAppointmentRequestCount($http, $rootScope, "past_appointment_s", "past_appointment_f", 20);
    };
    var docent = function () {
        appointment.getLastAppointments($http, $rootScope, "past_appointment_s", "past_appointment_f");
    };
    $scope.$on("past_appointment_s", function (event, data) {
        $scope.appointments = data;
    });
    $scope.$on("past_appointment_s", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });

});