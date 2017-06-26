schiv_module.controller('appointment_edit_controller', function($scope, $http, $rootScope) {

    $scope.$on("edit_appointment", function (event, data) {
        $scope.appointment = data;

        $rootScope.$broadcast("show", "show_appointment_edit");
    });

    $scope.updateRequest = function () {
        appointment_request.acceptAppointmentRequest($http, $rootScope, "appointment_edit_s", "appointment_edit_f", $scope.appointment.requestID, "Accepted", $scope.durationTime);
    };
    $scope.$on("appointment_edit_s", function (event, data) {
        $rootScope.$broadcast("hide", "show_appointment_edit");
        $rootScope.$broadcast("show_index");
    });
    $scope.$on("appointment_edit_f", function (event, data) {
        error(data);
    });

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    }
});
