/* =====================================================================
   VALORANT BEGINNER'S GUIDE - script.js
   ===================================================================== */

/* ---------------------------------------------------------------------
   STEP 1 (GOOGLE ANALYTICS): PASTE YOUR GA4 MEASUREMENT ID BELOW
   ---------------------------------------------------------------------
   Replace G-XXXXXXXXXX with your real Measurement ID from Google
   Analytics (Admin > Data Streams > your web stream). It looks like
   G-AB12CD34EF. Keep the quotation marks.

   While the placeholder is unchanged, NO analytics script is loaded and
   NO events are sent. */
const GA_MEASUREMENT_ID = "G-GLMVBWR8JN"; // <-- PASTE YOUR ID HERE

/* A real ID starts with "G-" and is not the placeholder. */
const analyticsEnabled =
  /^G-[A-Z0-9]{6,}$/.test(GA_MEASUREMENT_ID) && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";

/* Load the official Google gtag.js library (only when an ID is set).
   gtag('config') automatically sends the page_view event once. */
if (analyticsEnabled) {
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

/* One helper for all custom events. Does nothing without a real ID. */
function trackEvent(name, params) {
  if (!analyticsEnabled || typeof window.gtag !== "function") return;
  window.gtag("event", name, params || {});
}

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------- Mobile menu ---------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  /* ---------------- Click tracking (one listener, no duplicates) ----------------
     Links carry a data-track attribute in index.html:
       data-track="nav"      -> navigation link
       data-track="external" -> official/external resource link
     The Start Learning button is identified by its id. */
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link) return;

    if (link.id === "startBtn") {
      trackEvent("start_learning_click", { button_text: "Start Learning" });
      return;
    }

    const type = link.dataset.track;
    if (type === "nav") {
      trackEvent("nav_click", {
        link_text: link.textContent.trim(),
        link_target: link.getAttribute("href")
      });
      navLinks.classList.remove("open"); // close mobile menu
      navToggle.setAttribute("aria-expanded", "false");
    } else if (type === "external") {
      trackEvent("external_link_click", {
        link_text: link.textContent.trim(),
        link_url: link.href
      });
    }
  });

  /* ---------------- Practice checklist ---------------- */
  const boxes = document.querySelectorAll("#checklist input[type='checkbox']");
  const progress = document.getElementById("progress");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  function updateProgress() {
    const done = document.querySelectorAll("#checklist input:checked").length;
    progressBar.style.width = (done / boxes.length) * 100 + "%";
    progressText.textContent = done + " of " + boxes.length + " completed";
    progress.setAttribute("aria-valuenow", String(done));
  }

  boxes.forEach(function (box) {
    box.addEventListener("change", function () {
      updateProgress();
      trackEvent("checklist_interaction", {
        item_name: box.dataset.item,
        checked: box.checked
      });
    });
  });
  updateProgress();

  /* ---------------- Quiz ---------------- */
  const answers = { q1: "b", q2: "a", q3: "c", q4: "a", q5: "c" };
  const form = document.getElementById("quizForm");
  const result = document.getElementById("quizResult");
  const error = document.getElementById("quizError");
  const submitBtn = document.getElementById("submitBtn");
  const retryBtn = document.getElementById("retryBtn");

  function setLocked(locked) {
    form.querySelectorAll("input").forEach(function (i) { i.disabled = locked; });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitBtn.hidden) return; // already submitted: avoid duplicate events

    // Make sure every question has an answer
    const names = Object.keys(answers);
    const unanswered = names.some(function (n) {
      return !form.querySelector("input[name='" + n + "']:checked");
    });
    if (unanswered) { error.hidden = false; return; }
    error.hidden = true;

    // Count the score and mark answers
    let score = 0;
    names.forEach(function (n) {
      form.querySelectorAll("input[name='" + n + "']").forEach(function (input) {
        const label = input.parentElement;
        if (input.value === answers[n]) label.classList.add("correct");
        else if (input.checked) label.classList.add("wrong");
      });
      if (form.querySelector("input[name='" + n + "']:checked").value === answers[n]) score++;
    });

    let message = "Keep practicing, and review the guide above.";
    if (score === names.length) message = "Perfect! You're ready for your first match.";
    else if (score >= 3) message = "Nice work! You know the basics.";

    result.innerHTML = '<p class="score">' + score + " / " + names.length + "</p><p>" + message + "</p>";
    result.hidden = false;

    setLocked(true);
    submitBtn.hidden = true;
    retryBtn.hidden = false;

    trackEvent("quiz_complete", { score: score, total_questions: names.length });
  });

  retryBtn.addEventListener("click", function () {
    form.reset();
    form.querySelectorAll("label").forEach(function (l) { l.classList.remove("correct", "wrong"); });
    setLocked(false);
    result.hidden = true;
    error.hidden = true;
    submitBtn.hidden = false;
    retryBtn.hidden = true;
  });
});
