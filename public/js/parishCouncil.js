async function loadParishCouncilInfo(containerId) {
  try {
    const response = await fetch("/app/parishcouncil/read", {
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

      const imageUrl = item.image.replace(/^.*\/public\//, "../");
      const itemHtml = `
                      <div class="col-md-3">
                          <div class="popular_item">
                            <div class="imageAndInfo">
                                <div class="text-center parish-council_item">
                                    <div class="parish-council_item_image">
                                        <img src="${imageUrl}" alt="${item.name}" />
                                    </div>
                                    <div class="parish-council_item_title">${item.name}</div>
                                    <div class="parish-council_item_text">
                                        <h6>${item.designation}</h6>
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

document.addEventListener("DOMContentLoaded", () => {
  loadParishCouncilInfo("parish-council-container");
});
