var currentMonth = document.querySelector(".current-month");
var daysOfTheMonth = document.querySelector(".calendar-days");
var initDate = new Date((year = 2023), (month = 0));
currentMonth.textContent = initDate.toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});
displayCalendar();

function displayCalendar() {
  const totalMonthDays = new Date(
    initDate.getFullYear() + 1,
    initDate.getMonth() + 1,
    0
  ).getDate();
  const prevMonthDays = new Date(
    initDate.getFullYear(),
    initDate.getMonth(),
    0
  ).getDate();

  const startWeekDay = new Date(
    initDate.getFullYear(),
    initDate.getMonth(),
    1
  ).getDay();

  let totalCalendarDay = 6 * 7;

  let listOfDates = document.getElementById("highlights");
  listOfDates.innerHTML = "";

  daysOfTheMonth.innerHTML = "";

  for (let i = 1; i <= totalCalendarDay; i++) {
    let day = i - startWeekDay;
    if (i <= startWeekDay) {
      daysOfTheMonth.innerHTML += `<div class='padding-day'>${
        prevMonthDays + day
      }</div>`;
    } else if (i <= startWeekDay + totalMonthDays) {
      daysOfTheMonth.innerHTML += `<div class='month-day'>${day}</div>`;
    } else {
      daysOfTheMonth.innerHTML += `<div class='padding-day'>${
        day - totalMonthDays
      }</div>`;
    }
  }
  highlightedDates = {
    "My Birthday": [4, 8],
    "Mum's Birthday": [12, 18],
    "Dad's Birthday": [10, 5],
    "Christmas": [11, 24],
    "Boxing Day": [11, 25],
    "New Year": [0, 0],
    "New Year Holiday": [0, 1],
    "Good Friday": [3, 6],
    "Easter Monday": [3, 10],
    "Id El Fitr": [3, 21],
    "Id El Fitr Holiday": [3, 22],
    "Workers Day": [4, 0],
    "Childrens Day": [4, 26],
    "Democracy Day": [5, 11],
    "Id El Kabir": [5, 27],
    "Id El Kabir Holiday": [5, 28],
    "Id El Maluud": [8, 26],
    "Independence Day": [9, 0],
    "Independence Day Holiday": [9, 1],
  };
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  for (let key in highlightedDates) {
    let colour;
    if (key === "My Birthday") {
      colour = "gold";
    } else if (key === "Mum's Birthday") {
      colour = "silver";
    } else if (key === "Dad's Birthday") {
      colour = "red";
    } else {
      colour = "brown";
    }
    if (initDate.getMonth() == highlightedDates[key][0]) {
      let days = document.querySelectorAll(".month-day");
      listOfDates.innerHTML += `<li>${highlightedDates[key][1] + 1} ${
        months[highlightedDates[key][0]]
      }: ${key}</li>`;
      for (let i = 0; i < days.length; i++) {
        if (i == highlightedDates[key][1]) {
          days[i].style.backgroundColor = colour;
        }
      }
    }
  }
}

document.querySelectorAll(".nav-btn").forEach(function (element) {
  element.addEventListener("click", function () {
    initDate = new Date(currentMonth.textContent);
    if (initDate.getMonth() == 0) {
      initDate.setMonth(
        initDate.getMonth() + (element.classList.contains("previous") ? 0 : 1)
      );
    } else if (initDate.getMonth() == 11) {
      initDate.setMonth(
        initDate.getMonth() + (element.classList.contains("previous") ? -1 : 0)
      );
    } else {
      initDate.setMonth(
        initDate.getMonth() + (element.classList.contains("previous") ? -1 : 1)
      );
    }
    currentMonth.textContent = initDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    displayCalendar();
  });
});
