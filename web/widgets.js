
// =====================================================================
// Hands-on diagrams for the Training notes.
// A topic's notes include <div class="widget" data-w="name"></div>; after the
// notes are drawn, mountWidgets() builds each one from WIDGETS[name].
// =====================================================================
const WIDGETS = {};
function mountWidgets(root){
  root.querySelectorAll(".widget[data-w]").forEach(el => {
    const f = WIDGETS[el.dataset.w];
    if(f){ try{ f(el); }catch(e){ el.textContent = "This diagram could not be drawn."; } }
  });
}

const W = (() => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;
  const norm = d => ((Math.round(d) % 360) + 360) % 360;
  const hdg = d => { const n = norm(d); return String(n === 0 ? 360 : n).padStart(3, "0"); };
  const r1 = n => Math.round(n * 10) / 10;
  let uid = 0;
  function slider(label, min, max, step, value, show, onInput){
    const id = "w" + (++uid);
    const d = document.createElement("div"); d.className = "wctl";
    d.innerHTML = `<label for="${id}"><span>${esc(label)}</span><b></b></label><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${value}">`;
    const inp = d.querySelector("input"), out = d.querySelector("b");
    const sync = () => { out.textContent = show(+inp.value); };
    inp.addEventListener("input", () => { sync(); onInput(); });
    sync();
    return { el:d, get:() => +inp.value, set:v => { inp.value = v; sync(); } };
  }
  function seg(options, value, onChange){
    const d = document.createElement("div"); d.className = "wseg";
    let cur = value;
    options.forEach(([v, lbl]) => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = lbl;
      if(v === cur) b.classList.add("on");
      b.addEventListener("click", () => { cur = v; d.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); onChange(v); });
      d.appendChild(b);
    });
    return { el:d, get:() => cur };
  }
  function outs(list){ return `<div class="wout">${list.map(([k,v,hl]) => `<div class="o${hl ? " hl" : ""}"><span class="k">${esc(k)}</span><span class="v">${esc(v)}</span></div>`).join("")}</div>`; }
  function box(cls, html){ const d = document.createElement("div"); if(cls) d.className = cls; if(html != null) d.innerHTML = html; return d; }
  function arrow(x1,y1,x2,y2,cls,width){ return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="ln ${cls||""}" style="stroke-width:${width||2.5}" marker-end="url(#arr)"/>`; }
  return { esc, rad, deg, norm, hdg, r1, slider, seg, outs, box, arrow };
})();

// ---------- Principles of Flight ----------
WIDGETS.loadfactor = root => {
  const pic = W.box("wsvg"), out = W.box(), msg = W.box("wmsg");
  const bank = W.slider("Angle of bank", 0, 75, 5, 30, v => v + "°", draw);
  const vs = W.slider("Stall speed, wings level", 40, 70, 1, 48, v => v + " kt", draw);
  const ctl = W.box("wgrid"); ctl.append(bank.el, vs.el);
  root.append(ctl, pic, out, msg);
  function draw(){
    const b = bank.get(), n = 1 / Math.cos(W.rad(b)), vst = vs.get() * Math.sqrt(n);
    const cx = 160, cy = 120, L = 34 * n, a = W.rad(b);
    const wx = Math.cos(a) * 80, wy = Math.sin(a) * 80;
    const lx = Math.sin(a) * L, ly = -Math.cos(a) * L;
    pic.innerHTML = `<svg viewBox="0 0 320 220" role="img" aria-label="Rear view of an aircraft banked at ${b} degrees with its lift tilted">
      <rect class="fb" x="1" y="1" width="318" height="218" rx="6"/>
      <line x1="20" y1="200" x2="300" y2="200" class="ln dot2"/><text class="tm" x="22" y="194">horizon</text>
      <line x1="${cx-wx}" y1="${cy-wy}" x2="${cx+wx}" y2="${cy+wy}" class="ln" style="stroke-width:5"/>
      <circle cx="${cx}" cy="${cy}" r="10" class="f-card ln"/>
      ${W.arrow(cx, cy, cx+lx, cy+ly, "pa", 3)}
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-34}" class="ln dash"/>
      ${W.arrow(cx, cy+12, cx, cy+46, "", 3)}
      <text class="tb" x="16" y="24">LIFT = ${n.toFixed(2)} × WEIGHT</text><text class="tm" x="16" y="38">rear view, banked right</text>
      <text class="tb" x="${cx-8}" y="${cy+52}" text-anchor="end">WEIGHT</text>
    </svg>`;
    out.innerHTML = W.outs([["Load factor", n.toFixed(2) + " g", true], ["Stall speed now", Math.round(vst) + " kt", true], ["Lift needed", "+" + Math.round((n - 1) * 100) + "%"]]);
    msg.textContent = b === 0 ? "Wings level: lift equals weight, load factor 1." :
      `At ${b}° of bank the wing must make ${n.toFixed(2)} times the aircraft's weight in lift to hold height, so it reaches the critical angle ${Math.round(vst - vs.get())} kt sooner.`;
    msg.className = "wmsg" + (b >= 60 ? " warn" : "");
  }
  draw();
};

