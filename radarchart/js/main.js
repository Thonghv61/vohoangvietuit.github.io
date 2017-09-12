//DOM
var fileInput = document.getElementById('fileInput');
var textInput = document.getElementById('textInput');
var urlInput = document.getElementById('urlInput');

var fileOutput = document.getElementById('fileOutput');
var chartLayout = document.getElementById('chart-radar');
var renderBtn = document.getElementById('renderJS');
var backBtn = document.getElementById('backBtn');

//JSON duoc parse ra, lay dung
var resultData;

//Event call func to load file and parse data to json
fileInput.addEventListener('change', function() {
	reset();
	loadFileAndParseData();
});

var timer;
//Event call func to read text json and parse to object json
textInput.addEventListener('keyup', function() {
	clearTimeout(timer);
	//create a new timer with a delay of 2 seconds, if the keyup is fired before the 2 secs then the timer will be cleared
	timer = setTimeout(function() {
		if (checkTextJson(textInput.value)) {
			reset();
			resultData = JSON.parse(textInput.value);
		} else {
			alert("Wrong Json Type!");
		}
	}, 2000);
});

//Event call func to read text json from url and parse to object json
urlInput.addEventListener('change', function() {
	reset();
	console.log(urlInput.value);
	readTextFile(urlInput.value);
});

//Event call func to draw chart
renderBtn.addEventListener('click', function() {
	console.clear();
	reset();
	//draw chart group
	if (!resultData) {
		alert("Please select method to input file");
		return;
	} else {
		//checkRender();
		drillLevel0();
	}
});

//back button
backBtn.addEventListener('click', function() {
	backDrill();
	hiddenBtn();
});

//TAB
function openform(e, tabname) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabname).style.display = "block";
	e.currentTarget.className += " active";
}

function hiddenBtn() {
	console.log("drill level: " + drillDownLevel);
	if (drillDownLevel > 0) {
		backBtn.style.display = "block";
	} else {
		backBtn.style.display = "none";
	}
}

function reset() {
	//textInput.value = "";
	backBtn.style.display = "none";
	chartLayout.innerHTML = "";
	drillDownLevel = 0;
	//for btn
	renderBtn.disabled = false;
	renderBtn.value = "Render";
	renderBtn.classList.remove("disable");
	//Info for data visited
	var dataReview = {
		groupName: "",
		skillName: "",
		value: 0
	};
}

function checkRender() {
	renderBtn.disabled = true;
	renderBtn.value = "Rendered";
	renderBtn.classList.add("disable");
}

function checkTextJson(text) {
	if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
		//the json is ok
		return true;
	} else {
		//the json is not ok
		//alert("Wrong text json!");
		return false;
	}
}