/**
 * Submit form ajax, check input and call ajax
 */
$("#form_ajax").submit(function() {
	//check input validate if validate return ajax
	if (checkUsername() && checkPass() && checkEmail() && checkBirthday()) {
		console.log("submit");
		var uservalue = $("#username").val();
		$.ajax({
			type: "GET",
			url: "info_validation.php",
			data: {
				username: uservalue,
			},
			dataType: 'text',
			timeout: 100000,
			success: function(data) {
				console.log("SUCCESS: ", data);
			},
			error: function(e) {
				console.log("ERROR: ", e);
			}
		});
	}
	return false;
});

/**
 * Check username 
 * if valid return true
 * else return false
 */
function checkUsername() {
	var usernameRegex = new RegExp("^[A-Za-z0-9]+$");
	var username = $("#username");
	if (username.val().length < 8) {
		$("#user_error").html("Username length min 8 letter");
		return false;
	}
	if (usernameRegex.test(username.value)) {
		$("#user_error").empty();
		return true;
	}
	$("#user_error").html("Invalid Username");
	return false;
}

/**
 * Check password 
 * if valid return true
 * else return false
 */
function checkPass() {
	var pass = $("#password");
	if (pass.val().length >= 8) {
		$("#pass_error").empty();
		return true;
	}
	$("#pass_error").html("Password length min 8 letter");
	return false;
}

/**
 * Check email 
 * if valid return true
 * else return false
 */
function checkEmail() {
	var emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
	var email = $("#email");
	if (emailRegex.test(email.val())) {
		$("#email_error").empty();
		return true;
	}
	$("#email_error").html("Email wrong format");
	return false;
}

/**
 * Check birthday 
 * if valid return true
 * else return false
 */
function checkBirthday() {
	var birthRegex = new RegExp("^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$");
	var birth = $("#datepicker");
	if (birthRegex.test(birth.val())) {
		$("#birth_error").empty();
		return true;
	}
	$("#birth_error").html("Birthday wrong format");
	return false;
}

/**
 * Reset form
 */
$('button[typebtn = "reset"]').click(function(){
	resetForm();
});
function resetForm() {
	$("#username").val('');
	$("#password").val('');
	$("#email").val('');
	$("#datepicker").val('');

	$("#user_error").empty();
	$("#pass_error").empty();
	$("#email_error").empty();
	$("#birth_error").empty();
}