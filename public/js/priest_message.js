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
              position:relative;
              width:100%;
              height:480px;
              overflow:hidden;
              border-radius:12px 12px 0 0;
            ">
              <!-- Blurred backdrop fills the empty letterbox bars -->
              <div style="
                position:absolute;inset:0;
                background-image:url('${item.image}');
                background-size:cover;
                background-position:center;
                filter:blur(18px) brightness(0.6);
                transform:scale(1.1);
              "></div>
              <!-- Actual image, fully visible -->
              <img src="${item.image}" alt="Priest" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center;display:block;" />
              <!-- Edge fade overlay: fades all 4 edges to white -->
              <div style="
                position:absolute;inset:0;
                background:radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(255,255,255,0.55) 75%, rgba(255,255,255,0.9) 100%);
                pointer-events:none;
              "></div>
              <div style="
                position:absolute;
                bottom:0; left:0; right:0;
                height:120px;
                background:linear-gradient(to top, rgba(0,0,0,0.55), transparent);
              "></div>
              <div style="
                position:absolute;
                bottom:20px; left:32px;
                font-size:12px;
                letter-spacing:3px;
                text-transform:uppercase;
                color:#f5d98b;
                font-weight:700;
              ">Message from the Parish Priest</div>
           </div>`
        : `<div style="padding:28px 36px 0;">
              <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#b5894b;font-weight:700;">Message from the Parish Priest</div>
           </div>`;

      const itemHtml = `
        <div class="col-md-12" style="margin-bottom:40px;">
          <article style="
              background:#fff;
              border-radius:16px;
              box-shadow:0 10px 40px rgba(0,0,0,0.1);
              overflow:hidden;
              border:1px solid #f0e9df;
            ">
            ${imageHtml}
            <div style="padding:36px 40px 40px;">
              <h2 style="
                  font-size:20px;
                  font-weight:900;
                  font-style:italic;
                  color:#1a1a1a;
                  margin:0 0 20px 0;
                  line-height:1.3;
                  border-left:4px solid #b5894b;
                  padding-left:16px;
                ">${item.messageTitle || ""}</h2>
              <div style="
                  font-size:16px;
                  font-style:italic;
                  color:#4a3f32;
                  line-height:2;
                  text-align:justify;
                ">
                <span style="float:left;font-size:72px;font-family:Georgia,serif;line-height:0.75;color:#b5894b;margin:8px 12px 0 0;">&ldquo;</span>
                ${item.messageDescription || ""}
              </div>
            </div>
          </article>
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
