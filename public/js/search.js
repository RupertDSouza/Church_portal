async function performSearch(event) {
  if (event) event.preventDefault();

  const searchTerm = document.getElementById("searchInput").value;
  if (!searchTerm) return;

  try {
    const results = await Promise.all([
      fetch(`/app/church/read?q=${encodeURIComponent(searchTerm)}`).then(
        (res) => res.json()
      ),
      fetch(`/app/priest/read?q=${encodeURIComponent(searchTerm)}`).then(
        (res) => res.json()
      ),
      fetch(`/app/ward/read?q=${encodeURIComponent(searchTerm)}`).then((res) =>
        res.json()
      ),
      fetch(`/app/news/read?q=${encodeURIComponent(searchTerm)}`).then((res) =>
        res.json()
      ),
      fetch(`/app/association/read?q=${encodeURIComponent(searchTerm)}`).then(
        (res) => res.json()
      ),
      fetch(`/app/document/read?q=${encodeURIComponent(searchTerm)}`).then(
        (res) => res.json()
      ),
      fetch(`/app/institution/read?q=${encodeURIComponent(searchTerm)}`).then(
        (res) => res.json()
      ),
      fetch(`/app/mass/read?q=${encodeURIComponent(searchTerm)}`).then((res) =>
        res.json()
      ),
      fetch(`/app/obituary/read?q=${encodeURIComponent(searchTerm)}`).then(
        (res) => res.json()
      ),
      fetch(`/app/parishcouncil/read?q=${encodeURIComponent(searchTerm)}`).then(
        (res) => res.json()
      ),
      fetch(`/app/reading/read?q=${encodeURIComponent(searchTerm)}`).then(
        (res) => res.json()
      ),
    ]);

    displayResults(results.flat());
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

function displayResults(results) {
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";

  if (
    results.length === 0 ||
    (results.length === 1 && results[0].message === "Not found")
  ) {
    resultsContainer.innerHTML = "<p>No results found</p>";
  } else {
    results.forEach((result, index) => {
      if (result.message !== "Not found") {
        const resultDiv = document.createElement("div");
        resultDiv.className = "result-item";

        // Array of possible fields
        const fields = [
          "title",
          "name",
          "content",
          "history",
          "day",
          "info",
          "link",
          "firstReading",
          "secondReading",
          "responsorialPsalm",
          "gospel",
          "place",
          "type",
        ];

        fields.forEach((field) => {
          if (result[field]) {
            let element;

            switch (field) {
              case "title":
              case "name":
                element = document.createElement("h3");
                break;
              case "link":
                if (field === "link") {
                  element = document.createElement("a");
                  element.className = `content-${field}`;
                  element.href = result[field];
                  element.textContent = "Click Here to view more";
                } else {
                  element.textContent = `${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }: ${result[field]}`;
                }
                break;
              case "content":
              case "history":
                element = document.createElement("div");
                element.className = `content-${field}`;
                element.textContent = result[field];
                break;
              case "day":
              case "info":
                element = document.createElement("div");
                element.className = `result-${field}`;

                // Create a table to hold the info items
                const infoTable = document.createElement("table");
                infoTable.className = "info-table";

                // Check if result[field] is an array
                if (Array.isArray(result[field])) {
                  // If it's an array, iterate through it
                  result[field].forEach((item, index) => {
                    const row = infoTable.insertRow();

                    // Add a header cell for the item number
                    const headerCell = row.insertCell();
                    headerCell.textContent = `${index + 1}`;
                    headerCell.style.fontWeight = "bold";

                    // Add a cell for the item contents
                    const contentCell = row.insertCell();

                    // Create an inner table for the item's properties
                    const innerTable = document.createElement("table");
                    innerTable.className = "inner-info-table";

                    for (const [key, value] of Object.entries(item)) {
                      if (key !== "_id") {
                        const innerRow = innerTable.insertRow();
                        const keyCell = innerRow.insertCell();
                        const valueCell = innerRow.insertCell();

                        keyCell.textContent = key;
                        keyCell.style.fontWeight = "bold";
                        valueCell.textContent = value;
                      }
                    }

                    contentCell.appendChild(innerTable);
                  });
                } else if (
                  typeof result[field] === "object" &&
                  result[field] !== null
                ) {
                  // If it's a single object, display its properties
                  const row = infoTable.insertRow();
                  const contentCell = row.insertCell();

                  const innerTable = document.createElement("table");
                  innerTable.className = "inner-info-table";

                  for (const [key, value] of Object.entries(result[field])) {
                    const innerRow = innerTable.insertRow();
                    const keyCell = innerRow.insertCell();
                    const valueCell = innerRow.insertCell();

                    keyCell.textContent = key;
                    keyCell.style.fontWeight = "bold";
                    valueCell.textContent = value;
                  }

                  contentCell.appendChild(innerTable);
                } else {
                  // If it's neither an array nor an object, display as is
                  const row = infoTable.insertRow();
                  const cell = row.insertCell();
                  cell.textContent = result[field];
                }

                element.appendChild(infoTable);
                break;
              default:
                element = document.createElement("p");
            }

            resultDiv.appendChild(element);
          }
        });

        if (result.image) {
          const img = document.createElement("img");
          img.src = result.image.replace(/^.*\/public\//, "../");
          img.alt = result.title || result.name || "Result image";
          img.className = "result-image";
          resultDiv.appendChild(img);
        }

        resultsContainer.appendChild(resultDiv);
      }
    });
  }

  // Show the modal
  const modal = document.getElementById("searchModal");
  modal.style.display = "block";
}

// Close the modal when the user clicks on <span> (x)
document.querySelector(".close").onclick = function () {
  document.getElementById("searchModal").style.display = "none";
};

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
  const modal = document.getElementById("searchModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Add event listener for the search form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", performSearch);
  }
});
