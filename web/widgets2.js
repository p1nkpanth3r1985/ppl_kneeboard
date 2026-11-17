
// ---------- Aircraft General Knowledge ----------
// Example V-speeds for the dial: illustrative, typical of a light two-seat trainer. Not from any POH.
const ASI_EX = { vso:42, vs1:48, vfe:85, vno:107, vne:141 };
WIDGETS.asi = root => {
  const pic = W.box("wsvg"), out = W.box(), msg = W.box("wmsg");
  const v = W.slider("Indicated airspeed", 30, 160, 1, 70, x => x + " kt", draw);
  root.append(W.box("fine", "Example speeds for a light trainer, for illustration only. Use the figures in your aircraft's POH."), v.el, pic, out, msg);
  const A0 = 30, A1 = 160, ang = s => (-150 + (s - A0) / (A1 - A0) * 300) * Math.PI / 180;
  const pt = (s, r) => [150 + Math.sin(ang(s)) * r, 120 - Math.cos(ang(s)) * r];
  const arc = (s1, s2, r, cls, w) => { const [x1, y1] = pt(s1, r), [x2, y2] = pt(s2, r), large = (s2 - s1) / (A1 - A0) * 300 > 180 ? 1 : 0;
    return `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)}" style="fill:none;stroke:${cls};stroke-width:${w}"/>`; };
  function zone(s){
    const E = ASI_EX;
    if(s < E.vso) return ["Below the white arc", "Below the stall speed with full flap: the aircraft can't fly level here.", true];
    if(s < E.vs1) return ["White arc only", "Flap operating range, below the clean stall speed: only with flap down.", false];
    if(s <= E.vfe) return ["White and green arcs", "Flap may be used, and you are above the clean stall speed.", false];
    if(s <= E.vno) return ["Green arc", "Normal operating range. Flap must be up above Vfe.", false];
    if(s < E.vne) return ["Yellow arc", "Caution range: smooth air only, no large or abrupt control movements.", true];
    return ["Red line or above", "At or beyond the never exceed speed: structural failure is possible.", true];
  }
  function draw(){
    const s = v.get(), E = ASI_EX, [nx, ny] = pt(s, 78);
    pic.innerHTML = `<svg viewBox="0 0 300 240" role="img" aria-label="Airspeed indicator at ${s} knots">
      <circle cx="150" cy="120" r="108" class="f-ink"/><circle cx="150" cy="120" r="104" style="fill:#1a1f26"/>
      ${arc(E.vso, E.vfe, 94, "#f2f2f2", 7)}${arc(E.vs1, E.vno, 86, "#2db36a", 9)}${arc(E.vno, E.vne, 86, "#f2c230", 9)}
      ${(() => { const [a1, b1] = pt(E.vne, 78), [a2, b2] = pt(E.vne, 100); return `<line x1="${a1}" y1="${b1}" x2="${a2}" y2="${b2}" style="stroke:#e0442b;stroke-width:5"/>`; })()}
      ${[40,60,80,100,120,140,160].map(k => { const [a, b] = pt(k, 66); return `<text x="${a.toFixed(1)}" y="${(b + 4).toFixed(1)}" text-anchor="middle" style="font:700 12px sans-serif;fill:#f2f2f2">${k}</text>`; }).join("")}
      <line x1="150" y1="120" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" style="stroke:#ffffff;stroke-width:4;stroke-linecap:round"/>
      <circle cx="150" cy="120" r="7" style="fill:#f2f2f2"/>
      <text x="150" y="168" text-anchor="middle" style="font:700 10px sans-serif;fill:#c8c8c8">KNOTS</text>
    </svg>`;
    const [z, m, warn] = zone(s);
    out.innerHTML = W.outs([["Airspeed", s + " kt", true], ["You are in", z, warn]]);
    msg.className = "wmsg" + (warn ? " warn" : ""); msg.textContent = m;
  }
  draw();
};

