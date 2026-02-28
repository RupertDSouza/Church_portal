// ─── Shared API fetch ─────────────────────────────────────────────────────────
async function getPriestMessages() {
  const response = await fetch("/app/priestMessage/read", { method: "GET" });
  if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
  return response.json();
}

// ─── Renderer 1: full message page (priest_message.ejs) ──────────────────────
function renderMessagePage(data, containerId) {
  const container = document.getElementById(containerId);
  const template = document.getElementById("pm-card-template");
  const noMsg = document.getElementById("pm-no-message");
  if (!container || !template) return;

  container.innerHTML = "";

  if (!data || data.length === 0) {
    if (noMsg) noMsg.style.display = "";
    return;
  }

  data.forEach((item) => {
    // Clone the template
    const clone = template.content.cloneNode(true);

    // Fill title
    clone.querySelector(".pm-title").textContent = item.messageTitle || "";

    // Fill description
    clone.querySelector(".pm-description-text").innerHTML = item.messageDescription || "";

    // Image vs no-image
    const imageWrap = clone.querySelector(".pm-image-wrap");
    const labelOnly = clone.querySelector(".pm-label-only");

    if (item.image) {
      clone.querySelector(".pm-img-blur").style.backgroundImage = `url('${item.image}')`;
      clone.querySelector(".pm-img").src = item.image;
      labelOnly.style.display = "none";
    } else {
      imageWrap.style.display = "none";
    }

    container.appendChild(clone);
  });
}

// ─── Renderer 2: inline preview card (index.ejs) ─────────────────────────────
function renderInlinePreview(data) {
  if (!data || data.length === 0) return;
  const inlineEl = document.getElementById("pm-inline");
  if (!inlineEl) return;                        // not on the index page, skip

  const item = data[data.length - 1];
  document.getElementById("pm-msg-title").textContent = item.messageTitle || "";
  const desc = item.messageDescription || "";
  document.getElementById("pm-desc").textContent =
    desc.length > 120 ? desc.substring(0, 120) + "\u2026" : desc;
  if (item.image) {
    const img = document.getElementById("pm-inline-img");
    img.src = item.image;
    img.style.display = "block";
  }
  inlineEl.style.display = "";
}

// ─── Entry point: one fetch, two renderers ────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await getPriestMessages();
    renderMessagePage(data, "assoc-and-comm-container");
    renderInlinePreview(data);
  } catch (error) {
    console.error("Error loading priest message:", error);
  }
});
