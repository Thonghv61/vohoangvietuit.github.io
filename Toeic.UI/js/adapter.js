// Parse data to new json data for toeic test
function parseData(data) {
	var dataParse = {};

	// parse data url from question
	let textData = parseTextData(data.question);
	dataParse = {
		id: data.id,
		poolName: data.poolName,
		imageUrl: textData.image,
		audioUrl: textData.audio,
		justText: textData.justText.replace("[Blank]",""),
		answerA: data.answers.answerA.replace("[Blank]",""),
		answerB: data.answers.answerB.replace("[Blank]",""),
		answerC: data.answers.answerC.replace("[Blank]",""),
		answerD: data.answers.answerD.replace("[Blank]",""),
		//correctAnswer: data.correctAnswer,
		objective: textData.objective,
		feedbackCorrect: data.feedbackCorrect,
		feedbackInCorrect: data.feedbackInCorrect
	};
	return dataParse;
}

function parseTextData(text) {
	var textData = {
		justText: "",
		image: "",
		audio: "",
		objective: ""
	};
	var textLength = text.length;

	var checkAudio = text.includes("audio=");
	var indexAudio = text.search("audio=") + 6;
	var lastIndexAudio = text.search(".mp3") + 4;
	// console.log("checkAudio " + checkAudio + " indexAudio " + indexAudio + " lastIndexAudio " + lastIndexAudio);

	var checkImage = text.includes("image=");
	var indexImage = text.search("image=") + 6;
	var lastIndexImage = text.search(".jpg") + 4;
	// console.log("checkImage " + checkImage +  " indexImage " + indexImage + " lastIndexImage " + lastIndexImage);

	if (checkAudio && checkImage) {
		// slice audio url
		textData.audio = text.slice(indexAudio, lastIndexAudio);
		// slice img url
		textData.image = text.slice(indexImage, lastIndexImage);
	} else if(checkAudio && !checkImage){
		// slice audio url
		textData.audio = text.slice(indexAudio, lastIndexAudio);

		// slice text
		if (text.search("audio=") > 0) {
			textData.justText = text.slice(0, text.search("audio="));
		} else {
			textData.justText = text.slice(lastIndexAudio, textLength);
		}
	} else if(!checkAudio && checkImage) {
		// slice img url
		textData.image = text.slice(indexImage, lastIndexImage);

		// slice text
		if (text.search("image=") > 0) {
			textData.justText = text.slice(0, text.search("image="));
		} else {
			textData.justText = text.slice(lastIndexImage, textLength);
		}
	} else if (!checkAudio && !checkImage) {
		textData.justText = text;
	} else {
		textData = null;
	}

	return textData;
}

function parseMainData(assessmentData) {
	var dataParse = {};

	assessmentData.partsContents.forEach((item, index) => {
		let partName = item.poolName.slice(-1);
		if (partName == 1 || partName == 2 || partName == 5) {
			dataParse["part" + partName] = parseToArrayPart(item);
		} else {
			dataParse["part" + partName] = parseToArrayPartMulti(item);
		}
		
	});
	return dataParse;
}

//let test = parseMainData(assessmentData);
//console.log("test", test);

function parseToArrayPart(obj) {
	let newArray = [];

	obj.itemContents.forEach((item, index) => {
		newArray.push({
			"id": obj.partId + index,
			"poolName": obj.poolName,
			"question": item.content.replace("objective=",""),
			"answers": {
				"answerA": (item.answers.length > 0) ? item.answers.find(answer => answer.label == "A").text : '',
				"answerB": (item.answers.length > 0) ? item.answers.find(answer => answer.label == "B").text : '',
				"answerC": (item.answers.length > 0) ? item.answers.find(answer => answer.label == "C").text : '',
				"answerD": (item.answers.length > 0) ? item.answers.find(answer => answer.label == "D").text : '',				
			},
			"correctAnswer": item.key,
			"objective": getObjective(item.content),
			"feedbackCorrect": "Corret",
			"feedbackInCorrect": "Incorrect"
		});
	});

	return newArray;
}

function parseToArrayPartMulti(obj) {
	let newArray = [];
	let mainArray = [];

	const regex = /^[0-9]{1}.[0-9]{1,2}$/g;
	obj.itemContents.forEach(item => {
		if (getObjective(item.content).match(regex)) {
			mainArray.push(getObjective(item.content));
		}
	});
	mainArray.sort();
	console.log("mainArray", mainArray);

	for (var mindex = 1; mindex <= mainArray.length; mindex++) {
		let childArray = [];
		let data = mainArray[mindex-1];
		for (var index = 1; index <= obj.itemContents.length; index++) {
			let item = obj.itemContents[index-1];			
			let objective = getObjective(item.content);
			let my1 = mindex.toString().length == 1 ? '0' + mindex.toString() : mindex.toString(); 
			let my2 = index.toString().length == 1 ? '0' + index.toString() : index.toString(); 
			if ((objective.slice(0, data.length).match(data) && ((objective.length - data.length) == 2)) || objective == data) {
				childArray.push({
					"id": obj.partId.toString() + my1 + my2,
					"poolName": obj.poolName,
					"question": item.content.replace(item.content.slice(item.content.indexOf("objective="), item.content.length), ""),
					"answers": {
						"answerA": (item.answers.length > 0) ? item.answers.find(answer => answer.label == "A").text : '',
						"answerB": (item.answers.length > 0) ? item.answers.find(answer => answer.label == "B").text : '',
						"answerC": (item.answers.length > 0) ? item.answers.find(answer => answer.label == "C").text : '',
						"answerD": (item.answers.length > 0) ? item.answers.find(answer => answer.label == "D").text : '',				
					},
					"correctAnswer": item.key.length > 1 ? "" : item.key,
					"objective": getObjective(item.content),
					"feedbackCorrect": "Corret",
					"feedbackInCorrect": "Incorrect"
				});				
			}
		}
		newArray.push(childArray);
	}

	return newArray;
}

function getObjective(content) {
	var objective = "";
	var checkObjective = content.includes("objective=");
	var indexObjective = content.search("objective=") + 10;

	if (checkObjective) {
		objective = content.slice(indexObjective, content.length);
	}

	return objective;
}