WIDGETS.liftspeed = root => {
  const out = W.box(), msg = W.box("wmsg"), pic = W.box("wsvg");
  const v = W.slider("Airspeed (same angle of attack)", 35, 140, 5, 70, x => x + " kt", draw);
  root.append(v.el, pic, out, msg);
  function draw(){
    const r = Math.pow(v.get() / 70, 2), h = Math.min(r, 4) * 40;
    pic.innerHTML = `<svg viewBox="0 0 320 190" role="img" aria-label="Bar showing lift compared with lift at 70 knots">
      <rect class="fb" x="1" y="1" width="318" height="188" rx="6"/>
      <line x1="40" y1="170" x2="300" y2="170" class="ln"/>
      <rect x="70" y="${170-40}" width="60" height="40" class="f-tint ln"/><text class="tm" x="100" y="184" text-anchor="middle">70 kt</text>
      <rect x="190" y="${170-h}" width="60" height="${h}" class="f-mag ln"/><text class="tm" x="220" y="184" text-anchor="middle">${v.get()} kt</text>
      <text class="tb" x="220" y="${Math.max(16, 162-h)}" text-anchor="middle">${r.toFixed(2)}×</text>
    </svg>`;
    out.innerHTML = W.outs([["Speed ratio", (v.get()/70).toFixed(2) + "×"], ["Lift ratio (speed²)", r.toFixed(2) + "×", true]]);
    msg.textContent = "Lift goes with the square of speed: double the speed and, at the same angle of attack, lift is four times as great. To hold height when faster, you lower the nose to reduce the angle of attack.";
  }
  draw();
};

WIDGETS.dragspeed = root => {
  const out = W.box(), msg = W.box("wmsg"), pic = W.box("wsvg");
  const v = W.slider("Airspeed, as a percentage of Vmd", 50, 200, 5, 100, x => x + "%", draw);
  root.append(v.el, pic, out, msg);
  function draw(){
    const s = v.get() / 100, i = 1 / (s*s), p = s*s, t = i + p, sc = 26;
    const bar = (x, val, cls, lab) => `<rect x="${x}" y="${170 - Math.min(val, 6.2)*sc}" width="56" height="${Math.min(val, 6.2)*sc}" class="${cls} ln"/><text class="tm" x="${x+28}" y="184" text-anchor="middle">${lab}</text><text class="tb" x="${x+28}" y="${Math.max(14, 162 - Math.min(val, 6.2)*sc)}" text-anchor="middle">${val.toFixed(2)}</text>`;
    pic.innerHTML = `<svg viewBox="0 0 320 190" role="img" aria-label="Bars for induced, parasite and total drag at this speed">
      <rect class="fb" x="1" y="1" width="318" height="188" rx="6"/><line x1="20" y1="170" x2="300" y2="170" class="ln"/>
      <line x1="20" y1="${170-2*sc}" x2="300" y2="${170-2*sc}" class="ln dot2"/><text class="tm" x="300" y="${166-2*sc}" text-anchor="end">least total drag</text>
      ${bar(40, i, "f-mag", "induced")}${bar(132, p, "f-tint", "parasite")}${bar(224, t, "f-card", "total")}
    </svg>`;
    out.innerHTML = W.outs([["Induced", i.toFixed(2)], ["Parasite", p.toFixed(2)], ["Total drag", t.toFixed(2), true]]);
    msg.textContent = s < 0.98 ? "Below Vmd: induced drag dominates. Slowing down further increases total drag, so you need more power to fly slower." :
      s > 1.02 ? "Above Vmd: parasite drag dominates and grows with the square of speed." :
      "At Vmd induced and parasite drag are equal and total drag is at its minimum.";
  }
  draw();
};

// ---------- Meteorology ----------
WIDGETS.altimeter = root => {
  const out = W.box(), msg = W.box("wmsg"), pic = W.box("wsvg");
  const ind = W.slider("Altimeter reads", 500, 5000, 100, 2000, v => v.toLocaleString("en-GB") + " ft", draw);
  const set = W.slider("Subscale set to", 980, 1040, 1, 1013, v => v + " hPa", draw);
  const act = W.slider("Actual QNH where you are", 980, 1040, 1, 1003, v => v + " hPa", draw);
  const ctl = W.box("wgrid"); ctl.append(ind.el, set.el, act.el);
  root.append(ctl, pic, out, msg);
  function draw(){
    const err = (act.get() - set.get()) * 30, tru = ind.get() + err, sc = 0.03;
    pic.innerHTML = `<svg viewBox="0 0 320 200" role="img" aria-label="Indicated and true altitude compared">
      <rect class="fb" x="1" y="1" width="318" height="198" rx="6"/>
      <rect class="f-ground" x="10" y="180" width="300" height="10"/><text class="tm" x="14" y="176">mean sea level</text>
      <line x1="20" y1="${180-ind.get()*sc}" x2="300" y2="${180-ind.get()*sc}" class="ln dash"/><text class="t" x="300" y="${176-ind.get()*sc}" text-anchor="end">what the altimeter says</text>
      ${`<use href="#ac" class="ac-b" transform="translate(150 ${(180-tru*sc).toFixed(1)}) rotate(90) scale(1.3)"/>`}
      <text class="tb" x="172" y="${(184-tru*sc).toFixed(1)}">you are here</text>
    </svg>`;
    out.innerHTML = W.outs([["Error", (err >= 0 ? "+" : "") + err + " ft"], ["True altitude", Math.round(tru).toLocaleString("en-GB") + " ft", true]]);
    msg.className = "wmsg" + (err < 0 ? " warn" : "");
    msg.textContent = err === 0 ? "Subscale matches the local QNH: the altimeter reads correctly." :
      err < 0 ? `Pressure here is lower than the setting. You are ${-err} ft lower than the altimeter shows. High to low, look out below.` :
      `Pressure here is higher than the setting. You are ${err} ft higher than the altimeter shows.`;
  }
  draw();
};

