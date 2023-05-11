// scripts.js
let currentPosition = 0;
const sliderContent = document.querySelector(".slider-content");
const sliderItems = document.querySelectorAll(".slider-item");
const sliderContainer = document.querySelector(".slider-container");

// Clone first three slider items
const firstClones = [
  sliderItems[0].cloneNode(true),
  sliderItems[1].cloneNode(true),
  sliderItems[2].cloneNode(true),
];
firstClones.forEach((clone) => sliderContent.appendChild(clone));

// Clone the last slider item
const lastClone = sliderItems[sliderItems.length - 1].cloneNode(true);
sliderContent.insertBefore(lastClone, sliderItems[0]);

// Update slider items and initial position
const updatedSliderItems = document.querySelectorAll(".slider-item");
currentPosition = -(300 + 10); // width of a column (300px) + gap (10px)
sliderContent.style.transform = `translateX(${currentPosition}px)`;

function scrollContent(direction) {
  const scrollAmount = 300 + 10; // width of a column (300px) + gap (10px)

  if (direction > 0 && currentPosition === 0) {
    currentPosition = -(scrollAmount * (updatedSliderItems.length - 4));
  } else if (
    direction < 0 &&
    currentPosition === -(scrollAmount * (updatedSliderItems.length - 4))
  ) {
    currentPosition = 0;
  } else {
    currentPosition += direction * scrollAmount;
  }

  sliderContent.style.transition = "transform 0.3s ease";
  sliderContent.style.transform = `translateX(${currentPosition}px)`;

  // Reset position after transition to create a seamless loop
  sliderContent.addEventListener("transitionend", () => {
    if (direction > 0 && currentPosition === 0) {
      sliderContent.style.transition = "none";
      currentPosition = -(scrollAmount * (updatedSliderItems.length - 4));
      sliderContent.style.transform = `translateX(${currentPosition}px)`;
    } else if (
      direction < 0 &&
      currentPosition === -(scrollAmount * (updatedSliderItems.length - 4))
    ) {
      sliderContent.style.transition = "none";
      currentPosition = 0;
      sliderContent.style.transform = `translateX(${currentPosition}px)`;
    }
  });
}

// Touch event for swipe functionality
let touchStartX = 0;
let touchEndX = 0;

sliderContent.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
});

sliderContent.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // Minimum distance required for swipe to be recognized

  if (touchEndX < touchStartX - swipeThreshold) {
    scrollContent(-1); // Swipe left
  } else if (touchEndX > touchStartX + swipeThreshold) {
    scrollContent(1); // Swipe right
  }
}
