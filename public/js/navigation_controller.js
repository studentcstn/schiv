schiv_module.controller("navigation_controller", function ($scope, $http, $timeout, $rootScope) {
    $scope.show_login = true;
    $scope.show_login_btn = true;

    show_elements = function (...ids) {
        for (i = 0; i < ids.length; ++i)
            $scope[ids[i]] = true;
    };

    $scope.toggle_element = function (id) {
        $scope[id] = !$scope[id];
    };

    hide_elements = function (...ids) {
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



    var time = 10000;

    $scope.$on("alert", function (event, alertType, message) {
        $scope.alerts[alertType](message);
    });

    $scope.alerts = {
        messages: {
            infoMessage: "",
            successMessage: "",
            warningMessage: "",
            dangerMessage: ""
        },
        info: function (message) {
            if ($scope.alerts.infotime != null)
                $scope.alerts.infoClose();
            $scope.alerts.messages.infoMessage = message;
            show_elements('alert_info');
            $scope.alerts.infotime = $timeout(function () {
                hide_elements('alert_info');
            }, time);
        },
        infoClose: function () {
            $timeout.cancel($scope.alerts.infotime);
            $scope.alerts.infotime = null;
            hide_elements('alert_info');
        },
        success: function (message) {
            if ($scope.alerts.successtime != null)
                $scope.alerts.successClose();
            $scope.alerts.messages.successMessage = message;
            show_elements('alert_success');
            $scope.alerts.successtime = $timeout(function () {
                hide_elements('alert_success');
            }, time);
        },
        successClose: function () {
            $timeout.cancel($scope.alerts.successtime);
            $scope.alerts.successtime = null;
            hide_elements('alert_success');
        },
        warning: function (message) {
            if ($scope.alerts.warningtime != null)
                $scope.alerts.warningClose();
            $scope.alerts.messages.warningMessage = message;
            show_elements('alert_warning');
            $scope.alerts.warningtime = $timeout(function () {
                hide_elements('alert_warning');
            }, time);
        },
        warningClose: function () {
            $timeout.cancel($scope.alerts.warningtime);
            $scope.alerts.dangertime = null;
            hide_elements('alert_warning');
        },
        danger: function (message) {
            if ($scope.alerts.dangertime != null)
                $scope.alerts.dangerClose();
            $scope.alerts.messages.dangerMessage = message;
            show_elements('alert_danger');
            $scope.alerts.dangertime = $timeout(function () {
                hide_elements('alert_danger');
            }, time);
        },
        dangerClose: function () {
            $timeout.cancel($scope.alerts.dangertime);
            $scope.alerts.dangertime = null;
            hide_elements('alert_danger');
        }
    };

    $scope.settings_button = function() {
        $scope.$broadcast("settings");
    };


});