// 020 Aircraft General Knowledge
(() => {
const pitotStatic = `<figure class="fig wide"><svg viewBox="0 0 440 210" role="img" aria-label="Pitot-static system: pitot feeds only the airspeed indicator; static feeds the airspeed indicator, altimeter and VSI">
<rect class="fb" x="1" y="1" width="438" height="208" rx="6"/>
<rect x="20" y="40" width="70" height="26" rx="4" class="f-tint ln"/><text class="tb" x="55" y="58" text-anchor="middle">PITOT</text>
<rect x="20" y="140" width="70" height="26" rx="4" class="f-mag ln"/><text class="tb" x="55" y="158" text-anchor="middle">STATIC</text>
${[["ASI",120],["ALT",230],["VSI",340]].map(([n,x]) => `<circle cx="${x+30}" cy="100" r="32" class="f-card ln"/><text class="tb" x="${x+30}" y="105" text-anchor="middle">${n}</text>`).join("")}
<path d="M90,53 L150,53 L150,68" class="ln pa" style="stroke-width:3"/>
<path d="M90,153 L400,153 M150,153 L150,132 M260,153 L260,132 M370,153 L370,132" class="ln pb" style="stroke-width:3"/>
<text class="tm" x="160" y="30">pitot pressure (ram air)</text><text class="tm" x="160" y="190">static pressure (outside air pressure)</text>
</svg><figcaption>The ASI compares pitot and static pressure. The altimeter and VSI use static pressure only.</figcaption></figure>`;

const fourStroke = `<div class="sq">
<div class="tile"><div class="big">1</div><div class="d"><b>Induction</b>: piston down, inlet valve open, mixture drawn in</div></div>
<div class="tile"><div class="big">2</div><div class="d"><b>Compression</b>: piston up, both valves closed</div></div>
<div class="tile"><div class="big">3</div><div class="d"><b>Power</b>: spark ignites, burning gas drives the piston down</div></div>
<div class="tile"><div class="big">4</div><div class="d"><b>Exhaust</b>: piston up, exhaust valve open, gases pushed out</div></div>
</div>`;

const T = [];
T.push({ id:"airframe", ref:"020 · 1", title:"Airframe, controls and landing gear",
blurb:"How the structure carries loads, the control runs, undercarriage, brakes and tyres, and the structural limits.",
learn:()=>`
<h3>Structure</h3>
<ul>
<li><b>Monocoque</b>: the skin carries the loads, like an egg shell. <b>Semi-monocoque</b>, used on most light aircraft, adds frames, stringers and longerons so skin and framework share the load.</li>
<li>The wing's main <b>spar</b> carries the bending load; ribs give the aerofoil shape; the skin takes torsion.</li>
<li>Flying controls are usually moved by cables, pulleys and push-pull rods. Check for full and free movement in the correct sense before every flight.</li>
</ul>
<h3>Landing gear, brakes and tyres</h3>
<ul>
<li>Most trainers have a <b>tricycle</b> undercarriage: a nosewheel plus two mainwheels. It is directionally stable on the ground and gives good visibility on take-off and landing.</li>
<li>Nose legs often have an <b>oleo</b> (oil and air) strut to absorb shocks, and a shimmy damper to stop the nosewheel oscillating.</li>
<li>Brakes are normally <b>hydraulic disc</b> brakes on the mainwheels, operated by toe pedals. Check for leaks, pad wear and disc condition.</li>
<li>Tyres: check inflation, cuts, wear and <b>creep marks</b>. These are painted marks on the tyre and wheel; if they no longer line up, the tyre has slipped on the rim and the inner tube valve may be at risk.</li>
</ul>
<h3>Structural limits</h3>
<div class="tbl"><table>
<tr><th>Category</th><th>Limit load factors</th><th>Typical use</th></tr>
<tr><td>Normal</td><td>+3.8 g to −1.52 g</td><td>Normal flying, no aerobatics</td></tr>
<tr><td>Utility</td><td>+4.4 g to −1.76 g</td><td>Limited manoeuvres such as spins, if approved</td></tr>
<tr><td>Aerobatic</td><td>+6.0 g to −3.0 g</td><td>Aerobatics</td></tr>
</table></div>
<p>The <b>limit load</b> is the most the structure should ever see in service. The <b>ultimate load</b> is 1.5 times that; beyond the limit load, permanent damage is possible.</p>
<div class="box trap"><b>Common trap</b>Creep marks show the tyre slipping on the wheel, not tread wear.</div>`,
qs:[
{q:"What is a semi-monocoque structure?",o:["One where the skin and an internal framework of frames and stringers share the loads","One where the skin carries no load at all","One where the skin alone carries all the loads","A structure made entirely of steel tube"],e:"Semi-monocoque combines a load-bearing skin with frames, stringers and longerons. Pure monocoque relies on the skin alone; a tube frame with fabric covering uses the framework alone."},
{q:"Which part of the wing carries most of the bending load?",o:["The main spar","The ribs","The leading edge","The wing tip"],e:"The spar runs along the span and resists bending. Ribs keep the aerofoil shape."},
{q:"What do creep marks on a tyre and wheel show?",o:["Whether the tyre has slipped round on the wheel rim","How much tread is left","The correct inflation pressure","The date the tyre was fitted"],e:"If the marks are out of line, the tyre has moved on the rim, which can tear the valve from an inner tube."},
{q:"What is the purpose of a shimmy damper on the nosewheel?",o:["To stop the nosewheel oscillating from side to side","To absorb landing shocks","To steer the aircraft","To lock the nosewheel straight in flight"],e:"Shimmy is a rapid side-to-side oscillation of the nosewheel. The damper stops it. Shock absorption is the oleo's job."},
{q:"What are the limit load factors for an aircraft in the Normal category?",o:["+3.8 g to −1.52 g","+4.4 g to −1.76 g","+6.0 g to −3.0 g","+2.0 g to −1.0 g"],e:"Normal +3.8/−1.52, Utility +4.4/−1.76, Aerobatic +6.0/−3.0."},
{q:"How does ultimate load relate to limit load?",o:["Ultimate load is 1.5 times the limit load","They are the same","Ultimate load is half the limit load","Ultimate load is twice the limit load"],e:"Structures are designed with a 1.5 safety factor. Between limit and ultimate load, permanent deformation is possible; beyond ultimate, failure."},
{q:"How are the brakes on a typical light training aircraft operated?",o:["Hydraulically, by toe pedals on the rudder pedals","Mechanically, by the control column","Electrically, from a switch","By the flap lever"],e:"Most trainers have hydraulic disc brakes on the mainwheels, worked by pressing the top of the rudder pedals."},
{q:"An oleo strut absorbs landing shocks using:",o:["Oil and compressed air or nitrogen","Springs only","Rubber blocks only","The tyre pressure alone"],e:"An oleo-pneumatic strut uses compressed gas as a spring and oil forced through an orifice to damp the motion."},
{type:"match", q:"Match each part to its main job.", pairs:[["Spar","Carries the wing's bending load"],["Ribs","Give the wing its aerofoil shape"],["Oleo strut","Absorbs landing shocks"],["Shimmy damper","Stops the nosewheel oscillating"]],
  e:"Knowing what each part does tells you what to look for on the walk-round."},
{q:"Why is a tricycle undercarriage easier to handle on the ground than a tailwheel?",o:["The CG is ahead of the mainwheels, so it tends to run straight","It has bigger brakes","It always has nosewheel steering linked to the ailerons","It makes the aircraft lighter"],e:"With the CG ahead of the mainwheels, a swing tends to correct itself. A tailwheel aircraft's CG is behind the mainwheels, so a swing tends to grow (a ground loop)."},
{q:"During your pre-flight check you find the control column moves the ailerons the wrong way. What should you do?",o:["Do not fly; report it as a serious defect","Fly carefully and use the rudder for roll","Ask a passenger to help hold the controls","Note it in the tech log after the flight"],e:"Crossed control cables have caused fatal accidents after maintenance. Always check controls for full, free and correct movement, and never fly with a fault."},
{q:"What does a red line on a structural or engine instrument normally mean?",o:["A limit that must never be exceeded","The normal operating range","A caution range for smooth air only","The minimum value for starting"],e:"Red lines mark maximum (or minimum) limits; green arcs normal ranges; yellow arcs caution ranges."}
]});

T.push({ id:"engine", ref:"020 · 2", title:"The piston engine",
blurb:"The four-stroke cycle, magnetos and ignition, oil, temperatures, detonation and the fixed-pitch propeller.",
learn:()=>`
<h3>The four-stroke cycle</h3>
${fourStroke}
<p>Light aircraft engines are usually <b>horizontally opposed</b> and <b>air-cooled</b>. Each cylinder fires once every two turns of the crankshaft.</p>
<h3>Ignition: magnetos</h3>
<ul>
<li>Two independent <b>magnetos</b>, each firing one of two spark plugs in every cylinder. Two plugs give a better burn and a back-up if one system fails.</li>
<li>Magnetos make their own electricity from engine rotation. The engine keeps running with the master switch off or a flat battery.</li>
<li>The <b>mag check</b> at the power check compares the RPM drop on each magneto with the limits in the POH. Your checklist gives a maximum drop of 125 RPM and a maximum difference of 50 RPM.</li>
<li>Switching a magneto off <b>earths</b> it through the P-lead. If a P-lead is broken, that magneto stays <b>live</b> with the switch off, and the propeller is dangerous to touch. The <b>dead cut check</b> before shutdown confirms both earth properly.</li>
</ul>
<h3>Oil and temperatures</h3>
<ul>
<li>Oil lubricates, cools, seals and cleans. Oil pressure should rise within about 30 seconds of starting; if not, shut down.</li>
<li>Low oil pressure with high oil temperature points to an engine problem; land as soon as possible.</li>
<li>Long climbs at low airspeed and full power raise cylinder head temperatures; a cruise-climb at a higher speed helps cooling.</li>
</ul>
<h3>Detonation and pre-ignition</h3>
<ul>
<li><b>Detonation</b>: the mixture explodes violently instead of burning smoothly, from too low a fuel grade, too lean a mixture or high temperatures. It can damage pistons quickly.</li>
<li><b>Pre-ignition</b>: the mixture ignites before the spark, from a hot spot such as carbon deposits.</li>
</ul>
<h3>Fixed-pitch propeller</h3>
<p>With a fixed-pitch propeller, the tachometer (RPM) is the power indicator. RPM rises with airspeed in a dive and falls in a climb at the same throttle setting.</p>`,
qs:[
{type:"order", q:"Put the four strokes of the cycle in order.", items:["Induction","Compression","Power","Exhaust"], e:"Suck, squeeze, bang, blow. Each cylinder completes the cycle every two crankshaft revolutions."},
{q:"Why does a piston aero engine have two magnetos?",o:["For redundancy and a more complete burn, with two plugs per cylinder","To start the engine faster","To charge the battery","So one can run while the other cools"],e:"Dual ignition is safer (one can fail) and burns the mixture more efficiently from two flame fronts."},
{q:"The master switch is turned off in flight. What happens to the engine?",o:["It keeps running, because the magnetos are self-powered","It stops at once","It runs rough on one magneto","It stops when the battery runs flat"],e:"Magnetos generate their own current. Electrical instruments and radios would stop, but the engine would not."},
{q:"What is the danger of a broken magneto P-lead?",o:["The magneto stays live with the ignition off, so the propeller could start the engine if moved","The engine will not start","The battery will discharge","The oil pressure will drop"],e:"The P-lead earths the magneto when switched off. Broken, it can't, so always treat a propeller as live."},
{q:"What is the purpose of the dead cut check?",o:["To confirm both magnetos switch off properly before shutdown","To test the starter motor","To check the fuel selector","To check the alternator output"],e:"Briefly switching the magnetos off at idle should make the engine falter. If it doesn't, a magneto isn't earthing."},
{type:"calc", gen:() => { const rpm = rnd(1700, 1700), l = rnd(60, 125, 5), r = l + rnd(10, 70, 5);
  return { q:`At the power check (your checklist limits: maximum drop 125 RPM, maximum difference 50 RPM), RPM is ${rpm}. Left magneto gives ${rpm - l} RPM, right gives ${rpm - r} RPM. What is the difference between the two drops?`, a:r - l, tol:0, unit:" RPM",
    steps:[`Left drop = ${rpm} − ${rpm - l} = ${l}`, `Right drop = ${rpm} − ${rpm - r} = ${r}`, `Difference = ${r} − ${l} = ${r - l} RPM`, r > 125 || r - l > 50 ? "Outside your checklist limits: don't fly." : "Within your checklist limits."] }; },
  e:"Check both the size of each drop and the difference between them against the limits in your checklist and POH."},
{q:"Oil pressure has not risen within 30 seconds of starting. What should you do?",o:["Shut the engine down","Increase RPM to raise the pressure","Wait another five minutes","Take off; it will rise in flight"],e:"No oil pressure means no lubrication. Shut down at once to avoid engine damage. Your checklist says the same."},
{q:"Which of these is NOT a function of engine oil?",o:["Providing the fuel for combustion","Lubricating","Cooling","Sealing and cleaning"],e:"Oil lubricates, cools, seals and cleans. It is not part of the combustion process."},
{q:"What is detonation?",o:["Explosive, uncontrolled burning of the mixture after the spark","Ignition from a hot spot before the spark","A magneto failure","Fuel freezing in the carburettor"],e:"Detonation is a violent explosion instead of a smooth burn. Causes include low-grade fuel, too lean a mixture and high temperatures."},
{q:"What is pre-ignition?",o:["The mixture igniting before the spark, from a hot spot","The mixture exploding after the spark","Starting the engine with the primer","Ignition with both magnetos off"],e:"Pre-ignition comes from glowing deposits or overheated parts. Detonation happens after normal ignition."},
{q:"In an aircraft with a fixed-pitch propeller, which instrument shows engine power?",o:["The tachometer (RPM)","The manifold pressure gauge","The oil pressure gauge","The ammeter"],e:"With fixed pitch, RPM is the power indication. Constant-speed propellers use manifold pressure as well."},
{q:"With the throttle fixed, what happens to RPM as a fixed-pitch propeller aircraft enters a dive?",o:["It rises","It falls","It stays the same","It drops to idle"],e:"Higher airspeed unloads the propeller, so it turns faster. Watch you don't exceed the RPM red line."}
]});

T.push({ id:"fuel", ref:"020 · 3", title:"Fuel systems and carburation",
blurb:"Fuel grades and colours, gravity-fed systems, drains and vents, the carburettor, mixture and carb icing.",
learn:()=>`
<h3>Fuel grades</h3>
<div class="tbl"><table>
<tr><th>Fuel</th><th>Colour</th><th>Notes</th></tr>
<tr><td>AVGAS 100LL</td><td>Blue</td><td>Standard aviation gasoline for most piston engines</td></tr>
<tr><td>Jet A-1</td><td>Clear to straw</td><td>Kerosene for turbines and some diesel engines. In a petrol engine it causes detonation and engine failure</td></tr>
<tr><td>Mogas / UL91</td><td>Varies</td><td>Only where the engine and airframe are approved for it</td></tr>
</table></div>
<p>Jet A-1 nozzles are usually wider than avgas nozzles so they don't fit an avgas filler, but don't rely on that: check the grade every time.</p>
<h3>The fuel system</h3>
<ul>
<li>High-wing aircraft like the Cessna 150 usually feed fuel by <b>gravity</b> from the wing tanks; low-wing aircraft need fuel pumps.</li>
<li>Tank <b>vents</b> let air in as fuel is used. A blocked vent can starve the engine.</li>
<li><b>Water</b> is heavier than fuel and collects at the lowest points. Drain samples from every drain point before flight and check for water and debris.</li>
<li><b>Unusable fuel</b> is the amount the system can't deliver; it doesn't count towards endurance.</li>
</ul>
<h3>The carburettor and mixture</h3>
<ul>
<li>In a float carburettor, air speeds up through a <b>venturi</b>; the drop in pressure draws fuel from the float chamber. The throttle valve (butterfly) controls how much mixture reaches the cylinders.</li>
<li>As you climb, air density falls but the fuel flow doesn't, so the mixture becomes too <b>rich</b>. Leaning with the mixture control restores the right ratio.</li>
<li>Full rich for take-off at low aerodromes; lean as the POH directs in the cruise. <b>Idle cut-off</b> stops the engine by shutting off the fuel.</li>
</ul>
<h3>Carburettor icing</h3>
<p>Fuel evaporation and the pressure drop in the venturi cool the air, so ice can form well above 0 °C in humid air. Carb heat takes hot, <b>unfiltered</b> air from around the exhaust; use it as the checklist directs, and not on the ground in dusty conditions. Fuel-injected engines don't suffer carburettor icing.</p>`,
qs:[
{q:"What colour is AVGAS 100LL?",o:["Blue","Green","Red","Clear to straw"],e:"100LL is dyed blue. Jet A-1 is clear to straw coloured."},
{q:"What would happen if Jet A-1 were put into a piston engine designed for avgas?",o:["Detonation and probable engine failure","It would run normally","It would only cause rough idling","It would improve performance"],e:"Kerosene doesn't burn properly in a spark-ignition engine. Misfuelling has caused fatal accidents; always confirm the grade."},
{q:"Why do you drain a fuel sample before flight?",o:["To check for water and contamination, which collect at the lowest point","To check the fuel quantity","To cool the fuel","To release vapour from the tank"],e:"Water is heavier than fuel and settles at the drains. Take samples from all drain points until they are clean."},
{q:"How is fuel usually fed to the engine in a high-wing trainer such as the Cessna 150?",o:["By gravity from the wing tanks","By an electric pump only","By the oil pump","By pressure from the propeller"],e:"The tanks sit above the engine, so gravity feeds the carburettor."},
{q:"What could a blocked fuel tank vent cause?",o:["Fuel starvation as a vacuum builds in the tank","Overfilling","Carburettor icing","Oil leaks"],e:"As fuel leaves the tank, air must replace it. A blocked vent stops this and the flow can stop."},
{q:"As you climb without leaning, the mixture becomes:",o:["Too rich","Too lean","Unchanged","Weak at low level only"],e:"Air density falls with height while fuel flow is unchanged, so the fuel/air ratio rises: too rich."},
{q:"What does the idle cut-off position of the mixture control do?",o:["Shuts off fuel to stop the engine","Gives the richest mixture","Turns off the magnetos","Opens the carburettor heat"],e:"Shutting down with idle cut-off stops the engine by fuel starvation, leaving no fuel in the cylinders to fire unexpectedly."},
{q:"Why is carb heat air unfiltered, and when should you avoid using it on the ground?",o:["It is taken from around the exhaust, so avoid it on dusty or gravel surfaces","It is filtered, so it can be used anywhere","It is only used for starting","It comes from the cabin"],e:"Unfiltered hot air bypasses the air filter. Using it on the ground can draw in dust and grit."},
{q:"How does a float carburettor draw fuel in?",o:["Air speeds up through a venturi; the lower pressure draws fuel from the float chamber","The fuel pump sprays it directly into the cylinders","The magnetos pull it in electrically","Gravity alone pours it into the cylinders"],e:"The venturi effect is the same Bernoulli principle as lift."},
{q:"Which engine type does not suffer from carburettor icing?",o:["A fuel-injected engine","A float-carburettor engine at low power","Any engine on a humid day","A carburetted engine in cruise"],e:"Fuel injection has no venturi or evaporation in the induction air path, so no carburettor ice. Intake icing from snow or freezing rain is still possible."},
{type:"match", q:"Match each fuel to its usual appearance.", pairs:[["AVGAS 100LL","Blue"],["Jet A-1","Clear to straw"],["Water in a sample","Bubbles or a separate layer at the bottom"]],
  e:"A clear sample from an avgas tank is suspicious: it may be water or the wrong fuel."},
{q:"What is unusable fuel?",o:["Fuel the system cannot deliver to the engine, which must not be counted in your endurance","Fuel that has been contaminated","Fuel in the carburettor","The reserve fuel"],e:"The POH gives total and usable capacity. Plan only with usable fuel."}
]});

T.push({ id:"electrics", ref:"020 · 4", title:"The electrical system",
blurb:"Battery, alternator, master switch, ammeter, circuit breakers and what still works when the electrics fail.",
learn:()=>`
<ul>
<li>Light aircraft use a <b>DC</b> system, usually 14 V or 28 V.</li>
<li>The <b>battery</b> starts the engine and is a back-up supply if the alternator fails.</li>
<li>The engine-driven <b>alternator</b> powers the system in flight and recharges the battery. Most alternators need some battery power to start producing current.</li>
<li>The <b>master switch</b> connects the battery and alternator to the system; some aircraft have a split switch for each.</li>
<li><b>Circuit breakers</b> and fuses protect each circuit from overload. Reset a popped breaker once only, after a short pause; if it pops again, leave it out.</li>
<li>The <b>ammeter</b> shows whether the battery is charging (positive) or discharging (negative). A load meter instead shows the alternator's output.</li>
</ul>
<h3>Alternator failure</h3>
<p>Signs: low-voltage warning light, ammeter showing discharge. Shed all non-essential loads to stretch the battery, follow the checklist (your electrical failure drill: shed loads, check and reset, master off for 3 seconds then on), and land as soon as practical. The battery will only last a limited time.</p>
<h3>What still works?</h3>
<div class="tbl"><table>
<tr><th>Keeps working with total electrical failure</th><th>Stops</th></tr>
<tr><td>Engine (magnetos), ASI, altimeter, VSI, compass, vacuum-driven gyros (AI and DI on many trainers)</td><td>Radios, transponder, electric turn coordinator, fuel gauges (on many aircraft), lights, electric flaps, stall warner if electric</td></tr>
</table></div>
<div class="box trap"><b>Common trap</b>An electrical failure does not stop the engine. A vacuum pump failure does not stop the electrics. Know which instruments run from which source in your aircraft.</div>`,
qs:[
{q:"What is the main job of the alternator in flight?",o:["To supply the electrical system and recharge the battery","To fire the spark plugs","To drive the vacuum pump","To start the engine"],e:"The alternator is engine driven and powers everything electrical in flight. The magnetos look after ignition separately."},
{q:"The ammeter shows a steady discharge in flight. What is most likely?",o:["The alternator has failed and the battery is supplying the system","The battery is overcharging","The magnetos have failed","Everything is normal"],e:"A discharge means the battery is being drained. Shed loads and follow the electrical failure checklist."},
{q:"A circuit breaker pops in flight. What is the usual advice?",o:["Wait a moment, reset it once; if it pops again, leave it out","Hold it in so the circuit keeps working","Reset it repeatedly until it stays in","Never reset it in flight"],e:"A breaker that trips again shows a real fault. Forcing it in can start an electrical fire. Your radio failure drill says 'reset only once'."},
{q:"With a total electrical failure, which instrument would normally keep working?",o:["The airspeed indicator","The transponder","The radio","The electric turn coordinator"],e:"The pitot-static instruments (ASI, altimeter, VSI) and the compass need no electricity."},
{q:"After an alternator failure, why shed non-essential electrical loads?",o:["To make the battery last as long as possible","To stop the engine overheating","To reset the magnetos","To charge the battery"],e:"The battery has limited capacity. Reducing loads buys time for the essential radio and transponder."},
{q:"What does the master switch do?",o:["Connects the battery and alternator to the aircraft's electrical system","Switches the magnetos on and off","Turns on the fuel pump only","Controls the radio volume"],e:"The master is the electrical system's main switch. The magneto switch is separate."},
{q:"Which statement about magnetos and the electrical system is correct?",o:["The magnetos are independent of the battery and alternator","The magnetos are powered by the battery","The magnetos are powered by the alternator","The magnetos stop if the master switch is off"],e:"That's why the engine keeps running after an electrical failure."},
{type:"order", q:"Put the actions from your checklist's electrical failure drill in order.", items:["Shed all non-essential electrical load","Check field/output and reset circuit breakers","Check ammeter/voltage and warning light","Master switch off for 3 seconds, then on"],
  e:"If output returns, keep to essential services only and land or divert as soon as practicable, as your checklist says."},
{q:"Why might the fuel gauges become unreliable after a total electrical failure?",o:["On many aircraft the fuel gauges are electrically powered","Fuel stops flowing without electricity","The fuel freezes","They are linked to the magnetos"],e:"Know your fuel by time and consumption, not just by the gauges."},
{q:"What is the usual system voltage in a light aircraft?",o:["14 V or 28 V DC","230 V AC","110 V AC","6 V DC"],e:"Light aircraft use low-voltage DC systems, typically 12/14 V or 24/28 V."},
{type:"match", q:"Match each component to its job.", pairs:[["Battery","Starts the engine and backs up the supply"],["Alternator","Powers the system in flight and recharges the battery"],["Circuit breaker","Protects a circuit from overload"],["Ammeter","Shows charge or discharge"]],
  e:"A quick way to diagnose an electrical problem is to ask which of these has failed."}
]});

T.push({ id:"instruments", ref:"020 · 5", title:"Flight instruments",
blurb:"The pitot-static instruments and their blockages, ASI markings, the gyro instruments and the magnetic compass.",
learn:()=>`
${pitotStatic}
<h3>Blockages</h3>
<div class="tbl"><table>
<tr><th>Blocked</th><th>ASI</th><th>Altimeter</th><th>VSI</th></tr>
<tr><td>Static (in a climb)</td><td>Under-reads</td><td>Stuck at the level where it blocked</td><td>Reads zero</td></tr>
<tr><td>Static (in a descent)</td><td>Over-reads</td><td>Stuck</td><td>Reads zero</td></tr>
<tr><td>Pitot (and its drain)</td><td>Acts like an altimeter: over-reads in a climb, under-reads in a descent</td><td>Normal</td><td>Normal</td></tr>
</table></div>
<p>Many aircraft have an <b>alternate static source</b> inside the cabin. Cabin pressure is usually slightly lower than outside, so the ASI and altimeter may read a little high.</p>
<h3>ASI markings</h3>
<div class="tbl"><table>
<tr><th>Marking</th><th>Meaning</th></tr>
<tr><td>White arc</td><td>Flap operating range: from the stall speed with full flap (Vso) to the maximum flap extended speed (Vfe)</td></tr>
<tr><td>Green arc</td><td>Normal operating range: from the clean stall speed (Vs1) to the maximum structural cruising speed (Vno)</td></tr>
<tr><td>Yellow arc</td><td>Caution range, smooth air only: Vno to Vne</td></tr>
<tr><td>Red line</td><td>Never exceed speed (Vne)</td></tr>
</table></div>
<h3>Gyro instruments</h3>
<ul>
<li><b>Attitude indicator</b>: shows pitch and bank; on many trainers it is driven by a <b>vacuum</b> pump. Check the suction gauge.</li>
<li><b>Direction indicator (DI)</b>: has no magnetic sense, and drifts (precesses). Realign it with the compass in steady, level flight, about every 15 minutes.</li>
<li><b>Turn coordinator</b>: shows rate of roll and turn, often electric. The balance ball is a simple inclinometer: step on the ball to centre it.</li>
</ul>
<h3>Magnetic compass errors (northern hemisphere)</h3>
<ul>
<li><b>Acceleration errors</b> on easterly or westerly headings: accelerate and it shows a turn towards north; decelerate, towards south (ANDS).</li>
<li><b>Turning errors</b> when rolling out: undershoot north, overshoot south (UNOS).</li>
</ul>`,
qs:[
{q:"Which instrument uses both pitot and static pressure?",o:["The airspeed indicator","The altimeter","The VSI","The magnetic compass"],e:"The ASI measures the difference between pitot (total) and static pressure: dynamic pressure."},
{q:"The static source becomes blocked during a climb. What will the altimeter do?",o:["Stay at the reading where the blockage happened","Over-read","Under-read","Read zero"],e:"With the static pressure trapped, the altimeter has nothing new to measure and freezes."},
{q:"The static source is blocked and the aircraft climbs. What does the ASI do?",o:["Under-reads","Over-reads","Reads correctly","Reads zero"],e:"The trapped static pressure is higher than the real outside pressure, so pitot minus static is too small."},
{q:"The pitot tube and its drain hole are blocked. How does the ASI behave in a climb?",o:["It over-reads, acting like an altimeter","It under-reads","It reads correctly","It drops to zero"],e:"Pitot pressure is trapped while static pressure falls in the climb, so the difference grows and the ASI shows an increasing speed."},
{q:"What does the top of the white arc on the ASI show?",o:["The maximum flap extended speed (Vfe)","The never exceed speed","The stall speed with full flap","The maximum structural cruising speed"],e:"The white arc runs from Vso (bottom) to Vfe (top)."},
{q:"In which range should you fly only in smooth air?",o:["The yellow arc","The green arc","The white arc","Below the white arc"],e:"The yellow arc, from Vno to Vne, is the caution range: only in smooth air, avoiding large control movements."},
{q:"Why must the DI be realigned with the compass during flight?",o:["Gyroscopic precession makes it drift","It is affected by deviation","It only works on northerly headings","It is powered by the magnetos"],e:"The DI has no magnetic sense. Realign it with the compass in steady, level flight, about every 15 minutes."},
{q:"On many light trainers, what drives the attitude indicator?",o:["A vacuum pump","The battery directly","The pitot tube","The magnetos"],e:"Many trainers use a vacuum system for the AI and DI and an electric turn coordinator, so one failure doesn't take out all the gyros."},
{q:"In the northern hemisphere, flying east, you accelerate. What does the magnetic compass show?",o:["A turn towards north","A turn towards south","No change","A turn towards east"],e:"Acceleration errors on east or west headings: Accelerate North, Decelerate South (ANDS)."},
{q:"When rolling out of a turn onto north using the compass in the northern hemisphere, you should:",o:["Roll out before the compass shows north (undershoot)","Roll out after it passes north (overshoot)","Roll out exactly as it reaches north","Use the compass only on easterly headings"],e:"Undershoot north, overshoot south (UNOS) allows for the compass's turning errors."},
{q:"The balance ball is out to the right in a turn. What should you do?",o:["Apply right rudder","Apply left rudder","Apply more bank","Reduce power"],e:"'Step on the ball': press the rudder on the side the ball has moved to."},
{type:"match", q:"Match each ASI marking to its meaning.", pairs:[["White arc","Flap operating range"],["Green arc","Normal operating range"],["Yellow arc","Caution, smooth air only"],["Red line","Never exceed speed"]],
  e:"Use the actual speeds from your aircraft's POH; the markings are a reminder."},
{q:"Using the alternate static source in the cabin, what is the usual effect on the instruments?",o:["The ASI and altimeter read slightly high","They read slightly low","No effect at all","The VSI stops working"],e:"Cabin air pressure is usually a little lower than outside, so the instruments read slightly higher. The POH may give a correction."}
]});

T.push({ id:"airworthiness", ref:"020 · 6", title:"Airworthiness and maintenance",
blurb:"The certificates and records that keep an aircraft legal to fly, and what a pilot may do themselves.",
learn:()=>`
<ul>
<li><b>Certificate of airworthiness (C of A)</b>: shows the aircraft type meets the airworthiness standard. It stays valid only while the aircraft is maintained and has a current airworthiness review.</li>
<li><b>Airworthiness review certificate (ARC)</b>: confirms the aircraft's airworthiness has been reviewed. Usually renewed every year.</li>
<li><b>Certificate of release to service (CRS)</b>: signed after maintenance to release the aircraft back into service.</li>
<li><b>Technical log</b>: records flying hours, defects and when the next maintenance is due. Check it before every flight.</li>
<li>Aircraft on a <b>Permit to Fly</b> (for example LAA types) follow a different system with their own conditions.</li>
</ul>
<h3>Pilot maintenance</h3>
<p>A pilot-owner may do certain simple tasks, such as specific inspections or replacing some items, as allowed by the maintenance rules and recorded properly. As a student or club pilot, you report defects and leave maintenance to the maintenance organisation.</p>
<h3>Defects</h3>
<p>Write any defect in the tech log. If it affects airworthiness, the aircraft must not fly until it has been put right and released. If in doubt, don't fly.</p>
<div class="box note"><b>Check</b>The exact documents and intervals depend on how the aircraft is registered and maintained. Ask your school how its aircraft are managed.</div>`,
qs:[
{q:"What does a certificate of release to service (CRS) show?",o:["That maintenance has been completed and the aircraft released back into service","That the pilot is fit to fly","That the aircraft is registered","That the insurance is valid"],e:"A CRS is signed by the person or organisation that did the maintenance."},
{q:"How often is an airworthiness review certificate (ARC) normally renewed?",o:["Every year","Every five years","Every month","Only when the aircraft is sold"],e:"The ARC usually runs for 12 months, after which the aircraft's airworthiness is reviewed again."},
{q:"Where would you check how many hours remain before the next scheduled maintenance?",o:["The technical log","The pilot's logbook","The POH","The certificate of registration"],e:"The tech log records hours flown, defects and maintenance due."},
{q:"You notice a cracked exhaust pipe on the walk-round. What should you do?",o:["Record the defect, report it, and don't fly until it has been assessed","Fly and report it afterwards","Tape it up and fly","Ignore it if the engine starts normally"],e:"An exhaust crack can cause carbon monoxide in the cabin or a fire. Defects affecting airworthiness ground the aircraft until fixed."},
{q:"Which statement about a student pilot doing maintenance is correct?",o:["A student should report defects and leave maintenance to the maintenance organisation","A student may carry out any repair","Students must change the oil before each flight","Maintenance never needs recording"],e:"Pilot-owner maintenance is limited to specific tasks with proper records, and doesn't apply to students flying school aircraft."},
{type:"match", q:"Match each document to what it shows.", pairs:[["Certificate of registration","Who owns the aircraft and its registration mark"],["Certificate of airworthiness","The type meets the airworthiness standard"],["Airworthiness review certificate","The aircraft's airworthiness has been reviewed recently"],["Technical log","Hours, defects and maintenance due"]],
  e:"Before flight you're checking that each of these is in date and shows nothing outstanding."},
{q:"An LAA-type homebuilt aircraft usually flies on:",o:["A Permit to Fly","A full certificate of airworthiness","No paperwork","A temporary licence"],e:"Permit aircraft have their own airworthiness system and operating conditions."},
{q:"Which of these would make an aircraft unairworthy?",o:["An unrectified defect affecting safety recorded in the tech log","A dirty windscreen that is easily cleaned","The fuel tank being half full","A passenger's luggage on board"],e:"An outstanding airworthiness defect grounds the aircraft until it is rectified and released."},
{q:"You are about to fly and see that scheduled maintenance is overdue by 2 hours in the tech log. What should you do?",o:["Not fly until the maintenance is done or properly extended","Fly, as 2 hours is small","Fly but reduce power","Reset the hours in the log"],e:"Maintenance limits are legal limits unless a permitted extension is properly recorded."},
{q:"What is the purpose of the walk-round inspection in relation to airworthiness?",o:["To find obvious defects and confirm the aircraft is fit for the flight","To replace the annual inspection","To certify the aircraft for release","It is optional for short flights"],e:"The pre-flight inspection is the pilot's check. It doesn't replace maintenance, but it catches problems that appear between inspections."},
{q:"Who is responsible for deciding whether the aircraft is fit for the flight?",o:["The pilot-in-command","The fuel bowser driver","The air traffic controller","The aircraft owner only"],e:"The PIC must be satisfied the aircraft is airworthy before each flight."}
]});

SUBJECTS.push({ id:"agk", code:"020", name:"Aircraft General Knowledge",
  blurb:"How the aircraft is built and how its systems work: airframe, engine, fuel and carburation, electrics, flight instruments, and the paperwork that keeps it airworthy.",
  topics:T });
})();
