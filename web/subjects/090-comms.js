// 090 Communications
(() => {
const ALPHA = ["Alfa","Bravo","Charlie","Delta","Echo","Foxtrot","Golf","Hotel","India","Juliett","Kilo","Lima","Mike","November","Oscar","Papa","Quebec","Romeo","Sierra","Tango","Uniform","Victor","Whiskey","X-ray","Yankee","Zulu"];
const alpha = `<div class="tiles">${ALPHA.map(w=>`<div class="tile"><div class="n">${w[0]}</div><div class="t">${w}</div></div>`).join('')}</div>`;

const T = [];
T.push({ id:"phonetics", ref:"090 · 1", title:"Phonetics, numbers and callsigns",
blurb:"The phonetic alphabet, how numbers are spoken, and when you can shorten a callsign.",
learn:()=>`
<h3>The phonetic alphabet</h3>
${alpha}
<h3>Numbers</h3>
<p>Each digit is spoken separately, except whole hundreds and thousands. Three is <b>"tree"</b>, five is <b>"fife"</b>, nine is <b>"niner"</b>.</p>
<div class="tbl"><table>
<tr><th>Item</th><th>Written</th><th>Spoken</th></tr>
<tr><td>Altitude</td><td>2,500 ft</td><td>"Two thousand five hundred feet"</td></tr>
<tr><td>Flight level</td><td>FL55</td><td>"Flight level five five"</td></tr>
<tr><td>Heading</td><td>080°</td><td>"Heading zero eight zero"</td></tr>
<tr><td>Frequency</td><td>126.700</td><td>"One two six decimal seven"</td></tr>
<tr><td>QNH</td><td>1008 hPa</td><td>"QNH one zero zero eight"</td></tr>
<tr><td>QNH below 1000</td><td>998 hPa</td><td>"QNH niner niner eight hectopascals"</td></tr>
<tr><td>Squawk</td><td>4521</td><td>"Squawk four five two one"</td></tr>
<tr><td>Wind</td><td>240/12</td><td>"Two four zero degrees, one two knots"</td></tr>
</table></div>
<p>Times are in UTC. Usually only the minutes are given ("two eight"); the hour is added if there is any chance of confusion.</p>
<h3>Callsigns</h3>
<p>A UK registration such as G-ABCD is spoken in full ("Golf Alfa Bravo Charlie Delta") on first contact. It may be shortened to the first letter and the last two ("Golf Charlie Delta") only <b>after the ground station has shortened it first</b>.</p>
<div class="box trap"><b>Common trap</b>Below 1000 hPa the word "hectopascals" is added, so that 998 can't be mistaken for 29.98 inches or 1998.</div>`,
qs:[
{q:"How is the digit 9 spoken in aviation radiotelephony?",o:["Niner","Nine","Nein","Nyne"],e:"Niner, so that it can't be confused with the German 'nein'. Three is 'tree' and five is 'fife'."},
{q:"How is flight level 55 transmitted?",o:["Flight level five five","Flight level fifty-five","Five thousand five hundred feet","Flight level five hundred and fifty"],e:"Flight levels are spoken as separate digits: 'flight level five five'."},
{q:"How is an altitude of 2,500 ft transmitted?",o:["Two thousand five hundred feet","Two five zero zero feet","Twenty-five hundred feet","Flight level two five"],e:"Whole thousands and hundreds are spoken as such: 'two thousand five hundred feet'."},
{q:"How is a QNH of 998 hPa transmitted?",o:["QNH niner niner eight hectopascals","QNH niner niner eight","QNH nine hundred and ninety-eight","QNH zero niner niner eight"],e:"Below 1000 hPa the unit is added, to avoid confusion with other figures."},
{q:"Your callsign is G-BNXE. When may you abbreviate it to \"Golf X-ray Echo\"?",o:["Only after the ground station has abbreviated it","Whenever the frequency is busy","After your first transmission","Never"],e:"Abbreviation is only allowed once the ground station has used the abbreviated form, which shows there is no risk of confusion."},
{q:"What is the phonetic word for the letter Q?",o:["Quebec","Queen","Quintet","Quaker"],e:"Q is Quebec. The alphabet is the ICAO standard alphabet."},
{q:"How is a frequency of 126.700 MHz normally transmitted?",o:["One two six decimal seven","One two six point seven zero zero","One hundred and twenty-six decimal seven","One two six seven"],e:"Digits are spoken separately with 'decimal'. When the last two digits are zero, only the first four digits are normally spoken."}
]});

T.push({ id:"words", ref:"090 · 2", title:"Standard words and phrases",
blurb:"What ROGER, WILCO, AFFIRM and the rest mean, and the readability scale.",
learn:()=>`
<div class="tbl"><table>
<tr><th>Word</th><th>Meaning</th></tr>
<tr><td>AFFIRM</td><td>Yes</td></tr>
<tr><td>NEGATIVE</td><td>No, or permission not granted, or that is not correct</td></tr>
<tr><td>ROGER</td><td>I have received all of your last transmission. Not a yes, and not a readback.</td></tr>
<tr><td>WILCO</td><td>I understand your message and will comply with it</td></tr>
<tr><td>STANDBY</td><td>Wait and I will call you</td></tr>
<tr><td>SAY AGAIN</td><td>Repeat all, or the following part, of your last transmission</td></tr>
<tr><td>CORRECTION</td><td>An error has been made; the correct version is…</td></tr>
<tr><td>READ BACK</td><td>Repeat all, or the specified part, of this message back to me as received</td></tr>
<tr><td>CONTACT</td><td>Establish radio contact with…</td></tr>
<tr><td>MONITOR</td><td>Listen out on (frequency); don't call unless needed</td></tr>
<tr><td>APPROVED</td><td>Permission for the proposed action is granted</td></tr>
</table></div>
<h3>Readability scale</h3>
<div class="tbl"><table>
<tr><th>Number</th><th>Meaning</th></tr>
<tr><td>1</td><td>Unreadable</td></tr>
<tr><td>2</td><td>Readable now and then</td></tr>
<tr><td>3</td><td>Readable but with difficulty</td></tr>
<tr><td>4</td><td>Readable</td></tr>
<tr><td>5</td><td>Perfectly readable</td></tr>
</table></div>
<div class="box trap"><b>Common trap</b>Don't answer a question with ROGER. If ATC asks "Can you accept…?", the answer is AFFIRM or NEGATIVE.</div>`,
qs:[
{q:"What does WILCO mean?",o:["I understand your message and will comply with it","I have received all of your last transmission","Yes","Wait and I will call you"],e:"WILCO is used for instructions that don't need a full readback, such as 'report final'."},
{q:"What does ROGER mean?",o:["I have received all of your last transmission","Yes, I agree","I will comply","Repeat your last message"],e:"ROGER only acknowledges receipt. It must not be used to answer a question or in place of a required readback."},
{q:"ATC asks: \"Golf-CD, can you accept a left-hand circuit?\" Which reply is correct if you can?",o:["Affirm, Golf-CD","Roger, Golf-CD","Wilco, Golf-CD","Yes yes, Golf-CD"],e:"A question needs AFFIRM or NEGATIVE. ROGER only means you received the message."},
{q:"What does STANDBY mean?",o:["Wait and I will call you","Stop transmitting","Change frequency","Repeat your message"],e:"STANDBY tells the other station you heard them and will come back. It is not approval of anything."},
{q:"ATC tells you to \"monitor Tower on 118.5\". What should you do?",o:["Change to 118.5 and listen, without calling unless necessary","Change to 118.5 and call Tower immediately","Stay on the current frequency","Squawk standby"],e:"MONITOR means listen out. CONTACT means change frequency and call."},
{q:"On the readability scale, what does readability 3 mean?",o:["Readable but with difficulty","Unreadable","Perfectly readable","Readable now and then"],e:"1 unreadable, 2 readable now and then, 3 with difficulty, 4 readable, 5 perfectly readable."},
{q:"What does NEGATIVE mean?",o:["No, or permission not granted, or that is not correct","I have received your message","I will comply","Wait"],e:"NEGATIVE covers no, permission not granted and not correct."}
]});

T.push({ id:"readback", ref:"090 · 3", title:"Readbacks and clearances",
blurb:"Which items you must read back, conditional clearances, and the words reserved for take-off.",
learn:()=>`
<h3>Items to read back in full</h3>
<ul>
<li>Taxi instructions, and level, heading and speed instructions</li>
<li>Route and approach clearances, and the runway in use</li>
<li>Clearances to take off, land, enter, backtrack, cross or hold short of an active runway</li>
<li>Squawk codes and "squawk ident"</li>
<li>Altimeter settings (with "hectopascals" below 1000)</li>
<li>Frequency changes and the type of ATS service</li>
<li>VDF information and transition levels</li>
</ul>
<p>Read back in the same order as given, and end with your callsign. Items not on the list, such as traffic information and the surface wind, are acknowledged rather than read back.</p>
<h3>Example</h3>
<p><b>ATC:</b> "Golf-CD, climb altitude three thousand feet, squawk four five two one."<br><b>You:</b> "Climb altitude three thousand feet, squawk four five two one, Golf-CD."</p>
<h3>Conditional clearances</h3>
<p>"Golf-CD, behind the landing Cessna, line up and wait behind." The readback must include the condition: "Behind the landing Cessna, line up and wait behind, Golf-CD." Before acting, identify the aircraft referred to.</p>
<h3>Take-off</h3>
<p>The words <b>"take off"</b> are used only in an actual take-off clearance (or when cancelling one). At all other times ATC and pilots say "departure" or "airborne", so that "take off" can never be heard by mistake.</p>`,
qs:[
{q:"Which of these must be read back in full?",o:["A frequency change","Traffic information","The surface wind","A weather report"],e:"Frequency changes are on the mandatory readback list. Traffic information and the wind are acknowledged."},
{q:"ATC instructs: \"Golf-CD, squawk 4521.\" What is the correct reply?",o:["Squawk 4521, Golf-CD","Roger, Golf-CD","Wilco, Golf-CD","4521"],e:"Squawk codes must be read back, followed by your callsign."},
{q:"What must be included when reading back a conditional clearance?",o:["The condition itself","Only the action","Only your callsign","The time"],e:"The condition is part of the clearance, so the readback must include it, for example 'behind the landing Cessna'."},
{q:"When may the words \"take off\" be used on the radio?",o:["Only in a take-off clearance or when cancelling one","At any time when departing","Only by the pilot","When reporting airborne"],e:"Reserving 'take off' for the clearance itself prevents a pilot mistaking another instruction for permission to go."},
{q:"In what order should you read back a clearance with several items?",o:["In the same order as given","In order of importance","Any order, as long as all items are included","Alphabetical order"],e:"Reading back in the order given makes it easier for the controller to check."},
{q:"Which item is NOT on the list of mandatory readbacks?",o:["Traffic information","A QNH","A clearance to cross a runway","A heading instruction"],e:"Traffic information is acknowledged. Altimeter settings, runway clearances and headings must be read back."},
{q:"ATC: \"Golf-CD, cleared to land runway 25.\" What is the correct reply?",o:["Cleared to land runway 25, Golf-CD","Roger, Golf-CD","Landing, Golf-CD","Wilco, Golf-CD"],e:"Landing clearances are on the readback list, with the runway and callsign."}
]});

T.push({ id:"services", ref:"090 · 4", title:"Air traffic services and stations",
blurb:"Who you are talking to, and the UK Flight Information Services outside controlled airspace.",
learn:()=>`
<h3>Station callsign suffixes</h3>
<div class="tbl"><table>
<tr><th>Suffix</th><th>Service</th></tr>
<tr><td>TOWER</td><td>Aerodrome control</td></tr>
<tr><td>GROUND</td><td>Ground movement control</td></tr>
<tr><td>APPROACH / RADAR</td><td>Approach control, with or without surveillance</td></tr>
<tr><td>INFORMATION</td><td>Flight information service (including aerodrome FIS)</td></tr>
<tr><td>RADIO</td><td>Air/ground communication service</td></tr>
</table></div>
<p>An <b>air/ground</b> operator ("Radio") can pass information but cannot give clearances or instructions. An <b>aerodrome FISO</b> ("Information") gives information to help you fly safely, but does not clear you to land or take off.</p>
<h3>UK Flight Information Services</h3>
<p>Outside controlled airspace, the UK provides four services. In all of them the <b>pilot remains responsible for collision avoidance</b>.</p>
<div class="tbl"><table>
<tr><th>Service</th><th>What you get</th></tr>
<tr><td>Basic Service</td><td>Information useful for the safe conduct of the flight. No monitoring of your flight; traffic information only if the controller happens to be aware.</td></tr>
<tr><td>Traffic Service</td><td>Surveillance-derived traffic information on relevant traffic. You decide how to avoid it.</td></tr>
<tr><td>Deconfliction Service</td><td>Traffic information plus advice on avoiding action. Intended for IFR flight.</td></tr>
<tr><td>Procedural Service</td><td>Non-surveillance service separating participating aircraft, mainly IFR.</td></tr>
</table></div>
<p>The type of service is agreed with the controller and must be read back.</p>
<h3>Frequency monitoring codes</h3>
<p>Some units publish a squawk to show that you are listening on their frequency without receiving a service. ATC can then contact you quickly if needed. 7000 is the general UK conspicuity code for VFR.</p>`,
qs:[
{q:"A ground station's callsign has the suffix \"RADIO\". What service does it provide?",o:["Air/ground communication service","Aerodrome control","Flight information service","Approach control with radar"],e:"RADIO is an air/ground station, which passes information but can't issue clearances or instructions."},
{q:"Under a Basic Service, who is responsible for collision avoidance?",o:["The pilot","The controller","The controller and the pilot equally","Nobody outside controlled airspace"],e:"In every UK FIS the pilot is responsible for avoiding other traffic. A Basic Service does not monitor your flight."},
{q:"What does a Traffic Service provide?",o:["Surveillance-derived traffic information, with the pilot responsible for avoiding it","Separation from all other traffic","Avoiding action instructions you must follow","Only weather information"],e:"Traffic Service gives information on relevant traffic from radar. You decide what to do about it."},
{q:"Which station suffix indicates an aerodrome flight information service?",o:["INFORMATION","TOWER","RADIO","GROUND"],e:"FIS units, including aerodrome FIS, use INFORMATION. TOWER is aerodrome control."},
{q:"An air/ground operator tells you the runway in use and the QNH. Can they clear you to land?",o:["No, they can only give information","Yes, if no other traffic is reported","Yes, outside controlled airspace","Only with the airfield manager's permission"],e:"Air/ground operators provide information only. The decision to land is yours."},
{q:"What is a frequency monitoring code?",o:["A squawk showing you are listening on a unit's frequency without receiving a service","The code for radio failure","A code to request a service","A code for flights in controlled airspace only"],e:"Frequency monitoring codes help ATC identify and contact you if needed, for example to prevent an airspace infringement."},
{q:"Which statement about the type of ATS service is correct?",o:["It must be agreed with the controller and read back","It is assigned automatically by squawk","It never needs to be stated","It only applies above 3,000 ft"],e:"The type of service is on the mandatory readback list, so both sides agree what is being provided."}
]});

T.push({ id:"emergency", ref:"090 · 5", title:"Emergencies and radio failure",
blurb:"MAYDAY and PAN calls, 121.5 MHz, practice PANs, and what to do when the radio stops.",
learn:()=>`
<h3>Distress and urgency</h3>
<p><b>MAYDAY MAYDAY MAYDAY</b> for grave and imminent danger needing immediate help. <b>PAN PAN, PAN PAN, PAN PAN</b> for an urgent situation that doesn't need immediate help. Then, as far as possible:</p>
<ol>
<li>Name of the station addressed</li>
<li>Callsign</li>
<li>Aircraft type</li>
<li>Nature of the emergency</li>
<li>Pilot's intentions</li>
<li>Position, height and heading</li>
<li>Pilot qualification (UK)</li>
<li>Other useful information, such as persons on board and endurance</li>
</ol>
<ul>
<li>Use the frequency you're already on. If you have no contact, use <b>121.5 MHz</b>. Squawk <b>7700</b>.</li>
<li>The station receiving a MAYDAY controls distress traffic. It may impose silence with "Stop transmitting, MAYDAY".</li>
<li>When the emergency is over, cancel it, for example "Cancel distress".</li>
</ul>
<h3>Practice PANs</h3>
<p>In the UK you may practise a PAN on <b>121.5 MHz only</b>, to the Distress and Diversion cell, starting with "<b>Practice PAN</b>". Listen first and don't practise if the frequency is busy.</p>
<h3>Radio failure</h3>
<ul>
<li>Check the basics: volume, squelch, frequency, headset plugs, the avionics master and circuit breakers.</li>
<li>Squawk <b>7600</b>.</li>
<li>If you think you can transmit but not receive, transmit your position and intentions <b>blind</b>, prefixed "Transmitting blind", twice each time.</li>
<li>If you can receive but not transmit, ATC may use the <b>speechless</b> procedure, asking you to press the transmit button a set number of times.</li>
</ul>`,
qs:[
{q:"Which is the international aeronautical emergency frequency?",o:["121.5 MHz","118.0 MHz","123.45 MHz","243.0 kHz"],e:"121.5 MHz is the VHF emergency frequency, monitored by the UK Distress and Diversion cell."},
{q:"In a MAYDAY message, which comes first after the callsign and aircraft type?",o:["The nature of the emergency","The position","The number of persons on board","The pilot's qualification"],e:"After the station, callsign and type: nature of the emergency, intentions, position/height/heading, pilot qualification, other information."},
{q:"Where may a UK pilot make a practice PAN?",o:["On 121.5 MHz only, prefixed \"Practice PAN\"","On any frequency in use","On the aerodrome frequency only","Practice PANs are not allowed"],e:"Practice PANs go to the Distress and Diversion cell on 121.5 MHz and must be clearly identified as practice."},
{q:"Which squawk indicates radio communication failure?",o:["7600","7700","7500","7000"],e:"7600 is radio failure, 7700 emergency, 7500 unlawful interference, 7000 VFR conspicuity."},
{q:"Your receiver has failed but you believe your transmitter works. What should you do?",o:["Transmit your messages blind, prefixed \"Transmitting blind\", twice","Stop transmitting altogether","Squawk 7500","Transmit on 121.5 only, once"],e:"Transmitting blind gives ATC your position and intentions. Each message is sent twice because you can't hear any reply."},
{q:"The controller hears a MAYDAY on the frequency and says \"Stop transmitting, MAYDAY\". What does this mean?",o:["Other stations must keep silent while the emergency is handled","The emergency is over","You must make a MAYDAY yourself","Change frequency immediately"],e:"This imposes radio silence on other aircraft so the distress traffic isn't interrupted."},
{q:"Which describes a PAN rather than a MAYDAY situation?",o:["An urgent situation that does not need immediate assistance","Grave and imminent danger","Fire in the cabin","Complete engine failure over the sea"],e:"PAN PAN is the urgency signal. MAYDAY is for grave and imminent danger requiring immediate help."}
]});

T.push({ id:"vhf", ref:"090 · 6", title:"VHF and routine calls",
blurb:"How far VHF reaches, the freecall format, and the standard circuit reports.",
learn:()=>`
<h3>VHF</h3>
<ul>
<li>The aeronautical VHF voice band runs from <b>118 to 137 MHz</b>.</li>
<li>VHF travels in straight lines, so it is <b>line of sight</b>. Hills and the curve of the earth block it.</li>
<li>Approximate range: <span class="mono">range (nm) ≈ 1.23 × √(height in ft)</span>. At 2,500 ft that is about 61 nm.</li>
</ul>
<h3>The freecall</h3>
<p>For a UK FIS freecall, after making initial contact and being asked to "pass your message":</p>
<ol>
<li>Callsign</li>
<li>Aircraft type</li>
<li>Departure point</li>
<li>Destination</li>
<li>Position (somewhere the controller will recognise)</li>
<li>Altitude and altimeter setting</li>
<li>Flight rules (VFR or IFR)</li>
<li>Routing, intentions or request</li>
</ol>
<p>Example: "Golf-ABCD, Cessna 150, Eshott to Carlisle, 5 miles west of Morpeth, altitude 2,500 feet, QNH 1012, VFR, request Basic Service."</p>
<h3>Circuit reports</h3>
<ul>
<li><b>Downwind</b>: when abeam the upwind end of the runway.</li>
<li><b>Base</b>: if requested, on completing the turn onto base leg.</li>
<li><b>Final</b>: after the turn onto final, within about 4 nm of the threshold.</li>
<li><b>Long final</b>: on final between about 4 and 8 nm.</li>
</ul>
<div class="box trap"><b>Common trap</b>Before transmitting, listen. Make sure the frequency is clear and you aren't about to interrupt an exchange.</div>`,
qs:[
{q:"Which frequency band is used for aeronautical VHF voice communication?",o:["118 to 137 MHz","108 to 118 MHz","190 to 1,750 kHz","2 to 30 MHz"],e:"Voice communications use 118 to 137 MHz. 108 to 118 MHz is used by VOR and ILS."},
{q:"Why might you lose radio contact with a station 40 nm away when flying low behind hills?",o:["VHF is line of sight and the hills block it","The station switches off at low level","VHF only works over water","The transmitter loses power at low level"],e:"VHF travels in straight lines. Terrain or the curve of the earth between you and the station blocks it."},
{q:"Approximately what VHF range would you expect at 2,500 ft over flat ground?",o:["61 nm","25 nm","150 nm","10 nm"],e:"1.23 × √2,500 = 1.23 × 50 ≈ 61 nm."},
{q:"In a UK freecall, what comes immediately after the aircraft type?",o:["Departure point","Position","Altitude","Request"],e:"Callsign, type, departure, destination, position, altitude and setting, flight rules, then intentions or request."},
{q:"When is the \"downwind\" report normally made?",o:["When abeam the upwind end of the runway","At the start of the crosswind leg","Halfway along the downwind leg","When turning onto base"],e:"Downwind is reported abeam the upwind end of the runway."},
{q:"At about what distance from the threshold is a \"final\" report made?",o:["Within about 4 nm","At 10 nm","At exactly 2 nm","Over the threshold"],e:"'Final' is reported after turning onto final within about 4 nm. Between about 4 and 8 nm is 'long final'."},
{q:"What should you do immediately before transmitting?",o:["Listen to make sure the frequency is clear","Press the transmit button and wait two seconds","Change to 121.5","Squawk ident"],e:"Listening first avoids blocking another transmission or interrupting an exchange."}
]});

SUBJECTS.push({ id:"comms", code:"090", name:"Communications",
  blurb:"Phonetics and numbers, standard words, readbacks and clearances, UK air traffic services, emergencies and radio failure, and routine calls.",
  topics:T });
})();
