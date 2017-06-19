$(function() {
	    var topBtn = $('#page-top');   
	    topBtn.hide();
	    //show btn
	    $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	            topBtn.fadeIn();
	        } else {
	            topBtn.fadeOut();
	        }
	    });
	    //go top
	    topBtn.click(function () {
	        $('body,html').animate({
	            scrollTop: 0
	        }, 500);
	        return false;
	    });
		
});
