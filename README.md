# PPL Kneeboard

Personal Android app for PPL training, sideloaded. Works offline on phone and tablet.

**Get the app:** open the repo's **Releases** on the phone or tablet, download `PPLKneeboard.apk` from the latest build, and open it. Each push to `main` builds a new release; installing it updates the app and keeps your ticks, settings and answers.

## Three sections
- **Checklist** – Cessna 150/152, Pooley's checklist MOD05/18, transcribed verbatim (248 items: 8 normal phases, 9 emergency drills). Tap to tick, "next item" highlight, emergency button from any checklist screen, day / sun / night display, text size. Ticks clear after 6 hours unused.
- **Training** – notes with diagrams for the CAA PPL(A) theory subjects, one subject per paper. Built so far: Air Law (010), Human Performance (040), Meteorology (050), Navigation (060), Principles of Flight (080), Communications (090). Still to add: Aircraft General Knowledge (020), Flight Performance & Planning (030), Operational Procedures (070).
- **Exams** – 280 original practice questions with explanations. For each subject: a 20-question mock paper marked against 75%, practice by topic, and review of missed questions; plus review of misses across all subjects. Answers kept until reset in Settings.

The app always opens on the Checklist. The tabs sit under the header on the three home screens.

## Project notes
- The app is one page, `app/src/main/assets/index.html`, shown full screen in a WebView (`MainActivity.kt`), served from a fixed origin so saved data stays put. Screen stays on while the app is open.
- **Don't edit `assets/index.html` by hand.** It is built by `python3 web/merge.py` from:
  - `web/c150-original.html` – the checklist app as it was. The `NORMAL` and `EMERG` data is never edited by the build.
  - `web/study.css`, `web/study-app.js` (Training and Exams screens), and `web/subjects/NNN-name.js`, one file per subject (notes, diagrams, questions; correct answer listed first, shuffled in the app). Add a subject by adding a file.
  CI runs the merge before every build.
- Saved data (browser storage): `c150cl.v1` checklist ticks, `c150cl.prefs` display settings, `ppl-study-v2` exam answers (answers from the earlier `ppl-air-law-v1` key are carried across on first run).
- The signing key is in `signing/` so every build installs over the last. Keep the repo private.

Not authoritative: the checklist supplements the POH, and the Training notes are study material, not the CAA question bank. Check regulatory points against current CAA publications.
