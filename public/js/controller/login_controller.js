schiv_module.controller('login_controller', function($scope, $http, $rootScope){
    $scope.user = {
        email: "",
        password: "",
        passwordRepeat: ""
    };


    $scope.back = function () {
        $rootScope.$broadcast("show", "show_login_login", "show_login_password", "show_login_forgotPassword");
        $rootScope.$broadcast("hide", "show_login_register", "show_login_back", "show_login_send");
    };
    $scope.register_btn = function () {
        $rootScope.$broadcast("show", "show_login_password", "show_login_register", "show_login_back");
        $rootScope.$broadcast("hide", "show_login_login", "show_login_send");
    };
    $scope.forgotPassword = function () {
        $rootScope.$broadcast("show", "show_login_back", "show_login_send");
        $rootScope.$broadcast("hide", "show_login_login", "show_login_register", "show_login_forgotPassword", "show_login_password");
    };



    $scope.login = function () {
        login.login($http, $rootScope, 'login_login_s', 'login_login_f', $scope.user.email, $scope.user.password);
    };
    $scope.$on('login_login_s', function (event, data) {
        user = data.account;
        $scope.user.email = "";
        $scope.user.password = "";
        $scope.user.passwordRepeat = "";
        $scope.back();
        $rootScope.$broadcast("alert", "success", languages.login.welcome_start[language] + " " + user.name + " " + user.last + " " + languages.login.welcome_end[language]);
        $rootScope.$broadcast("login_success");
    });
    $scope.$on('login_login_f', function (event, data) {
        switch (data.status) {
            case 401:
                $rootScope.$broadcast("alert", "warning", languages.login.wrong_password_or_email[language]);
                break;
            default:
                error(data);
        }
    });


    $scope.register = function () {
        login.register($http, $rootScope, "login_register_s", "login_register_f", $scope.user.email, $scope.user.password, $scope.user.passwordRepeat)
    };
    $scope.$on("login_register_s", function (event, data) {
        $rootScope.$broadcast("alert", "success", languages.login.successful_registration[language]);
    });
    $scope.$on("login_register_f", function (event, data) {
        error(data);
    });


    $scope.send = function () {
        login.forgotPassword($http, $rootScope, "login_forgot_s", "login_forgot_f", $scope.user.email);
    };
    $scope.$on("login_forgot_s", function (event, data) {
        $rootScope.$broadcast("alert", "success", languages.login.send_forgot_password[language]);
    });
    $scope.$on("login_forgot_f", function (event, data) {
        error(data);
    });



    $scope.$on('log_out', function () {
        login.logout($http, $rootScope, "login_logout_s", "login_logout_f");
        $scope.user = {
            email: "",
            password: "",
            passwordRepeat: ""
        };
    });
    $scope.$on("login_logout_s", function (event, data) {
        $rootScope.$broadcast("alert", "success", languages.login.logout_message[language]);
        $rootScope.$broadcast("logout_success");
    });
    $scope.$on("login_logout_f", function (event, data) {
        error(data);
    });



    var registration = function (token) {
        login.confirmRegistration($http, $rootScope, "login_registration_s", "login_registration_f", token);
    };
    $scope.$on("login_registration_s", function (event, data) {
        $rootScope.$broadcast("alert", "success", languages.login.successful_activation[language]);
    });
    $scope.$on("login_registration_f", function (event, data) {
        error(data);
    });


    if (window.location.href.match(".*?token=.*")) {
        var token = window.location.href;
        token = token.substring(token.indexOf("token=")+6);
        registration(token);
        window.history.pushState(null, null, "/");
    }

    var error = function (data) {
        $rootScope.$broadcast("error", data);
    }
});





