schiv_module = angular.module('schiv', []);

user = {};

schiv_module.controller('app', function($scope, $http, $rootScope, $timeout) {

    $scope.lang = 'en';

    $scope.languages = languages;

    $scope.show_login = true;
    $scope.show_login_login = true;
    $scope.show_login_password = true;
    $scope.show_login_forgotPassword = true;

    var show_elements = function (ids) {
        for (i = 0; i < ids.length; ++i)
            $scope[ids[i]] = true;
    };
    $scope.$on("show", function (event, ...data) {
        show_elements(data);
    });

    var toggle_elements = function (ids) {
        for (i = 0; i < ids.length; ++i)
            $scope[ids[i]] = !$scope[ids[i]];
    };
    $scope.$on("toggle", function (event, ...data) {
        toggle_elements(data);
    });

    var hide_elements = function (ids) {
        for (i = 0; i < ids.length; ++i)
            $scope[ids[i]] = false;
    };
    $scope.$on("hide", function (event, ...data) {
        hide_elements(data);
    });

    $scope.show = {
        index: function () {
            show_elements(['show_index']);
            hide_elements(['show_past', 'show_settings']);
            $rootScope.$broadcast("show_index");
        },
        past: function () {
            show_elements(['show_past']);
            hide_elements(['show_index', 'show_settings']);
            $rootScope.$broadcast("show_past");
        },
        settings: function () {
            show_elements(['show_settings']);
            hide_elements(['show_index', 'show_past']);
            $rootScope.$broadcast("show_settings");
        },
        logout: function () {
            $rootScope.$broadcast("log_out");
        }
    };


    $scope.$on("login_success", function () {
        show_elements(['show_index', 'show_nav']);
        hide_elements(['show_login', 'show_past', 'show_settings']);
    });
    $scope.$on("logout_success", function () {
        show_elements(['show_login']);
        hide_elements(['show_index', 'show_nav', "show_past", "show_settings"]);
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

    var time = 7000;
    var alertTime = {};

    var alertShow = function (name) {
        if (alertTime[name] != null)
            alertClose(name);
        show_elements([name]);
        alertTime[name] = $timeout(function () {
            hide_elements([name]);
        }, time);
    };
    var alertClose = function (name) {
        $timeout.cancel(alertTime[name]);
        alertTime[name] = null;
        hide_elements([name]);
    };


    $scope.$on("error", function (event, data) {
       switch (data.status) {
           case 401:
               $rootScope.$broadcast("logout_success");
               $rootScope.$broadcast("alert", "warning", data.statusText);
               //$scope.alerts.messages.warning = data.statusText;
               //alertShow("warning");
               break;
           default:
               $rootScope.$broadcast("alert", "danger", data.statusText);
               //$scope.alerts.messages.danger = data.statusText;
               //alertShow("danger");
       }
    });
});

/*
definition of broadcasts
------------------------

login_success
logout_success

show_index
show_past
show_settings

show_inscribe [data]
show_inscribe_close

show [...data]
hide [...data]
alert {info|success|warning|danger} [message]
 */