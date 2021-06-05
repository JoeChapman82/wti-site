(function () {
	var dashboardData = document.getElementById('dashboardData').innerText;
	dashboardData = JSON.parse(dashboardData);
	var monthCounts = dashboardData.monthCounts;
	var classCounts = dashboardData.classCounts;
	var groupCounts = dashboardData.groupCounts;
	var zoneCounts = dashboardData.zoneCounts;
	var lineLabels = Object.values(monthCounts).map(function (x) {
		return x.date;
	});
	var lineValues = Object.values(monthCounts).map(function (x) {
		return x.count;
	});
	var barLabels = Object.keys(classCounts);
	var barValues = Object.values(classCounts);
	var pieLabels = Object.keys(groupCounts);
	var pieValues = Object.values(groupCounts);
	console.log(pieValues, pieLabels);
	var pie2Labels = Object.keys(zoneCounts);
	var pie2Values = Object.values(zoneCounts);

	var data = {
		labels: lineLabels.reverse(),
		series: [lineValues.reverse()],
	};

	var options = {
		showArea: true,
		classNames: {
			area: 'wti-area',
		},
		axisY: {
			onlyInteger: true,
		},
	};

	var responsiveOptions = [
		[
			'screen and (min-width: 641px) and (max-width: 1024px)',
			{
				showPoint: false,
				axisX: {
					labelInterpolationFnc: function (value) {
						return value.slice(0, 3);
					},
				},
			},
		],
		[
			'screen and (max-width: 640px)',
			{
				showLine: false,
				axisX: {
					labelInterpolationFnc: function (value) {
						return value[0];
					},
				},
			},
		],
	];

	new Chartist.Line('#dashboardLineChart', data, options, responsiveOptions);

	console.log(barLabels, barValues);

	new Chartist.Bar(
		'#dashboardBarChart',
		{
			labels: barLabels,
			series: [barValues],
		},
		{
			classNames: {
				bar: 'wti-bar',
			},
		}
	);

	// new Chartist.Pie('#dashboardPieChart', {
	//     labels: pieLabels,
	//     series: pieValues,
	// }, {
	//     labelInterpolationFnc: function(value, index) {
	//         var percentage = Math.round(pieValues[index] / pieValues.reduce(function(a, b) {
	//             return a + b;
	//         }) * 100) + '%';
	//         return percentage;
	//     },
	//     startAngle: 270,
	//     labelOffset: 15,
	//     showLabel: true,
	//     plugins: [
	//         Chartist.plugins.legend()
	//     ]
	// });

	new Chartist.Pie(
		'#dashboardPieChart2',
		{
			labels: pie2Labels,
			series: pie2Values,
		},
		{
			labelInterpolationFnc: function (value, index) {
				var percentage =
					Math.round(
						(pie2Values[index] /
							pie2Values.reduce(function (a, b) {
								return a + b;
							})) *
							100
					) + '%';
				return percentage;
			},
			startAngle: 270,
			showLabel: true,
			labelOffset: 15,
			plugins: [Chartist.plugins.legend()],
		}
	);

	// setTimeout(function() {
	//     document.querySelectorAll('#dashboardPieChart2 [class*="ct-series-"]').forEach(function(thing) {
	//         console.log(thing);
	//     });
	// }, 1);
})();
