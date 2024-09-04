async function loadWardInfo(containerId) {
  try {
    const response = await fetch("/app/ward/read", {
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

    for (let index = 0; index <= data.length - 1; index++) {
      const item = data[index];

      const imageUrl = item.image;
      const truncatedContent =
        item.description.length > 300
          ? item.description.substring(0, 300) + "..."
          : item.description;
      const itemHtml = `
                <div class="featured_1" data-id="${item._id}" onclick="redirectToDetailPage('${item._id}')">
                    <div class="col-lg-12">
                        <div class="popular_item">
                            <div class="popular_image">
                            <img src="${imageUrl}" alt />
                            </div>
                            <div class="ward_content">
                            <div class="ward_title">
                                <h2> ${item.name} </h2>
                            </div>
                            <ul class="ward_list">
                                <li>Place: ${item.place}</li>
                                <li>No of Families: ${item.noOfFamilies}</li>
                                <li>No of People: ${item.noOfMembers}</li>
                            </ul>
                            <div class="ward_text">
                                <p>${truncatedContent}</p>
                            </div>
                            </div>
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

function redirectToDetailPage(wardId) {
  sessionStorage.setItem("selectedWardId", wardId);
  window.location.href = `/ward_single`;
}

document.addEventListener("DOMContentLoaded", () => {
  loadWardInfo("ward-container");
});
