# Requirements Document

## Introduction

This document defines the requirements for a single-page, fully responsive personal portfolio website for Tatekalva Umasree, a Software Engineer specializing in Application Support. The website is delivered as plain HTML, CSS, and JavaScript files (no frontend framework) and lives in a new top-level folder `portfolio-tatekalva-umasree/`, sibling to the existing `frontend/`, `backend/`, and `real-estate/` folders. The site uses a dark navy/black gradient visual theme with cyan/electric-blue accents, and presents verbatim resume content across Navbar, Hero, Stats Bar, About, Experience, Skills, Education, Accomplishments, and Contact sections. Since no real profile photo or CV file is available, the site must render correctly using placeholder asset paths and a CSS-based initials-avatar fallback.

## Glossary

- **Portfolio_Site**: The single-page HTML/CSS/JS website delivering Tatekalva Umasree's portfolio.
- **Navbar**: The fixed/sticky top navigation bar containing the logo, section links, and Download CV control.
- **Hero_Section**: The introductory section containing the profile photo, name, tagline, intro paragraph, social icons, and CTA buttons.
- **Stats_Bar**: The four-column bar beneath the Hero_Section displaying summary statistics.
- **About_Section**: The section presenting the hero/about summary paragraph.
- **Experience_Section**: The section presenting the work experience entry and its responsibilities.
- **Skills_Section**: The section presenting grouped technical and professional skills.
- **Education_Section**: The section presenting the academic qualification.
- **Accomplishments_Section**: The section presenting the list of accomplishments.
- **Contact_Section**: The section presenting contact details, the contact form, and social icons.
- **Contact_Form**: The Name/Email/Message form within the Contact_Section.
- **Section_Anchor**: An in-page anchor target (e.g. `#about`) used for smooth-scroll navigation.
- **Active_Link**: The Navbar link that is visually highlighted to indicate the currently visible section.
- **Scroll_Reveal_Animation**: The fade-up-on-scroll animation applied to sections as they enter the viewport.
- **Avatar_Fallback**: The CSS-rendered "TU" initials avatar shown when the real profile photo asset is unavailable.
- **CV_Download_Control**: The cyan pill button in the Navbar that triggers download of the placeholder resume file.
- **Viewport_Breakpoint**: One of the three defined responsive layout ranges: mobile (320px-767px), tablet (768px-1023px), or desktop (1024px and above).
- **Viewport_Width**: The current width, in CSS pixels, of the browser's visible viewport.

## Requirements

### Requirement 1: Navbar Structure and Behavior

**User Story:** As a site visitor, I want a persistent navigation bar with clear links and a CV download option, so that I can move through the portfolio and obtain the resume easily.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render a Navbar containing a logo/name element on the left, a horizontally centered set of navigation links in the order Home, About, Skills, Experience, Education, Contact, and a Download CV control on the right.
2. THE Navbar SHALL remain fixed to the top of the viewport during page scroll.
3. WHEN a visitor clicks a Navbar link, THE Portfolio_Site SHALL scroll the viewport to the corresponding Section_Anchor using an animated, non-instantaneous scrolling transition that completes within 1000 milliseconds.
4. WHILE a Section_Anchor's top boundary is at or above the bottom edge of the fixed Navbar and its bottom boundary is below the bottom edge of the fixed Navbar, THE Navbar SHALL display the corresponding link as the Active_Link.
5. WHEN a visitor activates the CV_Download_Control, THE Portfolio_Site SHALL initiate a file download of the resume file located at `assets/resume.pdf`.
6. WHERE the Viewport_Width is less than 768 pixels, THE Navbar SHALL display an icon toggle control alongside the CV_Download_Control for controlling navigation display.
7. WHERE the Viewport_Width is less than 768 pixels, THE Navbar SHALL collapse the navigation links behind the icon toggle control.
8. THE Navbar SHALL render the logo/name element as the monogram "TU" styled in cyan.
9. WHEN a visitor activates the icon toggle control, THE Navbar SHALL toggle the visibility of the navigation links, displaying them in an expanded state if currently hidden, or hiding them in a collapsed state if currently visible.
10. IF the resume file is unavailable when the CV_Download_Control is activated, THEN THE Portfolio_Site SHALL display an error indication to the visitor and SHALL NOT initiate a partial or corrupted file download.
11. WHEN a visitor clicks a Navbar link while the navigation links are in the expanded state, THE Navbar SHALL collapse the navigation links to the hidden state after initiating the scroll to the corresponding Section_Anchor.

