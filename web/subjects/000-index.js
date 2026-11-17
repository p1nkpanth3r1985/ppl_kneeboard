// Subjects register themselves here, one file each (subjects/NNN-name.js).
// Each multiple-choice question lists the correct answer first; the app shuffles them.
// Other question types: {type:"calc"}, {type:"order"}, {type:"match"} (see study-app.js).
const SUBJECTS = [];

// Later files (NNN-name-more.js) add questions and hands-on diagrams to existing topics.
// Each "try" entry is [widget name, heading]; the widget appears under "Try it" at the end of the notes.
function extendTopic(sid, tid, more){
  const s = SUBJECTS.find(x => x.id === sid), t = s && s.topics.find(x => x.id === tid);
  if(!t) throw new Error("extendTopic: no topic " + sid + "/" + tid);
  if(more.qs) t.qs.push(...more.qs);
  if(more.try){
    const old = t.learn;
    t.learn = () => old() + more.try.map(([w, h]) => `<div class="tryit"><div class="tryhead">Try it · ${h}</div><div class="widget" data-w="${w}"></div></div>`).join("");
  }
}
// Helpers for calculation questions with fresh numbers each time
const rnd = (a, b, step) => { step = step || 1; return a + step * Math.floor(Math.random() * (Math.floor((b - a) / step) + 1)); };
const pad3 = n => { n = ((Math.round(n) % 360) + 360) % 360; return String(n === 0 ? 360 : n).padStart(3, "0"); };
