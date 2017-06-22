schiv_module.controller('login_controller', function($scope, $http, $rootScope){
    $scope.show_login = true;
    $scope.show_login_login = true;
    $scope.show_login_forgotPassword = true;

    $scope.user = {
        email: "max.musterman@hof-university.de", //todo remove
        password: "clearTextPassword",
        passwordRepeat: "clearTextPassword"
    };


    $scope.login = function () {
        login.login($http, $rootScope, 'login_login_s', 'login_login_f', $scope.user.email, $scope.user.password);
    };
    $scope.$on('login_login_s', function (event, data) {
        user = data.data;
        $scope.user.email = "";
        $scope.user.password = "";
        $scope.user.passwordRepeat = "";
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
    });

    $scope.forgotPassword = function () {
        $rootScope.$broadcast("show", "show_login_back");
        $rootScope.$broadcast("hide", "show_login_login", "show_login_register");
    };

/*
    $scope.$on("show_register", function () {
        show_elements('show_register');
        hide_elements('show_login_btn');
    });
    $scope.$on("show_login", function () {
        show_elements('show_login_btn');
        hide_elements('show_register');
    });
    */

    $scope.$on('log_out', function () {
        logout.logout();
    });

    $scope.btn_register = function () {
        $rootScope.$broadcast('show_register');
    };
    $scope.btn_back = function () {
        $rootScope.$broadcast('show_login');
    };
});