### Requirement 2: Hero Section Content and Layout

**User Story:** As a site visitor, I want an introductory hero section with the candidate's identity, role, and call-to-action options, so that I immediately understand who the portfolio belongs to and what actions I can take.

#### Acceptance Criteria

1. WHILE the viewport width is 768px or greater, THE Hero_Section SHALL present a two-column layout with a circular profile photo area in one column and identity/text content in the other column, arranged side-by-side.
2. WHILE the viewport width is less than 768px, THE Hero_Section SHALL present the circular profile photo area and identity/text content stacked vertically in a single column.
3. THE Hero_Section SHALL render the profile photo area as a circular frame with a glowing cyan ring accent, sourcing the image from `assets/profile.jpg`.
4. IF the image at `assets/profile.jpg` fails to load, THEN THE Hero_Section SHALL display the Avatar_Fallback showing the initials "TU" in cyan-on-navy styling within the same circular glowing frame.
5. THE Hero_Section SHALL display the heading text "Hello, I'm Tatekalva Umasree".
6. THE Hero_Section SHALL display the role tagline "Software Engineer | Application Support Specialist" styled in a cyan accent color.
7. THE Hero_Section SHALL display the introductory paragraph: "Dedicated and analytical IT Professional with over 3 years of experience in maintaining high-availability, mission-critical systems and ensuring 24/7 service reliability. Proven background in rapid incident management, and complex issue resolution—skills directly transferable to optimizing and troubleshooting network infrastructure."
8. THE Hero_Section SHALL display a row of social icons linking to LinkedIn, GitHub, Twitter/X, and Mail destinations.
9. WHEN a visitor activates the LinkedIn, GitHub, or Twitter/X social icon, THE Portfolio_Site SHALL open the corresponding destination URL in a new browser tab.
10. WHEN a visitor activates the Mail social icon, THE Portfolio_Site SHALL initiate an email compose action addressed to the candidate's email address.
11. THE Hero_Section SHALL display two call-to-action buttons labeled "Hire Me" and "Contact Me".
12. THE Hero_Section SHALL render the "Hire Me" button with filled cyan styling and the "Contact Me" button with outlined styling.
13. WHEN a visitor activates the "Contact Me" button, THE Portfolio_Site SHALL scroll the viewport to the Contact_Section using a continuous, non-instantaneous scrolling transition.
14. WHEN a visitor activates the "Hire Me" button, THE Portfolio_Site SHALL scroll the viewport to the Contact_Section using a continuous, non-instantaneous scrolling transition.
15. THE Hero_Section profile photo area and Avatar_Fallback image SHALL each include alt text identifying the depicted subject as the candidate's profile photo or initials.
16. THE Hero_Section social icon images SHALL each include alt text identifying the specific platform (LinkedIn, GitHub, Twitter/X, or Mail) the icon links to.

### Requirement 3: Stats Bar Content

**User Story:** As a site visitor, I want a quick summary of key career statistics, so that I can gauge the candidate's experience level at a glance.

#### Acceptance Criteria

1. THE Stats_Bar SHALL render exactly four columns, in a fixed left-to-right order, with a visible vertical divider between each pair of adjacent columns (3 dividers total), and this column order SHALL be preserved regardless of viewport width.
2. THE Stats_Bar SHALL display the statistic "3+ Years Experience" in the first column.
3. THE Stats_Bar SHALL display the statistic "24/7 Production Support" in the second column.
4. THE Stats_Bar SHALL display the statistic "5+ Monitoring & Ticketing Tools" in the third column.
5. THE Stats_Bar SHALL display the statistic "8.06 CGPA Graduate" in the fourth column.
6. THE Stats_Bar SHALL be positioned directly below the Hero_Section, with no other section or component rendered between them.
7. THE Stats_Bar SHALL keep all four column statistics fully visible and readable at any supported viewport width, without truncating, hiding, or overlapping any statistic's text.

### Requirement 4: About Section Content

**User Story:** As a site visitor, I want a dedicated about section restating the candidate's professional summary, so that I can read the summary as a standalone section reachable via navigation.

#### Acceptance Criteria

