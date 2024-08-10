async function loadAboutUs(containerId) {
  try {
    const response = await fetch("/app/church/read", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear existing content

    if (data.length === 0) {
      return;
    }
    const item = data[data.length - 1];

    const imageUrl = item.image.replace(/^.*\/public\//, "../");
    const formattedAddress = item.address.replace(/, /g, "\n");
    const itemHtml = `
                  <div class="container">
          <div class="church_title">About our Church</div>
          <div class="contact_info_image">
            <img src="${imageUrl}" alt />
          </div>
          <div class="contact_title">
            <h2>${item.name}, </h2>
            <h3>Mukka</h3>
          </div>
          <div class="contact_content"><p>${item.history}</p></div>
          <hr />
          <div class="contact_content"><p>${item.description}</p></div>

          <div class="contact_title">Contacts</div>
          <div class="row more_contact_info">
            <div class="col-lg-4 contact_info_col">
              <ul class="contact_info_list">
                <li class="address_alignment">
                  <span>Address: </span> 
                  <div class="contact_address">${formattedAddress}</div>
                </li>
                <li class="footer_contact_phone">
                  <span>Phone: </span>${item.contact}
                </li>
                <li>
                  <span>Email: </span>
                  <a id="email" href="" class="__cf_email__" value="${
                    item.email
                  }">
                    [email&#160;protected]
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-lg-7 contact_info_col">
            <div class="row" id="contacts">
                ${loadContact("contacts")}
              </div>
            </div>
          </div>
        </div>
            `;
    container.insertAdjacentHTML("beforeend", itemHtml);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function loadContact(containerId) {
  try {
    const response = await fetch("/app/parishcouncil/read", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear existing content

    if (data.length === 0) {
      return;
    }

    for (let index = 0; index <= data.length - 1; index++) {
      const item = data[index];

      const imageUrl = item.image.replace(/^.*\/public\//, "../");
      const itemHtml = `
                    <div class="col-md-4 contact_list">
                      <h5>${item.designation}</h5>
                      <h4>${item.name}</h4>
                      <h6>${item.contact}</h6>
                    </div>`;
      container.insertAdjacentHTML("beforeend", itemHtml);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAboutUs("contact_info");
});
