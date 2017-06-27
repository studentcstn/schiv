schiv_module.controller('remove_appointment_request_controller', function($scope, $http, $rootScope) {

    $scope.$on('remove_appointment_request', function (event, type, id, data) {
        $scope.id = id;
        $scope.appointment = data;
        $scope.type = type;
        $rootScope.$broadcast("show", "show_remove_appointment_request");
    });

    $scope.newAppointment_request = {id: "", data: "", subject: "", description: ""};

    $scope.remove_close = function () {
        $rootScope.$broadcast("hide", "show_remove_appointment_request");
        $scope.newAppointment_request = {id: "", data: "", subject: "", description: ""};
    };

    $scope.remove = function () {
        if ($scope.type = "Docent") {
            appointment_request.acceptAppointmentRequest($http, $rootScope, "remove_s", "remove_f", $scope.id, "Declined", 0);
        } else {
            appointment_request.declineAppointmentRequest($http, $rootScope, "remove_s", "remove_f", $scope.id);
        }
    };
    $scope.$on("remove_s", function () {
        $rootScope.$broadcast("hide", "show_remove_appointment_request");
        $rootScope.$broadcast("alert", "success", "request deleted");
        $rootScope.$broadcast("show_index");
    });
    $scope.$on("remove_f", function (event, data) {
        error(data);
    });

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    };
});