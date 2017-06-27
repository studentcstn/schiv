schiv_module.controller('remove_appointment_controller', function($scope, $http, $rootScope) {

    $scope.$on('remove_appointment', function (event, id, data) {
        $scope.id = id;
        $scope.appointment = data;
        $rootScope.$broadcast("show", "show_remove_appointment");
    });

    $scope.newAppointment_request = {id: "", data: "", subject: "", description: ""};

    $scope.remove_close = function () {
        $rootScope.$broadcast("hide", "show_remove_appointment");
        $scope.newAppointment_request = {id: "", data: "", subject: "", description: ""};
    };

    $scope.remove = function () {
        appointment_request.declineAppointmentRequest($http, $rootScope, "remove_s", "remove_f", $scope.id);
    };
    $scope.$on("remove_s", function () {
        $rootScope.$broadcast("hide", "show_remove_appointment");
    });
    $scope.$on("remove_f", function (event, data) {
        error(data);
    });

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    };
});