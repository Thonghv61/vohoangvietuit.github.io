// DOM
var start_page = _('start_page');
var test_page = _('test_page');
var result_page = _('result_page');
var info_toeic = _('info_toeic');
var start_test = _('start_test');
var answer_sheet = _('answer_sheet');
var timeToeicId = _('time_remain');
var nextBtn = _("nextBtn");
var backBtn = _("backBtn");
var submitBtn = _("submitBtn");
var newTestBtn = _("newTest");

var question_contain = _("question_contain");
var multi_question_area = _("multi_question");

var toeicForm = document.getElementsByClassName("toeic-form");

// Init
var mainData = parseMainData(assessmentData);

//dataToeic.data = mainData;

var localData = JSON.parse(localStorage.getItem('infoMyTest'));
var indexPart = 1;
var indexQuestion = 0;
var arrayRealQuestion = getRealQuestion(mainData);
var isStart = false;
var TIME_REMAINING_MINUTES = 12;
var TIME_REMAINING_QUESTION_SECOND = 20;
var counterTimeToeic;
var arrSelectedAnswers = [];
var correctListening = 0;
var correctReading = 0;
var arrScoreListening = [5, 5, 5, 5, 5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 115, 120, 125, 130, 135, 140, 145, 150, 160, 165, 170, 175, 180, 185, 190, 195, 200, 210, 215, 220, 230, 240, 245, 250, 255, 260, 270, 275, 280, 290, 295, 300, 310, 315, 320, 325, 330, 340, 345, 350, 360, 365, 370, 380, 385, 390, 395, 400, 405, 410, 420, 425, 430, 440, 445, 450, 460, 465, 470, 475, 480, 485, 490, 495, 495, 495, 495, 495, 495, 495, 495, 495, 495, 495];
var arrScoreReading = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 65, 70, 80, 85, 90, 95, 100, 110, 115, 120, 125, 130, 140, 145, 150, 160, 165, 170, 175, 180, 190, 195, 200, 210, 215, 220, 225, 230, 235, 240, 250, 255, 260, 265, 270, 280, 285, 290, 300, 305, 310, 320, 325, 330, 335, 340, 350, 355, 360, 365, 370, 380, 385, 390, 395, 400, 405, 410, 415, 420, 425, 430, 435, 445, 450, 455, 465, 470, 480, 485, 490, 495, 495, 495, 495];
var scoreTOEIC = 0;
var choseAssessment;
//scoreTOEIC = parseInt(arrScoreListening[correctListening]) + parseInt(arrScoreReading[correctReading]);
var	correctPart = {
	part1: 0,
	part2: 0,
	part3: 0,
	part4: 0,
	part5: 0,
	part6: 0,
	part7: 0,
};

var lengthPartAll = {
	part1: 0,
	part2: 0,
	part3: 0,
	part4: 0,
	part5: 0,
	part6: 0,
	part7: 0,
};

// Event btn
start_test.addEventListener("click", function(){
	isStart = true;
	startTest();
});
// Event for next button
nextBtn.addEventListener("click", function() {
	nextQuestion();
});
// Event for back button
backBtn.addEventListener("click", function() {
	prevQuestion();
});

// Event for submit button
// submitBtn.addEventListener("click", function() {
// 	//finishToeic();
// });

// START
if (mainData) {
	renderInfoToeic(mainData);
}


// =====================Function=================== //

function _(x) {
	return document.getElementById(x);
}

function initData() {
	console.log('arrayRealQuestion', arrayRealQuestion);
	if (localData) {
		TIME_REMAINING_MINUTES = localData.timeLeft;
		indexPart = localData.indexPart;
		indexQuestion = localData.indexQuestion;
		arrSelectedAnswers = localData.arrSelectedAnswers;
	}
	getLengthEachPart();
}

function startTest() {
	if (isStart) {
		start_page.classList.add("hidden");
		test_page.classList.remove("hidden");
		// Init data
		initData();
		// Counter time toeic
		timer(TIME_REMAINING_MINUTES * 60, timeToeicId, finishToeic);	
		// Render answer sheet
		renderAnswerSheet(arrayRealQuestion);			
		// Render toeic area
		renderToeic(mainData);

	} else {
		start_page.classList.remove("hidden");
		test_page.classList.add("hidden");
	}
}

