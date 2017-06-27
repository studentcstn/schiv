schiv_module.controller('remove_appointment_controller', function($scope, $http, $rootScope) {

    $scope.$on('remove_appointment', function (event, id, data) {
        $scope.id = id;
        $scope.appointments = data;
        $rootScope.$broadcast("show", "show_remove_appointment");
    });

    $scope.remove_close = function () {
        $rootScope.$broadcast("hide", "show_remove_appointment");
    };

    $scope.remove = function () {
        appointment.deleteAppointment($http, $rootScope, "remove_appointment_s", "remove_appointment_f", $scope.id);
    };
    $scope.$on("remove_appointment_s", function () {
        $rootScope.$broadcast("hide", "show_remove_appointment");
        $rootScope.$broadcast("show_index");
    });
    $scope.$on("remove_appointment_s", function (event, data) {
        error(data);
    });

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    };
});