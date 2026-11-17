// 060 Navigation
(() => {
const tvmdc = `<div class="sq">
<div class="tile"><div class="big">T</div><div class="d">True</div></div>
<div class="tile"><div class="big">V</div><div class="d">± Variation</div></div>
<div class="tile"><div class="big">M</div><div class="d">Magnetic</div></div>
<div class="tile"><div class="big">D</div><div class="d">± Deviation</div></div>
<div class="tile"><div class="big">C</div><div class="d">Compass</div></div>
</div>`;

const windTri = `<figure class="fig wide"><svg viewBox="0 0 420 250" role="img" aria-label="Wind triangle: heading and true airspeed, wind, and the resulting track and groundspeed">
<rect class="fb" x="1" y="1" width="418" height="248" rx="6"/>
<line x1="80" y1="215" x2="250" y2="40" class="ln" style="stroke-width:2.5" marker-end="url(#arr)"/>
<line x1="250" y1="40" x2="320" y2="75" class="ln pb" style="stroke-width:2.5" marker-end="url(#arr)"/>
<line x1="80" y1="215" x2="320" y2="75" class="ln pa" style="stroke-width:2.5" marker-end="url(#arr)"/>
<path d="M118,176 A55,55 0 0 1 128,186" class="ln" style="stroke-width:1.5"/>
<text class="tb" x="120" y="110">Heading / TAS</text>
<text class="tb" x="288" y="44">Wind</text>
<text class="tb" x="220" y="168">Track / groundspeed</text>
<text class="t" x="132" y="174">drift</text>
</svg><figcaption>The aircraft points along its heading at its TAS; the wind blows it sideways. The result is its track and groundspeed. Drift is the angle between heading and track.</figcaption></figure>`;

const oneIn60 = `<figure class="fig wide"><svg viewBox="0 0 440 210" role="img" aria-label="One in sixty rule: track error and closing angle">
<rect class="fb" x="1" y="1" width="438" height="208" rx="6"/>
<circle cx="40" cy="150" r="5" class="f-ink"/><text class="tb" x="30" y="176">A</text>
<circle cx="400" cy="150" r="5" class="f-ink"/><text class="tb" x="396" y="176">B</text>
<line x1="40" y1="150" x2="400" y2="150" class="ln dash"/><text class="tm" x="220" y="168" text-anchor="middle">planned track</text>
<line x1="40" y1="150" x2="190" y2="80" class="ln pa" style="stroke-width:2.5"/>
<circle cx="190" cy="80" r="5" class="f-ink"/><text class="tb" x="182" y="66">fix</text>
<line x1="190" y1="80" x2="400" y2="150" class="ln pb" style="stroke-width:2.5" marker-end="url(#arr)"/>
<line x1="190" y1="80" x2="190" y2="150" class="ln dot2"/><text class="t" x="196" y="122">off track</text>
<text class="t" x="80" y="126">TE</text><text class="t" x="230" y="102">CA</text>
<text class="tm" x="110" y="196" text-anchor="middle">distance gone</text><text class="tm" x="300" y="196" text-anchor="middle">distance to go</text>
</svg><figcaption>Track error (TE) = off track × 60 ÷ distance gone. Closing angle (CA) = off track × 60 ÷ distance to go. Alter heading by TE + CA to reach B.</figcaption></figure>`;

const T = [];
T.push({ id:"earth", ref:"060 · 1", title:"The earth, direction and the compass",
blurb:"Latitude and longitude, the nautical mile, great circles, variation and deviation.",
learn:()=>`
<h3>Position and distance</h3>
<ul>
<li><b>Latitude</b> is measured north or south of the equator; <b>longitude</b> east or west of the Greenwich meridian.</li>
<li>One minute of latitude = <b>1 nautical mile</b>. 1 nm = 1,852 m (about 6,076 ft, or 1.15 statute miles).</li>
<li>A <b>great circle</b> is the shortest distance between two points on the earth. A <b>rhumb line</b> crosses every meridian at the same angle, so it holds a constant track, but is longer.</li>
</ul>
<h3>True, magnetic and compass</h3>
<p><b>Variation</b> is the angle between true north and magnetic north at a place. Lines joining places of equal variation are <b>isogonals</b>. <b>Deviation</b> is the compass error caused by the aircraft's own magnetic fields (engine, radios, wiring), recorded on the deviation card.</p>
${tvmdc}
<p>Going from true to magnetic to compass: <b>"Variation west, magnetic best; variation east, magnetic least."</b> West is added, east is subtracted. The same rule applies to deviation.</p>
<p>Example: true track 090°, variation 3°W: magnetic track 093°. Compass deviation 2°E: compass heading 091°.</p>
<div class="box note"><b>Note</b>Variation across the UK is currently small. Exam questions often use larger values to test the method, so practise the rule rather than memorising today's figure.</div>`,
qs:[
{q:"What is one nautical mile in metres?",o:["1,852 m","1,609 m","1,000 m","6,080 m"],e:"1 nm = 1,852 m. 1,609 m is a statute mile; 6,080 is the old figure for a nautical mile in feet."},
{q:"One minute of latitude is equal to:",o:["One nautical mile","One statute mile","One kilometre","Ten nautical miles"],e:"The nautical mile is defined from one minute of arc of latitude."},
{q:"True track is 090° and variation is 3°W. What is the magnetic track?",o:["093°","087°","090°","096°"],e:"Variation west, magnetic best: add westerly variation. 090 + 3 = 093°."},
{q:"Magnetic heading is 270° and compass deviation is 2°E. What is the compass heading?",o:["268°","272°","270°","266°"],e:"East is least: subtract easterly deviation. 270 − 2 = 268°."},
{q:"What are isogonals?",o:["Lines joining places of equal magnetic variation","Lines joining places of equal pressure","Lines of equal latitude","Lines of zero deviation"],e:"Isogonals join points of equal variation and are shown on aeronautical charts."},
{q:"What causes compass deviation?",o:["Magnetic fields within the aircraft","The difference between true and magnetic north","Turning errors","The earth's magnetic dip"],e:"Deviation is caused by the aircraft's own magnetism from the engine, radios and wiring. It differs with heading and is recorded on the deviation card."},
{q:"Which is the shortest route between two places on the earth's surface?",o:["A great circle","A rhumb line","A line of constant magnetic heading","A line of latitude"],e:"A great circle is the shortest distance. A rhumb line holds a constant track but is longer, except along a meridian or the equator."}
]});

T.push({ id:"charts", ref:"060 · 2", title:"Charts and scale",
blurb:"The 1:500,000 and 1:250,000 charts, the Lambert projection, scale and elevation information.",
learn:()=>`
<h3>UK VFR charts</h3>
<p>UK VFR charts are published at 1:500,000 and 1:250,000 and use the <b>Lambert conformal conic</b> projection.</p>
<ul>
<li><b>Conformal</b>: angles are shown correctly, so bearings measured on the chart are accurate.</li>
<li>Scale is nearly constant across the chart.</li>
<li>A straight line drawn on the chart is very close to a great circle.</li>
</ul>
<h3>Scale</h3>
<div class="tbl"><table>
<tr><th>Scale</th><th>1 cm on the chart</th><th>Use</th></tr>
<tr><td>1:500,000</td><td>5 km</td><td>The standard chart for cross-country planning</td></tr>
<tr><td>1:250,000</td><td>2.5 km</td><td>More ground detail over a smaller area; check the chart's legend for which airspace it shows</td></tr>
</table></div>
<h3>Heights on the chart</h3>
<ul>
<li>Spot heights, obstacles and the <b>Maximum Elevation Figure (MEF)</b> are shown in feet <b>above mean sea level</b>.</li>
<li>The MEF in each quadrangle shows the highest terrain or obstacle in it, with an allowance added, in thousands and hundreds of feet.</li>
<li>Airspace bases and tops are shown as altitudes (AMSL) or flight levels.</li>
</ul>
<div class="box trap"><b>Common trap</b>Obstacles show two figures: the top in feet AMSL, and in brackets the height above ground level. Use the AMSL figure for terrain clearance.</div>`,
qs:[
{q:"Which projection do the UK 1:500,000 aeronautical charts use?",o:["Lambert conformal conic","Mercator","Transverse Mercator","Polar stereographic"],e:"UK VFR charts use the Lambert conformal conic projection, which is conformal and has nearly constant scale."},
{q:"On a 1:500,000 chart, what does 1 cm represent?",o:["5 km","500 m","50 km","2.5 km"],e:"500,000 cm = 5,000 m = 5 km."},
{q:"On a 1:250,000 chart, 4 cm represents:",o:["10 km","1 km","4 km","25 km"],e:"1 cm = 250,000 cm = 2.5 km, so 4 cm = 10 km."},
{q:"What does \"conformal\" mean for a chart projection?",o:["Angles are correctly shown, so bearings can be measured directly","The scale is exactly the same everywhere","Great circles appear as curves","Areas are shown correctly"],e:"A conformal projection preserves angles locally, so directions measured on it are correct."},
{q:"On a UK VFR chart, elevations and obstacle heights are shown as:",o:["Feet above mean sea level","Feet above ground level","Metres above mean sea level","Flight levels"],e:"Terrain, spot heights and obstacle tops are given in feet AMSL. Obstacles also show their height above ground in brackets."},
{q:"What does the Maximum Elevation Figure (MEF) show?",o:["The highest terrain or obstacle in that quadrangle, with an allowance, in feet AMSL","The minimum safe altitude for the whole chart","The base of controlled airspace","The highest flight level available"],e:"Each quadrangle's MEF gives the highest point plus an allowance, in thousands and hundreds of feet AMSL, as a quick terrain-clearance reference."},
{q:"On a Lambert conformal conic chart, a straight line between two places is approximately:",o:["A great circle","A rhumb line","A line of constant magnetic track","A line of latitude"],e:"Over the distances flown on a VFR chart, a straight line on a Lambert chart is very close to a great circle."}
]});

T.push({ id:"tsd", ref:"060 · 3", title:"Time, speed, distance and fuel",
blurb:"The arithmetic behind the plog: times, groundspeeds, fuel and true airspeed.",
learn:()=>`
<h3>The basic relationship</h3>
<p><span class="mono">distance = speed × time</span>. With speed in knots (nautical miles per hour): <span class="mono">time (minutes) = distance × 60 ÷ groundspeed</span>.</p>
<ul>
<li>45 nm at 90 kt: 45 × 60 ÷ 90 = <b>30 minutes</b>.</li>
<li>A useful habit: work out <b>nautical miles per minute</b>. 90 kt is 1.5 nm/min; 120 kt is 2 nm/min.</li>
</ul>
<h3>Fuel</h3>
<ul>
<li><span class="mono">fuel used = consumption × time</span>. 24 L/h for 1 h 15 min (1.25 h) = 30 L.</li>
<li>1 US gallon = 3.785 litres. 1 imperial gallon = 4.546 litres.</li>
<li>Avgas has a specific gravity of about 0.72, so 1 litre weighs about 0.72 kg. Weight and balance needs the fuel in kg or lb.</li>
</ul>
<h3>True airspeed</h3>
<p>The airspeed indicator shows IAS. As density falls with height, TAS becomes higher than IAS. A rule of thumb: <b>TAS ≈ IAS + 2% per 1,000 ft</b>. So 100 kt IAS at 5,000 ft is about 110 kt TAS. Use the flight computer for exact figures.</p>
<div class="box trap"><b>Common trap</b>Use groundspeed, not TAS, for times and fuel along a leg. The wind changes the speed over the ground.</div>`,
qs:[
{q:"Groundspeed is 90 kt. How long will a 30 nm leg take?",o:["20 minutes","30 minutes","15 minutes","27 minutes"],e:"30 × 60 ÷ 90 = 20 minutes. At 90 kt you cover 1.5 nm per minute."},
{q:"You fly at a groundspeed of 100 kt for 18 minutes. How far have you travelled?",o:["30 nm","18 nm","36 nm","25 nm"],e:"100 kt is 1.67 nm per minute: 1.67 × 18 = 30 nm."},
{q:"You cover 60 nm in 40 minutes. What is your groundspeed?",o:["90 kt","60 kt","80 kt","120 kt"],e:"60 nm ÷ (40/60 h) = 90 kt."},
{q:"Fuel consumption is 25 L/h. How much fuel is used in 1 hour 24 minutes?",o:["35 L","30 L","34 L","40 L"],e:"1 h 24 min = 1.4 h. 25 × 1.4 = 35 L."},
{q:"How many litres are there in one US gallon?",o:["3.785","4.546","1.000","2.205"],e:"1 US gallon = 3.785 L. 4.546 L is an imperial gallon; 2.205 is pounds per kilogram."},
{q:"Using the rule of thumb, what is the approximate TAS for 100 kt IAS at 5,000 ft?",o:["110 kt","100 kt","105 kt","120 kt"],e:"Add about 2% per 1,000 ft: 10% at 5,000 ft, so about 110 kt."},
{q:"Which speed should you use to calculate the time for a leg?",o:["Groundspeed","True airspeed","Indicated airspeed","Calibrated airspeed"],e:"Time over the ground depends on the speed over the ground, which includes the effect of the wind."}
]});

T.push({ id:"wind", ref:"060 · 4", title:"Wind triangle, drift and crosswinds",
blurb:"Heading versus track, working out drift, and headwind and crosswind components.",
learn:()=>`
${windTri}
<h3>Heading and track</h3>
<ul>
<li><b>Heading</b> is where the nose points. <b>Track</b> is the path over the ground.</li>
<li><b>Drift</b> is the angle between them. Wind from the left drifts the aircraft to the right, so you head into wind: heading left of track.</li>
<li>Winds in forecasts are given as the direction they blow <b>from</b>.</li>
</ul>
<h3>Maximum drift</h3>
<p><span class="mono">max drift (°) ≈ wind speed × 60 ÷ TAS</span>. This is the drift with the wind at 90° to track; at smaller angles it is less. Example: 20 kt of wind at 100 kt TAS gives up to 12°.</p>
<h3>Wind components</h3>
<div class="tbl"><table>
<tr><th>Angle off the runway or track</th><th>Crosswind is about</th><th>Headwind is about</th></tr>
<tr><td>30°</td><td>½ of the wind speed</td><td>0.9 of the wind speed</td></tr>
<tr><td>45°</td><td>0.7</td><td>0.7</td></tr>
<tr><td>60°</td><td>0.9</td><td>½</td></tr>
<tr><td>90°</td><td>All of it</td><td>None</td></tr>
</table></div>
<p>Example: runway 27, wind 300° at 20 kt. That is 30° off, so crosswind about 10 kt and headwind about 17 kt. Check the result against the maximum demonstrated crosswind for your aircraft in the POH.</p>
<div class="box trap"><b>Common trap</b>The wind for a runway is given in degrees magnetic by ATC, matching the runway number. Don't mix it with a forecast wind in degrees true.</div>`,
qs:[
{q:"What is drift?",o:["The angle between heading and track","The angle between track and the wind direction","The difference between TAS and groundspeed","The angle between true and magnetic north"],e:"Drift is the angle between where the aircraft points (heading) and where it goes over the ground (track)."},
{q:"With 20 kt of wind and a TAS of 100 kt, what is the maximum possible drift?",o:["12°","20°","5°","8°"],e:"Max drift ≈ 20 × 60 ÷ 100 = 12°, with the wind at right angles to the track."},
{q:"The wind is blowing from the left of your track. To maintain track, your heading will be:",o:["To the left of track, into wind","To the right of track","The same as the track","Opposite to the track"],e:"The wind pushes the aircraft to the right, so you point into wind, to the left of the track, to stay on it."},
{q:"Runway 27 is in use and the surface wind is 300° at 20 kt. What is the approximate crosswind component?",o:["10 kt","20 kt","17 kt","5 kt"],e:"The wind is 30° off the runway. sin 30° = 0.5, so crosswind ≈ 10 kt."},
{q:"Runway 27 is in use and the surface wind is 330° at 20 kt. What is the approximate headwind component?",o:["10 kt","17 kt","20 kt","0 kt"],e:"The wind is 60° off the runway. cos 60° = 0.5, so headwind ≈ 10 kt; crosswind ≈ 17 kt."},
{q:"A forecast wind of 270/25 means the wind is:",o:["Blowing from 270° at 25 kt","Blowing towards 270° at 25 kt","Blowing from 270° at 25 mph","Blowing from 250° at 27 kt"],e:"Wind direction is always given as the direction it blows from, with speed in knots."},
{q:"With a tailwind component, compared with still air your groundspeed will be:",o:["Higher than your TAS","Lower than your TAS","The same as your TAS","Equal to your IAS"],e:"A tailwind adds to the speed over the ground."}
]});

T.push({ id:"onein60", ref:"060 · 5", title:"The 1 in 60 rule and en-route corrections",
blurb:"Using the 1 in 60 rule to find track error and get back to track.",
learn:()=>`
<p>At 60 nm, an angle of 1° covers a distance of about 1 nm. That gives quick mental arithmetic for small angles.</p>
${oneIn60}
<h3>Worked example</h3>
<p>You are 4 nm left of track after 30 nm, with 40 nm still to go.</p>
<ul>
<li>Track error = 4 × 60 ÷ 30 = <b>8°</b>.</li>
<li>Closing angle = 4 × 60 ÷ 40 = <b>6°</b>.</li>
<li>To reach the destination, alter heading <b>14° right</b> (TE + CA).</li>
<li>To fly parallel to the planned track instead, alter by the track error only (8° right).</li>
</ul>
<h3>Keeping track en route</h3>
<ul>
<li>Set heading over a known point and note the time.</li>
<li>Work from the chart to the ground: predict what you should see next, then look for it. Large features (coast, motorways, lakes, towns) first, details to confirm.</li>
<li>Check your fixes against the plog times, and revise the ETA.</li>
<li>If uncertain of position, follow a set procedure rather than wandering. Ask for help early: a training fix or a PAN call on 121.5 MHz is what it is for.</li>
</ul>`,
qs:[
{q:"Using the 1 in 60 rule, 1° of track error at 60 nm puts you how far off track?",o:["1 nm","6 nm","10 nm","0.6 nm"],e:"That is the rule itself: 1 in 60. At 30 nm the same 1° would be 0.5 nm off."},
{q:"After 30 nm you are 3 nm off track. What is the track error?",o:["6°","3°","10°","1°"],e:"Track error = off track × 60 ÷ distance gone = 3 × 60 ÷ 30 = 6°."},
{q:"You are 2 nm off track with 20 nm still to go. What is the closing angle?",o:["6°","10°","2°","4°"],e:"Closing angle = off track × 60 ÷ distance to go = 2 × 60 ÷ 20 = 6°."},
{q:"After 30 nm you are 4 nm left of track, with 40 nm to go. What alteration will take you to the destination?",o:["14° right","8° right","6° right","14° left"],e:"TE = 4 × 60 ÷ 30 = 8°; CA = 4 × 60 ÷ 40 = 6°. Alter 14° right, towards the track."},
{q:"You discover a track error and want to fly parallel to your planned track. By how much do you alter heading?",o:["By the track error only","By the closing angle only","By double the track error","By the track error plus the closing angle"],e:"Correcting by the track error cancels the drift you haven't allowed for, so you fly parallel. Adding the closing angle takes you back to destination."},
{q:"Which is the best order for map reading en route?",o:["From the chart to the ground: predict the next feature, then look for it","From the ground to the chart: look out, then find it on the map","Follow the largest town in view","Use only the compass and the clock"],e:"Predicting from the chart prevents you from making the ground fit what you want to see. Ground to chart is mainly for when you are uncertain of position."},
{q:"You are uncertain of your position. Which is the most sensible early action?",o:["Ask for help, for example a training fix or a PAN on 121.5 MHz","Fly in circles until you recognise something","Descend to read road signs","Keep going and hope to see the destination"],e:"Getting help early costs nothing. 121.5 MHz is staffed to give training fixes and help pilots who are uncertain of position."}
]});

T.push({ id:"radionav", ref:"060 · 6", title:"Radio navigation",
blurb:"VOR radials, Q-codes, DME, the ADF and NDB, VHF range and using GNSS sensibly.",
learn:()=>`
<h3>VOR</h3>
<ul>
<li>A <b>radial</b> is a magnetic bearing <b>from</b> the station.</li>
<li>The course deviation indicator (CDI) shows whether you are left or right of the selected course; the TO/FROM flag shows which side of the station you are on.</li>
<li>VOR works on VHF, so it needs line of sight.</li>
</ul>
<h3>Q-codes</h3>
<div class="tbl"><table>
<tr><th>Code</th><th>Meaning</th></tr>
<tr><td>QDM</td><td>Magnetic bearing <b>to</b> the station</td></tr>
<tr><td>QDR</td><td>Magnetic bearing <b>from</b> the station (QDM ± 180°)</td></tr>
<tr><td>QTE</td><td>True bearing from the station</td></tr>
<tr><td>QUJ</td><td>True bearing to the station</td></tr>
</table></div>
<h3>DME, ADF and NDB</h3>
<ul>
<li>DME gives <b>slant range</b> in nm, the straight-line distance from the aircraft to the station, not the distance over the ground.</li>
<li>The ADF needle points at the NDB. <span class="mono">magnetic heading + relative bearing = QDM</span>. Example: heading 300°, relative bearing 030° gives QDM 330°.</li>
</ul>
<h3>VHF range</h3>
<p>VHF (radio and VOR) is line of sight. <span class="mono">range (nm) ≈ 1.23 × √(height in ft)</span>. At 2,500 ft: about 61 nm. At 4,900 ft: about 86 nm.</p>
<h3>GNSS</h3>
<p>Satellite navigation is accurate, but it can be wrong or lost: interference, out-of-date databases, wrong waypoints. Plan the flight on a chart, cross-check GNSS against what you see, and be ready to navigate without it. Jamming is common in some areas.</p>`,
qs:[
{q:"What is a VOR radial?",o:["A magnetic bearing from the station","A magnetic bearing to the station","A true bearing from the station","A distance from the station"],e:"Radials are magnetic bearings from the VOR, so the 090 radial runs due magnetic east from the station."},
{q:"What does QDM mean?",o:["Magnetic bearing to the station","Magnetic bearing from the station","True bearing from the station","True bearing to the station"],e:"QDM is the magnetic heading to steer to the station in nil wind. QDR is the reciprocal."},
{q:"QDM is 050°. What is the QDR?",o:["230°","050°","130°","310°"],e:"QDR = QDM ± 180°. 050 + 180 = 230°."},
{q:"Magnetic heading is 300° and the ADF shows a relative bearing of 030°. What is the QDM?",o:["330°","270°","030°","150°"],e:"Magnetic heading + relative bearing = QDM: 300 + 30 = 330°."},
{q:"What does DME measure?",o:["Slant range from the aircraft to the station","Distance over the ground to the station","Groundspeed only","Bearing to the station"],e:"DME measures straight-line (slant) distance. Overhead the station at 6,000 ft it would show about 1 nm."},
{q:"Roughly what is the VHF radio range of an aircraft at 2,500 ft over flat terrain?",o:["61 nm","25 nm","150 nm","12 nm"],e:"1.23 × √2,500 = 1.23 × 50 ≈ 61 nm."},
{q:"Which statement about GNSS for VFR navigation is correct?",o:["It should be cross-checked against the chart and what you can see","It removes the need to plan the route on a chart","It cannot be affected by interference","Its database never needs updating"],e:"GNSS can be jammed, mis-programmed or out of date. Plan on a chart, cross-check, and be able to continue without it."}
]});

SUBJECTS.push({ id:"nav", code:"060", name:"Navigation",
  blurb:"Direction and the compass, charts and scale, time, speed, distance and fuel, the wind triangle, the 1 in 60 rule and radio navigation.",
  topics:T });
})();
