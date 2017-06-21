schiv_module.controller("navigation_controller", function ($scope, $http, $timeout, $rootScope) {
    $scope.show_login = true;
    $scope.show_login_btn = true;

    $scope.show_element = function (id) {
        $scope[id] = true;
    };

    $scope.show_elements = function (...ids) {
        for (i = 0; i < ids.length; ++i)
            $scope.show_element(ids[i]);
    };

    $scope.toggle_element = function (id) {
        $scope[id] = !$scope[id];
    };

    $scope.hide_element = function (id) {
        $scope[id] = false;
    };

    $scope.hide_elements = function (...ids) {
        for (i = 0; i < ids.length; ++i)
            $scope.hide_element(ids[i]);
    };

    $scope.$on("login_success", function () {
        $scope.show_elements('show_index', 'show_nav');
        $scope.hide_elements('show_login');
    });

    $scope.$on("inscribe", function () {
        $scope.show_elements('show_appointment_inscribe');
    });
    $scope.$on("inscribe_close", function () {
        $scope.hide_elements('show_appointment_inscribe');
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
            $scope.show_element('alert_info');
            $scope.alerts.infotime = $timeout(function () {
                $scope.hide_element('alert_info');
            }, time);
        },
        infoClose: function () {
            $timeout.cancel($scope.alerts.infotime);
            $scope.alerts.infotime = null;
            $scope.hide_element('alert_info');
        },
        success: function (message) {
            if ($scope.alerts.successtime != null)
                $scope.alerts.successClose();
            $scope.alerts.messages.successMessage = message;
            $scope.show_element('alert_success');
            $scope.alerts.successtime = $timeout(function () {
                $scope.hide_element('alert_success');
            }, time);
        },
        successClose: function () {
            $timeout.cancel($scope.alerts.successtime);
            $scope.alerts.successtime = null;
            $scope.hide_element('alert_success');
        },
        warning: function (message) {
            if ($scope.alerts.warningtime != null)
                $scope.alerts.warningClose();
            $scope.alerts.messages.warningMessage = message;
            $scope.show_element('alert_warning');
            $scope.alerts.warningtime = $timeout(function () {
                $scope.hide_element('alert_warning');
            }, time);
        },
        warningClose: function () {
            $timeout.cancel($scope.alerts.warningtime);
            $scope.alerts.dangertime = null;
            $scope.hide_element('alert_warning');
        },
        danger: function (message) {
            if ($scope.alerts.dangertime != null)
                $scope.alerts.dangerClose();
            $scope.alerts.messages.dangerMessage = message;
            $scope.show_element('alert_danger');
            $scope.alerts.dangertime = $timeout(function () {
                $scope.hide_element('alert_danger');
            }, time);
        },
        dangerClose: function () {
            $timeout.cancel($scope.alerts.dangertime);
            $scope.alerts.dangertime = null;
            $scope.hide_element('alert_danger');
        }
    };

    $scope.settings_button = function() {
        $scope.$broadcast("settings");
    };


});