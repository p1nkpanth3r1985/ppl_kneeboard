# PPL Kneeboard

Personal Android app for PPL training, sideloaded. Works offline on phone and tablet.

**Get the app:** open the repo's **Releases** on the phone or tablet, download `PPLKneeboard.apk` from the latest build, and open it. Each push to `main` builds a new release; installing it updates the app and keeps your ticks, settings and answers.

## Three sections
- **Checklist** – Cessna 150/152, Pooley's checklist MOD05/18, transcribed verbatim (248 items: 8 normal phases, 9 emergency drills). Tap to tick, "next item" highlight, emergency button from any checklist screen, day / sun / night display, text size. Ticks clear after 6 hours unused.
- **Training** – notes with diagrams for the CAA PPL(A) theory subjects, one subject per paper. Built so far: Air Law (010), Human Performance (040), Meteorology (050), Navigation (060), Principles of Flight (080), Communications (090). Still to add: Aircraft General Knowledge (020), Flight Performance & Planning (030), Operational Procedures (070). Many topics end with a hands-on "Try it" tool: load factor and stall speed, lift and drag against speed, altimeter errors, cloud base, a tap-to-decode METAR reader, the wind triangle, runway crosswind, 1 in 60 corrections, true/magnetic/compass, time and fuel, a phonetic speller, an RT number speaker, cruising levels and an IMSAFE check.
- **Exams** – 420 original practice questions, 70 per subject, with explanations. Four kinds: multiple choice; worked calculations (type your answer, with new numbers every time and step-by-step working); put in order; and match the pairs. For each subject: a 20-question multiple-choice mock paper marked against 75% (like the real paper), practice by topic using every kind of question, and review of missed questions; plus review of misses across all subjects. Answers kept until reset in Settings.

The app always opens on the Checklist. The tabs sit under the header on the three home screens.

## Project notes
- The app is one page, `app/src/main/assets/index.html`, shown full screen in a WebView (`MainActivity.kt`), served from a fixed origin so saved data stays put. Screen stays on while the app is open.
- **Don't edit `assets/index.html` by hand.** It is built by `python3 web/merge.py` from:
  - `web/c150-original.html` – the checklist app as it was. The `NORMAL` and `EMERG` data is never edited by the build.
  - `web/study.css`, `web/study-app.js` (Training and Exams screens and the question types), `web/widgets.js` (the hands-on tools), and `web/subjects/`: `NNN-name.js` holds a subject's notes, diagrams and questions; `NNN+1-name-more.js` adds extra questions and tools to it with `extendTopic()`. Multiple-choice answers list the correct one first and are shuffled in the app.
  CI runs the merge before every build.
- Saved data (browser storage): `c150cl.v1` checklist ticks, `c150cl.prefs` display settings, `ppl-study-v2` exam answers (answers from the earlier `ppl-air-law-v1` key are carried across on first run).
- The signing key is in `signing/` so every build installs over the last. Keep the repo private.

Not authoritative: the checklist supplements the POH, and the Training notes are study material, not the CAA question bank. Check regulatory points against current CAA publications.
