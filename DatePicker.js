class DatePicker { 
  constructor(id, callbackFunction) {
      this.id = id;
      this.callbackFunction = callbackFunction;
      this.div = document.getElementById(id);
      this.currentDate = new Date();
  }

  render(date, defaultSelectedDate) {
      this.currentDate = date;
      this.clearDivContents();

      const headerContainer = this.createHeaderContainer();
      const monthYearHeader = this.createMonthYearHeader();
      this.appendHeaderElements(headerContainer, monthYearHeader);
      this.div.appendChild(headerContainer);

      const headerRow = this.createHeaderRow();
      const calendarBody = this.createCalendarBody();
      this.populateCalendar(headerRow, calendarBody, defaultSelectedDate);
  }

  clearDivContents() {
      this.div.innerHTML = "";
  }

  createHeaderContainer() {
      const headerContainer = document.createElement("div");
      return headerContainer;
  }

  createMonthYearHeader() {
      const monthYearHeader = document.createElement("div");
      monthYearHeader.classList.add("month-year-header");

      const previousMonthButton = this.createNavButton("&lt;");
      previousMonthButton.addEventListener("click", () => this.render(this.getPreviousMonth()));

      const nextMonthButton = this.createNavButton("&gt;");
      nextMonthButton.addEventListener("click", () => this.render(this.getNextMonth()));

      const monthYearText = this.createMonthYearText();

      monthYearHeader.append(previousMonthButton, " ", monthYearText, " ", nextMonthButton);
      return monthYearHeader;
  }

  createNavButton(text) {
      const button = document.createElement("button");
      button.innerHTML = text;
      button.classList.add("nav-button");
      return button;
  }

  createMonthYearText() {
      const monthYearText = document.createElement("span");
      monthYearText.innerText = `${this.getMonthName(this.currentDate.getMonth())} ${this.currentDate.getFullYear()}`;
      return monthYearText;
  }

  appendHeaderElements(headerContainer, monthYearHeader) {
      headerContainer.appendChild(monthYearHeader);
  }

  createHeaderRow() {
      const headerRow = document.createElement("tr");
      const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
      daysOfWeek.forEach(day => {
          const headerCell = document.createElement("th");
          headerCell.innerText = day;
          headerRow.appendChild(headerCell);
      });
      return headerRow;
  }

  createCalendarBody() {
      return document.createElement("tbody");
  }

  populateCalendar(headerRow, calendarBody, defaultSelectedDate) {
      const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
      const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
      const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDay();

      let currentWeek = document.createElement("tr");

      this.populatePreviousMonthDays(firstDayOfMonth, currentWeek);
      this.populateCurrentMonthDays(daysInMonth, currentWeek, defaultSelectedDate);
      this.populateFollowingMonthDays(lastDayOfMonth, currentWeek);

      this.div.append(headerRow, calendarBody);
  }

  populatePreviousMonthDays(firstDayOfMonth, currentWeek) {
      if (firstDayOfMonth > 0) {
          const daysInPreviousMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
          for (let i = firstDayOfMonth - 1; i >= 0; i--) {
              const calendarCell = this.createCalendarCell(daysInPreviousMonth - i, "dimmed");
              currentWeek.appendChild(calendarCell);
          }
      }
  }

  populateCurrentMonthDays(daysInMonth, currentWeek, defaultSelectedDate) {
      for (let i = 1; i <= daysInMonth; i++) {
          const calendarCell = this.createCalendarCell(i);
          if (this.isDefaultSelectedDate(defaultSelectedDate, i)) {
              calendarCell.classList.add("selected");
          }
          currentWeek.appendChild(calendarCell);

          if (currentWeek.children.length === 7 || i === daysInMonth) {
              this.calendarBody.appendChild(currentWeek);
              currentWeek = document.createElement("tr");
          }
      }
  }

  populateFollowingMonthDays(lastDayOfMonth, currentWeek) {
      if (lastDayOfMonth < 6) {
          for (let i = lastDayOfMonth + 1; i < 7; i++) {
              const calendarCell = this.createCalendarCell(i - lastDayOfMonth, "dimmed");
              currentWeek.appendChild(calendarCell);
          }
      }
  }

  createCalendarCell(date, className = "") {
      const calendarCell = document.createElement("td");
      calendarCell.innerText = date;
      if (className !== "") {
          calendarCell.classList.add(className);
      }
      return calendarCell;
  }

  isDefaultSelectedDate(defaultSelectedDate, i) {
      return defaultSelectedDate && defaultSelectedDate.date === i &&
          defaultSelectedDate.year === this.currentDate.getFullYear() &&
          defaultSelectedDate.month === this.currentDate.getMonth() + 1;
  }

  getPreviousMonth() {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
  }

  getNextMonth() {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
  }

  getMonthName(monthIndex) {
      const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];
      return monthNames[monthIndex];
  }
}
