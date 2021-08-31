(async () => {
    const linkedFields = {
        class: 'groupName',
        groupName: 'identityName'
    };

    async function postData(url, queryKey, queryValue) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData(queryKey, queryValue))
        });
        try {
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    function formData(queryKey, queryValue) {
        return {
            _csrf: document.getElementById('_csrf').value,
            key: queryKey,
            value: queryValue
        };
    }

    async function updateDependentInputs(e) {
        let queryKey = e.target.name;
        let queryValue = e.target.options[e.target.selectedIndex].value;
        try {
            let response = await postData(
                '/admin/get-unique-values',
                queryKey,
                queryValue
            );
            let x = document.getElementById(linkedFields[queryKey]);
            for (i = x.options.length - 1; i >= 1; i--) {
                x.remove(i);
            }
            response.forEach((item, index) => {
                var option = document.createElement('option');
                option.text = item;
                x.add(option, x[index + 1]);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function getAnimalDataValue(e) {
        let queryKey = e.target.name;
        let queryValue = e.target.options[e.target.selectedIndex].value;
        try {
            let response = await postData(
                '/admin/get-animal-data-value',
                queryKey,
                queryValue
            );
            if (document.getElementById('iucnCategory')) {
                document.getElementById('iucnCategory').value = response.iucnCategory;
				document.getElementById('scientificName').value = response.scientificName;
				document.getElementById('categoryName').value = response.categoryName;
            }
        } catch (error) {
            console.log(error);
        }
    }

    document.querySelectorAll('#class, #groupName').forEach(el => {
        el.addEventListener('change', updateDependentInputs);
    });

    document.querySelectorAll('#identityName').forEach(el => {
        el.addEventListener('change', getAnimalDataValue);
    });
})();
