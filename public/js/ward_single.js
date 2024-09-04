async function loadSingleWardInfo() {
  try {
    let response;
    const wardId = sessionStorage.getItem("selectedWardId");
    if (wardId) {
      response = await fetch(`/app/ward/read/${wardId}`, {
        method: "GET",
      });
    }
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const item = await response.json();

    if (item.length === 0) {
      return;
    }

    const imageUrl = item.image;
    const gurkarImageUrl = item.gurkarImage;

    document.getElementById("ward-name").innerText = item.name;
    document.getElementById("ward-img").src = imageUrl;
    document.getElementById("ward-place").innerText = item.place;
    document.getElementById("ward-no-families").innerText = item.noOfFamilies;
    document.getElementById("ward-no-members").innerText = item.noOfMembers;
    document.getElementById("ward-description").innerText = item.description;
    document.getElementById("ward-gurkar-name").innerText = item.gurkarName;
    document.getElementById("ward-gurkar-img").src = gurkarImageUrl;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => loadSingleWardInfo());
