schiv_module.controller('settings_controller', function($scope, $http, $rootScope){
    $scope.settings = {
        email: "[a-z]+[.][a-z]+[0-9]*",
        date: "[0123][0-9].[01][0-9].[0-9]{4}"
    };

    $scope.newHoliday = {description: "", time_from: "", time_to: ""};

    $scope.$on("show_settings", function () {
        $scope.newHoliday = {description: "", time_from: "", time_to: ""};
        setting();
    });

    var setting = function () {
        $scope.type = "Student";
        settings.getSettings($http, $rootScope, "settings_settings_s", "settings_settings_f");
        if (user.type == "Docent") {
            $scope.type = "Docent";
            ban.getAccountBans($http, $rootScope, "settings_ban_s", "settings_ban_f");
            var from = new Date;
            var to = new Date;
            to.setFullYear(from.getFullYear() + 1);
            from = from.getFullYear() + "-" + ((from.getMonth() + 1) < 10 ? "0"+(from.getMonth() + 1) : (from.getMonth() + 1)) + "-" + from.getDate();
            to = to.getFullYear()  + "-" + ((to.getMonth() + 1) < 10 ? "0"+(to.getMonth() + 1) : (to.getMonth() + 1)) + "-" + to.getDate();
            holiday.getHolidays($http, $rootScope, "holidays_get_s", "holidays_get_f", from, to);
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
    $scope.$on("settings_ban_f", function (event, data) {
        error(data);
    });
    $scope.$on("holidays_get_s", function (event, data) {
        $scope.holidays = data;
    });
    $scope.$on("holidays_get_f", function (event, data) {
        error(data);
    });

    var saved = 0;

    $scope.save = function () {
        ++saved;
        settings.saveSettings($http, $rootScope, "settings_save_s", "settings_save_f", $scope.newUser_settings.email, $scope.newUser_settings.password, $scope.newUser_settings.passwordRepeat, $scope.newUser_settings.faculties);
        if (user.type == "Docent") {
            ++saved;
            ban.unbanAccount($http, $rootScope, "settings_unbun_s", "settings_unbun_f", $scope.ban);

            if ($scope.newHoliday.description != "" && $scope.newHoliday.time_to != "" && $scope.newHoliday.time_from != "") {
                ++saved;
                holiday.createHolidays($http, $rootScope, "holiday_set_s", "holiday_set_f", $scope.newHoliday.description, $scope.newHoliday.time_from, $scope.newHoliday.time_to)
            }
        }
    };
    $scope.$on("settings_save_s", function () {
        --saved;
        if (saved == 0) {
            $rootScope.$broadcast("alert", "success", languages.settings.changes_saved[language]);
            setting();
        }
    });
    $scope.$on("settings_save_f", function (event, data) {
        error(data);
    });
    $scope.$on("settings_unbun_s", function () {
        --saved;
        if (saved == 0) {
            $rootScope.$broadcast("alert", "success", languages.settings.changes_saved[language]);
            setting();
        }
    });
    $scope.$on("settings_unbun_f", function (event, data) {
        error(data);
    });
    $scope.$on("holiday_set_s", function (event, data) {
       --saved;
        if (saved == 0) {
            $rootScope.$broadcast("alert", "success", languages.settings.changes_saved[language]);
            setting();
        }
    });
    $scope.$on("holiday_set_f", function (event, data) {
        error(data);
    });


    var error = function (data) {
        $rootScope.$broadcast("error", data);
    }
});