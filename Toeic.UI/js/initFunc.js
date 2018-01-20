$(function() {
	var listAssessment;
	var idAssessment;
	var assessmentData;
	// Get list Assessment
	$.ajax({
		type: "GET",
		url: "getListAssessment",
		success: function(data) {
			console.log("SUCCESS getListAssessment: ", data);
			listAssessment = data;
		},
		error: function(er) {
			console.log("ERROR: ", er);

		}
	});
	
	var url_string = window.location.href;
	var url = new URL(url_string);
	idAssessment = url.searchParams.get("idA");
	
	if (idAssessment) {
		console.log("Success " + idAssessment);
		
		// Get data Assessment
		$.ajax({
			type: "GET",
			url: "getDataTest/" + idAssessment,
			success: function(data) {
				console.log("SUCCESS data Assessment: ", JSON.parse(data));
				assessmentData = data;
			},
			error: function(er) {
				console.log("ERROR: ", er);

			}
		});
	}
	
});