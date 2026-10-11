(() => {
  "use strict";

  document.documentElement.classList.add("js-enabled");
  const config = window.PROMUVO_CONFIG || {};
  const contactForm = document.querySelector("#contact-form");
  const submitButton = document.querySelector("#contact-submit");
  const status = document.querySelector("#form-status");
  const mobileMenu = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#nav-links");
  const whatsappNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
  const hasWhatsapp = /^\d{8,15}$/.test(whatsappNumber);

  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
  submitButton.disabled = !hasWhatsapp;

  if (config.siteUrl) {
    const siteUrl = String(config.siteUrl).replace(/\/+$/, "");
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = siteUrl + "/";
    document.head.append(canonical);
    for (const [property, value] of [
      ["og:url", siteUrl + "/"],
      ["og:image", siteUrl + "/assets/promuvo-social.png"]
    ]) {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.append(tag);
      }
      tag.content = value;
    }
    document.querySelector('meta[name="twitter:image"]').content =
      siteUrl + "/assets/promuvo-social.png";
  }

  if (mobileMenu && navigation) {
    mobileMenu.addEventListener("click", () => {
      const expanded = mobileMenu.getAttribute("aria-expanded") === "true";
      mobileMenu.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.setAttribute("aria-label", expanded ? "Abrir menú" : "Cerrar menú");
      navigation.classList.toggle("is-open", !expanded);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        mobileMenu.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-label", "Abrir menú");
        navigation.classList.remove("is-open");
      }
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-whatsapp-message]").forEach((link) => {
    if (hasWhatsapp) {
      link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(link.dataset.whatsappMessage)}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#contacto";
    }
  });

  if (!hasWhatsapp) {
    status.textContent = "El contacto comercial por WhatsApp todavía no está configurado. Completá config.js con el número oficial para habilitar las consultas.";
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    if (!hasWhatsapp) {
      status.textContent = "Todavía no se configuró el número comercial de WhatsApp. No se envió ni guardó ningún dato.";
      return;
    }
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const message = [
      "Hola, quiero conocer Promuvo.",
      "",
      `Nombre: ${formData.get("name")}`,
      `Negocio: ${formData.get("business")}`,
      `Correo: ${formData.get("email")}`,
      `Teléfono: ${formData.get("phone") || "No informado"}`,
      `Rubro: ${formData.get("industry")}`
    ].join("\n");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    status.textContent = "Se preparó el mensaje en WhatsApp. Revisalo y elegí enviarlo desde esa aplicación.";
    contactForm.reset();
  });
})();
