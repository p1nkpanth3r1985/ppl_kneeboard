// 070 Operational Procedures
(() => {
const wakeFig = `<figure class="fig wide"><svg viewBox="0 0 440 200" role="img" aria-label="Avoiding wake turbulence: lift off before the heavier aircraft's rotation point and land beyond its touchdown point">
<rect class="fb" x="1" y="1" width="438" height="198" rx="6"/>
<rect class="f-rw" x="20" y="150" width="400" height="18" rx="2"/>
<text class="tb" x="30" y="30">DEPARTING</text>
<circle cx="220" cy="150" r="5" class="f-mag"/><text class="t" x="220" y="186" text-anchor="middle">heavier aircraft rotates</text>
<path d="M220,150 Q300,110 420,60" class="ln pb dash" style="stroke-width:2"/>
<path d="M60,150 Q140,128 200,90 Q260,55 420,30" class="ln pa" style="stroke-width:3"/>
<circle cx="170" cy="112" r="4" class="f-ink"/><text class="t" x="110" y="100">you lift off before it</text>
<text class="t" x="300" y="128">its wake</text>
</svg><figcaption>On departure, lift off before the heavier aircraft's rotation point and climb above its path. On approach, stay above its path and land beyond its touchdown point. Vortices sink and drift with the wind.</figcaption></figure>`;

const T = [];
T.push({ id:"rules", ref:"070 · 1", title:"Operating rules and fuel",
blurb:"The pilot-in-command's responsibilities, pre-flight requirements, fuel reserves and passengers.",
learn:()=>`
<h3>The pilot-in-command</h3>
<ul>
<li>Responsible for the safety of the aircraft and everyone on board, and for following the rules.</li>
<li>Must be satisfied before flight that the aircraft is airworthy, correctly loaded, has enough fuel, and that the weather and route are suitable.</li>
<li>Must not fly if unfit, and must brief passengers.</li>
</ul>
<h3>Fuel</h3>
<ul>
<li>Plan enough fuel for the flight, plus a final reserve: <b>30 minutes</b> at holding speed for VFR by day, <b>45 minutes</b> for VFR by night.</li>
<li>Monitor fuel in flight. If the fuel expected on landing would be less than the final reserve, take action: divert or land.</li>
</ul>
<h3>Passengers</h3>
<ul>
<li>Brief them on seat belts and harnesses, doors and exits, emergency equipment, what to do in an emergency and when not to talk (for example on the approach).</li>
<li>No smoking on board.</li>
<li>Check what they bring: no dangerous goods such as fuel cans, gas canisters or loose lithium batteries without proper care.</li>
</ul>
<h3>Documents</h3>
<p>Carry what the rules and your school require, such as the POH, the certificates of registration and airworthiness, insurance, the radio licence and your licence or student authorisation. Your school's checklist lists them.</p>`,
qs:[
{q:"Who is responsible for deciding whether a flight can be made safely?",o:["The pilot-in-command","Air traffic control","The aircraft owner","The person who refuelled the aircraft"],e:"The PIC must be satisfied about the aircraft, the loading, fuel, weather and route before flight."},
{q:"What is the final reserve fuel for an aeroplane flying VFR by day?",o:["30 minutes at holding speed","10 minutes in all cases","45 minutes","No reserve is required"],e:"30 minutes for VFR day, 45 minutes for VFR night, under the non-commercial operating rules."},
{q:"In flight, you calculate you will land with less than your final reserve. What should you do?",o:["Take action now: divert or land where you can do so safely","Continue and hope for a tailwind","Climb higher to save fuel","Nothing; the reserve is there to be used"],e:"The final reserve is not planned to be used. If it is threatened, divert or land in good time."},
{q:"Which of these should a passenger briefing include?",o:["Seat belts, doors and exits, and what to do in an emergency","The route to the nearest café","How to fly the aircraft","Air traffic control frequencies"],e:"Passengers need to know how to secure themselves, how to get out, and what you'll ask of them in an emergency."},
{q:"A passenger arrives with a spare can of petrol for their car. What should you do?",o:["Refuse to carry it; it is a dangerous good","Put it in the baggage area","Hold it on your lap","Strap it to a seat"],e:"Fuel cans are dangerous goods and must not be carried in a light aircraft cabin."},
{q:"Who must be fit to fly before the flight?",o:["The pilot-in-command","Only the passengers","Only the instructor on a solo flight","Nobody; it is assumed"],e:"The PIC must not fly if they know or suspect they are unfit, for any reason."},
{type:"order", q:"Put these pre-flight decisions in a sensible order.", items:["Check the weather and NOTAMs","Plan the route and fuel","Do the mass and balance and performance","Book out and brief passengers","Carry out the aircraft checks"],
  e:"Decisions that could cancel the flight come first, so you don't waste time preparing an aircraft you won't fly."},
{q:"Is smoking permitted on board a light aircraft during flight?",o:["No","Yes, with the window open","Yes, in the cruise only","Yes, if the PIC agrees"],e:"No smoking on board. The fire risk in a small cabin full of fuel and oil is too high."},
{q:"Which of these must be satisfied before every flight?",o:["The aircraft is airworthy and correctly loaded, with enough fuel","The aircraft has been washed","The radio has a new battery","There are no passengers"],e:"Airworthiness, loading and fuel are the PIC's core pre-flight responsibilities."},
{type:"match", q:"Match each final reserve to the type of flight.", pairs:[["VFR by day","30 minutes"],["VFR by night","45 minutes"],["VFR by day, same aerodrome, in sight of it","10 minutes"]],
  e:"These are minimums. Many schools set a bigger personal reserve."},
{q:"Why brief passengers not to talk during certain phases of flight?",o:["The pilot needs to concentrate and hear the radio during take-off, approach and landing","It saves fuel","It is required by ATC","It keeps the cabin cooler"],e:"A sterile cockpit at busy times reduces distraction."},
{q:"You realise during the walk-round that there isn't enough fuel for the planned flight plus reserve. What do you do?",o:["Refuel, or shorten the flight so the reserve is protected","Go anyway and refuel at the destination","Plan to use the reserve","Fly faster to save fuel"],e:"Never start a flight without the fuel for the trip plus reserve."}
]});

T.push({ id:"wake", ref:"070 · 2", title:"Wake turbulence, downwash and windshear",
blurb:"How to avoid the wake of a heavier aircraft, helicopter downwash, and what windshear does on the approach.",
learn:()=>`
${wakeFig}
<h3>Wake turbulence</h3>
<ul>
<li>Vortices are strongest behind aircraft that are <b>heavy, clean and slow</b>, such as on take-off and approach.</li>
<li>They sink below the generating aircraft's path and keep sinking until they decay or reach the ground. Near the ground they can last around 80 seconds, and up to two and a half minutes in calm conditions.</li>
<li>A light crosswind of about 5 kt can hold the upwind vortex over the runway.</li>
<li>No vortices are produced once the nosewheel is on the ground.</li>
</ul>
<h3>Spacing on departure</h3>
<ul>
<li>Allow <b>2 minutes</b> behind a heavier aircraft taking off from the same point.</li>
<li>Allow <b>3 minutes</b> if you are starting part-way along the runway (an intermediate point).</li>
</ul>
<h3>Avoiding the wake</h3>
<ul>
<li>Approach: stay above and upwind of the heavier aircraft's path, and land beyond its touchdown point. If you can't, go around.</li>
<li>Departure: lift off before its rotation point and climb above its path. If you can't, wait.</li>
</ul>
<h3>Helicopter downwash</h3>
<p>Strongest when hovering or hover-taxiing, and extends to about three times the rotor diameter. Keep well clear of helicopters with rotors turning.</p>
<h3>Windshear</h3>
<p>A sudden change in wind speed or direction, near thunderstorms, fronts, hills and buildings. On the approach, a sudden loss of headwind drops the airspeed and the aircraft sinks. Use a speed margin in gusty conditions, and go around early if the approach becomes unstable.</p>`,
qs:[
{q:"How long should you allow behind a heavier aircraft taking off from the same point?",o:["2 minutes","30 seconds","5 minutes","No delay is needed"],e:"Two minutes from the same point, three minutes from an intermediate point."},
{q:"How long should you allow if you start your take-off part-way along the runway behind a heavier aircraft that used the full length?",o:["3 minutes","2 minutes","1 minute","10 minutes"],e:"Starting part-way along means you'll be lower through the area where it rotated, so allow more time."},
{q:"Landing behind a heavier aircraft, where should you aim to touch down?",o:["Beyond its touchdown point","Before its touchdown point","Exactly at its touchdown point","It doesn't matter"],e:"Its vortices stop at touchdown. Stay above its path and land beyond where it landed."},
{q:"Taking off behind a heavier aircraft, where should you aim to lift off?",o:["Before its rotation point, then climb above its path","After its rotation point","At exactly the same point","As late as possible"],e:"Its vortices start at rotation. Lifting off earlier keeps you above them."},
{q:"How do wake vortices move after they are produced?",o:["They sink and drift with the wind","They rise and disappear immediately","They stay at the height they formed","They move into wind"],e:"They descend below the flight path and drift downwind; near the ground they spread sideways."},
{q:"Which wind condition is particularly dangerous for wake turbulence over the runway?",o:["A light crosswind of about 5 kt","A strong 25 kt crosswind","A strong headwind","Gusty winds over 30 kt"],e:"A light crosswind can hold the upwind vortex on the runway. Strong winds break vortices up faster."},
{q:"When is a helicopter's downwash strongest?",o:["When hovering or hover-taxiing","In fast forward flight","With the engine off","Only on the ground with rotors stopped"],e:"In the hover the rotor supports the full weight, pushing a strong flow of air downwards and outwards."},
{q:"How far does helicopter downwash typically extend?",o:["About three times the rotor diameter","Only directly under the helicopter","About 1 km","Ten times the rotor diameter"],e:"Keep well clear of hovering helicopters."},
{q:"On final approach the aircraft suddenly loses headwind. What happens?",o:["Airspeed drops and the aircraft sinks below the approach path","Airspeed increases","Nothing changes","The aircraft climbs"],e:"A sudden loss of headwind reduces IAS until the aircraft accelerates again. Close to the ground this can be dangerous: add power and go around if needed."},
{q:"Are wake vortices produced once a landing aircraft's nosewheel is on the runway?",o:["No","Yes, strongest then","Only at night","Only from helicopters"],e:"Once the wing stops producing lift for flight, the vortices stop."},
{type:"match", q:"Match each situation to the right technique.", pairs:[["Landing behind a heavier aircraft","Stay above its path and land beyond its touchdown point"],["Departing behind a heavier aircraft","Lift off before its rotation point"],["Gusty approach","Add a speed margin and be ready to go around"],["Helicopter hovering near the runway","Keep well clear of its downwash"]],
  e:"Most wake turbulence encounters are avoidable with timing and positioning."},
{q:"Which aircraft produces the strongest wake vortices?",o:["A heavy aircraft flying slowly with flap up","A light aircraft flying fast","A heavy aircraft parked","A glider at high speed"],e:"Vortex strength depends on the lift being made and the angle of attack: heavy, clean and slow is worst."}
]});

T.push({ id:"emergency", ref:"070 · 3", title:"Emergencies, fire and smoke",
blurb:"Handling fire on the ground and in the air, smoke in the cabin, and using the extinguisher.",
learn:()=>`
<h3>Principles</h3>
<ul>
<li>Fly the aircraft first. Then deal with the emergency using the memory drill, then the checklist.</li>
<li>Tell someone: MAYDAY or PAN on the frequency in use or 121.5 MHz, and squawk 7700.</li>
</ul>
<h3>Fire</h3>
<div class="tbl"><table>
<tr><th>Fire</th><th>Key idea</th></tr>
<tr><td>Engine fire on start</td><td>Keep cranking to draw the fire into the engine, then cut fuel, as your drill directs; evacuate if it continues</td></tr>
<tr><td>Engine fire in flight</td><td>Starve it of fuel: throttle closed, mixture idle cut-off, fuel off, magnetos off; forced landing without power</td></tr>
<tr><td>Electrical fire</td><td>Remove the power: master off, shed loads; ventilate</td></tr>
<tr><td>Cabin fire</td><td>Use the extinguisher, then ventilate; land as soon as possible</td></tr>
</table></div>
<p>Your checklist has the exact drills for your aircraft; learn them by heart.</p>
<h3>Using a fire extinguisher</h3>
<ul>
<li>Know where it is and check it is in date and charged before each flight.</li>
<li>Aim at the base of the fire.</li>
<li>Many extinguishers produce fumes or powder that affect visibility and breathing; ventilate the cabin afterwards.</li>
</ul>
<h3>Smoke</h3>
<p>Open the fresh air vents, shut off the cabin heat if the smoke comes from there, and find the source. Smoke in the cabin is a reason to land as soon as possible.</p>`,
qs:[
{q:"In any emergency, what comes first?",o:["Fly the aircraft","Make a radio call","Read the checklist","Squawk 7700"],e:"Aviate, navigate, communicate. Losing control while dealing with the emergency makes it worse."},
{q:"What is the main aim of the engine fire in flight drill?",o:["To starve the fire of fuel","To increase airspeed to blow the fire out","To restart the engine","To land with power"],e:"Throttle closed, mixture cut-off, fuel off and magnetos off stop fuel reaching the fire. Then a forced landing without power."},
{q:"What is the first priority with an electrical fire?",o:["Remove the electrical power","Open the fuel cock","Climb","Increase power"],e:"Turning the master off removes the source of heat. Then shed loads and ventilate as the checklist directs."},
{q:"Where should you aim a fire extinguisher?",o:["At the base of the fire","At the top of the flames","At the smoke","Upwards into the air"],e:"The base is where the fuel is burning."},
{q:"After using an extinguisher in the cabin, what should you do?",o:["Ventilate the cabin","Close all vents","Turn up the cabin heat","Climb to a higher altitude"],e:"Extinguishant fumes and powder affect breathing and visibility; fresh air clears them."},
{q:"Smoke appears from the cabin heater outlet. What is a sensible first action?",o:["Shut off the cabin heat and open the fresh air vents","Turn the heat to maximum","Ignore it","Close all the vents"],e:"Cutting the heater stops the smoke at its source. Then consider the cause, possibly an exhaust problem, and land."},
{q:"Your checklist's engine fire during start drill begins with which action?",o:["Keep cranking the engine for 3–4 seconds","Open the door","Switch the master off","Apply full power"],e:"Cranking draws the fire back into the engine. Then mixture idle cut-off, throttle open, fuel off."},
{type:"order", q:"Put your checklist's engine fire in the air drill in order.", items:["Throttle: closed","Mixture: idle cut-off","Fuel: off","Magnetos: off","Cabin heater/defrost: off","Radio: MAYDAY, then forced landing without power"],
  e:"Learn it by heart from your own checklist; this is the order in your Pooley's booklet."},
{q:"Which of these should be checked on the fire extinguisher before flight?",o:["It is secure, charged and in date","Its colour","Its weight in pounds","It is empty"],e:"Your preliminary checks include the extinguisher: condition, in date, secure and accessible."},
{q:"Which call is right for an engine fire in flight?",o:["MAYDAY","PAN","No call needed","Request traffic information"],e:"A fire in flight is grave and imminent danger: MAYDAY, MAYDAY, MAYDAY."},
{type:"match", q:"Match each fire to the key idea in dealing with it.", pairs:[["Engine fire in flight","Starve it of fuel"],["Electrical fire","Remove the power"],["Cabin fire","Extinguish, then ventilate"],["Fire on the ground","Shut down and evacuate upwind"]],
  e:"The details are in your checklist's emergency section."}
]});

T.push({ id:"landings", ref:"070 · 4", title:"Forced landings and ditching",
blurb:"Choosing a field, preparing the cabin, landing on water, and survival afterwards.",
learn:()=>`
<h3>Choosing a field</h3>
<p>Size, shape, surface, slope, surroundings and the wind. Prefer a long field into wind, with a firm, level surface and a clear approach. Avoid crops that hide ditches, and fields with livestock or power lines.</p>
<h3>Preparing for the landing</h3>
<ul>
<li>MAYDAY call and squawk 7700.</li>
<li>Brief passengers; tighten harnesses; unlatch the doors before touchdown so they can't jam.</li>
<li>Fuel off, mixture idle cut-off, magnetos off; master off after the final flap selection, as your drill directs, to reduce the fire risk.</li>
<li>Land as slowly as safely possible, under control.</li>
</ul>
<h3>Ditching</h3>
<ul>
<li>Head for the coast or shipping if you can.</li>
<li>From your checklist: in a <b>large swell with light wind</b>, land <b>along</b> the swell; in a <b>light swell with strong wind</b>, land <b>into wind</b>. In both cases tail down, as slowly as possible.</li>
<li>Wear life jackets over water, <b>uninflated</b>. Inflate them only once outside the aircraft, or they can trap you in the cabin.</li>
<li>After ditching, get out quickly with the survival equipment; the aircraft may sink fast.</li>
</ul>
<h3>After the landing</h3>
<p>Get everyone clear, check for injuries, and raise the alarm. If you have an ELT or PLB, activate it. Stay with the aircraft unless it is unsafe: it is easier to find than a person.</p>`,
qs:[
{q:"Over water, when should life jackets be inflated?",o:["Only after leaving the aircraft","Before ditching","As soon as you take off","When the engine fails"],e:"An inflated life jacket inside a flooding cabin can pin you against the roof and prevent escape. Your checklist says the same."},
{q:"From your checklist: ditching in a large swell with a light wind, how should you land?",o:["Along the swell, tail down, as slowly as possible","Into wind, across the swell","Downwind at high speed","Nose first"],e:"Landing into the face of a big swell is like hitting a wall. Along the swell is gentler."},
{q:"From your checklist: ditching in a light swell with a strong wind, how should you land?",o:["Into wind, tail down, as slowly as possible","Along the swell","Downwind","Across the wind"],e:"With a strong wind and small waves, landing into wind gives the lowest groundspeed."},
{q:"Why unlatch the doors before a forced landing or ditching?",o:["So they can't jam shut if the airframe distorts","To slow the aircraft","To improve visibility","To reduce drag"],e:"A distorted door frame can trap occupants. Unlatching first keeps an exit open."},
{q:"Which field would generally be the best choice for a forced landing?",o:["A long, firm, level field into wind with a clear approach","A short field with high trees at the end","A field of tall crops","A field with livestock"],e:"Size, shape, surface, slope, surroundings and the wind: a long, smooth, level field into wind is ideal."},
{q:"After a forced landing in a remote area with no injuries, what is usually best?",o:["Stay with the aircraft and raise the alarm","Walk away to find help immediately","Try to take off again","Leave a note and go home"],e:"An aircraft is far easier to spot from the air than a person. Activate any ELT or PLB."},
{q:"Why turn the master switch off before a forced landing?",o:["To reduce the risk of fire after impact","To save the battery","To stop the radio","Because the instruments are not needed"],e:"Your drill turns it off after the final flap selection, since flaps may be electric."},
{type:"order", q:"Put these actions for a forced landing without power in a sensible order.", items:["Set best glide speed and trim","Choose a field","Plan the approach","Check for the cause and attempt a restart","MAYDAY call and squawk 7700","Security checks and passenger brief before landing"],
  e:"If you're low, cut the list short: the field and the approach matter most."},
{q:"Which of these is NOT one of the usual factors for choosing a forced landing field?",o:["The colour of the nearest building","Size","Surface","Slope"],e:"Size, shape, surface, slope, surroundings, and the wind direction."},
{type:"match", q:"Match each ditching item to the right action, as in your checklist.", pairs:[["Large swell, light wind","Along the swell"],["Light swell, strong wind","Into wind"],["Life jackets","Inflate only once outside the aircraft"]],
  e:"In both cases tail down, as slowly as possible, and life jackets uninflated until outside."},
{q:"What is a PLB?",o:["A personal locator beacon that sends a distress signal","A pilot's logbook","A type of life jacket","A brake lever"],e:"PLBs and aircraft ELTs alert search and rescue via satellite."}
]});

T.push({ id:"fuel", ref:"070 · 5", title:"Fuel handling and contamination",
blurb:"Refuelling safely, checking the grade, water and contamination, and fuel management in flight.",
learn:()=>`
<h3>Refuelling</h3>
<ul>
<li>Confirm the fuel grade on the bowser or pump matches the aircraft, every time. Avgas 100LL is blue; Jet A-1 is clear to straw.</li>
<li>Engine off, master off, no passengers on board unless your operator's procedures allow it, no smoking nearby.</li>
<li>Connect the <b>bonding</b> (earthing) lead before opening the tank, to discharge static electricity.</li>
<li>Have a fire extinguisher to hand. Replace the fuel caps securely and check them.</li>
</ul>
<h3>Contamination</h3>
<ul>
<li>Water is the commonest contaminant. It is heavier than fuel and collects at the drains.</li>
<li>After refuelling, let the fuel settle, then take samples from every drain point until they are clear and the right colour.</li>
<li>A clear sample from an avgas tank may be water or the wrong fuel; investigate before flying.</li>
</ul>
<h3>In flight</h3>
<ul>
<li>Know the system: which tanks feed, what the selector positions do.</li>
<li>Check fuel against your plan regularly.</li>
<li>If the engine falters, the fuel system is one of the first things to check: selector, quantity, mixture, carb heat, primer.</li>
</ul>`,
qs:[
{q:"Why is a bonding lead connected before refuelling?",o:["To discharge static electricity and prevent a spark","To weigh the fuel","To stop the aircraft moving","To measure the fuel temperature"],e:"Fuel flowing through hoses builds static charge. Bonding equalises it before vapour is exposed."},
{q:"What should you confirm before any fuel goes into the aircraft?",o:["The fuel grade matches the aircraft's requirement","The price per litre","The time of day","The colour of the bowser"],e:"Misfuelling with Jet A-1 has caused fatal engine failures in piston aircraft."},
{q:"Why let fuel settle before taking samples after refuelling?",o:["So any water has time to collect at the drains","To let it cool","To allow vapour to escape","To let the fuel expand"],e:"Water takes time to sink through the fuel to the lowest point."},
{q:"You take a fuel sample from an avgas aircraft and it is completely clear. What might it be?",o:["Water or the wrong fuel","Perfect avgas","Oil","Normal; avgas is always clear"],e:"Avgas 100LL is blue. A clear sample needs investigating before flight."},
{q:"Which of these is unsafe during refuelling?",o:["Smoking nearby","Having a fire extinguisher to hand","Connecting the bonding lead first","Switching the master off"],e:"No smoking or naked flames anywhere near refuelling."},
{q:"The engine starts to falter in flight. Which fuel-related checks are among the first?",o:["Fuel selector, quantity, mixture, carb heat and primer","The radio and transponder","The flap position","The cabin heat only"],e:"Your engine failure drill includes carb heat, fuel on and contents, mixture rich and primer locked."},
{q:"Where in the fuel system does water collect?",o:["At the lowest points, such as the tank drains and gascolator","At the top of the tank","In the fuel cap","In the carburettor venturi only"],e:"Water is heavier than fuel, so it settles at the drains."},
{q:"After refuelling, what should you check before flight?",o:["The fuel caps are secure","The tyres are cold","The radio is on","The fuel is warm"],e:"A loose cap can siphon fuel out of the tank in flight. Your external checks include 'fuel cap secured'."},
{type:"order", q:"Put the refuelling steps in a sensible order.", items:["Check the fuel grade","Connect the bonding lead","Refuel","Replace and secure the caps","Let the fuel settle and take samples"],
  e:"Then record the fuel added and check the total against your plan."},
{type:"match", q:"Match each fuel sample to its appearance.", pairs:[["AVGAS 100LL","Blue"],["Jet A-1","Clear to straw"],["Water in a sample","A separate layer or bubbles at the bottom"]],
  e:"Colour is one check; the grade marked on the pump or bowser is another."},
{q:"Who is responsible for making sure the correct fuel has been put in the aircraft?",o:["The pilot-in-command","Only the refueller","The aerodrome operator","Nobody"],e:"Even if someone else refuels, the PIC must check the grade and quantity."}
]});

T.push({ id:"special", ref:"070 · 6", title:"Special conditions, noise and birds",
blurb:"Ice and frost, hot and high aerodromes, contaminated runways, noise abatement and bird strikes.",
learn:()=>`
<h3>Cold weather</h3>
<ul>
<li>Remove <b>all</b> ice, frost and snow from the wings, tail and controls before flight. Even a thin layer of frost can raise the stall speed and lengthen the take-off.</li>
<li>Check that controls and their hinges are free of ice.</li>
<li>Cold engines may need pre-heating, as the POH directs.</li>
</ul>
<h3>Hot and high, contaminated runways</h3>
<ul>
<li>High temperature and elevation increase density altitude: longer runs, poorer climb.</li>
<li>Standing water, slush, snow and wet grass increase the take-off distance and reduce braking on landing.</li>
<li>Use the CAA factors and be prepared not to go.</li>
</ul>
<h3>Noise abatement</h3>
<ul>
<li>Follow the published noise abatement procedures and circuit patterns for each aerodrome.</li>
<li>Avoid flying low over noise-sensitive areas such as villages, hospitals and farms with livestock.</li>
<li>Safety comes first: noise procedures never override a safe operation.</li>
</ul>
<h3>Birds</h3>
<ul>
<li>Bird activity is greatest at dawn and dusk and near coasts, rubbish tips and ploughed fields.</li>
<li>If you see birds ahead, climb if you can; birds usually dive to avoid aircraft.</li>
<li>Report bird strikes, and have the aircraft checked before further flight.</li>
</ul>`,
qs:[
{q:"How much frost on the wings is acceptable for take-off?",o:["None; remove it all","A thin layer is fine","Up to 3 mm","Frost doesn't matter on light aircraft"],e:"Even light frost roughens the wing, raising the stall speed and lengthening the take-off run."},
{q:"Why check the control hinges in icy conditions?",o:["Ice can jam the controls","They need lubricating","To check the paint","Ice makes them lighter"],e:"Ice in hinges or gaps can restrict or lock the controls."},
{q:"Which runway condition increases the take-off distance?",o:["Standing water or slush","A dry, paved surface","A slight headwind","A downhill slope on take-off"],e:"Contamination drags at the wheels, lengthening the ground run. Downslope and headwind shorten it."},
{q:"Noise abatement procedures and safety conflict. Which takes priority?",o:["Safety","Noise abatement","Whichever the passenger prefers","ATC's preference always"],e:"Noise procedures never override safe operation of the aircraft."},
{q:"When is bird activity typically greatest?",o:["At dawn and dusk","At midday","At midnight","It is the same all day"],e:"Birds move between feeding and roosting sites around dawn and dusk."},
{q:"You see a flock of birds ahead. What is the usual advice?",o:["Climb if you can; birds tend to dive away","Descend under them","Fly straight through them","Turn on the landing light only"],e:"Birds usually dive when threatened, so climbing tends to give the most separation."},
{q:"After a bird strike, what should you do?",o:["Report it and have the aircraft checked before further flight","Carry on and forget it","Only report it if the windscreen breaks","Clean it off and fly again"],e:"Even an apparently minor strike can damage structure, the propeller or the pitot tube."},
{q:"Which of these increases the risk of a long take-off run on a summer day?",o:["High temperature","A cold morning","Low humidity","A strong headwind"],e:"Heat reduces air density, increasing density altitude: less power, lift and thrust."},
{q:"Where are you likely to find large numbers of birds?",o:["Near coasts, rubbish tips and ploughed fields","Over large forests only","Over cities at night","At high altitude"],e:"Feeding areas attract birds, especially gulls."},
{type:"match", q:"Match each condition to its main hazard.", pairs:[["Frost on the wings","Higher stall speed and longer take-off"],["Slush on the runway","Longer take-off run and poor braking"],["Hot, high aerodrome","Reduced engine and climb performance"],["Dusk near a rubbish tip","Bird strike"]],
  e:"Each needs a decision on the ground: clear it, delay, or don't go."},
{q:"How should you treat noise-sensitive areas shown on charts or in the AIP?",o:["Avoid flying low over them","Fly over them at circuit height","Ignore them outside controlled airspace","Only avoid them at weekends"],e:"Respecting noise-sensitive areas keeps aerodromes and pilots welcome."}
]});

SUBJECTS.push({ id:"ops", code:"070", name:"Operational Procedures",
  blurb:"Operating rules and fuel reserves, wake turbulence and windshear, fire and emergencies, forced landings and ditching, fuel handling, and special conditions.",
  topics:T });
})();
