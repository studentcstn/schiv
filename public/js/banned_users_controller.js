schiv_module.controller('banned_users_controller', function($scope, $http){
	$scope.getBannedUsers = function($scope, $http){
			$http.get('/' + docent_id + '/banned_users').
			then(function(response){
				$scope.list = respose.data;
			}, function(response){
				};
	}
	
	$scope.banUser = function($scope, $http){
			$http.post('/' + docent_id + '/banned_user', [$scope.user_id, 
								$scope.user_banned_id, $scope.banned_until]).
			then(function(response){
			//success
			}, function(response){
				};
	}
	
	$scope.unbanUser = function($scope, $http){
			$http.delete('/' + docent_id + '/banned_users/' + user_id + '').
			then(function(response){
			//success
			}, function(response){
				};
	}
});