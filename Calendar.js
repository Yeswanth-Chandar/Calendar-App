
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

let calendar = document.getElementById("calendar-body");

let yearSelect = document.getElementById("year-select");
for (let year = 1900; year <= 2050; year++) {
  let option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  if (year === currentYear) {
    option.selected = true;
  }
  yearSelect.appendChild(option);
}

let monthSelect = document.getElementById("month-select");
monthSelect.selectedIndex = currentMonth;

populateCalendar(currentYear, currentMonth);

document.getElementById("prev-button").addEventListener("click", function() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  yearSelect.value = currentYear;
  monthSelect.selectedIndex = currentMonth;
  populateCalendar(currentYear, currentMonth);
});

document.getElementById("next-button").addEventListener("click", function() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  yearSelect.value = currentYear;
  monthSelect.selectedIndex = currentMonth;
  populateCalendar(currentYear, currentMonth);
});

yearSelect.addEventListener("change", function() {
  currentYear = parseInt(yearSelect.value);
  populateCalendar(currentYear, currentMonth);
});

monthSelect.addEventListener("change", function() {
  currentMonth = parseInt(monthSelect.value);
  populateCalendar(currentYear, currentMonth);
});

function populateCalendar(year, month) {
  calendar.innerHTML = "";

  let numDays = new Date(year, month + 1, 0).getDate();

  let firstDayIndex = new Date(year, month, 1).getDay();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < firstDayIndex) {
        let textNode = document.createTextNode("");
        cell.appendChild(textNode);
      } else if (date > numDays) {
        let textNode = document.createTextNode("");
        cell.appendChild(textNode);
      } else {
        let textNode = document.createTextNode(date);
        cell.appendChild(textNode);
        cell.classList.add("day");
        cell.setAttribute("data-date", year + "-" + (month + 1) + "-" + date);
        date++;

cell.addEventListener("click", function() {
let selectedDate = cell.getAttribute("data-date");
let eventText = prompt("Enter event/meeting details for " + selectedDate + ":");
if (eventText !== null && eventText !== "") {
let event = document.createElement("p");
event.textContent = eventText;
cell.appendChild(event);
}
});
}
row.appendChild(cell);
}
calendar.appendChild(row);
}
}