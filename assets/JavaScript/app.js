"use strict";
const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLinks = document.querySelector(".nav__links");
const allNavLink = document.querySelectorAll(".nav__link");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const pageNavigation = function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
};
const tab = function (e) {
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
const fadeAnimation = function (e) {
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
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
navLinks.addEventListener("click", pageNavigation);
tabsContainer.addEventListener("click", tab);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});
nav.addEventListener("mouseover", fadeAnimation.bind(0.5));
nav.addEventListener("mouseout", fadeAnimation.bind(1));
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
});
headerObserver.observe(header);
