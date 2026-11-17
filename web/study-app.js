
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
  function rec(id, ok){ const p = store.ans[id] || { n:0, c:0 }; store.ans[id] = { n:p.n+1, c:p.c+(ok?1:0), ok, t:Date.now() }; save(); }
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
    w.appendChild(el("div", "card", `<div class="learn">${t.learn()}</div>`));
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
    const n = Math.min(MOCK_N, qs.length);
    row.appendChild(btn("cont", `<span class="ct"><span class="k">Mock paper</span><div class="n">${n} random ${esc(s.name)} questions</div><div class="x">Marked at the end against ${PASS}%</div></span><span class="arrow">›</span>`,
      () => start("mock", shuffle(qs.map(x => x.id)).slice(0, n), { s:s.id, from:"ex" }, false)));
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
  function start(kind, ids, ctx, replaceEntry){
    if(!ids.length) return;
    sess = { kind, ids, i:0, log:[], cur:null, picked:null, ctx };
    nextQ();
    (replaceEntry ? replace : push)({ st:"q" });
    renderQ();
  }
  function nextQ(){
    const id = sess.ids[sess.i], x = byQ[id];
    sess.cur = { id, opts:shuffle(x.q.o.map((t,i) => ({ t, ok:i === 0 }))) };
    sess.picked = null;
  }
  function sessLabel(){
    const s = sess.ctx.s && subjectById(sess.ctx.s);
    if(sess.kind === "mock") return `${s.name} mock`;
    if(sess.kind === "review") return s ? `${s.name} misses` : "All misses";
    return topicOf(s, sess.ctx.t).title;
  }
  function renderQ(){
    enter(sess.ctx.from, "quiz");
    const x = byQ[sess.cur.id], mock = sess.kind === "mock", picked = sess.picked;
    title(sessLabel(), `Question ${sess.i+1} of ${sess.ids.length}` + (sess.ctx.s ? "" : ` · ${x.s.name}`));
    hprogBar.style.width = (sess.i / sess.ids.length * 100) + "%";
    view.innerHTML = "";
    const w = el("div", "quiz");
    const q = el("p", "qtext"); q.textContent = x.q.q; w.appendChild(q);
    const opts = el("div", "opts");
    const answered = !mock && picked !== null;
    sess.cur.opts.forEach((o,k) => {
      let cls = "opt";
      if(answered){ if(o.ok) cls += " ok"; else if(k === picked) cls += " no"; }
      opts.appendChild(btn(cls, `<span class="l">${"ABCD"[k]}</span><span class="ot">${esc(o.t)}</span>`, () => pick(k), answered ? { disabled:"" } : null));
    });
    w.appendChild(opts);
    if(answered){
      const ok = sess.cur.opts[picked].ok;
      const e = el("div", "expl " + (ok ? "good" : "bad"), `<span class="v">${ok ? "Correct" : "Not quite"}</span>${esc(x.q.e)}`);
      e.setAttribute("role", "status");
      w.appendChild(e);
      w.appendChild(btn("bigbtn", sess.i >= sess.ids.length - 1 ? "See results ›" : "Next question ›", advance));
      setTimeout(() => e.scrollIntoView({ behavior:"smooth", block:"nearest" }), 0);
    }
    view.appendChild(w);
  }
  function pick(k){
    if(sess.picked !== null && sess.kind !== "mock") return;
    const o = sess.cur.opts[k];
    sess.picked = k;
    sess.log.push({ id:sess.cur.id, k, ok:o.ok, opts:sess.cur.opts });
    rec(sess.cur.id, o.ok);
    buzz();
    if(sess.kind === "mock") advance(); else renderQ();
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
      const x = byQ[l.id];
      w.appendChild(el("div", "miss",
        `<div class="mq">${esc(x.q.q)}</div>`+
        `<div class="ma y"><b>You said</b>${esc(l.opts[l.k].t)}</div>`+
        `<div class="ma c"><b>Correct</b>${esc(l.opts.find(o => o.ok).t)}</div>`+
        `<div class="why">${esc(x.q.e)}</div>`));
    });
    const ctx = sess.ctx;
    if(wrong.length) w.appendChild(btn("bigbtn", `Retry the ${wrong.length} missed`, () => start("review", shuffle(wrong.map(l => l.id)), { s:ctx.s, from:ctx.from }, true)));
    if(sess.kind === "mock"){
      const s = subjectById(ctx.s), qs = qsOf(s);
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
  return { showTraining, showExams, fromState, back, reset };
})();
