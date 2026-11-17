// 060 Navigation: extra questions and hands-on diagrams
const varText = v => Math.abs(v) + "°" + (v > 0 ? "W" : "E");   // positive = west
extendTopic("nav", "earth", { try:[["tvmdc", "True, magnetic and compass"]], qs:[
{type:"calc", gen:() => { const t = rnd(20, 330, 5), v = rnd(1, 8) * (rnd(0, 1) ? 1 : -1), m = t + v;
  return { q:`True track ${pad3(t)}°, variation ${varText(v)}. What is the magnetic track? (degrees)`, a:m, tol:0, unit:"°",
    steps:[`Variation ${v > 0 ? "west is best: add" : "east is least: subtract"}`, `${pad3(t)} ${v > 0 ? "+" : "−"} ${Math.abs(v)} = ${pad3(m)}°M`] }; }},
{type:"calc", gen:() => { const m = rnd(20, 330, 5), d = rnd(1, 4) * (rnd(0, 1) ? 1 : -1), c = m + d;
  return { q:`Magnetic heading ${pad3(m)}°, deviation ${varText(d)}. What is the compass heading? (degrees)`, a:c, tol:0, unit:"°",
    steps:[`Deviation ${d > 0 ? "west: add" : "east: subtract"}`, `${pad3(m)} ${d > 0 ? "+" : "−"} ${Math.abs(d)} = ${pad3(c)}°C`] }; }},
{type:"calc", gen:() => { const c = rnd(30, 320, 5), d = rnd(1, 3) * (rnd(0, 1) ? 1 : -1), v = rnd(1, 6) * (rnd(0, 1) ? 1 : -1), m = c - d, t = m - v;
  return { q:`Working backwards: compass heading ${pad3(c)}°, deviation ${varText(d)}, variation ${varText(v)}. What is the true heading? (degrees)`, a:t, tol:0, unit:"°",
    steps:[`Going from compass back towards true, reverse the signs: west is subtracted, east is added.`, `Magnetic = ${pad3(c)} ${d > 0 ? "−" : "+"} ${Math.abs(d)} = ${pad3(m)}°M`, `True = ${pad3(m)} ${v > 0 ? "−" : "+"} ${Math.abs(v)} = ${pad3(t)}°T`] }; },
  e:"Reverse the rule when converting compass or magnetic back to true."},
{q:"Where is magnetic dip greatest, making the compass least reliable?",o:["Near the magnetic poles","At the magnetic equator","At the Greenwich meridian","It is the same everywhere"],e:"Near the poles the earth's field points steeply into the ground, so the horizontal part the compass uses is weak, and turning and acceleration errors are large."},
{q:"What is an agonic line?",o:["A line joining places of zero variation","A line of zero deviation","The magnetic equator","A line of equal dip"],e:"Agonic lines join places where true and magnetic north coincide."}
]});

extendTopic("nav", "charts", { qs:[
{type:"calc", gen:() => { const cm = rnd(3, 20), km = cm * 5;
  return { q:`On a 1:500,000 chart two places are ${cm} cm apart. How far apart are they on the ground, in kilometres?`, a:km, tol:0, unit:" km",
    steps:[`1 cm = 500,000 cm = 5 km`, `${cm} × 5 = ${km} km`] }; }},
{type:"calc", gen:() => { const km = rnd(20, 150, 5), nm = km / 1.852;
  return { q:`Convert ${km} km to nautical miles (nearest whole number).`, a:Math.round(nm), tol:1, unit:" nm",
    steps:[`1 nm = 1.852 km`, `${km} ÷ 1.852 = ${nm.toFixed(1)} nm`] }; }},
{q:"On a UK VFR chart, an obstacle is marked with two figures, for example 1,250 and (420). What does the bracketed figure show?",o:["The height of the obstacle above ground level","Its elevation above mean sea level","The minimum safe altitude near it","Its distance from the nearest aerodrome in metres"],e:"The main figure is the top of the obstacle above mean sea level; the bracketed figure is its height above the ground."},
{q:"Why is a road map not suitable for VFR navigation planning?",o:["It does not show airspace, aerodromes, obstacles or other aeronautical information","Its scale is too small","It uses a Mercator projection","It shows too many towns"],e:"Aeronautical charts add airspace, danger and restricted areas, aerodromes, obstacles, radio aids and elevation data you need for safe planning."}
]});

