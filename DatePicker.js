class DatePicker {
    constructor(divId, callback) {
      this.divId = divId;
      this.callback = callback;
      this.currentDate = new Date();
      this.render(this.currentDate);
    }
  
    renderHeader(date) {
      const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];
      const year = date.getFullYear();
      const month = date.getMonth();
      
      const header = document.createElement('div');
      header.className = 'header';
      header.innerHTML = `
        <span class="prev" onclick="DatePicker.instances['${this.divId}'].changeMonth(-1)">&lt;</span>
        <span class="month-year">${monthNames[month]} ${year}</span>
        <span class="next" onclick="DatePicker.instances['${this.divId}'].changeMonth(1)">&gt;</span>
      `;
      return header;
    }
  
    renderDaysOfWeek() {
      const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      const row = document.createElement('div');
      row.className = 'days-of-week';
      daysOfWeek.forEach(day => {
        const cell = document.createElement('div');
        cell.textContent = day;
        row.appendChild(cell);
      });
      return row;
    }
  
    renderDaysOfMonth(date) {
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const totalDaysInMonth = lastDayOfMonth.getDate();
  
      const daysGrid = document.createElement('div');
      daysGrid.className = 'days-grid';
  
      let currentDate = new Date(firstDayOfMonth);
      currentDate.setDate(currentDate.getDate() - currentDate.getDay()); // Move to the beginning of the week
  
      while (currentDate <= lastDayOfMonth) {
        const row = document.createElement('div');
        row.className = 'week';
  
        for (let i = 0; i < 7; i++) {
          const cell = document.createElement('div');
          cell.className = 'day';
          
          const isCurrentMonth = currentDate.getMonth() === date.getMonth();
          const isToday = currentDate.toDateString() === new Date().toDateString();
  
          if (isCurrentMonth) {
            cell.textContent = currentDate.getDate();
            cell.onclick = () => {
              this.callback(this.divId, {
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate()
              });
            };
            cell.classList.add('current-month');
          } else {
            cell.textContent = currentDate.getDate();
            cell.classList.add('other-month');
          }
  
          if (isToday && isCurrentMonth) {
            cell.classList.add('today');
          }
  
          row.appendChild(cell);
          currentDate.setDate(currentDate.getDate() + 1);
        }
  
        daysGrid.appendChild(row);
      }
  
      return daysGrid;
    }
  
    render(date) {
      const container = document.getElementById(this.divId);
      container.innerHTML = '';
      
      const calendar = document.createElement('div');
      calendar.className = 'calendar';
      
      calendar.appendChild(this.renderHeader(date));
      calendar.appendChild(this.renderDaysOfWeek());
      calendar.appendChild(this.renderDaysOfMonth(date));
      
      container.appendChild(calendar);
    }
  
    changeMonth(delta) {
      this.currentDate.setMonth(this.currentDate.getMonth() + delta);
      this.render(this.currentDate);
    }
  }
  
  DatePicker.instances = {};
  
  // Initialize the date pickers
  document.addEventListener('DOMContentLoaded', () => {
    const datePicker1 = new DatePicker('datepicker1', (id, date) => {
      console.log(`DatePicker ${id} selected: ${date.year}-${date.month}-${date.day}`);
    });
  
    const datePicker2 = new DatePicker('datepicker2', (id, date) => {
      console.log(`DatePicker ${id} selected: ${date.year}-${date.month}-${date.day}`);
    });
  
    DatePicker.instances['datepicker1'] = datePicker1;
    DatePicker.instances['datepicker2'] = datePicker2;
  });
  