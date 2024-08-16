async function loadCommisionInfo(containerId) {
  try {
    const response = await fetch("/app/commision/read", {
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
                      <div class="col-md-4">
                          <div class="popular_item">
                            <div class="imageAndInfo">
                                <div class="text-center assoc-and-comm_item">
                                    <div class="assoc-and-comm_item_image">
                                        <img src="${imageUrl}" alt="${item.name}" />
                                    </div>
                                    <div class="assoc-and-comm_item_title">${item.name}</div>
                                    <div class="assoc-and-comm_item_text">
                                        <p>${item.description}</p>
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
  loadCommisionInfo("assoc-and-comm-container");
});
