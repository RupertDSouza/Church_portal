async function fetchAds(endpoint) {
  try {
    const response = await fetch(`/app/spotlight/read`);
    if (!response.ok) {
      throw new Error("Not OK: " + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    return null;
  }
}

function displayAds() {
  const ads = document.getElementById("ads");
  const closeBtn = document.getElementById("closeBtn");
  const arrowBtn = document.getElementById("arrowBtn");
  const bottomIcon = document.getElementById("bottomIcon");

  function showAds() {
    ads.style.display = "block";
    arrowBtn.style.display = "none";
  }

  function hideAds() {
    ads.style.display = "none";
    arrowBtn.style.display = "block";
  }

  // Show Ads initially
  showAds();

  closeBtn.addEventListener("click", hideAds);
  arrowBtn.addEventListener("click", showAds);

  bottomIcon.addEventListener("click", () => {
    if (arrowBtn.style.display === "none") {
      showAds();
    }
  });

  window.addEventListener("scroll", () => {
    const arrowRect = arrowBtn.getBoundingClientRect();
    const iconRect = bottomIcon.getBoundingClientRect();

    if (Math.abs(arrowRect.top - iconRect.top) < 50) {
      arrowBtn.style.left = `${iconRect.left - arrowBtn.offsetWidth}px`;
      arrowBtn.style.opacity = "0";
      setTimeout(() => {
        arrowBtn.style.display = "none";
      }, 500);
    }
  });
}

async function spotlight(containerId) {
  const data = await fetchAds();

  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear existing content

  if (data.length === 0) {
    return;
  }

  for (let index = data.length - 1; index >= 0; index--) {
    const item = data[index];

    const imageUrl = item.image.replace(/^.*\/public\//, "../");
    const itemHtml = `
          <div class="ads-container">
            <img src="${imageUrl}" alt />
            <h4>${item.title}</h4>
            <p id="ads-content">${item.description}</p>
          </div>
    `;
    container.insertAdjacentHTML("beforeend", itemHtml);
  }

  displayAds();
}

document.addEventListener("DOMContentLoaded", () => spotlight("ads-content"));
