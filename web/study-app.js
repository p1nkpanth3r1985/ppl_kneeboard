
// =====================================================================
// Air Law study section
// Runs beside the checklist and shares only the header, the settings sheet
// and the display mode. Its progress has its own storage key.
// =====================================================================
const Study = (() => {
  const SKEY = "ppl-air-law-v1";
  const PASS = 75, MOCK_N = 20;
  const view = $("studyView");
  let store = { ans:{} };
  let sess = null;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const qid = (t,i) => t.id + "-" + (i+1);
  const ALLQ = [];
  TOPICS.forEach(t => t.qs.forEach((q,i) => ALLQ.push({ id:qid(t,i), topic:t, q })));
  const byQ = {}; ALLQ.forEach(x => byQ[x.id] = x);
  const topicById = id => TOPICS.find(t => t.id === id);
  const shuffle = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

  function load(){ try{ const s = JSON.parse(localStorage.getItem(SKEY) || "null"); if(s && s.ans) store = s; }catch(e){} }
  function save(){ try{ localStorage.setItem(SKEY, JSON.stringify(store)); }catch(e){} }
  function rec(id, ok){ const p = store.ans[id] || { n:0, c:0 }; store.ans[id] = { n:p.n+1, c:p.c+(ok?1:0), ok, t:Date.now() }; save(); }
  function reset(){ store = { ans:{} }; save(); }

  function tStats(t){ let a=0, ok=0; t.qs.forEach((q,i) => { const r = store.ans[qid(t,i)]; if(r){ a++; if(r.ok) ok++; } }); return { a, ok, n:t.qs.length }; }
  function overall(){ let a=0, ok=0; ALLQ.forEach(x => { const r = store.ans[x.id]; if(r){ a++; if(r.ok) ok++; } }); return { a, ok, n:ALLQ.length }; }
  const missed = () => ALLQ.filter(x => store.ans[x.id] && !store.ans[x.id].ok).map(x => x.id);

  // ---------- screen chrome ----------
  function enter(kind){
    // kind: "top" | "sub" | "quiz"
    section = "st";
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
  function btn(cls, html, fn, attrs){
    const b = document.createElement("button");
    b.className = cls; b.innerHTML = html;
    if(attrs) Object.entries(attrs).forEach(([k,v]) => b.setAttribute(k, v));
    b.addEventListener("click", fn);
    return b;
  }

  // ---------- home ----------
  function renderHome(){
    sess = null;
    enter("top");
    const o = overall();
    title("PPL Air Law", `CAA syllabus 010 · ${ALLQ.length} questions`);
    view.innerHTML = "";

    const cav = document.createElement("div");
    cav.className = "caveat";
    cav.textContent = "Study notes and original practice questions — not the CAA question bank";
    view.appendChild(cav);

    const st = document.createElement("div");
    st.className = "stat";
    const pct = o.a ? Math.round(100 * o.ok / o.a) : 0;
    st.innerHTML = o.a ? `<b>${o.a}</b> of ${o.n} questions tried · <b>${pct}%</b> right on last attempt · pass mark ${PASS}%`
                       : `${o.n} questions across ${TOPICS.length} topics · pass mark ${PASS}%`;
    view.appendChild(st);

    const row = document.createElement("div"); row.className = "row2";
    row.appendChild(btn("cont", `<span class="ct"><span class="k">Mock paper</span><div class="n">${MOCK_N} random questions</div><div class="x">Marked at the end against ${PASS}%</div></span><span class="arrow">›</span>`,
      () => start("mock", shuffle(ALLQ.map(x => x.id)).slice(0, MOCK_N), null, false)));
    const m = missed().length;
    row.appendChild(btn("bigbtn ghost", `Review misses · ${m}`, () => start("review", shuffle(missed()), null, false), m ? null : { disabled:"" }));
    view.appendChild(row);

    view.appendChild(label("Topics", false));
    const g = document.createElement("div"); g.className = "grid";
    TOPICS.forEach((t, idx) => {
      const s = tStats(t);
      const done = s.ok === s.n;
      const b = btn("pbtn" + (done ? " done" : ""),
        `<span class="pnum">${String(idx+1).padStart(2,"0")}</span>`+
        `<span><span class="pref">${esc(t.ref)}</span><span class="pname" style="display:block">${esc(t.title)}</span></span>`+
        `<span class="pbar"><i style="width:${Math.round(100*s.ok/s.n)}%"></i></span>`+
        `<span class="pcount">${done ? "✓ All right" : s.a ? s.ok + " / " + s.n + " right" : s.n + " questions"}</span>`,
        () => openTopic(t));
      g.appendChild(b);
    });
    view.appendChild(g);
  }

  // ---------- topic notes ----------
  function renderTopic(t){
    sess = null;
    enter("sub");
    const s = tStats(t);
    title(t.title, `Air Law · ${t.ref}`);
    view.innerHTML = "";
    const wrap = document.createElement("div"); wrap.className = "topic";
    const lede = document.createElement("p"); lede.className = "lede"; lede.textContent = t.blurb;
    wrap.appendChild(lede);
    const card = document.createElement("div"); card.className = "card";
    card.innerHTML = `<div class="learn">${t.learn()}</div>`;
    wrap.appendChild(card);
    wrap.appendChild(btn("bigbtn", `Practise this topic · ${t.qs.length} questions${s.a ? " (" + s.ok + " right so far)" : ""}`,
      () => start("topic", shuffle(t.qs.map((q,i) => qid(t,i))), t.id, false)));
    view.appendChild(wrap);
  }

  // ---------- questions ----------
  function start(kind, ids, topicId, replace){
    if(!ids.length) return;
    sess = { kind, ids, i:0, log:[], cur:null, picked:null, topic:topicId };
    nextQ();
    try{ history[replace ? "replaceState" : "pushState"]({ st:"q" }, ""); }catch(e){}
    renderQ();
  }
  function nextQ(){
    const id = sess.ids[sess.i], x = byQ[id];
    sess.cur = { id, opts:shuffle(x.q.o.map((t,i) => ({ t, ok:i === 0 }))) };
    sess.picked = null;
  }
  function sessLabel(){ return sess.kind === "mock" ? "Mock paper" : sess.kind === "review" ? "Review misses" : topicById(sess.topic).title; }
  function renderQ(){
    enter("quiz");
    const x = byQ[sess.cur.id], mock = sess.kind === "mock", picked = sess.picked;
    title(sessLabel(), `Question ${sess.i+1} of ${sess.ids.length}`);
    hprogBar.style.width = (sess.i / sess.ids.length * 100) + "%";
    view.innerHTML = "";
    const w = document.createElement("div"); w.className = "quiz";
    const q = document.createElement("p"); q.className = "qtext"; q.textContent = x.q.q;
    w.appendChild(q);
    const opts = document.createElement("div"); opts.className = "opts";
    const answered = !mock && picked !== null;
    sess.cur.opts.forEach((o,k) => {
      let cls = "opt";
      if(answered){ if(o.ok) cls += " ok"; else if(k === picked) cls += " no"; }
      opts.appendChild(btn(cls, `<span class="l">${"ABCD"[k]}</span><span class="ot">${esc(o.t)}</span>`, () => pick(k), answered ? { disabled:"" } : null));
    });
    w.appendChild(opts);
    if(answered){
      const ok = sess.cur.opts[picked].ok;
      const e = document.createElement("div");
      e.className = "expl " + (ok ? "good" : "bad"); e.setAttribute("role","status");
      e.innerHTML = `<span class="v">${ok ? "Correct" : "Not quite"}</span>${esc(x.q.e)}`;
      w.appendChild(e);
      const last = sess.i >= sess.ids.length - 1;
      const nb = btn("bigbtn", last ? "See results ›" : "Next question ›", advance);
      w.appendChild(nb);
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
    if(sess.i >= sess.ids.length){
      try{ history.replaceState({ st:"res" }, ""); }catch(e){}
      renderResult();
    } else { nextQ(); renderQ(); }
  }

  // ---------- results ----------
  function renderResult(){
    enter("sub");
    const n = sess.log.length, right = sess.log.filter(l => l.ok).length;
    const pct = n ? Math.round(100 * right / n) : 0;
    title(sessLabel(), "Results");
    view.innerHTML = "";
    const w = document.createElement("div"); w.className = "quiz";
    const sc = document.createElement("div"); sc.className = "score";
    sc.innerHTML = `<span class="n">${right}/${n}</span><span class="p">${pct}%</span>` +
      (sess.kind === "mock" ? `<span class="pill ${pct >= PASS ? "good" : "bad"}">${pct >= PASS ? "Above" : "Below"} the ${PASS}% pass mark</span>` : "");
    w.appendChild(sc);
    const wrong = sess.log.filter(l => !l.ok);
    w.appendChild(label(wrong.length ? "Missed, with the reasoning" : "Every question right", !!wrong.length));
    wrong.forEach(l => {
      const x = byQ[l.id], d = document.createElement("div");
      d.className = "miss";
      d.innerHTML = `<div class="mq">${esc(x.q.q)}</div>`+
        `<div class="ma y"><b>You said</b>${esc(l.opts[l.k].t)}</div>`+
        `<div class="ma c"><b>Correct</b>${esc(l.opts.find(o => o.ok).t)}</div>`+
        `<div class="why">${esc(x.q.e)}</div>`;
      w.appendChild(d);
    });
    if(wrong.length) w.appendChild(btn("bigbtn", `Retry the ${wrong.length} missed`, () => start("review", shuffle(wrong.map(l => l.id)), null, true)));
    if(sess.kind === "mock") w.appendChild(btn("bigbtn" + (wrong.length ? " ghost" : ""), "Another mock paper", () => start("mock", shuffle(ALLQ.map(x => x.id)).slice(0, MOCK_N), null, true)));
    w.appendChild(btn("bigbtn ghost", sess.kind === "topic" ? "Back to the notes" : "Back to topics", back));
    view.appendChild(w);
  }

  // ---------- navigation ----------
  function openTopic(t){
    try{ history.pushState({ st:"tp", tp:t.id }, ""); }catch(e){}
    renderTopic(t);
  }
  function back(){
    if(history.state && history.state.st && history.state.st !== "home"){ try{ history.back(); return; }catch(e){} }
    renderHome();
  }
  // Called from popstate with a study history entry
  function fromState(s){
    if(s.st === "tp" && topicById(s.tp)) return renderTopic(topicById(s.tp));
    if(s.st === "q" && sess) return renderQ();
    if(s.st === "res" && sess) return renderResult();
    renderHome();
  }
  function showHome(){
    try{ history.replaceState({ st:"home" }, ""); }catch(e){}
    renderHome();
  }

  load();
  return { showHome, renderHome, fromState, back, reset, hasProgress:() => overall().a > 0 };
})();
