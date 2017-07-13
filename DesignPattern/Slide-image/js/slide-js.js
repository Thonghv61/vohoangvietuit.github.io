/*
Author: Vo Hoang Viet
Project: Slide Image 
*/
var slide = (function(){
	//DOM 
	var privateSlides = $(".mySlides");
	var privateSlideContaint = $(".slideshow-container");
	var privateDots = $(".dot");
	//width slide
	var privateSlideWidth = $(".main-container").width();

	//slide start
	var slideIndex = 0; 
	//time run slide auto (second)
	var TIME_AUTO_SEC = 4;
	var privateInterval;
	
	/*----------  Private function  ----------*/
	// Function for auto slide
	function privateAutoSlide(){
		privateInterval = setInterval(privateNextSlide, TIME_AUTO_SEC*1000); //auto slide
	}

	// Function pause slide
	function privatePauseSlide(){
		clearInterval(privateInterval);
	}

	// Function prev button
	function privatePreviewSlide(){
		slideIndex--;
		if (slideIndex < 0) {
			slideIndex = privateSlides.length-1;
			privateSlideContaint.animate({left: '-='+ (privateSlideWidth*privateSlides.length-privateSlideWidth)}, 500);
		} else{
			privateSlideContaint.animate({left: '+='+ privateSlideWidth}, 500);
		}
		
		privateDots.eq(slideIndex).addClass("active").siblings().removeClass("active");
	}

	// Function for next button
	function privateNextSlide(){
		slideIndex++;
		if (slideIndex > privateSlides.length-1) {
			slideIndex = 0;
			privateSlideContaint.animate({left: '+='+ (privateSlideWidth*privateSlides.length-privateSlideWidth)}, 500);
		} else{
			privateSlideContaint.animate({left: '-='+ privateSlideWidth}, 500);
		}
		
		privateDots.eq(slideIndex).addClass("active").siblings().removeClass("active");
	}

	// Function for dot button
	function privateClickDots(index){
		privateSlideContaint.animate({left: '+='+ privateSlideWidth * (slideIndex - index + 1)}, 500);
		slideIndex = index -1;
		privateDots.eq(slideIndex).addClass("active").siblings().removeClass("active");
	}
	/*----------  End Private function ----------*/

	/*----------  Public function  ----------*/
	function publicAutoSlide() {
		privateAutoSlide();
	}

	function publicPreviewSlide() {
		privatePauseSlide();
		privatePreviewSlide();
		privateAutoSlide();
	}

	function publicNextSlide() {
		privatePauseSlide();
		privateNextSlide();
		privateAutoSlide();
	}

	function publicClickDots(index) {
		privatePauseSlide();
		privateClickDots(index);
		privateAutoSlide();
	}
	/*----------  End Public function  ----------*/
	
	return {
		auto: publicAutoSlide,
		prev: publicPreviewSlide,
		next: publicNextSlide,
		dots: publicClickDots
	};
})();

$(document).ready(function(){
	slide.auto();
	// Event click for prev button
	$(".prev").click(function(){
		slide.prev();
	});

	// Event click for next button
	$(".next").click(function(){
		slide.next();
	});

	// Event click for dot button
	$(".dot").click(function(){
		index = $(".dot").index(this) + 1;
		console.log("index dot: " + index);
		slide.dots(index);
	});
});