1. WHEN the site visitor selects the Navbar "About" link, THE About_Section SHALL become the visible section within the browser viewport by navigating to its Section_Anchor.
2. THE About_Section SHALL display the summary text: "Dedicated and analytical IT Professional with over 3 years of experience in maintaining high-availability, mission-critical systems and ensuring 24/7 service reliability. Proven background in rapid incident management, and complex issue resolution—skills directly transferable to optimizing and troubleshooting network infrastructure."
3. THE About_Section SHALL display the summary text specified in Criterion 2 verbatim and in full, with no wording changes, additions, omissions, or reordering relative to the source resume content.

### Requirement 5: Experience Section Content

**User Story:** As a site visitor, I want detailed work experience information, so that I can evaluate the candidate's professional background.

#### Acceptance Criteria

1. WHEN the visitor selects the Navbar "Experience" link, THE Portfolio_Site SHALL scroll the viewport to the Experience_Section via its Section_Anchor.
2. THE Experience_Section SHALL display the job title "Software Engineer", the employer "HCLTech", and the duration "Sep 2022 – Present".
3. THE Experience_Section SHALL display the client name "ANZ" and the project name "RNR Application Support".
4. THE Experience_Section SHALL display the project description: "Support for banking and financial applications, ensuring smooth operation of online and batch processes, timely incident resolution, and compliance with SLA standards. Focused on minimizing downtime and providing continuous operational support for high-volume client systems."
5. THE Experience_Section SHALL display exactly nine responsibility statements, matching verbatim the nine responsibility statements defined in the resume content used as the authoritative source for this section, each rendered as a distinct list item.
6. THE Experience_Section SHALL preserve the tool names ServiceNow, ITRS (Active Console), CCRE, MARRS, ARM, and Asset Control as case-sensitive, verbatim text exactly as written within the responsibility statements.

### Requirement 6: Skills Section Content

**User Story:** As a site visitor, I want the candidate's technical and professional skills grouped by category, so that I can quickly assess relevant competencies.

#### Acceptance Criteria

1. WHEN a visitor selects the Navbar "Skills" link, THE Portfolio_Site SHALL navigate to the Skills_Section such that the Skills_Section heading becomes visible within the browser viewport, using the Section_Anchor as the navigation target.
2. THE Skills_Section SHALL display a "Monitoring & Ticketing Tools" group as a labeled category containing exactly two visible skill items: "ServiceNow" and "ITRS Geneos Active Console".
3. THE Skills_Section SHALL display a "Scripting & Querying" group as a labeled category containing exactly two visible skill items: "SQL" and "Linux/Unix commands".
4. THE Skills_Section SHALL display a "Database/RDBMS" group as a labeled category containing exactly one visible skill item: "SQL Server".
5. THE Skills_Section SHALL display an "Other Skills" group as a labeled category containing exactly three visible skill items: "Incident Management", "Problem & Change Management", and "ITIL".
6. THE Skills_Section SHALL display the four skill groups in the following top-to-bottom order: "Monitoring & Ticketing Tools", "Scripting & Querying", "Database/RDBMS", "Other Skills".
7. THE Skills_Section SHALL NOT display any skill group or skill item other than those specified in these acceptance criteria.

### Requirement 7: Education Section Content

**User Story:** As a site visitor, I want to see the candidate's academic background, so that I can verify formal qualifications.

#### Acceptance Criteria

1. WHEN a visitor clicks the Navbar "Education" link, THE Portfolio_Site SHALL scroll to the Education_Section using its Section_Anchor.
2. THE Education_Section SHALL display the degree "Bachelor of Technology – Computer Science & Engineering".
3. THE Education_Section SHALL display the institution name "Siddharth Institute of Engineering & Technology (Autonomous)".
4. THE Education_Section SHALL display the graduation year "2022".
5. THE Education_Section SHALL display the CGPA "8.06 CGPA".
6. WHEN the page loads with the Education_Section's Section_Anchor present in the URL, THE Portfolio_Site SHALL scroll to the Education_Section without requiring a Navbar click.

### Requirement 8: Accomplishments Section Content

**User Story:** As a site visitor, I want a list of notable accomplishments, so that I can see concrete evidence of the candidate's impact.

#### Acceptance Criteria

1. THE Accomplishments_Section SHALL display exactly four accomplishment statements from the source resume content, with each statement rendered as a separate, visually distinct list item (e.g., a bulleted or numbered entry), presented in the same order as they appear in the source resume content.
2. THE Accomplishments_Section SHALL preserve the wording, punctuation, and capitalization of each accomplishment statement exactly as written in the source resume content, without truncation, summarization, or rephrasing.

