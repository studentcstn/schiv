ban = {
		
	getAccountBans: function($http, $rootScope, broadcastSuccess, broadcastFailed){
		connection.lock(function(){
			get_AccountBans($http, $rootScope, broadcastSuccess, broadcastFailed);
		});
	},

	banAccount: function($http, $rootScope, broadcastSuccess, broadcastFailed, account_ban_id){
		connection.lock(function(){
			ban_Account($http, $rootScope, broadcastSuccess, broadcastFailed, account_ban_id);
		});
	},

	unbanAccount: function($http, $rootScope, broadcastSuccess, broadcastFailed, list_of_unbanned){
		connection.lock(function(){
			unban_Account($http, $rootScope, broadcastSuccess, broadcastFailed, list_of_unbanned);
		});
	}
};

var get_AccountBans = function($http, $rootScope, broadcastSuccess, broadcastFailed){
    $http.get('/account_bans', {})
        .then(function(response){
            console.log(response);
            var data = response.data;
            for (i = 0; i < data.length; ++i)
                data[i].active = true;
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var ban_Account = function($http, $rootScope, broadcastSuccess, broadcastFailed, account_ban_id){
    $http.post('/account_bans/', {"account_ban_id": account_ban_id}).
    then(function(response){
    	 console.log(response);
         $rootScope.$broadcast(broadcastSuccess, response);
    }, function(response){
    	 console.log(response);
         $rootScope.$broadcast(broadcastFailed, response);
    });
};

var unban_Account = function($http, $rootScope, broadcastSuccess, broadcastFailed, list_of_unbanned){
	success = true;
	
	for(i = 0; i<list_of_unbanned.length; ++i){
		if(list_of_unbanned[i].active == false){
			user_id = list_of_unbanned[i].account_ban_id;
			 $http.delete('/account_bans/' + user_id + '')
                 .then(function(response){
                     console.log(response);
                 }, function(response){
                     console.log(response);
                     success = false;})
		} else{
			continue;
		}
		
		if(success){
		    $rootScope.$broadcast(broadcastSuccess);
		} else {
		    $rootScope.$broadcast(broadcastFailed);
		}
	}

}
