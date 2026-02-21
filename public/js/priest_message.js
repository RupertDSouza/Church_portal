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
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = `<div class="col-12 text-center" style="padding:40px 0;color:#888;">No message available at this moment.</div>`;
      return;
    }

    data.forEach((item) => {
      const imageHtml = item.image
        ? `<div class="assoc-and-comm_item_image" style="width:250px;height:250px;overflow:hidden;border-radius:50%;border:5px solid #fff;box-shadow:0 4px 8px rgba(0,0,0,0.1);margin-bottom:20px;">
               <img src="${item.image}" alt="Priest Message" style="width:100%;height:100%;object-fit:cover;" />
           </div>`
        : "";

      const itemHtml = `
        <div class="col-md-12">
          <div class="popular_item" style="margin-bottom:30px;display:flex;flex-direction:column;align-items:center;background:#f9f9f9;padding:30px 20px;border-radius:10px;box-shadow:0 4px 8px rgba(0,0,0,0.1);">
            ${imageHtml}
            <div class="assoc-and-comm_item_title" style="font-size:24px;font-weight:bold;color:#333;margin-bottom:16px;">${item.messageTitle || ""}</div>
            <div class="assoc-and-comm_item_text" style="font-size:16px;line-height:1.8;color:#555;text-align:justify;max-width:800px;">
              <p>${item.messageDescription || ""}</p>
            </div>
          </div>
        </div>`;
      container.insertAdjacentHTML("beforeend", itemHtml);
    });
  } catch (error) {
    console.error("Error fetching priest message:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPriestMessage("assoc-and-comm-container");
});
