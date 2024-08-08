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
    const imageUrl = data[len].image.replace(/^.*\/public\//, "../");

    document.getElementById(titleId).textContent = data[len].name;
    document.getElementById(imageId).src = imageUrl;
    document.getElementById(detailsId).textContent = data[len].description;
    if (addressId) {
      document.getElementById(addressId).textContent = data[len].address;
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
