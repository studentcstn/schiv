ban_id = [];
ban_success = {success: true};
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

    unbanAccount: function($http, $rootScope, broadcastSuccess, broadcastFailed, list_of_unbanned) {
	    ban_success.success = true;

        for (i = 0; i < list_of_unbanned.length; ++i) {
            if (list_of_unbanned[i].active == false) {
                ban_id.push(list_of_unbanned[i].account_ban_id);

                connection.lock(function () {
                    unban_Account($http, ban_success, ban_id.pop());
                });
            } 
        }

        connection.lock(function () {
            connection.free();
            if (ban_success.success) {
                $rootScope.$broadcast(broadcastSuccess);
            } else {
                $rootScope.$broadcast(broadcastFailed);
            }
        });
    }


};

var get_AccountBans = function($http, $rootScope, broadcastSuccess, broadcastFailed){
    $http.get('/account_bans', {})
        .then(function(response){
            connection.free();
            var data = response.data;
            for (var i = 0; i < data.length; ++i)
                data[i].active = true;
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
            connection.free();
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var ban_Account = function($http, $rootScope, broadcastSuccess, broadcastFailed, account_ban_id){
$http.post('/account_bans', {"account_ban_id": account_ban_id})
    .then(function(response){
        connection.free();
        $rootScope.$broadcast(broadcastSuccess, response);
    }, function(response){
        connection.free();
        $rootScope.$broadcast(broadcastFailed, response);
    });
};

var unban_Account = function($http, success, user_id){
    $http.delete('/account_bans/' + user_id + '')
        .then(function(response){
            connection.free();
        }, function(response){
            connection.free();
            success.success = false;
        });
};

