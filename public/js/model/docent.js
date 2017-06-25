docent = {
		
	getDocentList: function($http, $rootScope, broadcastSuccess, broadcastFailed){
		connection.lock(function(){
			get_DocentList($http, $rootScope, broadcastSuccess, broadcastFailed);
		});
	},

	getSingleDocent: function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id){
		connection.lock(function(){
			get_SingleDocent($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id);
		});
	}
};

var get_DocentList = function($http, $rootScope, broadcastSuccess, broadcastFailed){
    $http.get('/docents')
        .then(function(response) {
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
		}, function(response){
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var get_SingleDocent = function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id){
    $http.get('/docents/' + docent_id)
        .then(function(response) {
            $rootScope.$broadcast(broadcastSuccess, response.data);
            console.log(response);
		}, function(response){
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};