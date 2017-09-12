//Load file text json
function loadFileAndParseData() {
	var file, fr;

	//check file extensions
    var filePath = fileInput.value;
    var allowedExtensions = /(\.json)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Please open file having extensions .json only.');
        fileInput.value = '';
        return;
    }

	if (typeof window.FileReader !== 'function') {
		alert("The file API isn't supported on this browser yet.");
		return;
	}

	if (!fileInput) {
		alert("Couldn't find the file input element.");
	} else if (!fileInput.files) {
		alert("This browser doesn't seem to support the `files` property of file inputs.");
	} else if (!fileInput.files[0]) {
		alert("Please select a file");
	} else {
		file = fileInput.files[0];
		fr = new FileReader();
		fr.onload = function(e) {
			//Parse text json to json object
			var jsonText = e.target.result;
			resultData = JSON.parse(jsonText);

			//fileOutput.innerHTML = JSON.stringify(resultData);
		};
		fr.readAsText(file);
		fileOutput.innerHTML = file.name;
	}
}

//read file from url
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                var allText = rawFile.responseText;
                resultData = JSON.parse(allText);
                //alert(allText);
            }
        }
    };
    rawFile.send(null);
}

// calculate json data and return data for group radar chart 1
function calculateDataGroup(dataDetail) {
	//data for group radar chart
	var dataGroupPercent = [];
	//group data to group
	var dataGroupBy =  groupBy("group", dataDetail);
	//console.log(dataGroupBy);
	//array name group
	var allGroup = Object.keys(dataGroupBy);

	var i, j;
	var total = 0;
	for (i in allGroup) {
		total += dataGroupBy[allGroup[i]].length;
	}

	//push new data object to array
	for (j in allGroup) {
		dataGroupPercent.push({
			"label": allGroup[j],
			"value": Math.round(((dataGroupBy[allGroup[j]].length / total) * 100) * 10) / 10
		});
	}

	//console.log(dataGroupPercent);
	return dataGroupPercent;

}

// calculate json data and return data for skill radar chart 2
function calculateDataSkill(groupName, dataDetail) {
	var i, j, total, average;
	//data for group radar chart
	var dataSkills = [];

	//group all data to group
	var dataGroupBy =  groupBy("group", dataDetail);

	//data in groupName 
	var dataInGroup = dataGroupBy[groupName];
	//console.log(dataGroupBy[groupName]);

	//all skill
	var skillarr = Object.keys(dataInGroup[0].skills);
	console.log(skillarr);
	
	for (i in skillarr) {
		//reset value
		total = 0;
		average = 0;

		//count total value each skill
		for (j in dataInGroup) {
			total += dataInGroup[j].skills[skillarr[i]];
		}
		//Count average each skill and round 
		average = Math.round((total/dataInGroup.length) * 100) / 100;

		dataSkills.push({
			"label": skillarr[i],
			"value": average
		});
	}

	return dataSkills;

}


//group data by propertyn name
function groupBy(propertyName, array) {
	var groupElements = {};

	for (var i = 0; i < array.length; i++) {
		var element = array[i];

		//value equal with property array loop i
		var value = element[propertyName];

		var group = groupElements[value];
		if (group === undefined) {
			//equal array
			group = [element];
			groupElements[value] = group;
		} else {
			group.push(element);
		}
	}

	return groupElements;
}