WIDGETS.cloudbase = root => {
  const out = W.box(), msg = W.box("wmsg"), pic = W.box("wsvg");
  const t = W.slider("Surface temperature", -5, 30, 1, 15, v => v + " °C", () => { if(d.get() > t.get()) d.set(t.get()); draw(); });
  const d = W.slider("Dew point", -10, 30, 1, 9, v => v + " °C", () => { if(d.get() > t.get()) d.set(t.get()); draw(); });
  const ctl = W.box("wgrid"); ctl.append(t.el, d.el);
  root.append(ctl, pic, out, msg);
  function draw(){
    const spread = t.get() - d.get(), base = spread * 400, y = 180 - Math.min(base, 8000) / 8000 * 150;
    pic.innerHTML = `<svg viewBox="0 0 320 200" role="img" aria-label="Estimated cumulus cloud base">
      <rect class="fb" x="1" y="1" width="318" height="198" rx="6"/>
      <rect class="f-ground" x="10" y="180" width="300" height="10"/>
      ${[0,2000,4000,6000,8000].map(h => `<text class="tm" x="16" y="${184 - h/8000*150}">${h.toLocaleString("en-GB")}</text>`).join("")}
      ${base > 0 ? `<g class="f-card"><ellipse cx="170" cy="${y-10}" rx="40" ry="16" class="f-card ln"/><ellipse cx="205" cy="${y-18}" rx="32" ry="20" class="f-card ln"/><ellipse cx="240" cy="${y-8}" rx="30" ry="14" class="f-card ln"/></g><line x1="130" y1="${y}" x2="275" y2="${y}" class="ln pa" style="stroke-width:2.5"/>` : `<rect x="70" y="150" width="240" height="30" class="f-tint"/><text class="tb" x="190" y="170" text-anchor="middle">FOG / CLOUD ON THE GROUND</text>`}
    </svg>`;
    out.innerHTML = W.outs([["Spread", spread + " °C"], ["Cloud base", base > 0 ? base.toLocaleString("en-GB") + " ft" : "Surface", true]]);
    msg.textContent = `(temperature − dew point) × 400 = ${spread} × 400 = ${base.toLocaleString("en-GB")} ft above the surface. A small spread means high humidity, low cloud and a risk of fog and carburettor icing.`;
  }
  draw();
};

