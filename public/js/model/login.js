login = {
		
	login: function($http, $rootScope, broadcastSuccess, broadcastFailed, email, password){
		if(email == "" || email == null || !email.match(".*@hof-university.de")){
			$rootScope.$broadcast(broadcastFailed, {status: 1000, statusText:"Email is not accepted"});
			return;
		}
		if(password == "" || password == null){
			$rootScope.$broadcast(broadcastFailed,{status:1002, statusText:"Password is empty"});
			return;
		}
		connection.lock(function(){
			login_($http, $rootScope, broadcastSuccess, broadcastFailed, email, password);
		});
	},

	register: function($http, $rootScope, broadcastSuccess, broadcastFailed, email, password, repeat_password){
		if(email == "" || email == null || !email.match(".*@hof-university.de")){
			$rootScope.$broadcast(broadcastFailed, {status: 1000, statusText:"Email is not accepted"});
			return;
		}
		if(password == "" || password == null ){
			$rootScope.$broadcast(broadcastFailed, {status: 1002, statusText:"Password is empty"});
			return;
		}
		if(password != repeat_password){
			$rootScope.$broadcast(broadcastFailed, {status:1003, statusText:"Password is not repeated properly"});
			return;
		}
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
	if(email == "" || email == null || !email.match(".*@hof-university.de")){
		$rootScope.$broadcast(broadcastFailed, {status: 1000, statusText:"Email is not accepted"});
		return;
		}
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
		d.name = d.name.charAt(0).toUpperCase() + d.name.substring(1);
		d.last = d.email.substring(d.email.indexOf('.')+1);
		d.last = d.last.charAt(0).toUpperCase() + d.last.substring(1);

		for(i = d.last.length-1; i>0; i--)
		{
			if(d.last.charAt(i).match([0-9])){
				d.last.replace(d.last.charAt(i), "");			
			}
			else
				break;
		}
		$rootScope.$broadcast(broadcastSuccess, response.data);
	}, function (response) {
		connection.free();
		console.log(response);
		$rootScope.$broadcast(broadcastFailed, response);
	});
};

var register_ = function($http, $rootScope, broadcastSuccess, broadcastFailed, email, password, repeat_password) { 
	
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
