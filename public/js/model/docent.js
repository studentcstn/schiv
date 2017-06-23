docent = {
		getDocentList: function($http){
		    $http.get('/docents')
	            .then(function(response) {
	                $scope.list = response.data;
	                console.log(response);
				}, function(response){
	                console.log(response);
	            });
		};
		
		getSingleDocent: function($http, docent_id){
		    $http.get('/docents/' + docent_id)
	            .then(function(response) {
	                $rootScope.$broadcast("show_inscribe", response.data);
	                console.log(response);
				}, function(response){
	                console.log(response);
	            });
		};
}