### Requirement 9: Contact Section Content and Behavior

**User Story:** As a site visitor, I want to view contact details and submit a message through a form, so that I can reach out to the candidate.

#### Acceptance Criteria

1. WHEN a visitor clicks the Navbar "Contact" link, THE Portfolio_Site SHALL navigate to the Contact_Section via its Section_Anchor.
2. THE Contact_Section SHALL display the email address "tatekalvaumasree@gmail.com" and the phone number "+91-7989489757".
3. THE Contact_Section SHALL render a Contact_Form containing a Name field (maximum 100 characters), an Email field (maximum 254 characters), and a Message field (maximum 1000 characters), plus a cyan-styled submit button.
4. WHEN a visitor submits the Contact_Form with the Name field, Email field, and Message field populated and valid, THE Portfolio_Site SHALL submit the message without navigating away from the Contact_Section, display a success confirmation message, and clear the Name, Email, and Message fields.
5. IF a visitor submits the Contact_Form with the Name field, Email field, or Message field empty, THEN THE Portfolio_Site SHALL prevent submission and display a validation message identifying each empty field.
6. IF a visitor submits the Contact_Form with an Email field value that does not match a valid email address format (containing an "@" character, a local part, and a domain part), THEN THE Portfolio_Site SHALL prevent submission and display a validation message indicating an invalid email format.
7. IF the Contact_Form submission fails due to a network or service error, THEN THE Portfolio_Site SHALL display an error message indicating the submission failed and SHALL retain the entered Name, Email, and Message field values.
8. THE Contact_Section SHALL display a row of social icons linking to LinkedIn, GitHub, Twitter/X, and Mail destinations, where the LinkedIn, GitHub, and Twitter/X links SHALL open in a new browser tab.

### Requirement 10: Responsive Layout Behavior

**User Story:** As a site visitor on any device, I want the portfolio to display correctly, so that I can read and interact with all content regardless of screen size.

#### Acceptance Criteria

1. WHILE the Viewport_Breakpoint is mobile (viewport width 320px to 767px), THE Portfolio_Site SHALL render the Hero_Section columns stacked vertically.
2. WHILE the Viewport_Breakpoint is mobile (viewport width 320px to 767px), THE Portfolio_Site SHALL render the Stats_Bar columns stacked vertically or wrapped to fit within the viewport width without horizontal overflow.
3. WHILE the Viewport_Breakpoint is tablet (viewport width 768px to 1023px) or desktop (viewport width 1024px and above), THE Portfolio_Site SHALL render the Hero_Section columns side by side.
4. WHILE the Viewport_Breakpoint is tablet (viewport width 768px to 1023px) or desktop (viewport width 1024px and above), THE Portfolio_Site SHALL render the Stats_Bar columns side by side in a single row.
5. THE Portfolio_Site SHALL render all sections without introducing horizontal page scrolling at mobile (320px-767px), tablet (768px-1023px), and desktop (1024px and above) Viewport_Breakpoints.
6. THE Portfolio_Site SHALL scale typography and spacing such that, at the mobile Viewport_Breakpoint (320px-767px), body text renders at a minimum of 14px and heading text renders at a minimum of 18px, with no text overlap between elements and no text truncation of content that is intended to be fully visible, at mobile, tablet, and desktop Viewport_Breakpoints.

### Requirement 11: Scroll and Animation Behavior

**User Story:** As a site visitor, I want smooth navigation and subtle visual feedback while scrolling, so that browsing the portfolio feels polished.

#### Acceptance Criteria

1. WHEN a visitor clicks any link targeting a Section_Anchor, THE Portfolio_Site SHALL scroll to the target section using an animated transition that completes within 300 to 800 milliseconds, rather than jumping instantly.
2. WHEN a section's content area becomes at least 20% visible within the browser viewport during scrolling, THE Portfolio_Site SHALL apply a Scroll_Reveal_Animation that fades the section's opacity from 0 to 1 and translates it upward by 20 to 40 pixels, completing within 400 to 800 milliseconds.
3. THE Portfolio_Site SHALL trigger the Scroll_Reveal_Animation for each of the About_Section, Experience_Section, Skills_Section, Education_Section, Accomplishments_Section, and Contact_Section separately, based on that individual section's own entry into the viewport, rather than triggering all sections simultaneously.
4. THE Portfolio_Site SHALL trigger the Scroll_Reveal_Animation for each section exactly once per page visit, upon that section's first entry into the viewport.
5. IF a section that has already displayed its Scroll_Reveal_Animation re-enters the viewport during the same page visit, THEN THE Portfolio_Site SHALL display the section in its final revealed state without replaying the animation.

