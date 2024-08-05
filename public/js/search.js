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
          "occasion",
          "date",
          "time",
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
            const element = document.createElement(
              field === "title" || field === "name" ? "h3" : "p"
            );
            element.className = `result-${field}`;

            if (field === "link") {
              const link = document.createElement("a");
              link.href = result[field];
              link.textContent = "Read More";
              link.target = "_blank";
              element.appendChild(link);
            } else {
              element.textContent = `${
                field.charAt(0).toUpperCase() + field.slice(1)
              }: ${result[field]}`;
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
