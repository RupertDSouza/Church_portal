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

function showPopup1() {
  populateSchedule();
  document.getElementById("schedulePopup").style.display = "block";
  document.getElementById("popupOverlay").style.display = "block";
}

function showPopup2() {
  populateReadings();
  document.getElementById("readingsPopup").style.display = "block";
  document.getElementById("popupOverlay").style.display = "block";
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("readingsPopup").style.display = "none";
  document.getElementById("schedulePopup").style.display = "none";
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  const showButton1 = document.getElementById("daily_mass");
  showButton1.addEventListener("click", showPopup1);

  const showButton2 = document.getElementById("daily_reading");
  showButton2.addEventListener("click", showPopup2);

  const closeButton = document.querySelector(".close-btn");
  closeButton.addEventListener("click", closePopup);
});
