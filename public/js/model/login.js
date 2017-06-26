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
	if(email == "" || email == null || !email.match(".*@hof-university.de")){
		$rootScope.$broadcast(broadcastFailed, "Email is not accepted");
		return;
	}
	if(password == "" || password == null){
		$rootScope.$broadcast(broadcastFailed, "Password is empty");
		return;
	}
	
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

            //todo remove
            response.data = {"message":"login successful","account":{"id":3,"email":"helmut.kohl@hof-university.de","type":"Docent","active":"1","last_login_at":"2017-06-26 15:18:49"}};
            response.data = {"message":"login successful","account":{"id":2,"email":"hanz.wurst@hof-university.de","type":"Student","active":"1","last_login_at":"2017-06-26 14:53:36"}};
            console.log(response);
            var d = response.data.account;
            d.email = d.email.substring(0, d.email.indexOf('@'));
            d.name = d.email.substring(0, d.email.indexOf('.'));
            d.last = d.email.substring(d.email.indexOf('.')+1);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        });
};

var register_ = function($http, $rootScope, broadcastSuccess, broadcastFailed, email, password, repeat_password) { 
	if(email == "" || email == null || !email.match(".*@hof-university.de")){
		$rootScope.$broadcast(broadcastFailed, "Email is not accepted");
		return;
	}
	if(password == "" || password == null ){
		$rootScope.$broadcast(broadcastFailed, "Password is empty");
		return;
	}
	if(password != repeat_password){
		$rootScope.$broadcast(broadcastFailed, "Password is not repeated properly");
		return;
	}
	
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
	if(email == "" || email == null || !email.match(".*@hof-university.de")){
		$rootScope.$broadcast(broadcastFailed, "Email is not accepted");
		return;
	}
	
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