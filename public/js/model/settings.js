settings = {
    getSettings: function ($http, $rootScope, broadcastSuccess, broadcastFailed) {
        $http.get('/settings')
            .then(function (response) {
                console.log(response);
                var d = response.data;
                d.email = d.email.substring(0, d.email.indexOf('@'));
                work(response.data);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function (response) {
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },
    saveSettings: function($http, $rootScope, broadcastSuccess, broadcastFailed, email, password, faculties){
        var settings = {};
        if (email != null && email != "")
            settings.email = email+"@hof-university.de";
        if (password != null && password != "")
            settings.password = password;
        var faculty = [];
        for (i = 0; i < faculties.length; ++i)
            if (faculties[i].active == true)
                faculty.push(faculties[i].id);
        if (faculty.length > 0)
            settings.faculties = faculty;
        console.log(settings);
        $http.put('/settings', settings)
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
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