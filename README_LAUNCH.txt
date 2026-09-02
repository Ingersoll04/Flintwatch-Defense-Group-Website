FLINTWATCH DEFENSE GROUP — BRAND MASTER SITE v1.0
=================================================

THIS BUILD IS BASED DIRECTLY ON:
flintwatch_website_standalone(1).html

It preserves the uploaded site's exact FlintWatch design system and embedded brand artwork,
then expands it into a complete public website rather than replacing it with a generic SaaS theme.

PUBLIC PAGES
------------
index.html        Brand-first homepage built directly from the uploaded standalone site
assessment.html   Security & Readiness Assessment
services.html     Current capabilities + future Protective Services roadmap
resources.html    Client questionnaire and safety guidance
about.html        Mission, official values, brand board, growth model
contact.html      Temporary service-request workflow
privacy.html      Public data-handling notice
scope.html        Current service scope and launch boundaries

CLIENT FLOW
-----------
Website
  -> Request Assessment / Download Questionnaire
  -> Client returns questionnaire to FlintWatch
  -> FlintWatch enters responses into PRIVATE HQ
  -> Nexus + Control Engine supports analysis
  -> Professional review
  -> Findings / recommendations / reassessment

CONTACT
-------
flintwatch.command@gmail.com

SECURITY BOUNDARY
-----------------
Publish ONLY this public website folder.

NEVER publish:
- FlintWatch HQ application
- .env
- API keys
- passwords
- client databases
- assessment working records
- HQ backups
- financial/legal records
- Nexus internal memory

FREE HOSTING
------------
This site is static and can be hosted on GitHub Pages, Cloudflare Pages, or Netlify.

LOCAL PREVIEW
-------------
Double-click preview_site.bat
Then browse to:
http://127.0.0.1:8080


PREVIEW NOTE
------------
If you open index.html directly from ChatGPT's artifact viewer, relative CSS/image files may not
be loaded by that viewer. That is a preview limitation, not a website problem.

For a correct local preview on Windows:
1. Extract the ZIP.
2. Double-click preview_site.bat.
3. Your browser opens http://127.0.0.1:8080

For a one-file ChatGPT/browser preview, use:
FlintWatch_Brand_Master_STANDALONE_PREVIEW.html