WIDGETS.metar = root => {
  const SAMPLES = [
    "METAR EGNT 171020Z 24012KT 9999 FEW030 SCT045 12/07 Q1009",
    "METAR EGPH 171050Z 27018G30KT 240V310 9999 -SHRA BKN022 09/04 Q0998",
    "METAR EGPD 170920Z VRB03KT 3000 BR OVC004 08/08 Q1011 TEMPO 1200 BR",
    "METAR EGCC 171420Z 21008KT CAVOK 18/09 Q1016 NOSIG",
    "METAR EGLL 170650Z 05004KT 0400 R27L/0600 FG VV001 06/06 Q1027"
  ];
  const WX = { MI:"shallow", BC:"patches of", PR:"partial", DR:"low drifting", BL:"blowing", SH:"showers of", TS:"thunderstorm with", FZ:"freezing",
    DZ:"drizzle", RA:"rain", SN:"snow", SG:"snow grains", PL:"ice pellets", GR:"hail", GS:"small hail", UP:"unknown precipitation",
    BR:"mist", FG:"fog", FU:"smoke", VA:"volcanic ash", DU:"dust", SA:"sand", HZ:"haze", PO:"dust whirls", SQ:"squalls", FC:"funnel cloud", SS:"sandstorm", DS:"duststorm" };
  const AMT = { FEW:"Few (1–2 oktas)", SCT:"Scattered (3–4 oktas)", BKN:"Broken (5–7 oktas)", OVC:"Overcast (8 oktas)" };
  const temp = s => (s[0] === "M" ? "−" + +s.slice(1) : +s) + " °C";
  function decode(g, i){
    let m;
    if(g === "METAR") return "Report type: routine actual weather (METAR).";
    if(g === "SPECI") return "Report type: special report, issued because conditions changed significantly.";
    if(i <= 1 && /^[A-Z]{4}$/.test(g)) return `Aerodrome: ICAO location indicator ${g}.`;
    if((m = g.match(/^(\d{2})(\d{2})(\d{2})Z$/))) return `Observed on day ${+m[1]} of the month at ${m[2]}:${m[3]} UTC.`;
    if(g === "AUTO") return "Automatic observation, no human observer.";
    if((m = g.match(/^(\d{3}|VRB)(\d{2,3})(?:G(\d{2,3}))?KT$/))) return (m[1] === "VRB" ? "Wind variable in direction" : `Wind from ${m[1]}° true`) + ` at ${+m[2]} kt` + (m[3] ? `, gusting ${+m[3]} kt` : "") + ".";
    if((m = g.match(/^(\d{3})V(\d{3})$/))) return `Wind direction varying between ${m[1]}° and ${m[2]}° true.`;
    if(g === "CAVOK") return "CAVOK: visibility 10 km or more, no cloud below 5,000 ft (or the highest MSA if higher), no CB or TCU, no significant weather.";
    if(g === "9999") return "Visibility 10 km or more.";
    if((m = g.match(/^(\d{4})$/))) return `Visibility ${(+m[1]).toLocaleString("en-GB")} m.` + (+m[1] < 1000 ? " Below 1,000 m: fog conditions." : "");
    if((m = g.match(/^R(\d{2}[LCR]?)\/([PM])?(\d{4})[UDN]?$/))) return `Runway visual range on runway ${m[1]}: ${m[2] === "P" ? "more than " : m[2] === "M" ? "less than " : ""}${+m[3]} m.`;
    if((m = g.match(/^(FEW|SCT|BKN|OVC)(\d{3})(CB|TCU)?$/))) return `${AMT[m[1]]} cloud, base ${(+m[2]*100).toLocaleString("en-GB")} ft above aerodrome level` + (m[3] === "CB" ? ", cumulonimbus." : m[3] === "TCU" ? ", towering cumulus." : ".");
    if((m = g.match(/^VV(\d{3})$/))) return `Sky obscured; vertical visibility ${(+m[1]*100)} ft.`;
    if(g === "NSC") return "No significant cloud.";
    if(g === "NCD") return "No cloud detected (automatic station).";
    if((m = g.match(/^(M?\d{2})\/(M?\d{2})$/))) return `Temperature ${temp(m[1])}, dew point ${temp(m[2])}.` + (m[1] === m[2] ? " Saturated: expect mist, fog or low cloud." : "");
    if((m = g.match(/^Q(\d{4})$/))) return `QNH ${+m[1]} hPa.`;
    if(g === "NOSIG") return "Trend: no significant change expected in the next 2 hours.";
    if(g === "TEMPO") return "Trend: temporarily, the following conditions.";
    if(g === "BECMG") return "Trend: becoming, a lasting change to the following.";
    if((m = g.match(/^(\+|-|VC)?((?:MI|BC|PR|DR|BL|SH|TS|FZ)?)((?:DZ|RA|SN|SG|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS)+)$/))){
      const parts = [];
      if(m[1] === "+") parts.push("heavy"); if(m[1] === "-") parts.push("light");
      if(m[2]) parts.push(WX[m[2]]);
      (m[3].match(/../g) || []).forEach(c => parts.push(WX[c]));
      return "Weather: " + parts.join(" ") + (m[1] === "VC" ? " in the vicinity" : "") + ".";
    }
    return "Not decoded here. Check the group in the Met Office or CAA guidance.";
  }
  let text = SAMPLES[0], sel = -1, seen = new Set();
  const pick = W.box("wseg");
  SAMPLES.forEach((s, k) => { const b = document.createElement("button"); b.type = "button"; b.textContent = s.split(" ")[1]; if(k === 0) b.classList.add("on");
    b.addEventListener("click", () => { pick.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); text = s; inp.value = s; sel = -1; seen = new Set(); draw(); }); pick.appendChild(b); });
  const inp = document.createElement("input"); inp.className = "wtext"; inp.value = text; inp.setAttribute("aria-label", "METAR to decode");
  inp.addEventListener("input", () => { text = inp.value.toUpperCase(); sel = -1; seen = new Set(); pick.querySelectorAll("button").forEach(x => x.classList.remove("on")); draw(); });
  const groups = W.box("groups"), msg = W.box("say");
  root.append(W.box("wmsg", "Pick a report, or paste one, then tap each group to decode it."), pick, inp, groups, msg);
  function draw(){
    const gs = text.trim().split(/\s+/).filter(Boolean);
    groups.innerHTML = "";
    gs.forEach((g, i) => { const b = document.createElement("button"); b.type = "button"; b.textContent = g;
      if(i === sel) b.classList.add("on"); else if(seen.has(i)) b.classList.add("seen");
      b.addEventListener("click", () => { sel = i; seen.add(i); draw(); }); groups.appendChild(b); });
    msg.innerHTML = sel >= 0 && gs[sel] ? `<small>${W.esc(gs[sel])}</small>${W.esc(decode(gs[sel], sel))}` : `<small>Decoded</small>Tap a group above. ${seen.size} of ${gs.length} decoded.`;
  }
  draw();
};

