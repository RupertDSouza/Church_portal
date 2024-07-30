async function loadPoster(containerId) {
  try {
    const response = await fetch("/app/poster/read", {
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

    for (
      let index = data.length - 1;
      index >= Math.max(data.length - 3, 0);
      index--
    ) {
      const item = data[index];

      const imageUrl = item.image.replace(/^.*\/public\//, "../");
      const itemHtml = `
        <div class="poster-slider">
          <div
            class="home_slider_background"
            style="background-image: url(${imageUrl})"
          ></div>
          <div class="home_slider_content text-center">
            <div
              class="cross_1 d-flex flex-column align-items-center justify-content-center"
            >
              <img src="images/cross_1.png" alt />
            </div>
            <h1>${item.title}</h1>
            <div class="button home_slider_button">
              <a href="${item.link}">Explore Now</a>
          </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", itemHtml);
    }

    const slides = document.querySelectorAll(".poster-slider");
    if (slides.length > 0) {
      slides[0].classList.add("active");
    }

    const nextButton = document.getElementById("go-to-next");
    const prevButton = document.getElementById("go-to-prev");

    let currentSlide = 0;
    let slideInterval;

    function showNextSlide() {
      slides[currentSlide].classList.remove("active");
      slides[currentSlide].classList.add("prev");

      currentSlide = (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.add("active");
      // Remove the 'prev' class from the previous slide after the transition
      setTimeout(() => {
        slides[
          (currentSlide - 1 + slides.length) % slides.length
        ].classList.remove("prev");
      }, 1000); // Assuming transition duration is 1s
    }

    function showPrevSlide() {
      slides[currentSlide].classList.remove("active");
      slides[currentSlide].classList.add("prev");

      currentSlide = (currentSlide - 1 + slides.length) % slides.length;

      slides[currentSlide].classList.add("active");
      // Remove the 'prev' class from the next slide after the transition
      setTimeout(() => {
        slides[(currentSlide + 1) % slides.length].classList.remove("prev");
      }, 1000); // Assuming transition duration is 1s
    }

    function startSlideShow() {
      slideInterval = setInterval(showNextSlide, 5000);
    }

    function stopSlideShow() {
      clearInterval(slideInterval);
    }

    // Initialize automatic sliding
    startSlideShow();

    nextButton.addEventListener("click", () => {
      stopSlideShow(); // Stop automatic sliding
      showNextSlide();
      startSlideShow(); // Restart automatic sliding after a short delay
    });

    prevButton.addEventListener("click", () => {
      stopSlideShow(); // Stop automatic sliding
      showPrevSlide();
      startSlideShow(); // Restart automatic sliding after a short delay
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPoster("poster-slider");
});
