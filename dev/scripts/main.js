(function () {
	if (
		document.querySelector('.wti-case-tab') &&
		document.querySelector('.form-error-message')
	) {
		var firstError = document.querySelector('.form-error-message');
		var tab = findParentOfElementWithClass(firstError, 'wti-case-tab');
		var tabSelector = document.querySelector('[data-reveal="' + tab.id + '"]');
		console.log(tabSelector);
		switchTabs(false, tabSelector);
	}

	document.querySelectorAll('.wti-clickable-row').forEach(function (item) {
		item.addEventListener('click', clickLinkedElement);
	});

	document
		.querySelectorAll('.wti-case-tabs-list-link')
		.forEach(function (item) {
			item.addEventListener('click', switchTabs);
		});

	document
		.querySelectorAll('.wti-case-tab-success-message-wrapper')
		.forEach(function (item) {
			setTimeout(function () {
				item.classList.add('fully-opaque');
			}, 3000);
		});

	document.querySelectorAll('.wti-sortable-table').forEach(function (item) {
		item.addEventListener('click', sortTable);
	});

	function clickLinkedElement() {
		document.getElementById(this.dataset.link).click();
	}

	function switchTabs(e, tab) {
		var element = tab ? tab : this;
		document
			.querySelectorAll('.wti-case-tabs-list-link')
			.forEach(function (item) {
				document.getElementById(item.dataset.reveal).classList.add('js-hidden');
				item.parentNode.classList.remove('wti-case-tabs-list-item-active');
			});
		document
			.getElementById(element.dataset.reveal)
			.classList.remove('js-hidden');
		element.parentNode.classList.add('wti-case-tabs-list-item-active');
		document.getElementById('activeTab').value = element.dataset.reveal;
	}

	function sortTable(e) {
		document
			.querySelectorAll('.wti-table-icon-selected')
			.forEach(function (item) {
				item.classList.remove('wti-table-icon-selected');
			});
		var element = findParentOfElementType(e.target, 'TH');
		if (!element) {
			return;
		}
		var column = element.dataset.column;
		var upIcon = document.getElementById('wtiTableSortUp' + column);
		var downIcon = document.getElementById('wtiTableSortDown' + column);
		var table,
			rows,
			switching,
			i,
			x,
			y,
			shouldSwitch,
			dir,
			switchcount = 0;
		table = document.getElementById('wtiTable');
		switching = true;
		dir = 'asc';
		while (switching) {
			switching = false;
			rows = table.rows;
			for (i = 1; i < rows.length - 1; i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName('TD')[column];
				y = rows[i + 1].getElementsByTagName('TD')[column];
				if (dir === 'asc' && y) {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				} else if (dir === 'desc' && y) {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount === 0 && dir === 'asc') {
					dir = 'desc';
					switching = true;
				}
			}
		}
		if (dir === 'asc') {
			downIcon.classList.add('wti-table-icon-selected');
		} else {
			upIcon.classList.add('wti-table-icon-selected');
		}
	}

	function findParentOfElementType(element, type) {
		if (element.tagName === type) {
			return element;
		}
		if (element.tagName === 'HTML') {
			return false;
		}
		return findParentOfElementType(element.parentNode, type);
	}

	function findParentOfElementWithClass(element, className) {
		if (element.classList.contains(className)) {
			return element;
		}
		if (element.tagName === 'HTML') {
			return false;
		}
		return findParentOfElementWithClass(element.parentNode, className);
	}

	document
		.querySelectorAll('input[type="radio"], input[type="checkbox"], select')
		.forEach(function (revealer) {
			// adds the event listener for clicks
			revealer.addEventListener('change', revealHiddenOptions);
			// reveals neccesary inputs on load
			if (revealer.checked && revealer.dataset.target) {
				document
					.getElementById(revealer.dataset.target)
					.classList.remove('js-hidden');
			} else if (revealer.checked && revealer.dataset.hide) {
				document
					.getElementById(revealer.dataset.hide)
					.classList.add('js-hidden');
			} else if (revealer.tagName === 'SELECT') {
				revealer.childNodes.forEach(function (child) {
					if (child.selected && child.dataset.target) {
						document
							.getElementById(child.dataset.target)
							.classList.remove('js-hidden');
					}
				});
			}
		});

	function revealHiddenOptions(e) {
		if (this.tagName === 'SELECT') {
			for (var i = 0; i < this.options.length; i++) {
				if (this.options[i].dataset.target) {
					var el = document.getElementById(this.options[i].dataset.target);
					if (!el.classList.contains('js-hidden')) {
						el.classList.add('js-hidden');
					}
				}
			}
			if (
				document.getElementById(this.options[this.selectedIndex].dataset.target)
			) {
				document
					.getElementById(this.options[this.selectedIndex].dataset.target)
					.classList.remove('js-hidden');
			}
		}
		if (this.checked && this.dataset.target) {
			this.parentNode.parentNode.childNodes.forEach(function (child) {
				if (
					typeof child.classList !== 'undefined' &&
					child.classList.contains('govuk-radios__item')
				) {
					child.childNodes.forEach(function (grandchild) {
						if (
							typeof grandchild.dataset !== 'undefined' &&
							grandchild.dataset.target &&
							!document
								.getElementById(grandchild.dataset.target)
								.classList.contains('js-hidden')
						) {
							document
								.getElementById(grandchild.dataset.target)
								.classList.add('js-hidden');
						}
					});
				}
			});
			document
				.getElementById(this.dataset.target)
				.classList.remove('js-hidden');
		} else {
			var allParents = this.parentNode.parentNode.childNodes;
			allParents.forEach(function (parent) {
				var allChildren = parent.childNodes;
				allChildren.forEach(function (child) {
					if (child.dataset !== undefined) {
						if (
							child.dataset.target !== undefined &&
							!document
								.getElementById(child.dataset.target)
								.classList.contains('js-hidden')
						) {
							document
								.getElementById(child.dataset.target)
								.classList.add('js-hidden');
						}
					}
				});
			});
		}
	}

	document
		.querySelectorAll('.wti-table-serch-icon')
		.forEach(function (element) {
			element.addEventListener('click', submitExistingCasesSearchForm);
		});

	function submitExistingCasesSearchForm() {
		document.getElementById('findRecords').click();
	}
})();
