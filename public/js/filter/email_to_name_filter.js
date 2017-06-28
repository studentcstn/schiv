schiv_module.filter('email_to_name',function(){
	return function(email){
		var rest = email.split("@");
		rest = rest[0].split(".");
		for(i = rest[1].length-1; i>0; i--)
		{
			if(rest[1].charAt(i).match([0-9])){
				rest[1].replace(rest[1].charAt(i), "");			
			}
			else
				break;
		}
		rest[0] = rest[0].charAt(0).toUpperCase() + rest[0].substring(1);
		rest[1] = rest[1].charAt(0).toUpperCase() + rest[1].substring(1);
		return rest[0] + " " + rest[1];
	}
});
