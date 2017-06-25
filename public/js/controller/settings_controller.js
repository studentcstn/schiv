schiv_module.controller('settings_controller', function($scope, $http, $rootScope){
    $scope.settings = {
        email: "[a-z]+[.][a-z]+[0-9]*"
    };

    $scope.$on("show_settings", function () {
        setting();
    });

    var setting = function () {
        $scope.type = "Student";
        settings.getSettings($http, $rootScope, "settings_settings_s", "settings_settings_f");
        if (user.type == "Docent") {
            $scope.type = "Docent";
            ban.getAccountBans($http, $rootScope, "settings_ban_s", "settings_ban_f");
        }
    };
    $scope.$on("settings_settings_s", function (event, data) {
        $scope.user_settings = user;
        $scope.newUser_settings = data;
        $scope.newUser_settings.password = "";
        $scope.newUser_settings.passwordRepeat = "";
    });
    $scope.$on("settings_settings_f", function (event, data) {
        error(data);
    });
    $scope.$on("settings_ban_s", function (event, data) {
        $scope.ban = data;
    });
    $scope.$on("settings_ban_s", function (event, data) {
        error(data);
    });


    $scope.save = function () {
        settings.saveSettings($http, $rootScope, "settings_save_s", "settings_save_f", $scope.newUser_settings.email, $scope.newUser_settings.password, $scope.newUser_settings.faculties);
    };
    $scope.$on("settings_save_s", function (event, data) {
        $rootScope.$broadcast("alert", "success", "Changes saved.")
        setting();
    });
    $scope.$on("settings_save_f", function (event, data) {
        error(data);
    });


    var error = function (data) {
        $rootScope.$broadcast("error", data);
    }
});