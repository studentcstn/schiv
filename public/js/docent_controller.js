schiv_module.controller('docent_controller', function($scope, $http) {

	$scope.$on('login_success', function () {
	    getDocentList();
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
	
	$scope.getSingleDocent = function(){
	    $http.get('/docents/' + docent_id + '')
            .then(function(response) {
                $scope.docent = response.data;
                console.log(response);
			}, function(response){
                console.log(response);
            });
	};
}