function renderToeic(data) {
	// End Test
	if (indexPart > 7 ) {
		finishToeic();
		return;
	}

	// Data part question array
	var dataQuestion = data["part" + indexPart][indexQuestion];

	// Render part question
	if (indexPart == 1 || indexPart == 2 || indexPart == 5) {
		renderForSingleQuestion(dataQuestion);
	} else if (indexPart == 3 || indexPart == 4 || indexPart == 6 || indexPart == 7) {
		renderForMultiQuestion(dataQuestion);
	}

	if (indexPart > 4 && indexQuestion > 0) {
		backBtn.classList.remove("hidden");
	}

	if (indexPart < 4 || (indexPart  == 5 && indexQuestion == 0)) {
		backBtn.classList.add("hidden");
	}

	if ((indexQuestion == mainData["part" + indexPart].length -1) && indexPart == 7) {
		nextBtn.classList.add("hidden");
		backBtn.classList.remove("hidden");
		submitBtn.classList.remove("hidden");
	}
}

// Read data part
function readDataPart(dataAll, partNum) {
	const data = dataAll.data["part" + partNum];
	return data;
}

// Render infomation toeic test
function renderInfoToeic(data) {
	if (localData) {
		start_test.innerHTML = 'CONTINUE';
		newTestBtn.classList.remove("hidden");
	} else {
		start_test.innerHTML = 'START';
		newTestBtn.classList.add("hidden");
	}

	var idAssessment = 3;
	choseAssessment = listAssessment.find(item => item.assessmentId == idAssessment);
	if (choseAssessment) {
		console.log("choseAssessment ", choseAssessment);
		TIME_REMAINING_MINUTES = choseAssessment.timeLimit_hour * 60 + choseAssessment.timeLimit_minute;
		info_toeic.innerHTML = `
			<p><b>Assigment:</b> ${choseAssessment.assessmentTitle}</p>
			<p><b>Due Day:</b> ${choseAssessment.dueDate}</p>
			<p><b>Time Limit:</b> ${choseAssessment.timeLimit_hour} hr</p>
		`;		
	}


}

// For part 1, 2, 5
function renderForSingleQuestion(data) {
	//console.log("renderForSingleQuestion");
	// reset
	question_contain.innerHTML = '';
	data = parseData(data);

	// mark color
	markColorAnswerSheet(getRealIndex(arrayRealQuestion, data));
	// Render question
	question_contain.innerHTML = `
		<div class="title-part" >
			<h3 id="title_part">${setTitlePart(data.poolName)}</h3>
		</div>
		<div class="test-box">
			<div class="toeic-index">
				<h4 id="question_number">Question ${getRealIndex(arrayRealQuestion, data)}</h4>
				<div class="time-remain-question">
					${indexPart < 5 ? `remaining <span class="time-question" id="time_question"></span>`: ''}
				</div>
			</div>
			<div class="toiec-question">
				<div class="pic-question" id="pic_question">
					${data.imageUrl ? `<img src="${data.imageUrl}" alt="">` : ''}
				</div>
				<p class="text-question" id="text_question">
					${data.justText}
				</p>
			</div>
			<div class="for-listening text-center" id="audio_question">
				<div class="black">
				</div>
				${data.audioUrl ? `<audio src="${data.audioUrl}" autoplay="true" controls>` : ''}
			</div>
			<div class="toeic-select">
				<form class="toiec-form">
					<label class="radio-inline">
						<strong>A.</strong>
						<span id="answerA">${data.answerA}</span>
					</label>
					<label class="radio-inline">
						<strong>B.</strong>
						<span id="answerB">${data.answerB}</span>
					</label>
					<label class="radio-inline">
						<strong>C.</strong>
						<span id="answerC">${data.answerC}</span>
					</label>
					<label class="radio-inline">
						${indexPart != 2 ? `<strong>D.</strong><span>${data.answerD}</span>` : ''}
					</label>
				</form>
			</div>
		</div>
	`;
}

