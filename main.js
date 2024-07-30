
displayEvent();

function setMinDate() {
    let newDate = document.querySelector('.event-date');
    const today = new Date().toISOString().split('T')[0];
    newDate.min = today;
    newDate.addEventListener('input', function() {
        if (newDate.value < today) {
            newDate.value = today;
        }
    });
}
setMinDate();

function addEvent() {
    clearErrors()
    let eventName = document.querySelector('.event-name').value;
    let eventOrganizer = document.querySelector('.organizer').value;
    let eventDate = document.querySelector('.event-date').value;
    let eventCategory = document.querySelector('.event-category').value;
    let eventTimeStamp = new Date(eventDate).getTime();

    if (eventName && eventOrganizer && eventDate){
        
    const event = {
        eventName: eventName,
        eventOrganizer: eventOrganizer,
        eventDate: eventDate,
        eventCategory: eventCategory,
        timeStamp: eventTimeStamp,  
    };
    console.log(eventCategory);

    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
    showSuccessAlert()
    Clear();
    displayEvent();
    }else{
        showErrorAlert()
        if (eventName === "") {
            const p = document.createElement("p");
            p.textContent = "Please enter a name";
            p.style.color = "red"; // Optional: Add styling to the error message
            document.querySelector('.event-name').insertAdjacentElement('afterend', p);
        }
        if (eventOrganizer === "") {
            const p = document.createElement("p");
            p.textContent = "Please enter an organizer";
            p.style.color = "red"; // Optional: Add styling to the error message
            document.querySelector('.organizer').insertAdjacentElement('afterend', p);
        }
        if (eventDate === "") {
            const p = document.createElement("p");
            p.textContent = "Please enter a date";
            p.style.color = "red"; // Optional: Add styling to the error message
            document.querySelector('.event-date').insertAdjacentElement('afterend', p);
        }
        }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.add-box p');
    errorMessages.forEach(msg => msg.remove());
}
function displayEvent() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let eventsList = document.querySelector('.events');
    eventsList.innerHTML = "";
    events.forEach((event,index) => {
        const now = new Date().getTime();
        const timeLeft = event.timeStamp - now;
      

        const days = Math.floor(timeLeft / (1000 * 24 * 60 * 60));
        const hours = Math.floor(timeLeft % (1000 * 24 * 60 * 60) /(1000 * 60 * 60));
        const miutes = Math.floor(timeLeft  % (1000 * 60 * 60) / (1000 * 60));
        const seconds = Math.floor(timeLeft % (1000 * 60 ) / (1000 ));

        const countDown = `${days} d ${hours} h ${miutes} ms ${seconds} s`
        eventsList.innerHTML += `
            <div class="event">
              <h2>${event.eventName}</h2>
              <p>Organized by: ${event.eventOrganizer}</p>
              <p>Category: ${event.eventCategory}</p>
              <p>Date: ${event.eventDate}</p>
              <p><span> Time left : </span> ${countDown}</p>
              <button class="delete" onclick="deleteEvent('${index}')">Delete Event</button> 
              </div>
        `;
        // console.log(days);
        // if(days < 2){
        // document.querySelector('.event p:last-of-type').classList.add('urgent');
            
        // }
        const eventElement = eventsList.lastElementChild;
        if (days < 2) {
            eventElement.querySelector('p:last-of-type').classList.add('urgent');
        }

    });

}
let intervalId = setInterval(displayEvent, 1000);

function Clear() {
    let eventName = document.querySelector('.event-name');
    let eventOrganizer = document.querySelector('.organizer');
    let eventDate = document.querySelector('.event-date');
    document.querySelector('.event-category').value = "Work";


    eventName.value = eventDate.value = eventOrganizer.value = '';
}

function deleteEvent(index) {
    showDeleteAlert()
    let events = JSON.parse(localStorage.getItem("events"));
    events.splice(index,1);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvent();
}


function searchEvents() {
    const searchTerm = document.querySelector('.search').value.toLowerCase();
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const filteredEvents = events.filter(event => event.eventName.toLowerCase().includes(searchTerm));
    
    
    if (searchTerm.length > 0) {
        clearInterval(intervalId); // Stop the interval updates when there is a search term
    } else {
        // If the search box is cleared, restart the interval
        intervalId = setInterval(displayEvent, 1000);
    }
    displayEventFilter(filteredEvents);
}

function displayEventFilter(events) {

    let eventsList = document.querySelector('.events');
    eventsList.innerHTML = "";
    events.forEach((event,index) => {
        const now = new Date().getTime();
        const timeLeft = event.timeStamp - now;

        const days = Math.floor(timeLeft / (1000 * 24 * 60 * 60));
        const hours = Math.floor(timeLeft % (1000 * 24 * 60 * 60) /(1000 * 60 * 60));
        const miutes = Math.floor(timeLeft  % (1000 * 60 * 60) / (1000 * 60));
        const seconds = Math.floor(timeLeft % (1000 * 60 ) / (1000 ));

        const countDown = `${days} d ${hours} h ${miutes} ms ${seconds} s`
        eventsList.innerHTML += `
            <div class="event">
              <h2>${event.eventName}</h2>
              <p>Organized by: ${event.eventOrganizer}</p>
              <p>Category: ${event.eventCategory}</p>
              <p>Date: ${event.eventDate}</p>
              <p><span> Time left : </span> ${countDown}</p>
              <button class="delete" onclick="deleteEvent('${index}')">Delete Event</button>
              
            </div>
        `;
     
    });
}




function showSuccessAlert() {
    Swal.fire({
        title: 'Success!',
        text: 'Your action was successful.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

function showErrorAlert() {
    Swal.fire({
        title: 'Error!',
        text: 'Something went wrong.',
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

function showDeleteAlert() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}
