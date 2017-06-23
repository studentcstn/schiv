appointment = {
		getAppointments:  function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id){
			$http.get('/appointment', {
				headers:user_id
			}).then(function(response){
				console.log(response);
				$rootScope.$broadcast(broadcastSuccess, response.data);
			}, function(response){
				console.log(response);
				$rootScope.$broadcast(broadcastFailed, response);
				});
		},
		
		getLastAppointments: function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id, count){
		    $http.get('/appointment/' + count, {
		        headers: user_id
		    }).then(function(response) {
		    		console.log(response);
		    		$rootScope.$broadcast(broadcastSuccess, response.data);
		        }, function(response){
		        	console.log(response);
		        	$rootScope.$broadcast(broadcastFailed, response);
	            });
		},
		
		getAppointmentsFromTo: function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id, from, to){
			$http.get('/' + user_id + '/appointment/' + from + '/' + to +'').
			then(function(response){
				console.log(response);
				$rootScope.$broadcast(broadcastSuccess, response.data);
			}, function(response){
				console.log(response);
				$rootScope.$broadcast(broadcastFailed, response);
				});
		},
		
		createAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id, day, time_from, time_to, description){
			$http.post('/appointment', 
					{"day": day,"time_from": time_from, "time_to": time_to, "desription": description}).
			then(function(response){
				console.log(response);
				$rootScope.$broadcast(broadcastSuccess);
			}, function(response){
				console.log(response);
				$rootScope.$broadcast(broadcastFailed, response);
				});
		},
		
		$scope.deleteAppointment = function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id, appointment_id){
			$http.delete('/appointment/' + appointment_id + '').
			then(function(response){
				console.log(response);
				$rootScope.$broadcast(broadcastSuccess)
			}, function(response){
				console.log(response);
				$rootScope.$broadcast(broadcastFailed, response);
				});
		}
}