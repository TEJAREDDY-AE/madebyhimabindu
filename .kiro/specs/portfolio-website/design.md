# Design Document

## Overview

This design describes a single-page, static HTML/CSS/JS portfolio website for Tatekalva Umasree. The site has no server-side component, no framework, and no build step — every file can be opened directly in a browser. All content is defined in `requirements.md` and is baked verbatim into the HTML markup (not generated dynamically from a data file), because there is no build/templating step available.

The design is organized around:

- A fixed file/folder structure under `portfolio-tatekalva-umasree/`
- One `index.html` containing all nine sections as semantic HTML5 elements
- One stylesheet (`css/styles.css`) using CSS custom properties for the color palette, typography, and breakpoints
- One script (`js/main.js`) split into small, single-purpose functions for navigation, scroll behavior, reveal animation, form validation, and asset-fallback handling
- Graceful degradation for the three placeholder assets (`profile.jpg`, `bg-texture.jpg`, `resume.pdf`), all of which may not physically exist in the repository

## Architecture

### File / Folder Structure

```
portfolio-tatekalva-umasree/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── profile.jpg        (placeholder — may not exist)
    ├── bg-texture.jpg      (placeholder — may not exist)
    └── resume.pdf          (placeholder — may not exist)
```

This folder sits as a sibling of `frontend/`, `backend/`, and `real-estate/` at the repository root, satisfying Requirement 12.3. No `package.json`, no bundler config, and no framework dependency is introduced anywhere in this folder, satisfying Requirement 12.2.

### High-Level Page Flow

```
┌─────────────────────────────────────────────┐
│ <header> Navbar (fixed, position: fixed)     │
├─────────────────────────────────────────────┤
│ <main>                                       │
│   <section id="home">   Hero                 │
│   <div class="stats-bar">  Stats Bar         │
│   <section id="about">     About             │
│   <section id="experience">Experience        │
│   <section id="skills">    Skills            │
│   <section id="education"> Education         │
│   <section id="accomplishments">Accomplish.  │
│   <section id="contact">   Contact           │
│ </main>                                      │
├─────────────────────────────────────────────┤
│ <footer> Footer                              │
└─────────────────────────────────────────────┘
```

The Stats Bar is a `<div class="stats-bar">` immediately following the Hero `<section>` and immediately preceding the About `<section>` inside `<main>`, so no other component can be rendered between Hero and Stats Bar (Requirement 3.6).

## Components and Interfaces

### 1. Navbar (`<header id="navbar">`)

```html
<header id="navbar" class="navbar">
  <a class="logo" href="#home" aria-label="Home">TU</a>
  <nav class="nav-links" id="nav-links" data-state="collapsed">
    <a href="#home" class="nav-link active" data-section="home">Home</a>
    <a href="#about" class="nav-link" data-section="about">About</a>
    <a href="#skills" class="nav-link" data-section="skills">Skills</a>
    <a href="#experience" class="nav-link" data-section="experience">Experience</a>
    <a href="#education" class="nav-link" data-section="education">Education</a>
    <a href="#contact" class="nav-link" data-section="contact">Contact</a>
  </nav>
  <div class="navbar-actions">
    <button id="nav-toggle" class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-links">
      <span class="hamburger-icon"></span>
    </button>
    <a id="cv-download" class="btn btn-pill btn-outline" href="assets/resume.pdf" download="Tatekalva_Umasree_Resume.pdf">Download CV</a>
  </div>
</header>
```

- `position: fixed; top: 0;` keeps the Navbar pinned (Req 1.2).
- `.nav-toggle` is hidden via CSS at widths ≥768px and shown at <768px (Req 1.6, 1.7).
- `#nav-links[data-state]` toggles between `collapsed`/`expanded`; CSS uses `[data-state="expanded"]` to reveal links on mobile.
- `.nav-link.active` marks the currently visible section (Req 1.4).

**Interface (JS module `nav.js` functions inside `main.js`):**

```js
initSmoothScroll(links: NodeList): void
initActiveLinkObserver(sections: Element[], navLinks: Element[], navbarHeight: number): void
initMobileNavToggle(toggleBtn: Element, navLinks: Element): void
initCvDownload(downloadLink: Element, resumePath: string): void
```

### 2. Hero Section (`<section id="home" class="hero">`)

Two-column CSS grid/flex layout that collapses to a single column below 768px (Req 2.1, 2.2, 10.1, 10.3):

