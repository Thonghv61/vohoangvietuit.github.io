 $(function(){
	 $(window).scroll(function(){
	 	vitrihientai = $('body').scrollTop();
	 	if(vitrihientai > 300){
	 		$('.navbar').addClass('tienhoa')
	 	}
	 	else if(vitrihientai < 300){
	 		$('.navbar').removeClass('tienhoa')
	 	}
	 })

	 var docao = $(window).height()
	 $(".gioithieu").css({'height': docao})

	 $(window).resize(function(){
		 var docao = $(window).height()
		 $(".gioithieu").css({'height': docao})
	 })

	 $('.n1').click(function(){
	 	$('body').animate({scrollTop: 0}, 2000, "easeInOutExpo")
	 })
	 $('.n2').click(function(){
	 	$('body').animate({scrollTop: $('#gioithieu1').offset().top - 100}, 2000, "easeInOutExpo")
	 })

	 //click run to gian hang va 2 class clik
	 $('.n3, .chohang').click(function(){
	 	$('body').animate({scrollTop: $('#giaohang').offset().top + 30}, 2000, "easeInOutExpo")
	 	// $('.change').addClass('active');
	 	// $('.change1').removeClass('active');
	 })
	 $('.change').click(function(){
	 	$('body').animate({scrollTop: $('#giaohang').offset().top + 30})
	 })

	 //taixe
	 $('.taixe').click(function(){
	 	$('body').animate({scrollTop: $('#giaohang').offset().top + 30}, 2000, "easeInOutExpo");
	 	// $('.change').removeClass('active');
	 	// $('.change1').addClass('active');

	 })
	 $('.change1').click(function(){
	 	$('body').animate({scrollTop: $('#giaohang').offset().top + 30});
	 })


	 $('.n4').click(function(){
	 	$('body').animate({scrollTop: $('#lienhe').offset().top}, 2000, "easeInOutExpo")
	 })
	  $('.n5').click(function(){
	 	$('body').animate({scrollTop: $('#tintuc').offset().top}, 2000, "easeInOutExpo")
	 })
	 $('.chohang').click(function(){
	 	$('body').animate({scrollTop: $('#giaohang').offset().top +30}, 2000, "easeInOutExpo")
	 	return false;
	 })

	 //focus
	 $('.myfocus').focus(function(){
	 	$('body').animate({scrollTop: $('.myfocus').offset().top - 130})
	 });
	 $('.myfocus1').focus(function(){
	 	$('body').animate({scrollTop: $('#giaohang').offset().top + 30})
	 });



	 $('.truckrun').click(function(){
	 	// $('.truckrun').addClass("wow bounceOutLeft");
	 	$('.truckrun').attr("style","visibility: visible; animation-name: bounceOutLeft; animation-duration: 2.5s");
	 })
	 $(window).scroll(function(){
	 	if($('body').scrollTop() > $('.truckrun').offset().top)
	 	{
	 		// $('.truckrun').removeClass('wow bounceOutLeft');
	 		$('.truckrun').removeAttr("style","visibility: visible; animation-name: bounceOutLeft;");
	 	}
	 })

	 $('.taixe').click(function(){
	 	// $('.taixe').addClass("wow bounceOutLeft");
	 	$('.taixe').attr("style","visibility: visible; animation-name: bounceOutDown; animation-duration: 2.5s");
	 })
	 $(window).scroll(function(){
	 	if($('body').scrollTop() > $('.taixe').offset().top)
	 	{
	 		// $('.taixe').removeClass('wow bounceOutLeft');
	 		$('.taixe').removeAttr("style","visibility: visible; animation-name: bounceOutDown;");
	 	}
	 })


	 // $('.chohang').click(function(){
	 // 	// $('.truckrun').addClass("wow bounceOutLeft");
	 // 	$('.chohang').attr("style","visibility: visible; animation-name: bounceOutRight; animation-duration: 4s");
	 // })
	 // $(window).scroll(function(){
	 // 	if($('body').scrollTop() > $('.chohang').offset().top)
	 // 	{
	 // 		// $('.truckrun').removeClass('wow bounceOutLeft');
	 // 		$('.chohang').removeAttr("style","visibility: visible; animation-name: bounceOutRight;");
	 // 	}
	 // })


	 //small strick for Linking to a Bootstrap Tab from outside
	 $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = this.href.split('#');
    $('.nav a').filter('[href="#'+target[1]+'"]').tab('show');
});


	 //back to top
	 $(window).scroll(function(){
	 	if($(this).scrollTop() > 1000 ){
	 		$('#back-to-top').fadeIn();
	 	}
	 	else{
	 		$('#back-to-top').fadeOut();
	 	}
	 });

	 //click to top
	 $('#back-to-top').click(function(){
	 	$('body').animate({scrollTop: 0});
	 });


	 new WOW().init();

})
