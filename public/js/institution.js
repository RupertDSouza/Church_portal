async function fetchInstitutionData(
  url,
  titleId,
  imageId,
  detailsId,
  contactId,
  emailId,
  typeId,
  type
) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const item = data.filter((item) => item.type === type);

    const imageUrl = item[0].image;

    document.getElementById(titleId).textContent = item[0].name;
    document.getElementById(imageId).src = imageUrl;
    document.getElementById(detailsId).textContent = item[0].description;
    if (contactId) {
      document.getElementById(contactId).textContent = item[0].contact;
    }
    if (emailId) {
      document.getElementById(emailId).textContent = item[0].email;
    }
    if (typeId) {
      document.getElementById(typeId).textContent = item[0].type;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function initSlider() {
  fetchInstitutionData(
    "/app/institution/read",
    "institution-name",
    "institution-image",
    "institution-details",
    "institution-contact",
    "institution-email",
    "",
    "institution"
  );
  fetchInstitutionData(
    "/app/institution/read",
    "principal-name",
    "principal-image",
    "principal-details",
    "principal-contact",
    "principal-email",
    "principal-position",
    "principal"
  );
}
document.addEventListener("DOMContentLoaded", initSlider);
