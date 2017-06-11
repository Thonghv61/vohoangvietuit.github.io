/*
Author: Vo Hoang Viet
Project: Slide Image 
*/
var slideIndex = 1; //slide bat dau
var slides = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("dot");
var TIME_AUTO_SEC = 4; //Thoi gian chay slide
showSlides(); //bat dau slide
setInterval(function(){plusSlides(1);}, TIME_AUTO_SEC*1000); //auto slide

//HÀM GỌI KHI NHẤN NÚT NEXT, PREV
function plusSlides(n){
	showSlides(slideIndex += n);
	console.log("Run");
}

//HÀM CHỌN SLIDE
function currentSlide(n){
	showSlides(slideIndex = n);
}

//HÀM HIỂN THỊ SLIDE
function showSlides(n){
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}

	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (let i = 0; i < dots.length; i++) {
		dots[i].classList.remove("active"); 
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].classList.add("active");
}
