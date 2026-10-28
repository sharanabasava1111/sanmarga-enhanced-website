# Sanmarga multi-page NGO website

Open this folder in VS Code and run `index.html` with the **Live Server** extension.

## Pages

- `index.html` — Home; the Education, Health and Public Awareness cards link to real pages.
- `about.html` — Organisation story, mission, vision and values.
- `education.html`, `health.html`, `awareness.html` — Individual programme pages.
- `contact.html` — Form layout; currently stores a **demo** enquiry only in the visitor's browser.
- `donate.html` — Donation layout; intentionally does not accept payments.

## Personalise before publishing

1. Search all files for `example.org`, `00000`, and the Unsplash image URLs. Replace with confirmed client information and approved photos.
2. The English and Kannada wording uses `data-en` and `data-kn`. When adding text, add both attributes to enable the language button.
3. Update the official Instagram profile link in `script.js`.
4. Connect the contact form to a secure form/API service and connect donations to a verified payment provider. Do not put secret keys into these frontend files.

## Test locally

Run the included smoke test in a terminal:

```powershell
node test-template.mjs
```
