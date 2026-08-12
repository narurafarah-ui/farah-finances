// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
      const expanded = document.body.classList.contains("nav-open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  // Close mobile panel when a link is clicked
  document.querySelectorAll(".mobile-panel a").forEach((link) => {
    link.addEventListener("click", () => document.body.classList.remove("nav-open"));
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // Generic Formspree-style async submit handler
  document.querySelectorAll("form[data-async-form]").forEach((form) => {
    const statusEl = form.querySelector(".form-status");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (response.ok) {
          form.reset();
          if (statusEl) {
            statusEl.textContent =
              form.dataset.successMessage || "Thanks — your submission has been sent.";
            statusEl.classList.remove("error");
            statusEl.classList.add("visible", "success");
          }
        } else {
          throw new Error("Form submission failed");
        }
      } catch (err) {
        if (statusEl) {
          statusEl.textContent =
            "Something went wrong sending this. Please email narura.farah@gmail.com directly, or try again.";
          statusEl.classList.remove("success");
          statusEl.classList.add("visible", "error");
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  });
});