// For part 3, 4, 6 ,7
function renderForMultiQuestion(data) {
	//console.log("renderForMultiQuestion");
	question_contain.innerHTML = '';

	var childQuestion = [];
	var fatherQuestion;
	var regex = /^[0-9]{1}.[0-9]{1,2}$/g;
	// info question
	fatherQuestion = data.filter((question) => {
		return question.objective.match(regex);
	});	
	// child question
	childQuestion = data.filter((question) => {
		return !question.objective.match(regex);
	});

	// mark color
	markColorAnswerSheet(getRealIndex(arrayRealQuestion, childQuestion[0]), getRealIndex(arrayRealQuestion, childQuestion[childQuestion.length - 1]));
	// Render question father
	let infoQuestion = parseData(fatherQuestion[0]);
	question_contain.innerHTML = `
		<div class="title-part" >
			<h3 id="title_part_multi">${setTitlePart(infoQuestion.poolName)}</h3>
		</div>
		<div class="test-box">
			<div class="toeic-index">
				<h4 id="question_number_multi">Question ${getRealIndex(arrayRealQuestion, childQuestion[0])} - ${getRealIndex(arrayRealQuestion, childQuestion[childQuestion.length - 1])} </h4>
				<div class="time-remain-question">
					${indexPart < 5 ? `remaining <span class="time-question" id="time_question"></span>`: ''}
				</div>
			</div>
			<div class="toiec-question">
				<div class="pic-question" id="pic_question_multi">
					${infoQuestion.imageUrl ? `<img src="${infoQuestion.imageUrl}" alt="">` : ''}
				</div>
				<p class="text-question" id="text_question_multi">
					${infoQuestion.justText}
				</p>
			</div>
			<div class="for-listening text-center" id="audio_question_multi">
				<div class="black">
				</div>
				${infoQuestion.audioUrl ? `<audio src="${infoQuestion.audioUrl}" autoplay="true" controls>` : ''}
			</div>
			

			<div class="multi-question" id="multi_question">
				${	/*Render quesion child*/
					childQuestion.map((item, index) => {
						let question = parseData(item);
						return 			`<div class="toiec-question">
											<p class="num-question">
												${getRealIndex(arrayRealQuestion, item)}.
											</p>
											<div class="pic-question" id="pic_question">
												${question.imageUrl ? `<img src="${question.imageUrl}" alt="">` : ''}
											</div>
											<p class="text-question" id="text_question">
												${question.justText}
											</p>
										</div>
										<form class="toiec-form">
											<label class="radio-inline">
												<strong>A.</strong>
												<span>${question.answerA}</span>
											</label>
											<label class="radio-inline">
												<strong>B.</strong>
												<span>${question.answerB}</span>
											</label>
											<label class="radio-inline">
												<strong>C.</strong>
												<span>${question.answerC}</span>
											</label>
											<label class="radio-inline">
												<strong>D.</strong>
												<span>${question.answerD}</span>
											</label>
										</form>`;
					})
				}
			</div>
		</div>
	`;

}

