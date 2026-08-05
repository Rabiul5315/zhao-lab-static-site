/* Lab group-photo gallery — small, dependency-free.
   Enhances a stacked (no-JS) gallery into a one-at-a-time viewer.
   No autoplay, no timers. Keyboard: Left/Right arrows move while focus
   is inside the gallery; buttons work with Enter/Space natively. */
(function () {
  "use strict";

  function initGallery(widget) {
    var slides = Array.prototype.slice.call(
      widget.querySelectorAll(".lab-gallery__slide")
    );
    var thumbs = Array.prototype.slice.call(
      widget.querySelectorAll(".lab-gallery__thumb")
    );
    var prevBtn = widget.querySelector(".lab-gallery__nav--prev");
    var nextBtn = widget.querySelector(".lab-gallery__nav--next");
    var status = widget.querySelector(".lab-gallery__status");
    if (slides.length < 1) return;

    var current = 0;
    var total = slides.length;

    // Turn on the enhanced (one-at-a-time) presentation.
    widget.classList.add("is-enhanced");

    function show(index, announce) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;

      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle("is-active", active);
      });
      thumbs.forEach(function (thumb, i) {
        var active = i === index;
        thumb.classList.toggle("is-active", active);
        if (active) {
          thumb.setAttribute("aria-current", "true");
        } else {
          thumb.removeAttribute("aria-current");
        }
      });
      if (announce && status) {
        status.textContent = "Photo " + (index + 1) + " of " + total;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        show(current - 1, true);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        show(current + 1, true);
      });
    }
    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var i = parseInt(thumb.getAttribute("data-index"), 10) || 0;
        show(i, true);
      });
    });

    // Arrow-key navigation only while focus is within this gallery.
    widget.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        show(current - 1, true);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        show(current + 1, true);
      }
    });

    // Start on the first photo (no announcement on load).
    show(0, false);
  }

  function init() {
    var widgets = document.querySelectorAll("[data-lab-gallery]");
    Array.prototype.forEach.call(widgets, initGallery);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
