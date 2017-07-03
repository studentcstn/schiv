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
        $scope.type = "Student";
        appointment_request.getLastAppointmentRequest($http, $rootScope, "past_appointment_s", "past_appointment_f", 20);
    };
    $scope.$on("past_appointment_s", function (event, data) {
        $scope.appointments = data;
    });
    $scope.$on("past_appointment_f", function (event, data) {
        error(data);
    });

    var received = 0;

    var docent = function () {
        received += 2;
        $scope.type = "Docent";
        appointment.getLastAppointments($http, $rootScope, "past_appointment_docent_s", "past_appointment_docent_f");
        appointment_request.getLastAppointmentRequest($http, $rootScope, "past_appointment_requests_s", "past_appointment_requests_f");
    };
    $scope.$on("past_appointment_docent_s", function (event, data) {
        $scope.appointments = data;
        --received;
        if (received == 0)
            appointment.merge_appointments($scope.appointments, $scope.appointment_requests);
    });
    $scope.$on("past_appointment_docent_f", function (event, data) {
        --received;
        error(data);
    });
    $scope.$on("past_appointment_requests_s", function (event, data) {
        $scope.appointment_requests = data;
        --received;
        if (received == 0)
            appointment.merge_appointments($scope.appointments, $scope.appointment_requests);
    });
    $scope.$on("past_appointment_requests_f", function (event, data) {
        --received;
        error(data);
    });

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    }
});