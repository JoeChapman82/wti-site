const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

module.exports = (currentMonth, currentYear) => {    
    let monthsToCapture = 12;
    let isLeapYear;
    let months = [];
    while(monthsToCapture > 0) {
        currentMonth--;
        if(currentMonth < 0) {
            currentYear--;
            currentMonth = 11;
        }
        isLeapYear = currentYear % 4 === 0;
        let day = isLeapYear && currentMonth === 1 ? 29 : daysInMonths[currentMonth];
        months.push({
            start: new Date(`${currentYear}-${currentMonth + 1}-${1}`),
            end: new Date(`${currentYear}-${currentMonth + 1}-${day}`),
            name: `monthCount${monthsToCapture}`,
            date: `${monthNames[currentMonth]} ${currentYear}`
        });
        monthsToCapture--;
    }
    return months;    
}