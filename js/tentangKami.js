document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const navHeight = 80;

  let sections = gsap.utils.toArray(".panel");

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".fiturdanmenu-title-container",
      start: `top top+=${navHeight}`,
      end: () => "+=" + (sections.length - 1) * 100 + "%",
      pin: ".fiturdanmenu-container",
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 1,
    },
  });

  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: () => `top top+=${navHeight}-=${window.innerHeight * i}`,
      end: () => `+=${window.innerHeight - navHeight}`,
      toggleClass: { targets: section, className: "active" },
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const slidesContainers = document.querySelectorAll('.slides-container');

  slidesContainers.forEach(container => {
    let currentSlide = 0;
    const slides = container.querySelector('.slides');
    const totalSlides = slides.children.length;

    function changeSlide(direction) {
      currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
      updateSlidePosition();
    }

    function updateSlidePosition() {
      const slideWidth = slides.children[0].getBoundingClientRect().width;
      slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    updateSlidePosition();

    setInterval(() => changeSlide(1), 5000);
  });
});