// ---------- Navigation ----------
WIDGETS.windtri = root => {
  const pic = W.box("wsvg"), out = W.box(), msg = W.box("wmsg");
  const tr = W.slider("Planned track", 0, 355, 5, 90, v => W.hdg(v) + "°", draw);
  const tas = W.slider("True airspeed", 60, 140, 5, 100, v => v + " kt", draw);
  const wd = W.slider("Wind from", 0, 350, 10, 30, v => W.hdg(v) + "°", draw);
  const ws = W.slider("Wind speed", 0, 40, 1, 20, v => v + " kt", draw);
  const ctl = W.box("wgrid"); ctl.append(tr.el, tas.el, wd.el, ws.el);
  root.append(ctl, pic, out, msg);
  function draw(){
    const T = tr.get(), V = tas.get(), D = wd.get(), S = ws.get();
    const wa = W.rad(D - T), xw = S * Math.sin(wa);
    const drift = W.deg(Math.asin(Math.max(-1, Math.min(1, xw / V))));
    const H = T + drift, gs = V * Math.cos(W.rad(drift)) - S * Math.cos(wa);
    // vectors in screen coordinates (north up)
    const vx = b => Math.sin(W.rad(b)), vy = b => -Math.cos(W.rad(b));
    const pts = [[0,0], [V*vx(H), V*vy(H)], [V*vx(H) + S*vx(D+180), V*vy(H) + S*vy(D+180)]];
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const w = Math.max(...xs) - Math.min(...xs) || 1, h = Math.max(...ys) - Math.min(...ys) || 1;
    const k = Math.min(260 / w, 170 / h, 1.6), ox = 170 - (Math.min(...xs) + w/2) * k, oy = 110 - (Math.min(...ys) + h/2) * k;
    const P = p => [ox + p[0]*k, oy + p[1]*k];
    const [a, b, c] = pts.map(P);
    pic.innerHTML = `<svg viewBox="0 0 340 230" role="img" aria-label="Wind triangle for these values">
      <rect class="fb" x="1" y="1" width="338" height="228" rx="6"/>
      <line x1="320" y1="40" x2="320" y2="14" class="ln" marker-end="url(#arr)"/><text class="tb" x="320" y="52" text-anchor="middle">N</text>
      ${W.arrow(a[0], a[1], b[0], b[1], "", 2.5)}
      ${S ? W.arrow(b[0], b[1], c[0], c[1], "pb", 2.5) : ""}
      ${W.arrow(a[0], a[1], c[0], c[1], "pa", 2.5)}
      <circle cx="${a[0]}" cy="${a[1]}" r="4" class="f-ink"/>
      <text class="t" x="${(a[0]+b[0])/2 + 6}" y="${(a[1]+b[1])/2 - 4}">heading ${W.hdg(H)}° / TAS</text>
      <text class="t" x="${(a[0]+c[0])/2 + 6}" y="${(a[1]+c[1])/2 + 14}">track ${W.hdg(T)}° / GS</text>
      ${S ? `<text class="t" x="${(b[0]+c[0])/2 + 6}" y="${(b[1]+c[1])/2}">wind</text>` : ""}
    </svg>`;
    out.innerHTML = W.outs([["Heading to fly", W.hdg(H) + "°", true], ["Drift", Math.abs(drift).toFixed(0) + "° " + (drift < -0.5 ? "right" : drift > 0.5 ? "left" : ""), false], ["Groundspeed", Math.round(gs) + " kt", true], ["Max drift (rule)", Math.round(S*60/V) + "°"]]);
    msg.textContent = S === 0 ? "No wind: heading equals track and groundspeed equals TAS." :
      `The wind is from the ${xw < 0 ? "left" : "right"} of track, so the aircraft drifts ${drift < 0 ? "right" : "left"} and you head ${Math.abs(drift).toFixed(0)}° into wind. ` +
      (gs < V ? `A headwind component cuts your groundspeed by ${Math.round(V - gs)} kt.` : `A tailwind component adds ${Math.round(gs - V)} kt.`);
  }
  draw();
};

