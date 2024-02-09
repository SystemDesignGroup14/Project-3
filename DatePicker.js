'use strict';
function createDatePicker(id, callback, initialDate) {
const currentDate = (initialDate !== undefined && initialDate !== null) ? initialDate : new Date();

    function render(date) {
        const container = document.getElementById(id);
        if (!container) {
            console.error(`Element with id "${id}" not found.`);
            return;
        }

        // Create a new date object to avoid modifying the original date
        const selectedDate = new Date(date);

        // Calculate the first day of the month
        selectedDate.setDate(1);

        // Create the calendar HTML
        let calendarHTML = `
      <div class="header">
        <span class="prev-month">&lt;</span>
        <span class="current-month">${selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        <span class="next-month">&gt;</span>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="day-header">Su</th>
            <th class="day-header">Mo</th>
            <th class="day-header">Tu</th>
            <th class="day-header">We</th>
            <th class="day-header">Th</th>
            <th class="day-header">Fr</th>
            <th class="day-header">Sa</th>
          </tr>
        </thead>
        <tbody>
    `;



        // eslint-disable-next-line no-shadow
        // Calculate the number of days in the month

        // Calculate the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
        const firstDayOfWeek = selectedDate.getDay();

        // Calculate the number of days to display from the previous month
        const daysFromPrevMonth = (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1);

        // Calculate the date of the first day to display
        const firstDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        firstDate.setDate(1 - daysFromPrevMonth);

        // Fill in the calendar with days
        for (let week = 0; week < 6; week++) {
            calendarHTML += '<tr>';
            for (let day = 0; day < 7; day++) {
                const currentDay = new Date(firstDate);
                currentDay.setDate(currentDay.getDate() + (week * 7) + day);
                const isCurrentMonth = currentDay.getMonth() === selectedDate.getMonth();

                if (!isCurrentMonth) {
                    // Display days from the previous or next month
                    calendarHTML += `<td class="disabled">${currentDay.getDate()}</td>`;
                } else {
                    // Display clickable days for the current month
                    const dateObject = {
                        month: currentDay.getMonth() + 1,
                        day: currentDay.getDate(),
                        year: currentDay.getFullYear(),
                    };
                    calendarHTML += `<td class="clickable" onclick="selectDate(${JSON.stringify(dateObject)})">${currentDay.getDate()}</td>`;
                }
            }
            calendarHTML += '</tr>';
        }

        calendarHTML += `
        </tbody>
      </table>
    `;

        container.innerHTML = calendarHTML;

        // Add event listeners to the arrow spans
        const prevMonthSpan = container.querySelector('.prev-month');
        const nextMonthSpan = container.querySelector('.next-month');
        // eslint-disable-next-line no-use-before-define
        prevMonthSpan.addEventListener('click', () => prevMonth());
        // eslint-disable-next-line no-use-before-define
        nextMonthSpan.addEventListener('click', () => nextMonth());
    }

    function selectDate(dateObject) {
        callback(id, dateObject);
    }

    function prevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        render(currentDate);
    }

    function nextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        render(currentDate);
    }

    // Initial rendering
    render(currentDate);

    // Expose the selectDate, prevMonth, and nextMonth functions to the global scope
    window.selectDate = selectDate;
    window.prevMonth = prevMonth;
    window.nextMonth = nextMonth;

    return {
        prevMonth,
        nextMonth,
        selectDate,
    };
}

// Create instances of the DatePicker class with separate IDs
// eslint-disable-next-line no-unused-vars
var datePicker1 = createDatePicker("datepicker1", function (id, fixedDate) {
    console.log("DatePicker with id", id, "selected date:", fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year);
});

// Initialize datePicker2 with the date set to January 2009 and a different ID
// eslint-disable-next-line no-unused-vars
var datePicker2 = createDatePicker("datepicker2", function (id, fixedDate) {
    console.log("DatePicker with id", id, "selected date:", fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year);
}, new Date("January 1, 2009"));
