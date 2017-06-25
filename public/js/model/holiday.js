holiday ={
		getHolidays: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to){
	        $http.get('/holidays/' + from + '/' + to +'')
            .then(function(response) {
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
		}

		createHolidays: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name){
			$http.post('/holidays', {"from:" from, "to": to, "name": name})
			.then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response);
			}, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
			});
		}
		
		editHoliday: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name, id){
			$http.put('/holidays', {"from": from, "to": to, "name": name, "id": id})
			.then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response);
			}, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
			});
		}
		
		deleteHoliday: function($http, $rootScope, broadcastSuccess, broadcastFailed, id){
			$http.put('/holidays/' + id +'')
			.then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response);
			}, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
			});
		}
}