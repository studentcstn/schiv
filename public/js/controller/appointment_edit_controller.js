schiv_module.controller('appointment_edit_controller', function($scope, $http, $rootScope) {

    $scope.$on("edit_appointment", function (event, id, data) {
        $scope.appointment = data;
        $scope.id = id;
        appointment_request.prepareEditAppointment(data);
        $rootScope.$broadcast("show", "show_appointment_edit");
    });

    $scope.edit_close = function () {
        $rootScope.$broadcast("hide", "show_appointment_edit");
    };

    $scope.updateRequest = function () {
        appointment_request.acceptAppointmentRequest($http, $rootScope, "appointment_edit_s", "appointment_edit_f", $scope.id, "Accepted", $scope.durationTime);
    };
    $scope.$on("appointment_edit_s", function () {
        $rootScope.$broadcast("hide", "show_appointment_edit");
        $rootScope.$broadcast("alert", "success", "accepted success");
        $rootScope.$broadcast("show_index");
    });
    $scope.$on("appointment_edit_f", function (event, data) {
        error(data);
    });

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    }
});