```html
<section id="home" class="hero">
  <div class="hero-photo">
    <img src="assets/profile.jpg" alt="Photo of Tatekalva Umasree"
         class="avatar-img" onerror="handleAvatarError(this)">
    <div class="avatar-fallback" hidden aria-hidden="false">
      <span>TU</span>
    </div>
  </div>
  <div class="hero-content">
    <h1>Hello, I'm Tatekalva Umasree</h1>
    <p class="tagline">Software Engineer | Application Support Specialist</p>
    <p class="intro">Dedicated and analytical IT Professional with over 3 years of experience in maintaining high-availability, mission-critical systems and ensuring 24/7 service reliability. Proven background in rapid incident management, and complex issue resolution—skills directly transferable to optimizing and troubleshooting network infrastructure.</p>
    <div class="social-icons">
      <a href="https://linkedin.com/in/PLACEHOLDER" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">…</a>
      <a href="https://github.com/PLACEHOLDER" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">…</a>
      <a href="https://twitter.com/PLACEHOLDER" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X profile">…</a>
      <a href="mailto:tatekalvaumasree@gmail.com" aria-label="Send email">…</a>
    </div>
    <div class="cta-row">
      <a href="#contact" class="btn btn-pill btn-filled">Hire Me</a>
      <a href="#contact" class="btn btn-pill btn-outline">Contact Me</a>
    </div>
  </div>
</section>
```

**Avatar fallback (Req 2.4, 13.3):** `onerror="handleAvatarError(this)"` runs a function that hides the broken `<img>` and un-hides the sibling `.avatar-fallback` element, which is styled with the same circular glowing frame. The fallback element carries `alt`-equivalent text ("TU") as visible text plus an `aria-label="Tatekalva Umasree initials avatar"` for assistive tech, satisfying Req 2.15 in both the image and fallback states.

### 3. Stats Bar (`<div class="stats-bar">`)

```html
<div class="stats-bar">
  <div class="stat">3+ Years Experience</div>
  <div class="stat">24/7 Production Support</div>
  <div class="stat">5+ Monitoring &amp; Ticketing Tools</div>
  <div class="stat">8.06 CGPA Graduate</div>
</div>
```

CSS renders these as `flex-direction: row` with `border-right` dividers on the first three children at ≥768px, and `flex-direction: column` (dividers become `border-bottom`) below 768px, per Req 3.1, 3.7, 10.2, 10.4. `flex-wrap: wrap` combined with `min-width: 0` and `word-break: normal` (not `break-all`) prevents truncation/overlap.

### 4–8. Content Sections (About, Experience, Skills, Education, Accomplishments)

Each is a `<section id="…">` with a single `<h2>` heading and a `data-reveal` attribute used by the scroll-reveal observer:

```html
<section id="about" class="content-section" data-reveal>
  <h2>About Me</h2>
  <p>Dedicated and analytical IT Professional …</p>
</section>
```

- **Experience**: one `<article>` block with `<h3>` job title, employer/duration metadata, client/project line, description paragraph, and a `<ul>` of exactly nine `<li>` responsibility statements (Req 5.5, 5.6).
- **Skills**: four `<div class="skill-group">` blocks, each with an `<h3>` category label and a `<ul>` of skill `<li>` items, rendered in the fixed order Monitoring & Ticketing Tools → Scripting & Querying → Database/RDBMS → Other Skills (Req 6.2–6.7). No other groups/items are present in markup, so the closed-set requirement is satisfied structurally.
- **Education**: definition-list style block with degree, institution, year, CGPA as plain text/`<dl>` entries.
- **Accomplishments**: a single `<ol>` with exactly four `<li>` items in source order (Req 8.1, 8.2).

### 9. Contact Section (`<section id="contact">`)

```html
<section id="contact" class="content-section" data-reveal>
  <h2>Contact Me</h2>
  <p class="contact-detail">Email: tatekalvaumasree@gmail.com</p>
  <p class="contact-detail">Phone: +91-7989489757</p>
  <form id="contact-form" novalidate>
    <label for="name">Name</label>
    <input id="name" name="name" type="text" maxlength="100" required>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" maxlength="254" required>
    <label for="message">Message</label>
    <textarea id="message" name="message" maxlength="1000" required></textarea>
    <div id="form-feedback" role="alert" aria-live="polite"></div>
    <button type="submit" class="btn btn-pill btn-filled">Send Message</button>
  </form>
  <div class="social-icons"> … same four icons as Hero … </div>
</section>
```

