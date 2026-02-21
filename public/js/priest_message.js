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
        ? `<div style="
              flex-shrink:0;
              width:200px; height:200px;
              border-radius:50%;
              overflow:hidden;
              border:5px solid #fff;
              box-shadow:0 6px 20px rgba(0,0,0,0.18);
            ">
              <img src="${item.image}" alt="Priest" style="width:100%;height:100%;object-fit:cover;" />
           </div>`
        : "";

      const itemHtml = `
        <div class="col-md-12" style="margin-bottom:32px;">
          <div style="
              display:flex;
              align-items:center;
              gap:36px;
              background:linear-gradient(135deg,#fdfcfb 0%,#f3efe9 100%);
              padding:36px 40px;
              border-radius:16px;
              box-shadow:0 8px 32px rgba(0,0,0,0.09);
              border-left:5px solid #b5894b;
            ">
            ${imageHtml}
            <div style="flex:1;">
              <div style="
                  font-size:14px;
                  letter-spacing:2px;
                  text-transform:uppercase;
                  color:#b5894b;
                  margin-bottom:8px;
                  font-weight:600;
                ">Message from the Parish Priest</div>
              <h2 style="
                  font-size:26px;
                  font-weight:800;
                  font-style:italic;
                  color:#2c2c2c;
                  margin:0 0 18px 0;
                  line-height:1.3;
                ">${item.messageTitle || ""}</h2>
              <div style="
                  font-size:15px;
                  font-style:italic;
                  color:#5a5040;
                  line-height:1.9;
                  text-align:justify;
                  border-top:1px solid #ddd;
                  padding-top:16px;
                  position:relative;
                ">
                <span style="font-size:48px;color:#ddd;line-height:0;vertical-align:-18px;margin-right:4px;">&ldquo;</span>${item.messageDescription || ""}<span style="font-size:48px;color:#ddd;line-height:0;vertical-align:-18px;margin-left:4px;">&rdquo;</span>
              </div>
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
