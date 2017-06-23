schiv_module.controller('index_controller', function($scope, $http, $rootScope) {

    $scope.$on("login_success", function () {
       show();
    });

    $scope.$on("show_index", function () {
        show();
    });

    var show = function () {
        if (user.type === "Docent") {
            index_docent();
        } else {
            index_student();
        }
    };

    var index_student = function () {
        $scope.type = "Student";
        $rootScope.$broadcast("hide", "show_index_docent");
        docent.getDocentList($http, $rootScope, "index_docents_s", "index_docents_f");
        appointment_request.getAppointmentRequest($http, $rootScope, "index_appointment_s", "index_appointment_f");
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


    var index_docent = function () {
        $scope.type = "Docent";
        $rootScope.$broadcast("show", "show_index_docent");
        appointment.getAppointments($http, $rootScope, "index_appointment_s", "index_appointment_f");
    };
    $scope.$on("index_appointment_s", function (event, data) {

    });
    $scope.$on("index_appointment_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });


    $scope.add = function () {

    };

    $scope.inscripe = function (id) {

    };
});