WIDGETS.pitotstatic = root => {
  const out = W.box(), msg = W.box("wmsg");
  let blk = "static", ph = "climb";
  const s1 = W.seg([["none","No blockage"],["static","Static blocked"],["pitot","Pitot and drain blocked"]], blk, x => { blk = x; draw(); });
  const s2 = W.seg([["climb","Climbing"],["level","Level"],["descent","Descending"]], ph, x => { ph = x; draw(); });
  root.append(W.box("zlabel", "Blockage"), s1.el, W.box("zlabel", "The aircraft is"), s2.el, out, msg);
  function draw(){
    let asi = "Correct", alt = "Correct", vsi = "Correct", text = "With no blockage every instrument reads correctly.";
    if(blk === "static"){
      alt = "Frozen"; vsi = "Zero";
      asi = ph === "climb" ? "Under-reads" : ph === "descent" ? "Over-reads" : "Correct (at the level it blocked)";
      text = "Trapped static pressure stays at its old value. In a climb the real outside pressure falls, so pitot minus trapped static is too small: the ASI under-reads. In a descent the reverse. The altimeter freezes and the VSI shows zero.";
    }
    if(blk === "pitot"){
      asi = ph === "climb" ? "Over-reads" : ph === "descent" ? "Under-reads" : "Steady but meaningless";
      text = "With the pitot and its drain blocked, pitot pressure is trapped. As static pressure falls in a climb, the difference grows: the ASI over-reads, acting like an altimeter. The altimeter and VSI use static only, so they read correctly.";
    }
    const bad = x => x !== "Correct";
    out.innerHTML = W.outs([["ASI", asi, bad(asi)], ["Altimeter", alt, bad(alt)], ["VSI", vsi, bad(vsi)]]);
    msg.textContent = text;
  }
  draw();
};

WIDGETS.fourstroke = root => {
  const pic = W.box("wsvg"), msg = W.box("wmsg");
  const STEPS = [
    ["Induction", "Piston moves down. Inlet valve open: fuel/air mixture is drawn into the cylinder.", 160, true, false, false],
    ["Compression", "Piston moves up. Both valves closed: the mixture is squeezed.", 90, false, false, false],
    ["Power", "Spark plugs fire near the top. The burning gas expands and drives the piston down: the only stroke that makes power.", 160, false, false, true],
    ["Exhaust", "Piston moves up. Exhaust valve open: burnt gases are pushed out.", 90, false, true, false]
  ];
  let k = 0;
  const bar = W.box("deckbar");
  root.append(pic, msg, bar);
  const b = (t, f) => { const x = document.createElement("button"); x.type = "button"; x.className = "seg1"; x.textContent = t; x.addEventListener("click", f); return x; };
  bar.append(b("‹ Back", () => { k = (k + 3) % 4; draw(); }), b("Reset", () => { k = 0; draw(); }), b("Next stroke ›", () => { k = (k + 1) % 4; draw(); }));
  function draw(){
    const [name, text, py, inOpen, exOpen, spark] = STEPS[k];
    pic.innerHTML = `<svg viewBox="0 0 300 230" role="img" aria-label="${name} stroke">
      <rect class="fb" x="1" y="1" width="298" height="228" rx="6"/>
      <rect x="100" y="40" width="100" height="160" class="f-card ln"/>
      <rect x="104" y="${py}" width="92" height="30" class="f-rw"/>
      <line x1="150" y1="${py + 30}" x2="150" y2="215" class="ln" style="stroke-width:5"/>
      <line x1="${inOpen ? 112 : 108}" y1="40" x2="${inOpen ? 132 : 128}" y2="${inOpen ? 52 : 40}" class="ln pa" style="stroke-width:5"/>
      <line x1="${exOpen ? 168 : 172}" y1="${exOpen ? 52 : 40}" x2="${exOpen ? 188 : 192}" y2="40" class="ln pb" style="stroke-width:5"/>
      <text class="tm" x="95" y="30" text-anchor="end">inlet ${inOpen ? "OPEN" : "closed"}</text>
      <text class="tm" x="205" y="30">exhaust ${exOpen ? "OPEN" : "closed"}</text>
      ${spark ? `<text x="150" y="${py - 14}" text-anchor="middle" style="font:800 22px sans-serif;fill:var(--mag)">✶</text>` : ""}
      ${inOpen ? `<path d="M40,60 L95,60" class="ln pa" marker-end="url(#arr)"/>` : ""}
      ${exOpen ? `<path d="M205,60 L260,60" class="ln pb" marker-end="url(#arr)"/>` : ""}
      <text class="tb" x="150" y="${py + 20}" text-anchor="middle" style="fill:var(--mk)">${k + 1}</text>
    </svg>`;
    msg.innerHTML = `<b>${k + 1}. ${name}.</b> ${text}`;
  }
  draw();
};

