schiv_module.controller('past_controller', function($scope, $http, $rootScope) {


    $scope.$on("show_past", function () {
        $scope.appointments = {};
        $scope.appointment_requests = {};
        if (user.type === "Docent") {
            docent();
        } else {
            student();
        }
    });


    var student = function () {
        appointment_request.getAppointmentRequestCount($http, $rootScope, "past_appointment_s", "past_appointment_f", 20);
    };
    $scope.$on("past_appointment_s", function (event, data) {
        $scope.appointments = data;
    });
    $scope.$on("past_appointment_s", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });


    var docent = function () {
        appointment.getLastAppointments($http, $rootScope, "past_appointment_docent_s", "past_appointment_docent_f", 20);
        appointment_request.getAppointmentRequestCount($http, $rootScope, "past_appointment_requests_s", "past_appointment_requests_f", 100);
    };
    $scope.$on("past_appointment_docent_s", function (event, data) {
        $scope.appointments = data;
        if (appointment_requests != {})
            appointment.merge_appointments($scope.appointments, $scope.appointment_requests);
    });
    $scope.$on("past_appointment_docent_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });
    $scope.$on("past_appointment_requests_s", function (event, data) {
        $scope.appointment_requests = data;
        if (appointments != {})
            appointment.merge_appointments($scope.appointments, $scope.appointment_requests);
    });
    $scope.$on("past_appointment_requests_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });
});