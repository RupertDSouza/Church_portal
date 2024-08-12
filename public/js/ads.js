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
