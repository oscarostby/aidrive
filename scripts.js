const slides = document.querySelectorAll(".slide");
const nextBtn = document.createElement("button");
const prevBtn = document.createElement("button");
const slider = document.querySelector(".slider");
let currentSlide = 0;
let slideInterval;

function nextSlide() {
    slides[currentSlide].classList.remove("active-slide");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active-slide");
}

function prevSlide() {
    slides[currentSlide].classList.remove("active-slide");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add("active-slide");
}

function createNavigationButtons() {
    nextBtn.innerHTML = ">";
    prevBtn.innerHTML = "<";
    nextBtn.classList.add("slider-nav-btn", "next-btn");
    prevBtn.classList.add("slider-nav-btn", "prev-btn");

    slider.appendChild(nextBtn);
    slider.appendChild(prevBtn);

    nextBtn.addEventListener("click", () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 7000);
    });

    prevBtn.addEventListener("click", () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 7000);
    });
}

createNavigationButtons();
slideInterval = setInterval(nextSlide, 7000);



const sortingGuide = document.querySelector('.sorting-guide');

window.addEventListener('scroll', () => {
  const sortingGuideTop = sortingGuide.getBoundingClientRect().top;
  const sortingGuideBottom = sortingGuide.getBoundingClientRect().bottom;

  if (sortingGuideTop < window.innerHeight && sortingGuideBottom > 0) {
    sortingGuide.classList.add('show');
  } else {
    sortingGuide.classList.remove('show');
  }
});






  
document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("infoVideo");

    function checkVideoVisibility() {
        const rect = video.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible) {
            video.play();
        } else {
            video.pause();
        }
    }

    window.addEventListener("scroll", checkVideoVisibility);
    checkVideoVisibility(); // Check video visibility on page load
});

document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("infoVideo");
    const playButton = document.querySelector(".play-button");

    playButton.addEventListener("click", function() {
        if (video.paused) {
            video.play();
            playButton.setAttribute("data-playing", "true");
        } else {
            video.pause();
            playButton.setAttribute("data-playing", "false");
        }
    });

    video.addEventListener("ended", function() {
        playButton.setAttribute("data-playing", "false");
    });
});






  
  
document.addEventListener("DOMContentLoaded", function () {
    var cookieBanner = document.getElementById("cookie-banner");
    var acceptBtn = document.getElementById("cookie-accept");
  
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    }
  
    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
  
    if (!getCookie("cookieConsent")) {
      cookieBanner.style.display = "block";
    }
  
    acceptBtn.addEventListener("click", function () {
      setCookie("cookieConsent", "accepted", 30);
      cookieBanner.style.display = "none";
    });
  });



  document.addEventListener("DOMContentLoaded", () => {
    const contactSection = document.querySelector(".contact-section");
    const contactInputs = document.querySelectorAll(".contact-input");
    const sendButton = document.querySelector(".send-button");
  
    window.addEventListener("scroll", () => {
      const sectionTop = contactSection.getBoundingClientRect().top;
      const sectionBottom = contactSection.getBoundingClientRect().bottom;
  
      if (sectionTop < window.innerHeight && sectionBottom > 0) {
        gsap.fromTo(contactSection, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
      } else {
        gsap.to(contactSection, { opacity: 0, y: 50, duration: 1 });
      }
    });
  
    contactInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, { borderColor: "#3a8f3a", duration: 0.3 });
      });
  
      input.addEventListener("blur", () => {
        gsap.to(input, { borderColor: "#4caf50", duration: 0.3 });
      });
    });
  
    sendButton.addEventListener("mousedown", () => {
      gsap.to(sendButton, {
        duration: 0.2,
        scale: 0.95,
        ease: "power2.out"
      });
    });
  
    sendButton.addEventListener("mouseup", () => {
      gsap.to(sendButton, {
        duration: 0.2,
        scale: 1,
        ease: "power2.out"
      });
    });
  
    sendButton.addEventListener("mouseout", () => {
      gsap.to(sendButton, {
        duration: 0.2,
        scale: 1,
        ease: "power2.out"
      });
    });
  
    sendButton.addEventListener("click", () => {
      gsap.fromTo(".contact-form", { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.8, duration: 0.5, ease: "power2.out", onComplete: () => {
        gsap.to(".contact-form", { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
      }});
    });
  });
  
