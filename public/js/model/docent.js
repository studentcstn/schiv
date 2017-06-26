docent = {
		
	getDocentList: function($http, $rootScope, broadcastSuccess, broadcastFailed){
		connection.lock(function(){
			get_DocentList($http, $rootScope, broadcastSuccess, broadcastFailed);
		});
	},

	getSingleDocent: function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id){
		connection.lock(function(){
			get_SingleDocent($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id);
		});
	},

    search: function (docents, searchString) {
		searchString = (".*" + searchString + ".*").toLowerCase();
    	for(var i = 0; i<docents.length;++i){
    		if(docents[i].email.toLowerCase().match(searchString))
    		{
    			docents[i].visible = true;
    		}
    		else if(checkIfFacultiesMatch(docents[i].faculties, searchString)){
    			docents[i].visible = true;
    		}
//    		else if((docents[i].name.matches(".*" + searchString + ".*")){
//    		    docents[i].visible = true;
//    		}
    		else{
    			docents[i].visible = false;
    		}
    	} 	
    }
};

var get_DocentList = function($http, $rootScope, broadcastSuccess, broadcastFailed){
    $http.get('/docents')
        .then(function(response) {
            connection.free();
            console.log(response);
            for(i = 0; i<response.data.length; ++i){
            	response.data[i].visible = true;
            }
            $rootScope.$broadcast(broadcastSuccess, response.data);
		}, function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);

            //todo remove
            response.data = [{"id":3,"email":"helmut.kohl@hof-university.de","faculties":[{"id":1,"name":"Informatik","pivot":{"account_id":"3","faculty_id":"1"}},{"id":2,"name":"Ingenieur","pivot":{"account_id":"3","faculty_id":"2"}}]},{"id":4,"email":"apfel.mus@hof-university.de","faculties":[]}];
            console.log(response);
            for(i = 0; i<response.data.length; ++i){
                response.data[i].visible = true;
            }
            $rootScope.$broadcast(broadcastSuccess, response.data);
        });
};

var get_SingleDocent = function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id){
    $http.get('/docents/' + docent_id)
        .then(function(response) {
            connection.free();
            $rootScope.$broadcast(broadcastSuccess, response.data);
            console.log(response);
		}, function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);

            //todo remove
            response.data = {"id":3,"email":"helmut.kohl@hof-university.de","appointments":[{"id":3,"account_id":"3","description":"Klausureinsicht","active":"1","weekday":null,"date":"2017-05-17","time_from":"11:00:00","time_to":"12:00:00","created_at":null,"updated_at":null},{"id":4,"account_id":"3","description":"des","active":"1","weekday":"Mon","date":null,"time_from":"08:00:00","time_to":"09:00:00","created_at":null,"updated_at":null},{"id":5,"account_id":"3","description":"W\u00f6chentliche Sprechstunde","active":"1","weekday":"Wed","date":null,"time_from":"13:00:00","time_to":"14:00:00","created_at":null,"updated_at":null},{"id":6,"account_id":"3","description":"new appointment","active":"1","weekday":"Wed","date":null,"time_from":"09:11:00","time_to":"09:12:00","created_at":null,"updated_at":null}],"faculties":[{"id":1,"name":"Informatik","pivot":{"account_id":"3","faculty_id":"1"}},{"id":2,"name":"Ingenieur","pivot":{"account_id":"3","faculty_id":"2"}}]};
            $rootScope.$broadcast(broadcastSuccess, response.data);
            console.log(response);
        });
};

var checkIfFacultiesMatch = function(faculties, searchString){
	for(var i = 0; i< faculties.length; ++i){
		if(faculties[i].name.toLowerCase().match(searchString)){
			return true;	
		}
	}
	return false;
};