schiv_module.filter('email_to_name',function(){
	return function(email){
	    if (angular.isString(date)) {
            var rest = email.split("@");
            rest = rest[0].split(".");
            for (i = rest[1].length - 1; i > 0; i--) {
                if (rest[1].charAt(i).match([0 - 9])) {
                    rest[1].replace(rest[1].charAt(i), "");
                }
                else
                    break;
            }
            rest[0] = rest[0].charAt(0).toUpperCase() + rest[0].substring(1);
            rest[1] = rest[1].charAt(0).toUpperCase() + rest[1].substring(1);
            return rest[0] + " " + rest[1];
        }
        return email;
	}
});

schiv_module.filter('date_filter',function(){
    return function(date){
<<<<<<< HEAD
        date = date.split("-");
        if (language == 'de') {
            return date[2] + "." + date[1] + "." + date[0];
        } else {
            return date[1] + "." + date[2] + "." + date[0];
=======
        if (angular.isString(date)) {
            date = date.split("-");
            if (language == 'de') {
                return date[2] + "." + date[1] + "." + date[0];
            } else {
                return date[1] + "." + date[2] + "." + date[0];
            }
>>>>>>> 56feccf2f27629ce9761aabc77787d59be041a25
        }
        return date;
    }
});
