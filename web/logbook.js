
// =====================================================================
// Logbook: flights, totals against the PPL minimums, lesson cards with
// flashcards for each exercise, and backup / restore of all app data.
// Renders into the same #studyView container as Training and Exams.
// =====================================================================
const Logbook = (() => {
  const LKEY = "ppl-log-v1";
  const SKEY = "ppl-sky-v1", MKEY = "ppl-log-mode";
  const BACKUP_KEYS = ["c150cl.prefs", "ppl-study-v2", LKEY, SKEY];
  const view = $("studyView");
  let log = { v:1, flights:[] };
  let pendingImport = null;
  let sky = { v:1, jumps:[], training:[], bf:{ jumps:0, ff:0 }, ct:false };
  let mode = "fly"; try{ if(localStorage.getItem("ppl-log-mode") === "sky") mode = "sky"; }catch(e){}

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
  function save(){ try{ localStorage.setItem(LKEY, JSON.stringify(log)); }catch(e){} autoSoon(); }
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
    w.appendChild(modeSwitch());
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
    if(autoNative()) w.appendChild(el("div", "fine abline", esc(autoLine())));
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
  // a "road to" card: start to goal, plane at the share done
  function journeyCard(f, kicker, heading, labels){
    f = Math.max(0, Math.min(1, f));
    const P0 = [8, 34], P1 = [150, -6], P2 = [292, 34];
    const at = u => [0, 1].map(i => (1-u)*(1-u)*P0[i] + 2*(1-u)*u*P1[i] + u*u*P2[i]);
    const [x, y] = at(f), [x2, y2] = at(Math.min(1, f + 0.01)), [x0, y0] = at(Math.max(0, f - 0.01));
    const ang = Math.atan2(y2 - y0, x2 - x0) * 180 / Math.PI;
    let done = "M8 34"; for(let i = 1; i <= 24; i++){ const p = at(f * i / 24); done += ` L${p[0].toFixed(1)} ${p[1].toFixed(1)}`; }
    const d = el("div", "journey");
    d.innerHTML = `<div class="jk">${esc(kicker)}</div><div class="jh">${esc(heading)}</div>`+
      `<svg viewBox="0 0 300 46" aria-hidden="true"><path d="M8 34 Q150 -6 292 34" stroke="rgba(255,255,255,.4)" stroke-width="3.5" fill="none" stroke-dasharray="1 8" stroke-linecap="round"/>`+
      `<path d="${done}" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>`+
      `<circle cx="8" cy="34" r="5" fill="#fff"/><circle cx="292" cy="34" r="5" fill="none" stroke="#fff" stroke-width="3"/>`+
      `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(ang + 90).toFixed(0)}) scale(1.05)" style="color:#fff"><use href="#ac"/></g></svg>`+
      `<div class="jl">${labels.map(l => `<span>${esc(l)}</span>`).join("")}</div>`;
    return d;
  }
  function journey(t){
    const need = REQS[0].need, left = Math.max(0, need - t.total);
    const last = sorted()[0], ex = last && last.ex.length ? "Ex " + last.ex[last.ex.length - 1] : hm(t.total);
    return journeyCard(t.total / need, "Road to your PPL", left ? `${hm(left)} of instruction to go` : "Instruction hours done", ["First lesson", `Latest: ${ex}`, "Skills test"]);
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


  // =====================================================================
  // Skydiving log: jumps, refresher training and progress to the
  // British Skydiving A licence. Shares backup / import with the flying log.
  // =====================================================================
  const SKY_LEVELS = 7;       // AFF levels flown with instructors before consolidation
  const SKY_CONSOLS = 10;     // minimum consolidation jumps for the A licence
  const SKY_MIN = 18;         // British Skydiving: minimum jumps for the A licence
  const KINDS = [["Tandem", "Tandem"], ["AFF", "AFF level"], ["Consol", "Consolidation"], ["Fun", "Fun jump"]];
  const newJid = () => "j" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  function loadSky(){ try{ const s = JSON.parse(localStorage.getItem(SKEY) || "null"); if(s && Array.isArray(s.jumps)) sky = Object.assign({ training:[], bf:{ jumps:0, ff:0 }, ct:false }, s); }catch(e){} }
  function saveSky(){ try{ localStorage.setItem(SKEY, JSON.stringify(sky)); }catch(e){} autoSoon(); }
  function cleanJump(j){
    const s = v => typeof v === "string" ? v.slice(0, 4000) : "";
    const n = (v, lo, hi) => { const x = Math.round(+v); return isFinite(x) ? Math.max(lo, Math.min(hi, x)) : 0; };
    const kind = KINDS.some(k => k[0] === j.kind) ? j.kind : "Fun";
    return {
      id: s(j.id) || newJid(), no: n(j.no, 0, 99999), date: /^\d{4}-\d{2}-\d{2}$/.test(j.date) ? j.date : today(),
      dz: s(j.dz), aircraft: s(j.aircraft), alt: n(j.alt, 0, 40000), deploy: n(j.deploy, 0, 20000), delay: n(j.delay, 0, 600),
      canopy: s(j.canopy), kind, level: kind === "AFF" ? n(j.level, 0, 8) : 0, cons: kind === "Consol" ? n(j.cons, 0, 99) : 0,
      result: kind === "AFF" && ["Pass", "Repeat"].includes(j.result) ? j.result : (kind === "AFF" ? "Pass" : ""),
      notes: s(j.notes), sig: s(j.sig), mine: s(j.mine)
    };
  }
  function cleanTrain(t){
    const s = v => typeof v === "string" ? v.slice(0, 300) : "";
    return { id: s(t.id) || newJid(), date: /^\d{4}-\d{2}-\d{2}$/.test(t.date) ? t.date : today(), what: s(t.what) || "Refresher", by: s(t.by) };
  }
  const jumpsSorted = () => sky.jumps.slice().sort((a,b) => (b.no - a.no) || b.date.localeCompare(a.date));
  const mmss = s => { s = Math.round(s); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = String(s % 60).padStart(2, "0"); return h ? `${h}:${String(m).padStart(2, "0")}:${x}` : `${m}:${x}`; };
  const jumpLabel = j => j.kind === "AFF" ? `AFF level ${j.level || "?"}${j.result === "Repeat" ? " (repeat)" : ""}` : j.kind === "Consol" ? `Consol ${j.cons || ""}`.trim() : j.kind === "Tandem" ? "Tandem" : "Fun jump";
  const estDelay = (alt, dep) => alt > dep + 1000 ? Math.round(10 + (alt - dep - 1000) / 1000 * 5.5) : 0;

  function skyStats(){
    const js = jumpsSorted(), asc = js.slice().reverse();
    const n = Math.max(sky.bf.jumps + sky.jumps.length, ...sky.jumps.map(j => j.no));
    const ff = sky.bf.ff + sky.jumps.reduce((a, j) => a + j.delay, 0);
    const last = js[0] || null;
    // progress counts from your most recent AFF level 1, so a restart after a lay-off starts the course again
    let start = -1; asc.forEach((j, i) => { if(j.kind === "AFF" && j.level === 1) start = i; });
    const course = start >= 0 ? asc.slice(start) : asc;
    const passed = new Set(course.filter(j => j.kind === "AFF" && j.result === "Pass").map(j => j.level));
    const levels = Array.from({ length:SKY_LEVELS }, (_, i) => passed.has(i + 1)).filter(Boolean).length;
    const consols = course.filter(j => j.kind === "Consol").length;
    const dzs = new Set(sky.jumps.map(j => j.dz).filter(Boolean)).size;
    const earlier = start > 0 ? asc.slice(0, start).filter(j => j.kind === "AFF" && j.result === "Pass").map(j => j.level) : [];
    return { n, ff, last, course, passed, levels, consols, dzs, earlier, restart: start >= 0 ? course[0] : null };
  }
  function since(date){
    const d = new Date(date + "T12:00:00"), now = new Date();
    let m = (now.getFullYear() - d.getFullYear()) * 12 + now.getMonth() - d.getMonth(); if(now.getDate() < d.getDate()) m--;
    const days = Math.floor((now - d) / 864e5);
    const y = Math.floor(m / 12), mo = m % 12;
    const txt = days < 31 ? `${days} day${days === 1 ? "" : "s"}` : y ? `${y} year${y === 1 ? "" : "s"}${mo ? `, ${mo} month${mo === 1 ? "" : "s"}` : ""}` : `${m} month${m === 1 ? "" : "s"}`;
    return { days, months:m, txt };
  }

  function modeSwitch(){
    const d = el("div", "lgswitch");
    [["fly", "Flying"], ["sky", "Skydiving"]].forEach(([v, lab]) => d.appendChild(btn("lgsw" + (mode === v ? " on" : ""), lab, () => {
      if(mode === v) return;
      mode = v; try{ localStorage.setItem(MKEY, v); }catch(e){}
      show();
    }, { "aria-pressed": mode === v ? "true" : "false" })));
    return d;
  }

  function renderSkyHome(){
    enter("top");
    const st = skyStats();
    title("Skydiving log", sky.jumps.length ? `${st.n} jumps · ${mmss(st.ff)} freefall` : "Your jumps and progress to the A licence");
    view.innerHTML = "";
    const w = el("div", "topic");
    w.appendChild(modeSwitch());
    w.appendChild(btn("cont", `<span class="ct"><span class="k">New entry</span><div class="n">Log a jump</div><div class="x">Altitudes, freefall, canopy and the instructor's debrief</div></span><span class="arrow">+</span>`, () => { push({ lg:"jform" }); renderJumpForm(null); }));
    if(!sky.jumps.length){
      w.appendChild(el("div", "card empty", `<h3>No jumps logged yet</h3><p>Log each jump as you do it, or bring your paper logbook in with <b>Backup and import</b>.</p>`));
    } else {
      w.appendChild(el("div", "wout lgtiles", [
        ["Jumps", String(st.n), true], ["Freefall", mmss(st.ff)], ["Drop zones", String(st.dzs)],
        ["Last jump", st.last ? fmtDate(st.last.date) : "—"], ["AFF levels", `${st.levels} / ${SKY_LEVELS}`], ["Consols", `${st.consols} / ${SKY_CONSOLS}`]
      ].map(([k,v,hl]) => `<div class="o${hl ? " hl" : ""}"><span class="k">${k}</span><span class="v">${esc(v)}</span></div>`).join("")));
      // currency
      if(st.last){
        const s = since(st.last.date);
        if(s.days > 30){
          w.appendChild(el("div", "card currency" + (s.months >= 3 ? " warn" : ""),
            `<b class="ck">${esc(s.txt)} since your last jump</b><p>${st.levels >= SKY_LEVELS && st.consols < SKY_CONSOLS ? "You're a student on consolidation jumps, so" : "As a student,"} you'll need refresher training before you jump again. ${s.months >= 3 ? "After a lay-off this long, expect ground school and possibly a check-out jump with an instructor before carrying on. " : ""}The drop zone's Chief Instructor decides exactly what. Take this logbook with you.</p>`));
        }
      }
      // road to the A licence
      const done = st.levels + Math.min(st.consols, SKY_CONSOLS), need = SKY_LEVELS + SKY_CONSOLS;
      const lastLab = st.last ? jumpLabel(st.last) : "";
      w.appendChild(journeyCard(done / need, "Road to your A licence",
        st.levels < SKY_LEVELS ? `AFF level ${st.levels + 1} next` : st.consols < SKY_CONSOLS ? `${SKY_CONSOLS - st.consols} consolidation jump${SKY_CONSOLS - st.consols === 1 ? "" : "s"} to go` : sky.ct ? "Ready to apply for your A licence" : "Canopy written exam to go",
        ["First jump", `Latest: ${lastLab}`, "A licence"]));
      w.appendChild(el("div", "grid-label", "Towards the A licence"));
      const rq = el("div", "reqs");
      const dial = (pct, done, big, label) => el("div", "req" + (done ? " done" : ""), ring(pct, 64, 8, done ? "✓" : `${pct}%`) + `<b class="rb">${big}</b><span class="rl">${label}</span>`);
      rq.appendChild(dial(Math.round(100 * st.levels / SKY_LEVELS), st.levels >= SKY_LEVELS, `${st.levels} / ${SKY_LEVELS}`, "AFF levels"));
      rq.appendChild(dial(Math.min(100, Math.round(100 * st.consols / SKY_CONSOLS)), st.consols >= SKY_CONSOLS, `${st.consols} / ${SKY_CONSOLS}`, "Consolidation jumps"));
      rq.appendChild(dial(Math.min(100, Math.round(100 * st.n / SKY_MIN)), st.n >= SKY_MIN, `${st.n} / ${SKY_MIN}`, "Jumps in total"));
      const ct = dial(sky.ct ? 100 : 0, sky.ct, sky.ct ? "Passed" : "Not yet", "Canopy written exam · tap to change");
      ct.classList.add("tapreq"); ct.setAttribute("role", "button"); ct.tabIndex = 0;
      ct.addEventListener("click", () => { sky.ct = !sky.ct; saveSky(); renderSkyHome(); });
      rq.appendChild(ct);
      w.appendChild(rq);
      // AFF levels on the current course
      const lv = el("div", "levels");
      for(let i = 1; i <= SKY_LEVELS; i++) lv.appendChild(el("span", "lvl" + (st.passed.has(i) ? " on" : ""), `L${i}`));
      w.appendChild(lv);
      w.appendChild(el("div", "fine", (st.restart ? `AFF levels and consols count from your restart at level 1 on ${fmtDate(st.restart.date)}${st.earlier.length ? `; you'd passed levels ${Math.min(...st.earlier)}–${Math.max(...st.earlier)} on an earlier course` : ""}. ` : "") +
        `British Skydiving: the AFF levels, at least ${SKY_CONSOLS} consolidation jumps and the canopy training written exam, ${SKY_MIN} jumps minimum. Your instructors' records are the official ones.`));
    }
    // refresher training
    w.appendChild(el("div", "grid-label", "Ground school and refreshers"));
    const tl = el("div", "tlist");
    sky.training.slice().sort((a,b) => b.date.localeCompare(a.date)).forEach(t => {
      const row = el("div", "trow", `<span class="fdate">${esc(fmtDate(t.date))}</span><span class="tw"><b>${esc(t.what)}</b>${t.by ? `<span>${esc(t.by)}</span>` : ""}</span>`);
      row.appendChild(armedButton("xdel", "✕", "Delete", () => { sky.training = sky.training.filter(x => x.id !== t.id); saveSky(); renderSkyHome(); }));
      tl.appendChild(row);
    });
    if(!sky.training.length) tl.appendChild(el("div", "fine", "None logged."));
    w.appendChild(tl);
    const addT = el("div", "");
    addT.appendChild(btn("bigbtn ghost", "Add ground school or refresher", () => {
      addT.innerHTML = "";
      const f = el("div", "card lform");
      f.innerHTML = `<div class="fgrid"><div class="dfield"><label for="tr-date">Date</label><input id="tr-date" class="wtext" type="date" value="${today()}"></div>`+
        `<div class="dfield"><label for="tr-what">What</label><input id="tr-what" class="wtext" placeholder="Refresher, ground school, consol brief"></div>`+
        `<div class="dfield"><label for="tr-by">Instructor</label><input id="tr-by" class="wtext" placeholder="Initials and number"></div></div>`;
      f.appendChild(btn("bigbtn", "Save", () => {
        sky.training.push(cleanTrain({ date:$("tr-date").value, what:$("tr-what").value.trim(), by:$("tr-by").value.trim() })); saveSky(); toast("Saved"); renderSkyHome();
      }));
      addT.appendChild(f);
    }));
    w.appendChild(addT);
    // jumps
    if(sky.jumps.length){
      w.appendChild(el("div", "grid-label", "Jumps"));
      const list = el("div", "flist");
      jumpsSorted().forEach(j => list.appendChild(btn("fcard jcard",
        `<span class="jno">#${j.no || "?"}</span>`+
        `<span class="fmain"><b>${esc(jumpLabel(j))}</b><span>${esc(fmtDate(j.date))} · ${esc(j.dz || "—")}</span></span>`+
        `<span class="fside"><span class="fpill ${j.kind.toLowerCase()}">${esc(j.kind === "Consol" ? "Consol" : j.kind)}</span><b>${j.delay ? j.delay + " s" : ""}</b></span>`,
        () => { push({ lg:"jump", id:j.id }); renderJump(j); })));
      w.appendChild(list);
    }
    w.appendChild(btn("bigbtn ghost", "Backup and import", () => { push({ lg:"backup" }); renderBackup(); }));
    if(autoNative()) w.appendChild(el("div", "fine abline", esc(autoLine())));
    view.appendChild(w);
  }

  function renderJump(j){
    enter("sub");
    title(`Jump ${j.no || ""}`.trim(), `${fmtDate(j.date)} · ${jumpLabel(j)}`);
    view.innerHTML = "";
    const w = el("div", "topic");
    w.appendChild(el("div", "card", `<div class="fdet">`+
      [["Jump", j.no || ""], ["Date", fmtDate(j.date)], ["Type", jumpLabel(j)], ["Drop zone", j.dz], ["Aircraft", j.aircraft],
       ["Exit", j.alt ? `${j.alt.toLocaleString("en-GB")} ft` : ""], ["Deployment", j.deploy ? `${j.deploy.toLocaleString("en-GB")} ft` : ""],
       ["Freefall", j.delay ? `${j.delay} s` : ""], ["Canopy", j.canopy], ["Signed", j.sig]]
        .filter(r => r[1] !== "" && r[1] != null).map(([k,v]) => `<div><span>${k}</span><b>${esc(v)}</b></div>`).join("") + `</div>` +
      (j.notes ? `<p class="frem">${esc(j.notes).replace(/\n/g, "<br>")}</p>` : "")));
    w.appendChild(el("div", "grid-label", "Your notes"));
    const c = el("div", "card debrief");
    const ta = document.createElement("textarea"); ta.id = "jn-mine"; ta.rows = 4; ta.className = "wtext"; ta.value = j.mine || ""; ta.placeholder = "What you'd remind yourself before the next jump";
    let t = null;
    ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { j.mine = ta.value; saveSky(); }, 400); });
    ta.addEventListener("blur", () => { j.mine = ta.value; saveSky(); });
    c.append(ta, el("div", "fine", "Saved as you type."));
    w.appendChild(c);
    const row = el("div", "row2");
    row.appendChild(btn("bigbtn", "Edit jump", () => { push({ lg:"jform", id:j.id }); renderJumpForm(j); }));
    row.appendChild(armedButton("resetbtn", "Delete jump", "Tap again to delete", () => {
      sky.jumps = sky.jumps.filter(x => x.id !== j.id); saveSky(); toast("Jump deleted"); back();
    }));
    w.appendChild(row);
    view.appendChild(w);
  }

  const recentJ = field => { const seen = []; jumpsSorted().forEach(j => { const v = j[field]; if(v && !seen.includes(v)) seen.push(v); }); return seen.slice(0, 4); };
  function renderJumpForm(j){
    enter("sub");
    const editing = !!j, st = skyStats();
    const last = jumpsSorted()[0];
    const nextKind = !last ? "Tandem" : last.kind === "AFF" && last.level >= SKY_LEVELS && last.result === "Pass" ? "Consol" : last.kind === "AFF" ? "AFF" : last.kind;
    const d = editing ? Object.assign({}, j) : { no: st.n + 1, date: today(), dz: recentJ("dz")[0] || "", aircraft: recentJ("aircraft")[0] || "", alt: last ? last.alt : 15000, deploy: 0, delay: 0,
      canopy: recentJ("canopy")[0] || "", kind: nextKind, level: last && last.kind === "AFF" ? Math.min(8, last.level + (last.result === "Pass" ? 1 : 0)) : 1,
      cons: st.consols + 1, result: "Pass", notes: "", sig: "", mine: "" };
    title(editing ? `Edit jump ${j.no}` : "Log a jump", "As in your skydiving logbook");
    view.innerHTML = "";
    const w = el("div", "topic");
    const form = el("form", "card lform"); form.noValidate = true;
    const field = (id, label, input) => { const b = el("div", "dfield", `<label for="${id}">${label}</label>`); b.appendChild(input); return b; };
    const text = (id, value, attrs) => { const i = document.createElement("input"); i.id = id; i.className = "wtext"; i.value = value == null || value === 0 ? "" : value; Object.entries(attrs || {}).forEach(([k,v]) => i.setAttribute(k, v)); return i; };
    const quick = (input, values) => { const r = el("div", "quick"); values.forEach(v => r.appendChild(btn("qchip", esc(v), () => { input.value = v; input.dispatchEvent(new Event("input")); }))); return values.length ? r : null; };
    const fNo = text("jf-no", d.no, { inputmode:"numeric" }), fDate = text("jf-date", d.date, { type:"date" });
    const fDz = text("jf-dz", d.dz, { placeholder:"Sky High Skydiving" }), fAc = text("jf-ac", d.aircraft, { placeholder:"Cessna Caravan" });
    const fAlt = text("jf-alt", d.alt, { inputmode:"numeric", placeholder:"15000" }), fDep = text("jf-dep", d.deploy, { inputmode:"numeric", placeholder:"5500" });
    const fDel = text("jf-del", d.delay, { inputmode:"numeric" }), fCan = text("jf-can", d.canopy, { placeholder:"Navigator 280" });
    const fSig = text("jf-sig", d.sig, { placeholder:"Instructor's initials and number" });
    const fNotes = document.createElement("textarea"); fNotes.id = "jf-notes"; fNotes.className = "wtext"; fNotes.rows = 5; fNotes.value = d.notes; fNotes.placeholder = "The instructor's debrief, as written in your logbook";
    const syncEst = () => { const e = estDelay(+fAlt.value || 0, +fDep.value || 0); fDel.placeholder = e ? `about ${e} (estimate)` : "seconds"; };
    fAlt.addEventListener("input", syncEst); fDep.addEventListener("input", syncEst); syncEst();

    const g1 = el("div", "fgrid");
    g1.append(field("jf-no", "Jump number", fNo), field("jf-date", "Date", fDate), field("jf-dz", "Drop zone", fDz));
    const q1 = quick(fDz, recentJ("dz")); if(q1) g1.lastChild.appendChild(q1);
    g1.append(field("jf-ac", "Aircraft", fAc));
    const q2 = quick(fAc, recentJ("aircraft")); if(q2) g1.lastChild.appendChild(q2);
    form.appendChild(g1);

    form.appendChild(el("div", "zlabel", "Type of jump"));
    const kindRow = el("div", "");
    const affBox = el("div", "affbox"), conBox = el("div", "affbox");
    const showKind = () => { affBox.hidden = d.kind !== "AFF"; conBox.hidden = d.kind !== "Consol"; };
    form.appendChild(W.seg(KINDS, d.kind, v => { d.kind = v; showKind(); }).el);
    const lvls = el("div", "quick");
    for(let i = 1; i <= 8; i++){ const b = btn("qchip lv" + (d.level === i ? " on" : ""), `Level ${i}`, () => { d.level = i; lvls.querySelectorAll(".lv").forEach(x => x.classList.toggle("on", x === b)); }); lvls.appendChild(b); }
    affBox.append(el("div", "zlabel", "AFF level"), lvls, el("div", "zlabel", "Result"), W.seg([["Pass", "Passed, next level"], ["Repeat", "Repeat this level"]], d.result || "Pass", v => { d.result = v; }).el);
    const fCons = text("jf-cons", d.cons, { inputmode:"numeric" });
    conBox.appendChild(field("jf-cons", "Consolidation jump number", fCons));
    form.append(kindRow, affBox, conBox); showKind();

    form.appendChild(el("div", "zlabel", "The jump"));
    const g2 = el("div", "fgrid");
    g2.append(field("jf-alt", "Exit altitude (ft)", fAlt));
    g2.lastChild.appendChild(quick(fAlt, ["15000", "13000", "12500", "10000"]));
    g2.append(field("jf-dep", "Deployment (ft)", fDep), field("jf-del", "Freefall (seconds)", fDel), field("jf-can", "Canopy", fCan));
    const q3 = quick(fCan, recentJ("canopy")); if(q3) g2.lastChild.appendChild(q3);
    g2.append(field("jf-sig", "Signed by", fSig));
    form.appendChild(g2);
    form.appendChild(field("jf-notes", "Description and debrief", fNotes));
    form.appendChild(el("div", "fine", "Leave freefall blank to use the estimate: about 10 s for the first 1,000 ft, then about 5.5 s per 1,000 ft at belly-flying speed."));
    const msg = el("div", "calcmsg");
    form.appendChild(msg);
    form.appendChild(btn("bigbtn", editing ? "Save changes" : "Save jump", () => form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit"))));
    form.addEventListener("submit", e => {
      e.preventDefault();
      if(!fDate.value){ msg.textContent = "Add the date."; return; }
      const alt = parseInt(fAlt.value, 10) || 0, dep = parseInt(fDep.value, 10) || 0;
      const rec = cleanJump(Object.assign(d, { no: parseInt(fNo.value, 10) || 0, date: fDate.value, dz: fDz.value.trim(), aircraft: fAc.value.trim(), alt, deploy: dep,
        delay: parseInt(fDel.value, 10) || estDelay(alt, dep), canopy: fCan.value.trim(), cons: parseInt(fCons.value, 10) || 0, notes: fNotes.value.trim(), sig: fSig.value.trim() }));
      if(editing){ const k = sky.jumps.findIndex(x => x.id === j.id); sky.jumps[k] = Object.assign(rec, { id:j.id, mine:j.mine }); }
      else sky.jumps.push(rec);
      saveSky(); buzz(); toast(editing ? "Jump updated" : "Jump saved");
      if(editing && history.state && history.state.lg === "jform"){ try{ history.back(); return; }catch(e){} }
      replace({ lg:"jump", id:rec.id }); renderJump(sky.jumps.find(x => x.id === rec.id));
    });
    w.appendChild(form);
    view.appendChild(w);
  }

  // ---------- backup and import ----------
  // ---------- automatic backup (Android app only) ----------
  // The chosen file holds the latest backup plus one copy from each of the last 7 days
  // it was written, so a mistake can be undone by restoring an earlier day.
  const AKEY = "ppl-autobk-v1", KEEP_DAYS = 7;
  const autoNative = () => !!(window.AndroidBridge && AndroidBridge.autoBackup);
  function autoInfo(){ try{ return JSON.parse(AndroidBridge.autoBackupInfo()); }catch(e){ return { on:false }; } }
  function currentStorage(){ const st = {}; BACKUP_KEYS.forEach(k => { try{ const v = localStorage.getItem(k); if(v != null) st[k] = v; }catch(e){} }); return st; }
  function autoText(){
    const storage = currentStorage(), now = new Date(), day = today();
    let hist = []; try{ hist = JSON.parse(localStorage.getItem(AKEY) || "[]"); }catch(e){}
    hist = hist.filter(h => h && h.day !== day && h.storage);
    const text = JSON.stringify({ app:"PPL Kneeboard", kind:"backup", v:1, auto:true, exported:now.toISOString(), storage,
      history: hist.slice(0, KEEP_DAYS).map(h => ({ exported:h.at, storage:h.storage })) }, null, 1);
    hist.unshift({ day, at:now.toISOString(), storage });
    try{ localStorage.setItem(AKEY, JSON.stringify(hist.slice(0, KEEP_DAYS + 1))); }catch(e){}
    return text;
  }
  let autoTimer = null;
  function autoSoon(){
    if(!autoNative() || !autoInfo().on) return;
    clearTimeout(autoTimer); autoTimer = setTimeout(autoNow, 3000);
  }
  function autoNow(){ clearTimeout(autoTimer); autoTimer = null; if(autoNative() && autoInfo().on) AndroidBridge.autoBackup(autoText()); }
  window.pplAutoBackup = autoSoon;
  window.pplAutoBackupFlush = () => { if(autoTimer) autoNow(); };
  window.onAutoBackupChosen = err => {
    if(err === null) return;
    toast(err ? err : "Automatic backup is on");
    if(history.state && history.state.lg === "backup") renderBackup();
  };
  window.onAutoBackupDone = err => {
    if(err) toast("Automatic backup: " + err);
    if(history.state && history.state.lg === "backup" && !pendingImport) renderBackup();
  };
  function stamp(ms){
    if(!ms) return "";
    const d = new Date(ms), mins = Math.round((Date.now() - ms) / 60000);
    if(mins < 1) return "just now"; if(mins < 60) return `${mins} min ago`;
    return `${fmtDate(dayKeyOf(d))}, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  const dayKeyOf = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  function autoLine(){
    if(!autoNative()) return "";
    const i = autoInfo();
    return i.on ? (i.err ? `Automatic backup: ${i.err}` : `Automatic backup on · ${i.last ? "last saved " + stamp(i.last) : "not written yet"}`) : "Automatic backup is off: turn it on in Backup and import";
  }
  function autoCard(){
    const c = el("div", "card autobk");
    if(!autoNative()){
      c.innerHTML = `<div class="learn"><h3>Automatic backup</h3><p>Works in the Android app: choose a file once, on Google Drive for example, and the app keeps it up to date.</p></div>`;
      return c;
    }
    const i = autoInfo();
    c.innerHTML = `<div class="learn"><h3>Automatic backup</h3>` + (i.on
      ? `<p>Saving to <b>${esc(i.label || "your backup file")}</b> after every change and at least once a day. The file also keeps a copy from each of the last ${KEEP_DAYS} days.</p><p class="abst${i.err ? " bad" : ""}">${esc(i.err || (i.last ? "Last saved " + stamp(i.last) : "Not written yet."))}</p>`
      : `<p>Choose a file once and the app rewrites it after every change: flights, jumps, exam answers and settings. In the save screen open the menu, pick <b>Drive</b>, choose a folder and keep the name. Restore it on a new phone with <b>Choose a file to import</b>.</p><p class="abst bad">Not set up yet.</p>`) + `</div>`;
    if(i.on){
      const row = el("div", "row2");
      row.appendChild(btn("bigbtn", "Save now", () => { autoNow(); toast("Saving backup"); }));
      row.appendChild(btn("bigbtn ghost", "Change file", () => AndroidBridge.chooseAutoBackup("ppl-kneeboard-autobackup.json", autoText())));
      c.appendChild(row);
      c.appendChild(armedButton("resetbtn", "Turn off automatic backup", "Tap again to turn off", () => { AndroidBridge.autoBackupOff(); toast("Automatic backup off"); renderBackup(); }));
    } else {
      c.appendChild(btn("bigbtn", "Choose backup file", () => AndroidBridge.chooseAutoBackup("ppl-kneeboard-autobackup.json", autoText())));
    }
    return c;
  }

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
  function handleImport(text, versions, vi){
    let data = null;
    try{ data = JSON.parse(text); }catch(e){}
    if(data && data.kind === "backup" && !versions && Array.isArray(data.history) && data.history.length){
      versions = [{ exported:data.exported, storage:data.storage }, ...data.history.filter(h => h && h.storage)]; vi = 0;
    }
    if(!data || data.app !== "PPL Kneeboard"){ pendingImport = { error:"That file isn't a PPL Kneeboard backup or logbook file." }; }
    else {
      let flights = [];
      if(data.kind === "logbook" && Array.isArray(data.flights)) flights = data.flights;
      if(data.kind === "backup" && data.storage && data.storage[LKEY]){ try{ flights = JSON.parse(data.storage[LKEY]).flights || []; }catch(e){} }
      flights = flights.map(clean);
      let jumps = [], training = [], bf = null, ctFlag = false;
      if(data.kind === "logbook"){ if(Array.isArray(data.jumps)) jumps = data.jumps; if(Array.isArray(data.training)) training = data.training; if(data.bf) bf = data.bf; }
      if(data.kind === "backup" && data.storage && data.storage[SKEY]){ try{ const o = JSON.parse(data.storage[SKEY]); jumps = o.jumps || []; training = o.training || []; bf = o.bf || null; if(o.ct) ctFlag = true; }catch(e){} }
      jumps = jumps.map(cleanJump); training = training.map(cleanTrain);
      const jExists = j => sky.jumps.some(x => x.id === j.id || (x.no === j.no && x.date === j.date));
      const freshJ = jumps.filter(j => !jExists(j));
      const freshT = training.filter(t => !sky.training.some(x => x.id === t.id || (x.date === t.date && x.what === t.what)));
      const exists = f => log.flights.some(x => x.id === f.id || (x.date === f.date && x.reg === f.reg && x.mins === f.mins && x.from === f.from && x.dep === f.dep));
      const fresh = flights.filter(f => !exists(f));
      let answers = 0;
      if(data.kind === "backup" && data.storage && data.storage["ppl-study-v2"]){ try{ answers = Object.keys(JSON.parse(data.storage["ppl-study-v2"]).ans || {}).length; }catch(e){} }
      pendingImport = { data, fresh, dupes:flights.length - fresh.length, answers, freshJ, dupesJ:jumps.length - freshJ.length, freshT, bf, ctFlag, versions, vi };
    }
    if(!(history.state && history.state.lg === "backup")) push({ lg:"backup" });
    renderBackup();
  }
  function applyImport(){
    const p = pendingImport; if(!p || p.error) return;
    log.flights.push(...p.fresh); save();
    sky.jumps.push(...p.freshJ); sky.training.push(...p.freshT);
    if(p.ctFlag) sky.ct = true;
    if(p.bf && !sky.bf.jumps && !sky.bf.ff) sky.bf = { jumps: Math.max(0, Math.round(+p.bf.jumps || 0)), ff: Math.max(0, Math.round(+p.bf.ff || 0)) };
    saveSky();
    if(p.data.kind === "backup"){
      ["c150cl.prefs", "ppl-study-v2"].forEach(k => { if(p.data.storage[k] != null){ try{ localStorage.setItem(k, p.data.storage[k]); }catch(e){} } });
      pendingImport = null;
      autoNow();   // the backup file now matches what was restored
      toast("Backup restored");
      setTimeout(() => location.reload(), 600);   // settings and answers load at start-up
      return;
    }
    pendingImport = null; toast(`Imported ${[p.fresh.length ? `${p.fresh.length} flight${p.fresh.length === 1 ? "" : "s"}` : "", p.freshJ.length ? `${p.freshJ.length} jump${p.freshJ.length === 1 ? "" : "s"}` : ""].filter(Boolean).join(" and ") || "nothing new"}`); renderBackup();
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
          : [p.fresh.length || p.dupes ? `${p.fresh.length} new flight${p.fresh.length === 1 ? "" : "s"} to add${p.dupes ? `, ${p.dupes} already in your logbook and skipped` : ""}.` : "",
             p.freshJ.length || p.dupesJ ? `${p.freshJ.length} new jump${p.freshJ.length === 1 ? "" : "s"} for your skydiving log${p.dupesJ ? `, ${p.dupesJ} already there and skipped` : ""}${p.freshT.length ? `, plus ${p.freshT.length} ground school and refresher record${p.freshT.length === 1 ? "" : "s"}` : ""}.` : ""].filter(Boolean).join(" ");
        c.innerHTML = `<h3>Ready to import</h3><p>${what}</p>`;
        if(p.versions && p.versions.length > 1){
          c.appendChild(el("div", "zlabel", "This file has earlier copies. Which one?"));
          const vr = el("div", "quick");
          p.versions.forEach((v, i) => vr.appendChild(btn("qchip" + (i === p.vi ? " on" : ""), (i ? "" : "Latest · ") + esc(stamp(Date.parse(v.exported))), () => {
            handleImport(JSON.stringify(Object.assign({}, p.data, { storage:v.storage, exported:v.exported })), p.versions, i);
          })));
          c.appendChild(vr);
        }
        const row = el("div", "row2");
        row.appendChild(btn("bigbtn", p.data.kind === "backup" ? "Restore backup" : p.freshJ.length && !p.fresh.length ? "Add jumps" : p.freshJ.length ? "Add flights and jumps" : "Add flights", applyImport, (p.fresh.length || p.freshJ.length || p.freshT.length || p.data.kind === "backup") ? null : { disabled:"" }));
        row.appendChild(btn("bigbtn ghost", "Cancel", () => { pendingImport = null; renderBackup(); }));
        c.appendChild(row);
      }
      w.appendChild(c);
    }
    const t = totals();
    w.appendChild(autoCard());
    w.appendChild(el("div", "card", `<div class="learn"><h3>Back up everything</h3><p>Saves your logbook (${t.n} flight${t.n === 1 ? "" : "s"}, ${sky.jumps.length} jump${sky.jumps.length === 1 ? "" : "s"}), exam answers and display settings to one file. Keep it somewhere safe, such as Google Drive. A dated copy like this is worth keeping before uninstalling the app or changing phone.</p></div>`));
    const native = !!(window.AndroidBridge && AndroidBridge.exportFile);
    w.appendChild(btn("bigbtn", "Save a backup file", () => { if(!exportAll()) showText(); }));
    w.appendChild(el("div", "card", `<div class="learn"><h3>Restore or import</h3><p>Choose a backup file to restore, or a logbook file (for example your paper logbooks typed up for you) to add its flights and jumps. Entries already in your logbook are skipped.</p></div>`));
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
    if(s && s !== "home" && s !== "sky"){ try{ history.back(); return; }catch(e){} }
    mode === "sky" ? renderSkyHome() : renderHome();
  }
  function fromState(st){
    if(st.lg === "flight"){ const f = log.flights.find(x => x.id === st.id); if(f) return renderFlight(f); }
    if(st.lg === "lesson"){ const l = lessonById(st.ex); if(l) return renderLesson(l); }
    if(st.lg === "form") return renderForm(st.id ? log.flights.find(x => x.id === st.id) || null : null);
    if(st.lg === "backup") return renderBackup();
    if(st.lg === "jump"){ const j = sky.jumps.find(x => x.id === st.id); if(j) return renderJump(j); }
    if(st.lg === "jform") return renderJumpForm(st.id ? sky.jumps.find(x => x.id === st.id) || null : null);
    if(st.lg === "sky"){ mode = "sky"; return renderSkyHome(); }
    if(st.lg === "home") mode = "fly";
    mode === "sky" ? renderSkyHome() : renderHome();
  }
  function show(){ if(mode === "sky"){ replace({ lg:"sky" }); renderSkyHome(); } else { replace({ lg:"home" }); renderHome(); } }

  // Android file bridge callbacks
  window.onImportFile = text => handleImport(text);
  window.onImportFailed = () => toast("Couldn't read that file");
  window.onExportDone = ok => toast(ok ? "Backup saved" : "Backup not saved");

  load(); loadSky();
  // at least once a day, even if nothing changed in the logbook (exam answers save elsewhere)
  setTimeout(() => { if(autoNative()){ const i = autoInfo(); if(i.on && Date.now() - (i.last || 0) > 864e5) autoNow(); } }, 5000);
  return { show, fromState, back, exportAll, pickImport, handleImport, renderBackupFromSettings:() => { push({ lg:"backup" }); renderBackup(); } };
})();
