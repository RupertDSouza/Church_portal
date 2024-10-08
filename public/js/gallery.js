async function loadAssociationInfo(containerId) {
  try {
    const response = await fetch("/app/document/read", {
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

    for (let key = data.length; key > 0; key--) {
      index = key - 1;
      if (data[index].type === "gallery") {
        const item = data[index];
        const imageUrl = item.image;

        const itemHtml = `
          <div class="gallery-item ${index % 3 === 0 ? "large" : "small"}">
          <img src="${imageUrl}" alt="${item.name}">
          <div class="image-overlay">
            <h3>${item.name}</h3>
            <p class="description">${item.description}</p>
          </div>
          <a href="${
            item.link
          }" class="item-link" target="_blank" rel="noopener noreferrer"></a>
        </div>
        `;
        container.insertAdjacentHTML("beforeend", itemHtml);
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAssociationInfo("gallery-container");
});
