"""Build the app page from the original checklist plus the Training and Exams files.

Every change to the checklist is an exact, single-occurrence replacement, so a
change that no longer matches stops the build instead of silently drifting.
The NORMAL and EMERG data arrays are never edited.

Output: app/src/main/assets/index.html
"""
import pathlib, sys

here = pathlib.Path(__file__).parent
src = (here / "c150-original.html").read_text(encoding="utf-8")
css = (here / "study.css").read_text(encoding="utf-8")
data = "\n\n".join(f.read_text(encoding="utf-8") for f in sorted((here / "subjects").glob("*.js")))
app = (here / "widgets.js").read_text(encoding="utf-8") + "\n" + (here / "study-app.js").read_text(encoding="utf-8")

SVG_DEFS = """<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
  <g id="ac"><path d="M0,-12 C2,-10 2,-4 2,2 L1.5,12 L0,13 L-1.5,12 L-2,2 C-2,-4 -2,-10 0,-12Z M-12,-1 L-2,-3.2 L-2,2 L-12,2Z M12,-1 L2,-3.2 L2,2 L12,2Z M-5,10 L-1.5,8.8 L-1.5,12 L-5,12Z M5,10 L1.5,8.8 L1.5,12 L5,12Z" fill="currentColor"/></g>
  <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10z" style="fill:var(--ink)"/></marker>
  <marker id="arr2" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M10,0 L0,5 L10,10z" style="fill:var(--ink)"/></marker>
</defs></svg>
"""

TABS = ('  <nav id="secTabs" aria-label="Sections">'
        '<button id="tabCl" type="button">Checklist</button>'
        '<button id="tabTr" type="button">Training</button>'
        '<button id="tabEx" type="button">Exams</button></nav>\n')

NAV_JS = r'''$("backBtn").addEventListener("click", () => section === "cl" ? goHome() : Study.back());

// ---------- section tabs (top-level screens only) ----------
function markTabs(){
  [["tabCl","cl"],["tabTr","tr"],["tabEx","ex"]].forEach(([id, s]) => {
    const b = $(id); b.classList.toggle("on", section === s); b.setAttribute("aria-pressed", section === s ? "true" : "false");
  });
}
$("tabCl").addEventListener("click", () => { if(section === "cl") return; try{ history.replaceState({}, ""); }catch(e){} renderHome(); });
$("tabTr").addEventListener("click", () => { if(section === "tr") return; Study.showTraining(); });
$("tabEx").addEventListener("click", () => { if(section === "ex") return; Study.showExams(); });
'''

SETTINGS_JS = r'''  const ga = document.createElement("div"); ga.className = "setgroup";
  ga.innerHTML = `<div class="setlabel">Exam answers</div>`;
  ga.appendChild(armedButton("resetbtn", "Reset exam answers", "Tap again to clear answers", () => {
    Study.reset(); closeSheet();
    if(section === "tr") Study.showTraining();
    if(section === "ex") Study.showExams();
    toast("Exam answers cleared");
  }));
  const gn = document.createElement("div"); gn.className = "setnote";
  gn.textContent = "Exam answers for every subject are kept on this device until you clear them. They are separate from checklist ticks.";
  ga.appendChild(gn);
  wrap.appendChild(ga);

  openSheet("Settings", false, wrap);
'''

edits = [
    ("<title>C150/152 Checklist</title>", "<title>PPL Kneeboard</title>"),
    ("</style>\n</head>", css + "</style>\n</head>"),
    ('<body data-mode="day">\n', '<body data-mode="day">\n' + SVG_DEFS),
    ('  <div class="hprog"><i id="hprogBar"></i></div>\n',
     '  <div class="hprog"><i id="hprogBar"></i></div>\n' + TABS),
    ('  <div id="phaseView" hidden></div>\n',
     '  <div id="phaseView" hidden></div>\n  <div id="studyView" hidden></div>\n'),
    # Study data goes after the untouched checklist data
    ("\n\n// =====================================================================\n// App logic\n",
     "\n\n" + data + "\n\n// =====================================================================\n// App logic\n"),
    ("let currentPhase = null;\n",
     'let currentPhase = null;\nlet section = "cl";            // "cl" checklist, "tr" training notes, "ex" exams\n'),
    ("function renderHome(){\n  currentPhase = null;\n",
     "function renderHome(){\n  currentPhase = null;\n"
     '  section = "cl"; $("studyView").hidden = true; $("emergFab").hidden = false;\n'
     '  hdr.classList.add("top"); hdr.classList.remove("insub"); markTabs();\n'),
    ("  home.hidden = true; phaseView.hidden = false;\n",
     "  home.hidden = true; phaseView.hidden = false;\n"
     '  section = "cl"; $("studyView").hidden = true; $("emergFab").hidden = false;\n'
     '  hdr.classList.remove("top", "insub");\n'),
    ("  closeSheet();\n  const ph = e.state && e.state.ph && byId(e.state.ph);\n",
     "  closeSheet();\n  if(e.state && e.state.st){ Study.fromState(e.state); return; }\n"
     "  const ph = e.state && e.state.ph && byId(e.state.ph);\n"),
    ('$("backBtn").addEventListener("click", goHome);\n', NAV_JS),
    ('  openSheet("Settings", false, wrap);\n', SETTINGS_JS),
    ("// ---------- boot ----------\n", app + "\n// ---------- boot ----------\n"),
]

out = src
for old, new in edits:
    n = out.count(old)
    if n != 1:
        sys.exit(f"anchor found {n} times, expected 1:\n{old[:120]!r}")
    out = out.replace(old, new)

dest = here.parent / "app/src/main/assets/index.html"
dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_text(out, encoding="utf-8")
print(dest, len(out.encode()), "bytes")
