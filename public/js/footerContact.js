async function fetchContact(url, contactId, emailId) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    const containerC = document.getElementById(contactId);
    const emailLink = document.getElementById(emailId);

    if (!containerC) {
      console.error(`Element with id "${contactId}" not found`);
      return;
    }

    if (!emailLink) {
      console.error(`Element with id "${emailId}" not found`);
      return;
    }

    containerC.innerHTML = "";
    emailLink.innerHTML = "";

    for (
      let index = data.length - 1;
      index >= Math.max(data.length - 2, 0);
      index--
    ) {
      const item = data[index];
      const itemContact = `<div>${item.contact}</div>`;
      containerC.insertAdjacentHTML("beforeend", itemContact);

      if (item.email) {
        emailLink.innerHTML = item.email;
        emailLink.href = `mailto:${item.email}`;
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function contacts() {
  fetchContact("/app/parishcouncil/read", "contact", "email");
}

document.addEventListener("DOMContentLoaded", contacts);
