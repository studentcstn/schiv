schiv_module.controller("navigation_controller", function ($scope, $http, $timeout) {
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

    $scope.settings = function() {
        $http.get('/' + user_id + '/settings')
            .then(function (response) {
                console.log(response.data);
                work(response.data);
      //          $scope.user_settings = response.data;
                $rootScope.$broadcast("user_settings", response.data);
            }, function (response) {
                console.log(response.data);
                $rootScope.$brodcast("user_settings", {
                    email: "max.muster"
                });
            });
    };

    work = function (user_settings) {
        var account_faculties = user_settings.account_faculties;
        var faculties = user_settings.faculties;
        for (var i = 0; i < faculties.length; ++i) {
            for (var j = 0; j < account_faculties.length; ++j) {
                if (faculties[i].id === account_faculties[j].id) {
                    faculties[i].is_active = true;
                    break;
                } else {
                    faculties[i].is_active = false;
                }
            }
        }
    };
});