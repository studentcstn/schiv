schiv_module.controller('request_controller', function($scope, $http, $rootScope) {

    $scope.$on('show_inscribe', function (event, data) {
        $scope.docent = data;
        $scope.appointments = data.appointments;
        appointment.sort_appointment($scope.appointments);
        $rootScope.$broadcast("show", "show_appointment_request");
    });

    $scope.newAppointment_request = {id: "", data: "", subject: "", description: ""};

    $scope.inscribe_close = function () {
        $rootScope.$broadcast("hide", "show_appointment_request");
        $scope.newAppointment_request = {id: "", data: "", subject: "", description: ""};
    };

    $scope.inscribe = function () {
        appointment_request.createAppointmentRequest($http, $rootScope, "request_s", "request_f", $scope.newAppointment_request.description, $scope.newAppointment_request.subject, $scope.newAppointment_request.id, $scope.newAppointment_request.date);
    };
    $scope.$on("request_s", function (event, data) {

    });
    $scope.$on("request_f", function (event, data) {
        error(data);
    });

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    };
});