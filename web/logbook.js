
// =====================================================================
// Logbook: flights, totals against the PPL minimums, lesson cards with
// flashcards for each exercise, and backup / restore of all app data.
// Renders into the same #studyView container as Training and Exams.
// =====================================================================
const Logbook = (() => {
  const LKEY = "ppl-log-v1";
  const BACKUP_KEYS = ["c150cl.prefs", "ppl-study-v2", LKEY];
  const view = $("studyView");
  let log = { v:1, flights:[] };
  let pendingImport = null;

  // Current UK PPL(A) minimums as published by the CAA (check with your school)
  const REQS = [
    { k:"total", label:"Flight instruction", need:40*60, note:"40 h, or 35 h on an approved ATO course" },
    { k:"solo", label:"Supervised solo", need:10*60, note:"10 h" },
    { k:"soloxc", label:"Solo cross-country", need:5*60, note:"at least 5 h of the solo time" },
    { k:"qxc", label:"Qualifying cross-country", need:1, note:"150 nm, full-stop landings at 2 other aerodromes" }
  ];

  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const hm = m => `${Math.floor(m/60)}:${String(Math.round(m%60)).padStart(2, "0")}`;
  const lessonById = id => LESSONS.find(l => l.id === id);
  const today = () => new Date().toISOString().slice(0, 10);
  const fmtDate = d => { try{ return new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" }); }catch(e){ return d; } };
  const newId = () => "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  function el(tag, cls, html){ const e = document.createElement(tag); if(cls) e.className = cls; if(html != null) e.innerHTML = html; return e; }
  function btn(cls, html, fn, attrs){ const b = el("button", cls, html); b.type = "button"; if(attrs) Object.entries(attrs).forEach(([k,v]) => b.setAttribute(k, v)); b.addEventListener("click", fn); return b; }
  const push = st => { try{ history.pushState(st, ""); }catch(e){} };
  const replace = st => { try{ history.replaceState(st, ""); }catch(e){} };
  function title(main, small){ hdrTitle.innerHTML = `${esc(main)}<small>${esc(small)}</small>`; }
  function enter(kind){
    section = "lg";
    home.hidden = true; phaseView.hidden = true; view.hidden = false;
    currentPhase = null;
    $("emergFab").hidden = true;
    hdr.classList.toggle("top", kind === "top");
    hdr.classList.toggle("insub", kind === "sub");
    hdr.classList.remove("inphase");
    markTabs();
    window.scrollTo(0, 0);
  }

  // ---------- storage ----------
  function load(){ try{ const s = JSON.parse(localStorage.getItem(LKEY) || "null"); if(s && Array.isArray(s.flights)) log = s; }catch(e){} }
  function save(){ try{ localStorage.setItem(LKEY, JSON.stringify(log)); }catch(e){} }
  const sorted = () => log.flights.slice().sort((a,b) => (b.date + (b.dep || "")).localeCompare(a.date + (a.dep || "")));
  function clean(f){
    const s = v => typeof v === "string" ? v.slice(0, 2000) : "";
    return {
      id: s(f.id) || newId(), date: /^\d{4}-\d{2}-\d{2}$/.test(f.date) ? f.date : today(),
      type: s(f.type), reg: s(f.reg).toUpperCase(), pic: s(f.pic),
      cap: ["Dual", "Solo", "PIC"].includes(f.cap) ? f.cap : "Dual",
      from: s(f.from), to: s(f.to), dep: s(f.dep), arr: s(f.arr),
      mins: Math.max(0, Math.min(24*60, Math.round(+f.mins || 0))), ldg: Math.max(0, Math.min(99, Math.round(+f.ldg || 0))),
      xc: !!f.xc, qxc: !!f.qxc, ex: Array.isArray(f.ex) ? f.ex.filter(x => lessonById(x)) : [],
      remarks: s(f.remarks), well: s(f.well), work: s(f.work), instr: s(f.instr)
    };
  }

  // ---------- totals ----------
  function totals(){
    const t = { total:0, dual:0, solo:0, soloxc:0, pic:0, ldg:0, qxc:0, n:log.flights.length };
    log.flights.forEach(f => {
      t.total += f.mins; t.ldg += f.ldg;
      if(f.cap === "Dual") t.dual += f.mins;
      if(f.cap === "Solo"){ t.solo += f.mins; if(f.xc) t.soloxc += f.mins; if(f.qxc) t.qxc = 1; }
      if(f.cap === "PIC") t.pic += f.mins;
    });
    return t;
  }
  function exCounts(){ const c = {}; log.flights.forEach(f => f.ex.forEach(x => c[x] = (c[x] || 0) + 1)); return c; }

  // ---------- home ----------
  function renderHome(){
    enter("top");
    const t = totals();
    title("Logbook", t.n ? `${t.n} flight${t.n === 1 ? "" : "s"} · ${hm(t.total)} total` : "Your flights and lesson cards");
    view.innerHTML = "";
    const w = el("div", "topic");
    w.appendChild(btn("cont", `<span class="ct"><span class="k">New entry</span><div class="n">Log a flight</div><div class="x">Times, exercises flown and your debrief</div></span><span class="arrow">+</span>`, () => { push({ lg:"form" }); renderForm(null); }));
    if(!t.n){
      w.appendChild(el("div", "card empty", `<h3>No flights logged yet</h3><p>Log each lesson as you fly it, or bring your existing paper logbook in with <b>Backup and import</b>. Every exercise has a lesson card with the main points and flashcards, so you can start with those now.</p>`));
    } else {
      w.appendChild(el("div", "wout lgtiles", [
        ["Total", hm(t.total), true], ["Dual", hm(t.dual)], ["Solo", hm(t.solo)], ["Solo XC", hm(t.soloxc)], ["Landings", String(t.ldg)], ["Flights", String(t.n)]
      ].map(([k,v,hl]) => `<div class="o${hl ? " hl" : ""}"><span class="k">${k}</span><span class="v">${v}</span></div>`).join("")));
      // PPL minimums
      w.appendChild(journey(t));
      w.appendChild(el("div", "grid-label", "Towards the PPL minimums"));
      const rq = el("div", "reqs");
      REQS.forEach(r => {
        const have = t[r.k], pct = Math.min(100, Math.round(100 * have / r.need)), done = have >= r.need;
        rq.appendChild(el("div", "req" + (done ? " done" : ""),
          ring(pct, 64, 8, done ? "✓" : `${pct}%`) +
          `<b class="rb">${r.k === "qxc" ? (done ? "Flown" : "Not yet") : `${hm(have)} / ${hm(r.need)}`}</b><span class="rl">${r.label}</span>`));
      });
      w.appendChild(rq);
      w.appendChild(el("div", "fine", "Flight instruction: " + REQS[0].note + ". Solo cross-country: " + REQS[2].note + ". Qualifying cross-country: " + REQS[3].note + ". Minimums as published by the CAA for the PPL(A); your school's records are the official ones."));
      // hours by month
      w.appendChild(el("div", "grid-label", "Hours by month"));
      w.appendChild(monthChart());
    }
    // exercises
    w.appendChild(el("div", "grid-label", "Lesson cards"));
    const counts = exCounts(), xg = el("div", "xgrid");
    LESSONS.forEach(l => xg.appendChild(btn("xcard" + (counts[l.id] ? " flown" : ""),
      `<span class="xn">${esc(l.id)}</span><span class="xt">${esc(l.title)}</span><span class="xc">${counts[l.id] ? `Flown ×${counts[l.id]}` : `${(FLASH[l.id] || []).length} card${(FLASH[l.id] || []).length === 1 ? "" : "s"}`}</span>`,
      () => { push({ lg:"lesson", ex:l.id }); renderLesson(l); })));
    w.appendChild(xg);
    // flights
    if(t.n){
      w.appendChild(el("div", "grid-label", "Flights"));
      const list = el("div", "flist");
      sorted().forEach(f => list.appendChild(flightCard(f)));
      w.appendChild(list);
    }
    w.appendChild(btn("bigbtn ghost", "Backup and import", () => { push({ lg:"backup" }); renderBackup(); }));
    view.appendChild(w);
  }
  // progress dial: pct 0-100, size in px, stroke width, label in the middle
  function ring(pct, size, sw, label){
    const r = (size - sw) / 2, c = size / 2;
    return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">`+
      `<circle class="rt" cx="${c}" cy="${c}" r="${r}" stroke-width="${sw}"/>`+
      (pct > 0 ? `<circle class="rv" cx="${c}" cy="${c}" r="${r}" stroke-width="${sw}" pathLength="100" stroke-dasharray="${Math.max(1, pct)} 100"/>` : "")+
      `<text x="${c}" y="${c + size * 0.07}" text-anchor="middle" font-size="${Math.round(size * 0.22)}">${label}</text></svg>`;
  }
  // "road to your PPL": first lesson to skills test, plane at the share of instruction hours flown
  function journey(t){
    const need = REQS[0].need, f = Math.min(1, t.total / need);
    const P0 = [8, 34], P1 = [150, -6], P2 = [292, 34];
    const at = u => [0, 1].map(i => (1-u)*(1-u)*P0[i] + 2*(1-u)*u*P1[i] + u*u*P2[i]);
    const [x, y] = at(f), [x2, y2] = at(Math.min(1, f + 0.01));
    const ang = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI;
    let done = "M8 34"; for(let i = 1; i <= 24; i++){ const p = at(f * i / 24); done += ` L${p[0].toFixed(1)} ${p[1].toFixed(1)}`; }
    const last = sorted()[0], ex = last && last.ex.length ? "Ex " + last.ex[last.ex.length - 1] : hm(t.total);
    const left = Math.max(0, need - t.total);
    const d = el("div", "journey");
    d.innerHTML = `<div class="jk">Road to your PPL</div>`+
      `<div class="jh">${left ? `${hm(left)} of instruction to go` : "Instruction hours done"}</div>`+
      `<svg viewBox="0 0 300 46" aria-hidden="true"><path d="M8 34 Q150 -6 292 34" stroke="rgba(255,255,255,.4)" stroke-width="3.5" fill="none" stroke-dasharray="1 8" stroke-linecap="round"/>`+
      `<path d="${done}" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>`+
      `<circle cx="8" cy="34" r="5" fill="#fff"/><circle cx="292" cy="34" r="5" fill="none" stroke="#fff" stroke-width="3"/>`+
      `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(ang + 90).toFixed(0)}) scale(1.05)" style="color:#fff"><use href="#ac"/></g></svg>`+
      `<div class="jl"><span>First lesson</span><span>Latest: ${esc(ex)}</span><span>Skills test</span></div>`;
    return d;
  }
  function flightCard(f){
    return btn("fcard",
      `<span class="fdate">${esc(fmtDate(f.date))}</span>`+
      `<span class="fmain"><b>${esc(f.from || "—")}${f.to && f.to !== f.from ? " → " + esc(f.to) : ""}</b><span>${esc(f.reg)} ${esc(f.type)}</span></span>`+
      `<span class="fside"><span class="fpill ${f.cap.toLowerCase()}">${f.cap}</span><b>${hm(f.mins)}</b></span>`+
      (f.ex.length ? `<span class="fex">${f.ex.map(x => `<i>Ex ${esc(x)}</i>`).join("")}</span>` : ""),
      () => { push({ lg:"flight", id:f.id }); renderFlight(f); });
  }
  function monthChart(){
    const now = new Date(), months = [];
    for(let i = 11; i >= 0; i--){ const d = new Date(now.getFullYear(), now.getMonth() - i, 1); months.push({ key:d.toISOString().slice(0, 7), lab:d.toLocaleDateString("en-GB", { month:"narrow" }), m:0 }); }
    log.flights.forEach(f => { const mo = months.find(x => x.key === f.date.slice(0, 7)); if(mo) mo.m += f.mins; });
    const max = Math.max(60, ...months.map(x => x.m)), W = 340, bw = 22, gap = (W - 30 - 12 * bw) / 11;
    const svg = `<svg viewBox="0 0 ${W} 150" role="img" aria-label="Hours flown each month for the last 12 months">
      <rect class="fb" x="1" y="1" width="${W-2}" height="148" rx="6"/>
      ${months.map((x, i) => { const h = Math.round(x.m / max * 96), X = 15 + i * (bw + gap);
        return `<rect x="${X.toFixed(1)}" y="${118 - h}" width="${bw}" height="${h}" rx="3" class="${i === 11 ? "f-mag" : "f-tint"} ln" style="stroke-width:${h ? 1 : 0}"/>`+
          (x.m ? `<text class="tm" x="${(X + bw/2).toFixed(1)}" y="${112 - h}" text-anchor="middle">${(x.m/60).toFixed(1)}</text>` : "")+
          `<text class="tm" x="${(X + bw/2).toFixed(1)}" y="136" text-anchor="middle">${x.lab}</text>`; }).join("")}
    </svg>`;
    return el("div", "fig wsvg", svg);
  }

  // ---------- one flight ----------
  function renderFlight(f){
    enter("sub");
    title(fmtDate(f.date), `${f.reg} · ${f.cap} · ${hm(f.mins)}`);
    view.innerHTML = "";
    const w = el("div", "topic");
    w.appendChild(el("div", "card", `<div class="fdet">`+
      [["Aircraft", `${f.reg} ${f.type}`], ["Pilot in command", f.pic], ["Capacity", f.cap], ["From", f.from], ["To", f.to],
       ["Departure", f.dep], ["Arrival", f.arr], ["Flight time", hm(f.mins)], ["Landings", f.ldg],
       ["Cross-country", f.xc ? (f.qxc ? "Yes, qualifying" : "Yes") : "No"]]
        .filter(r => r[1] !== "" && r[1] != null).map(([k,v]) => `<div><span>${k}</span><b>${esc(v)}</b></div>`).join("") + `</div>` +
      (f.remarks ? `<p class="frem">${esc(f.remarks)}</p>` : "")));
    if(f.ex.length){
      w.appendChild(el("div", "grid-label", "Lesson cards for this flight"));
      f.ex.forEach(x => { const l = lessonById(x);
        w.appendChild(btn("lcard", `<span class="xn">Ex ${esc(l.id)}</span><b>${esc(l.title)}</b><ul>${l.points.slice(0, 3).map(p => `<li>${esc(p)}</li>`).join("")}</ul><span class="more">Open the card and flashcards ›</span>`,
          () => { push({ lg:"lesson", ex:l.id }); renderLesson(l); })); });
    }
    // debrief: saved as you type
    w.appendChild(el("div", "grid-label", "Your debrief"));
    const deb = el("div", "card debrief");
    [["well", "What went well"], ["work", "What to work on"], ["instr", "Instructor's comments"]].forEach(([k, lab]) => {
      const id = `deb-${k}`;
      const box = el("div", "dfield", `<label for="${id}">${lab}</label>`);
      const ta = document.createElement("textarea"); ta.id = id; ta.rows = 3; ta.value = f[k] || ""; ta.className = "wtext";
      let t = null;
      ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { f[k] = ta.value; save(); }, 400); });
      ta.addEventListener("blur", () => { f[k] = ta.value; save(); });
      box.appendChild(ta); deb.appendChild(box);
    });
    deb.appendChild(el("div", "fine", "Saved as you type."));
    w.appendChild(deb);
    const row = el("div", "row2");
    row.appendChild(btn("bigbtn", "Edit flight", () => { push({ lg:"form", id:f.id }); renderForm(f); }));
    row.appendChild(armedButton("resetbtn", "Delete flight", "Tap again to delete", () => {
      log.flights = log.flights.filter(x => x.id !== f.id); save(); toast("Flight deleted"); back();
    }));
    w.appendChild(row);
    view.appendChild(w);
  }

  // ---------- lesson card ----------
  function renderLesson(l){
    enter("sub");
    title(`Ex ${l.id} · ${l.title}`, "Lesson card");
    view.innerHTML = "";
    const w = el("div", "topic");
    w.appendChild(el("div", "card", `<div class="learn">`+
      `<h3>Main points</h3><ul>${l.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`+
      (l.watch.length ? `<div class="box trap"><b>Watch for</b>${l.watch.map(esc).join(" ")}</div>` : "")+
      `<p class="fine">General study notes. Your school's briefing, your instructor and the POH come first.</p></div>`));
    const cards = FLASH[l.id] || [];
    if(cards.length){
      w.appendChild(el("div", "grid-label", `Flashcards · ${cards.length}`));
      w.appendChild(flashDeck(cards));
    }
    const links = el("div", "links");
    l.topics.forEach(([sid, tid]) => {
      const s = SUBJECTS.find(x => x.id === sid), t = s && s.topics.find(x => x.id === tid);
      if(t) links.appendChild(btn("chip", `<span class="cn">${esc(s.code)}</span><span>${esc(t.title)}</span>`, () => Study.openTopic(sid, tid)));
    });
    l.checks.forEach(id => { const ph = byId(id);
      if(ph) links.appendChild(btn("chip" + (ph.emerg ? " emerg" : ""), `<span class="cn">✓</span><span>${esc(ph.title)}</span>`, () => openPhase(ph))); });
    if(links.children.length){ w.appendChild(el("div", "grid-label", "Read up and check")); w.appendChild(links); }
    // flights with this exercise, and what you noted
    const mine = sorted().filter(f => f.ex.includes(l.id));
    if(mine.length){
      w.appendChild(el("div", "grid-label", `Your flights · ${mine.length}`));
      const notes = mine.filter(f => f.well || f.work || f.instr);
      if(notes.length) w.appendChild(el("div", "card notes", notes.map(f =>
        `<div class="note1"><span class="fdate">${esc(fmtDate(f.date))}</span>`+
        (f.work ? `<p><b>Work on:</b> ${esc(f.work)}</p>` : "") + (f.well ? `<p><b>Went well:</b> ${esc(f.well)}</p>` : "") + (f.instr ? `<p><b>Instructor:</b> ${esc(f.instr)}</p>` : "") + `</div>`).join("")));
      const list = el("div", "flist"); mine.forEach(f => list.appendChild(flightCard(f))); w.appendChild(list);
    }
    view.appendChild(w);
  }
  function flashDeck(cards){
    const order = cards.map((c, i) => i);
    let i = 0, flipped = false;
    const box = el("div", "deck");
    function draw(){
      const [front, backText] = cards[order[i]];
      box.innerHTML = "";
      const card = btn("flash" + (flipped ? " flipped" : ""), `<span class="fside1">${flipped ? "Answer" : "Question"} · ${i + 1} of ${cards.length}</span><span class="ftext">${esc(flipped ? backText : front)}</span><span class="fhint">${flipped ? "Tap to see the question" : "Tap to reveal"}</span>`,
        () => { flipped = !flipped; draw(); }, { "aria-live":"polite" });
      box.appendChild(card);
      const nav = el("div", "deckbar");
      nav.appendChild(btn("seg1", "‹ Prev", () => { i = (i - 1 + cards.length) % cards.length; flipped = false; draw(); }));
      nav.appendChild(btn("seg1", "Shuffle", () => { for(let k = order.length - 1; k > 0; k--){ const j = Math.floor(Math.random() * (k + 1)); [order[k], order[j]] = [order[j], order[k]]; } i = 0; flipped = false; draw(); }));
      nav.appendChild(btn("seg1", "Next ›", () => { i = (i + 1) % cards.length; flipped = false; draw(); }));
      box.appendChild(nav);
    }
    draw();
    return box;
  }

  // ---------- add or edit a flight ----------
  function recent(field){ const seen = []; sorted().forEach(f => { const v = f[field]; if(v && !seen.includes(v)) seen.push(v); }); return seen.slice(0, 4); }
  function renderForm(f){
    enter("sub");
    const editing = !!f;
    const d = editing ? Object.assign({}, f) : { date:today(), type:(recent("type")[0] || "C150"), reg:(recent("reg")[0] || ""), pic:(recent("pic")[0] || ""), cap:"Dual",
      from:(recent("from")[0] || ""), to:"", dep:"", arr:"", mins:60, ldg:1, xc:false, qxc:false, ex:[], remarks:"", well:"", work:"", instr:"" };
    title(editing ? "Edit flight" : "Log a flight", "Times in UTC, as in your logbook");
    view.innerHTML = "";
    const w = el("div", "topic");
    const form = el("form", "card lform"); form.noValidate = true;
    const field = (id, label, input) => { const b = el("div", "dfield", `<label for="${id}">${label}</label>`); b.appendChild(input); return b; };
    const text = (id, value, attrs) => { const i = document.createElement("input"); i.id = id; i.className = "wtext"; i.value = value == null ? "" : value; Object.entries(attrs || {}).forEach(([k,v]) => i.setAttribute(k, v)); return i; };
    const quick = (input, values) => { if(!values.length) return null; const r = el("div", "quick"); values.forEach(v => r.appendChild(btn("qchip", esc(v), () => { input.value = v; input.dispatchEvent(new Event("input")); }))); return r; };

    const fDate = text("lf-date", d.date, { type:"date" });
    const fReg = text("lf-reg", d.reg, { autocapitalize:"characters", placeholder:"G-ABCD" });
    const fType = text("lf-type", d.type, { placeholder:"C150" });
    const fPic = text("lf-pic", d.pic, { placeholder:"Instructor's name, or SELF" });
    const fFrom = text("lf-from", d.from, { placeholder:"Eshott" });
    const fTo = text("lf-to", d.to, { placeholder:"Same as departure if local" });
    const fDep = text("lf-dep", d.dep, { type:"time" });
    const fArr = text("lf-arr", d.arr, { type:"time" });
    const fTime = text("lf-time", hm(d.mins), { inputmode:"numeric", placeholder:"1:05" });
    const fLdg = text("lf-ldg", d.ldg, { inputmode:"numeric" });
    const fRem = document.createElement("textarea"); fRem.id = "lf-rem"; fRem.className = "wtext"; fRem.rows = 2; fRem.value = d.remarks;

    const g1 = el("div", "fgrid");
    g1.append(field("lf-date", "Date", fDate), field("lf-reg", "Registration", fReg));
    const q1 = quick(fReg, recent("reg")); if(q1) g1.lastChild.appendChild(q1);
    g1.append(field("lf-type", "Type", fType));
    const q2 = quick(fType, [...new Set([...recent("type"), "C150", "C152"])].slice(0, 4)); g1.lastChild.appendChild(q2);
    g1.append(field("lf-pic", "Pilot in command", fPic));
    const q3 = quick(fPic, [...new Set([...recent("pic"), "SELF"])].slice(0, 4)); g1.lastChild.appendChild(q3);
    form.appendChild(g1);

    form.appendChild(el("div", "zlabel", "Your capacity"));
    const cap = W.seg([["Dual", "Dual (P/UT)"], ["Solo", "Solo (supervised)"], ["PIC", "PIC (licensed)"]], d.cap, v => { d.cap = v; if(v !== "Dual" && !fPic.value) fPic.value = "SELF"; });
    form.appendChild(cap.el);

    const g2 = el("div", "fgrid");
    g2.append(field("lf-from", "From", fFrom), field("lf-to", "To", fTo), field("lf-dep", "Take-off (UTC)", fDep), field("lf-arr", "Landing (UTC)", fArr), field("lf-time", "Flight time (h:mm)", fTime), field("lf-ldg", "Landings", fLdg));
    const q4 = quick(fFrom, recent("from")); if(q4) g2.children[0].appendChild(q4);
    form.appendChild(g2);
    const syncTime = () => {
      if(!fDep.value || !fArr.value) return;
      const [a, b] = [fDep.value, fArr.value].map(v => { const [h, m] = v.split(":").map(Number); return h * 60 + m; });
      let mins = b - a; if(mins < 0) mins += 24 * 60;
      fTime.value = hm(mins);
    };
    fDep.addEventListener("change", syncTime); fArr.addEventListener("change", syncTime);

    const xcRow = el("div", "toggles");
    const tog = (label, key) => { const b = btn("qchip tog" + (d[key] ? " on" : ""), label, () => { d[key] = !d[key]; b.classList.toggle("on", d[key]); if(key === "qxc" && d.qxc && !d.xc){ d.xc = true; xcBtn.classList.add("on"); } }); return b; };
    const xcBtn = tog("Cross-country", "xc"); xcRow.append(xcBtn, tog("Qualifying solo cross-country", "qxc"));
    form.appendChild(el("div", "zlabel", "Flight"));
    form.appendChild(xcRow);

    form.appendChild(el("div", "zlabel", "Exercises flown · tap all that apply"));
    const exg = el("div", "exgrid");
    LESSONS.forEach(l => { const b = btn("qchip ex" + (d.ex.includes(l.id) ? " on" : ""), `<b>${esc(l.id)}</b> ${esc(l.title)}`, () => {
      d.ex = d.ex.includes(l.id) ? d.ex.filter(x => x !== l.id) : [...d.ex, l.id]; b.classList.toggle("on", d.ex.includes(l.id)); }); exg.appendChild(b); });
    form.appendChild(exg);
    form.appendChild(field("lf-rem", "Remarks (as in your logbook)", fRem));
    const msg = el("div", "calcmsg");
    form.appendChild(msg);
    form.appendChild(btn("bigbtn", editing ? "Save changes" : "Save flight", () => form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit"))));
    form.addEventListener("submit", e => {
      e.preventDefault();
      const tm = fTime.value.trim(); let mins = NaN;
      if(/^\d{1,2}:\d{2}$/.test(tm)){ const [h, m] = tm.split(":").map(Number); mins = h * 60 + m; }
      else if(/^\d+(\.\d+)?$/.test(tm)) mins = Math.round(parseFloat(tm) * 60);
      if(!fDate.value){ msg.textContent = "Add the date."; return; }
      if(!fReg.value.trim()){ msg.textContent = "Add the aircraft registration."; return; }
      if(!(mins > 0)){ msg.textContent = "Add the flight time, for example 1:05."; return; }
      const rec = clean(Object.assign(d, { date:fDate.value, reg:fReg.value.trim(), type:fType.value.trim(), pic:fPic.value.trim(),
        from:fFrom.value.trim(), to:fTo.value.trim() || fFrom.value.trim(), dep:fDep.value, arr:fArr.value, mins, ldg:parseInt(fLdg.value, 10) || 0, remarks:fRem.value.trim() }));
      if(editing){ const k = log.flights.findIndex(x => x.id === f.id); log.flights[k] = Object.assign(rec, { id:f.id }); }
      else log.flights.push(rec);
      save(); buzz(); toast(editing ? "Flight updated" : "Flight saved");
      // Editing returns to the flight page underneath; a new flight replaces the form with its page
      if(editing && history.state && history.state.lg === "form"){ try{ history.back(); return; }catch(e){} }
      replace({ lg:"flight", id:rec.id }); renderFlight(log.flights.find(x => x.id === rec.id));
    });
    w.appendChild(form);
    view.appendChild(w);
  }

  // ---------- backup and import ----------
  function exportText(){
    const storage = {};
    BACKUP_KEYS.forEach(k => { try{ const v = localStorage.getItem(k); if(v != null) storage[k] = v; }catch(e){} });
    return JSON.stringify({ app:"PPL Kneeboard", kind:"backup", v:1, exported:new Date().toISOString(), storage }, null, 1);
  }
  function exportAll(){
    const name = `ppl-kneeboard-backup-${today()}.json`, text = exportText();
    if(window.AndroidBridge && AndroidBridge.exportFile){ AndroidBridge.exportFile(name, text); return true; }
    return false;
  }
  function pickImport(){
    if(window.AndroidBridge && AndroidBridge.importFile){ AndroidBridge.importFile(); return true; }
    return false;
  }
  // Called with the text of a chosen file (from Android) or pasted text (elsewhere)
  function handleImport(text){
    let data = null;
    try{ data = JSON.parse(text); }catch(e){}
    if(!data || data.app !== "PPL Kneeboard"){ pendingImport = { error:"That file isn't a PPL Kneeboard backup or logbook file." }; }
    else {
      let flights = [];
      if(data.kind === "logbook" && Array.isArray(data.flights)) flights = data.flights;
      if(data.kind === "backup" && data.storage && data.storage[LKEY]){ try{ flights = JSON.parse(data.storage[LKEY]).flights || []; }catch(e){} }
      flights = flights.map(clean);
      const exists = f => log.flights.some(x => x.id === f.id || (x.date === f.date && x.reg === f.reg && x.mins === f.mins && x.from === f.from && x.dep === f.dep));
      const fresh = flights.filter(f => !exists(f));
      let answers = 0;
      if(data.kind === "backup" && data.storage && data.storage["ppl-study-v2"]){ try{ answers = Object.keys(JSON.parse(data.storage["ppl-study-v2"]).ans || {}).length; }catch(e){} }
      pendingImport = { data, fresh, dupes:flights.length - fresh.length, answers };
    }
    if(!(history.state && history.state.lg === "backup")) push({ lg:"backup" });
    renderBackup();
  }
  function applyImport(){
    const p = pendingImport; if(!p || p.error) return;
    log.flights.push(...p.fresh); save();
    if(p.data.kind === "backup"){
      ["c150cl.prefs", "ppl-study-v2"].forEach(k => { if(p.data.storage[k] != null){ try{ localStorage.setItem(k, p.data.storage[k]); }catch(e){} } });
      pendingImport = null;
      toast("Backup restored");
      setTimeout(() => location.reload(), 600);   // settings and answers load at start-up
      return;
    }
    pendingImport = null; toast(`${p.fresh.length} flight${p.fresh.length === 1 ? "" : "s"} imported`); renderBackup();
  }
  function renderBackup(){
    enter("sub");
    title("Backup and import", "Keep your progress safe");
    view.innerHTML = "";
    const w = el("div", "topic");
    const p = pendingImport;
    if(p){
      const c = el("div", "card confirm");
      if(p.error){ c.innerHTML = `<h3>Can't import that file</h3><p>${esc(p.error)}</p>`; c.appendChild(btn("bigbtn ghost", "OK", () => { pendingImport = null; renderBackup(); })); }
      else {
        const what = p.data.kind === "backup"
          ? `A full backup from ${esc(fmtDate((p.data.exported || "").slice(0, 10)))}: ${p.fresh.length} new flight${p.fresh.length === 1 ? "" : "s"}${p.dupes ? ` (${p.dupes} already here)` : ""}, ${p.answers} exam answers and your display settings. Exam answers and settings on this device will be replaced; flights are added, never removed.`
          : `${p.fresh.length} new flight${p.fresh.length === 1 ? "" : "s"} to add${p.dupes ? `, ${p.dupes} already in your logbook and skipped` : ""}.`;
        c.innerHTML = `<h3>Ready to import</h3><p>${what}</p>`;
        const row = el("div", "row2");
        row.appendChild(btn("bigbtn", p.data.kind === "backup" ? "Restore backup" : "Add flights", applyImport, (p.fresh.length || p.data.kind === "backup") ? null : { disabled:"" }));
        row.appendChild(btn("bigbtn ghost", "Cancel", () => { pendingImport = null; renderBackup(); }));
        c.appendChild(row);
      }
      w.appendChild(c);
    }
    const t = totals();
    w.appendChild(el("div", "card", `<div class="learn"><h3>Back up everything</h3><p>Saves your logbook (${t.n} flight${t.n === 1 ? "" : "s"}), exam answers and display settings to one file. Keep it somewhere safe, such as Google Drive. Do this before uninstalling the app or changing phone.</p></div>`));
    const native = !!(window.AndroidBridge && AndroidBridge.exportFile);
    w.appendChild(btn("bigbtn", "Save a backup file", () => { if(!exportAll()) showText(); }));
    w.appendChild(el("div", "card", `<div class="learn"><h3>Restore or import</h3><p>Choose a backup file to restore, or a logbook file (for example your paper logbook typed up for you) to add its flights. Flights already in your logbook are skipped.</p></div>`));
    w.appendChild(btn("bigbtn ghost", "Choose a file to import", () => { if(!pickImport()) showPaste(); }));
    const extra = el("div", "");
    w.appendChild(extra);
    function showText(){
      extra.innerHTML = "";
      const ta = document.createElement("textarea"); ta.className = "wtext"; ta.rows = 6; ta.readOnly = true; ta.value = exportText(); ta.id = "bk-out";
      extra.append(el("div", "zlabel", "Copy this text and keep it safe"), ta, btn("bigbtn ghost", "Copy", () => {
        try{ navigator.clipboard.writeText(ta.value).then(() => toast("Copied"), () => { ta.select(); }); }catch(e){ ta.select(); } }));
    }
    function showPaste(){
      extra.innerHTML = "";
      const ta = document.createElement("textarea"); ta.className = "wtext"; ta.rows = 6; ta.id = "bk-in"; ta.placeholder = "Paste backup or logbook text here";
      extra.append(el("div", "zlabel", "Paste the file's text"), ta, btn("bigbtn", "Import pasted text", () => handleImport(ta.value)));
    }
    if(!native) w.appendChild(el("div", "fine", "In the Android app these buttons save and open files. In a browser they show text to copy or paste."));
    view.appendChild(w);
  }

  // ---------- navigation ----------
  function back(){
    const s = history.state && history.state.lg;
    if(s && s !== "home"){ try{ history.back(); return; }catch(e){} }
    renderHome();
  }
  function fromState(st){
    if(st.lg === "flight"){ const f = log.flights.find(x => x.id === st.id); if(f) return renderFlight(f); }
    if(st.lg === "lesson"){ const l = lessonById(st.ex); if(l) return renderLesson(l); }
    if(st.lg === "form") return renderForm(st.id ? log.flights.find(x => x.id === st.id) || null : null);
    if(st.lg === "backup") return renderBackup();
    renderHome();
  }
  function show(){ replace({ lg:"home" }); renderHome(); }

  // Android file bridge callbacks
  window.onImportFile = text => handleImport(text);
  window.onImportFailed = () => toast("Couldn't read that file");
  window.onExportDone = ok => toast(ok ? "Backup saved" : "Backup not saved");

  load();
  return { show, fromState, back, exportAll, pickImport, handleImport, renderBackupFromSettings:() => { push({ lg:"backup" }); renderBackup(); } };
})();
