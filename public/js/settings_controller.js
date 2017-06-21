schiv_module.controller('settings_controller', function($scope, $http){
    $scope.on("user_settings", function (event, args) {
       $scope.user_settings = args;
    });
    
    $scope.saveSettings = function($scope, $http){
    	//	$http.put('/'+ user_id +'/settings', [faculties, password, email]).
    	//	then(function(response){
    	//	success
    	//	}, function(response){
    	//		failed
    	//		};
    }
    
});