async function fetchData(url, titleId, imageId, detailsId, addressId) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const len = data.length - 1;
    const item = data[len];

    const imageUrl = item.image;

    document.getElementById(titleId).textContent = item.name;
    document.getElementById(imageId).src = imageUrl;

    const truncatedContent =
      item.description.length > 200
        ? item.description.substring(0, 200) + "..."
        : item.description;
    document.getElementById(detailsId).textContent = truncatedContent;
    if (addressId) {
      document.getElementById(addressId).textContent = item.address;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchPriestMessage() {
  try {
    const response = await fetch("/app/priestMessage/read", { method: "GET" });
    if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
    const data = await response.json();
    if (!data || data.length === 0) return;
    const item = data[data.length - 1];

    document.getElementById("pm-msg-title").textContent = item.messageTitle || "";
    var desc = item.messageDescription || "";
    document.getElementById("pm-desc").textContent =
      desc.length > 120 ? desc.substring(0, 120) + "\u2026" : desc;
    if (item.image) {
      var img = document.getElementById("pm-inline-img");
      img.src = item.image;
      img.style.display = "block";
    }
    document.getElementById("pm-inline").style.display = "";
  } catch (error) {
    console.error("Priest message error:", error);
  }
}

function initSlider() {
  fetchData(
    "/app/church/read",
    "church-title",
    "church-image",
    "church-details",
    "church-address"
  );
  fetchData(
    "/app/priest/read",
    "priest-title",
    "priest-image",
    "priest-details"
  );
  fetchPriestMessage();
}
document.addEventListener("DOMContentLoaded", initSlider);
