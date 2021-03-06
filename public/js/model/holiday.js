holiday_id = [];
holiday = {

	getHolidays: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to){
		from = rebuildDate(from);
		to = rebuildDate(to);
		if(!controlDate(from) || !controlDate(to)){
			$rootScope.$broadcast(broadcastFailed, {status:1004, statusText:"Error in date"});
			return;
		}
		connection.lock(function(){
			get_Holidays($http, $rootScope, broadcastSuccess, broadcastFailed, from, to);
		});
	},

	createHolidays: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name){
		from = rebuildDate(from);
		to = rebuildDate(to);
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

	deleteHoliday: function($http, $rootScope, broadcastSuccess, broadcastFailed, holidays){
	    var success = {success: true};

	    for (var i = 0; i < holidays.length; ++i) {
	        if (!holidays[i].active && holidays[i].account_id != null) {
                holiday_id.push(holidays[i].id);

                connection.lock(function(){
                    delete_Holiday($http, success, holiday_id.pop());
                });
            }
        }

        connection.lock(function () {
            if (success.success) {
               $rootScope.$broadcast(broadcastSuccess);
            } else {
               $rootScope.$broadcast(broadcastFailed);
            }
            connection.free();
        });
	}
};

var get_Holidays = function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to){
    $http.get('/holidays/' + from + '/' + to +'')
    .then(function(response) {
    	connection.free();
    	for (var i = 0; i < response.data.length; ++i)
    	    response.data[i].active = true;
        $rootScope.$broadcast(broadcastSuccess, response.data);
    }, function(response){
    	connection.free();
        $rootScope.$broadcast(broadcastFailed, response);
    });
};

var create_Holidays = function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name){
	$http.post('/holidays', {"from": from, "to": to, "name": name})
	.then(function(response){
		connection.free();
        $rootScope.$broadcast(broadcastSuccess, response);
	}, function(response){
		connection.free();
        $rootScope.$broadcast(broadcastFailed, response);
	});
};

var edit_Holiday = function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to, name, id){
	$http.put('/holidays', {"from": from, "to": to, "name": name, "id": id})
	.then(function(response){
		connection.free();
        $rootScope.$broadcast(broadcastSuccess, response);
	}, function(response){
		connection.free();
        $rootScope.$broadcast(broadcastFailed, response);
	});
};

var delete_Holiday = function($http, success, id){
	$http.delete('/holidays/' + id +'')
	.then(function(response){
		connection.free();
	}, function(response){
		connection.free();
        success.success = false;
	});
};