`novalidate` is used so the JS validator has full control over error messaging (Req 9.5, 9.6), while `maxlength` attributes provide a first line of defense for the length caps (Req 9.3).

### 10. Footer (`<footer>`)

Simple copyright/footer element, semantic close of the page (Req 12.1).

## Data Models

Since there is no backend and no build step, "data" is represented as small in-memory JS constants used only by behavior logic (not for rendering, since content is static HTML):

```js
// Section order used by the active-link observer and deep-link handler
const SECTION_IDS = ["home", "about", "skills", "experience", "education", "contact"];

// Contact form field state (runtime, not persisted)
type ContactFormState = {
  name: string;    // <= 100 chars
  email: string;   // <= 254 chars
  message: string; // <= 1000 chars
};

type ValidationResult = {
  valid: boolean;
  errors: { name?: string; email?: string; message?: string };
};

// Reveal tracking: WeakSet/Set of elements that have already animated
const revealedSections = new Set(); // holds Element references, per Req 11.4/11.5
```

No client-side storage (localStorage/cookies) is used; the contact form is a client-only interaction (Req 9.4/9.7 describe success/error UI states — the actual network call target is a placeholder `fetch()` call that the design treats as pluggable, since no backend endpoint is specified in requirements).

## CSS Architecture

### Custom Properties (defined on `:root`)

```css
:root {
  /* Palette (Req 14.1, 14.2, 14.4, 14.6) */
  --color-bg-top: #050B18;
  --color-bg-bottom: #0A1628;
  --color-accent: #2EC4F1;
  --color-accent-hover: #1BA8E0;
  --color-text: #E6F1FA;       /* chosen for >=4.5:1 contrast on navy bg */
  --color-text-muted: #9FB3C8;

  /* Typography (Req 14.3, 14.7) */
  --font-heading: "Poppins", sans-serif;
  --font-body: "Inter", sans-serif;

  /* Breakpoints (Req 10, documented as custom properties for reference;
     actual media queries must use literal px values) */
  --bp-tablet: 768px;
  --bp-desktop: 1024px;

  /* Spacing / radii */
  --radius-pill: 999px;
  --navbar-height: 64px;
}
```

### Responsive Breakpoints

```css
/* Mobile-first base styles: 320px - 767px */
.hero { flex-direction: column; }
.stats-bar { flex-direction: column; }
.nav-links { display: none; }
.nav-toggle { display: inline-flex; }

/* Tablet and up: 768px - 1023px and 1024px+ */
@media (min-width: 768px) {
  .hero { flex-direction: row; }
  .stats-bar { flex-direction: row; }
  .nav-links { display: flex; }
  .nav-toggle { display: none; }
}

@media (min-width: 1024px) {
  /* desktop-only spacing/typography refinements */
}
```

Using a single `min-width: 768px` boundary keeps tablet and desktop visually identical for layout *direction* (Req 10.3/10.4 group them together), while `1024px` is reserved for spacing/typography scale-up only, matching Req 10's breakpoint definitions without contradicting them.

### Pill Buttons and Glow

```css
.btn-pill { border-radius: var(--radius-pill); }
.btn-filled { background: var(--color-accent); color: var(--color-bg-top); }
.btn-outline { background: transparent; border: 2px solid var(--color-accent); color: var(--color-accent); }

.btn-pill:hover, .btn-pill:focus-visible {
  color: var(--color-accent-hover);
  box-shadow: 0 0 12px 2px var(--color-accent-hover);
  outline: none;
}
```

`:focus-visible` (with a `:focus` fallback for older browsers) ensures the glow appears for keyboard focus, not just mouse hover, satisfying Req 14.4 and the keyboard-accessibility goal.

### Background Gradient and Texture Overlay

```css
body {
  background: linear-gradient(to bottom, var(--color-bg-top), var(--color-bg-bottom));
  min-height: 100vh;
}
.bg-texture {
  position: fixed; inset: 0; z-index: -1;
  background-image: url("assets/bg-texture.jpg");
  opacity: 0.1; /* within 5%-15% band, Req 13.1 */
  pointer-events: none;
}
```

