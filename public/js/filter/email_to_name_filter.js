schiv_module.filter('email_to_name',function(){
	return function(email){
	var dot = email.search(".");
	for(i = email.length-1; i >=0; --i){
		if(email.charAt(i).match([0-9]))
		{
			email.replace(email.charAt(i)),"");
		}			
	}
	var at = email.search("@");
	var first_name = email.substring(0,dot);
	var last_name = email.substring(dot+1,at);
	return first_name + " " + last_name;
	}
}
