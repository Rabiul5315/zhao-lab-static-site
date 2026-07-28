// Mobile navigation toggle + small nav polish. No frameworks,
// no build step — edit freely if you need to change behavior.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // If you're already on the page a nav link points to, clicking it
    // would otherwise force a full reload and reset your scroll
    // position to the top. This skips that reload.
    var here = window.location.pathname.replace(/index\.html$/, "");
    nav.querySelectorAll("a").forEach(function (link) {
      var target = link.pathname.replace(/index\.html$/, "");
      if (target === here) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      } else {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  // Photo carousels (e.g. People page group photos). Generic —
  // works for any number of .photo-carousel elements on a page.
  document.querySelectorAll(".photo-carousel").forEach(function (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".photo-carousel__slide"));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll(".photo-carousel__dot"));
    var prevBtn = carousel.querySelector(".photo-carousel__arrow--prev");
    var nextBtn = carousel.querySelector(".photo-carousel__arrow--next");
    var current = 0;

    function show(index) {
      if (slides.length === 0) return;
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) { slide.classList.toggle("is-active", i === current); });
      dots.forEach(function (dot, i) { dot.classList.toggle("is-active", i === current); });
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { show(current + 1); });
    if (prevBtn) prevBtn.addEventListener("click", function () { show(current - 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { show(i); });
    });
  });
});
