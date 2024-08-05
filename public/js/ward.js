async function loadWardInfo(containerId) {
  try {
    const response = await fetch("/app/ward/read", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data);

    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear existing content

    if (data.length === 0) {
      return;
    }

    for (let index = 0; index <= data.length - 1; index++) {
      const item = data[index];
      console.log(item);

      const imageUrl = item.image.replace(/^.*\/public\//, "../");
      const itemHtml = `
                <div class="featured_1">
                    <div class="col-lg-12">
                        <div class="popular_item">
                            <div class="popular_image">
                            <img src="${imageUrl}" alt />
                            </div>
                            <div class="ward_content">
                            <div class="ward_title">
                                <a href="ward_single.ejs"> ${item.name} </a>
                            </div>
                            <ul class="ward_list">
                                <li>Place: ${item.place}</li>
                                <li>No of Families: ${item.noOfFamilies}</li>
                                <li>No of People: ${item.noOfMembers}</li>
                            </ul>
                            <div class="ward_text">
                                <p>${item.details}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
          `;
      container.insertAdjacentHTML("beforeend", itemHtml);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadWardInfo("ward-container");
});
