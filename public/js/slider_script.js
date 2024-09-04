async function fetchDataArray(url, containerId) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    const container = document.getElementById(containerId);

    container.innerHTML = ""; // Clear existing content

    for (let index = data.length - 1; index >= 0; index--) {
      const item = data[index];
      const imageUrl = item.image;
      const born = new Date(item.born).toLocaleDateString();
      const died = new Date(item.died).toLocaleDateString();
      const itemHtml = `
        <div class="imageAndInfo">
            <div class="text-center causes_item">
                <div class="causes_item_image">
                    <img src="${imageUrl}" alt="${item.name}" />
                </div>
                <div class="causes_item_title">${item.name}</div>
                <div class="causes_item_text">
                    <h4>${born} - ${died}</h4>
                    <h4>${item.age} yrs</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", itemHtml);
    }

    initSliders();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function initSliders(params) {
  const slider = document.querySelector(".slider");

  const slides = document.querySelectorAll(".imageAndInfo");

  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");

  let currentIndex = 0;
  const visibleSlides = 1;
  const slideWidth = 350;

  function showSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - visibleSlides;
    } else if (index >= slides.length - visibleSlides + 1) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    const offset = -currentIndex * slideWidth;
    slider.style.transform = `translateX(${offset}px)`;
  }

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  prevButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  // Initial display
  showSlide(currentIndex);
}

function initSliderArray() {
  fetchDataArray("/app/obituary/read", "slider-container");
}

document.addEventListener("DOMContentLoaded", initSliderArray);