function renderAnswerSheet(arrayRealQuestion) {

	//var localAnswers = JSON.parse(localStorage.getItem('infoMyTest'));
	console.log("data localData", localData);
	// if (localAnswers) {

	// }

	//answer_sheet = "";
	for (var i = 0; i < arrayRealQuestion.length; i++) {
		let numTitle;
		if (i < 9) {
			numTitle = "0" + (i + 1).toString();
		} else {
			numTitle = (i + 1).toString();
		}
		answer_sheet.innerHTML += `
		<div class="toeic-form" id="answer_form_${i + 1}">
			<label class="ques-no">${numTitle}.</label>
			<label class="radio-inline">
				<input type="radio" attrId="${arrayRealQuestion[i].id}" poolName="${arrayRealQuestion[i].poolName}" name="optradio[${arrayRealQuestion[i].id}]" value="A">
				<strong>A</strong>
			</label>
			<label class="radio-inline">
				<input type="radio" attrId="${arrayRealQuestion[i].id}" poolName="${arrayRealQuestion[i].poolName}" name="optradio[${arrayRealQuestion[i].id}]" value="B">
				<strong>B</strong>
			</label>
			<label class="radio-inline">
				<input type="radio" attrId="${arrayRealQuestion[i].id}" poolName="${arrayRealQuestion[i].poolName}" name="optradio[${arrayRealQuestion[i].id}]" value="C">
				<strong>C</strong>
			</label>
			<label class="radio-inline">
				${arrayRealQuestion[i].poolName != "part2" ? `<input type="radio" attrId="${arrayRealQuestion[i].id}" poolName="${arrayRealQuestion[i].poolName}" name="optradio[${arrayRealQuestion[i].id}]" value="D"><strong>D</strong>` : ''}
			</label>
		</div>
	`;
		// Set checked
		let temId = arrayRealQuestion[i].id;
	    $('input[attrId= '+ temId + ']').each(function(index) {
	    	// console.log("$(this).val", $(this).val());
	    	if (localData) {
	    		localData.arrSelectedAnswers.forEach(answer => {
	    			if(answer.id == temId) {
	    				if (answer.selectedAnswer == $(this).val()) {
	    					$(this).attr('checked', true);
	    					//console.log("$(this).val " + $(this).val() + " temId " + temId);
	    				}
	    				//$(this).val() == answer.selectedAnswer
						//$(this).prop('checked', true);
	    			}
	    		});
	    	}
	    });
	}

	// Event for radio checked
    $("input[type='radio']").on('click', function(e) {
       getCheckedRadio($(this).attr("attrId"), $(this).val(), $(this).attr("poolName"));
    });
}

function getRealQuestion(data) {
	var arrayRealQuestion = [];

	// Logic
	if(data.part1) loopQuestionSingle(data.part1, arrayRealQuestion);
	if(data.part2) loopQuestionSingle(data.part2, arrayRealQuestion);
	if(data.part3) loopQuestionMulti(data.part3, arrayRealQuestion);
	if(data.part4) loopQuestionMulti(data.part4, arrayRealQuestion);
	if(data.part5) loopQuestionSingle(data.part5, arrayRealQuestion);
	if(data.part6) loopQuestionMulti(data.part6, arrayRealQuestion);
	if(data.part7) loopQuestionMulti(data.part7, arrayRealQuestion);

	function loopQuestionSingle(part, array) {
		part.forEach(item => {
			array.push(item);
		});
	}	

	function loopQuestionMulti(part, array) {
		const regex = /^[0-9]{1}.[0-9]{1,2}$/g;
		part.forEach(item => {
			item.forEach(question => {
				if (!question.objective.match(regex)) {
					array.push(question);
				}
			});
		});
	}

	return arrayRealQuestion;
}

function getRealIndex(data, value) {
	let index = 0;
	index = data.findIndex(item => item.id === value.id) + 1;
	return index;
}

function setTitlePart(poolName) {
	var titlePart;
	let partName = poolName.slice(-1);
	switch (partName) {
		case "1":
			titlePart = "Part 1: Picture description";
			TIME_REMAINING_QUESTION_SECOND = 26;
			break;
		case "2":
			titlePart = "Part 2: Question and Response";
			TIME_REMAINING_QUESTION_SECOND = 26;
			break;
		case "3":
			titlePart = "Part 3: Short conversation";
			TIME_REMAINING_QUESTION_SECOND = 83;
			break;
		case "4":
			titlePart = "Part 4: Short talk";
			TIME_REMAINING_QUESTION_SECOND = 91;
			break;
		case "5":
			titlePart = "Part 5: Incomplete sentences";
			break;
		case "6":
			titlePart = "Part 6: Text completion";
			break;
		case "7":
			titlePart = "Part 7: Passages";
			break;
		default:
			titlePart = "Part ??: ??";
	}

	return titlePart;
}

// For go to next question
function nextQuestion() {
	let dataPart = mainData["part" + indexPart];
	let lengthPart = dataPart.length;	
	indexQuestion++;

	if (indexQuestion > lengthPart - 1) {
		indexPart++;
		indexQuestion = 0;
	}

	if ((indexQuestion == lengthPart -1) && indexPart == 7) {
		nextBtn.classList.add("hidden");
		submitBtn.classList.remove("hidden");
	}
	renderToeic(mainData);
}