The texture is a CSS `background-image` (not an `<img>`), so a missing file simply renders no image with no broken-image icon and no console-visible layout break — the gradient underneath remains visible automatically (Req 13.2). Because it's a CSS background rather than an `<img>`, there is no `alt` attribute to manage; the element itself carries `aria-hidden="true"` to reinforce that it is decorative (Req 13.6).

## JavaScript Behavior

`js/main.js` is organized into clearly commented function groups (Req 12.4), all wired up inside a single `DOMContentLoaded` listener at the bottom of the file.

### Smooth Scroll

```js
// Smoothly scrolls the viewport to a target section, accounting for the fixed navbar height.
function scrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - getNavbarHeight();
  window.scrollTo({ top, behavior: "smooth" });
}
```

CSS `scroll-behavior: smooth` plus `window.scrollTo({behavior:"smooth"})` yields browser-native easing, which reliably completes within the 300–800ms range on standard displays; no custom animation loop is required (Req 1.3, 2.13, 2.14, 11.1).

### Active Link Highlighting

```js
// Observes each content section and marks the matching navbar link as active
// whenever that section occupies the observation band beneath the fixed navbar.
function initActiveLinkObserver(sections, navLinks) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = navLinks.find(l => l.dataset.section === entry.target.id);
      if (!link) return;
      link.classList.toggle("active", entry.isIntersecting);
    });
  }, { rootMargin: `-${getNavbarHeight()}px 0px -60% 0px`, threshold: 0 });
  sections.forEach(s => observer.observe(s));
}
```

### Mobile Nav Toggle

```js
// Expands or collapses the mobile navigation menu and syncs the aria-expanded state.
function toggleMobileNav(toggleBtn, navLinks) {
  const expanded = navLinks.dataset.state === "expanded";
  navLinks.dataset.state = expanded ? "collapsed" : "expanded";
  toggleBtn.setAttribute("aria-expanded", String(!expanded));
}
```

Each nav link additionally calls `navLinks.dataset.state = "collapsed"` after initiating scroll, satisfying Req 1.11.

### Scroll Reveal Animation

```js
// Fades and lifts each section into view exactly once, the first time it crosses
// the 20%-visible threshold; already-revealed sections are left untouched on re-entry.
function initScrollReveal(sections) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.2 && !revealedSections.has(entry.target)) {
        entry.target.classList.add("revealed");
        revealedSections.add(entry.target);
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(s => observer.observe(s));
}
```

```css
[data-reveal] { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
[data-reveal].revealed { opacity: 1; transform: translateY(0); }
```

The `revealedSections` Set (or, equivalently, checking `classList.contains("revealed")`) guarantees the one-time trigger (Req 11.4, 11.5); each section is observed independently, so entries fire per-section rather than globally (Req 11.3).

### Contact Form Validation

```js
// Validates the contact form's Name, Email, and Message fields and returns
// a structured result describing which fields are invalid and why.
function validateContactForm(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.message.trim()) errors.message = "Message is required.";
  return { valid: Object.keys(errors).length === 0, errors };
}

// Submits validated form data; on success clears the form and shows a confirmation,
// on failure shows an error and preserves the entered values.
async function submitContactForm(form, data) {
  try {
    await mockSubmit(data); // placeholder network call
    showFormFeedback("success", "Thanks! Your message has been sent.");
    form.reset();
  } catch (err) {
    showFormFeedback("error", "Something went wrong sending your message. Please try again.");
    // fields intentionally left populated
  }
}
```

### CV Download Error Handling

```js
// Verifies the resume file is reachable before allowing the browser's default
// download navigation to proceed; shows an inline error if it is not.
function initCvDownload(link, resumePath) {
  link.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(resumePath, { method: "HEAD" });
      if (!res.ok) throw new Error("not found");
      window.location.href = resumePath; // triggers native download via `download` attribute semantics
    } catch {
      showToast("Resume is currently unavailable. Please try again later.");
    }
  });
}
```

Using a `HEAD` pre-check avoids ever starting a partial/broken download stream (Req 1.10) and, on failure, leaves the page state untouched instead of navigating anywhere (Req 13.5).

### Avatar Fallback

```js
// Swaps a broken profile-photo image for the CSS initials avatar fallback.
function handleAvatarError(imgEl) {
  imgEl.hidden = true;
  imgEl.nextElementSibling.hidden = false;
}
```

### Deep-Link Anchor on Load

