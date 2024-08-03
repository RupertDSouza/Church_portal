async function fetchData(url, addressId) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();

    document.getElementById(addressId).textContent = data[0].address;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function initAddress() {
  fetchData("/app/church/read", "church-address");
}
document.addEventListener("DOMContentLoaded", initAddress);
