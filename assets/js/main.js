// Navigation toggle + accessible photo carousel.
// No frameworks, no build step — plain JS.
document.addEventListener("DOMContentLoaded", function () {
  // ── Mobile navigation toggle ──────────────────────────────
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Clicking a link to the page you're already on shouldn't force a
    // full reload / scroll reset.
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

  // ── Accessible photo carousels ────────────────────────────
  // Keyboard: Left/Right arrows move between slides when focus is
  // inside the carousel. No autoplay. Screen readers are told which
  // slide is active via aria-current on the dots.
  document.querySelectorAll(".photo-carousel").forEach(function (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".photo-carousel__slide"));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll(".photo-carousel__dot"));
    var prevBtn = carousel.querySelector(".photo-carousel__arrow--prev");
    var nextBtn = carousel.querySelector(".photo-carousel__arrow--next");
    var current = 0;

    if (slides.length > 1) {
      carousel.setAttribute("role", "group");
      carousel.setAttribute("aria-roledescription", "carousel");
      if (!carousel.getAttribute("aria-label")) {
        carousel.setAttribute("aria-label", "Photo gallery");
      }
    }

    function show(index) {
      if (slides.length === 0) return;
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach(function (dot, i) {
        var active = i === current;
        dot.classList.toggle("is-active", active);
        if (active) { dot.setAttribute("aria-current", "true"); }
        else { dot.removeAttribute("aria-current"); }
      });
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { show(current + 1); });
    if (prevBtn) prevBtn.addEventListener("click", function () { show(current - 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { show(i); });
    });

    // Arrow-key navigation when focus is within the carousel.
    carousel.addEventListener("keydown", function (e) {
      if (slides.length < 2) return;
      if (e.key === "ArrowLeft") { show(current - 1); e.preventDefault(); }
      else if (e.key === "ArrowRight") { show(current + 1); e.preventDefault(); }
    });

    show(0);
  });
});
