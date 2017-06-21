schiv_module.controller('login_controller', function($scope, $http){
    $scope.user = {
        email: "max.musterman@hof-university.de", //todo remove
        password: "clearTextPassword",
        passwordRepeat: ""
    };

    $scope.login = function(){
        $http({
            method: 'POST',
            url: '/login',
            headers: {"Authorization": "Basic " + window.btoa($scope.user.email + ":" + $scope.user.password)}
            })
            .then(function(response){
                console.log(response);
                show_elements('show_index', 'show_nav');
                hide_element('show_login');
        	}, function(response){
                console.log(response);
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





