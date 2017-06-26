schiv_module.controller('appointment_edit_controller', function($scope, $http, $rootScope) {

    $scope.$on("edit_appointment", function (event, data) {
        $scope.appointment = data;

        $rootScope.$broadcast("show", "show_appointment_edit");
    });
});
