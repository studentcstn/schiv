schiv_module.controller('settings_controller', function($scope, $http){
    $http.get('/'+ user_id +'/settings').
        then(function(response){
            console.log("ok");
            $scope.user_settings = response.data;
            }, function(response){
            console.log(response.data);
            $scope.user_settings = {"email":"max","account_faculties":[{"id":"3","name":"Wirtschaft"}],"faculties":[{"id":"1","name":"Informatik"},{"id":"2","name":"Ingenieur"},{"id":"3","name":"Wirtschaft"}]}
        });
})

schiv_module.controller('edit_settings_controller', function($scope, $http){
	//	$http.put('http://localhost/{user id}/settings', [fauclties, password, email]).
	//	then(function(response){
	//	success
	//	}, function(response){
	//		failed
	//		};
})
