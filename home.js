// Get current date
const currentDate = new Date();

// Extract month, day, year, day of the week, first day of the month, and last day of the month
const month = currentDate.getMonth() + 1; // Adding 1 because months are zero-based
const monthName = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
const day = currentDate.getDate();
const year = currentDate.getFullYear();
const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' }); // Get the day of the week
const firstDayOfMonth = new Date(year, month - 1, 1).toLocaleString('default', { weekday: 'long' }); // Get the day of the week of the first day in the month
const lastDayOfMonth = new Date(year, month, 0).getDate(); // Get the last day of the current month

const lastDayOfMonthDate = new Date(year, month, 0); // Get the Date object for the last day of the month
const finalDayOfMonth = lastDayOfMonthDate.getDate(); // Get the last day of the current month

const calendarWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function findDayIndex(dayOfWeek) {
    // Array of days of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Find the index of the dayOfWeek in the daysOfWeek array
    const index = daysOfWeek.indexOf(dayOfWeek);

    // Return the index
    return index;
}

// Example usage:
const dayIndex = findDayIndex(firstDayOfMonth); //would be three for MAY because it starts on a [Wednesday]
const lastIndex = findDayIndex(lastDayOfMonthDate.getDate(7)); //

// Display the information
const calendarInfoElement = document.getElementById('calendarInfo');
if (calendarInfoElement) { // Check if the element exists
    // calendarInfoElement.textContent = `Today is ${dayOfWeek}, ${month}/${day}/${year}. The first day of the month is ${firstDayOfMonth} (index: ${dayIndex}), and the last day is ${lastDayOfMonth}.`;


    // Make nodes of sunday through saturday
    let fill = 6; //calculates the extra boxes just trust
    let j = 0;
    let calendarHTML = '';

    //DAY OF The MONTH
    calendarHTML +=  `<div class="whiteBorderoutline">
    <div class="north tbH1">
    ${monthName}
    </div class="centerCal">
  </div>
  <div class="calSpacing"></div>`;

    while (j < calendarWeek.length) { // Use daysOfWeek.length as the condition
        calendarHTML += `<div class="invertNode northBold">${calendarWeek[j]}</div>`; // Access daysOfWeek array elements by index
        j++;
    }

    // Make display of BLANK days prior to start of month [] [] [] [] [start day] [f] [s]
    let i = 0;
    while (i < dayIndex) {
        calendarHTML += `<div class="invisNode">&nbsp;</div>`;
        i++;
    }

    fill += i;

    // Print out starting day
    i = 1;

    // Print days leading up to CURR
    while (i < day) {
        calendarHTML += `<div class="calNode">${i}</div>`;
        i++;
    }


    // current dya of week
    calendarHTML += `<div class="invertNode transform transition-all duration-300 hover:scale-110">${day}</div>`;
    i++;

    // From CURR to last day of month
    while (i <= lastDayOfMonth) {
        calendarHTML += `<div class="calNode">${i}</div>`;
        i++;
    }

    fill += i;


    for (; 42 - fill != 0; fill++) {
        calendarHTML += `<div class="invisNode">&nbsp;</div>`;
    }


    calendarInfoElement.innerHTML += calendarHTML;

} else {
    console.error('Element with id "calendarInfo" not found.');
}
