# PPL Kneeboard

Personal Android app for PPL training, sideloaded. Works offline on phone and tablet.

**Get the app:** open the repo's **Releases** on the phone or tablet, download `PPLKneeboard.apk` from the latest build, and open it. Each push to `main` builds a new release; installing it updates the app and keeps your ticks, settings and answers.

## Two sections
- **Checklist** – Cessna 150/152, Pooley's checklist MOD05/18, transcribed verbatim (248 items: 8 normal phases, 9 emergency drills). Tap to tick, "next item" highlight, emergency button from any checklist screen, day / sun / night display, text size. Ticks clear after 6 hours unused.
- **Air Law** – CAA PPL(A) syllabus 010: notes with diagrams for 10 topics, 70 original practice questions with explanations, 20-question mock paper marked against 75%, review of missed questions. Answers kept until reset in Settings.

The app always opens on the Checklist. The Checklist / Air Law tabs sit under the header on both home screens.

## Project notes
- The app is one page, `app/src/main/assets/index.html`, shown full screen in a WebView (`MainActivity.kt`), served from a fixed origin so saved data stays put. Screen stays on while the app is open.
- **Don't edit `assets/index.html` by hand.** It is built by `python3 web/merge.py` from:
  - `web/c150-original.html` – the checklist app as it was. The `NORMAL` and `EMERG` data is never edited by the build.
  - `web/study.css`, `web/study-data.js` (notes, diagrams, questions), `web/study-app.js` (study screens).
  CI runs the merge before every build.
- Saved data (browser storage): `c150cl.v1` checklist ticks, `c150cl.prefs` display settings, `ppl-air-law-v1` Air Law answers.
- The signing key is in `signing/` so every build installs over the last. Keep the repo private.

Not authoritative: the checklist supplements the POH, and the Air Law notes are study material, not the CAA question bank. Check regulatory points against current CAA publications.
