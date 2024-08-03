async function loadPriestInfo(containerId) {
  try {
    const response = await fetch("/app/priest/read", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear existing content

    if (data.length === 0) {
      return;
    }

    for (let index = data.length - 1; index >= 0; index--) {
      const item = data[index];

      const imageUrl = item.image.replace(/^.*\/public\//, "../");
      const fromDate = new Date(item.fromDate).toLocaleDateString();
      let toDate = new Date(item.toDate).toLocaleDateString();
      if (toDate == "Invalid Date") {
        toDate = "...".toString();
      }
      const itemHtml = `
            <div class="ministry">
              <div class="col-xl-4 col-md-6">
                <div class="ministry_image">
                  <img src="${imageUrl}" alt="${item.name}"/>
                </div>
              </div>
              <div class="col-xl-8 col-md-6">
                <div class="ministry_title">
                    <h2>${item.name}<h2>
                </div>
                <div class="ministry_color">
                    <h4>Date of Ordination : ${item.dateOfOrdination}</h4>
                    <br>
                    <h4>${fromDate} - ${toDate}</h4>
                </div>
                <div class="ministry_text">
                  <p>${item.description}</p>
                </div>
              </div>
            </div>
        `;
      container.insertAdjacentHTML("beforeend", itemHtml);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPriestInfo("priest-info");
});
