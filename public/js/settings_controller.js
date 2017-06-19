schiv_module.controller('settings_controller', function($scope, $http){
    $http.get('/'+ user_id +'/settings')
        .then(function(response){
            console.log("ok");
            $scope.user_settings = response.data;
            work($scope);
            }, function(response){
            $scope.user_settings = {"email":"max","account_faculties":[{"id":"3","name":"Wirtschaft"}],"faculties":[{"id":"1","name":"Informatik"},{"id":"2","name":"Ingenieur"},{"id":"3","name":"Wirtschaft"}]}
            work($scope);
        });
})

work = function ($scope) {
    var account_faculties = $scope.user_settings.account_faculties;
    var faculties = $scope.user_settings.faculties;
    for (var i = 0; i < faculties.length; ++i) {
        for (var j = 0; j < account_faculties.length; ++j) {
            if (faculties[i].id === account_faculties[j].id) {
                faculties[i].is_active = true;
                break;
            } else {
                faculties[i].is_active = false;
            }
        }
    }
}

schiv_module.controller('edit_settings_controller', function($scope, $http){
	//	$http.put('http://localhost/{user id}/settings', [fauclties, password, email]).
	//	then(function(response){
	//	success
	//	}, function(response){
	//		failed
	//		};
})