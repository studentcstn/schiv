schiv_module.controller('index_controller', function($scope, $http, $rootScope) {

    $scope.$on("show_index", function () {
        if (user.type === "Docent") {
            $rootScope.$broadcast("show", "show_index_docent");
            appointment_request.getAppointments($http, $rootScope, "index_appointment_s", "index_appointment_f");
        } else {

        }
    });

    var student = function () {
        $rootScope.$broadcast("hide", "show_index_docent");
        docent.getDocentList($http, $rootScope, "index_docents_s", "index_docents_f");
        appointment_request.getAppointments($http, $rootScope, "index_appointment_s", "index_appointment_f");
    };
    $scope.$on("index_docents_s", function (event, data) {

    });
    $scope.$on("index_docents_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });
    $scope.$on("index_appointment_s", function (event, data) {

    });
    $scope.$on("index_appointment_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });



});
