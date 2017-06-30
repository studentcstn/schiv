schiv_module.controller('ban_user_controller', function($scope, $http, $rootScope) {
	
	$scope.$on("ban_user", function(event, request){
		$scope.request = request;
		$scope.id = request.account_id;
		$rootScope.$broadcast("show", "show_ban_user");
	});

	$scope.ban_close = function(){
		$rootScope.$broadcast("hide","show_ban_user");
	};

	$scope.ban = function(){
		ban.banAccount($http, $rootScope, "ban_user_s", "ban_user_f", $scope.id);
	};
	
	$scope.$on("ban_user_s", function(){
		$rootScope.$broadcast("alert", "success", "succesfully banned user");
		$rootScope.$broadcast("hide","show_ban_user");
	});
	
	$scope.$on("ban_user_f", function(data){
		error(data);
	});

	var error = function(data){
		$rootScope.$broadcast("error", data);
	};
});
