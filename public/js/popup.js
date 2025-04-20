async function fetchAnyData(endpoint) {
  try {
    const response = await fetch(`/app/${endpoint}/read`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    return null;
  }
}

async function populateReadings() {
  const readingsData = await fetchAnyData("reading");
  if (!readingsData) {
    alert("Failed to fetch readings data. Please try again later.");
    return;
  }

  const content = document.getElementById("readingsContent");
  content.innerHTML = "";

  for (let index = 0; index <= readingsData.length - 1; index++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day-readings";

    const date = new Date(readingsData[index].date).toLocaleDateString();
    const itemDate = `<h3>${date}</h3>`;
    dayDiv.insertAdjacentHTML("beforeend", itemDate);

    const readings = [
      { title: "First Reading", text: readingsData[index].firstReading },
      { title: "Second Reading", text: readingsData[index].secondReading },
      {
        title: "Responsorial Psalm",
        text: readingsData[index].responsorialPsalm,
      },
      { title: "Gospel", text: readingsData[index].gospel },
    ];

    readings.forEach((reading) => {
      if (reading.text) {
        const section = document.createElement("div");
        section.className = "reading";
        section.innerHTML = `
          <h4>${reading.title}</h4>
          <h3>${reading.text}</h3>
        `;
        dayDiv.appendChild(section);
      }
    });

    content.appendChild(dayDiv);
  }
}

async function populateSchedule() {
  const scheduleData = await fetchAnyData("mass");
  if (!scheduleData) {
    alert("Failed to fetch schedule data. Please try again later.");
    return;
  }

  const tableBody = document.getElementById("scheduleBody");
  tableBody.innerHTML = ""; // Clear existing content

  scheduleData.forEach((daySchedule) => {
    daySchedule.info.forEach((event, index) => {
      const row = document.createElement("tr");

      if (index === 0) {
        const dayCell = document.createElement("td");
        dayCell.textContent = daySchedule.day;
        dayCell.rowSpan = daySchedule.info.length;
        row.appendChild(dayCell);
      }

      const occasionCell = document.createElement("td");
      occasionCell.textContent = event.occasion;
      row.appendChild(occasionCell);

      const dateCell = document.createElement("td");

      if (!event.date || isNaN(new Date(event.date).getTime())) {
        dateCell.textContent = "...";
      } else {
        dateCell.textContent = new Date(event.date).toLocaleDateString();
      }

      row.appendChild(dateCell);

      const timeCell = document.createElement("td");
      timeCell.textContent = event.time;
      row.appendChild(timeCell);

      tableBody.appendChild(row);
    });
  });
}

// Make functions globally accessible
window.showMassSchedule = function() {
  console.log('Showing Mass Schedule'); // Debug log
  populateSchedule();
  document.getElementById("schedulePopup").style.display = "block";
  document.getElementById("popupOverlay").style.display = "block";
  history.pushState({ popup: 'schedule' }, '', '/mass_schedule');
}

window.showDailyReading = function() {
  console.log('Showing Daily Reading'); // Debug log
  populateReadings();
  document.getElementById("readingsPopup").style.display = "block";
  document.getElementById("popupOverlay").style.display = "block";
  history.pushState({ popup: 'readings' }, '', '/daily_reading');
}

window.showSpotlight = function() {
  console.log('Showing Spotlight'); // Debug log
  document.getElementById("popupOverlay").style.display = "block";
  history.pushState({ popup: 'spotlight' }, '', '/spotlight');
}

window.closePopup = function() {
  console.log('Closing popup'); // Debug log
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("readingsPopup").style.display = "none";
  document.getElementById("schedulePopup").style.display = "none";
  history.pushState({}, '', '/');
}

window.addEventListener('popstate', function(event) {
  if (event.state && event.state.popup) {
    switch(event.state.popup) {
      case 'schedule':
        showMassSchedule();
        break;
      case 'readings':
        showDailyReading();
        break;
      case 'spotlight':
        showSpotlight();
        break;
    }
  } else {
    closePopup();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  switch(path) {
    case '/mass_schedule':
      showMassSchedule();
      break;
    case '/daily_reading':
      showDailyReading();
      break;
    case '/spotlight':
      showSpotlight();
      break;
  }

  const closeButton = document.querySelector(".close-btn");
  closeButton.addEventListener("click", closePopup);
});
