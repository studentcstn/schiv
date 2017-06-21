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

    var time = 5000;

    $scope.alerts = {
        messages: {
            infoMessage: "",
            successMessage: "",
            warningMessage: "",
            dangerMessage: ""
        },
        info: function (message) {
            $scope.alerts.messages.infoMessage = message;
            $scope.show_element('alert_info');
            $scope.alerts.infotime = $timeout(function () {
                $scope.hide_element('alert_info');
            }, time);
        },
        infoClose: function () {
            $timeout.cancel($scope.alerts.infotime);
            $scope.hide_element('alert_info');
        },
        success: function (message) {
            $scope.alerts.messages.successMessage = message;
            $scope.show_element('alert_success');
            $scope.alerts.successtime = $timeout(function () {
                $scope.hide_element('alert_success');
            }, time);
        },
        successClose: function () {
            $timeout.cancel($scope.alerts.successtime);
            $scope.hide_element('alert_success');
        },
        warning: function (message) {
            $scope.alerts.messages.warningMessage = message;
            $scope.show_element('alert_warning');
            $scope.alerts.warningtime = $timeout(function () {
                $scope.hide_element('alert_warning');
            }, time);
        },
        warningClose: function () {
            $timeout.cancel($scope.alerts.warningtime);
            $scope.hide_element('alert_warning');
        },
        danger: function (message) {
            $scope.alerts.messages.dangerMessage = message;
            $scope.show_element('alert_danger');
            $scope.alerts.dangertime = $timeout(function () {
                $scope.hide_element('alert_danger');
            }, time);
        },
        dangerClose: function () {
            $timeout.cancel($scope.alerts.dangertime);
            $scope.hide_element('alert_danger');
        }
    };

    $scope.settings_button = function() {
        $scope.$broadcast("settings");
    };


});