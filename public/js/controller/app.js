schiv_module = angular.module('schiv', ['ngCookies']);

user = {};
language = 'en';

schiv_module.controller('app', function($scope, $http, $rootScope, $timeout, $cookies, $cookieStore) {

    $scope.lang = 'en';

    $scope.setLang = function (data) {
        if (data == undefined || !data.match("(en|de)"))
            data = 'en';
        $scope.lang = data;
        language = data;
        $cookieStore.put("lang", data);
        $rootScope.$broadcast("lang_changed");
    };

    $scope.setLang($cookieStore.get("lang"));


    $scope.languages = languages;

    $scope.show_login = true;
    $scope.show_login_login = true;
    $scope.show_login_password = true;
    $scope.show_login_forgotPassword = true;
    $scope.show_lang = true;

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
            $rootScope.$broadcast("hide", "show_appointment_request", "show_appointment", "show_appointment_edit", "show_remove_appointment_request", "show_remove_appointment", "show_ban_user");
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
               break;
           default:
               $rootScope.$broadcast("alert", "danger", data.statusText);
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

show [...data]
hide [...data]
alert {info|success|warning|danger} [message]
 */

/*

definition of Error codes
-------------------------

1000 Error at Email 
1001 Choose at least one faculty Error (NOT IN USE)
1002 Password is empty Error (login)
1003 Password repeat Error
1004 Error in date
1005 Description empty Error
1006 Holiday empty name Error
1007 Illegal state Error (NOT IN USE)
1008 Illegal time Error
1009 Subject is empty Error
*/
