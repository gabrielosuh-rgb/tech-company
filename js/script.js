// Mobile navigation and small interactive features for TechnologyCompanyWebsite.
document.addEventListener("DOMContentLoaded", () => {
  // Keep the copyright year current.
  document.querySelectorAll(".year").forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  // Toggle the mobile navigation menu.
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "×" : "☰";
    });
  }

  // Client-side contact form validation. This does not send the message.
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const fields = [
        { id: "fullName", errorId: "nameError", message: "Please enter your full name." },
        { id: "email", errorId: "emailError", message: "Please enter a valid email address." },
        { id: "subject", errorId: "subjectError", message: "Please enter a subject." },
        { id: "message", errorId: "messageError", message: "Please enter a message." }
      ];

      let isValid = true;
      fields.forEach((field) => {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.errorId);
        let fieldIsValid = input.value.trim() !== "";

        if (field.id === "email") {
          fieldIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        }

        input.classList.toggle("invalid", !fieldIsValid);
        error.textContent = fieldIsValid ? "" : field.message;
        if (!fieldIsValid) isValid = false;
      });

      const feedback = document.getElementById("formFeedback");
      if (isValid) {
        feedback.textContent = "Your form entries look valid. This demo has not sent your message.";
        feedback.className = "form-feedback success";
      } else {
        feedback.textContent = "Please review the highlighted fields and try again.";
        feedback.className = "form-feedback failure";
      }
    });

    // Clear a field's error as the visitor edits it.
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        input.classList.remove("invalid");
        const error = document.querySelector(`#${input.id} + .error`);
        if (error) error.textContent = "";
      });
    });
  }
});