// For go to previous question
function prevQuestion() {
	let dataPart = mainData["part" + indexPart];
	let lengthPart = dataPart.length;
	nextBtn.classList.remove("hidden");
	submitBtn.classList.add("hidden");
	indexQuestion--;

	if (indexQuestion < 0) {
		(indexPart > 1) ? indexPart-- : indexPart;
		indexQuestion = lengthPart - 1;
	}

	renderToeic(mainData);
}

function markColorAnswerSheet(firstParam, secondParam) {
	//console.log('firstParam ' + firstParam + ' secondParam ' + secondParam);
	var selectedQuestion;
	// reset
	for (var i = 0; i < toeicForm.length; i++) {
		toeicForm[i].classList.remove("mark-color");
	}	

	if (firstParam && secondParam) {
		for (var i = firstParam; i <= secondParam; i++) {
			//console.log('answer_form_' + i);
			selectedQuestion = _('answer_form_' + i);
			selectedQuestion.classList.add("mark-color");
		}
	} else if (firstParam && !secondParam) {
		selectedQuestion = _('answer_form_' + firstParam);
		selectedQuestion.classList.add("mark-color");
	} else {
		return;
	}

	// Auto Scroll AnswerSheet
	answer_sheet.scrollTop = _('answer_form_' + firstParam).offsetTop - 60;
}

function timer(duration, blockId, func) {
	var timer = duration,
		minutes, seconds;
		counterTimeToeic = setInterval(function() {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		blockId.innerHTML = minutes + ":" + seconds;

		if (--timer < 0) {
			timer = duration;
			clearInterval(counterTimeToeic);
			func();
		}
		//auto next
		if (indexPart < 5) {
			autoNextQuestion();			
		}

	    // Put the object into storage
	    var infoMyTest = {
	    	infoData: mainData,
			indexPart: indexPart,
			timeLeft: minutes,
			indexQuestion: indexQuestion,
	    	arrSelectedAnswers: arrSelectedAnswers
	    };
		localStorage.setItem('infoMyTest', JSON.stringify(infoMyTest));
	}, 1000);
}

function autoNextQuestion() {
	TIME_REMAINING_QUESTION_SECOND--;
	if (TIME_REMAINING_QUESTION_SECOND < 0) {
		TIME_REMAINING_QUESTION_SECOND = 20;
		nextQuestion();
	}
	_("time_question").innerHTML = TIME_REMAINING_QUESTION_SECOND;
}


function finishToeic() {
	checkAnswer();
	renderResult(mainData);
	resetDataToeic();
	console.log('correctPart', correctPart);
	console.log('getLengthEachPart', lengthPartAll);
}

function resetPage() {
	resetDataToeic();
	result_page.innerHTML = '';

	nextBtn.classList.remove("hidden");
	start_page.classList.remove("hidden");
	test_page.classList.add("hidden");
	result_page.classList.add("hidden");

	renderInfoToeic(mainData);
	location.reload();
}

function resetDataToeic() {
	indexPart = 1;
	indexQuestion = 0;
	correctListening = 0;
	correctReading = 0;
	scoreTOEIC = 0;
	arrSelectedAnswers = [];

	question_contain.innerHTML = '';
	answer_sheet.innerHTML = '';
	//result_page.innerHTML = '';

	clearInterval(counterTimeToeic);
	localStorage.removeItem("infoMyTest");
}

//External function to handle all radio selections
function getCheckedRadio(id, value, pool) {

    if (arrSelectedAnswers.findIndex(item => item.id == id) > -1) {
    	arrSelectedAnswers.splice(arrSelectedAnswers.findIndex(item => item.id == id), 1);
    } 
    // Push id value to array answer
    arrSelectedAnswers.push({
    	id: id,
    	pool: pool,
    	selectedAnswer: value
    });	

    // Submit ajax to server
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : "submit",
		data : JSON.stringify(arrSelectedAnswers),
		dataType : 'json',
		timeout : 100000,
		success : function(data) {
			console.log("SUCCESS: ", data);
		},
		error : function(e) {
			console.log("ERROR: ", e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});

    console.log("arrSelectedAnswers", arrSelectedAnswers);
}

