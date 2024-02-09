# JavaScript Date Picker

This project implements an interactive Date Picker component using HTML, CSS, and JavaScript. It provides users with a user-friendly interface to select dates and visualize a one-month calendar.

## Features

- **Date Selection**: Click on any valid day of the current month to select a date.
- **Navigation**: Easily navigate between months using the provided controls (< and >).
- **Callback Function**: Upon selecting a date, a callback function is triggered, providing details such as the month, day, and year of the selected date.

## Usage

1. Include the provided `datepicker.css` stylesheet in your HTML file:

    ```html
    <link rel="stylesheet" type="text/css" href="datepicker.css" />
    ```

2. Add the `DatePicker.js` script to your HTML file:

    ```html
    <script type="text/javascript" src="DatePicker.js"></script>
    ```

3. Create `<div>` elements in your HTML where you want the date pickers to appear:

    ```html
    <div id="datepicker1"></div>
    <div id="datepicker2"></div>
    ```

4. Initialize date pickers using JavaScript, specifying a callback function for date selection:

    ```javascript
    // Initialize datePicker1
    var datePicker1 = createDatePicker("datepicker1", function (id, fixedDate) {
        // Callback function logic here
    });

    // Initialize datePicker2
    var datePicker2 = createDatePicker("datepicker2", function (id, fixedDate) {
        // Callback function logic here
    });
    ```

5. Optionally, you can pass an initial date to display:

    ```javascript
    // Initialize datePicker2 with a specific date (January 1, 2009)
    var initialDate = new Date("January 1, 2009");
    var datePicker2 = createDatePicker("datepicker2", function (id, fixedDate) {
        // Callback function logic here
    }, initialDate);
    ```