// ---------- Flight Performance and Planning ----------
WIDGETS.wb = root => {
  // Invented example aircraft and envelope, matching the worked example in the notes.
  const E = { bem:520, bemArm:0.85, seat:0.95, fuel:1.05, bag:1.60, mtom:760 };
  const fwd = m => m <= 650 ? 0.80 : 0.80 + (m - 650) / (760 - 650) * 0.04, aft = 0.95;
  const pic = W.box("wsvg"), out = W.box(), msg = W.box("wmsg");
  const seats = W.slider("Pilot and passenger", 60, 200, 5, 160, x => x + " kg", draw);
  const fuel = W.slider("Fuel at take-off", 0, 100, 5, 60, x => x + " L", draw);
  const bag = W.slider("Baggage (max 25 kg)", 0, 25, 1, 10, x => x + " kg", draw);
  const burn = W.slider("Fuel used on the flight", 0, 100, 5, 40, x => x + " L", draw);
  const ctl = W.box("wgrid"); ctl.append(seats.el, fuel.el, bag.el, burn.el);
  root.append(W.box("fine", "Invented example aircraft and envelope, for practice only. Use your aircraft's weight schedule and POH for real loading."), ctl, pic, out, msg);
  function calc(L){
    const f = L * 0.72, m = E.bem + seats.get() + f + bag.get();
    const mo = E.bem * E.bemArm + seats.get() * E.seat + f * E.fuel + bag.get() * E.bag;
    return { m, cg:mo / m, ok:m <= E.mtom && mo / m >= fwd(m) && mo / m <= aft };
  }
  function draw(){
    if(burn.get() > fuel.get()) burn.set(fuel.get());
    const to = calc(fuel.get()), ld = calc(fuel.get() - burn.get());
    const X = cg => 40 + (cg - 0.76) / (0.98 - 0.76) * 260, Y = m => 200 - (m - 560) / (800 - 560) * 170;
    const env = [[0.80, 560], [0.80, 650], [0.84, 760], [0.95, 760], [0.95, 560]].map(([c, m]) => `${X(c).toFixed(1)},${Y(m).toFixed(1)}`).join(" ");
    pic.innerHTML = `<svg viewBox="0 0 320 230" role="img" aria-label="CG envelope with take-off and landing points">
      <rect class="fb" x="1" y="1" width="318" height="228" rx="6"/>
      <polygon points="${env}" class="f-tint ln"/>
      ${[0.78, 0.82, 0.86, 0.90, 0.94, 0.98].map(c => `<text class="tm" x="${X(c)}" y="218" text-anchor="middle">${c.toFixed(2)}</text>`).join("")}
      ${[600, 650, 700, 750, 800].map(m => `<text class="tm" x="34" y="${Y(m) + 3}" text-anchor="end">${m}</text>`).join("")}
      <text class="tm" x="180" y="228" text-anchor="middle">CG (m aft of datum)</text>
      <line x1="${X(to.cg)}" y1="${Y(to.m)}" x2="${X(ld.cg)}" y2="${Y(ld.m)}" class="ln dash"/>
      <circle cx="${X(to.cg).toFixed(1)}" cy="${Y(to.m).toFixed(1)}" r="7" style="fill:${to.ok ? "var(--tick)" : "var(--emerg)"}"/>
      <circle cx="${X(ld.cg).toFixed(1)}" cy="${Y(ld.m).toFixed(1)}" r="6" style="fill:var(--card);stroke:${ld.ok ? "var(--tick)" : "var(--emerg)"};stroke-width:3"/>
      <text class="t" x="${X(to.cg) + 10}" y="${Y(to.m) - 8}">take-off</text><text class="t" x="${X(ld.cg) + 10}" y="${Y(ld.m) + 14}">landing</text>
    </svg>`;
    out.innerHTML = W.outs([["Take-off mass", Math.round(to.m) + " kg", to.m > E.mtom], ["Take-off CG", to.cg.toFixed(3) + " m", !to.ok], ["Landing mass", Math.round(ld.m) + " kg"], ["Landing CG", ld.cg.toFixed(3) + " m", !ld.ok]]);
    const why = r => r.m > E.mtom ? `over the ${E.mtom} kg maximum` : r.cg < fwd(r.m) ? "CG ahead of the forward limit" : r.cg > aft ? "CG behind the aft limit" : "within limits";
    msg.className = "wmsg" + (to.ok && ld.ok ? "" : " warn");
    msg.textContent = `Take-off: ${why(to)}. Landing: ${why(ld)}. ` + (to.ok && ld.ok ? "Both points are inside the envelope." : "Change the load or fuel until both points sit inside the envelope.");
  }
  draw();
};

