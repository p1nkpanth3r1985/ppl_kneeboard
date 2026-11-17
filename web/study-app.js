
// =====================================================================
// Training and Exams sections
// Two tabs over the same SUBJECTS data. Training is the notes; Exams is
// practice by topic, a mock paper per subject and review of misses.
// Shares only the header, the settings sheet and the display mode with the
// checklist. Answers have their own storage key.
// =====================================================================
const Study = (() => {
  const SKEY = "ppl-study-v2", OLD_KEY = "ppl-air-law-v1";
  const PASS = 75, MOCK_N = 20;
  const view = $("studyView");
  let store = { ans:{} };
  let sess = null;

  // The nine CAA PPL(A) papers, in syllabus order. Subjects not yet written
  // show on the Training screen as "not added yet".
  const PAPERS = [
    ["010","Air Law"],["020","Aircraft General Knowledge"],["030","Flight Performance & Planning"],
    ["040","Human Performance"],["050","Meteorology"],["060","Navigation"],
    ["070","Operational Procedures"],["080","Principles of Flight"],["090","Communications"]
  ];

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const subjectByCode = code => SUBJECTS.find(s => s.code === code);
  const subjectById = id => SUBJECTS.find(s => s.id === id);
  const topicOf = (s, tid) => s.topics.find(t => t.id === tid);
  const qid = (s,t,i) => `${s.id}:${t.id}-${i+1}`;
  const ALLQ = [];
  SUBJECTS.forEach(s => s.topics.forEach(t => t.qs.forEach((q,i) => ALLQ.push({ id:qid(s,t,i), s, t, q }))));
  const byQ = {}; ALLQ.forEach(x => byQ[x.id] = x);
  const shuffle = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

  // ---------- storage ----------
  function load(){
    try{ const s = JSON.parse(localStorage.getItem(SKEY) || "null"); if(s && s.ans){ store = s; return; } }catch(e){}
    // First run after the update: carry Air Law answers across from the old key.
    try{
      const o = JSON.parse(localStorage.getItem(OLD_KEY) || "null");
      if(o && o.ans){
        Object.keys(o.ans).forEach(k => { if(byQ["airlaw:" + k]) store.ans["airlaw:" + k] = o.ans[k]; });
        save();
      }
    }catch(e){}
  }
  function save(){ try{ localStorage.setItem(SKEY, JSON.stringify(store)); }catch(e){} }
  // local calendar day, so a late-evening session counts for that evening
  const dayKey = ms => { const d = new Date(ms); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
  function rec(id, ok){
    const p = store.ans[id] || { n:0, c:0 }; store.ans[id] = { n:p.n+1, c:p.c+(ok?1:0), ok, t:Date.now() };
    const k = dayKey(Date.now()); store.days = store.days || {}; store.days[k] = (store.days[k] || 0) + 1;
    save();
  }
  // Days with at least one answer: the daily log, plus older answers' timestamps from before it existed
  function studyDays(){
    const d = Object.assign({}, store.days || {});
    Object.values(store.ans).forEach(r => { if(r.t){ const k = dayKey(r.t); if(!d[k]) d[k] = 1; } });
    return d;
  }
  // consecutive days up to today (or yesterday, so the streak survives until you've had a chance today)
  function streak(){
    const d = studyDays(), day = new Date(); let n = 0;
    if(!d[dayKey(day)]) day.setDate(day.getDate() - 1);
    while(d[dayKey(day)]){ n++; day.setDate(day.getDate() - 1); }
    return n;
  }
  function ring(pct, size, sw, label){
    const r = (size - sw) / 2, c = size / 2;
    return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">`+
      `<circle class="rt" cx="${c}" cy="${c}" r="${r}" stroke-width="${sw}"/>`+
      (pct > 0 ? `<circle class="rv" cx="${c}" cy="${c}" r="${r}" stroke-width="${sw}" pathLength="100" stroke-dasharray="${Math.max(1, pct)} 100" style="stroke:var(--accent)"/>` : "")+
      `<text x="${c}" y="${c + size * 0.07}" text-anchor="middle" font-size="${Math.round(size * 0.22)}">${label}</text></svg>`;
  }
  function todayCard(){
    const n = (store.days || {})[dayKey(Date.now())] || 0, goal = MOCK_N, st = streak();
    return el("div", "today",
      ring(Math.min(100, Math.round(100 * n / goal)), 72, 9, n >= goal ? "✓" : `${n}/${goal}`) +
      `<div class="tt"><span class="tk">Today</span><span class="tn">${n >= goal ? "Daily goal done" : n ? `${goal - n} more for today's goal` : "Ready for some practice?"}</span>`+
      `<span class="tx">Goal: ${goal} questions a day, one mock's worth</span>`+
      `<span class="streak${st ? "" : " zero"}">${st ? `▲ ${st}-day streak` : "Start a streak today"}</span></div>`);
  }
  function reset(){ store = { ans:{} }; save(); try{ localStorage.removeItem(OLD_KEY); }catch(e){} }

  function stats(list){ let a=0, ok=0; list.forEach(x => { const r = store.ans[x.id]; if(r){ a++; if(r.ok) ok++; } }); return { a, ok, n:list.length }; }
  const qsOf = s => ALLQ.filter(x => x.s === s);
  const qsOfTopic = (s,t) => ALLQ.filter(x => x.s === s && x.t === t);
  const missedIn = list => list.filter(x => store.ans[x.id] && !store.ans[x.id].ok).map(x => x.id);

  // ---------- screen chrome ----------
  function enter(sec, kind){
    // kind: "top" | "sub" | "quiz"
    section = sec;
    home.hidden = true; phaseView.hidden = true; view.hidden = false;
    currentPhase = null;
    $("emergFab").hidden = true;
    hdr.classList.toggle("top", kind === "top");
    hdr.classList.toggle("insub", kind === "sub");
    hdr.classList.toggle("inphase", kind === "quiz");
    markTabs();
    window.scrollTo(0, 0);
  }
  function title(main, small){ hdrTitle.innerHTML = `${esc(main)}<small>${esc(small)}</small>`; }
  function el(tag, cls, html){ const e = document.createElement(tag); if(cls) e.className = cls; if(html != null) e.innerHTML = html; return e; }
  function btn(cls, html, fn, attrs){
    const b = el("button", cls, html);
    if(attrs) Object.entries(attrs).forEach(([k,v]) => b.setAttribute(k, v));
    b.addEventListener("click", fn);
    return b;
  }
  function card(num, ref, name, pct, count, done, fn, disabled){
    const b = btn("pbtn" + (done ? " done" : "") + (disabled ? " off" : ""),
      `<span class="pnum">${num}</span>`+
      `<span><span class="pref">${esc(ref)}</span><span class="pname" style="display:block">${esc(name)}</span></span>`+
      `<span class="pbar"><i style="width:${pct}%"></i></span>`+
      `<span class="pcount">${count}</span>`, fn, disabled ? { disabled:"" } : null);
    return b;
  }
  const push = st => { try{ history.pushState(st, ""); }catch(e){} };
  const replace = st => { try{ history.replaceState(st, ""); }catch(e){} };

  // ---------- TRAINING ----------
  function renderTrainingHome(){
    sess = null;
    enter("tr", "top");
    const built = PAPERS.filter(p => subjectByCode(p[0])).length;
    title("Training", `PPL theory notes · ${built} of 9 subjects`);
    view.innerHTML = "";
    view.appendChild(el("div", "caveat", "Study notes, not authoritative — check rules against current CAA publications"));
    view.appendChild(el("div", "grid-label", "Subjects"));
    const g = el("div", "grid");
    PAPERS.forEach(([code, name]) => {
      const s = subjectByCode(code);
      if(!s){ g.appendChild(card(code, "Paper " + code, name, 0, "Not added yet", false, () => {}, true)); return; }
      g.appendChild(card(code, `${s.topics.length} topics`, s.name, 0, "Read the notes ›", false, () => { push({ st:"trs", s:s.id }); renderTrainingSubject(s); }));
    });
    view.appendChild(g);
  }
  function renderTrainingSubject(s){
    sess = null;
    enter("tr", "sub");
    title(s.name, `Training · paper ${s.code}`);
    view.innerHTML = "";
    const w = el("div", "topic");
    w.appendChild(el("p", "lede", esc(s.blurb)));
    w.appendChild(el("div", "grid-label", "Topics"));
    const g = el("div", "grid");
    s.topics.forEach((t, idx) => {
      const st = stats(qsOfTopic(s,t));
      g.appendChild(card(String(idx+1).padStart(2,"0"), t.ref, t.title, Math.round(100*st.ok/st.n),
        st.a ? `${st.ok} / ${st.n} right` : `${st.n} questions`, st.ok === st.n,
        () => { push({ st:"trt", s:s.id, t:t.id }); renderTrainingTopic(s, t); }));
    });
    w.appendChild(g);
    w.appendChild(btn("bigbtn ghost", `Go to the ${s.name} exam ›`, () => { replace({ st:"exs", s:s.id }); renderExamSubject(s); }));
    view.appendChild(w);
  }
  function renderTrainingTopic(s, t){
    sess = null;
    enter("tr", "sub");
    title(t.title, `${s.name} · ${t.ref}`);
    view.innerHTML = "";
    const st = stats(qsOfTopic(s,t));
    const w = el("div", "topic");
    w.appendChild(el("p", "lede", esc(t.blurb)));
    const notes = el("div", "card", `<div class="learn">${t.learn()}</div>`);
    w.appendChild(notes);
    mountWidgets(notes);
    w.appendChild(btn("bigbtn", `Practise this topic · ${st.n} questions${st.a ? " (" + st.ok + " right so far)" : ""}`,
      () => start("topic", shuffle(qsOfTopic(s,t).map(x => x.id)), { s:s.id, t:t.id, from:"tr" }, false)));
    const i = s.topics.indexOf(t), nt = s.topics[i+1];
    if(nt) w.appendChild(btn("bigbtn ghost", `Next topic: ${esc(nt.title)} ›`, () => { replace({ st:"trt", s:s.id, t:nt.id }); renderTrainingTopic(s, nt); }));
    view.appendChild(w);
  }

  // ---------- EXAMS ----------
  function renderExamHome(){
    sess = null;
    enter("ex", "top");
    const all = stats(ALLQ);
    title("Exams", `Practice papers · pass mark ${PASS}%`);
    view.innerHTML = "";
    view.appendChild(todayCard());
    view.appendChild(el("div", "caveat", "Original practice questions — not the CAA question bank"));
    view.appendChild(el("div", "stat", all.a
      ? `<b>${all.a}</b> of ${all.n} questions tried · <b>${Math.round(100*all.ok/all.a)}%</b> right on last attempt`
      : `${all.n} questions across ${SUBJECTS.length} subjects · each mock is ${MOCK_N} questions`));
    const m = missedIn(ALLQ).length;
    view.appendChild(btn("bigbtn ghost", `Review all misses · ${m}`, () => start("review", shuffle(missedIn(ALLQ)), { from:"ex" }, false), m ? null : { disabled:"" }));
    view.appendChild(el("div", "grid-label", "Papers"));
    const g = el("div", "grid");
    PAPERS.forEach(([code, name]) => {
      const s = subjectByCode(code);
      if(!s) return;
      const st = stats(qsOf(s));
      const pct = st.a ? Math.round(100*st.ok/st.a) : 0;
      const ready = st.a === st.n && pct >= PASS;
      g.appendChild(card(code, st.a ? `${pct}% on ${st.a} tried` : `${st.n} questions`, s.name, Math.round(100*st.ok/st.n),
        ready ? "✓ Ready" : st.a ? `${st.ok} / ${st.n} right` : "Not started", ready,
        () => { push({ st:"exs", s:s.id }); renderExamSubject(s); }));
    });
    view.appendChild(g);
  }
  function renderExamSubject(s){
    sess = null;
    enter("ex", "sub");
    const qs = qsOf(s), st = stats(qs);
    title(s.name, `Exams · paper ${s.code}`);
    view.innerHTML = "";
    const w = el("div", "topic");
    w.appendChild(el("div", "stat", st.a
      ? `<b>${st.a}</b> of ${st.n} tried · <b>${Math.round(100*st.ok/st.a)}%</b> right on last attempt · pass mark ${PASS}%`
      : `${st.n} questions · pass mark ${PASS}%`));
    const row = el("div", "row2");
    const n = Math.min(MOCK_N, qs.filter(x => typeOf(x.q) === "mc").length);
    row.appendChild(btn("cont", `<span class="ct"><span class="k">Mock paper</span><div class="n">${n} random ${esc(s.name)} questions</div><div class="x">Multiple choice, like the real paper · marked at the end against ${PASS}%</div></span><span class="arrow">›</span>`,
      () => start("mock", shuffle(qs.filter(x => typeOf(x.q) === "mc").map(x => x.id)).slice(0, n), { s:s.id, from:"ex" }, false)));
    const m = missedIn(qs).length;
    row.appendChild(btn("bigbtn ghost", `Review misses · ${m}`, () => start("review", shuffle(missedIn(qs)), { s:s.id, from:"ex" }, false), m ? null : { disabled:"" }));
    w.appendChild(row);
    w.appendChild(el("div", "grid-label", "Practise by topic"));
    const g = el("div", "grid");
    s.topics.forEach((t, idx) => {
      const ts = stats(qsOfTopic(s,t));
      g.appendChild(card(String(idx+1).padStart(2,"0"), t.ref, t.title, Math.round(100*ts.ok/ts.n),
        ts.ok === ts.n ? "✓ All right" : ts.a ? `${ts.ok} / ${ts.n} right` : `${ts.n} questions`, ts.ok === ts.n,
        () => start("topic", shuffle(qsOfTopic(s,t).map(x => x.id)), { s:s.id, t:t.id, from:"ex" }, false)));
    });
    w.appendChild(g);
    w.appendChild(btn("bigbtn ghost", `Read the ${s.name} notes ›`, () => { replace({ st:"trs", s:s.id }); renderTrainingSubject(s); }));
    view.appendChild(w);
  }

  // ---------- questions ----------
  // Question types: multiple choice (default, o: answers with the correct one first),
  // "calc" (typed number; fixed a/tol/unit/steps or gen() returning fresh numbers each time),
  // "order" (items listed in the correct order) and "match" (pairs [left, right]).
  const typeOf = q => q.type || "mc";
  function start(kind, ids, ctx, replaceEntry){
    if(kind === "mock") ids = ids.filter(id => typeOf(byQ[id].q) === "mc");   // mocks mirror the real multiple-choice paper
    if(!ids.length) return;
    sess = { kind, ids, i:0, log:[], cur:null, ctx };
    nextQ();
    (replaceEntry ? replace : push)({ st:"q" });
    renderQ();
  }
  function nextQ(){
    const id = sess.ids[sess.i], q = byQ[id].q, type = typeOf(q);
    const cur = { id, type, done:false, ok:false };
    if(type === "mc"){ cur.text = q.q; cur.opts = shuffle(q.o.map((t,i) => ({ t, ok:i === 0 }))); cur.picked = null; cur.e = q.e; }
    if(type === "calc"){ const g = q.gen ? q.gen() : q; Object.assign(cur, { text:g.q, a:g.a, tol:g.tol || 0, unit:g.unit || "", steps:g.steps || [], e:g.e || q.e || "", neg:!!(g.neg || q.neg), val:"" }); }
    if(type === "order"){ cur.text = q.q; cur.items = q.items; cur.pool = shuffle(q.items.map((t,i) => i)); while(cur.pool.length > 1 && cur.pool.every((v,i) => v === i)) cur.pool = shuffle(cur.pool); cur.seq = []; cur.e = q.e; }
    if(type === "match"){ cur.text = q.q; cur.pairs = q.pairs; cur.right = shuffle(q.pairs.map((p,i) => i)); cur.sel = null; cur.map = {}; cur.e = q.e; }
    sess.cur = cur;
  }
  function sessLabel(){
    const s = sess.ctx.s && subjectById(sess.ctx.s);
    if(sess.kind === "mock") return `${s.name} mock`;
    if(sess.kind === "review") return s ? `${s.name} misses` : "All misses";
    return topicOf(s, sess.ctx.t).title;
  }
  const fmt = n => (Math.round(n * 100) / 100).toLocaleString("en-GB");
  function renderQ(){
    enter(sess.ctx.from, "quiz");
    const cur = sess.cur, x = byQ[cur.id];
    const tag = { mc:"", calc:"Work it out", order:"Put in order", match:"Match the pairs" }[cur.type];
    title(sessLabel(), `Question ${sess.i+1} of ${sess.ids.length}` + (sess.ctx.s ? "" : ` · ${x.s.name}`));
    hprogBar.style.width = (sess.i / sess.ids.length * 100) + "%";
    view.innerHTML = "";
    const w = el("div", "quiz");
    if(tag) w.appendChild(el("div", "qtag", tag));
    const q = el("p", "qtext"); q.textContent = cur.text; w.appendChild(q);
    ({ mc:drawMC, calc:drawCalc, order:drawOrder, match:drawMatch })[cur.type](w, cur);
    if(cur.done && sess.kind !== "mock"){
      const e = el("div", "expl " + (cur.ok ? "good" : "bad"), `<span class="v">${cur.ok ? "Correct" : "Not quite"}</span>`);
      if(cur.type === "calc"){
        e.innerHTML += `<div class="ans">Answer: <b>${fmt(cur.a)}${esc(cur.unit)}</b>${cur.tol ? ` <span class="tolnote">(within ${fmt(cur.tol)}${esc(cur.unit)} accepted)</span>` : ""}</div>`;
        if(cur.steps.length) e.innerHTML += `<ol class="steps">${cur.steps.map(st => `<li>${esc(st)}</li>`).join("")}</ol>`;
      }
      if(cur.e) e.appendChild(el("div", "", esc(cur.e)));
      e.setAttribute("role", "status");
      w.appendChild(e);
      w.appendChild(btn("bigbtn", sess.i >= sess.ids.length - 1 ? "See results ›" : "Next question ›", advance));
      setTimeout(() => e.scrollIntoView({ behavior:"smooth", block:"nearest" }), 0);
    }
    view.appendChild(w);
  }
  function finish(ok, yours, correct){
    const cur = sess.cur;
    cur.done = true; cur.ok = ok;
    sess.log.push({ id:cur.id, ok, text:cur.text, yours, correct, why:[cur.type === "calc" && cur.steps.length ? cur.steps.join(" ") : "", cur.e].filter(Boolean).join(" ") });
    rec(cur.id, ok);
    buzz();
    if(sess.kind === "mock") advance(); else renderQ();
  }

  // multiple choice
  function drawMC(w, cur){
    const opts = el("div", "opts");
    const shown = cur.done && sess.kind !== "mock";
    cur.opts.forEach((o,k) => {
      let cls = "opt";
      if(shown){ if(o.ok) cls += " ok"; else if(k === cur.picked) cls += " no"; }
      opts.appendChild(btn(cls, `<span class="l">${"ABCD"[k]}</span><span class="ot">${esc(o.t)}</span>`, () => {
        if(cur.done) return;
        cur.picked = k;
        finish(o.ok, o.t, cur.opts.find(z => z.ok).t);
      }, shown ? { disabled:"" } : null));
    });
    w.appendChild(opts);
  }

  // typed calculation
  function drawCalc(w, cur){
    const row = el("div", "calcrow");
    const inp = document.createElement("input");
    inp.type = "text"; inp.inputMode = cur.neg ? "text" : "decimal"; inp.id = "calcIn"; inp.className = "calcin";
    inp.setAttribute("aria-label", "Your answer"); inp.autocomplete = "off"; inp.value = cur.val;
    if(cur.done){ inp.disabled = true; row.classList.add(cur.ok ? "ok" : "no"); }
    row.appendChild(inp);
    if(cur.unit) row.appendChild(el("span", "unit", esc(cur.unit.trim())));
    w.appendChild(row);
    if(cur.done) return;
    const msg = el("div", "calcmsg");
    const go = () => {
      const v = parseFloat(String(inp.value).replace(/[\u2212\u2013]/g, "-").replace(/,/g, "").replace(/[^0-9.\-]/g, ""));
      if(isNaN(v)){ msg.textContent = "Type a number first."; return; }
      cur.val = inp.value;
      finish(Math.abs(v - cur.a) <= cur.tol + 1e-9, fmt(v) + cur.unit, fmt(cur.a) + cur.unit);
    };
    inp.addEventListener("keydown", e => { if(e.key === "Enter") go(); });
    w.appendChild(msg);
    w.appendChild(btn("bigbtn", "Check answer", go));
    setTimeout(() => { try{ inp.focus({ preventScroll:true }); }catch(e){} }, 50);
  }

  // put in order: tap items from the pool to build the sequence
  function drawOrder(w, cur){
    const ans = el("ol", "seq");
    const shown = cur.done && sess.kind !== "mock";
    cur.seq.forEach((idx, pos) => {
      const li = el("li");
      const b = btn("chip placed" + (shown ? (idx === pos ? " ok" : " no") : ""), `<span class="cn">${pos+1}</span><span>${esc(cur.items[idx])}</span>`,
        () => { if(cur.done) return; cur.seq.splice(pos, 1); cur.pool.push(idx); renderQ(); }, shown ? { disabled:"" } : null);
      li.appendChild(b); ans.appendChild(li);
    });
    for(let k = cur.seq.length; k < cur.items.length; k++) ans.appendChild(el("li", "slot", `<span class="cn">${k+1}</span>`));
    w.appendChild(el("div", "zlabel", cur.done ? "Your order" : "Your order · tap an item to send it back"));
    w.appendChild(ans);
    if(shown && !cur.ok){
      w.appendChild(el("div", "zlabel", "Correct order"));
      w.appendChild(el("ol", "seq right", cur.items.map((t,i) => `<li><span class="chip ok"><span class="cn">${i+1}</span><span>${esc(t)}</span></span></li>`).join("")));
    }
    if(cur.done) return;
    w.appendChild(el("div", "zlabel", "Tap in order"));
    const pool = el("div", "pool");
    cur.pool.forEach((idx, k) => pool.appendChild(btn("chip", esc(cur.items[idx]), () => { cur.pool.splice(k, 1); cur.seq.push(idx); renderQ(); })));
    w.appendChild(pool);
    const full = cur.seq.length === cur.items.length;
    w.appendChild(btn("bigbtn", full ? "Check order" : `Place all ${cur.items.length} items`, () => {
      const ok = cur.seq.every((v,i) => v === i);
      finish(ok, cur.seq.map(i => cur.items[i]).join(" → "), cur.items.join(" → "));
    }, full ? null : { disabled:"" }));
  }

  // match: tap a numbered item, then the answer that goes with it
  function drawMatch(w, cur){
    const shown = cur.done && sess.kind !== "mock";
    if(!cur.done && cur.sel == null && Object.keys(cur.map).length < cur.pairs.length) cur.sel = cur.pairs.findIndex((p,i) => cur.map[i] == null);
    const used = {}; Object.entries(cur.map).forEach(([l, r]) => used[r] = +l);
    w.appendChild(el("div", "zlabel", cur.done ? "Your pairs" : "Tap a numbered item, then its match"));
    const L = el("div", "mcol");
    cur.pairs.forEach((p, i) => {
      const paired = cur.map[i] != null;
      let cls = "chip left" + (cur.sel === i ? " sel" : "") + (paired ? " paired" : "");
      if(shown) cls += cur.map[i] === i ? " ok" : " no";
      L.appendChild(btn(cls, `<span class="cn">${i+1}</span><span>${esc(p[0])}</span>` + (shown && cur.map[i] !== i ? `<span class="fix">→ ${esc(p[1])}</span>` : ""),
        () => { if(cur.done) return; if(paired){ delete cur.map[i]; cur.sel = i; } else cur.sel = cur.sel === i ? null : i; renderQ(); }, shown ? { disabled:"" } : null));
    });
    w.appendChild(L);
    const R = el("div", "mcol right");
    cur.right.forEach(ri => {
      const owner = used[ri];
      let cls = "chip" + (owner != null ? " paired" : "");
      R.appendChild(btn(cls, (owner != null ? `<span class="cn">${owner+1}</span>` : `<span class="cn empty"></span>`) + `<span>${esc(cur.pairs[ri][1])}</span>`, () => {
        if(cur.done) return;
        if(owner != null){ delete cur.map[owner]; renderQ(); return; }
        if(cur.sel == null){ return; }
        cur.map[cur.sel] = ri;
        const next = cur.pairs.findIndex((p,i) => cur.map[i] == null);
        cur.sel = next >= 0 ? next : null;
        renderQ();
      }, shown ? { disabled:"" } : null));
    });
    w.appendChild(R);
    if(cur.done) return;
    const full = Object.keys(cur.map).length === cur.pairs.length;
    w.appendChild(btn("bigbtn", full ? "Check pairs" : `Pair all ${cur.pairs.length} items`, () => {
      const ok = cur.pairs.every((p,i) => cur.map[i] === i);
      finish(ok, cur.pairs.map((p,i) => `${p[0]} → ${cur.pairs[cur.map[i]][1]}`).join("; "), cur.pairs.map(p => `${p[0]} → ${p[1]}`).join("; "));
    }, full ? null : { disabled:"" }));
  }

  function advance(){
    sess.i++;
    if(sess.i >= sess.ids.length){ replace({ st:"res" }); renderResult(); }
    else { nextQ(); renderQ(); }
  }

  // ---------- results ----------
  function renderResult(){
    enter(sess.ctx.from, "sub");
    const n = sess.log.length, right = sess.log.filter(l => l.ok).length;
    const pct = n ? Math.round(100 * right / n) : 0;
    title(sessLabel(), "Results");
    view.innerHTML = "";
    const w = el("div", "quiz");
    w.appendChild(el("div", "score", `<span class="n">${right}/${n}</span><span class="p">${pct}%</span>` +
      (sess.kind === "mock" ? `<span class="pill ${pct >= PASS ? "good" : "bad"}">${pct >= PASS ? "Above" : "Below"} the ${PASS}% pass mark</span>` : "")));
    const wrong = sess.log.filter(l => !l.ok);
    w.appendChild(label(wrong.length ? "Missed, with the reasoning" : "Every question right", !!wrong.length));
    wrong.forEach(l => {
      w.appendChild(el("div", "miss",
        `<div class="mq">${esc(l.text)}</div>`+
        `<div class="ma y"><b>You said</b>${esc(l.yours)}</div>`+
        `<div class="ma c"><b>Correct</b>${esc(l.correct)}</div>`+
        (l.why ? `<div class="why">${esc(l.why)}</div>` : "")));
    });
    const ctx = sess.ctx;
    if(wrong.length) w.appendChild(btn("bigbtn", `Retry the ${wrong.length} missed`, () => start("review", shuffle(wrong.map(l => l.id)), { s:ctx.s, from:ctx.from }, true)));
    if(sess.kind === "mock"){
      const s = subjectById(ctx.s), qs = qsOf(s).filter(x => typeOf(x.q) === "mc");
      w.appendChild(btn("bigbtn" + (wrong.length ? " ghost" : ""), "Another mock paper",
        () => start("mock", shuffle(qs.map(x => x.id)).slice(0, Math.min(MOCK_N, qs.length)), ctx, true)));
    }
    w.appendChild(btn("bigbtn ghost", "Done", back));
    view.appendChild(w);
  }

  // ---------- navigation ----------
  function back(){
    const s = history.state && history.state.st;
    if(s && s !== "tr" && s !== "ex"){ try{ history.back(); return; }catch(e){} }
    section === "ex" ? renderExamHome() : renderTrainingHome();
  }
  // Called from popstate with a study history entry
  function fromState(st){
    const s = st.s && subjectById(st.s);
    if(st.st === "trs" && s) return renderTrainingSubject(s);
    if(st.st === "trt" && s && topicOf(s, st.t)) return renderTrainingTopic(s, topicOf(s, st.t));
    if(st.st === "exs" && s) return renderExamSubject(s);
    if(st.st === "q" && sess) return renderQ();
    if(st.st === "res" && sess) return renderResult();
    if(st.st === "ex") return renderExamHome();
    renderTrainingHome();
  }
  function showTraining(){ replace({ st:"tr" }); renderTrainingHome(); }
  function showExams(){ replace({ st:"ex" }); renderExamHome(); }

  load();
  function openTopic(sid, tid){
    const s = subjectById(sid), t = s && topicOf(s, tid);
    if(!t) return;
    push({ st:"trt", s:sid, t:tid }); renderTrainingTopic(s, t);
  }
  return { showTraining, showExams, fromState, back, reset, openTopic };
})();