function checkAnswer() {
	if (arrSelectedAnswers) {
		arrSelectedAnswers.forEach(answer => {
			let question = arrayRealQuestion.find(ques => ques.id === answer.id);
			if (question) {
				if (question.correctAnswer == answer.selectedAnswer) {
					scoreEachPart(answer.pool);
					let partName = answer.pool.slice(-1);
					if (partName == '1' || partName == '2' || partName == '3' || partName == '4') {
						correctListening++;
					} else if (partName == '5' || partName == '6' || partName == '7') {
						correctReading++;
					}
				}
			}
		});		
	}
	//console.log("correctListening", correctListening);
	//console.log("correctReading", correctReading);
	scoreTOEIC = parseInt(arrScoreListening[correctListening]) + parseInt(arrScoreReading[correctReading]);
	//console.log("correct ", correctListening + correctReading);
}

function scoreEachPart(poolName) {
	let partName = poolName.slice(-1);
	switch (partName) {
		case '1': 
			correctPart.part1 += 1;
			break; 
		case '2': 
			correctPart.part2 += 1;
			break; 
		case '3': 
			correctPart.part3 += 1;
			break; 
		case '4': 
			correctPart.part4 += 1;
			break; 
		case '5': 
			correctPart.part5 += 1;
			break; 
		case '6': 
			correctPart.part6 += 1;
			break; 
		case '7': 
			correctPart.part7 += 1;
			break; 
	}
}

function getLengthEachPart() {
	arrayRealQuestion.forEach(item => {
		let partName = item.poolName.slice(-1);
		switch (partName) {
			case '1': 
				lengthPartAll.part1 += 1;
				break; 
			case '2': 
				lengthPartAll.part2 += 1;
				break; 
			case '3': 
				lengthPartAll.part3 += 1;
				break; 
			case '4': 
				lengthPartAll.part4 += 1;
				break; 
			case '5': 
				lengthPartAll.part5 += 1;
				break; 
			case '6': 
				lengthPartAll.part6 += 1;
				break; 
			case '7': 
				lengthPartAll.part7 += 1;
				break; 
		}
	});
}

function renderResult(data) {
	test_page.classList.add("hidden");
	result_page.classList.remove("hidden");

	result_page.innerHTML = `
		<div class="row">
			<div class="col-sm-6">
				<div id="chart_radar"></div>
			</div>
			<div class="col-sm-6">
				<div class="info-result">
					<p><b>Assigment:</b> ${choseAssessment.assessmentTitle}</p>
					<p><b>Time Limit:</b> ${choseAssessment.timeLimit_hour} hr</p>
					<p><b>Correct Listening:</b> ${correctListening} - <b>Correct Reading:</b> ${correctReading}</p>
					<h2>SCORE <span class="score-toeic">${scoreTOEIC}</span></h2>
					<h3><b>Evaluate:</b> ${evaluateTest()}</h3>
					<h3>${suggestCommentFunc()}</h3>
					<button type="button" class="btn btn-danger" id="resetBtn" onclick="resetPage()">New Test</button>
				</div>
			</div>
		</div>

	`;

	drawScoreChart();
}

function suggestCommentFunc() {
	let text = '';
	for (var i = 1; i <= 7; i++) {
		let percentPart = (correctPart['part'+i]/lengthPartAll['part'+i])*100;
		if (percentPart < 50) {
			text += "Part " + i + ", ";
		}
	}

	return suggestComment.improve + text;
}

function evaluateTest() {
	let text = '';
	if (correctListening > 50 && correctReading > 50) {
		text = suggestComment.good;
	} else if (correctListening < 50 && correctReading < 50) {
		text = suggestComment.bad;
	} else if (correctListening < 50 && correctReading > 50) {
		text = suggestComment.improveListening;
	} else if (correctListening > 50 && correctReading < 50) {
		text = suggestComment.improveReading;
	} else {
		text = suggestComment.normal;
	}

	return text;
}