extendTopic("nav", "tsd", { try:[["tsd", "Time and fuel for a leg"]], qs:[
{type:"calc", gen:() => { const d = rnd(20, 90), g = rnd(70, 130, 5), m = d * 60 / g;
  return { q:`A leg of ${d} nm at a groundspeed of ${g} kt. How long will it take, to the nearest minute?`, a:Math.round(m), tol:1, unit:" min",
    steps:[`Time = distance × 60 ÷ groundspeed`, `${d} × 60 ÷ ${g} = ${m.toFixed(1)} min`] }; }},
{type:"calc", gen:() => { const g = rnd(70, 130, 5), m = rnd(10, 50), d = g * m / 60;
  return { q:`Groundspeed ${g} kt for ${m} minutes. How far have you travelled, to the nearest nm?`, a:Math.round(d), tol:1, unit:" nm",
    steps:[`Distance = groundspeed × time ÷ 60`, `${g} × ${m} ÷ 60 = ${d.toFixed(1)} nm`] }; }},
{type:"calc", gen:() => { const r = rnd(18, 30), m = rnd(30, 150, 5), f = r * m / 60;
  return { q:`Fuel flow is ${r} L/h. How much fuel is used in ${Math.floor(m/60) ? Math.floor(m/60) + " h " : ""}${m % 60} min? (nearest litre)`, a:Math.round(f), tol:1, unit:" L",
    steps:[`Time in hours = ${m} ÷ 60 = ${(m/60).toFixed(2)} h`, `${r} × ${(m/60).toFixed(2)} = ${f.toFixed(1)} L`] }; }},
{type:"calc", gen:() => { const m = rnd(15, 45), g = rnd(70, 130, 10), d = g * m / 60;
  return { q:`You cover ${Number.isInteger(d) ? d : d.toFixed(1)} nm in ${m} minutes. What is your groundspeed?`, a:g, tol:1, unit:" kt",
    steps:[`Groundspeed = distance × 60 ÷ time`, `${Number.isInteger(d) ? d : d.toFixed(1)} × 60 ÷ ${m} = ${g} kt`] }; }},
{type:"calc", gen:() => { const g = rnd(10, 40), l = g * 3.785;
  return { q:`Convert ${g} US gallons to litres (nearest litre).`, a:Math.round(l), tol:1, unit:" L",
    steps:[`1 US gallon = 3.785 L`, `${g} × 3.785 = ${l.toFixed(1)} L`] }; },
  e:"Many US-built light aircraft, including the Cessna 150, give fuel capacity in US gallons in the POH."}
]});

extendTopic("nav", "wind", { try:[["windtri", "The wind triangle"], ["crosswind", "Runway wind components"]], qs:[
{type:"calc", gen:() => { const w = rnd(10, 30), v = rnd(80, 120, 5), md = w * 60 / v;
  return { q:`Wind ${w} kt, TAS ${v} kt. What is the maximum possible drift? (nearest degree)`, a:Math.round(md), tol:1, unit:"°",
    steps:[`Max drift ≈ wind speed × 60 ÷ TAS`, `${w} × 60 ÷ ${v} = ${md.toFixed(1)}°`] }; }},
{type:"calc", gen:() => { const rw = rnd(1, 36), off = [30, 45, 60, 90][rnd(0, 3)] * (rnd(0, 1) ? 1 : -1), ws = rnd(10, 25), wd = pad3(rw * 10 + off), xw = ws * Math.sin(Math.abs(off) * Math.PI / 180);
  return { q:`Runway ${String(rw).padStart(2, "0")}, surface wind ${wd}° at ${ws} kt. What is the crosswind component, to the nearest knot?`, a:Math.round(xw), tol:2, unit:" kt",
    steps:[`Angle between wind and runway = ${Math.abs(off)}°`, `Crosswind = ${ws} × sin ${Math.abs(off)}° = ${ws} × ${Math.sin(Math.abs(off)*Math.PI/180).toFixed(2)} = ${xw.toFixed(1)} kt`] }; },
  e:"Rule of thumb: 30° off, half the wind; 45°, 0.7; 60° or more, nearly all of it. Within 2 kt is accepted for the rule of thumb."},
{type:"calc", gen:() => { const rw = rnd(1, 36), off = [0, 30, 45, 60][rnd(0, 3)] * (rnd(0, 1) ? 1 : -1), ws = rnd(10, 25), wd = pad3(rw * 10 + off), hw = ws * Math.cos(Math.abs(off) * Math.PI / 180);
  return { q:`Runway ${String(rw).padStart(2, "0")}, surface wind ${wd}° at ${ws} kt. What is the headwind component, to the nearest knot?`, a:Math.round(hw), tol:2, unit:" kt",
    steps:[`Angle between wind and runway = ${Math.abs(off)}°`, `Headwind = ${ws} × cos ${Math.abs(off)}° = ${ws} × ${Math.cos(Math.abs(off)*Math.PI/180).toFixed(2)} = ${hw.toFixed(1)} kt`] }; }},
{q:"Your track is 360° and the wind is from 270°. Which statement is correct?",o:["You drift right, so the heading must be left of track","You drift left, so the heading must be right of track","There is no drift with a wind from the west","The heading must be 180°"],e:"A westerly wind blows you east, to the right of a northerly track. Head into wind, to the left."},
{q:"The wind is blowing from directly behind the aircraft. What are the drift and groundspeed?",o:["No drift; groundspeed = TAS + wind speed","Maximum drift; groundspeed = TAS","No drift; groundspeed = TAS − wind speed","Maximum drift; groundspeed = TAS + wind speed"],e:"A wind along the track causes no drift; a direct tailwind adds fully to the groundspeed."}
]});

