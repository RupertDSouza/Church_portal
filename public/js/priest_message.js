async function loadPriestMessage(containerId) {
  try {
    const response = await fetch("/app/priestMessage/read", {
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

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      
      // Usually there is only 1 current parish priest, but we'll loop just in case
      // Or we can just display the most recent one.

      const imageUrl = item.image;
      
      // Formatting date nicely
      let dateString = "";
      if (item.fromDate) {
         dateString += new Date(item.fromDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }

      const itemHtml = `
                      <div class="col-md-12">
                          <div class="popular_item" style="margin-bottom: 30px; display: flex; flex-direction: column; align-items: center; background: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                              <div class="assoc-and-comm_item_image" style="width: 250px; height: 250px; overflow: hidden; border-radius: 50%; border: 5px solid #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin-bottom: 20px;">
                                  <img src="${imageUrl}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" />
                              </div>
                              <div class="assoc-and-comm_item_title" style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 10px;">${item.name}</div>
                              <div class="assoc-and-comm_item_subtitle" style="font-size: 16px; color: #777; margin-bottom: 20px;">Parish Priest Since: ${dateString}</div>
                              <div class="assoc-and-comm_item_text" style="font-size: 16px; line-height: 1.6; color: #555; text-align: justify; max-width: 800px;">
                                  <p>${item.description || "No message available at this moment."}</p>
                              </div>
                          </div>
                      </div>
            `;
      container.insertAdjacentHTML("beforeend", itemHtml);
    }
  } catch (error) {
    console.error("Error fetching priest data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPriestMessage("assoc-and-comm-container");
});