WIDGETS.perf = root => {
  const FACT = [["dry","Dry grass",1.20,1.15],["wet","Wet grass",1.30,1.35],["slope","2% slope (uphill for take-off, downhill for landing)",1.10,1.10],["elev","1,000 ft elevation",1.10,1.05],["temp","10 °C warmer than the chart",1.10,1.05],["wt","10% heavier than the chart",1.20,1.10],["tail","Tailwind 10% of lift-off speed",1.20,1.20],["soft","Soft ground or snow",1.25,1.25]];
  let mode = "to", on = { dry:true }, safety = true;
  const out = W.box(), msg = W.box("wmsg");
  const m = W.seg([["to","Take-off"],["ldg","Landing"]], mode, x => { mode = x; draw(); });
  const book = W.slider("Distance from the POH chart", 200, 700, 10, 400, x => x + " m", draw);
  const avail = W.slider("Distance available (TODA or LDA)", 300, 1200, 10, 700, x => x + " m", draw);
  const chips = W.box("toggles");
  FACT.forEach(([k, lab]) => { const b = document.createElement("button"); b.type = "button"; b.className = "qchip tog" + (on[k] ? " on" : ""); b.textContent = lab;
    b.addEventListener("click", () => { on[k] = !on[k]; if(k === "dry" && on.dry) on.wet = false; if(k === "wet" && on.wet) on.dry = false; [...chips.children].forEach((c, i) => c.classList.toggle("on", !!on[FACT[i][0]])); draw(); }); chips.appendChild(b); });
  const sb = document.createElement("button"); sb.type = "button"; sb.className = "qchip tog on"; sb.textContent = "Add the CAA safety factor";
  sb.addEventListener("click", () => { safety = !safety; sb.classList.toggle("on", safety); draw(); });
  const ctl = W.box("wgrid"); ctl.append(book.el, avail.el);
  root.append(m.el, ctl, W.box("zlabel", "Conditions today"), chips, sb, out, msg);
  function draw(){
    const i = mode === "to" ? 2 : 3, used = FACT.filter(f => on[f[0]]);
    let mult = used.reduce((p, f) => p * f[i], 1);
    const sf = mode === "to" ? 1.33 : 1.43;
    if(safety) mult *= sf;
    const need = book.get() * mult, ok = need <= avail.get();
    out.innerHTML = W.outs([["Combined factor", "×" + mult.toFixed(2)], ["Distance needed", Math.round(need) + " m", true], ["Margin", (ok ? "+" : "") + Math.round(avail.get() - need) + " m", !ok]]);
    msg.className = "wmsg" + (ok ? "" : " warn");
    msg.textContent = `${book.get()} m × ${[...used.map(f => f[i].toFixed(2)), ...(safety ? [sf.toFixed(2)] : [])].join(" × ") || "1"} = ${Math.round(need)} m. ` + (ok ? "Fits the distance available." : "More than the distance available: don't go as planned.");
  }
  draw();
};

WIDGETS.densalt = root => {
  const out = W.box(), msg = W.box("wmsg");
  const el = W.slider("Aerodrome elevation", 0, 3000, 50, 300, x => x.toLocaleString("en-GB") + " ft", draw);
  const q = W.slider("QNH", 980, 1040, 1, 1003, x => x + " hPa", draw);
  const t = W.slider("Outside air temperature", -10, 40, 1, 28, x => x + " °C", draw);
  const ctl = W.box("wgrid"); ctl.append(el.el, q.el, t.el);
  root.append(ctl, out, msg);
  function draw(){
    const pa = el.get() + (1013 - q.get()) * 30, isa = 15 - 2 * pa / 1000, da = pa + 120 * (t.get() - isa);
    out.innerHTML = W.outs([["Pressure altitude", Math.round(pa).toLocaleString("en-GB") + " ft"], ["ISA temp there", isa.toFixed(0) + " °C"], ["Density altitude", Math.round(da / 10) * 10 + " ft", true]]);
    msg.className = "wmsg" + (da - el.get() > 2000 ? " warn" : "");
    msg.textContent = `The aircraft will perform as if it were at about ${Math.round(da / 100) * 100} ft, ${Math.round((da - el.get()) / 100) * 100} ft ${da >= el.get() ? "above" : "below"} the real elevation. Pressure altitude = ${el.get()} + (1013 − ${q.get()}) × 30. Density altitude ≈ pressure altitude + 120 × (OAT − ISA).`;
  }
  draw();
};

