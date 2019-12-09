function initSquiggle(id) {
	var ctx = $(id)[0].getContext('2d');
	window.squiggleChart = new Chart(ctx, {
		// The type of chart we want to create
		type : 'line',

		// The data for our dataset
		data : {},

		// Configuration options go here
		options : {
			maintainAspectRatio : false,
			
			tooltips : {
				enabled : false
			},
			
			legend : {
				onHover : function(event, legendItem) {
					var index = legendItem.datasetIndex;
					var ci = this.chart;
    				var meta = ci.getDatasetMeta(index);
    				ci.data.datasets[index].borderWidth = 4;
    				ci.update();
    				//console.log(index);
				},
				onLeave : function(event, legendItem) {
					var index = legendItem.datasetIndex;
					var ci = this.chart;
    				var meta = ci.getDatasetMeta(index);
    				ci.data.datasets[index].borderWidth = 2;
    				ci.update();
				}
			},

			scales : {
				xAxes : [{
					type : 'linear',
					display : true,
					scaleLabel : {
						display : true,
						labelString : 'bp'
					}
				}],
				yAxes : [{
					type : 'linear',
					display : true,
					scaleLabel : {
						display : true,
						labelString : 'value'
					}
				}]
			},

			plugins : {
				zoom : {
					// Container for pan options
					pan : {
						// Boolean to enable panning
						enabled : true,

						mode : 'xy',

						rangeMin : {
							// Format of min pan range depends on scale type
							x : null,
							y : null
						},
						rangeMax : {
							// Format of max pan range depends on scale type
							x : null,
							y : null
						}
					},

					// Container for zoom options
					zoom : {
						// Boolean to enable zooming
						enabled : true,

						// Enable drag-to-zoom behavior
						drag : false,

						mode : 'xy',

						rangeMin : {
							// Format of min zoom range depends on scale type
							x : null,
							y : null
						},
						rangeMax : {
							// Format of max zoom range depends on scale type
							x : null,
							y : null
						},

						// Speed of zoom via mouse wheel
						// (percentage of zoom on a wheel event)
						speed : 0.1,
					}
				}
			}
		}
	});
}

function dnaToDataSquiggle(dna) {
	var dnaArray = dna.split("");
	var data = [];
	var prev = {
		x : 0,
		y : 0
	};
	for (var i = 0; i < dnaArray.length; i++) {
		data.push(prev);
		switch (dnaArray[i]) {
		case "A":
			data.push({
				x : prev.x + 0.5,
				y : prev.y + 0.5
			});
			data.push({
				x : prev.x + 1,
				y : prev.y
			});
			break;
		case "T":
			data.push({
				x : prev.x + 0.5,
				y : prev.y - 0.5
			});
			data.push({
				x : prev.x + 1,
				y : prev.y - 1
			});
			break;
		case "G":
			data.push({
				x : prev.x + 0.5,
				y : prev.y + 0.5
			});
			data.push({
				x : prev.x + 1,
				y : prev.y + 1
			});
			break;
		case "C":
			data.push({
				x : prev.x + 0.5,
				y : prev.y - 0.5
			});
			data.push({
				x : prev.x + 1,
				y : prev.y
			});
			break;
		case "-":
			data.push({
				x : prev.x + 0.5,
				y : prev.y
			});
			data.push({
				x : prev.x + 1,
				y : prev.y
			});
			break;
		}
		prev = data.pop();
	}
	data.push(prev);

	return data;
}

function setDataSquiggle(d) {
	var newDatasets = [];
	for (var i = 0; i < d.length; i++) {
		newDatasets.push({
			label : d[i].id,
			fill : false,
			borderColor : window.colors[i],
			lineTension : 0,
			pointRadius : 0,
			borderWidth : 2
		});
		newDatasets[i].data = dnaToDataSquiggle(d[i].sequence);
	}
	squiggleChart.data.datasets = newDatasets;
	squiggleChart.update();
}
