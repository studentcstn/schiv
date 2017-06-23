appointment = {
		getAppointments:  function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id){
			$http.get('/appointment', {
				headers:user_id
			}).then(function(response){
				console.log(response);
			$scope.fullList = response.data;
			}, function(response){
				console.log(response);
				});
		},
		
		getLastAppointments: function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id, count){
		    $http.get('/appointment/' + count, {
		        headers: user_id
		    }).then(function(response) {
		    		console.log(response);
		        $scope.list = response.data;
		        }, function(response){
		        	console.log(response);
	            });
		},
		
		getAppointmentsFromTo: function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id, from, to){
			$http.get('/' + user_id + '/appointment/' + from + '/' + to +'').
			then(function(response){
				console.log(response);
			$scope.list = response.data;
			}, function(response){
				console.log(response);
				});
		},
		
		createAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id){
			$http.post('/' + docent_id + '/appointment', 
					{"day": $scope.day,"time_from": $scope.time_from, "time_to": $scope.time_to, "desription": $scope.description}).
			then(function(response){
				console.log(response);
			}, function(response){
				console.log(response);
				});
		},
		
		$scope.deleteAppointment = function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id, appointment_id){
			$http.delete('/' + docent_id + '/appointment/' + appointment_id + '').
			then(function(response){
				console.log(response);
			}, function(response){
				console.log(response);
				});
		}
}