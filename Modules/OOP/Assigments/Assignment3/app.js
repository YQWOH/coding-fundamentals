const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  eventsDelete = document.querySelector(".fa-trash"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  editEventWrapper = document.querySelector(".edit-event-wrapper "),
  addEventCloseBtn = document.querySelector(".add-close "),
  editEventCloseBtn = document.querySelector(".edit-close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  editEventTitle = document.querySelector("#edit-event-name"),
  editEventFrom = document.querySelector("#close-event-time-from "),
  editEventTo = document.querySelector("#close-event-time-to "),
  editEventSubmit = document.querySelector(".edit-event-btn "),
  deleteEventSubmit = document.querySelector(".delete-event-btn "),
  addEventSubmit = document.querySelector(".add-event-btn "),
  runApp = document.querySelector("#runApp "),
  firstPage = document.querySelector(".firstPage "),
  appPage = document.querySelector(".appPage "),
  exitApp = document.querySelector(".exit-app ")
  

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const eventsArr = [];
getEvents();
console.log(eventsArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

runApp.addEventListener("click", () => {
  firstPage.classList.toggle("hidden");
  appPage.classList.toggle("hidden");
});

exitApp.addEventListener("click", () => {
  firstPage.classList.toggle("hidden");
  appPage.classList.toggle("hidden");
});

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fa fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
              <div class="event-edit-delete">
              </div>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`
        ;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

//function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

editEventCloseBtn.addEventListener("click", () => {
  editEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  // if (e.target !== addEventBtn && !addEventWrapper.contains(e.target) && e.target.className !== "event") {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target) && !editEventWrapper.contains(e.target) && e.target.className !== "event") {
    addEventWrapper.classList.remove("active");
    editEventWrapper.classList.remove("active");
  }
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

//allow only time in eventtime from and to
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  //check correct time format 24 hour
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  //check if event is already added
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  //select active day and add event class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

let selected = {
  dateSelectedIdx: "", // index for the date
  eventSelectedIdx: "" // index for the event of the active date
};

let targetEvent = "";

//function to update event when clicked on event
eventsContainer.addEventListener("click", (e) => {
  targetEvent = e.target;
  editEventWrapper.classList.add('active');
  let dateSelected = document.querySelector(".event-date").innerText.split(" ");
  let date = {
    day: Number(dateSelected[0]),
    month: new Date(document.querySelector(".event-date").innerText).getMonth()+1,
    year: Number(dateSelected[2])
  };
  let eventEventName = e.target.innerText.split("\n")[0];
  let eventEventFromTime = e.target.innerText.split("\n")[1].split(" - ")[0];
  let eventEventToTime = e.target.innerText.split("\n")[1].split(" - ")[1];
  selected.dateSelectedIdx = eventsArr.findIndex(item => { return item.day === date.day && item.month === date.month && item.year === date.year});
  selected.eventSelectedIdx = eventsArr[selected.dateSelectedIdx].events.findIndex(event => {return event.title === eventEventName} );
  document.querySelector("#edit-event-name").value = eventEventName;
  document.querySelector("#close-event-time-from").value = convertTo24Hour(eventEventFromTime);
  document.querySelector("#close-event-time-to").value = convertTo24Hour(eventEventToTime);
});

//function to submit to update event
editEventSubmit.addEventListener("click", () => {
  console.log("selected: ",selected);
  const eventTitle = editEventTitle.value;
  const eventTimeFrom = editEventFrom.value;
  const eventTimeTo = editEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  //check correct time format 24 hour
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  // check if event is already added
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === new Date(document.querySelector(".event-date").innerText).getMonth() + 1 &&
      event.year === Number(document.querySelector(".event-date").innerText.split(" ")[2])
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle && event.time === timeFrom + " - " + timeTo) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("No change on the event");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };

  eventsArr[selected.dateSelectedIdx].events[selected.eventSelectedIdx].title = newEvent.title;
  eventsArr[selected.dateSelectedIdx].events[selected.eventSelectedIdx].time = newEvent.time;
  console.log("eventsArr: ", eventsArr);
  updateEvents(activeDay);
  editEventWrapper.classList.remove("active")
});

// function to delete event when clicked on event
deleteEventSubmit.addEventListener("click", (e) => {
  console.log("targetEvent", targetEvent);
  if (confirm(`Are you sure you want to delete this event ${eventsArr[selected.dateSelectedIdx].events[selected.eventSelectedIdx].title}?`)) {
    eventsArr[selected.dateSelectedIdx].events.splice(selected.eventSelectedIdx, 1);
    // if no events left in a day then remove that day from eventsArr
    if (eventsArr[selected.dateSelectedIdx].events.length === 0) {
      eventsArr.splice(selected.dateSelectedIdx, 1);
      const activeDayEl = document.querySelector(".day.active");
      if (activeDayEl.classList.contains("event")) {
        activeDayEl.classList.remove("event");
      }
    }
    updateEvents(activeDay);
    editEventWrapper.classList.remove("active");
  }
});

//function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

function convertTo24Hour(time) {
  let hours = parseInt(time.split(":")[0]);
  const minutes = parseInt(time.split(":")[1].substr(0, 2));
  const meridian = time.substr(-2);

  if (meridian === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridian === "AM" && hours === 12) {
    hours = 0;
  }

  return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
}

