docent = {
		getDocentList: function($http, $rootScope, broadcastSuccess, broadcastFailed){
		    $http.get('/docents')
	            .then(function(response) {
	                console.log(response);
	                $rootScope.$broadcast(broadcastSuccess, response.data);
				}, function(response){
	                console.log(response);
	                $rootScope.$broadcast(broadcastFailed, response);
	            });
		},
		
		getSingleDocent: function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id){
		    $http.get('/docents/' + docent_id)
	            .then(function(response) {
	                $rootScope.$broadcast(broadcastSuccess, response.data);
	                console.log(response);
				}, function(response){
	                console.log(response);
	                $rootScope.$broadcast(broadcastFailed, response);
	            });
		}
}