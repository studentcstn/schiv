schiv_module.controller('appointment_controller', function($scope, $http){
	$scope.getAppointments =  function($scope, $http){
		//	$http.get('/' + user_id + '/appointment').
		//	then(function(response){
		//	success
		//	}, function(response){
		//		failed
		//		};
	}
	
	$scope.getLastAppointments = function($scope, $http){
		//	$http.get('/' + user_id '/appointment/' + count + '').
		//	then(function(response){
		//	success
		//	}, function(response){
		//		failed
		//		};
	}

	$scope.getAppointmentsFromTo = function($scope, $http){
		//	$http.get('/' + user_id + '/appointment/' + from + '/' + to +'').
		//	then(function(response){
		//	success
		//	}, function(response){
		//		failed
		//		};
	}
	
	$scope.createAppointment = function($scope, $http){
		//	$http.post('/' + docent_id + '/appointment', [day, time_from, time_to, description]).
		//	then(function(response){
		//	success
		//	}, function(response){
		//		failed
		//		};
	}

	$scope.deleteAppointment = function($scope, $http){
		//	$http.delete('/' + docent_id + '/appointment/' + appointment_id + '').
		//	then(function(response){
		//	success
		//	}, function(response){
		//		failed
		//		};
	}
});