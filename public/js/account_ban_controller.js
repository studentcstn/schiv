schiv_module.controller('account_ban_controller', function($scope, $http){
	$scope.getAccountBans = function(){
			$http.get('/' + docent_id + '/account_ban').
			then(function(response){
				$scope.list = respose.data;
			}, function(response){
				});
	}
	
	$scope.banAccount = function(){
			$http.post('/' + docent_id + '/account_ban', {"user_is": $scope.user_id, 
								"account_ban_id": $scope.account_ban_id, "ban_until": $scope.ban_until}).
			then(function(response){
			//success
			}, function(response){
				});
	}
	
	$scope.unbanAccount = function(){
			$http.delete('/' + docent_id + '/account_ban/' + user_id + '').
			then(function(response){
			//success
			}, function(response){
				});
	}
});
