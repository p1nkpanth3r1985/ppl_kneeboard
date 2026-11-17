// 030 Flight Performance and Planning
(() => {
// An example aircraft for the calculations: invented figures, not any real type's.
const EX = { bem:520, bemArm:0.85, seatArm:0.95, fuelArm:1.05, bagArm:1.60, mtom:760 };
const factorsTable = `<div class="tbl"><table>
<tr><th>Condition</th><th>Take-off distance factor</th><th>Landing distance factor</th></tr>
<tr><td>10% more weight</td><td>1.20</td><td>1.10</td></tr>
<tr><td>Each 1,000 ft of aerodrome elevation</td><td>1.10</td><td>1.05</td></tr>
<tr><td>Each 10 °C rise in temperature</td><td>1.10</td><td>1.05</td></tr>
<tr><td>Dry grass (up to 20 cm, firm soil)</td><td>1.20</td><td>1.15</td></tr>
<tr><td>Wet grass (up to 20 cm, firm soil)</td><td>1.30</td><td>1.35</td></tr>
<tr><td>Wet paved surface</td><td>—</td><td>1.15</td></tr>
<tr><td>2% uphill slope (take-off) / 2% downhill slope (landing)</td><td>1.10</td><td>1.10</td></tr>
<tr><td>Tailwind of 10% of lift-off speed</td><td>1.20</td><td>1.20</td></tr>
<tr><td>Soft ground or snow</td><td>1.25 or more</td><td>1.25 or more</td></tr>
<tr><td>Safety factor, if the POH figures are unfactored</td><td>1.33</td><td>1.43</td></tr>
</table></div>`;

const T = [];
T.push({ id:"mass", ref:"030 · 1", title:"Mass and balance",
blurb:"The definitions, moments and centre of gravity, and why both the weight and the CG must be in limits.",
learn:()=>`
<h3>Definitions</h3>
<div class="tbl"><table>
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td>Basic empty mass</td><td>The aircraft with unusable fuel, full oil and fixed equipment, from its weight schedule</td></tr>
<tr><td>Datum</td><td>The reference point from which all arms are measured, set by the manufacturer</td></tr>
<tr><td>Arm</td><td>Distance of an item from the datum</td></tr>
<tr><td>Moment</td><td>Mass × arm</td></tr>
<tr><td>Centre of gravity (CG)</td><td>Total moment ÷ total mass</td></tr>
<tr><td>Maximum take-off mass</td><td>The most the aircraft may weigh at the start of the take-off</td></tr>
</table></div>
<h3>Working out the CG</h3>
<p>List every item with its mass and arm, multiply to get each moment, add the masses and the moments, then divide. Check that both the total mass and the CG fall within the envelope in the POH.</p>
<div class="tbl"><table>
<tr><th>Item</th><th>Mass (kg)</th><th>Arm (m)</th><th>Moment (kg m)</th></tr>
<tr><td>Basic empty mass</td><td>520</td><td>0.85</td><td>442.0</td></tr>
<tr><td>Pilot and passenger</td><td>160</td><td>0.95</td><td>152.0</td></tr>
<tr><td>Fuel 60 L × 0.72</td><td>43</td><td>1.05</td><td>45.2</td></tr>
<tr><td>Baggage</td><td>10</td><td>1.60</td><td>16.0</td></tr>
<tr><td><b>Total</b></td><td><b>733</b></td><td></td><td><b>655.2</b></td></tr>
</table></div>
<p>CG = 655.2 ÷ 733 = <b>0.894 m</b> aft of the datum. These are made-up example figures; always use your aircraft's own weight schedule and POH.</p>
<h3>Why it matters</h3>
<ul>
<li><b>Overweight</b>: longer take-off run, poorer climb, higher stall speed, structural loads beyond design.</li>
<li><b>CG forward</b> of the limit: heavy elevator, may not be able to flare or rotate.</li>
<li><b>CG aft</b> of the limit: unstable in pitch, possibly unrecoverable stall or spin.</li>
<li>Fuel burn moves the CG during the flight; check it at take-off and at landing.</li>
</ul>`,
qs:[
{q:"How is the centre of gravity calculated?",o:["Total moment divided by total mass","Total mass divided by total moment","Total mass multiplied by total arm","The average of all the arms"],e:"Add up all the moments (mass × arm), add up the masses, then divide moment by mass."},
{q:"What is a moment in mass and balance?",o:["Mass multiplied by its arm from the datum","The time taken to load the aircraft","The mass of fuel used per hour","The distance between the CG limits"],e:"Moment = mass × arm. Moments add up even though arms don't."},
{q:"What is the datum?",o:["The reference point from which all arms are measured","The aircraft's centre of gravity","The maximum take-off mass","The forward CG limit"],e:"The manufacturer chooses the datum; it can be anywhere, even ahead of the aircraft's nose."},
{type:"calc", gen:() => { const p = rnd(130, 190, 5), L = rnd(40, 90, 5), f = Math.round(L * 0.72), b = rnd(0, 20, 5);
  const m = EX.bem + p + f + b, mo = EX.bem*EX.bemArm + p*EX.seatArm + f*EX.fuelArm + b*EX.bagArm, cg = mo / m;
  return { q:`Example aircraft: basic empty mass ${EX.bem} kg at ${EX.bemArm} m; front seats ${p} kg at ${EX.seatArm} m; fuel ${L} L (at 0.72 kg/L = ${f} kg) at ${EX.fuelArm} m; baggage ${b} kg at ${EX.bagArm} m. Where is the CG, in metres aft of the datum? (two decimal places)`, a:Math.round(cg*100)/100, tol:0.01, unit:" m",
    steps:[`Moments: ${EX.bem}×${EX.bemArm} = ${(EX.bem*EX.bemArm).toFixed(1)}; ${p}×${EX.seatArm} = ${(p*EX.seatArm).toFixed(1)}; ${f}×${EX.fuelArm} = ${(f*EX.fuelArm).toFixed(1)}; ${b}×${EX.bagArm} = ${(b*EX.bagArm).toFixed(1)}`,
      `Total mass = ${m} kg; total moment = ${mo.toFixed(1)} kg m`, `CG = ${mo.toFixed(1)} ÷ ${m} = ${cg.toFixed(3)} m`] }; },
  e:"Invented example figures. Use your own aircraft's weight schedule for real loading."},
{type:"calc", gen:() => { const L = rnd(30, 110, 5), kg = L * 0.72;
  return { q:`Avgas has a specific gravity of 0.72. What is the mass of ${L} litres? (nearest kg)`, a:Math.round(kg), tol:1, unit:" kg",
    steps:[`Mass = litres × 0.72`, `${L} × 0.72 = ${kg.toFixed(1)} kg`] }; }},
{type:"calc", gen:() => { const m = rnd(60, 110), a = [0.95, 1.05, 1.6, 2.2][rnd(0, 3)], mo = m * a;
  return { q:`A ${m} kg item is placed ${a} m aft of the datum. What is its moment? (one decimal place)`, a:Math.round(mo*10)/10, tol:0.1, unit:" kg m",
    steps:[`Moment = mass × arm = ${m} × ${a} = ${mo.toFixed(1)} kg m`] }; }},
{q:"What is the main danger of the CG being behind the aft limit?",o:["Reduced stability in pitch and possibly an unrecoverable stall or spin","Heavy elevator forces","A longer take-off run only","Higher fuel consumption only"],e:"An aft CG reduces the tailplane's restoring moment. Beyond the limit, the aircraft may be unstable and recovery may not be possible."},
{q:"What is the main danger of the CG being ahead of the forward limit?",o:["Not enough elevator authority to rotate or flare","The aircraft becomes unstable in pitch","Lower stall speed","Better climb performance"],e:"A forward CG needs more tail download. Near or beyond the limit, you can run out of elevator at low speed."},
{q:"Why should the CG be checked for the landing as well as the take-off?",o:["Burning fuel changes both the mass and the CG during the flight","The datum moves in flight","Passengers may move about","It is only required for aerobatics"],e:"If the fuel tanks are away from the CG, using fuel moves it. Some loadings are fine at take-off but out of limits at landing."},
{q:"Which effect would being over the maximum take-off mass NOT cause?",o:["A lower stall speed","A longer take-off run","A poorer rate of climb","Higher loads on the structure"],e:"More mass raises the stall speed; it also lengthens the take-off and reduces climb."},
{type:"order", q:"Put the steps of a mass and balance calculation in order.", items:["List each item's mass and arm","Work out each moment (mass × arm)","Add up the masses and the moments","Divide total moment by total mass to find the CG","Check mass and CG against the POH envelope"],
  e:"Then repeat for the landing, with the fuel you expect to use taken off."},
{q:"What is included in the basic empty mass?",o:["The aircraft, unusable fuel, full oil and fixed equipment","The aircraft plus a full load of fuel","The aircraft plus the pilot","Only the airframe without the engine"],e:"Basic empty mass comes from the aircraft's weight schedule, which is updated when equipment changes."}
]});

T.push({ id:"takeoff", ref:"030 · 2", title:"Take-off and landing performance",
blurb:"Runway distances, what makes them longer, the CAA factors and safety margins, and the effect of wind.",
learn:()=>`
<h3>Declared distances</h3>
<div class="tbl"><table>
<tr><th>Distance</th><th>Meaning</th></tr>
<tr><td>TORA</td><td>Take-off run available: the runway length available for the ground run</td></tr>
<tr><td>TODA</td><td>Take-off distance available: TORA plus any clearway</td></tr>
<tr><td>ASDA</td><td>Accelerate-stop distance available: TORA plus any stopway</td></tr>
<tr><td>LDA</td><td>Landing distance available</td></tr>
</table></div>
<h3>CAA factors</h3>
<p>From the CAA's Safety Sense leaflet on aeroplane performance. The factors <b>multiply</b> together.</p>
${factorsTable}
<p>Example: book take-off distance 400 m, dry grass (×1.20), 10 °C warmer than the chart (×1.10), safety factor (×1.33): 400 × 1.20 × 1.10 × 1.33 = <b>702 m</b> needed.</p>
<h3>Wind</h3>
<p>When using the POH charts, the CAA advises allowing for <b>no more than 50% of the reported headwind</b> component and <b>at least 150% of any tailwind</b> component. Headwind shortens the distances; tailwind lengthens them sharply.</p>
<div class="box trap"><b>Common trap</b>Don't add the percentages; multiply the factors. 1.20 × 1.30 is 1.56, not 1.50.</div>`,
qs:[
{type:"calc", gen:() => { const d = rnd(300, 500, 10); const opts = [["dry grass",1.2],["wet grass",1.3],["a 2% uphill slope",1.1],["an aerodrome 1,000 ft above sea level",1.1],["a temperature 10 °C above the chart figure",1.1],["10% more weight than the chart",1.2]];
  const a = opts[rnd(0, 5)], b = opts.filter(x => x !== a)[rnd(0, 4)], r = d * a[1] * b[1] * 1.33;
  return { q:`The POH gives an unfactored take-off distance of ${d} m. Conditions: ${a[0]} and ${b[0]}. Using the CAA factors and the 1.33 safety factor, what distance do you need? (nearest 10 m)`, a:Math.round(r/10)*10, tol:10, unit:" m",
    steps:[`Factors: ${a[0]} ×${a[1]}, ${b[0]} ×${b[1]}, safety ×1.33`, `${d} × ${a[1]} × ${b[1]} × 1.33 = ${r.toFixed(0)} m`] }; },
  e:"Factors multiply. Compare the answer with the take-off distance available."},
{type:"calc", gen:() => { const d = rnd(350, 480, 10), wet = rnd(0, 1), f = wet ? 1.35 : 1.15, r = d * f * 1.43;
  return { q:`The POH gives an unfactored landing distance of ${d} m. You are landing on ${wet ? "wet" : "dry"} grass. Using the CAA factors and the 1.43 safety factor, what landing distance do you need? (nearest 10 m)`, a:Math.round(r/10)*10, tol:10, unit:" m",
    steps:[`${wet ? "Wet" : "Dry"} grass landing factor ×${f}; safety factor ×1.43`, `${d} × ${f} × 1.43 = ${r.toFixed(0)} m`] }; }},
{q:"How should the CAA performance factors be combined?",o:["Multiplied together","Added together","Only the largest one used","Averaged"],e:"The Safety Sense leaflet is explicit: factors must be multiplied."},
{q:"What is the CAA's recommended safety factor for take-off distance, if the POH figures are unfactored?",o:["1.33","1.43","1.10","2.00"],e:"1.33 for take-off and 1.43 for landing."},
{q:"What is the CAA's recommended safety factor for landing distance, if the POH figures are unfactored?",o:["1.43","1.33","1.15","1.50"],e:"Landing has the higher factor, 1.43, because touchdown point and technique vary more."},
{q:"What factor does dry grass add to the take-off distance?",o:["1.20","1.30","1.10","1.43"],e:"Dry grass up to 20 cm on firm soil: ×1.20 for take-off. Wet grass: ×1.30."},
{q:"When using the POH wind correction, how much of a reported headwind does the CAA advise you to allow for?",o:["No more than 50%","All of it","150%","None"],e:"Wind varies, so take credit for only half the headwind, and allow for at least 150% of any tailwind."},
{q:"What is TODA?",o:["Take-off run available plus any clearway","The length of the runway only","The runway plus stopway","The landing distance available"],e:"TODA = TORA + clearway. ASDA = TORA + stopway."},
{q:"Which combination gives the longest take-off distance?",o:["Heavy, hot, high aerodrome, wet grass, slight tailwind","Light, cold, sea level, paved, headwind","Light, hot, sea level, paved","Heavy, cold, sea level, paved, headwind"],e:"Each adverse factor multiplies the distance: weight, temperature, elevation, surface and tailwind all add up fast."},
{q:"What factor does a tailwind of 10% of the lift-off speed add to the take-off distance?",o:["1.20","1.05","1.10","1.50"],e:"Even a small tailwind makes a big difference: ×1.20 for take-off and landing."},
{type:"match", q:"Match each declared distance to its definition.", pairs:[["TORA","Runway length available for the ground run"],["TODA","TORA plus clearway"],["ASDA","TORA plus stopway"],["LDA","Length available for landing"]],
  e:"Declared distances are published in the AIP and flight guides for each runway."},
{q:"Very short wet grass on firm subsoil can be very slippery. What landing distance increase does the CAA leaflet mention for it?",o:["Up to 60% (a factor of 1.6)","10%","25%","There is no effect"],e:"Short, wet grass can behave like ice for braking. The leaflet notes it can give a 60% increase."}
]});

T.push({ id:"density", ref:"030 · 3", title:"Pressure and density altitude",
blurb:"Working out pressure altitude and density altitude, and what they do to performance.",
learn:()=>`
<h3>Pressure altitude</h3>
<p>Pressure altitude is the altitude in the standard atmosphere for the pressure you're at. It is what the altimeter shows with <b>1013 hPa</b> set. From the aerodrome elevation and QNH:</p>
<p><span class="mono">pressure altitude = elevation + (1013 − QNH) × 30 ft</span></p>
<p>Example: elevation 500 ft, QNH 1003: 500 + 10 × 30 = <b>800 ft</b>.</p>
<h3>Density altitude</h3>
<p>Density altitude is pressure altitude corrected for temperature. Performance depends on density, so a hot day at a low aerodrome can perform like a much higher one. A rule of thumb:</p>
<p><span class="mono">density altitude ≈ pressure altitude + 120 × (OAT − ISA temperature) ft</span></p>
<p>Example: pressure altitude 800 ft (ISA about 13 °C), OAT 28 °C: 800 + 120 × 15 = <b>2,600 ft</b>.</p>
<h3>Effect on performance</h3>
<ul>
<li>Less dense air means less engine power, less propeller thrust and less lift at a given true airspeed.</li>
<li>Take-off and landing runs get longer (true airspeed is higher for the same IAS) and climb rates fall.</li>
<li>Humidity also reduces density a little.</li>
</ul>`,
qs:[
{type:"calc", gen:() => { const el = rnd(0, 800, 50), q = rnd(990, 1030); const pa = el + (1013 - q) * 30;
  return { q:`Aerodrome elevation ${el} ft, QNH ${q} hPa. What is the pressure altitude? (use 30 ft per hPa; a minus sign if below sea level)`, a:pa, tol:0, unit:" ft", neg:true,
    steps:[`Pressure altitude = elevation + (1013 − QNH) × 30`, `${el} + (1013 − ${q}) × 30 = ${el} + ${(1013 - q) * 30} = ${pa} ft`] }; },
  e:"Low QNH raises the pressure altitude; high QNH lowers it."},
{type:"calc", gen:() => { const pa = rnd(0, 3000, 500), isa = 15 - 2 * pa / 1000, oat = Math.round(isa + rnd(5, 20)), da = pa + 120 * (oat - isa);
  return { q:`Pressure altitude ${pa} ft, outside air temperature ${oat} °C. Using the 120 ft per °C rule and 2 °C per 1,000 ft for ISA, what is the density altitude? (nearest 100 ft)`, a:Math.round(da/100)*100, tol:100, unit:" ft",
    steps:[`ISA at ${pa} ft = 15 − ${2*pa/1000} = ${isa} °C`, `ISA deviation = ${oat} − ${isa} = ${oat - isa} °C`, `DA = ${pa} + 120 × ${oat - isa} = ${da} ft`] }; }},
{q:"What does the altimeter show when 1013 hPa is set on the subscale?",o:["Pressure altitude","Density altitude","Height above the aerodrome","True altitude"],e:"Pressure altitude is the altitude in the standard atmosphere for the current pressure."},
{q:"Which conditions give a high density altitude?",o:["High temperature, high elevation, low pressure","Low temperature, low elevation, high pressure","Low temperature, high pressure","Any cloudy day"],e:"Heat, height and low pressure all reduce density."},
{q:"How does a high density altitude affect take-off performance?",o:["Longer take-off run and poorer climb","Shorter take-off run","No effect if the IAS is the same","Better climb"],e:"Less power, less thrust, and a higher true airspeed for the same IAS all lengthen the run and reduce the climb."},
{q:"Aerodrome elevation 300 ft, QNH 1023 hPa. What is the pressure altitude?",o:["0 ft","600 ft","300 ft","−300 ft"],e:"300 + (1013 − 1023) × 30 = 300 − 300 = 0 ft."},
{q:"How does humidity affect air density?",o:["Humid air is slightly less dense","Humid air is much denser","It has no effect","Humid air is denser only in winter"],e:"Water vapour is lighter than the nitrogen and oxygen it replaces, so moist air is slightly less dense."},
{q:"At a high density altitude, compared with sea level, the true airspeed at lift-off (same IAS) is:",o:["Higher","Lower","The same","Zero"],e:"In thinner air the same IAS means a higher TAS, and so a higher groundspeed and longer run."},
{q:"Why is density altitude important when using performance charts?",o:["Aircraft performance depends on air density, not just elevation","It changes the aircraft's empty mass","It is needed for the radio","It sets the transponder code"],e:"Many POH charts take pressure altitude and temperature as inputs, which together give density."},
{type:"match", q:"Match each term to its meaning.", pairs:[["Pressure altitude","Altitude shown with 1013 hPa set"],["Density altitude","Pressure altitude corrected for temperature"],["Elevation","Height of the aerodrome above mean sea level"]],
  e:"Elevation is fixed; pressure and density altitude change with the weather."}
]});

T.push({ id:"climbcruise", ref:"030 · 4", title:"Climb, cruise, range and endurance",
blurb:"What changes climb performance, and how to fly for the longest distance or the longest time.",
learn:()=>`
<h3>Climb</h3>
<ul>
<li><b>Vx</b> (best angle) gives most height for distance: obstacle clearance.</li>
<li><b>Vy</b> (best rate) gives most height for time: the normal climb.</li>
<li>Climb performance falls with more weight, higher density altitude and higher temperature. Flap usually reduces the rate of climb.</li>
</ul>
<h3>Range and endurance</h3>
<div class="tbl"><table>
<tr><th>Aim</th><th>Fly at</th></tr>
<tr><td>Maximum range (furthest distance)</td><td>Roughly the speed for best lift/drag ratio; a little faster into a headwind, a little slower with a tailwind</td></tr>
<tr><td>Maximum endurance (longest time)</td><td>A lower speed, for the least power required</td></tr>
</table></div>
<ul>
<li>Leaning the mixture as the POH directs reduces fuel flow in the cruise.</li>
<li>Wind doesn't change endurance, but it changes the distance covered in that time.</li>
<li>The POH cruise tables give power settings, TAS and fuel flow for different altitudes and RPM.</li>
</ul>`,
qs:[
{q:"Which speed gives the greatest height gain in a given time?",o:["Vy","Vx","Vne","Vfe"],e:"Vy is best rate of climb. Vx is best angle."},
{q:"How does increased weight affect the rate of climb?",o:["It reduces it","It increases it","No effect","It increases it only at high altitude"],e:"More weight needs more lift and more power just to stay level, leaving less spare for climbing."},
{q:"To stay airborne for the longest time (for example while holding), you should fly at:",o:["The maximum endurance speed, which is lower than the best range speed","Vne","The maximum range speed","Full power"],e:"Endurance is about using the least fuel per hour, which happens at the speed for least power required."},
{q:"Flying into a strong headwind, how should the speed for best range change?",o:["Fly a little faster","Fly a little slower","No change","Fly at Vx"],e:"Into a headwind, a bit more speed reduces the time spent fighting the wind, improving range over the ground."},
{q:"Does wind affect the endurance of an aircraft?",o:["No; it affects distance covered, not time airborne","Yes; a headwind increases endurance","Yes; a tailwind increases endurance","Only above 5,000 ft"],e:"Endurance depends on fuel flow. Wind changes how far you get in that time."},
{q:"What is the usual effect of lowering flap on the rate of climb?",o:["It reduces it","It increases it","No effect","It doubles it"],e:"Flap adds drag. Small settings may sometimes help the angle of climb from a short strip, as the POH directs, but the rate is reduced."},
{type:"calc", gen:() => { const f = rnd(60, 100, 5), r = rnd(18, 28), m = f / r * 60;
  return { q:`Usable fuel ${f} L, fuel flow ${r} L/h. What is the endurance in minutes, with no reserve? (nearest minute)`, a:Math.round(m), tol:1, unit:" min",
    steps:[`Endurance = usable fuel ÷ fuel flow = ${f} ÷ ${r} = ${(f/r).toFixed(2)} h`, `× 60 = ${m.toFixed(0)} min`] }; },
  e:"Plan to land with your final reserve intact, so the usable endurance for the trip is less than this."},
{q:"Where would you find the fuel flow for a given cruise power setting and altitude?",o:["The cruise performance table in the POH","The certificate of airworthiness","The tech log","The ASI markings"],e:"The POH cruise tables give RPM, TAS and fuel flow at different altitudes and temperatures."},
{q:"How does a higher density altitude affect the climb?",o:["Climb rate reduces","Climb rate increases","No change","Only Vx changes"],e:"Less power and thrust are available in thinner air, so the climb rate falls."},
{type:"match", q:"Match each speed or aim to what it gives you.", pairs:[["Vx","Most height for distance"],["Vy","Most height for time"],["Best range speed","Most distance for fuel"],["Best endurance speed","Most time for fuel"]],
  e:"The POH gives the actual speeds for your aircraft."}
]});

T.push({ id:"fuelplan", ref:"030 · 5", title:"Fuel planning",
blurb:"Building up the fuel for a flight, the reserve rules, conversions and monitoring fuel in flight.",
learn:()=>`
<h3>Building up the fuel</h3>
<div class="tbl"><table>
<tr><th>Part</th><th>What for</th></tr>
<tr><td>Taxi</td><td>Start-up, taxi and power checks</td></tr>
<tr><td>Trip</td><td>Take-off, climb, cruise and descent to the destination</td></tr>
<tr><td>Contingency</td><td>Unexpected headwinds, routing changes, holding</td></tr>
<tr><td>Alternate</td><td>Diverting from the destination to an alternate, if needed</td></tr>
<tr><td>Final reserve</td><td>Fuel you plan never to use</td></tr>
</table></div>
<h3>Final reserve for aeroplanes (non-commercial rules)</h3>
<ul>
<li><b>VFR by day</b>: 30 minutes at holding speed at 1,500 ft above the destination.</li>
<li>VFR by day, taking off and landing at the same aerodrome and staying within sight of it: 10 minutes at maximum continuous cruise power.</li>
<li>VFR by night: 45 minutes.</li>
</ul>
<p>Many schools and pilots set a larger personal reserve, for example an hour. Check your school's rules.</p>
<h3>Conversions</h3>
<p>1 US gallon = 3.785 L. 1 imperial gallon = 4.546 L. Avgas: 1 L ≈ 0.72 kg.</p>
<h3>In flight</h3>
<ul>
<li>Check fuel against the plan at regular intervals (the F in FREDA). If it doesn't match, find out why.</li>
<li>Decide early: divert while you still have options, not when the reserve is being used.</li>
</ul>`,
qs:[
{q:"What is the final reserve fuel for an aeroplane flying VFR by day under the non-commercial rules?",o:["30 minutes at holding speed at 1,500 ft above the destination","10 minutes in all cases","45 minutes","1 hour"],e:"30 minutes for VFR by day; 45 for VFR by night. The 10-minute case applies only to flights staying in sight of the departure aerodrome."},
{q:"When may the shorter 10-minute final reserve be used for a VFR day flight?",o:["When taking off and landing at the same aerodrome and staying within sight of it","On any local flight","When the weather is good","When carrying no passengers"],e:"It is a narrow case: same aerodrome, in sight of it throughout."},
{type:"calc", gen:() => { const t = rnd(40, 120, 5), r = rnd(18, 28), trip = r * t / 60, res = r * 0.5, tot = trip + res;
  return { q:`Flight time ${t} min, fuel flow ${r} L/h. Ignoring taxi and contingency, how much fuel do you need for the trip plus a 30-minute final reserve? (nearest litre)`, a:Math.round(tot), tol:1, unit:" L",
    steps:[`Trip = ${r} × ${t}/60 = ${trip.toFixed(1)} L`, `Reserve = ${r} × 0.5 = ${res.toFixed(1)} L`, `Total = ${tot.toFixed(1)} L`] }; },
  e:"Add taxi and contingency fuel too, and never plan to use the final reserve."},
{type:"calc", gen:() => { const g = rnd(15, 26), l = g * 3.785;
  return { q:`A POH gives usable fuel as ${g} US gallons. How many litres is that? (nearest litre)`, a:Math.round(l), tol:1, unit:" L",
    steps:[`1 US gallon = 3.785 L`, `${g} × 3.785 = ${l.toFixed(1)} L`] }; }},
{type:"calc", gen:() => { const kg = rnd(30, 80), l = kg / 0.72;
  return { q:`How many litres of avgas weigh ${kg} kg? (nearest litre)`, a:Math.round(l), tol:1, unit:" L",
    steps:[`Litres = kg ÷ 0.72`, `${kg} ÷ 0.72 = ${l.toFixed(1)} L`] }; }},
{q:"What is contingency fuel for?",o:["Unexpected extras such as stronger headwinds or a route change","Starting the engine","The final approach only","Filling the tanks to the top"],e:"Contingency covers the unexpected without eating into the final reserve."},
{type:"order", q:"Put the parts of the fuel calculation in the order they're used in a flight.", items:["Taxi fuel","Trip fuel","Contingency fuel","Alternate fuel","Final reserve"],
  e:"Plan to land with the final reserve still in the tanks."},
{q:"Halfway through a flight you have used more fuel than planned. What should you do?",o:["Work out why, recalculate, and divert early if the reserve is threatened","Carry on and hope the wind changes","Lean the mixture fully and continue","Ignore it; the gauges are unreliable"],e:"Fuel checks against the plan are there to catch this. Decide early, while you still have options."},
{q:"What is the final reserve for an aeroplane flying VFR at night?",o:["45 minutes","30 minutes","10 minutes","60 minutes"],e:"At night the reserve rises to 45 minutes at holding speed at 1,500 ft above the destination."},
{q:"Why is unusable fuel excluded from fuel planning?",o:["The fuel system cannot deliver it to the engine","It is contaminated","It is kept for emergencies","It is too heavy"],e:"Only usable fuel keeps the engine running."},
{q:"The fuel gauges read more than your fuel log shows. Which should you trust for planning?",o:["The lower figure, and check why they differ","The higher figure","The gauges always","Neither; land immediately"],e:"Light aircraft gauges are often inaccurate. Plan on the more conservative figure and use time and fuel flow as your main check."}
]});

T.push({ id:"planning", ref:"030 · 6", title:"Flight planning and the PLOG",
blurb:"Planning a cross-country: route, safety altitude, the PLOG, weather, NOTAMs and notification.",
learn:()=>`
<h3>Planning a route</h3>
<ul>
<li>Draw the route on the current chart, checking airspace, danger areas, obstacles and terrain.</li>
<li>Choose turning points that are easy to identify.</li>
<li>Work out a <b>safety altitude</b> for each leg. A common method: the highest ground or obstacle within 5 nm of track, plus 1,000 ft, rounded up to the next 100 ft. Your school may use a different margin.</li>
<li>Pick cruising levels that clear the safety altitude where possible and suit the airspace.</li>
</ul>
<h3>The PLOG</h3>
<div class="tbl"><table>
<tr><th>Column</th><th>Source</th></tr>
<tr><td>True track and distance</td><td>Measured on the chart</td></tr>
<tr><td>Wind velocity</td><td>Forecast for the level and time</td></tr>
<tr><td>Heading and groundspeed</td><td>Wind triangle (flight computer)</td></tr>
<tr><td>Magnetic heading</td><td>True heading ± variation</td></tr>
<tr><td>Time and fuel</td><td>Distance ÷ groundspeed; time × fuel flow</td></tr>
</table></div>
<h3>Before you go</h3>
<ul>
<li>Weather: forecasts, METARs and TAFs for departure, destination and alternates.</li>
<li>NOTAMs for the route and aerodromes, and any temporary restrictions.</li>
<li>Prior permission (PPR) where the destination needs it; opening hours.</li>
<li>Mass and balance, performance and fuel.</li>
<li>Book out with the departure aerodrome. A flight plan is required for some flights, for example when crossing an international FIR boundary.</li>
</ul>`,
qs:[
{type:"calc", gen:() => { const h = rnd(400, 2600, 10), sa = Math.ceil((h + 1000) / 100) * 100;
  return { q:`Using the method "highest point within 5 nm of track, plus 1,000 ft, rounded up to the next 100 ft": the highest obstacle near your leg is ${h.toLocaleString("en-GB")} ft AMSL. What is the safety altitude?`, a:sa, tol:0, unit:" ft",
    steps:[`${h} + 1,000 = ${h + 1000} ft`, `Round up to the next 100 ft: ${sa} ft`] }; },
  e:"Different schools use different margins; follow yours."},
{q:"Which wind direction goes into the PLOG wind triangle?",o:["The forecast wind, in degrees true","The surface wind from the ATIS in degrees magnetic","The wind at the destination only","No wind is needed"],e:"Forecast winds aloft are in degrees true, matching true tracks measured on the chart. Convert to magnetic heading after the triangle."},
{q:"Why should turning points be features that are easy to identify?",o:["So you can confirm your position at each change of heading","They make the route shorter","They avoid the need for a PLOG","They are required by law"],e:"A turning point you can't find makes every leg after it uncertain."},
{q:"Which of these should you check before a cross-country flight?",o:["NOTAMs for the route and aerodromes","The aircraft's last owner","The fuel price","The previous day's METARs only"],e:"NOTAMs can close aerodromes, activate restricted airspace or warn of hazards."},
{q:"When is a flight plan required in the UK for a VFR flight?",o:["For some flights, for example when crossing an international FIR boundary","For every flight","Never","Only at night"],e:"Most UK domestic VFR flights only need booking out, but flights crossing international FIR boundaries need a flight plan. Check the current requirements in the AIP."},
{q:"What does PPR mean?",o:["Prior permission required","Pilot position report","Public parking restricted","Planned power reduction"],e:"Many aerodromes require you to contact them before arriving."},
{type:"order", q:"Put these PLOG steps for one leg in a sensible order.", items:["Measure true track and distance on the chart","Enter the forecast wind for the level","Work out true heading and groundspeed","Apply variation to get magnetic heading","Work out the time and fuel for the leg"],
  e:"Then add up times and fuel for the whole route and compare with the fuel available."},
{q:"What is the main purpose of a safety altitude?",o:["To give clearance above terrain and obstacles if visibility deteriorates","To set the transition altitude","To decide the cruising speed","To satisfy ATC only"],e:"It's the altitude to climb to if you lose sight of the ground or are uncertain of position."},
{type:"calc", gen:() => { const d = rnd(20, 60), g = rnd(80, 115, 5), r = rnd(20, 26), m = d * 60 / g, f = r * m / 60;
  return { q:`PLOG leg: ${d} nm at a groundspeed of ${g} kt, fuel flow ${r} L/h. How much fuel will the leg use? (one decimal place)`, a:Math.round(f*10)/10, tol:0.3, unit:" L",
    steps:[`Time = ${d} × 60 ÷ ${g} = ${m.toFixed(1)} min`, `Fuel = ${r} × ${m.toFixed(1)} ÷ 60 = ${f.toFixed(1)} L`] }; }},
{q:"Why should you plan an alternate aerodrome?",o:["In case the destination becomes unavailable or the weather worsens","Because it is always a legal requirement for VFR","To make the flight longer","To refuel on every flight"],e:"An alternate gives you a planned option if things change. Include the fuel to reach it."},
{type:"match", q:"Match each source to what you get from it.", pairs:[["AIP aerodrome pages","Runways, circuits, frequencies and procedures"],["NOTAMs","Temporary changes and hazards"],["TAF","Forecast weather at an aerodrome"],["Chart","Airspace, terrain and obstacles"]],
  e:"A complete brief uses all of them."}
]});

SUBJECTS.push({ id:"fpp", code:"030", name:"Flight Performance & Planning",
  blurb:"Mass and balance, take-off and landing performance with the CAA factors, density altitude, climb and range, fuel planning, and planning a cross-country.",
  topics:T });
})();
