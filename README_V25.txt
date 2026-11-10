VALERIE GURL V25 — DYNAMIC HEADER STUDIO

Based directly on V24 girls-only source. Existing registration, theme, content, and background-effects code retained.

New: Host Dashboard > Header Studio.
Independent controls for logo/avatar, brand typography, sync status, navigation, waves badge, login button, layout, and visibility.
Default controls reproduce V24 header appearance; settings persist to Firebase at valerie_site/headerStudio.
Editing previews on the admin screen; Save publishes; Reset returns preview to original.

Install: npm install
Build: npm run build
Run locally: npm run dev

NOTE: JSX syntax was checked with TypeScript transpilation. Full npm build and live Firebase/browser tests were NOT completed because npm install timed out in this environment. Firebase security rules must restrict writes to authorized admins. Existing login authentication is not a secure replacement for Firebase Auth.
