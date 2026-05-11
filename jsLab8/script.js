(function () {
  /* Hamburger */
  var header = document.querySelector(".site-header");
  var hamburger = document.getElementById("hamburger");
  var nav = document.getElementById("main-nav");

  if (hamburger && header && nav) {
    hamburger.addEventListener("click", function () {
      var open = !header.classList.contains("is-open");
      header.classList.toggle("is-open", open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
          header.classList.remove("is-open");
        }
      });
    });
  }

  /* Carousel */
  var track = document.getElementById("carousel-track");
  var dotsContainer = document.getElementById("carousel-dots");
  var btnPrev = document.getElementById("carousel-prev");
  var btnNext = document.getElementById("carousel-next");

  if (!track || !dotsContainer || !btnPrev || !btnNext) return;

  var slides = track.querySelectorAll(".carousel__slide");
  var total = slides.length;
  var index = 0;
  var autoplayMs = 4500;
  var timerId = null;

  function goTo(i) {
    index = ((i % total) + total) % total;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    dotsContainer.querySelectorAll(".carousel__dot").forEach(function (dot, j) {
      dot.classList.toggle("is-active", j === index);
    });
  }

  function buildDots() {
    dotsContainer.innerHTML = "";
    for (var i = 0; i < total; i++) {
      (function (slideIndex) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "carousel__dot" + (slideIndex === 0 ? " is-active" : "");
        btn.addEventListener("click", function () {
          resetAutoplay();
          goTo(slideIndex);
        });
        dotsContainer.appendChild(btn);
      })(i);
    }
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function resetAutoplay() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(next, autoplayMs);
  }

  btnNext.addEventListener("click", function () {
    resetAutoplay();
    next();
  });

  btnPrev.addEventListener("click", function () {
    resetAutoplay();
    prev();
  });

  buildDots();
  goTo(0);
  resetAutoplay();
})();