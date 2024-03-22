"use strict";
const bankist = (function () {
  const header = document.querySelector(".header");
  const allSections = document.querySelectorAll(".section");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const imgTargets = document.querySelectorAll("img[data-src]");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");
  const btnCloseModal = document.querySelector(".btn--close-modal");
  const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
  const btnScrollTo = document.querySelector(".btn--scroll-to");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const section1 = document.querySelector("#section--1");
  const navLinks = document.querySelector(".nav__links");
  const toggleMenuBtn = document.querySelector(".toggle");
  const nav = document.querySelector(".nav");
  const navHeight = nav.getBoundingClientRect().height;
  const tabs = document.querySelectorAll(".operations__tab");
  const tabsContainer = document.querySelector(".operations__tab-container");
  const tabsContent = document.querySelectorAll(".operations__content");
  let curSlide = 0;
  let maxSlide = slides.length;

  const _openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
  const _closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };
  const _pageNavigation = function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  };
  const _toggleMenu = function () {
    navLinks.classList.toggle("active");
  };
  const _showTab = function (e) {
    const clickedTab = e.target.closest(".operations__tab");
    if (!clickedTab) return;

    //remove active classes
    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    tabsContent.forEach((content) =>
      content.classList.remove("operations__content--active")
    );

    //adding active classes
    clickedTab.classList.add("operations__tab--active");
    document
      .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
      .classList.add("operations__content--active");
  };
  const _fadeAnimation = function (e) {
    if (e.target.classList.contains("nav__link")) {
      const link = e.target;
      const siblings = link.closest(".nav").querySelectorAll(".nav__link");
      const logo = link.closest(".nav").querySelector("img");

      siblings.forEach((sibling) => {
        if (sibling !== link) sibling.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  };
  const _stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  };
  const _revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
  };
  const _loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  };
  const _goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  const _nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    _goToSlide(curSlide);
    _activeDot(curSlide);
  };
  const _prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    _goToSlide(curSlide);
    _activeDot(curSlide);
  };
  const _createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const _activeDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  const init = function () {
    btnsOpenModal.forEach((btn) => btn.addEventListener("click", _openModal));
    btnCloseModal.addEventListener("click", _closeModal);
    overlay.addEventListener("click", _closeModal);
    navLinks.addEventListener("click", _pageNavigation);
    tabsContainer.addEventListener("click", _showTab);
    toggleMenuBtn.addEventListener("click", _toggleMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        _closeModal();
      }
    });
    btnScrollTo.addEventListener("click", function (e) {
      e.preventDefault();
      section1.scrollIntoView({ behavior: "smooth" });
    });
    document.addEventListener("keydown", function (e) {
      e.key === "ArrowLeft" && _prevSlide();
      e.key === "ArrowRight" && _nextSlide();
    });
    dotsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("dots__dot")) {
        const slide = e.target.dataset.slide;
        _goToSlide(slide);
        _activeDot(slide);
      }
    });
    nav.addEventListener("mouseover", _fadeAnimation.bind(0.5));
    nav.addEventListener("mouseout", _fadeAnimation.bind(1));
    btnRight.addEventListener("click", _nextSlide);
    btnLeft.addEventListener("click", _prevSlide);
    _goToSlide(0);
    _createDots();
    _activeDot(0);
  };

  const headerObserver = new IntersectionObserver(_stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });
  const sectionObserver = new IntersectionObserver(_revealSection, {
    root: null,
    threshold: 0.15,
  });
  const imgObserver = new IntersectionObserver(_loadImg, {
    root: null,
    threshold: 0,
    rootMargin: "200px",
  });
  imgTargets.forEach((image) => imgObserver.observe(image));
  allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
  });
  headerObserver.observe(header);

  return {
    init: init,
  };
})();

bankist.init();