WIDGETS.crosswind = root => {
  const pic = W.box("wsvg"), out = W.box(), msg = W.box("wmsg");
  const rw = W.slider("Runway", 1, 36, 1, 27, v => String(v).padStart(2, "0"), draw);
  const wd = W.slider("Wind from (magnetic)", 0, 350, 10, 300, v => W.hdg(v) + "°", draw);
  const ws = W.slider("Wind speed", 0, 35, 1, 20, v => v + " kt", draw);
  const ctl = W.box("wgrid"); ctl.append(rw.el, wd.el, ws.el);
  root.append(ctl, pic, out, msg);
  function draw(){
    const R = rw.get() * 10, D = wd.get(), S = ws.get(), rel = ((D - R) % 360 + 540) % 360 - 180;
    const head = S * Math.cos(W.rad(rel)), cross = S * Math.sin(W.rad(rel));
    const cx = 170, cy = 115, r1 = 100, r2 = 34;
    const sx = cx + Math.sin(W.rad(rel)) * r1, sy = cy - Math.cos(W.rad(rel)) * r1, ex = cx + Math.sin(W.rad(rel)) * r2, ey = cy - Math.cos(W.rad(rel)) * r2;
    pic.innerHTML = `<svg viewBox="0 0 340 230" role="img" aria-label="Runway with the wind arrow">
      <rect class="fb" x="1" y="1" width="338" height="228" rx="6"/>
      <rect x="${cx-16}" y="20" width="32" height="190" rx="2" class="f-rw"/>
      <line x1="${cx}" y1="50" x2="${cx}" y2="180" class="mkl" stroke-dasharray="10 9"/>
      <text x="${cx}" y="200" text-anchor="middle" style="font:800 13px sans-serif;fill:var(--mk)">${String(rw.get()).padStart(2,"0")}</text>
      <text class="tm" x="${cx}" y="16" text-anchor="middle">landing direction ↑</text>
      ${S ? W.arrow(sx, sy, ex, ey, "pb", 3.5) : ""}
    </svg>`;
    out.innerHTML = W.outs([[head >= 0 ? "Headwind" : "Tailwind", Math.abs(head).toFixed(0) + " kt", head < 0], ["Crosswind", Math.abs(cross).toFixed(0) + " kt " + (Math.abs(cross) < 0.5 ? "" : cross > 0 ? "from right" : "from left"), true], ["Angle off runway", Math.abs(rel) + "°"]]);
    msg.className = "wmsg" + (head < 0 ? " warn" : "");
    msg.textContent = head < -0.5 ? "Tailwind: longer take-off and landing runs. Consider the other runway direction." :
      `Rule of thumb: at ${Math.abs(rel)}° off, crosswind is about ${Math.abs(rel) >= 60 ? "all" : Math.abs(rel) >= 45 ? "0.7" : Math.abs(rel) >= 30 ? "half" : Math.abs(rel) >= 15 ? "a quarter" : "almost none"} of the wind. Compare with your aircraft's maximum demonstrated crosswind in the POH.`;
  }
  draw();
};

WIDGETS.onein60 = root => {
  const out = W.box(), msg = W.box("wmsg");
  const off = W.slider("Distance off track", 0.5, 10, 0.5, 4, v => v + " nm", draw);
  const gone = W.slider("Distance gone", 10, 80, 5, 30, v => v + " nm", draw);
  const togo = W.slider("Distance to go", 10, 80, 5, 40, v => v + " nm", draw);
  const side = W.seg([["L", "Left of track"], ["R", "Right of track"]], "L", draw);
  const ctl = W.box("wgrid"); ctl.append(off.el, gone.el, togo.el, side.el);
  root.append(ctl, out, msg);
  function draw(){
    const te = off.get() * 60 / gone.get(), ca = off.get() * 60 / togo.get(), turn = side.get() === "L" ? "right" : "left";
    out.innerHTML = W.outs([["Track error", te.toFixed(1) + "°"], ["Closing angle", ca.toFixed(1) + "°"], ["Alter heading", Math.round(te + ca) + "° " + turn, true]]);
    msg.textContent = `TE = ${off.get()} × 60 ÷ ${gone.get()} = ${te.toFixed(1)}°. CA = ${off.get()} × 60 ÷ ${togo.get()} = ${ca.toFixed(1)}°. Turn ${turn} by ${Math.round(te + ca)}° to reach the destination, or ${Math.round(te)}° ${turn} to fly parallel to track.`;
  }
  draw();
};

WIDGETS.tvmdc = root => {
  const out = W.box(), msg = W.box("wmsg");
  const tru = W.slider("True track or heading", 0, 355, 5, 90, v => W.hdg(v) + "°", draw);
  const vv = W.slider("Variation", 0, 15, 1, 3, v => v + "°", draw);
  const vd = W.seg([["W", "West"], ["E", "East"]], "W", draw);
  const dv = W.slider("Deviation", 0, 5, 1, 2, v => v + "°", draw);
  const dd = W.seg([["W", "West"], ["E", "East"]], "E", draw);
  const ctl = W.box("wgrid");
  const g1 = W.box(), g2 = W.box(); g1.append(vv.el, vd.el); g2.append(dv.el, dd.el); g1.style.display = g2.style.display = "grid"; g1.style.gap = g2.style.gap = "6px";
  ctl.append(tru.el, g1, g2);
  root.append(ctl, out, msg);
  function draw(){
    const v = vv.get() * (vd.get() === "W" ? 1 : -1), d = dv.get() * (dd.get() === "W" ? 1 : -1);
    const m = tru.get() + v, c = m + d;
    out.innerHTML = W.outs([["True", W.hdg(tru.get()) + "°"], ["Magnetic", W.hdg(m) + "°", true], ["Compass", W.hdg(c) + "°", true]]);
    msg.textContent = `${W.hdg(tru.get())}° ${v >= 0 ? "+" : "−"} ${Math.abs(v)}° (${vd.get() === "W" ? "west is best: add" : "east is least: subtract"}) = ${W.hdg(m)}° M. Then ${Math.abs(d)}° ${dd.get() === "W" ? "west: add" : "east: subtract"} = ${W.hdg(c)}° C.`;
  }
  draw();
};

