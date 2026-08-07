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
});
