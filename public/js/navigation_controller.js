schiv_module.controller("navigation_controller", function ($scope, $http, $timeout, $rootScope) {
    $scope.show_login = true;
    $scope.show_login_btn = true;

    var show_elements = function (...ids) {
        for (i = 0; i < ids.length; ++i)
            $scope[ids[i]] = true;
    };

    $scope.toggle_element = function (id) {
        $scope[id] = !$scope[id];
    };

    var hide_elements = function (...ids) {
        for (i = 0; i < ids.length; ++i)
            $scope[ids[i]] = false;
    };

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

    $scope.$on("show_register", function () {
        show_elements('show_register');
        hide_elements('show_login_btn');
    });
    $scope.$on("show_login", function () {
        show_elements('show_login_btn');
        hide_elements('show_register');
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