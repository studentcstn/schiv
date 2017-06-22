schiv_module = angular.module('schiv', []);

user = {};

schiv_module.controller('app', function($scope, $http, $rootScope, $timeout) {

    var show_elements = function (...ids) {
        for (i = 0; i < ids.length; ++i)
            $scope[ids[i]] = true;
    };

    $scope.$on("show", function (event, ...data) {
        show_elements(data);
    });

    $scope.toggle_element = function (id) {
        $scope[id] = !$scope[id];
    };

    var hide_elements = function (...ids) {
        for (i = 0; i < ids.length; ++i)
            $scope[ids[i]] = false;
    };

    $scope.$on("hide", function (event, ...data) {
        hide_elements(data);
    });

    $scope.show = {
        index: function () {
            show_elements('show_index');
            hide_elements('show_past', 'show_settings');
            $rootScope.$broadcast("show_index");
        },
        past: function () {
            show_elements('show_past');
            hide_elements('show_index', 'show_settings');
            $rootScope.$broadcast("show_past");
        },
        settings: function () {
            show_elements('show_settings');
            hide_elements('show_index', 'show_past');
            $rootScope.$broadcast("show_settings");
        },
        login: function () {
            show_elements('show_login');
            hide_elements('show_index', 'show_past', 'show_settings', 'show_nav');
            $rootScope.$broadcast("");
        },
        logout: function () {
            $rootScope.$broadcast("log_out");
        }
    };


    $scope.$on("login_success", function () {
        show_elements('show_index', 'show_nav');
        hide_elements('show_login');
    });
    $scope.$on("log_out_success", function () {
        show_elements('show_login');
        hide_elements('show_index', 'show_nav');
    });



    $scope.$on("show_inscribe", function () {
        show_elements('show_appointment_inscribe');
    });
    $scope.$on("show_inscribe_close", function () {
        hide_elements('show_appointment_inscribe');
    });



    $scope.$on("alert", function (event, alertType, message) {
        var name = "alert_" + alertType;
        $scope.alerts.messages[name] = message;
        alertShow(name);
    });

    $scope.alertClose = function (alertType) {
        var name = "alert_" + alertType;
        alertClose(name);
    };

    $scope.alerts = { messages: {} };

    var time = 10000;
    var alertTime = {};

    var alertShow = function (name) {
        if (alertTime[name] != null)
            alertClose(name);
        show_elements(name);
        alertTime[name] = $timeout(function () {
            hide_elements(name);
        }, time);
    };
    var alertClose = function (name) {
        $timeout.cancel(alertTime[name]);
        alertTime[name] = null;
        hide_elements(name);
    };
});

/*
definition of broadcasts
------------------------

login_success
log_out_success
log_out

show_login
show_register

show_index
show_past
show_settings

show_inscribe [data]
show_inscribe_close

alert {info|success|warning|danger} {message}
 */