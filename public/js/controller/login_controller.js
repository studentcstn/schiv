schiv_module.controller('login_controller', function($scope, $http, $rootScope){
    $scope.user = {
        email: "max.musterman@hof-university.de", //todo remove
        password: "clearTextPassword",
        passwordRepeat: "clearTextPassword"
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
        $rootScope.$broadcast("alert", "success", "Welcome " + user.email + " to Schiv");
        $rootScope.$broadcast("login_success");
    });
    $scope.$on('login_login_f', function (event, data) {
        switch (data.status) {
            case 401:
                $rootScope.$broadcast("alert", "warning", "Email or password wrong");
                break;
            case 404:
                $rootScope.$broadcast("alert", "warning", "Connection problem to Server");
                break;
            default:
                $rootScope.$broadcast("alert", "info", "Error "+data.statusText);
        }
        $rootScope.$broadcast("login_login_s", {account: {email: "test.test@hof-university.de"}}); //todo remove
    });


    $scope.register = function () {
        login.register($http, $rootScope, "login_register_s", "login_register_f", $scope.user.email, $scope.user.password)
    };
    $scope.$on("login_register_s", function (event, data) {
        $rootScope.$broadcast("alert", "success", "Register complete. Pleas confirm email.");
    });
    $scope.$on("login_register_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });


    $scope.send = function () {
        login.forgotPassword($http, $rootScope, "login_forgot_s", "login_forgot_f", $scope.user.email);
    };
    $scope.$on("login_forgot_s", function (event, data) {
        $rootScope.$broadcast("alert", "success", "Request send. Pleas confirm email.");
    });
    $scope.$on("login_forgot_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });



    $scope.$on('log_out', function () {
        login.logout($http, $rootScope, "login_logout_s", "login_logout_f");
    });
    $scope.$on("login_logout_s", function (event, data) {
        $rootScope.$broadcast("alert", "success", "Successful logged out.");
        $rootScope.$broadcast("logout_success");
    });
    $scope.$on("login_logout_f", function (event, data) {
        $rootScope.$broadcast("alert", "warning", data.statusText);
    });
});





