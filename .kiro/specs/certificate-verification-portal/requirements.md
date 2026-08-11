# Requirements Document

## Introduction

The Certificate Verification Portal is a single-page React application that lets the public verify internship/training certificates and lets administrators create and manage those certificates. Certificates are persisted in Firebase Firestore so each one is reachable through a shareable URL. The application provides two top-level areas: a public "Verify Certificate" interface and a password-gated "Admin Gateway" for bulk data entry and certificate management. Direct certificate links are supported through URL hash routing.

This portal will be built as a new standalone Vite + React project (JavaScript, single `App.jsx` as the primary component) styled with Tailwind CSS, kept separate from the unrelated existing `frontend` Verilog editor project.

## Glossary

- **Portal**: The single-page React Certificate Verification Portal application as a whole.
- **Public_Verifier**: The component/subsystem responsible for the public certificate search and result display.
- **Admin_Gateway**: The password-gated administrative subsystem for entering and managing certificate data.
- **Auth_Gate**: The component that controls access to the Admin_Gateway via a password check.
- **Hash_Router**: The subsystem that reads and writes `window.location.hash` to drive navigation and direct certificate links.
- **ID_Generator**: The function that produces a certificate identifier from a certificate's Domain value plus random digits.
- **Cert_Store**: The Firestore-backed persistence subsystem (collection path `artifacts/{appId}/public/data/certificates`).
- **Auth_Service**: The Firebase Authentication subsystem providing anonymous sign-in.
- **Toast**: A transient on-screen notification message.
- **Certificate**: A stored record with fields: ID, Name (student name), Reg No, College, Domain, Period, Hours.
- **Certificate_ID**: The unique string identifier for a Certificate, formatted as "EDN" + first three letters of Domain (uppercase) + five digits.
- **Admin_Password**: The hardcoded demo password value `admin2026`.
- **Data_Entry_Table**: The spreadsheet-like table in the Admin_Gateway used to enter rows of student data before saving.
- **Management_Table**: The table in the Admin_Gateway that lists all stored Certificates from Cert_Store.

## Requirements

### Requirement 1: Application Navigation

**User Story:** As a visitor, I want a simple top navigation with two tabs, so that I can move between the public verification interface and the admin area.

#### Acceptance Criteria

1. THE Portal SHALL display a top navigation bar containing a "Verify Certificate" tab and an "Admin Gateway" tab.
2. WHEN a user selects the "Verify Certificate" tab, THE Portal SHALL display the Public_Verifier interface.
3. WHEN a user selects the "Admin Gateway" tab, THE Portal SHALL display the Admin_Gateway interface.
4. THE Portal SHALL render as a single-page application without full-page reloads when switching tabs.
5. THE Portal SHALL apply responsive Tailwind CSS styling so the navigation and content adapt to viewport widths of 320 pixels and wider.

### Requirement 2: Hash-Based Direct Certificate Links

**User Story:** As a certificate holder, I want a direct link to my certificate, so that anyone visiting the link sees the certificate details immediately.

#### Acceptance Criteria

1. WHEN the Portal loads with a non-empty `window.location.hash` that matches a stored Certificate_ID, THE Hash_Router SHALL display the result view for that Certificate without showing the search screen first.
2. WHEN the Portal loads with a non-empty `window.location.hash` that does not match any stored Certificate_ID, THE Public_Verifier SHALL display the not-found error message.
3. WHEN the value of `window.location.hash` changes while the Portal is open, THE Hash_Router SHALL update the displayed view to reflect the new hash value.
4. WHEN a user activates the "Back to Search" control in the result view, THE Hash_Router SHALL clear `window.location.hash` and THE Public_Verifier SHALL display the search screen.
5. WHILE `window.location.hash` matches a stored Certificate_ID, THE Hash_Router SHALL display that Certificate's result view regardless of which navigation tab is currently selected.

### Requirement 3: Public Certificate Search

**User Story:** As a member of the public, I want to enter a certificate ID and verify it, so that I can confirm a certificate is authentic.

#### Acceptance Criteria

1. THE Public_Verifier SHALL display a centered card containing a text input labeled "Enter Certificate ID" and a "Verify Now" button.
2. WHEN a user submits a Certificate_ID that exists in Cert_Store, THE Public_Verifier SHALL display the result view for the matching Certificate.
3. IF a user submits a Certificate_ID that does not exist in Cert_Store, THEN THE Public_Verifier SHALL display the text "Invalid Certificate Link or not found." styled in red.
4. IF a user submits the search with an empty or whitespace-only input, THEN THE Public_Verifier SHALL prevent the lookup and retain the search screen.
5. WHEN a user submits a matching Certificate_ID, THE Hash_Router SHALL set `window.location.hash` to that Certificate_ID.

### Requirement 4: Certificate Result Display

**User Story:** As a certificate viewer, I want a clearly formatted certificate result, so that I can read all certificate details and know it is verified.

#### Acceptance Criteria

