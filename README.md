# PPL Kneeboard

Personal Android app for PPL training, sideloaded. Works offline on phone and tablet.

**Get the app:** open the repo's **Releases** on the phone or tablet, download `PPLKneeboard.apk` from the latest build, and open it. Each push to `main` builds a new release; installing it updates the app and keeps your ticks, settings and answers.

## Four sections
- **Checklist** – Cessna 150/152, Pooley's checklist MOD05/18, transcribed verbatim (248 items: 8 normal phases, 9 emergency drills). Tap to tick, "next item" highlight, emergency button from any checklist screen, day / sun / night display, text size. Ticks clear after 6 hours unused.
- **Training** – notes with diagrams for the CAA PPL(A) theory subjects, one subject per paper. Built so far: Air Law (010), Human Performance (040), Meteorology (050), Navigation (060), Principles of Flight (080), Communications (090). Still to add: Aircraft General Knowledge (020), Flight Performance & Planning (030), Operational Procedures (070). Many topics end with a hands-on "Try it" tool: load factor and stall speed, lift and drag against speed, altimeter errors, cloud base, a tap-to-decode METAR reader, the wind triangle, runway crosswind, 1 in 60 corrections, true/magnetic/compass, time and fuel, a phonetic speller, an RT number speaker, cruising levels and an IMSAFE check.
- **Exams** – 420 original practice questions, 70 per subject, with explanations. Four kinds: multiple choice; worked calculations (type your answer, with new numbers every time and step-by-step working); put in order; and match the pairs. For each subject: a 20-question multiple-choice mock paper marked against 75% (like the real paper), practice by topic using every kind of question, and review of missed questions; plus review of misses across all subjects. Answers kept until reset in Settings.

- **Logbook** – log each flight with the same details as a paper logbook (date, aircraft, PIC, capacity, route, times in UTC, landings, cross-country), tick the exercises flown, and add a debrief (what went well, what to work on, instructor's comments). Shows totals, progress towards the PPL(A) minimums as published by the CAA (40 h flight instruction or 35 h on an ATO course, 10 h supervised solo including 5 h solo cross-country, a 150 nm qualifying cross-country), and hours by month. Every exercise from Ex 1a to Ex 19, plus the qualifying cross-country, revision and test flights, has a lesson card with main points, things to watch for, tap-to-flip flashcards, links to the related Training notes and checklist pages, and your own debrief notes from every flight that included it.
- **Backup** – Settings › Backup and restore (or Logbook › Backup and import) saves the logbook, exam answers and settings to a file through the Android file picker, and restores them. The same screen imports a typed-up logbook file (`{"app":"PPL Kneeboard","kind":"logbook","flights":[...]}`); flights already present are skipped.

The app always opens on the Checklist. The tabs sit under the header on the four home screens.

## Project notes
- The app is one page, `app/src/main/assets/index.html`, shown full screen in a WebView (`MainActivity.kt`), served from a fixed origin so saved data stays put. Screen stays on while the app is open. `AndroidBridge` gives the page the system file picker for backup and import.
- **Don't edit `assets/index.html` by hand.** It is built by `python3 web/merge.py` from:
  - `web/c150-original.html` – the checklist app as it was. The `NORMAL` and `EMERG` data is never edited by the build.
  - `web/lessons.js` and `web/flashcards.js` (lesson cards for each flight exercise), `web/logbook.js` (Logbook and backup).
  - `web/study.css`, `web/study-app.js` (Training and Exams screens and the question types), `web/widgets.js` (the hands-on tools), and `web/subjects/`: `NNN-name.js` holds a subject's notes, diagrams and questions; `NNN+1-name-more.js` adds extra questions and tools to it with `extendTopic()`. Multiple-choice answers list the correct one first and are shuffled in the app.
  CI runs the merge before every build.
- Saved data (browser storage): `c150cl.v1` checklist ticks, `c150cl.prefs` display settings, `ppl-study-v2` exam answers (answers from the earlier `ppl-air-law-v1` key are carried across on first run), `ppl-log-v1` logbook.
- The signing key is in `signing/` so every build installs over the last. Keep the repo private.

Not authoritative: the checklist supplements the POH, and the Training notes are study material, not the CAA question bank. Check regulatory points against current CAA publications.
