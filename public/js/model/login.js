login = {
		
		login: function($http, $rootScope, broadcastSuccess, broadcastFailed, email, password){
			connection.lock(function(){
				login_($http, $rootScope, broadcastSuccess, broadcastFailed, email, password);
			});
		},

		register: function($http, $rootScope, broadcastSuccess, broadcastFailed, email, password){
			connection.lock(function(){
				register_($http, $rootScope, broadcastSuccess, broadcastFailed, email, password);
			});
		},

		 confirmRegistration: function($http, $rootScope, broadcastSuccess, broadcastFailed, token){
			connection.lock(function(){
				confirm_Registration($http, $rootScope, broadcastSuccess, broadcastFailed, token);
			});
		 },

		 forgotPassword: function($http, $rootScope, broadcastSuccess, broadcastFailed, email){
				connection.lock(function(){
					forgot_Password($http, $rootScope, broadcastSuccess, broadcastFailed, email);
				});
		 },

		 logout: function ($http, $rootScope, broadcastSuccess, broadcastFailed){
				connection.lock(function(){
					 logout_($http, $rootScope, broadcastSuccess, broadcastFailed);
				}); 
		 }
};

var login_ = function ($http, $rootScope, broadcastSuccess, broadcastFailed, email, password) {
    $http.put('/login', {email: email, password: password})
        .then(function (response) {
        	connection.free();
            console.log(response);
            var d = response.data.account;
            d.email = d.email.substring(0, d.email.indexOf('@'));
            d.name = d.email.substring(0, d.email.indexOf('.'));
            d.last = d.email.substring(d.email.indexOf('.')+1);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function (response) {
        	connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var register_ = function($http, $rootScope, broadcastSuccess, broadcastFailed, email, password) {
    $http.post('/register',{"email": email, "password": password})
        .then(function(response){
        	connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
        	connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var confirm_Registration = function($http, $rootScope, broadcastSuccess, broadcastFailed, token){
    $http.put('/register', {token: token})
        .then(function(response){
        	connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
        	connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var forgot_Password = function($http, $rootScope, broadcastSuccess, broadcastFailed, email) {
    $http.put('/reset', {"email": email})
        .then(function(response){
        	connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
        	connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var logout_ = function ($http, $rootScope, broadcastSuccess, broadcastFailed) {
    $http.put('/logout', {})
        .then(function(response){
        	connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
        	connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};