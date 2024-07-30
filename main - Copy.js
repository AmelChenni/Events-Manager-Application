// // console.log(new Date());
// // console.log(new Date().toISOString());
// // console.log(new Date().toISOString().split("T"));
// // console.log(new Date().toISOString().split("T")[0]);

// function setMinDate() {
//   const today = new Date().toISOString().split("T")[0];
//   const eventDate = document.querySelector(".event-date");
//   // eventDate.setAttribute("min", today);
//   eventDate.min = today;
//   eventDate.addEventListener("input", function () {
//     if (eventDate.value < today) eventDate.value = today;
//   });
// }
// setMinDate();

// function addEvent() {
//   const eventName = document.querySelector(".event-name").value;
//   const eventDate = document.querySelector(".event-date").value;
//   const eventOrganizer = document.querySelector(".organizer").value;
//   // Get Time In Milliseconds From Epoch Time To Event Date
//   const eventTimeStamp = new Date(eventDate).getTime();
//   // Start Of Time -------------- Today -------------- Event Date = Event Date - Today
//   // Start Of Time -------------- 20000 -------------- 30000 = 30000 - 20000 = 10000

//   if (eventName && eventDate && eventOrganizer) {
//     // Create Event Object
//     const event = {
//       name: eventName,
//       date: eventDate,
//       organizer: eventOrganizer,
//       timeStamp: eventTimeStamp,
//     };

//     let events = JSON.parse(localStorage.getItem("events")) || [];
//     events.push(event);
//     localStorage.setItem("events", JSON.stringify(events));
//     console.log(events);

//     const inputs = document.querySelectorAll("input");
//     inputs.forEach((input) => (input.value = ""));

//     displayEvents();
//   } else {
//     alert("Please Fill All Fields");
//   }
// }

// function displayEvents() {
//   const events = JSON.parse(localStorage.getItem("events")) || [];
//   const eventsList = document.querySelector(".events");
//   eventsList.innerHTML = "";
//   events.forEach((event, index) => {
//     const now = new Date().getTime();
//     const timeLeft = event.timeStamp - now;
//     // console.log(timeLeft);
//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//     const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//     eventsList.innerHTML += `
//       <div class="event">
//         <h3>${event.name}</h3>
//         <p><span>By</span> ${event.organizer}</p>
//         <p><span>On</span> ${event.date}</p>
//         <p><span>Time Left</span> ${countdown}</p>
//         <button onclick="deleteEvent(${index})">Delete</button>
//       </div>
//     `;
//   });
// }

// displayEvents();

// function deleteEvent(index) {
//   const events = JSON.parse(localStorage.getItem("events"));
//   events.splice(index, 1);
//   localStorage.setItem("events", JSON.stringify(events));
//   displayEvents();
// }

// setInterval(displayEvents, 1000);
