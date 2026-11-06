// document.addEventListener("DOMContentLoaded", () => {
  
//   // === 1. MODO CLARO / OSCURO (Bootstrap 5 nativo) ===
//   const themeToggle = document.getElementById("theme-toggle");
//   const htmlElement = document.documentElement;

//   // Comprobar preferencia guardada
//   const savedTheme = localStorage.getItem("theme") || "light";
//   htmlElement.setAttribute("data-bs-theme", savedTheme);
//   themeToggle.textContent = savedTheme === "dark" ? "Modo Claro" : "Modo Oscuro";

//   themeToggle.addEventListener("click", () => {
//     const currentTheme = htmlElement.getAttribute("data-bs-theme");
//     const newTheme = currentTheme === "dark" ? "light" : "dark";
    
//     htmlElement.setAttribute("data-bs-theme", newTheme);
//     localStorage.setItem("theme", newTheme);
//     themeToggle.textContent = newTheme === "dark" ? "Modo Claro" : "Modo Oscuro";
//   });

//   // === 2. VALIDACIÓN DE FORMULARIO (Estilo Bootstrap) ===
//   const form = document.getElementById("contact-form");

//   form.addEventListener("submit", (e) => {
//     // Si los campos HTML5 nativos (required, minlength, type="email") fallan
//     if (!form.checkValidity()) {
//       e.preventDefault();
//       e.stopPropagation();
//     } else {
//       alert("¡Formulario enviado con éxito!");
//     }

//     // Añade la clase de Bootstrap para mostrar visualmente los errores (.is-invalid)
//     form.classList.add("was-validated");
//   }, false);
// });

/**
 * LearnSkills · script.js
 * Secciones: 1) Tema oscuro  2) Validación de formularios
 *            3) Buscador de cursos  4) Tarjetas  5) Temario
 */
(function () {
  "use strict";

  /* ---------- 1) TEMA CLARO / OSCURO ---------- */
  var html = document.documentElement;
  var btnTema = document.getElementById("btnTema");
  var btnTemaTexto = document.getElementById("btnTemaTexto");

  function aplicarTema(tema) {
    html.setAttribute("data-bs-theme", tema);
    localStorage.setItem("ls-tema", tema);
    var oscuro = tema === "dark";
    btnTema.setAttribute("aria-pressed", String(oscuro));
    btnTemaTexto.textContent = oscuro ? "Modo claro" : "Modo oscuro";
  }

  aplicarTema(html.getAttribute("data-bs-theme") || "light");
  btnTema.addEventListener("click", function () {
    aplicarTema(html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark");
  });

  /* ---------- 2) VALIDACIÓN DE FORMULARIOS ---------- */
  var pass = document.getElementById("regPass");
  var pass2 = document.getElementById("regPass2");

  function comprobarCoincidencia() {
    pass2.setCustomValidity(pass2.value !== pass.value ? "No coinciden" : "");
  }
  pass.addEventListener("input", comprobarCoincidencia);
  pass2.addEventListener("input", comprobarCoincidencia);

  document.querySelectorAll(".needs-validation").forEach(function (form) {
    form.addEventListener("submit", function (evento) {
      evento.preventDefault();
      if (form.id === "formRegistro") { comprobarCoincidencia(); }

      if (form.checkValidity()) {
        var ok = form.querySelector(".alert-success");
        ok.classList.remove("d-none");
        form.classList.remove("was-validated");
        form.reset();
        setTimeout(function () { ok.classList.add("d-none"); }, 3000);
      } else {
        form.classList.add("was-validated");
      }
    });
  });

  /* ---------- 3) BUSCADOR DE CURSOS (solo en index.html) ---------- */
  var buscador = document.getElementById("buscador");
  var items = document.querySelectorAll(".curso-item");
  var sinResultados = document.getElementById("sinResultados");

  if (items.length) {
    var filtrarCursos = function () {
      var texto = buscador.value.trim().toLowerCase();
      var visibles = 0;
      items.forEach(function (item) {
        var coincide = item.dataset.nombre.indexOf(texto) !== -1;
        item.hidden = !coincide;
        if (coincide) { visibles++; }
      });
      sinResultados.hidden = visibles !== 0;
    };

    buscador.addEventListener("input", filtrarCursos);
    document.getElementById("formBuscador").addEventListener("submit", function (e) {
      e.preventDefault();
      filtrarCursos();
      document.getElementById("cursos").scrollIntoView({ behavior: "smooth" });
    });

    // Llegada desde otra página: index.html?q=react
    var q = new URLSearchParams(window.location.search).get("q");
    if (q) { buscador.value = q; filtrarCursos(); }
  }
  // En el resto de páginas el formulario se envía a index.html?q=...

  /* ---------- 4) TARJETA DE CURSO ACTIVA (solo en index.html) ---------- */
  var tarjetas = document.querySelectorAll(".course-card");

  function activarTarjeta(tarjeta) {
    tarjetas.forEach(function (t) { t.classList.remove("is-active"); });
    tarjeta.classList.add("is-active");
  }

  tarjetas.forEach(function (tarjeta) {
    tarjeta.addEventListener("click", function () { activarTarjeta(tarjeta); });
    tarjeta.addEventListener("keydown", function (e) {
      if (e.target === tarjeta && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); activarTarjeta(tarjeta); }
    });
  });

  /* ---------- 5) TEMARIO (solo en curso.html) ---------- */
  var lecciones = document.querySelectorAll(".syllabus__item");
  var resumen = document.getElementById("resumenTemario");

  if (lecciones.length) {
    lecciones.forEach(function (leccion) {
      leccion.addEventListener("click", function () {
        var completada = leccion.classList.toggle("is-done");
        leccion.setAttribute("aria-pressed", String(completada));
        var hechas = document.querySelectorAll(".syllabus__item.is-done").length;
        resumen.textContent = hechas + " de " + lecciones.length + " lecciones completadas";
      });
    });
  }
})();