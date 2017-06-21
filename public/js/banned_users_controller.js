schiv_module.controller('banned_users_controller', function($scope, $http){
	$scope.getBannedUsers = function(){
			$http.get('/' + docent_id + '/banned_users').
			then(function(response){
				$scope.list = respose.data;
			}, function(response){
				});
	}
	
	$scope.banUser = function(){
			$http.post('/' + docent_id + '/banned_user', {"user_is": $scope.user_id, 
								"account_banned_id": $scope.account_banned_id, "banned_until": $scope.banned_until}).
			then(function(response){
			//success
			}, function(response){
				});
	}
	
	$scope.unbanUser = function(){
			$http.delete('/' + docent_id + '/banned_users/' + user_id + '').
			then(function(response){
			//success
			}, function(response){
				});
	}
});