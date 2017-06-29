schiv_module.controller('request_controller', function($scope, $http, $rootScope) {

    $scope.$on('show_inscribe', function (event, data) {
        $scope.dates = {};
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

    $scope.inscribeSetAppointment = function (item) {
        $scope.newAppointment_request.id = item.id;
        $scope.newAppointment_request.date = item.date;
        $scope.newAppointment_request.time_from = item.time_from;
        $scope.newAppointment_request.time_to = item.time_to;
        $scope.newAppointment_request.name = item.description;
        $scope.dates = item
    };

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    };
});