```js
// On initial page load, scrolls to the section matching the URL hash, if any.
function scrollToInitialHash() {
  const id = window.location.hash.replace("#", "");
  if (SECTION_IDS.includes(id)) scrollToSection(id);
}
```

## Accessibility Approach (Req 12, Req 14)

- **Alt text strategy**: Every meaningful image (`profile.jpg`, its fallback, and each social icon) has descriptive `alt` text naming the subject or platform (Req 2.15, 2.16). Purely decorative imagery (`bg-texture.jpg`) uses `aria-hidden="true"` and no `alt` text at all, since it is a CSS background rather than an `<img>` (Req 13.6).
- **Decorative image handling**: the background texture and any purely ornamental glow/ring elements are removed from the accessibility tree via `aria-hidden="true"`.
- **Contrast ratios**: the palette's text colors (`--color-text` on `--color-bg-top`/`--color-bg-bottom`) are chosen to meet ≥4.5:1 per WCAG 2.1 AA; the accent `#2EC4F1` is only used for large text/icons or is paired with `--color-bg-top` where contrast is verified, never as small text on `--color-bg-bottom` alone (Req 14.8).
- **Keyboard focus states**: All interactive elements (`nav-link`, buttons, form fields, icons) use `:focus-visible` styling identical in effect to `:hover` (color shift + glow for pill buttons), and the mobile nav toggle manages `aria-expanded`/`aria-controls` for screen reader users.
- **Form accessibility**: labels are explicitly associated via `for`/`id`, and validation/success messages are announced through an `aria-live="polite"` region (`#form-feedback`).

## Error Handling

| Scenario | Requirement | Handling |
|---|---|---|
| `profile.jpg` fails to load | 2.4, 13.3 | `onerror` swaps to CSS initials avatar fallback, same frame/glow |
| `bg-texture.jpg` fails to load | 13.2 | CSS `background-image` silently fails; gradient remains, no JS needed |
| `resume.pdf` missing at click time | 1.10, 13.5 | `HEAD` pre-check; on failure show inline toast, no navigation/partial download |
| Contact form has empty field(s) | 9.5 | Per-field inline error messages, submission blocked client-side |
| Contact form has malformed email | 9.6 | Email-specific error message, submission blocked |
| Contact form submit network failure | 9.7 | Error banner shown, field values retained (no `form.reset()`) |
| Font (Poppins/Inter) fails to load | 14.7 | `font-family` stacks always end in generic `sans-serif` |

## Testing Strategy

This is a static content site with no backend and no build step. The only non-trivial *logic* is: (1) the contact-form validator, (2) the nav-toggle/active-link/scroll-reveal state machines, and (3) the asset-fallback handlers — everything else is fixed markup/content that either exists or doesn't.

**Property-based testing (PBT) is not used for this feature.** The reasons:
- Most acceptance criteria concern fixed, verbatim static content (exact section text, exact ordering, exact counts) — there is exactly one correct rendering, not a space of valid inputs to fuzz.
- The few criteria with real input variation (viewport width, form field contents, intersection ratios) have small, well-understood input spaces (a handful of breakpoint boundaries, a handful of string-validity classes) that are fully covered by a small fixed set of representative example inputs.
- There is no PBT library available without a build step/package manager, and introducing one would violate Requirement 12.2.

Instead, correctness is verified through:
- **DOM-assertion checks**: small vanilla-JS test functions (run via the browser console or a plain `<script>` test harness opened locally) that call the functions above with representative inputs (e.g., several viewport widths, several email strings, several empty-field combinations) and assert on the resulting DOM state. These scripts double as executable documentation of the properties below and can be run repeatedly without any test framework.
- **Manual checklist across breakpoints**: manually resize/inspect the page at 320px, 375px, 767px, 768px, 1023px, and 1024px+ to confirm layout direction, no horizontal scroll, no text truncation/overlap, and correct nav-toggle visibility.
- **HTML validation**: run the page through the W3C Nu HTML Checker (or an offline equivalent) to confirm valid, semantic markup and a single `<h1>`.
- **Manual accessibility pass**: keyboard-only navigation through all interactive elements, and a contrast check (e.g., browser dev tools contrast checker) against the fixed palette.

### Unit/example tests to write (representative inputs, not exhaustive fuzzing)

