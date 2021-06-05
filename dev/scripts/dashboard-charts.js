(function () {
	const dashboardData = JSON.parse(
		document.getElementById('dashboardData').innerText
	);
	const monthCounts = dashboardData.monthCounts;
	const classCounts = dashboardData.classCounts;
	const groupCounts = dashboardData.groupCounts;
	const zoneCounts = dashboardData.zoneCounts;
	const newCasesLabels = Object.values(monthCounts).map(function (x) {
		return x.date;
	});
	const newCasesValues = Object.values(monthCounts).map(function (x) {
		return x.count;
	});
	const casesByClassLabels = Object.keys(classCounts);
	const casesByClassValues = Object.values(classCounts);
	const totalCasesByGroupLabels = Object.keys(groupCounts);
	const totalCasesByGroupValues = Object.values(groupCounts);
	const casesByZoneLabels = Object.keys(zoneCounts);
	const casesByZoneValues = Object.values(zoneCounts);

	function getSanitizedLabels(labels) {
		return labels.map(l => (l.length > 20 ? `${l.substr(0, 20 - 1)}…` : l));
	}

	function newCasesHandled(labels, values) {
		const color = palette('tol-rainbow', 1).map(hex => `#${hex}`)[0];
		const config = {
			type: 'line',
			data: {
				labels: getSanitizedLabels(labels),
				datasets: [
					{
						label: 'Last 12 months',
						data: values,
						fill: false,
						borderColor: color,
						backgroundColor: color,
						tension: 0.1,
					},
				],
			},
			options: {
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							display: true,
						},
					},
					x: {
						grid: {
							display: false,
						},
					},
				},
			},
		};
		new Chart(document.querySelector('#newCasesHandled'), config);
	}
	newCasesHandled(newCasesLabels, newCasesValues);

	function totalCasesByClass(labels, values) {
		const config = {
			type: 'bar',
			data: {
				labels: getSanitizedLabels(labels),
				datasets: [
					{
						label: 'Total Cases (by Class)',
						data: values,
						backgroundColor: palette('tol-rainbow', values.length).map(
							hex => `#${hex}`
						),
						borderWidth: 0,
					},
				],
			},
			options: {
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							display: false,
						},
					},
					x: {
						grid: {
							display: false,
						},
					},
				},
			},
		};
		new Chart(document.querySelector('#totalCasesByClassChart'), config);
	}
	totalCasesByClass(casesByClassLabels, casesByClassValues);

	function totalCasesByZone(labels, values) {
		const config = {
			type: 'pie',
			data: {
				labels: getSanitizedLabels(labels),
				datasets: [
					{
						label: 'Total Cases (by Zone)',
						data: values,
						backgroundColor: palette('tol-rainbow', values.length).map(
							hex => `#${hex}`
						),
						hoverOffset: 4,
					},
				],
			},
			options: {
				maintainAspectRatio: false,
			},
		};
		new Chart(document.querySelector('#totalCasesByZoneChart'), config);
	}
	totalCasesByZone(casesByZoneLabels, casesByZoneValues);

	function totalCasesByGroupName(labels, values) {
		const config = {
			type: 'doughnut',
			data: {
				labels: getSanitizedLabels(labels),
				datasets: [
					{
						label: 'Total Cases (by Group)',
						data: values,
						backgroundColor: palette('tol-rainbow', values.length).map(
							hex => `#${hex}`
						),
						borderWidth: 0,
					},
				],
			},
			options: {
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'right',
					},
				},
			},
		};

		new Chart(document.querySelector('#totalCasesByGroupName'), config);
	}
	totalCasesByGroupName(totalCasesByGroupLabels, totalCasesByGroupValues);
})();
