module.exports = {
    'Case ID': {
        linkedField: "caseNumber",
        method: false,
        skip: false
    },
    'Species': {
        linkedField: "identityName",
        method: false,
        skip: false
    },
    'Rescue type': {
        linkedField: "rescueType",
        method: false,
        skip: false
    },
    'Date of rescue/displacement': {
        linkedField: "dateOfRescue",
        method: (value) => {
            if(!value) {
                return {dateOfRescue: ""};
            }
            return {dateOfRescue: new Date(value)};
        },
        skip: false
    },
    'Place of rescue': {
        linkedField: "placeOfRescue",
        method: false,
        skip: false
    },
    'Coordinates of place of rescue Lat': {
        linkedField: "gpsLatitudeRescue",
        method: false,
        skip: false
    },
    'Coordinates of place of rescue Long': {
        linkedField: "gpsLongditudeRescue",
        method: false,
        skip: false
    },
    'Cause of displacement': {
        linkedField: "displacement",
        method: false,
        skip: false
    },
    'Details of intervention': {
        linkedField: "interventionDetails",
        method: false,
        skip: true
    },
    'Type of intervention (in situ/ex situ)': {
        linkedField: "rescueMode",
        method: false,
        skip: false
    },
    'Rescued by': {
        linkedField: "recuedBy",
        method: false,
        skip: true
    },
    'Date of admission/intervention': {
        linkedField: "dateOfAdmission",
        method: (value) => {
            if(!value) {
                return {dateOfAdmission: ""};
            }
            return {dateOfAdmission: new Date(value)};
        },
        skip: false
    },
    'Stage': {
        linkedField: "stage",
        method: false,
        skip: false
    },
    'Sex': {
        linkedField: "sex",
        method: false,
        skip: false
    },
    'Weight': {
        linkedField: "weight",
        method: (weightString) => {
            let weightAmount = weightString.split(' ')[0];
            if(weightAmount.length === 0) {
                return false;
            }
            if(weightString.includes('Kg') || weightString.includes('KG')) {
                if(weightAmount.includes('.')) {
                    let decimalWeight = weightAmount.split('.');
                    return {weightKg: decimalWeight[0], weightG: decimalWeight[1].padEnd(3, '0')};
                } else {
                    return {weightKg: weightAmount, weightG: "0"};
                }
            } else if(weightString.includes('g')) {
                return {weightKg: '0', weightG: weightAmount.padEnd(3, '0')};
            } else {
                if(weightAmount.includes('.')) {
                    let decimalWeight = weightAmount.split('.');
                    return {weightKg: decimalWeight[0], weightG: decimalWeight[1].padEnd(3, '0')};
                } else {
                    return {weightKg: weightAmount, weightG: "0"};
                }
            }
        },
        skip: false
    },
    'Length (Approx)': {
        linkedField: "lengthSnoutVent",
        method: (lengthString) => {
            return {lengthSnoutVent: lengthString.split(' ')[0]};
        },
        skip: false
    },
    'Outcome': {
        linkedField: "finalDisposition",
        method: false,
        skip: false
    },
    'Date of outcome': {
        linkedField: "dateOfOutcome",
        method: (value) => {
            if(!value) {
                return {dateOfOutcome: ""};
            }
            return {dateOfOutcome: new Date(value)};
        },
        skip: false
    },
    'Place of outcome': {
        linkedField: "placeOfOutcome",
        method: false,
        skip: true
    },
    'Coordinates of place of release Lat': {
        linkedField: "gpsLatitudeRelease",
        method: false,
        skip: true
    },
    'Coordinates of place of release Long': {
        linkedField: "gpsLongditudeRelease",
        method: false,
        skip: true
    },
    'Remarks': {
        linkedField: "remarks",
        method: false,
        skip: true     
    }
}