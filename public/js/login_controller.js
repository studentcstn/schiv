schiv_module.controller('login_controller', function($scope, $http, $rootScope){
    $scope.user = {
        email: "max.musterman@hof-university.de", //todo remove
        password: "clearTextPassword",
        passwordRepeat: "clearTextPassword"
    };

    $scope.login = function(){

        $http.post('/login', {}, {
            headers: {"Authorization": "Basic " + window.btoa($scope.user.email + ":" + $scope.user.password)}
        }).then(function(response){
                console.log(response);
                switch (response.status) {
                    case 200:
                        $rootScope.$broadcast("login_success");
                        user_id = {"Authorization": "Basic " + window.btoa($scope.user.email + ":" + $scope.user.password)};
                        break;
                    default:
                        $rootScope.$broadcast("alert", "danger", "Email or password wrong.");
                }
        	}, function(response){
                console.log(response);
                $rootScope.$broadcast("alert", "info", "No connection to server.");
                $rootScope.$broadcast('login_success');
            });
    };

    $scope.register = function(){
        $http.post('/register',{"email": $scope.user.email, "password": $scope.user.password, "password_repeat": $scope.user.passwordRepeat})
            .then(function(response){
                console.log(response);
            }, function(response){
                console.log(response);
            });
    };

    $scope.confirmRegistration = function($scope, $http){
        //	$http.put('/register',[token]).
        //	then(function(response){
        //	success
        //	}, function(response){
        //		failed
        //		};
    };
});





