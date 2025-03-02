import { useState, useRef } from "react";
import "primeicons/primeicons.css";

export default function Carousel() {
  const [curr, setCurr] = useState(0);
  const [applyTransition, setApplyTransition] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      title: "Music Festival",
      path: "/carousel_1.webp",
      description: "Music Festival with music and food held on 12 October 2024",
    },
    {
      title: "Weekly Book Club Meeting",
      path: "/carousel_2.webp",
      description: "Invitation to our weekly book club meeting",
    },
    {
      title: "Digital marketing training",
      path: "/carousel_3.webp",
      description:
        "Digital marketing training held on 25 August 2024 at 10 to 12 am",
    },
    {
      title: "Discover, Dream, Delve Deeper",
      path: "/carousel_4.webp",
      description: "Discover our books at the library",
    },
  ];

  function prev() {
    const prevIndex = curr === 0 ? slides.length - 1 : curr - 1;
    if (slides[curr] !== slides[prevIndex]) {
      setApplyTransition(true);
    } else {
      setApplyTransition(false);
    }
    setCurr(prevIndex);
  }

  function next() {
    const nextIndex = curr === slides.length - 1 ? 0 : curr + 1;
    if (slides[curr] !== slides[nextIndex]) {
      setApplyTransition(true);
    } else {
      setApplyTransition(false);
    }
    setCurr(nextIndex);
  }

  function goToSlide(index: number) {
    setApplyTransition(true);
    setCurr(index);
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <div
      className="relative overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured content carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={carouselRef}
    >
      {/* Slide image */}
      <div
        className={`flex ${
          applyTransition ? "transition-transform ease-out duration-500" : ""
        }`}
        style={{ transform: `translateX(-${curr * 100}%)` }}
        aria-live="polite"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className="flex flex-shrink-0 w-full"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            aria-hidden={curr !== index}
          >
            <img
              src={slide.path}
              alt={slide.description}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>

      {/* Arrow buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 text-gray-800 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
          aria-label="Previous slide"
        >
          <i
            className="text-2xl text-white border-2 rounded-full pi pi-angle-left"
            aria-hidden="true"
          ></i>
        </button>
        <button
          onClick={next}
          className="p-1 text-gray-800 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
          aria-label="Next slide"
        >
          <span
            className="text-2xl text-white border-2 rounded-full pi pi-angle-right"
            aria-hidden="true"
          ></span>
        </button>
      </div>
      {/* Slide number indicators */}
      <div className="absolute left-0 right-0 bottom-4">
        <div className="flex items-center justify-center gap-2" role="tablist">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={curr === index}
              role="tab"
              tabIndex={curr === index ? 0 : -1}
              onClick={() => goToSlide(index)}
              className={`transition-all w-1.5 h-1.5 bg-white rounded-full focus:outline-none focus:ring focus:ring-blue-300 ${
                curr === index ? "p-0.5" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Controls explanation for screen readers */}
      <div className="sr-only">
        Use left and right arrow keys to navigate between slides.
      </div>
    </div>
  );
}
