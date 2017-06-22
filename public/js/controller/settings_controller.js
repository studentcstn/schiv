schiv_module.controller('settings_controller', function($scope, $http, $rootScope){
    $scope.$on("show_settings", function () {
        setting();
    });

    var setting = function () {
        settings.settings($http, $rootScope, "settings_settings_s", "settings_settings_f");
    };
    $scope.$on("settings_settings_s", function (event, data) {
        $scope.user_settings = data;
    });
    $scope.$on("settings_settings_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });


    $scope.save = function () {
        settings.save($http, $rootScope, "settings_save_s", "settings_save_f", $scope.user_settings);
    };
    $scope.$on("settings_save_s", function (event, data) {

    });
    $scope.$on("settings_save_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });
});