### Requirement 12: Semantic Structure and Code Quality

**User Story:** As a developer maintaining the portfolio, I want semantic, well-organized markup, so that the site is accessible and easy to extend.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use the semantic HTML5 element `header` for the page banner region, `nav` for the primary navigation menu, `main` for the primary content wrapper, `section` for each major content group (About, Skills, Experience, Education, Accomplishments, and Contact), and `footer` for the page footer region.
2. THE Portfolio_Site SHALL be organized into HTML, CSS, and JavaScript files without using a JavaScript framework or library (e.g., React, Vue, Angular, jQuery) and without a build or bundling step (e.g., webpack, Babel, npm build scripts), such that every file can be opened directly in a web browser without prior compilation.
3. THE Portfolio_Site SHALL locate all deliverable files under the top-level folder `portfolio-tatekalva-umasree/`.
4. THE Portfolio_Site SHALL include, at minimum, one descriptive comment at the start of each top-level section in the CSS file and one descriptive comment immediately preceding each function or module in the JavaScript file, with each comment stating the purpose of the section, function, or module it precedes.
5. THE Portfolio_Site SHALL NOT include placeholder or lorem-ipsum text in any resume-derived content section.
6. THE Portfolio_Site SHALL ensure all resume-derived textual content (including name, contact information, summary, skills, experience, education, and accomplishments) originates verbatim from the resume content defined in this document; structural or navigational labels (e.g., section headings such as "Skills" or "Contact") are not required to appear verbatim in the resume content.
7. THE Portfolio_Site SHALL use exactly one `h1` element per page and organize all subsequent heading elements (`h2` through `h6`) in a sequential, non-skipping hierarchy reflecting the document's content structure.

### Requirement 13: Asset Fallback Behavior

**User Story:** As a site visitor, I want the portfolio to render correctly even though real photo and document assets are unavailable, so that the page is never visibly broken.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL reference the background texture image at the placeholder path `assets/bg-texture.jpg` and render it at an opacity value between 5% and 15% over the gradient background.
2. IF the image at `assets/bg-texture.jpg` fails to load, THEN THE Portfolio_Site SHALL continue displaying the dark navy/black gradient background without the texture overlay.
3. IF the image at `assets/profile.jpg` fails to load, THEN THE Portfolio_Site SHALL display the Avatar_Fallback in place of the profile photo, as defined in Requirement 2.
4. THE Portfolio_Site SHALL reference the CV_Download_Control target file at the placeholder path `assets/resume.pdf`.
5. IF the file at `assets/resume.pdf` is unavailable at download time, THEN THE Portfolio_Site SHALL leave the current page state unchanged rather than navigating to an error page.
6. THE Portfolio_Site SHALL mark the background texture image as decorative to assistive technology, omitting descriptive alt text for that image.

### Requirement 14: Visual Theme Consistency

**User Story:** As a site visitor, I want a consistent dark, modern visual theme throughout the portfolio, so that the site feels cohesive and professional.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL apply a dark gradient background transitioning vertically from #050B18 at the top of the page to #0A1628 at the bottom, spanning the full height and width of the page.
2. THE Portfolio_Site SHALL render interactive elements, including buttons, links, and highlight accents, using #2EC4F1 as their default color.
3. THE Portfolio_Site SHALL render heading text using the Poppins sans-serif typeface and body text using the Inter sans-serif typeface.
4. WHEN a visitor hovers or keyboard-focuses a pill-shaped button, THE Portfolio_Site SHALL apply a glow visual effect in the #1BA8E0 color around the button's border.
5. THE Portfolio_Site SHALL render all buttons with fully rounded, semicircular ends, forming a pill shape.
6. WHEN a visitor hovers, activates, or keyboard-focuses an interactive element, THE Portfolio_Site SHALL change the color of that element to #1BA8E0.
7. IF the Poppins or Inter font resource fails to load, THEN THE Portfolio_Site SHALL render the affected text using the browser's default sans-serif typeface.
8. THE Portfolio_Site SHALL render all text with a color contrast ratio of at least 4.5:1 against its background, in accordance with WCAG 2.1 Level AA guidelines.
