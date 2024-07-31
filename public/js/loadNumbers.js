async function fetchWardData(url, containerId) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    const container = document.getElementById(containerId);

    container.innerHTML = ""; // Clear existing content

    data.forEach((item) => {
      const itemHtml = `
            <div class="number-container">
              <div class="number" data-target="${item.noOfMembers}"></div>
              <div class="label">${item.name}</div>
            </div>
          `;
      container.insertAdjacentHTML("beforeend", itemHtml);
    });

    wardInfo();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function wardInfo() {
  const numbers = document.querySelectorAll(".number");
  const duration = 2000; // duration of the counting animation in milliseconds

  numbers.forEach((number) => {
    const target = +number.getAttribute("data-target");
    const increment = target / (duration / 16); // assuming 60fps, so 16ms per frame

    let current = 0;

    const updateNumber = () => {
      current += increment;
      if (current < target) {
        number.innerText = Math.floor(current);
        requestAnimationFrame(updateNumber);
      } else {
        number.innerText = target;
      }
    };

    updateNumber();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchWardData("/app/ward/read", "number-row");
});
