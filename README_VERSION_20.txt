VALERIE GURL WEBSITE — VERSION 20
=================================

Project stack: React 18, Vite 4, Tailwind CSS 3, Firebase Realtime Database.

Changes in this version:
- Added a Host Dashboard tab: "Layout & Typography".
- Added live preview while changing existing theme controls.
- Added section-level layout overrides for page, header, booking, rules, contact banner, and footer.
- Added controls for background/text color, font size, text alignment, padding, margin, width, max width, and corner radius.
- Added global font-size and line-height controls.
- Layout/theme values are stored under the existing Firebase path: valerie_site/theme.
- Existing content, registrations, deleted history, and hosted-party count paths are unchanged.
- Existing theme values are merged with defaults so older saved theme records remain compatible.

Important:
- Run `npm install`, then `npm run build` before deployment.
- This environment could not complete dependency installation, so a production build was not verified here.
- The existing host login is a client-side credential check and is NOT secure authentication.
  Before public production use, move admin authentication to Firebase Authentication or a
  trusted server and restrict Realtime Database rules so public visitors cannot write admin data.
- Firebase web configuration is client-visible by design; database security must be enforced
  with Firebase Authentication and Security Rules.
- Section-level controls are provided; this is not a pixel-level drag-and-drop editor for
  every individual DOM node.
