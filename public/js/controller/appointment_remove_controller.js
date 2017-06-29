schiv_module.controller('remove_appointment_controller', function($scope, $http, $rootScope) {

    $scope.$on('remove_appointment', function (event, id, data) {
        $scope.id = id;
        for (var i = 0; i < data.length; ++i) {
            if (data[i].id == id) {
                $scope.appointment = data[i];
                break;
            }
        }
        $rootScope.$broadcast("show", "show_remove_appointment");
    });

    $scope.remove_close = function () {
        $rootScope.$broadcast("hide", "show_remove_appointment");
    };

    $scope.remove = function () {
        appointment.deleteAppointment($http, $rootScope, "remove_appointment_s", "remove_appointment_f", $scope.appointment);
    };
    $scope.$on("remove_appointment_s", function () {
        $rootScope.$broadcast("hide", "show_remove_appointment");
        $rootScope.$broadcast("alert", "success", "appointment deleted");
        $rootScope.$broadcast("show_index");
    });
    $scope.$on("remove_appointment_f", function (event, data) {
        error(data);
    });

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    };
});