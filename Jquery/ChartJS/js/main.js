$(document).ready(function(e) {
	var array_hour_c = [30, 28, 27, 29, 30, 31, 29, 32, 27, 32, 26, 33, 34, 30, 26, 24, 30, 34, 35, 28, 27, 18, 30, 24, 20];
	var array_hour_percent = [20, 70, 55, 14, 36, 25, 58, 52, 41, 62, 52, 70, 10, 26, 25, 25, 14, 16, 58, 58, 40, 26, 10, 51, 15];

	var canvas = new fabric.Canvas('canvas');
	fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

	Array.prototype.max = function() {
		return Math.max.apply(null, this);
	};

	Array.prototype.min = function() {
		return Math.min.apply(null, this);
	};

	function makeLine(coords) {
		return new fabric.Line(coords, {
			fill: 'gray',
			stroke: 'gray',
			strokeWidth: 1,
			selectable: false
		});
	}

	function makeGrayLine(coords) {
		return new fabric.Line(coords, {
			fill: 'gray',
			stroke: 'gray',
			strokeWidth: 1,
			selectable: false
		});
	}

	function makeGrayLineStrong(coords) {
		return new fabric.Line(coords, {
			fill: 'gray',
			stroke: 'gray',
			strokeWidth: 2,
			selectable: false
		});
	}

	function makeRedLine(coords) {
		return new fabric.Line(coords, {
			fill: 'red',
			stroke: 'red',
			strokeWidth: 2,
			selectable: false
		});
	}

	function makeBlueLine(coords) {
		return new fabric.Line(coords, {
			fill: 'blue',
			stroke: 'blue',
			strokeWidth: 2,
			selectable: false
		});
	}

	function makeText(text, left, top) {
		return new fabric.Text(text, {
			fontSize: 12,
			left: left,
			top: top,
			fill: 'black',
			originX: 'center',
			originY: 'center',
			selectable: false
		});
	}

	function makeTitle(text, left, top) {
		return new fabric.Text(text, {
			fontSize: 12,
			left: left,
			top: top,
			fill: 'black',
			originX: 'right',
			originY: 'center',
			selectable: false
		});
	}

	function makeRedText(text, left, top) {
		return new fabric.Text(text, {
			fontSize: 12,
			left: left,
			top: top,
			fill: 'red',
			originX: 'right',
			originY: 'center',
			selectable: false
		});
	}

	function makeBlueText(text, left, top) {
		return new fabric.Text(text, {
			fontSize: 12,
			left: left,
			top: top,
			fill: 'blue',
			originX: 'right',
			originY: 'center',
			selectable: false
		});
	}

	function makeCircle(left, top) {
		return new fabric.Circle({
			left: left + 0.5,
			top: top,
			strokeWidth: 0.5,
			radius: 1,
			fill: 'black',
			stroke: 'black',
			selectable: false
		});
	}

	function makeTriangle(left, top, angle) {
		return new fabric.Triangle({
			width: 4,
			height: 4,
			fill: 'black',
			left: left + 0.5,
			top: top,
			angle: angle,
			selectable: false
		});
	}

	//draw text
	text_value = makeTitle('温度・湿度２４時間データ', 550, 30);
	canvas.add(text_value);

	//call function drawingFramesChart
	drawingFramesChart(array_hour_c, array_hour_percent);

	/**
	 * draw line and text
	 * @param {array_c} 
	 * @param {array_percent} 
	 * Ox - 720px, Oy - 420px
	 */
	function drawingFramesChart(array_c, array_percent) {
		var main_layer = new fabric.Group([], {
			left: 150,
			top: 50,
			selectable: false
		});
		//draw y (temperature C) X line
		frameLength_y_c = 80;
		text_value = makeRedText('温度\n ºC', -5, -10);
		main_layer.add(text_value);
		var temp_c = 40;
		for (i = 0; i <= 5; i++) {
			if (i == 0) {	
				gray_line = makeGrayLineStrong([720, frameLength_y_c * i + 20, -100, frameLength_y_c * i + 20]);
			} else {
				gray_line = makeGrayLine([720, frameLength_y_c * i + 20, -100, frameLength_y_c * i + 20]);
			}
			text_value = makeRedText(temp_c.toString(), -10, frameLength_y_c * i + 13);
			temp_c -= 10;
			main_layer.add(text_value, gray_line);
		}
		//draw y (temperature %) 
		frameLength_y_temperature = 80;
		text_value = makeBlueText('湿度\n %', -50, -10);
		main_layer.add(text_value);
		for (i = 0; i <= 5; i++) {
			text_value = makeBlueText((100 - i * 20).toString(), -55, frameLength_y_temperature * i + 13);
			main_layer.add(text_value);
		}
		//draw x (hour or day) y line

		text_value = makeText('時間', 750, 420 + 7);
		line = makeGrayLineStrong([-100, 420, 721, 420]);
		main_layer.add(text_value, line);

		frameLength_x_hour = 30;
		for (i = 0; i <= 24; i++) {

			if ((24 - i) % 10 == 0 || i == 0) {
				gray_line = makeGrayLineStrong([frameLength_x_hour * i, 420, frameLength_x_hour * i, 20]);
				text_value = makeText(((24 - i) * -1).toString(), frameLength_x_hour * i + 4, 420 + 7);
				main_layer.add(text_value, gray_line);
			} else {
				gray_line = makeGrayLine([frameLength_x_hour * i, 420, frameLength_x_hour * i, 20]);
				main_layer.add(gray_line);
			}

		}

		//call function draw chart
		drawingChart(array_c, array_percent, frameLength_x_hour);

		canvas.add(main_layer);
		canvas.sendBackwards(main_layer);

	}

	/**
	 * draw chart
	 * @param {array_1} 
	 * @param {array_2} 
	 * @param {line_lengh}
	 */
	function drawingChart(array_1, array_2, line_length) {
		var main_chart = new fabric.Group([], {
			left: 150,
			top: 70,
			selectable: false
		});

		for (i = 0; i < array_1.length - 1; i++) {

			r_x1 = 320 - ((array_1[array_1.length - 1 - i]) * 8);
			r_x2 = 320 - ((array_1[array_1.length - 2 - i]) * 8);

			b_x1 = 400 - ((array_2[array_2.length - 1 - i]) * 4);
			b_x2 = 400 - ((array_2[array_2.length - 2 - i]) * 4);

			line_red = makeRedLine([line_length * i, r_x1, line_length * (i + 1), r_x2]);
			line_blue = makeBlueLine([line_length * i, b_x1, line_length * (i + 1), b_x2]);

			main_chart.add(line_red, line_blue);
		}
		canvas.add(main_chart);
	}
});