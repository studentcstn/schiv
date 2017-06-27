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
        $scope.docents = data;
    });
    $scope.$on("index_docents_f", function (event, data) {
        error(data);
    });
    $scope.$on("index_appointment_s", function (event, data) {
        if (data.lenght == 0) {
            data = [{id: 0,
                description: languages.index.no_appointments[language]}];
        }
        $scope.appintments = data;
    });
    $scope.$on("index_appointment_f", function (event, data) {
        error(data);
    });


    var receive = 0;

    var index_docent = function () {
        receive += 2;
        $scope.type = "Docent";
        $rootScope.$broadcast("show", "show_index_docent");
        appointment.getAppointments($http, $rootScope, "index_appointment_s", "index_appointment_f");
        appointment_request.getAppointmentRequest($http, $rootScope, "index_appointment_request_s", "index_appointment_request_f");
    };
    $scope.$on("index_appointment_s", function (event, data) {
        $scope.appintments = data;
        --receive;
        if (receive === 0)
            appointment.merge_appointments($scope.appintments, $scope.appointments_requests);
    });
    $scope.$on("index_appointment_f", function (event, data) {
        error(data);
    });
    $scope.$on("index_appointment_request_s", function (event, data) {
        $scope.appointments_requests = data;
        --receive;
        if (receive === 0)
            appointment.merge_appointments($scope.appintments, $scope.appointments_requests);
    });
    $scope.$on("index_appointment_request_f", function (event, data) {
        error(data);
    });



    $scope.getSingleDocent = function (id) {
        docent.getSingleDocent($http, $rootScope, "index_docent_s", "index_docent_f", id);
    };
    $scope.$on("index_docent_s", function (event, data) {
        $rootScope.$broadcast("show_inscribe", data);
    });
    $scope.$on("index_docent_f", function (event, data) {
        error(data);
    });


    $scope.toggle_element = function (id) {
        $rootScope.$broadcast("toggle", id);
    };


    $scope.addNewTermin = function () {
        $rootScope.$broadcast("show", "show_appointment");
    };

    $scope.search = function () {
        docent.search($scope.docents, $scope.searchString);
    };
    $scope.search_delete = function () {
        $scope.searchString = "";
        $scope.search();
    };



    $scope.removeRequest = function (id, data) {
        $rootScope.$broadcast("remove_appointment", id, data)
    };
    $scope.setRequest = function (id, state, time) {
        appointment_request.acceptAppointmentRequest(id, state, time)
    };

    $scope.activateRequest = function (id, data) {
        $rootScope.$broadcast("edit_appointment", id, data);
    };


    var error = function (data) {
        $rootScope.$broadcast("error", data);
    }
});
