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
}
document.addEventListener("DOMContentLoaded", initSlider);
