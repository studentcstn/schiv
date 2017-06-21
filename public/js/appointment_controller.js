schiv_module.controller('appointment_controller', function($scope, $http){
	$scope.getAppointments =  function(){
			$http.get('/appointment', 
				{headers:user_id}).
			then(function(response){
			$scope.fullList = response.data;
			}, function(response){
				});
	}
	
	$scope.getLastAppointments = function(){
			$http.get('/' + user_id + '/appointment/' + count + '').
			then(function(response){
			$scope.list = response.data;
			}, function(response){
				});
	}

	$scope.getAppointmentsFromTo = function(){
			$http.get('/' + user_id + '/appointment/' + from + '/' + to +'').
			then(function(response){
				$scope.list = response.data;
			}, function(response){
				});
	}
	
	$scope.createAppointment = function(){
			$http.post('/' + docent_id + '/appointment', 
					{"day": $scope.day,"time_from": $scope.time_from, "time_to": $scope.time_to, "desription": $scope.description}).
			then(function(response){
			//success
			}, function(response){
				});
	}

	$scope.deleteAppointment = function(){
			$http.delete('/' + docent_id + '/appointment/' + appointment_id + '').
			then(function(response){
			//success
			}, function(response){
				});
	}
});