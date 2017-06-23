docent = {
		getDocentList: function($http, $rootScope, broadcastSuccess, broadcastFailed){
		    $http.get('/docent')
	            .then(function(response) {
	                console.log(response);
	                $rootScope.$broadcast(broadcastSuccess, response.data);
				}, function(response){
	                console.log(response);
	                $rootScope.$broadcast(broadcastFailed, response);
	            });
		},
		
		getSingleDocent: function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id){
		    $http.get('/docent/' + docent_id)
	            .then(function(response) {
	                $rootScope.$broadcast(broadcastSuccess, response.data);
	                console.log(response);
				}, function(response){
	                console.log(response);
	                $rootScope.$broadcast(broadcastFailed, response);
	            });
		}
}