WIDGETS.fuelplan = root => {
  const out = W.box(), msg = W.box("wmsg");
  let res = 30;
  const trip = W.slider("Trip time", 15, 240, 5, 90, x => `${Math.floor(x/60)} h ${x%60} min`, draw);
  const ff = W.slider("Fuel flow", 15, 35, 1, 23, x => x + " L/h", draw);
  const taxi = W.slider("Taxi and run-up", 0, 10, 1, 3, x => x + " L", draw);
  const cont = W.slider("Contingency", 0, 20, 5, 10, x => x + "% of trip", draw);
  const alt = W.slider("Diversion to alternate", 0, 60, 5, 20, x => x + " min", draw);
  const have = W.slider("Usable fuel on board", 20, 150, 1, 85, x => x + " L", draw);
  const r = W.seg([[30,"VFR day: 30 min"],[45,"VFR night: 45 min"],[60,"Personal: 60 min"]], res, x => { res = x; draw(); });
  const ctl = W.box("wgrid"); ctl.append(trip.el, ff.el, taxi.el, cont.el, alt.el, have.el);
  root.append(ctl, W.box("zlabel", "Final reserve"), r.el, out, msg);
  function draw(){
    const f = ff.get(), t = f * trip.get() / 60, c = t * cont.get() / 100, a = f * alt.get() / 60, fr = f * res / 60, need = taxi.get() + t + c + a + fr, spare = have.get() - need;
    out.innerHTML = W.outs([["Trip", t.toFixed(1) + " L"], ["Contingency", c.toFixed(1) + " L"], ["Alternate", a.toFixed(1) + " L"], ["Final reserve", fr.toFixed(1) + " L"], ["Total needed", need.toFixed(1) + " L", true], ["Spare", (spare >= 0 ? "+" : "") + spare.toFixed(1) + " L", spare < 0]]);
    msg.className = "wmsg" + (spare < 0 ? " warn" : "");
    msg.textContent = spare < 0 ? `Short by ${(-spare).toFixed(1)} L. Add fuel (if mass and balance allow), shorten the route, or plan a fuel stop.` :
      `Enough, with ${spare.toFixed(1)} L spare: about ${Math.round(spare / f * 60)} min of extra flying on top of all the allowances.`;
  }
  draw();
};

// ---------- Operational Procedures ----------
WIDGETS.wake = root => {
  const out = W.box(), msg = W.box("wmsg"), pic = W.box("wsvg");
  let start = "same";
  const s = W.seg([["same","Same starting point"],["inter","Starting part-way along"]], start, x => { start = x; draw(); });
  const xw = W.slider("Crosswind", 0, 20, 1, 5, x => x + " kt", draw);
  root.append(W.box("zlabel", "Departing behind a heavier aircraft"), s.el, xw.el, pic, out, msg);
  function draw(){
    const mins = start === "same" ? 2 : 3, w = xw.get();
    // Vortices seen from the runway end; the wind blows right to left.
    const upX = Math.max(20, 205 - w * 8), dnX = Math.max(20, 115 - w * 5);
    pic.innerHTML = `<svg viewBox="0 0 320 150" role="img" aria-label="Runway seen from the end with the two vortices drifting in the crosswind">
      <rect class="fb" x="1" y="1" width="318" height="148" rx="6"/>
      <rect class="f-ground" x="10" y="118" width="300" height="10"/><rect class="f-rw" x="120" y="114" width="80" height="6"/>
      <text class="tm" x="160" y="142" text-anchor="middle">runway, seen from the end</text>
      ${w ? `<path d="M290,30 L240,30" class="ln" marker-end="url(#arr)"/><text class="tm" x="265" y="22" text-anchor="middle">wind ${w} kt</text>` : ""}
      <circle cx="${upX}" cy="96" r="13" class="ln pb" style="fill:none;stroke-width:3"/><text class="tm" x="${upX}" y="74" text-anchor="middle">upwind</text>
      <circle cx="${dnX}" cy="96" r="13" class="ln pa" style="fill:none;stroke-width:3"/><text class="tm" x="${dnX}" y="60" text-anchor="middle">downwind</text>
      <text class="t" x="160" y="60" text-anchor="middle">${w >= 3 && w <= 7 ? "upwind vortex held over the runway" : w > 7 ? "both vortices blown clear" : "vortices spread slowly either side"}</text>
    </svg>`;
    out.innerHTML = W.outs([["Wait at least", mins + " min", true], ["Timed from", "its rotation"]]);
    msg.className = "wmsg" + (w >= 3 && w <= 7 ? " warn" : "");
    msg.textContent = (start === "same" ? "From the same point, allow 2 minutes." : "From part-way along, allow 3 minutes: you'll be lower through the area where it rotated.") +
      (w >= 3 && w <= 7 ? " A light crosswind of about 5 kt can hold the upwind vortex over the runway: the most dangerous case." : "") + " Lift off before its rotation point and climb above its path.";
  }
  draw();
};
