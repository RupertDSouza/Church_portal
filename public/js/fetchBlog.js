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

function getMostRecentItem(data, type) {
  const filteredData = data.filter((item) => item.type === type);
  if (filteredData.length === 0) return null;

  return filteredData[filteredData.length - 1];
}

function displayItem(image, title, text, dates, item) {
  if (item) {
    const imageUrl = item.image.replace(/^.*\/public\//, "../");
    document.getElementById(image).src = imageUrl;
    document.getElementById(title).textContent = `${item.title}`;

    const truncatedContent =
      item.content.length > 50
        ? item.content.substring(0, 100) + "..."
        : item.content;
    document.getElementById(text).textContent = truncatedContent;
    const date = new Date(item.dates);
    const formattedDate = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getDate()}, ${date.getFullYear()}`;
    document.getElementById(dates).textContent = formattedDate;
  } else {
    document.getElementById(title).textContent = "No items available.";
    document.getElementById(title).textContent = "No items available.";
    document.getElementById(text).textContent = "No items available.";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchNews("/app/news/read");

  const recentNews = getMostRecentItem(data, "news");
  const recentEvents = getMostRecentItem(data, "events");
  const recentAnnouncements = getMostRecentItem(data, "announcements");

  displayItem("news_image", "news_title", "news_text", "news_date", recentNews);
  displayItem(
    "events_image",
    "events_title",
    "events_text",
    "events_date",
    recentEvents
  );
  displayItem(
    "announcements_image",
    "announcements_title",
    "announcements_text",
    "announcements_date",
    recentAnnouncements
  );
});
