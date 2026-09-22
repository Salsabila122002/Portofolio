/**
 * Suci Indah Salsabila - Portfolio Interactive Scripts
 * Handles typing effect, scroll progress, mobile menu, scrollspy, reveal animations, and clipboard copying.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Dynamic Typing Effect ---
  const typingElement = document.getElementById("typing-text");
  const roles = [
    "AI & Front-End Developer",
    "Deep Learning Specialist",
    "Computer Vision Enthusiast",
    "CNN & Web Application Creator",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseBetweenRoles = 2000;

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseBetweenRoles;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  // --- 2. Top Scroll Progress Bar & Sticky Navbar & Back to Top ---
  const progressBar = document.getElementById("scroll-progress");
  const navbar = document.getElementById("navbar");
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Update progress bar
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Sticky navbar shadow
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  });

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // --- 3. Mobile Navigation Menu Toggle ---
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        if (isOpen) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          const icon = mobileToggle.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
          }
        }
      });
    });
  }

  // --- 4. ScrollSpy (Active Navigation Link Highlighting) ---
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute("id");
      const correspondingLink = document.querySelector(
        `.nav-link[href*="${sectionId}"]`,
      );

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => link.classList.remove("active"));
          correspondingLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

  // --- 5. Scroll Reveal Animations (IntersectionObserver) ---
  const revealElements = document.querySelectorAll(".reveal-item");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older environments
    revealElements.forEach((el) => el.classList.add("revealed"));
  }

  // --- 6. Copy Email to Clipboard with Toast Notification ---
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;

    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = "Salsabilasuciindah@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        showToast("Email copied to clipboard!");
      } catch (err) {
        // Fallback copy
        const tempInput = document.createElement("input");
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast("Email copied to clipboard!");
      }
    });
  }

  // --- 7. Dynamic Year in Footer ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// --- 8. Contact Form Handler ---
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("form-name")?.value || "";
  const email = document.getElementById("form-email")?.value || "";
  const subject = document.getElementById("form-subject")?.value || "";
  const message = document.getElementById("form-message")?.value || "";

  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  // Trigger mailto link as fallback
  const mailtoUrl = `mailto:Salsabilasuciindah@gmail.com?subject=${encodeURIComponent(
    subject + " - from " + name,
  )}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

  window.location.href = mailtoUrl;

  if (toast && toastMessage) {
    toastMessage.textContent = "Opening your email client...";
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }

  // Reset form
  const form = document.getElementById("contact-form");
  if (form) form.reset();
}

// Global helper for backwards compatibility
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
