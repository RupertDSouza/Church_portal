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
  tableBody.innerHTML = "";

  scheduleData.forEach((daySchedule) => {
    if (!daySchedule.masses || daySchedule.masses.length === 0) {
      const row = document.createElement("tr");
      const dayCell = document.createElement("td");
      dayCell.textContent = daySchedule.name;
      row.appendChild(dayCell);
      const emptyCell = document.createElement("td");
      emptyCell.colSpan = 4;
      emptyCell.textContent = "No masses scheduled";
      emptyCell.style.color = "#aaa";
      row.appendChild(emptyCell);
      tableBody.appendChild(row);
      return;
    }

    daySchedule.masses.forEach((event, index) => {
      const row = document.createElement("tr");

      if (index === 0) {
        const dayCell = document.createElement("td");
        dayCell.textContent = daySchedule.name;
        dayCell.rowSpan = daySchedule.masses.length;
        row.appendChild(dayCell);
      }

      const titleCell = document.createElement("td");
      titleCell.textContent = event.title || "—";
      row.appendChild(titleCell);

      const occasionCell = document.createElement("td");
      occasionCell.textContent = event.occasion || "—";
      row.appendChild(occasionCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = event.date && !isNaN(new Date(event.date).getTime())
        ? new Date(event.date).toLocaleDateString() : "—";
      row.appendChild(dateCell);

      const timeCell = document.createElement("td");
      timeCell.textContent = event.time || "—";
      row.appendChild(timeCell);

      tableBody.appendChild(row);
    });
  });
}


// Make popup functions globally accessible
window.showMassSchedule = async function () {
  const popupOverlay = document.getElementById('popupOverlay');
  const schedulePopup = document.getElementById('schedulePopup');

  if (popupOverlay && schedulePopup) {
    popupOverlay.style.display = 'block';
    schedulePopup.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Populate schedule data
    await populateSchedule();
  }
};

window.showDailyReading = async function () {
  const popupOverlay = document.getElementById('popupOverlay');
  const readingsPopup = document.getElementById('readingsPopup');

  if (popupOverlay && readingsPopup) {
    popupOverlay.style.display = 'block';
    readingsPopup.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Populate readings data
    await populateReadings();
  }
};

window.showSpotlight = function () {
  const popupOverlay = document.getElementById('popupOverlay');
  const spotlightPopup = document.getElementById('spotlightPopup');

  if (popupOverlay && spotlightPopup) {
    popupOverlay.style.display = 'block';
    spotlightPopup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
};

// Close popup function
window.closePopup = function () {
  const popupOverlay = document.getElementById('popupOverlay');
  const allPopups = document.querySelectorAll('.popup');

  if (popupOverlay) {
    popupOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  allPopups.forEach(popup => {
    popup.style.display = 'none';
  });

  // Update URL to base URL when closing popup
  window.history.replaceState({}, document.title, window.location.pathname);
};

// Close popup when clicking outside
document.addEventListener('DOMContentLoaded', function () {
  const popupOverlay = document.getElementById('popupOverlay');
  if (popupOverlay) {
    popupOverlay.addEventListener('click', function (e) {
      if (e.target === popupOverlay) {
        closePopup();
      }
    });
  }

  // Add close button event listeners
  const closeButtons = document.querySelectorAll('.close-btn');
  closeButtons.forEach(button => {
    button.addEventListener('click', closePopup);
  });
});

window.addEventListener('popstate', function (event) {
  if (event.state && event.state.popup) {
    switch (event.state.popup) {
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
  switch (path) {
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