- `validateContactForm` with: all-valid data, each single field empty, all fields empty, malformed email variants (`"a"`, `"a@"`, `"a@b"`, `"@b.com"`), and a maximum-length valid string per field.
- `toggleMobileNav` called twice in a row returns to the original `data-state`.
- `initScrollReveal` simulated with a mocked `IntersectionObserver` firing twice for the same section — `revealed` class is added once and remains present.
- `handleAvatarError` called on a stub `<img>`/fallback pair — fallback becomes visible, image becomes hidden.
- `initCvDownload` with a mocked failing `fetch` — download is not initiated, toast is shown, and no page navigation occurs.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

**Property reflection note:** Several prework-identified properties overlapped and were consolidated below. Requirements 1.3, 2.13, 2.14, and 11.1 all describe "click an anchor link → animated scroll within a duration bound" and are merged into Property 1. Requirements 2.1/2.2 and 10.1/10.3 both describe hero column direction by breakpoint and are merged into Property 3. Requirements 2.9, 2.16, and 9.8 (new-tab + alt-text behavior for the fixed set of social icons) are merged into Properties 6 and 7. Requirements 14.4 and 14.6 (glow and color-change on hover/focus) are merged into Property 12. Requirements 5.5/5.6 and 8.1/8.2 (fixed-list count/order/verbatim invariants) remain as distinct properties (10 and 11) since they validate different sections' data.

### Property 1: Anchor-link scroll is animated and bounded in duration

For any internal anchor-triggering element (navbar link, "Hire Me" button, "Contact Me" button, or a URL hash present at load), activating it SHALL scroll the viewport to the matching Section_Anchor using a non-instantaneous transition that completes within 300 to 1000 milliseconds, and SHALL NOT jump directly to the final scroll position within a single frame.

**Validates: Requirements 1.3, 2.13, 2.14, 7.6, 11.1**

### Property 2: Active link matches the visible section

For any section in the fixed section set (Home, About, Skills, Experience, Education, Contact), when that section occupies the observation band beneath the fixed Navbar, the navigation link corresponding to that section SHALL be marked active while all other navigation links SHALL be marked inactive.

**Validates: Requirements 1.4**

### Property 3: Layout direction is a deterministic function of viewport width

For any viewport width, the Hero_Section columns and the Stats_Bar columns SHALL render stacked vertically when the width is less than 768px, and SHALL render side-by-side/in a single row when the width is 768px or greater, with no other width-dependent direction change.

**Validates: Requirements 2.1, 2.2, 10.1, 10.2, 10.3, 10.4**

### Property 4: Mobile nav toggle visibility matches breakpoint

For any viewport width less than 768px, the nav-toggle control SHALL be visible and the navigation links SHALL be collapsed by default; for any viewport width of 768px or greater, the nav-toggle control SHALL be hidden and the navigation links SHALL be visible without requiring a toggle.

**Validates: Requirements 1.6, 1.7**

### Property 5: Nav toggle is a self-inverse state flip

For any current state of the mobile navigation menu (expanded or collapsed), activating the nav-toggle control twice in succession SHALL return the menu to its original state, and activating it once SHALL always produce the opposite state.

**Validates: Requirements 1.9**

### Property 6: Nav link activation collapses an expanded mobile menu

For any navigation link, activating that link while the mobile navigation menu is in the expanded state SHALL result in the menu transitioning to the collapsed state after the scroll is initiated.

**Validates: Requirements 1.11**

### Property 7: Fixed-platform social icons open in a new tab

For any of the LinkedIn, GitHub, or Twitter/X social icon links (in either the Hero_Section or Contact_Section), activating that icon SHALL open its destination URL in a new browser tab; the Mail icon SHALL instead initiate an email compose action to the candidate's email address.

**Validates: Requirements 2.9, 2.10, 9.8**

### Property 8: Icon and avatar alt text identifies its subject

For any social icon image (LinkedIn, GitHub, Twitter/X, Mail) and for the profile photo/avatar-fallback pair, the element's accessible text (alt attribute or equivalent) SHALL be non-empty and SHALL identify the specific platform or subject it represents.

**Validates: Requirements 2.15, 2.16**

### Property 9: Stats Bar column order is width-invariant

For any viewport width, the four Stats_Bar statistics SHALL appear in the same fixed left-to-right (or top-to-bottom, when stacked) order — "3+ Years Experience", "24/7 Production Support", "5+ Monitoring & Ticketing Tools", "8.06 CGPA Graduate" — with exactly three dividers between them, and no statistic's rendered text SHALL be truncated or visually overlap an adjacent statistic.

