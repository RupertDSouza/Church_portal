async function fetchNews(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function getItem(data, type) {
  const filteredData = data.filter((item) => item.type === type);
  if (filteredData.length === 0) return null;

  return filteredData;
}

function displayItem(containerId, data) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  for (
    let index = data.length - 1;
    index >= Math.max(data.length - 3, 0);
    index--
  ) {
    item = data[index];
    console.log(item);

    const truncatedContent =
      item.content.length > 20
        ? item.content.substring(0, 20) + "..."
        : item.content;
    const imageUrl = item.image.replace(/^.*\/public\//, "../");
    console.log(imageUrl);

    const itemHtml = `
         <div class="latest_news d-flex flex-row align-items-start justify-content-start">
            <div class="latest_news_image_container">
            <div class="latest_news_image">
                <img src="${imageUrl}" alt />
            </div>
            </div>
            <div class="latest_news_content">
            <div class="latest_news_date">${item.dates}</div>
            <div class="latest_news_title">
                <a href="#">${truncatedContent}</a>
            </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML("beforeend", itemHtml);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchNews("/app/news/read");

  const recentNews = getItem(data, "news");
  const recentEvents = getItem(data, "events");
  const recentAnnouncements = getItem(data, "announcements");

  displayItem("news_container", recentNews);
  displayItem("events_container", recentEvents);
  displayItem("announcements_container", recentAnnouncements);
});
