schiv_module.controller('index_controller', function($scope, $http, $rootScope) {

    $scope.$on("login_success", function () {
       show();
       settings.getSettings($http, $rootScope, "init_settings_s", "init_settings_f");
    });
    $scope.$on("init_settings_s", function (event, data) {
        $scope.fac = data.account_faculties;
        user.faculties = data.account_faculties;
    });
    $scope.$on("init_settings_f", function (event, data) {
       error(data);
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
        appointment_request.getAppointmentRequest($http, $rootScope, "index_student_appointment_request_s", "index_student_appointment_request_f");
    };
    $scope.$on("index_docents_s", function (event, data) {
        $scope.docents = data;
    });
    $scope.$on("index_docents_f", function (event, data) {
        error(data);
    });
    $scope.$on("index_student_appointment_request_s", function (event, data) {
        if (data.lenght == 0) {
            data = [{id: 0,
                description: languages.index.no_appointments[language]}];
        }
        $scope.appointments = data;
        $scope.appointments_show = data;
    });
    $scope.$on("index_student_appointment_request_f", function (event, data) {
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
        $scope.appointments = data;
        --receive;
        if (receive === 0)
            $scope.appointments_show = appointment.merge_appointments($scope.appointments, $scope.appointments_requests);
    });
    $scope.$on("index_appointment_f", function (event, data) {
        error(data);
    });
    $scope.$on("index_appointment_request_s", function (event, data) {
        $scope.appointments_requests = data;
        --receive;
        if (receive === 0)
            $scope.appointments_show = appointment.merge_appointments($scope.appointments, $scope.appointments_requests);
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



    $scope.removeRequest = function (type, id, data) {
        $rootScope.$broadcast("remove_appointment_request", type, id, data);
    };
    $scope.setRequest = function (id, state, time) {
        appointment_request.acceptAppointmentRequest($http, $rootScope, "decline_request_s", "decline_request_f", id, state, time);
        $rootScope.$broadcast("show_index");
    };
    $scope.$on("decline_request_s", function (event, data) {

    });
    $scope.$on("decline_request_f", function (event, data) {
        error(data);
    });

    $scope.activateRequest = function (id, data) {
        $rootScope.$broadcast("edit_appointment", id, data);
    };

    $scope.removeAppointment = function (id, data) {
        $rootScope.$broadcast("remove_appointment", id, data);
    };

    $scope.banUser = function(id){
        $rootScope.$broadcast("ban_user",id);
    };


    var error = function (data) {
        $rootScope.$broadcast("error", data);
    }




    $scope.docent_sort = function(docent_a, docent_b){
    	
        for(var i = 0; i< docent_a.value.faculties.length; ++i){
            for(var m = 0; m< user.faculties.length; ++m){
                if(docent_a[i].value.faculties.id == user[m].faculties.id)
                    docent_a.sort = true;
            }
        }
        for(var i = 0; i< docent_b.value.faculties.length; ++i){
            for(var m = 0; m< user.faculties.length; ++m){
                if(docent_b[i].value.faculties.id == user[m].faculties.id)
                    docent_b.sort = true;
            }
        }
        
        if(docent_a.sort == docent_b.sort){
        	return docent_a.value.email.localeCompare(docent_b.value.email);
        } else if(docent_a.sort && !docent_b.sort){
        	return -1
        }else{
        	return 1;
        }
    };

});
