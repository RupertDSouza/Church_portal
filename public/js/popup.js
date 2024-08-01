async function fetchScheduleData() {
  try {
    const response = await fetch("/app/mass/read");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return null;
  }
}

async function populateTable() {
  const scheduleData = await fetchScheduleData();
  if (!scheduleData) {
    alert("Failed to fetch schedule data. Please try again later.");
    return;
  }

  const tableBody = document.getElementById("scheduleBody");
  tableBody.innerHTML = ""; // Clear existing content

  scheduleData.forEach((daySchedule) => {
    console.log(daySchedule);
    daySchedule.info.forEach((event, index) => {
      const row = document.createElement("tr");

      // Day column (only for the first event of each day)
      if (index === 0) {
        const dayCell = document.createElement("td");
        dayCell.textContent = daySchedule.day;
        dayCell.rowSpan = daySchedule.info.length;
        row.appendChild(dayCell);
      }

      // Occasion column
      const occasionCell = document.createElement("td");
      occasionCell.textContent = event.occasion;
      row.appendChild(occasionCell);

      // Date column
      const dateCell = document.createElement("td");
      dateCell.textContent = new Date(event.date).toLocaleDateString();
      row.appendChild(dateCell);

      // Time column
      const timeCell = document.createElement("td");
      timeCell.textContent = event.time;
      row.appendChild(timeCell);

      tableBody.appendChild(row);
    });
  });
}

function showPopup() {
  populateTable();
  document.getElementById("popupOverlay").style.display = "block";
  document.getElementById("schedulePopup").style.display = "block";
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("schedulePopup").style.display = "none";
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  const showButton = document.getElementById("daily_mass");
  showButton.addEventListener("click", showPopup);

  const closeButton = document.querySelector(".close-btn-1");
  closeButton.addEventListener("click", closePopup);
});
