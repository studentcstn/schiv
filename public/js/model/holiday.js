holiday = {

	getHolidays: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to){
		if(!controlDate(from) || !controlDate(to)){
			$rootScope.$broadcast(broadcastFailed, {status:1004, statusText:"Error in date"});
			return;
		}
		connection.lock(function(){
			get_Holidays($http, $rootScope, broadcastSuccess, broadcastFailed, from, to);
		});
	},

	createHolidays: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name){
		if(!controlDate(from) || !controlDate(to)){
			$rootScope.$broadcast(broadcastFailed, {status:1004, statusText:"Error in date"});
			return;
		}
		if(name ==""){
			$rootScope.$broadcast(broadcastFailed, {status:1006, statusText:"Holiday empty name error"});
			return;
		}
		connection.lock(function(){
			create_Holidays($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name);
		});
	},

	editHoliday: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name, id){
		if(!controlDate(from) || !controlDate(to)){
			$rootScope.$broadcast(broadcastFailed, {status:1004, statusText:"Error in date"});
			return;
		}
		if(name ==""){
			$rootScope.$broadcast(broadcastFailed, {status:1006, statusText:"Holiday empty name error"});
			return;
		}
		connection.lock(function(){
			edit_Holiday($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name, id);
		});
	},

	deleteHoliday: function($http, $rootScope, broadcastSuccess, broadcastFailed, id){
		connection.lock(function(){
			delete_Holiday($http, $rootScope, broadcastSuccess, broadcastFailed, id);
		});
	}
};

var get_Holidays = function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to){
    $http.get('/holidays/' + from + '/' + to +'')
    .then(function(response) {
    	connection.free();
        console.log(response);
        $rootScope.$broadcast(broadcastSuccess, response.data);
    }, function(response){
    	connection.free();
        console.log(response);
        $rootScope.$broadcast(broadcastFailed, response);
    });
};

var create_Holidays = function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name){
	$http.post('/holidays', {"from": from, "to": to, "name": name})
	.then(function(response){
		connection.free();
        console.log(response);
        $rootScope.$broadcast(broadcastSuccess, response);
	}, function(response){
		connection.free();
        console.log(response);
        $rootScope.$broadcast(broadcastFailed, response);
	});
};

var edit_Holiday = function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name, id){
	$http.put('/holidays', {"from": from, "to": to, "name": name, "id": id})
	.then(function(response){
		connection.free();
        console.log(response);
        $rootScope.$broadcast(broadcastSuccess, response);
	}, function(response){
		connection.free();
        console.log(response);
        $rootScope.$broadcast(broadcastFailed, response);
	});
};

var delete_Holiday = function($http, $rootScope, broadcastSuccess, broadcastFailed, id){
	$http.delete('/holidays/' + id +'')
	.then(function(response){
		connection.free();
        console.log(response);
        $rootScope.$broadcast(broadcastSuccess, response);
	}, function(response){
		connection.free();
        console.log(response);
        $rootScope.$broadcast(broadcastFailed, response);
	});
};
