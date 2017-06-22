schiv_module.controller('login_controller', function($scope, $http, $rootScope){
    $scope.user = {
        email: "max.musterman@hof-university.de", //todo remove
        password: "clearTextPassword",
        passwordRepeat: "clearTextPassword"
    };

    $scope.login = function () {
        response = "test";
        response = login.login($http, $scope.user.email, $scope.user.password);
        console.log("controler: "+response);
        if (response != null)
            console.log("controler: "+response.data);
    };
    /*
    $scope.login = function(){

        $http.post('/login', {email: $scope.user.email, password: $scope.user.password})
            .then(function(response){
                console.log(response);
                user_id = $scope.user.email;
                $rootScope.$broadcast("login_success", response.data);
                $rootScope.$broadcast("alert", "success", "Welcome " + user_id + " to Schiv");
        	}, function(response){
                console.log(response);
                switch (response.status) {
                    case 401:
                        $rootScope.$broadcast("alert", "danger", "Email or password wrong.");
                        break;
                    case 404:
                        $rootScope.$broadcast("alert", "info", "No connection to server.");
                        break;
                    default:
                        $rootScope.$broadcast("alert", "danger", "Some error.");
                }
                user_id = $scope.user.email; //todo remove
                $rootScope.$broadcast('login_success'); //todo remove
            });
    };
    */

    $scope.register = function(){
        $http.post('/register',{"email": $scope.user.email, "password": $scope.user.password, "password_repeat": $scope.user.passwordRepeat})
            .then(function(response){
                console.log(response);
            }, function(response){
                console.log(response);
            });
    };

    $scope.confirmRegistration = function(){
        //	$http.put('/register',[token])
        //	.then(function(response){
        //	success
        //	}, function(response){
        //		failed
        //		};
    };

    $scope.logOut = function () {
        $http.post('/logout', {})
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast("log_out_success");
                $rootScope.$broadcast("alert", "success", "log out");
            }, function(response){
                console.log(response);
            });
    };

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





