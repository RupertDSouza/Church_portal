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

  for (let index = data.length - 1; index >= 0; index--) {
    item = data[index];
    const imageUrl = item.image;

    const itemHtml = `
         <div class="latest_news d-flex flex-row align-items-start justify-content-start">
            <div class="latest_news_image_container">
            <div class="latest_news_image">
                <img src="${imageUrl}" alt />
            </div>
            </div>
            <div class="latest_news_content">
            <div class="latest_news_date">${new Date(item.dates).getDate()}
            ${new Date(item.dates).toLocaleString("default", {
              month: "long",
            })} ${new Date(item.dates).getFullYear()}</div>
            <div class="latest_news_title">
                <a href="#">${item.title}</a>
            </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML("beforeend", itemHtml);
  }
}

function displayBlogContent(item_container, item) {
  const blogContent = document.getElementById(item_container);
  const imageUrl = item.image;

  const blogHtml = `
    <div class="blog_post">
      <div class="blog_image">
        <img src="${imageUrl}" alt />
        <div class="news_date d-flex flex-column align-items-center justify-content-center">
          <div class="news_day">${new Date(item.dates).getDate()} ${new Date(
    item.dates
  ).toLocaleString("default", { month: "long" })}, ${new Date(
    item.dates
  ).getFullYear()}
          </div>
        </div>
      </div>
      <div class="blog_title">${item.title}</div>
      <div class="blog_meta">
        <ul>
          <li>In <a href="#">${item.type}</a></li>
        </ul>
      </div>
      <div class="blog_text">
        <p>${item.content}</p>
      </div>
    </div>
  `;

  blogContent.innerHTML = blogHtml;
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchNews("/app/news/read");

  const recentNews = getItem(data, "news");
  const recentEvents = getItem(data, "events");
  const recentAnnouncements = getItem(data, "announcements");

  displayItem("news_container", recentNews);
  displayItem("events_container", recentEvents);
  displayItem("announcements_container", recentAnnouncements);

  // Display the latest news item by default
  if (recentNews && recentNews.length > 0) {
    displayBlogContent("news_content", recentNews[recentNews.length - 1]);
  }
  if (recentEvents && recentEvents.length > 0) {
    displayBlogContent("events_content", recentEvents[recentEvents.length - 1]);
  }
  if (recentAnnouncements && recentAnnouncements.length > 0) {
    displayBlogContent(
      "announcements_content",
      recentAnnouncements[recentAnnouncements.length - 1]
    );
  }
  // Add click event listeners to sidebar items
  document.querySelectorAll(".latest_news").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const title = item.querySelector(".latest_news_title a").textContent;

      const matchingItemNews = recentNews.find(
        (newsItem) => newsItem.title === title
      );
      if (matchingItemNews) {
        displayBlogContent("news_content", matchingItemNews);
      }

      const matchingItemEvents = [...recentEvents].find(
        (eventsItem) => eventsItem.title === title
      );
      if (matchingItemEvents) {
        displayBlogContent("events_content", matchingItemEvents);
      }

      const matchingItemAnnouncements = [...recentAnnouncements].find(
        (announcementsItem) => announcementsItem.title === title
      );
      if (matchingItemAnnouncements) {
        displayBlogContent("announcements_content", matchingItemAnnouncements);
      }
    });
  });
});
