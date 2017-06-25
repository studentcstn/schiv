schiv_module.controller('index_controller', function($scope, $http, $rootScope) {

    $scope.$on("login_success", function () {
       show();
    });

    $scope.$on("show_index", function () {
        show();
    });

    var show = function () {
        $scope.appintments = {};
        $scope.appointment_requests = {};
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
        $scope.docents = data;
    });
    $scope.$on("index_docents_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });
    $scope.$on("index_appointment_s", function (event, data) {
        console.log("student: " + data)
        if (data.lenght == 0) {
            data = [{id: 0,
                description: "Du hast momentan keine termine."}];
        }
        $scope.appintments = data;
    });
    $scope.$on("index_appointment_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });


    var index_docent = function () {
        $scope.type = "Docent";
        $rootScope.$broadcast("show", "show_index_docent");
        appointment.getAppointments($http, $rootScope, "index_appointment_s", "index_appointment_f");
        appointment_request.getAppointmentRequest($http, $rootScope, "index_appointment_request_s", "index_appointment_request_f");
    };
    $scope.$on("index_appointment_s", function (event, data) {
        $scope.appintments = data;
        if ($scope.appointment_requests != {})
            appointment.merge_appointment($scope.appointments, $scope.appointment_requests);
    });
    $scope.$on("index_appointment_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });
    $scope.$on("index_appointment_request_s", function (event, data) {
        $scope.appintments_requests = data;
        if ($scope.appointments != {})
            appointment.merge_appointment($scope.appointments, $scope.appointment_requests);
    });
    $scope.$on("index_appointment_request_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });



    $scope.getSingleDocent = function (id) {
        docent.getSingleDocent($http, $rootScope, "index_docent_s", "index_docent_f", id);
    };
    $scope.$on("index_docent_s", function (event, data) {
        $rootScope.$broadcast("show_inscribe", data);
    });
    $scope.$on("index_docent_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });


    $scope.toggle_element = function (id) {
        $rootScope.$broadcast("toggle", id);
    };


    $scope.addNewTermin = function () {
        $rootScope.$broadcast("show", "show_appointment");
    };

    $scope.search = function () {
        $rootScope.$broadcast("alert", "info", $scope.searchString);
    };
});
