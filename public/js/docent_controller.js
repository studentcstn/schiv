schiv_module.controller('docent_controller', function($scope, $http, $rootScope) {

	$scope.$on('login_success', function () {
	    $scope.getDocentList();
    });
	$scope.$on("show_index", function () {
	    $scope.getDocentList();
    });


	$scope.getDocentList = function(){
	    $http.get('/docents')
            .then(function(response) {
                $scope.list = response.data;
                console.log(response);
			}, function(response){
                console.log(response);
            });
	};
	
	$scope.getSingleDocent = function(docent_id){
	    $http.get('/docents/' + docent_id)
            .then(function(response) {
                $rootScope.$broadcast("show_inscribe", response.data);
                console.log(response);
			}, function(response){
                console.log(response);
            });
	};
});