**Validates: Requirements 3.1, 3.7**

### Property 10: Fixed-count list sections preserve count, order, and verbatim wording

For the Experience_Section's responsibility list and the Accomplishments_Section's list, the rendered list SHALL contain exactly the required number of distinct `<li>` items (nine and four, respectively), in the same order as the source resume content, with each item's text matching the source content exactly (no truncation, rephrasing, or reordering).

**Validates: Requirements 5.5, 8.1, 8.2**

### Property 11: Named tools are preserved verbatim within responsibility text

For each of the six tool names (ServiceNow, ITRS (Active Console), CCRE, MARRS, ARM, Asset Control), the exact case-sensitive substring SHALL appear within the Experience_Section's rendered responsibility text.

**Validates: Requirements 5.6**

### Property 12: Skills rendered are exactly the allowed closed set

For every skill group and skill item rendered within the Skills_Section, that group/item SHALL belong to the specified set of four groups and their associated items (in the specified order), and every specified group/item SHALL be present exactly once; no additional group or item SHALL be rendered.

**Validates: Requirements 6.2, 6.3, 6.4, 6.5, 6.6, 6.7**

### Property 13: Contact form field length is bounded regardless of input length

For any input string of any length typed into the Name, Email, or Message fields, the field's effective value used for validation and submission SHALL never exceed 100, 254, and 1000 characters respectively.

**Validates: Requirements 9.3**

### Property 14: Valid contact form submission succeeds and resets the form

For any Name, Email, and Message combination that is non-empty, within the length limits, and contains a well-formed email address, submitting the Contact_Form SHALL NOT navigate away from the Contact_Section, SHALL display a success confirmation, and SHALL clear all three fields.

**Validates: Requirements 9.4**

### Property 15: Empty-field submission is blocked and identifies each empty field

For any non-empty proper subset of {Name, Email, Message} left empty at submission time, the Contact_Form SHALL prevent submission and SHALL display a validation message identifying exactly the fields that were left empty, and no others.

**Validates: Requirements 9.5**

### Property 16: Malformed email is rejected independent of other field validity

For any Email field value that lacks an "@" character, a non-empty local part, or a non-empty domain part, submitting the Contact_Form (with Name and Message otherwise valid) SHALL be prevented and SHALL display an invalid-email-format message; conversely, any well-formed email value SHALL NOT trigger this message.

**Validates: Requirements 9.6**

### Property 17: Submission failure preserves entered data

For any valid Name, Email, and Message combination, if the submission attempt fails (network/service error), the Contact_Form SHALL display a failure error message and SHALL retain the originally entered Name, Email, and Message values unchanged.

**Validates: Requirements 9.7**

### Property 18: No horizontal overflow at any supported viewport width

For any viewport width from 320px upward, the document's total scrollable width SHALL NOT exceed the viewport width, i.e., no horizontal scrollbar SHALL appear.

**Validates: Requirements 10.5**

### Property 19: Minimum typography scale at mobile widths

For any viewport width in the mobile range (320px-767px), the computed body text font size SHALL be at least 14px and the computed heading font size SHALL be at least 18px, with no overlapping or truncated text.

**Validates: Requirements 10.6**

### Property 20: Scroll-reveal triggers once per section, independently, at the 20% threshold

For any of the six revealable sections (About, Experience, Skills, Education, Accomplishments, Contact), the Scroll_Reveal_Animation SHALL apply to that section only, the first time its visibility ratio reaches at least 20%, completing within 400-800ms with an opacity 0→1 fade and an upward translation of 20-40 pixels; any subsequent re-entry of that same section into the viewport during the same page visit SHALL NOT replay the animation, and other sections' visibility changes SHALL NOT affect a given section's reveal state.

**Validates: Requirements 11.2, 11.3, 11.4, 11.5**

### Property 21: Interactive elements use the accent color by default and the hover color on interaction

For any interactive element (button, link, or highlighted accent), its default computed color SHALL be #2EC4F1, and for any pill-shaped button, hovering, activating, or keyboard-focusing it SHALL change its computed color to #1BA8E0 and SHALL apply a glow effect in #1BA8E0 around its border.

**Validates: Requirements 14.2, 14.4, 14.6**

### Property 22: All buttons render as pills

For every button element rendered on the page, its computed border-radius SHALL be large enough to produce fully rounded, semicircular ends given the element's height.

**Validates: Requirements 14.5**