1. WHEN the result view is displayed, THE Public_Verifier SHALL render a white card with rounded corners (`rounded-[1.5rem]`) and a soft shadow.
2. WHEN the result view is displayed, THE Public_Verifier SHALL render a green checkmark SVG next to the heading text "Verified Certificate".
3. WHEN the result view is displayed, THE Public_Verifier SHALL display the Certificate fields ID, Name, Reg No, College, Domain, Period, and Hours, each with a bold label of consistent minimum width.
4. WHEN the result view is displayed, THE Public_Verifier SHALL render footer text "If you believe this certificate is incorrect, contact" in gray italic style followed by a blue mailto link to internships@edunoversetechsolutions.com.
5. WHEN the result view is displayed, THE Public_Verifier SHALL render a "Back to Search" control at the top of the result view.

### Requirement 5: Admin Authentication

**User Story:** As an administrator, I want the admin area protected by a password, so that only authorized users can manage certificates.

#### Acceptance Criteria

1. WHILE the administrator has not entered the correct Admin_Password, THE Auth_Gate SHALL display a password input and withhold the Admin_Gateway management interface.
2. WHEN a user submits an input value equal to the Admin_Password, THE Auth_Gate SHALL grant access to the Admin_Gateway management interface.
3. IF a user submits an input value not equal to the Admin_Password, THEN THE Auth_Gate SHALL deny access and display an authentication error message.

### Requirement 6: Bulk Data Entry

**User Story:** As an administrator, I want a spreadsheet-like table to enter multiple students, so that I can create many certificates efficiently.

#### Acceptance Criteria

1. THE Data_Entry_Table SHALL provide editable columns for Student Name, Reg No, College, Domain, Period, and Hours, plus an Action column.
2. WHEN a user activates the "Add Another Row" control, THE Data_Entry_Table SHALL append a new row that copies the College, Domain, Period, and Hours values from the preceding row.
3. WHEN a user activates the delete control in a row's Action column, THE Data_Entry_Table SHALL remove that row.
4. WHEN a user activates the "Add Another Row" control while no preceding row exists, THE Data_Entry_Table SHALL append a new row with empty field values.

### Requirement 7: Certificate ID Generation

**User Story:** As an administrator, I want each certificate to receive a unique ID, so that certificates can be referenced and verified individually.

#### Acceptance Criteria

1. WHEN the ID_Generator generates a Certificate_ID, THE ID_Generator SHALL produce a string equal to "EDN" concatenated with the first three letters of the Domain in uppercase concatenated with five decimal digits.
2. WHERE a Domain value contains fewer than three letters, THE ID_Generator SHALL use the available uppercase letters of the Domain in the generated Certificate_ID.
3. WHEN the ID_Generator generates the five-digit portion, THE ID_Generator SHALL select each digit from the range 0 through 9.

### Requirement 8: Saving Certificates to the Cloud

**User Story:** As an administrator, I want to save entered rows to the cloud database, so that the certificates are permanently stored and shareable.

#### Acceptance Criteria

1. WHEN a user activates "Save to Cloud Database", THE Admin_Gateway SHALL generate a Certificate_ID for each valid row in the Data_Entry_Table and persist a corresponding Certificate to Cert_Store.
2. WHERE a row in the Data_Entry_Table has an empty Student Name, THE Admin_Gateway SHALL exclude that row from the save operation.
3. WHEN the Admin_Gateway persists a Certificate, THE Cert_Store SHALL store the Certificate under the path `artifacts/{appId}/public/data/certificates`.
4. IF persisting a Certificate to Cert_Store fails, THEN THE Admin_Gateway SHALL halt the save operation and display an error notification to the administrator.

### Requirement 9: Certificate Management Listing

**User Story:** As an administrator, I want to see all stored certificates with quick actions, so that I can share and test certificate links.

#### Acceptance Criteria

1. THE Management_Table SHALL display, for each stored Certificate, the ID, Name, and Reg No values along with a "Copy Link" control and a "Test Link" control.
2. WHEN the contents of Cert_Store change, THE Cert_Store SHALL deliver the updated Certificate set to the Management_Table through a real-time listener.
3. WHEN a user activates the "Copy Link" control for a Certificate, THE Admin_Gateway SHALL copy the current page URL concatenated with "#" and the Certificate_ID to the clipboard and display a success Toast.
4. WHEN a user activates the "Test Link" control for a Certificate, THE Hash_Router SHALL set `window.location.hash` to that Certificate_ID and THE Portal SHALL display the result view for that Certificate.

### Requirement 10: Firebase Initialization and Authentication

**User Story:** As a developer, I want Firebase initialized with anonymous authentication, so that the application can read and write certificate data securely before any database calls.

#### Acceptance Criteria

1. WHEN the Portal starts, THE Portal SHALL initialize Firebase using the provided Firebase configuration.
2. WHEN the Portal starts, THE Auth_Service SHALL establish anonymous authentication before the Portal issues any Cert_Store read or write operation.
3. IF anonymous authentication fails, THEN THE Portal SHALL display an error notification and block all Cert_Store read and write operations until authentication succeeds.
4. THE Portal SHALL read Firebase configuration values from environment variables rather than hardcoding secrets in source files committed to version control.
