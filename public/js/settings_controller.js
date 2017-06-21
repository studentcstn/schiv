schiv_module.controller('settings_controller', function($scope, $http){
    $scope.settings = function() {
        $http.get('/' + user_id + '/settings')
            .then(function (response) {
                console.log(response.data);
                $scope.user_settings = response.data;
                $scope.work($scope);
            }, function (response) {
            });
    };
    
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
    };
    
    $scope.saveSettings = function($scope, $http){
    	//	$http.put('/'+ user_id +'/settings', [faculties, password, email]).
    	//	then(function(response){
    	//	success
    	//	}, function(response){
    	//		failed
    	//		};
    }
    
});