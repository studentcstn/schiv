schiv_module.controller('appointment_controller', function($scope, $http, $rootScope) {
    $scope.appointment = {
        frequency: 0
    };
    $scope.appointment_build = {
        frequency: [
            {id: 0, name: languages.appointment.frequent[language]},
            {id: 1, name: languages.appointment.singular[language]}
            ],
        day: [
            {id: "MON", name: languages.days.monday[language]},
            {id: "TUE", name: languages.days.tuesday[language]},
            {id: "WED", name: languages.days.wednesday[language]},
            {id: "THU", name: languages.days.thursday[language]},
            {id: "FRI", name: languages.days.friday[language]},
            {id: "SAT", name: languages.days.saturday[language]},
            {id: "SUN", name: languages.days.sunday[language]}
            ],
        date: "((0?[1-9]|[12][0-9]|3[01])[.](0?[13578]|1[02])|(0?[1-9]|[12][0-9]|3[0])[.](0?[469]|11)|([01]?[1-9]|2[0-9])[.](0?[2]))[.]([0-9]{2}|[0-9]{4})",
        time: "([01]?[0-9]|2[0-3])[:][0-5][0-9]"
    };

    $scope.$on("lang_changed", function () {
        $scope.appointment_build.frequency = [
            {id: 0, name: languages.appointment.frequent[language]},
            {id: 1, name: languages.appointment.singular[language]}
        ];
        $scope.appointment_build.day = [
            {id: "MON", name: languages.days.monday[language]},
            {id: "TUE", name: languages.days.tuesday[language]},
            {id: "WED", name: languages.days.wednesday[language]},
            {id: "THU", name: languages.days.thursday[language]},
            {id: "FRI", name: languages.days.friday[language]},
            {id: "SAT", name: languages.days.saturday[language]},
            {id: "SUN", name: languages.days.sunday[language]}
        ];
    });

    $scope.newAppointment = {day: "", to: "", from: "", description: ""};

    $scope.appointment_close = function () {
        $rootScope.$broadcast("hide", "show_appointment");
        $scope.newAppointment = {day: "", to: "", from: "", description: ""};
    };

    $scope.create = function () {
        appointment.createAppointment($http, $rootScope, "create_s", "create_f", $scope.newAppointment.day, $scope.newAppointment.from, $scope.newAppointment.to, $scope.newAppointment.description)
    };
    $scope.$on("create_s", function () {
        $rootScope.$broadcast("alert", "success", languages.appointment.appointment_created[language]);
        $scope.appointment_close();
        $scope.newAppointment = {day: "", to: "", from: "", description: ""};
        $rootScope.$broadcast("show_index");
    });
    $scope.$on("create_f", function (event, data) {
        error(data)
    });

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    }
});
