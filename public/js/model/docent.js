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

    	for(var i = 0; i<docents.length;++i){
    		if(docents[i].email.match(".*" + searchString + ".*"))
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
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
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
        });
};

var checkIfFacultiesMatch = function(faculties, searchString){
	for(var i = 0; i< faculties.length; ++i){
		if(faculties[i].name.match(".*"+searchString+".*")){
			return true;	
		}
	}
	return false;
};