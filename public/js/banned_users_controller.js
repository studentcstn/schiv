schiv_module.controller('banned_users_controller', function($scope, $http){
	$scope.getBannedUsers = function($scope, $http){
		//	$http.get('/' + docent_id + '/banned_users').
		//	then(function(response){
		//	success
		//	}, function(response){
		//		failed
		//		};
	}
	
	$scope.banUser = function($scope, $http){
		//	$http.post('/' + docent_id + '/banned_user', [id]).
		//	then(function(response){
		//	success
		//	}, function(response){
		//		failed
		//		};
	}
	
	$scope.unbanUser = function($scope, $http){
		//	$http.get('/' + docent_id + '/banned_users/' + user_id + '').
		//	then(function(response){
		//	success
		//	}, function(response){
		//		failed
		//		};
	}
});