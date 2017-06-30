settings = {
		
	getSettings: function ($http, $rootScope, broadcastSuccess, broadcastFailed){
		connection.lock(function(){
			get_Settings($http, $rootScope, broadcastSuccess, broadcastFailed);
		});
	},
		
	saveSettings: function($http, $rootScope, broadcastSuccess, broadcastFailed, email, password, password_repeat, faculties){
		var settings = {};

		if (email != null && email != "")
			settings.email = email+"@hof-university.de";
		else{
			$rootScope.$broadcast(broadcastFailed, {status: 1000, statusText:"Error at Email"});
		return;
		}
		if (password != "" && password.length >= 10 && password == password_repeat)
			settings.password = password;
		else if(password != "" && (password.length < 10  || password_repeat != password))
		{
			$rootScope.$broadcast(broadcastFailed, {status: 1003, statusText:"Error at Password"});
		}
		var faculty = [];
		for (i = 0; i < faculties.length; ++i)
		if (faculties[i].active == true)
			faculty.push(faculties[i].id);

		settings.faculties = faculty;
		console.log(settings);

		connection.lock(function(){
			save_Settings($http, $rootScope, broadcastSuccess, broadcastFailed, settings)
		});
	}

};

var work = function (user_settings) {
    var account_faculties = user_settings.account_faculties;
    var faculties = user_settings.faculties;
    for (var i = 0; i < faculties.length; ++i) {
        for (var j = 0; j < account_faculties.length; ++j) {
            if (faculties[i].id === account_faculties[j].id) {
                faculties[i].active = true;
                break;
            } else {
                faculties[i].active = false;
            }
        }
    }
};

var get_Settings = function ($http, $rootScope, broadcastSuccess, broadcastFailed) {
    $http.get('/settings')
        .then(function (response) {
        	connection.free();
            console.log(response);
            var d = response.data;
            d.email = d.email.substring(0, d.email.indexOf('@'));
            work(response.data);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function (response) {
        	connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var save_Settings = function($http, $rootScope, broadcastSuccess, broadcastFailed, settings){

    $http.put('/settings', settings)
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

prefered_Faculty = function(user_faculties, docent_faculties){
	for(var i = 0; i< docent_faculties; ++i){
		for(var m = 0; m< user_faculties; ++m){
			if(user_faculties[m].id == docent_faculties[i].id)
				return 0;
		}
	}
	return 1;
};

