/*
Author: Vo Hoang Viet
Project: Slide Image 
*/

var countSlides = $(".mySlides").length;
var countDots = $(".dot").length;

//slide start
var slideIndex = 0; 
//time run slide auto (second)
var TIME_AUTO_SEC = 4;
var autoslide;

//show slide
showSlides();
//to auto slide
autoSlide();

/**
 * To auto run Slide
 * with setTimeOut
 */
function autoSlide(){
	slideIndex++;
	if (slideIndex > countSlides-1) {
		slideIndex = 0;
	}
	showSlides();
	autoslide = setTimeout(autoSlide, TIME_AUTO_SEC*1000); //auto slide
}

// Event click for prev button
$(".prev").click(function(){
	slideIndex--;
	if (slideIndex-1 < 0) {
		slideIndex = countSlides;
	}
	showSlides();
});

// Event click for next button
$(".next").click(function(){
	slideIndex++;
	if (slideIndex > countSlides-1) {
		slideIndex = 0;
	}
	showSlides();
});

// Event click for dot button
$(".dot").click(function(){
	index = $(".dot").index(this) + 1;
	slideIndex = index;
	console.log(slideIndex);
	showSlides();
});
// Stop auto slide when mouse hover
$(".slideshow-container").hover(function(){
	console.log("Hover");
	clearTimeout(autoslide);
}, function(){
	autoslide = setTimeout(autoSlide, TIME_AUTO_SEC*1000); //auto slide
});

/**
 * Function main to show slide 
 * @param n
 *
 */
function showSlides(){
	for (var i = 0; i < countSlides; i++) {
		$(".mySlides").eq(i).hide();
	}
/*	for (let i = 0; i < countDots; i++) {
		$(".dot").eq(i).removeClass("active");
	}
	$(".mySlides").each(function(){
		$(this).hide();
	});
	$(".dot").each(function(){
		$(this).hide();
	});*/
	$(".mySlides").eq(slideIndex-1).show();
	$(".dot").eq(slideIndex-1).addClass("active").siblings().removeClass("active");
}
