/*
Author: Vo Hoang Viet
Project: Slide Image 
*/
var slideIndex = 0; //slide bat dau
var countSlides = $(".mySlides").length;
var countDots = $(".dot").length;
var TIME_AUTO_SEC = 4; //Thoi gian chay slide
var autoslide;
showSlides(); //bat dau slide
autoSlide();

//AUTO SLIDE
function autoSlide(){
	slideIndex++;
	if (slideIndex > countSlides-1) {
		slideIndex = 0;
	}
	showSlides();
	autoslide = setTimeout(autoSlide, TIME_AUTO_SEC*1000); //auto slide
}

//HÀM CHỌN SLIDE
function currentSlide(n){
	showSlides(slideIndex = n);
}

//PREV
$(".prev").click(function(){
	slideIndex--;
	if (slideIndex-1 < 0) {
		slideIndex = countSlides;
	}
	showSlides();
});

//NEXT
$(".next").click(function(){
	slideIndex++;
	if (slideIndex > countSlides-1) {
		slideIndex = 0;
	}
	showSlides();
});

//DỪNG SLIDE KHI HOVER
$(".slideshow-container").hover(function(){
	console.log("Hover");
	clearTimeout(autoslide);
}, function(){
	autoslide = setTimeout(autoSlide, TIME_AUTO_SEC*1000); //auto slide
});

//HÀM HIỂN THỊ SLIDE
function showSlides(){
	for (let i = 0; i < countSlides; i++) {
		$(".mySlides").eq(i).hide();
	}
	for (let i = 0; i < countDots; i++) {
		$(".dot").eq(i).removeClass("active");
	}
/*	$(".mySlides").each(function(){
		$(this).hide();
	});
	$(".dot").each(function(){
		$(this).hide();
	});*/
	$(".mySlides").eq(slideIndex-1).show();
	$(".dot").eq(slideIndex-1).addClass("active");
}
