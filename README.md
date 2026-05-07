# Jarvis PWA — Setup

A web-based version of Jarvis built for a locked-down iPad. Tap-to-talk voice
assistant, runs entirely in Safari, installable to the home screen.

## Files

- `index.html` — the entire app (HTML + CSS + JS in one file)
- `manifest.json` — PWA manifest with inline SVG icons
- `service-worker.js` — caches the shell for offline UI loading

## Hosting (pick one)

You need **HTTPS** — microphone access won't work over plain HTTP. All three
options below are free and give you HTTPS automatically.

### Option A — GitHub Pages (recommended)

1. Make a free GitHub account if you don't have one.
2. Create a new public repo, e.g. `jarvis`.
3. Upload all three files to the repo root.
4. In the repo go to **Settings → Pages**.
5. Under "Build and deployment" pick **Deploy from a branch**, branch `main`,
   folder `/ (root)`. Save.
6. Wait ~30 seconds. Your URL is `https://<username>.github.io/jarvis/`.

### Option B — Netlify Drop

1. Go to <https://app.netlify.com/drop>
2. Drag the entire folder containing the three files into the page.
3. Get an instant URL like `https://random-name.netlify.app`.

### Option C — Vercel

1. <https://vercel.com> → New Project → upload the folder.
2. Same one-click deploy, instant HTTPS URL.

## Installing on the iPad

1. Open the URL in **Safari** (must be Safari, not Chrome).
2. Tap the **Share** button (square with up-arrow) at the top.
3. Scroll down → **Add to Home Screen** → name it "Jarvis" → Add.
4. Quit Safari and tap the new Jarvis icon. It launches fullscreen.
5. Tap the gear, paste your `sk-ant-…` API key, tap Done.
6. Tap the mic. iPad will ask for microphone + speech recognition
   permission once — allow both.

## Iterating from your Windows machine

If you used GitHub Pages: edit `index.html` locally, commit, push. Wait ~30
seconds, refresh on the iPad. That's the whole loop. No Mac, no Xcode, no
file transfers.

## Notes & gotchas

- **Speech recognition language** is hardcoded to `en-US`. Change `r.lang`
  in `index.html` if you want German (`de-DE`) etc.
- **Voices**: the synthesizer picks the best English voice your iPad has.
  For better quality, on iPad go to *Settings → Accessibility → Spoken Content
  → Voices → English* and download an "Enhanced" or "Premium" voice.
- **API key** is stored in `localStorage`. Only this browser sees it. Still,
  set a spending cap in the Anthropic console as a safety net.
- **Direct browser calls** to Anthropic use the
  `anthropic-dangerous-direct-browser-access: true` header. This is
  appropriate for personal-use tools where the user holds their own key.
- **Conversation history** is sent each turn (within the session) but not
  persisted across launches. Add `localStorage` save in `ask()` if you want
  permanence.
- **Model switcher**: settings sheet lets you switch Haiku ↔ Sonnet on the fly.
