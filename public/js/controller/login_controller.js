schiv_module.controller('login_controller', function($scope, $http, $rootScope){
    $scope.user = {
        email: "max.musterman@hof-university.de", //todo remove
        password: "clearTextPassword",
        passwordRepeat: "clearTextPassword"
    };

    $scope.login = function () {
        login.login($http, $rootScope, 'login_login_s', 'login_login_f', $scope.user.email, $scope.user.password);
    };

    $scope.$on('login_login', function (event, data) {
        if (data == null) {

            return;
        }
        user = data.data;
    });

    $scope.$on('log_out', function () {
        $scope.logOut();
    });

    $scope.btn_register = function () {
        $rootScope.$broadcast('show_register');
    };
    $scope.btn_back = function () {
        $rootScope.$broadcast('show_login');
    };
});





