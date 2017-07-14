var myData = {
    "Kém": 60,
    "Xuất sắc": 10,
    "Tốt": 20,
    "Trung bình": 10,
};

var mySetting = {
	canvas: myCanvas,
	data: myData,
	colors: ["green", "blue", "red", "orange"],
	doughnutHoleSize: 0.5,
	detail: myDetail
};

var myPieChart = (function() {
	var canvas = mySetting.canvas;
	var ctx = canvas.getContext("2d");
	var colors = mySetting.colors;
	var val;

	/*----------  Private function ----------*/
	var drawPieSlice = function(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.closePath();
		ctx.fill();
	};

	var privateDrawChart = function() {
		var total_value = 0;
		var color_index = 0;
		for(var categ in mySetting.data) {
			val = mySetting.data[categ];
			total_value += val;
		}

		var start_angle = 0;
		 for(categ in mySetting.data) {
		 	val = mySetting.data[categ];
		 	var slice_angle = 2 * Math.PI * val/total_value;

		 	drawPieSlice(
		 		ctx, 
		 		canvas.width/2,
		 		canvas.height/2,
		 		Math.min(canvas.width/2, canvas.height/2),
		 		start_angle,
		 		start_angle + slice_angle,
		 		colors[color_index%colors.length]
		 	);

		 	start_angle += slice_angle;
		 	color_index++;
		 }

        //drawing a white circle over the chart
        //to create the doughnut chart
        if (mySetting.doughnutHoleSize){
            drawPieSlice(
                ctx,
                canvas.width/2,
                canvas.height/2,
                mySetting.doughnutHoleSize * Math.min(canvas.width/2,canvas.height/2),
                0,
                2 * Math.PI,
                "#fff"
            );
        }

		start_angle = 0;
		//to draw number
		for (categ in mySetting.data) {
			val = mySetting.data[categ];
			slice_angle = 2 * Math.PI * val / total_value;
			var pieRadius = Math.min(canvas.width / 2, canvas.height / 2);
			var labelX = canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
			var labelY = canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);

			if (mySetting.doughnutHoleSize) {
				var offset = (pieRadius * mySetting.doughnutHoleSize) / 2;
				labelX = canvas.width / 2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
				labelY = canvas.height / 2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
			}



			var labelText = Math.round(100 * val / total_value);
			ctx.fillStyle = "white";
			ctx.font = "bold 20px Arial";
			ctx.fillText(labelText + "%", labelX, labelY);

			start_angle += slice_angle;

		}
	};

    var privateDrawDetail = function() {
	    if (mySetting.detail){
	        color_index = 0;
	        var legendHTML = "";
	        for (categ in mySetting.data){
	            legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
	        }

	        mySetting.detail.innerHTML = legendHTML;

	    }
    };

    /*----------  End Private function ----------*/

    /*----------  Public function ----------*/
    var publicDrawChart = function() {
    	privateDrawChart();
    	privateDrawDetail();
    };
    /*----------  End Public function ----------*/
    return {
    	draw: publicDrawChart
    };
})();
 
myPieChart.draw();