extendTopic("nav", "onein60", { try:[["onein60", "1 in 60 corrections"]], qs:[
{type:"calc", gen:() => { const o = rnd(2, 6), g = [20, 30, 40, 60][rnd(0, 3)], te = o * 60 / g;
  return { q:`After ${g} nm you find yourself ${o} nm off track. What is the track error? (nearest degree)`, a:Math.round(te), tol:1, unit:"°",
    steps:[`TE = off track × 60 ÷ distance gone`, `${o} × 60 ÷ ${g} = ${te.toFixed(1)}°`] }; }},
{type:"calc", gen:() => { const o = rnd(2, 6), t = [20, 30, 40, 60][rnd(0, 3)], ca = o * 60 / t;
  return { q:`You are ${o} nm off track with ${t} nm to go. What closing angle will take you to the destination? (nearest degree)`, a:Math.round(ca), tol:1, unit:"°",
    steps:[`CA = off track × 60 ÷ distance to go`, `${o} × 60 ÷ ${t} = ${ca.toFixed(1)}°`] }; }},
{type:"calc", gen:() => { const o = rnd(2, 5), g = [20, 30, 40][rnd(0, 2)], t = [30, 40, 60][rnd(0, 2)], te = o * 60 / g, ca = o * 60 / t, side = rnd(0, 1) ? "left" : "right";
  return { q:`After ${g} nm you are ${o} nm ${side} of track, with ${t} nm still to go. By how many degrees must you alter heading to reach the destination? (nearest degree)`, a:Math.round(te + ca), tol:1, unit:"°",
    steps:[`TE = ${o} × 60 ÷ ${g} = ${te.toFixed(1)}°`, `CA = ${o} × 60 ÷ ${t} = ${ca.toFixed(1)}°`, `Total = ${(te + ca).toFixed(1)}°, turning ${side === "left" ? "right" : "left"}`] }; }},
{q:"Up to roughly what angle does the 1 in 60 rule give useful accuracy?",o:["About 20°","About 5°","About 60°","Any angle"],e:"The rule relies on the small-angle approximation. It is close enough for navigation corrections up to about 20°."}
]});

extendTopic("nav", "radionav", { qs:[
{type:"calc", gen:() => { const m = rnd(10, 350, 10), r = (m + 180) % 360 || 360;
  return { q:`Your QDM to a station is ${pad3(m)}°. What is your QDR? (degrees)`, a:r, tol:0, unit:"°",
    steps:[`QDR = QDM ± 180°`, `${pad3(m)} ${m < 180 ? "+" : "−"} 180 = ${pad3(r)}°`] }; }},
{type:"calc", gen:() => { let h, rb, q; do { h = rnd(10, 350, 10); rb = rnd(10, 350, 10); q = (h + rb) % 360; } while(q === 0);
  return { q:`Magnetic heading ${pad3(h)}°, ADF relative bearing ${pad3(rb)}°. What is the QDM to the NDB? (degrees)`, a:q, tol:0, unit:"°",
    steps:[`QDM = magnetic heading + relative bearing`, `${pad3(h)} + ${pad3(rb)} = ${h + rb}${h + rb > 360 ? ` − 360 = ${pad3(q)}` : ""}°`] }; }},
{type:"calc", gen:() => { const h = [1600, 2500, 3600, 4900, 6400][rnd(0, 4)], r = 1.23 * Math.sqrt(h);
  return { q:`Roughly what VHF range would you expect at ${h.toLocaleString("en-GB")} ft over flat terrain? (nearest nm)`, a:Math.round(r), tol:2, unit:" nm",
    steps:[`Range ≈ 1.23 × √height`, `√${h} = ${Math.sqrt(h)}`, `1.23 × ${Math.sqrt(h)} = ${r.toFixed(1)} nm`] }; }},
{type:"match", q:"Match each Q-code to its meaning.", pairs:[["QDM","Magnetic bearing to the station"],["QDR","Magnetic bearing from the station"],["QTE","True bearing from the station"],["QNH","Altimeter setting to read altitude above mean sea level"],["QFE","Altimeter setting to read height above the aerodrome"]],
  e:"QDM and QDR are magnetic, to and from. QTE and QUJ are true, from and to."},
{q:"An aircraft is on the 090 radial of a VOR. Where is it?",o:["East of the station","West of the station","North of the station","Heading 090°, anywhere"],e:"A radial is a magnetic bearing from the station, so the 090 radial runs out to the east. It says nothing about the aircraft's heading."}
]});