WIDGETS.tsd = root => {
  const out = W.box(), msg = W.box("wmsg");
  const dist = W.slider("Leg distance", 5, 150, 1, 45, v => v + " nm", draw);
  const gs = W.slider("Groundspeed", 50, 150, 1, 90, v => v + " kt", draw);
  const ff = W.slider("Fuel flow", 15, 40, 1, 24, v => v + " L/h", draw);
  const ctl = W.box("wgrid"); ctl.append(dist.el, gs.el, ff.el);
  root.append(ctl, out, msg);
  function draw(){
    const mins = dist.get() * 60 / gs.get(), fuel = ff.get() * mins / 60;
    out.innerHTML = W.outs([["nm per minute", (gs.get()/60).toFixed(2)], ["Leg time", Math.floor(mins/60) ? `${Math.floor(mins/60)} h ${Math.round(mins%60)} min` : Math.round(mins) + " min", true], ["Fuel used", fuel.toFixed(1) + " L", true]]);
    msg.textContent = `Time = ${dist.get()} × 60 ÷ ${gs.get()} = ${mins.toFixed(1)} min. Fuel = ${ff.get()} L/h × ${(mins/60).toFixed(2)} h = ${fuel.toFixed(1)} L.`;
  }
  draw();
};

// ---------- Communications ----------
const PHON = { A:"Alfa",B:"Bravo",C:"Charlie",D:"Delta",E:"Echo",F:"Foxtrot",G:"Golf",H:"Hotel",I:"India",J:"Juliett",K:"Kilo",L:"Lima",M:"Mike",N:"November",O:"Oscar",P:"Papa",Q:"Quebec",R:"Romeo",S:"Sierra",T:"Tango",U:"Uniform",V:"Victor",W:"Whiskey",X:"X-ray",Y:"Yankee",Z:"Zulu" };
const DIG = ["zero","one","two","tree","four","fife","six","seven","eight","niner"];
const sayDigits = s => String(s).split("").filter(c => /\d/.test(c)).map(c => DIG[+c]).join(" ");
WIDGETS.phonetic = root => {
  const inp = document.createElement("input"); inp.className = "wtext"; inp.value = "G-ABCD"; inp.setAttribute("aria-label", "Registration");
  const full = W.box("say"), abbr = W.box("say");
  root.append(W.box("wmsg", "Type a registration."), inp, full, abbr);
  function draw(){
    const r = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const word = c => PHON[c] || (/\d/.test(c) ? DIG[+c] : c);
    full.innerHTML = `<small>In full (first call)</small>${W.esc(r.split("").map(word).join(" ") || "—")}`;
    abbr.innerHTML = `<small>Abbreviated (only after ATC abbreviates first)</small>${W.esc(r.length >= 3 ? [r[0], r.slice(-2)[0], r.slice(-1)].map(word).join(" ") : "—")}`;
  }
  inp.addEventListener("input", draw); draw();
};
WIDGETS.numbers = root => {
  const kinds = [["alt","Altitude"],["fl","Flight level"],["hdg","Heading"],["freq","Frequency"],["qnh","QNH"],["sq","Squawk"],["wind","Wind"]];
  const defaults = { alt:"2500", fl:"55", hdg:"080", freq:"126.700", qnh:"998", sq:"4521", wind:"240/12" };
  let kind = "alt";
  const pick = W.seg(kinds, kind, v => { kind = v; inp.value = defaults[v]; draw(); });
  const inp = document.createElement("input"); inp.className = "wtext"; inp.value = defaults[kind]; inp.setAttribute("aria-label", "Value");
  const say = W.box("say");
  root.append(pick.el, inp, say);
  function altitude(n){
    const th = Math.floor(n / 1000), hu = Math.floor((n % 1000) / 100), rest = n % 100;
    if(rest) return sayDigits(String(n)) + " feet";
    return [th ? sayDigits(String(th)) + " thousand" : "", hu ? DIG[hu] + " hundred" : ""].filter(Boolean).join(" ") + " feet";
  }
  function speak(){
    const v = inp.value.trim();
    if(kind === "alt"){ const n = parseInt(v.replace(/\D/g, ""), 10); return isNaN(n) ? "" : altitude(n); }
    if(kind === "fl") return "flight level " + sayDigits(v);
    if(kind === "hdg"){ const n = parseInt(v, 10); return isNaN(n) ? "" : "heading " + sayDigits(String(n % 360 || 360).padStart(3, "0")); }
    if(kind === "freq"){
      const f = parseFloat(v); if(isNaN(f)) return "";
      let s = f.toFixed(3); if(s.endsWith("00")) s = s.slice(0, -2);
      const [a, b] = s.split("."); return sayDigits(a) + " decimal " + sayDigits(b);
    }
    if(kind === "qnh"){ const n = parseInt(v, 10); return isNaN(n) ? "" : "QNH " + sayDigits(String(n)) + (n < 1000 ? " hectopascals" : ""); }
    if(kind === "sq") return "squawk " + sayDigits(v);
    if(kind === "wind"){ const m = v.match(/^(\d{1,3})\D+(\d{1,3})/); return m ? sayDigits(m[1].padStart(3, "0")) + " degrees, " + sayDigits(m[2]) + " knots" : ""; }
    return "";
  }
  function draw(){ const s = speak(); say.innerHTML = `<small>Say</small>${W.esc(s ? "“" + s + "”" : "Type a value")}`; }
  inp.addEventListener("input", draw); draw();
};

// ---------- Air Law ----------
WIDGETS.semicircular = root => {
  const pic = W.box("wsvg"), out = W.box(), msg = W.box("wmsg");
  const tr = W.slider("Magnetic track", 0, 355, 5, 270, v => W.hdg(v) + "°", draw);
  root.append(tr.el, pic, out, msg);
  function draw(){
    const t = tr.get(), east = t < 180, cx = 150, cy = 105, r = 80;
    const nx = cx + Math.sin(W.rad(t)) * r, ny = cy - Math.cos(W.rad(t)) * r;
    pic.innerHTML = `<svg viewBox="0 0 300 210" role="img" aria-label="Compass rose with this track">
      <rect class="fb" x="1" y="1" width="298" height="208" rx="6"/>
      <path d="M${cx},${cy-r} A${r},${r} 0 0 1 ${cx},${cy+r} Z" class="${east ? "f-tint" : "f-card"}" style="stroke:var(--edge)"/>
      <path d="M${cx},${cy-r} A${r},${r} 0 0 0 ${cx},${cy+r} Z" class="${east ? "f-card" : "f-mag"}" style="stroke:var(--edge)"/>
      <text class="tb" x="${cx}" y="${cy-r-6}" text-anchor="middle">000</text><text class="tb" x="${cx}" y="${cy+r+16}" text-anchor="middle">180</text>
      <text class="tm" x="${cx+44}" y="${cy+4}" text-anchor="middle">odd</text><text class="tm" x="${cx-44}" y="${cy+4}" text-anchor="middle">even</text>
      ${W.arrow(cx, cy, nx, ny, "pa", 3.5)}
    </svg>`;
    const base = east ? [50, 70, 90, 110] : [40, 60, 80, 100];
    out.innerHTML = W.outs([["IFR levels", base.map(x => "FL" + x).join(" · "), true], ["VFR levels", base.map(x => "FL" + (x + 5)).join(" · "), true]]);
    msg.textContent = `Track ${W.hdg(t)}° is in the ${east ? "000–179° half: odd thousands" : "180–359° half: even thousands"}. VFR adds 500 ft.`;
  }
  draw();
};

// ---------- Human Performance ----------
WIDGETS.imsafe = root => {
  const items = [["I","Illness","Am I free of any illness or symptoms, even a cold?"],["M","Medication","Am I free of any medication that could affect me, prescribed or over the counter?"],
    ["S","Stress","Am I free of stress from work, money or home that will distract me?"],["A","Alcohol","Am I well clear of alcohol, legally and practically?"],
    ["F","Fatigue","Have I slept enough, and am I flying at a time I'm normally alert?"],["E","Eating","Have I eaten and drunk enough water to stay sharp for the whole flight?"]];
  const state = {};
  const list = W.box("", ""), msg = W.box("wmsg");
  list.style.display = "grid"; list.style.gap = "8px";
  root.append(W.box("wmsg", "Answer honestly for today. Tap to mark each one OK."), list, msg);
  function draw(){
    list.innerHTML = "";
    items.forEach(([k, name, q]) => {
      const b = document.createElement("button"); b.type = "button";
      b.className = "chip" + (state[k] ? " ok" : "");
      b.innerHTML = `<span class="cn">${k}</span><span><b>${name}</b> · ${W.esc(q)}</span>`;
      b.addEventListener("click", () => { state[k] = !state[k]; draw(); });
      list.appendChild(b);
    });
    const missing = items.filter(([k]) => !state[k]).map(i => i[1]);
    msg.className = "wmsg" + (missing.length ? " warn" : "");
    msg.textContent = missing.length ? `Not yet OK: ${missing.join(", ")}. If any one of these is doubtful, the safe decision is not to fly, or to fly a simpler flight with an instructor.` : "All six OK. Fit to fly, as far as you can judge.";
  }
  draw();
};
