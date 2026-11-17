const FIG={};
const acu=(x,y,r,c,s)=>`<use href="#ac" class="${c}" transform="translate(${x} ${y}) rotate(${r}) scale(${s||1.35})"/>`;
const pth=(d,c,extra)=>`<path d="${d}" class="ln ${c}" ${extra||'class="dash"'} marker-end="url(#arr)"/>`;

FIG.rules=()=>`<div class="figrow">
<figure class="fig"><svg viewBox="0 0 240 230" role="img" aria-label="Head-on: both aircraft alter course to the right"><rect class="fb" x="1" y="1" width="238" height="228" rx="6"/>
<path d="M90,192 L90,150 C90,125 150,125 150,100 L150,36" class="ln dash pa" marker-end="url(#arr)"/>
<path d="M90,38 L90,80 C90,105 30,105 30,130 L30,194" class="ln dash pb" marker-end="url(#arr)"/>
${acu(90,208,0,'ac-a')}${acu(90,22,180,'ac-b')}
<text class="tb" x="106" y="214">A</text><text class="tb" x="106" y="28">B</text>
<text class="t" x="158" y="168">each turns</text><text class="t" x="158" y="182">to its right</text>
</svg><figcaption><b>Head-on.</b> Both alter heading to the right.</figcaption></figure>
<figure class="fig"><svg viewBox="0 0 240 230" role="img" aria-label="Converging: the aircraft with the other on its right gives way"><rect class="fb" x="1" y="1" width="238" height="228" rx="6"/>
<path d="M80,189 L80,126" class="ln dash pa" marker-end="url(#arr)"/>
<path d="M184,110 L98,110" class="ln dash pb" marker-end="url(#arr)"/>
<circle cx="80" cy="110" r="7" class="hot"/>
${acu(80,205,0,'ac-a')}${acu(200,110,-90,'ac-b')}
<text class="tb" x="96" y="206">A</text><text class="tb" x="196" y="136">B</text>
<text class="t" x="96" y="168">B is on A's right:</text><text class="t" x="96" y="182">A gives way</text>
<text class="t" x="108" y="94">B keeps its course</text>
</svg><figcaption><b>Converging.</b> The aircraft that has the other on its right gives way.</figcaption></figure>
<figure class="fig"><svg viewBox="0 0 240 230" role="img" aria-label="Overtaking: the overtaken aircraft has right of way, the overtaker alters heading to the right"><rect class="fb" x="1" y="1" width="238" height="228" rx="6"/>
<path d="M100,92 L100,44" class="ln pb" marker-end="url(#arr)"/>
<path d="M100,189 L100,166 C100,142 160,150 160,122 L160,40" class="ln dash pa" marker-end="url(#arr)"/>
${acu(100,108,0,'ac-b')}${acu(100,205,0,'ac-a')}
<text class="tb" x="116" y="112">B</text><text class="tb" x="116" y="210">A</text>
<text class="t" x="108" y="60">B: right of way</text>
<text class="t" x="172" y="150">A passes</text><text class="t" x="172" y="164">on the right</text>
</svg><figcaption><b>Overtaking.</b> The overtaken aircraft has right of way; the overtaker alters heading to the right.</figcaption></figure>
</div>`;

FIG.altimetry=()=>`<figure class="fig wide"><svg viewBox="0 0 480 350" role="img" aria-label="Altimeter settings: flight levels above the transition level, altitudes below the transition altitude, QFE measured from the aerodrome, QNH from sea level">
<rect class="f-tint" x="20" y="20" width="300" height="80"/>
<rect class="f-mag" x="20" y="100" width="300" height="50"/>
<rect class="f-card" x="20" y="150" width="300" height="112" style="stroke:var(--line)"/>
<rect class="f-ground" x="20" y="262" width="300" height="38"/>
<line x1="20" y1="100" x2="320" y2="100" class="ln"/><line x1="20" y1="150" x2="320" y2="150" class="ln"/><line x1="20" y1="262" x2="320" y2="262" class="ln"/>
<line x1="20" y1="300" x2="470" y2="300" class="ln dash"/>
<line x1="20" y1="320" x2="470" y2="320" class="ln dot2"/>
<text class="tb" x="30" y="40">FLIGHT LEVELS</text><text class="tm" x="30" y="55">altimeter set to 1013.25 hPa</text>
<text class="tm" x="30" y="94">transition level</text>
<text class="tb" x="30" y="128">TRANSITION LAYER</text>
<text class="tm" x="30" y="164">transition altitude</text>
<text class="tb" x="30" y="184">ALTITUDES</text><text class="tm" x="30" y="199">altimeter set to QNH</text>
<text class="tm" x="30" y="278">aerodrome elevation</text>
<text class="tm" x="30" y="294">mean sea level</text>
<text class="tm" x="30" y="337">1013.25 hPa datum (below sea level on a low-pressure day)</text>
<line x1="20" y1="215" x2="410" y2="215" class="ln dot2"/>
<line x1="20" y1="62" x2="450" y2="62" class="ln dot2"/>
${acu(250,215,90,'ac-a',1.2)}${acu(250,62,90,'ac-b',1.2)}
<line x1="360" y1="300" x2="360" y2="218" class="ln" marker-end="url(#arr)"/>
<line x1="395" y1="262" x2="395" y2="218" class="ln" marker-end="url(#arr)"/>
<line x1="440" y1="320" x2="440" y2="65" class="ln" marker-end="url(#arr)"/>
<text class="tb" x="360" y="208" text-anchor="middle">QNH</text>
<text class="tb" x="397" y="208" text-anchor="middle">QFE</text>
<text class="tb" x="440" y="52" text-anchor="middle">FL</text>
</svg><figcaption>Three ways to measure the same climb. QNH counts from sea level, QFE from the aerodrome, flight levels from the 1013.25 hPa surface.</figcaption></figure>`;

FIG.compass=()=>{
  const cx=150,cy=150,r=118;
  return `<figure class="fig wide"><svg viewBox="0 0 300 310" role="img" aria-label="Semicircular rule: tracks 000 to 179 use odd levels, 180 to 359 use even levels">
<path d="M${cx},${cy-r} A${r},${r} 0 0 1 ${cx},${cy+r} Z" class="f-tint"/>
<path d="M${cx},${cy-r} A${r},${r} 0 0 0 ${cx},${cy+r} Z" class="f-mag"/>
<circle cx="${cx}" cy="${cy}" r="${r}" class="ln"/>
<line x1="${cx}" y1="${cy-r}" x2="${cx}" y2="${cy+r}" class="ln" style="stroke-width:2.5"/>
<text class="tb" x="${cx}" y="${cy-r-8}" text-anchor="middle">000 / 360</text>
<text class="tb" x="${cx}" y="${cy+r+18}" text-anchor="middle">180</text>
<text class="tm" x="${cx+r+6}" y="${cy+4}" text-anchor="start">090</text>
<text class="tm" x="${cx-r-6}" y="${cy+4}" text-anchor="end">270</text>
<text class="tb" x="${cx+60}" y="${cy-34}" text-anchor="middle">000° – 179°</text>
<text class="t" x="${cx+60}" y="${cy-14}" text-anchor="middle">IFR: odd FL</text>
<text class="t" x="${cx+60}" y="${cy+2}" text-anchor="middle">VFR: odd + 500 ft</text>
<text class="tm" x="${cx+60}" y="${cy+22}" text-anchor="middle">FL 50 · FL 55</text>
<text class="tb" x="${cx-60}" y="${cy-34}" text-anchor="middle">180° – 359°</text>
<text class="t" x="${cx-60}" y="${cy-14}" text-anchor="middle">IFR: even FL</text>
<text class="t" x="${cx-60}" y="${cy+2}" text-anchor="middle">VFR: even + 500 ft</text>
<text class="tm" x="${cx-60}" y="${cy+22}" text-anchor="middle">FL 60 · FL 65</text>
</svg><figcaption>Magnetic track decides the level. Odd levels go east, even levels go west; VFR flies the same thousands plus 500 ft.</figcaption></figure>`;
};

FIG.vmc=()=>`<figure class="fig wide"><svg viewBox="0 0 480 250" role="img" aria-label="VMC minima by altitude band: 8 km at and above 10,000 ft, 5 km below">
<rect class="f-tint" x="10" y="16" width="460" height="60"/>
<rect class="f-card" x="10" y="76" width="460" height="64" style="stroke:var(--line)"/>
<rect class="f-mag" x="10" y="140" width="460" height="64"/>
<rect class="f-ground" x="10" y="204" width="460" height="20"/>
<line x1="10" y1="76" x2="470" y2="76" class="ln"/><line x1="10" y1="140" x2="470" y2="140" class="ln"/><line x1="10" y1="204" x2="470" y2="204" class="ln"/>
<text class="tm" x="16" y="71">10,000 ft AMSL</text><text class="tm" x="16" y="135">3,000 ft AMSL *</text><text class="tm" x="16" y="218">ground</text>
<text class="big" x="150" y="58" text-anchor="middle">8 km</text>
<text class="big" x="150" y="118" text-anchor="middle">5 km</text>
<text class="big" x="150" y="182" text-anchor="middle">5 km</text>
<text class="tm" x="150" y="30" text-anchor="middle">flight visibility</text>
<g>
 <ellipse cx="300" cy="40" rx="14" ry="9" class="f-card ln"/><ellipse cx="318" cy="34" rx="16" ry="11" class="f-card ln"/><ellipse cx="336" cy="40" rx="14" ry="9" class="f-card ln"/>
 <rect x="288" y="42" width="60" height="8" class="f-tint" style="stroke:none"/>
 <line x1="352" y1="40" x2="452" y2="40" class="ln" marker-start="url(#arr2)" marker-end="url(#arr)"/>
 <text class="t" x="402" y="32" text-anchor="middle">1500 m</text>
 <line x1="318" y1="54" x2="318" y2="104" class="ln" marker-start="url(#arr2)" marker-end="url(#arr)"/>
 <text class="t" x="326" y="84">1000 ft</text>
 ${acu(318,116,90,'ac-a',1)}
</g>
<text class="t" x="260" y="166">A–E: 1500 m / 1000 ft from cloud</text>
<text class="t" x="260" y="186">F, G: clear of cloud, surface in sight</text>
<text class="tm" x="16" y="244">* or 1,000 ft above terrain, whichever is higher</text>
</svg><figcaption>Standard SERA table (Table S5-1). The UK also has reduced-visibility provisions for Classes D, F and G, covered below.</figcaption></figure>`;

FIG.runway=()=>`<figure class="fig wide"><svg viewBox="0 0 480 170" role="img" aria-label="Runway numbers are the magnetic heading divided by ten: 09 at one end, 27 at the other">
<rect class="f-rw" x="50" y="56" width="380" height="56" rx="2"/>
${[0,1,2,3,4,5,6].map(i=>`<rect class="f-mk" x="58" y="${62+i*7.5}" width="22" height="3"/><rect class="f-mk" x="400" y="${62+i*7.5}" width="22" height="3"/>`).join('')}
<line x1="140" y1="84" x2="340" y2="84" class="mkl" stroke-dasharray="16 12"/>
<text x="106" y="84" class="f-mk" style="font:600 26px var(--font-d);fill:var(--mk)" text-anchor="middle" dominant-baseline="central" transform="rotate(90 106 84)">09</text>
<text x="374" y="84" class="f-mk" style="font:600 26px var(--font-d);fill:var(--mk)" text-anchor="middle" dominant-baseline="central" transform="rotate(-90 374 84)">27</text>
<line x1="60" y1="36" x2="200" y2="36" class="ln pa" marker-end="url(#arr)"/>
<text class="t" x="60" y="26">landing heading 090°</text>
<line x1="420" y1="140" x2="280" y2="140" class="ln pb" marker-end="url(#arr)"/>
<text class="t" x="420" y="158" text-anchor="end">landing heading 270°</text>
<line x1="455" y1="48" x2="455" y2="18" class="ln" marker-end="url(#arr)"/><text class="tb" x="455" y="62" text-anchor="middle">N</text>
</svg><figcaption>The number is the magnetic heading to the nearest 10°, divided by ten. Parallel runways add L, C or R.</figcaption></figure>`;

FIG.licence=()=>`<figure class="fig wide"><svg viewBox="0 0 480 250" role="img" aria-label="Timelines: 18 months to pass all theory exams, 24 months to take the skill test, 24-month SEP validity with at least 6 of the 12 hours in the final year">
<text class="tb" x="40" y="22">Theory: all nine exams passed within</text>
<rect class="f-tint ln" x="40" y="30" width="300" height="24"/>
<text class="t" x="190" y="46" text-anchor="middle">18 months</text>
<text class="tm" x="40" y="70">first attempt</text><text class="tm" x="340" y="70" text-anchor="end">deadline</text>
<text class="tb" x="40" y="100">Skill test: within</text>
<rect class="f-mag ln" x="40" y="108" width="400" height="24"/>
<text class="t" x="240" y="124" text-anchor="middle">24 months of passing the last theory exam</text>
<text class="tm" x="40" y="148">last exam passed</text><text class="tm" x="440" y="148" text-anchor="end">deadline</text>
<text class="tb" x="40" y="178">SEP rating validity: 24 months</text>
<rect class="f-card ln" x="40" y="186" width="200" height="24"/><rect class="f-tint ln" x="240" y="186" width="200" height="24"/>
<text class="t" x="140" y="202" text-anchor="middle">up to 6 h here</text><text class="t" x="340" y="202" text-anchor="middle">at least 6 h here</text>
<text class="tm" x="40" y="226">year 1</text><text class="tm" x="240" y="226">year 2</text>
<text class="tm" x="440" y="226" text-anchor="end">12 h total · 6 h PIC · 12 take-offs/landings</text>
</svg><figcaption>Revalidation figures reflect the CAA changes in force from 1 October 2025.</figcaption></figure>`;
const TOPICS=[];
// In each question, the FIRST option (o[0]) is the correct one. The app shuffles them when shown.

TOPICS.push({
id:'convention', ref:'010.01 · 010.14', title:'Chicago Convention and ICAO',
blurb:'The treaty everything else hangs from, and how ICAO rules become national law.',
learn:()=>`
<p>The <b>Chicago Convention (1944)</b> created <b>ICAO</b>, the International Civil Aviation Organization, a UN specialised agency based in Montreal. Its first principle is that every State has complete and exclusive <b>sovereignty</b> over the airspace above its territory (Article 1).</p>
<h3>Articles worth knowing</h3>
<div class="tbl"><table>
<tr><th>Article</th><th>What it says</th></tr>
<tr><td>1</td><td>Each State has complete and exclusive sovereignty over its airspace.</td></tr>
<tr><td>3</td><td>The Convention applies to <b>civil</b> aircraft only. Military, customs and police aircraft are State aircraft.</td></tr>
<tr><td>12</td><td>Rules of the air. Over the high seas, the rules established under the Convention apply.</td></tr>
<tr><td>18</td><td>An aircraft cannot be validly registered in more than one State.</td></tr>
<tr><td>29</td><td>Documents to be carried in an aircraft on international flights.</td></tr>
<tr><td>31 · 32</td><td>Certificate of airworthiness; licences of personnel.</td></tr>
<tr><td>37 · 38</td><td>ICAO adopts Standards and Recommended Practices (SARPs). A State that cannot comply must notify the difference.</td></tr>
</table></div>
<h3>Standards, Recommended Practices and differences</h3>
<p>A <b>Standard</b> is necessary for safety or regularity of air navigation: States must comply, or notify ICAO of the difference. A <b>Recommended Practice</b> is desirable but not binding in the same way. A State's differences are published in its AIP, in section <span class="mono">GEN 1.7</span> for the UK.</p>
<h3>The Annexes</h3>
<p>SARPs are published as 19 Annexes. The highlighted ones are named in the CAA's Air Law syllabus.</p>
<div class="tiles">
${[['1','Personnel licensing',1],['2','Rules of the air',1],['3','Meteorological service',0],['4','Aeronautical charts',0],['5','Units of measurement',0],['6','Operation of aircraft',0],['7','Aircraft nationality and registration marks',1],['8','Airworthiness of aircraft',1],['9','Facilitation',0],['10','Aeronautical telecommunications',0],['11','Air traffic services',1],['12','Search and rescue',1],['13','Aircraft accident and incident investigation',1],['14','Aerodromes',1],['15','Aeronautical information services',1],['16','Environmental protection',0],['17','Security',1],['18','Dangerous goods',0],['19','Safety management',0]].map(a=>`<div class="tile ${a[2]?'hi':''}"><div class="n">Annex ${a[0]}</div><div class="t">${a[1]}</div></div>`).join('')}
</div>
<div class="box note"><b>Also in the syllabus</b>ICAO Doc 8168 (altimeter setting and procedures), Doc 4444 (air traffic management) and Doc 7031 (regional supplementary procedures, including transponder use).</div>
<div class="src">Syllabus structure: CAA Part-FCL PPL Air Law learning objectives (010), v1 Jan 2020. Articles: Chicago Convention text.</div>`,
qs:[
{q:'Which instrument created the International Civil Aviation Organization?',o:['The Chicago Convention (1944)','The Paris Convention (1919)','The Warsaw Convention (1929)','The Tokyo Convention (1963)'],e:'ICAO was created under the Chicago Convention of 1944. Paris (1919) was an earlier treaty that Chicago superseded, Warsaw deals with carrier liability and Tokyo with offences committed on board aircraft.'},
{q:'In an ICAO Annex, what is the effect of a Standard?',o:['States must comply, or notify ICAO of any difference','States may ignore it if they prefer','It applies only to scheduled airline operations','It is advice that States are encouraged to follow'],e:'Standards are necessary for safety or regularity. A State that cannot comply must notify the difference (Article 38). Recommended Practices are the ones that are merely desirable.'},
{q:'Where would a UK pilot find the differences between national regulations and ICAO Standards?',o:['In the UK AIP, section GEN 1.7','In the UK AIP, section AD 2','In a NOTAM issued each month','In the aircraft flight manual'],e:'Differences from ICAO Standards, Recommended Practices and Procedures are published in the AIP at GEN 1.7.'},
{q:'Which ICAO Annex deals with aircraft nationality and registration marks?',o:['Annex 7','Annex 8','Annex 1','Annex 6'],e:'Annex 7 covers nationality and registration marks. Annex 8 is airworthiness, Annex 1 is personnel licensing and Annex 6 is operation of aircraft.'},
{q:'Over the high seas, whose rules of the air apply?',o:['The rules established under the Convention (Annex 2)','The rules of the State of Registry only','The rules of the nearest coastal State','Whichever rules the pilot prefers'],e:'Article 12: over the high seas the rules in force are those established under the Convention, which means Annex 2.'},
{q:'Which of these is a State aircraft under Article 3 of the Convention?',o:['A police aircraft','A flying-club Cessna','A charter airliner','A privately owned motor glider'],e:'Aircraft used in military, customs and police services are State aircraft. The Convention applies only to civil aircraft.'}
]});

TOPICS.push({
id:'aircraft', ref:'010.02 · 010.03', title:'Aircraft marks, registration and airworthiness',
blurb:'Annexes 7 and 8: what the letters on the tail mean and which papers go with the aircraft.',
learn:()=>`
<p>Every aircraft carries a <b>nationality mark</b> followed by a <b>registration mark</b>. The nationality mark comes from the radio call sign series allocated to the State by the ITU. For the UK it is <b>G</b>, so a UK aircraft is written G-ABCD.</p>
<div class="sq">
<div class="tile"><div class="big">G</div><div class="d">UK nationality mark</div></div>
<div class="tile"><div class="big">ABCD</div><div class="d">registration mark</div></div>
</div>
<p>An aircraft can be validly registered in <b>one State only</b> (Article 18). Registration can move from one State to another.</p>
<h3>Documents carried (Article 29)</h3>
<ul>
<li>Certificate of registration</li>
<li>Certificate of airworthiness</li>
<li>Appropriate licences of each crew member</li>
<li>Journey log book</li>
<li>Aircraft radio station licence, if radio equipped</li>
<li>If carrying passengers: a list of their names and places of embarkation and destination</li>
<li>If carrying cargo: a manifest and detailed declarations</li>
</ul>
<h3>Certificate of airworthiness</h3>
<p>Article 31 requires a certificate of airworthiness, issued or rendered valid by the State of Registry, for every aircraft engaged in international navigation. <b>Annex 8</b> sets the airworthiness standards behind it. The certificate of registration records the registration; the C of A shows the aircraft meets the airworthiness standard.</p>
<div class="box trap"><b>Common trap</b>EG is the start of UK aerodrome location indicators (EGLL, EGPH). It is not a nationality mark. The mark on an aircraft is just G.</div>
<div class="src">Source: Chicago Convention Articles 18, 29, 31; CAA 010 learning objectives 010.02 and 010.03.</div>`,
qs:[
{q:'What is the nationality mark of a UK-registered aircraft?',o:['G','UK','GB','EG'],e:'The UK nationality mark is G, as in G-ABCD. EG is the prefix of UK aerodrome location indicators, not an aircraft mark.'},
{q:'Under the Chicago Convention, an aircraft may be validly registered in:',o:['Only one State at a time','Two States, if both agree','Any number of States that each issue a C of A','Up to three States'],e:'Article 18: an aircraft cannot be validly registered in more than one State, though its registration may be changed from one State to another.'},
{q:'Which certificate shows an aircraft meets the airworthiness standard and is issued or rendered valid by the State of Registry?',o:['Certificate of airworthiness','Certificate of registration','Aircraft radio licence','Journey log book'],e:'Article 31 requires a certificate of airworthiness issued or rendered valid by the State of Registry. The certificate of registration records the registration itself.'},
{q:'Which of these must an aircraft on an international flight carry under Article 29?',o:['Its certificate of registration','Its purchase agreement','Receipts for landing fees','Its maintenance contract'],e:'Article 29 lists: certificate of registration, certificate of airworthiness, crew licences, journey log book, radio station licence if radio equipped, and passenger and cargo documents where relevant.'}
]});

TOPICS.push({
id:'licensing', ref:'010.04', title:'Licences, exams and currency',
blurb:'PPL(A) privileges, the exam clock, passenger-carrying currency and the October 2025 changes.',
learn:()=>`
<p>A <b>PPL(A)</b> lets you act as pilot-in-command of aeroplanes on non-commercial flights, within the class or type ratings on your licence. Annex 1 sets the international standards; in the UK they are applied through Part-FCL.</p>
<h3>The nine theory exams</h3>
<p>Common subjects: Air Law, Human Performance, Meteorology, Communications, Navigation. Aircraft-specific: Principles of Flight, Operational Procedures, Flight Performance and Planning, Aircraft General Knowledge.</p>
<ul>
<li>Multiple choice, four options, no negative marking.</li>
<li>Pass mark: <b>75%</b> in each exam.</li>
<li>All nine within <b>18 months</b> of the end of the calendar month of your first attempt.</li>
<li>Skill test within <b>24 months</b> of passing the last theory exam.</li>
</ul>
${FIG.licence()}
<h3>Carrying passengers</h3>
<p>Before carrying passengers as PIC you must have flown at least <b>3 take-offs and landings in the preceding 90 days</b> in the same class or type of aircraft (or a suitable simulator).</p>
<h3>Revalidating the SEP rating by experience</h3>
<ul>
<li><b>12 hours</b> of flight time in the 24-month validity period</li>
<li>Up to 6 of those hours may be flown in the first year, so at least 6 fall in the final 12 months</li>
<li>6 hours as PIC, 12 take-offs and 12 landings</li>
<li>Refresher training of at least 1 hour with an instructor</li>
</ul>
<h3>Other changes from 1 October 2025</h3>
<p>The CAA no longer issues the <b>LAPL(A)</b>; it issues the NPPL(A) and the Part-FCL PPL(A). LAPL(A) licences already issued stay valid. Time in three-axis microlights can now count towards PPL training and SEP revalidation.</p>
<div class="box trap"><b>Common trap</b>Older books say all 12 revalidation hours must fall in the final 12 months. Since 1 October 2025 up to 6 can be flown in the first year. Questions written before that date can show the old rule.</div>
<div class="box note"><b>Check</b>Confirm the current revalidation detail on the CAA's SEP page before relying on it; this area has been changing.</div>
<div class="src">Sources: CAA PPL(A) and theory exam pages; CAA licensing review summary (CAP 3155) and CAP 3212; exam rules as published by training providers' e-exam guidance.</div>`,
qs:[
{q:'What is the pass mark for each CAA PPL theory exam?',o:['75%','60%','70%','80%'],e:'Each exam has a 75% pass mark. They are multiple choice with four options and no negative marking.'},
{q:'How long do you have to pass all nine theory exams, counted from the end of the calendar month of your first attempt?',o:['18 months','12 months','24 months','36 months'],e:'18 months. After the last pass you then have 24 months to take the skill test.'},
{q:'After you pass your last theory exam, within what period must you take the skill test?',o:['24 months','12 months','18 months','6 months'],e:'The skill test must be taken within 24 months of passing the last theory exam.'},
{q:'To carry passengers as PIC, what recent experience must you have in the preceding 90 days?',o:['3 take-offs and landings in the same class or type','1 hour of flight time as PIC','5 take-offs and landings in any aircraft','A flight with an instructor'],e:'Three take-offs and landings in the preceding 90 days, in the same class or type (or a suitable simulator), before you carry passengers.'},
{q:'SEP revalidation by experience needs 12 hours in the 24-month validity period. Since 1 October 2025, at least how many must be flown in the final 12 months?',o:['6','12','3','9'],e:'Up to six of the 12 hours may be flown in the first year, so at least six fall in the last 12 months. You also need 6 hours as PIC, 12 take-offs and landings, and refresher training with an instructor.'},
{q:'Which aeroplane licences does the UK CAA issue from 1 October 2025?',o:['NPPL(A) and Part-FCL PPL(A), with no new LAPL(A)','LAPL(A), NPPL(A) and PPL(A)','PPL(A) only','LAPL(A) and PPL(A) only'],e:'The CAA stopped issuing the LAPL(A) on 1 October 2025. Existing LAPL(A) licences remain valid.'}
]});

TOPICS.push({
id:'rules', ref:'010.05', title:'Rules of the air',
blurb:'Right of way, minimum heights and lights: Annex 2 as applied through UK SERA.',
learn:()=>`
<p>Annex 2 sets the rules of the air. In the UK they apply through the Standardised European Rules of the Air (SERA) and the Air Navigation Order. The pilot-in-command is responsible for compliance, and must follow the rules unless safety requires otherwise.</p>
<h3>Right of way in the air</h3>
${FIG.rules()}
<p>Being <b>overtaken</b> means the other aircraft approaches from behind, within 70° of your plane of symmetry. Whether the overtaker is climbing, descending or level, it must keep clear until it is entirely past.</p>
<h3>Order of giving way</h3>
<div class="tbl"><table>
<tr><th>Aircraft</th><th>Gives way to</th></tr>
<tr><td>Powered aeroplane</td><td>Airships, gliders, balloons, and aircraft towing others</td></tr>
<tr><td>Airship</td><td>Gliders and balloons</td></tr>
<tr><td>Glider</td><td>Balloons</td></tr>
</table></div>
<p>A balloon therefore gives way to nobody on this list. These exceptions override the plain right-hand rule for converging aircraft.</p>
<h3>Landing</h3>
<ul>
<li>Aircraft in flight or on the ground give way to an aircraft landing or on final approach.</li>
<li>When two aircraft are approaching to land, the <b>higher</b> one gives way to the lower one, but the lower one must not cut in front of an aircraft on final or overtake it.</li>
<li>A powered aeroplane still gives way to a glider, even a higher one.</li>
</ul>
<h3>Minimum heights (VFR)</h3>
<div class="tbl"><table>
<tr><th>Where</th><th>Minimum, except for take-off and landing</th></tr>
<tr><td>Congested area or open-air assembly</td><td>1,000 ft above the highest obstacle within 600 m of the aircraft</td></tr>
<tr><td>Elsewhere</td><td>500 ft above ground or water</td></tr>
</table></div>
<h3>Navigation lights</h3>
<p><span class="dot r"></span>Red on the left (port) wing tip, <span class="dot g"></span>green on the right (starboard) wing tip, <span class="dot w"></span>white at the tail.</p>
<div class="box trap"><b>Common trap</b>"Gives way" does not automatically mean "turns right". Head-on and overtaking both specify a turn to the right. For converging aircraft the rule is only that the aircraft with the other on its right gives way, unless an exception in the order of giving way applies.</div>
<div class="src">Sources: UK SERA (Reg. 923/2012 as retained), SERA.5005 minimum heights; CAA Skyway Code (CAP 1535) Essential Rules of the Air. Right-of-way rules: Annex 2.</div>`,
qs:[
{q:'Two aeroplanes are approaching head-on at the same level. What must each pilot do?',o:['Alter heading to the right','Alter heading to the left','Climb','The higher-registered aircraft turns right and the other holds course'],e:'Head-on: both aircraft alter heading to the right.'},
{q:'Two powered aeroplanes are converging at about the same level and you can see the other aircraft on your right. What do you do?',o:['Give way','Maintain course and speed','Climb above it','Turn left towards it'],e:'The aircraft that has the other on its right gives way.'},
{q:'You are overtaking a slower aeroplane. Which statement is correct?',o:['You must keep clear by altering heading to the right','You must pass on the left','The slower aircraft must alter heading to the right','You may choose either side if you call on the radio'],e:'The aircraft being overtaken has right of way. The overtaker alters heading to the right and must keep clear until it is entirely past.'},
{q:'A powered aeroplane and a glider are converging at the same level and the glider is on the aeroplane\'s left. Who gives way?',o:['The powered aeroplane','The glider, because it is on the left','Neither, they pass each other','The one with the higher airspeed'],e:'Powered aeroplanes give way to gliders, which overrides the plain right-hand rule.'},
{q:'A glider and a balloon are converging at the same level. Who gives way?',o:['The glider','The balloon','The one on the left','The one climbing'],e:'Order of giving way: powered aircraft give way to gliders and balloons; gliders give way to balloons. A balloon gives way to none of them.'},
{q:'Two aeroplanes are approaching an aerodrome to land. Which gives way?',o:['The one at the higher level','The one at the lower level','The faster one','The one further from the runway'],e:'The higher aircraft gives way to the lower one. The lower one must not use this rule to cut in front of an aircraft on final approach or overtake it.'},
{q:'You are above a powered aeroplane and a glider is below you; all are approaching to land. Which statement is correct?',o:['The powered aeroplane gives way to the glider, whatever the height','The higher aircraft always gives way','The glider gives way because it is slower','Nobody gives way in the circuit'],e:'The higher-gives-way rule has an exception: powered aeroplanes still give way to gliders.'},
{q:'Over a congested area, other than for take-off and landing, the minimum height for VFR flight is:',o:['1,000 ft above the highest obstacle within 600 m of the aircraft','500 ft above the highest obstacle within 150 m','1,500 ft above ground level','500 ft above ground level'],e:'Over congested areas and open-air assemblies: at least 1,000 ft above the highest obstacle within a radius of 600 m from the aircraft.'},
{q:'Away from congested areas, other than for take-off and landing, the standard SERA minimum for VFR flight is:',o:['500 ft above ground or water','1,000 ft above ground','300 ft above ground','150 ft above ground'],e:'Elsewhere the SERA minimum is 500 ft (150 m) above the ground or water.'},
{q:'Which colours are shown on the left (port) and right (starboard) wing tips of an aircraft?',o:['Red on the left, green on the right','Green on the left, red on the right','White on the left, red on the right','Red on both, with a white tail'],e:'Red on the left (port), green on the right (starboard), white at the tail.'}
]});
TOPICS.push({
id:'altimetry', ref:'010.06', title:'Altimeter settings and cruising levels',
blurb:'QNH, QFE and 1013.25, the transition layer, and which level to fly on which track.',
learn:()=>`
<p>An altimeter is a pressure gauge. What it shows depends on the pressure you dial into the subscale.</p>
<div class="tbl"><table>
<tr><th>Setting</th><th>Altimeter reads</th><th>On the ground at the aerodrome</th></tr>
<tr><td>QNH</td><td>Altitude above mean sea level</td><td>Aerodrome elevation</td></tr>
<tr><td>QFE</td><td>Height above the aerodrome</td><td>Zero</td></tr>
<tr><td>1013.25 hPa (QNE)</td><td>Pressure altitude, shown as a flight level</td><td>Pressure altitude of the aerodrome</td></tr>
</table></div>
${FIG.altimetry()}
<h3>Transition altitude, layer and level</h3>
<ul>
<li>Below the <b>transition altitude</b> you fly on an altitude (QNH).</li>
<li>Above the <b>transition level</b> you fly flight levels, with 1013.25 hPa set.</li>
<li>The <b>transition level</b> is the lowest flight level available above the transition altitude. The airspace between them is the <b>transition layer</b>.</li>
<li>Climbing through the transition altitude, reset to 1013.25. Descending through the transition level, reset to QNH.</li>
</ul>
<h3>Semicircular cruising levels</h3>
<p>For level cruising flight, magnetic track decides the level. IFR flights use whole thousands; VFR flights use the same thousands plus 500 ft.</p>
${FIG.compass()}
<div class="box trap"><b>Common trap</b>The UK used a quadrantal rule until it moved to the semicircular system in 2015. Old textbooks and old question banks still show quadrantal tracks. If a question mentions four quadrants, check the date of the source.</div>
<div class="box note"><b>Check</b>How the UK applies cruising levels to VFR flight below the transition altitude is detail to confirm in the Skyway Code (CAP 1535).</div>
<div class="src">Sources: ICAO Doc 8168 and SERA Appendix 3 as summarised in the CAA 010 syllabus (010.06). The 2015 UK change is reported in aviation forums and should be checked against the AIP.</div>`,
qs:[
{q:'With QFE set at an aerodrome, what does the altimeter read when the aircraft is on the ground?',o:['Zero','The aerodrome elevation','The pressure altitude','The transition altitude'],e:'QFE is the pressure at aerodrome elevation. With it set, the altimeter shows height above the aerodrome, so it reads zero on the ground there.'},
{q:'With QNH set, what does the altimeter read on the ground at the aerodrome?',o:['The aerodrome elevation above mean sea level','Zero','The pressure altitude','Flight level 000'],e:'QNH makes the altimeter read altitude above mean sea level, so on the ground it reads the aerodrome elevation.'},
{q:'What subscale setting is used when flying at a flight level?',o:['1013.25 hPa','The aerodrome QNH','The aerodrome QFE','The lowest QNH forecast'],e:'Flight levels are measured from the standard setting of 1013.25 hPa, so every aircraft at a flight level is on the same datum.'},
{q:'What is the transition level?',o:['The lowest flight level available for use above the transition altitude','The altitude at which you change from QFE to QNH','The highest altitude at which QNH is used','The level at which the semicircular rule starts'],e:'The transition level is the lowest flight level above the transition altitude. The airspace between the two is the transition layer.'},
{q:'You are climbing through the transition altitude. What should you do with the altimeter subscale?',o:['Set 1013.25 hPa','Set the QFE','Leave the QNH set','Set the regional QNH'],e:'Above the transition altitude you fly flight levels, so set 1013.25 hPa when climbing through it. On descent, reset the QNH when passing the transition level.'},
{q:'You are flying VFR on a magnetic track of 270° in level cruise. Which level fits the semicircular rule?',o:['FL 45','FL 50','FL 55','FL 40'],e:'Tracks 180° to 359° use even thousands, and VFR adds 500 ft. Even 4,000 plus 500 gives FL 45. FL 40 is the IFR level, FL 50 is an IFR odd level and FL 55 is the VFR level for easterly tracks.'},
{q:'You are flying IFR on a magnetic track of 090°. Which level fits the semicircular rule?',o:['FL 50','FL 55','FL 60','FL 65'],e:'Tracks 000° to 179° use odd thousands for IFR, so FL 50. FL 55 would be the VFR equivalent; FL 60 and FL 65 are for westerly tracks.'}
]});

TOPICS.push({
id:'airspace', ref:'010.08', title:'Airspace, VMC minima and ATS',
blurb:'Airspace classes, visibility and cloud clearance, clearances, transponder codes and radio calls.',
learn:()=>`
<h3>Airspace classes</h3>
<p>ICAO defines classes A to G. <b>A to E are controlled</b>, F and G are uncontrolled. VFR flight is <b>not permitted in Class A</b>. The UK uses only some of the classes, so check the chart you are flying on.</p>
<div class="tbl"><table>
<tr><th>Class</th><th>VFR allowed</th><th>ATC clearance for VFR</th><th>Radio for VFR</th></tr>
<tr><td>A</td><td>No</td><td>n/a</td><td>n/a</td></tr>
<tr><td>B · C · D</td><td>Yes</td><td>Required</td><td>Continuous two-way</td></tr>
<tr><td>E</td><td>Yes</td><td>Not required</td><td>Not required</td></tr>
<tr><td>F · G</td><td>Yes</td><td>Not required</td><td>Not required</td></tr>
</table></div>
<p>In Classes C, D, E, F and G there is a speed limit of <b>250 kt IAS below FL 100</b> for VFR flights.</p>
<h3>VMC minima (SERA Table S5-1)</h3>
${FIG.vmc()}
<h3>UK reduced-visibility provisions</h3>
<p>A VFR flight is also treated as complying if it meets these, all of which must hold:</p>
<div class="tbl"><table>
<tr><th>Airspace</th><th>Conditions</th><th>Flight visibility</th></tr>
<tr><td>Class D</td><td>By day; at or below 3,000 ft AMSL (or 1,000 ft above terrain if higher); 140 kt IAS or less; clear of cloud with the surface in sight</td><td>5 km for aeroplanes; 1,500 m for helicopters</td></tr>
<tr><td>Class F · G</td><td>By day; at or below 3,000 ft AMSL (or 1,000 ft above terrain if higher); 140 kt IAS or less; clear of cloud with the surface in sight</td><td>1,500 m</td></tr>
</table></div>
<div class="box trap"><b>Common trap</b>The 1,500 m figure belongs to Classes F and G (and to helicopters in Class D). An aeroplane in Class D still needs 5 km under the reduced provisions.</div>
<h3>VFR at controlled aerodromes</h3>
<p>VFR flights shall not take off or land at an aerodrome in a control zone, or enter its traffic zone or traffic circuit, when the <b>ceiling is below 1,500 ft</b> or the <b>ground visibility is below 5 km</b>. Special VFR is the way to operate in those conditions, with an ATC clearance.</p>
<h3>Transponder codes</h3>
<div class="sq">
<div class="tile"><div class="big">7700</div><div class="d">Emergency</div></div>
<div class="tile"><div class="big">7600</div><div class="d">Radio failure</div></div>
<div class="tile"><div class="big">7500</div><div class="d">Unlawful interference</div></div>
<div class="tile"><div class="big">7000</div><div class="d">Conspicuity (UK VFR)</div></div>
</div>
<h3>Distress and urgency</h3>
<p><b>MAYDAY</b> spoken three times means grave and imminent danger needing immediate help. <b>PAN PAN</b> spoken three times means an urgent situation that does not need immediate help.</p>
<div class="src">Sources: UK SERA.5001 Table S5-1 and CAA SERA pages (Class D, F and G provisions); SERA.5005 (aerodrome minima); ICAO Annex 11 airspace classification.</div>`,
qs:[
{q:'What is the minimum flight visibility for VFR flight at and above 10,000 ft AMSL under the standard SERA table?',o:['8 km','5 km','1,500 m','10 km'],e:'At and above 10,000 ft AMSL: 8 km flight visibility, 1,500 m horizontally and 1,000 ft vertically from cloud.'},
{q:'Under the standard table, a VFR flight at 5,000 ft AMSL in Class G must keep which minima?',o:['5 km visibility, 1,500 m horizontally and 1,000 ft vertically from cloud','8 km visibility and clear of cloud','1,500 m visibility and clear of cloud','5 km visibility and clear of cloud with the surface in sight'],e:'Between 3,000 ft and 10,000 ft AMSL (and above 1,000 ft above terrain) the standard minima are 5 km, 1,500 m horizontally and 1,000 ft vertically from cloud, in all classes.'},
{q:'Under the standard table, at or below 3,000 ft AMSL in Class G, VFR flight needs:',o:['5 km visibility, clear of cloud and with the surface in sight','8 km visibility and 1,000 ft from cloud','1,500 m visibility and 1,000 ft from cloud','5 km visibility and 1,500 m horizontally from cloud'],e:'In Classes F and G at or below 3,000 ft AMSL (or 1,000 ft above terrain), the standard table asks for 5 km, clear of cloud and with the surface in sight.'},
{q:'A fixed-wing aircraft is flying in Class G by day at 2,000 ft AMSL at 120 kt IAS, clear of cloud with the surface in sight. Under the UK provision, what is the minimum flight visibility?',o:['1,500 m','5 km','3 km','8 km'],e:'The UK provision for Classes F and G requires day flight at or below 3,000 ft AMSL, 140 kt IAS or less, clear of cloud with the surface in sight, and flight visibility of at least 1,500 m.'},
{q:'An aeroplane is in Class D by day at 2,500 ft AMSL at 130 kt IAS, clear of cloud with the surface in sight. Under the UK provision, what is the minimum flight visibility?',o:['5 km','1,500 m','3 km','8 km'],e:'In Class D the reduced provision still needs 5 km flight visibility for aeroplanes. 1,500 m applies to helicopters in Class D, and to Classes F and G.'},
{q:'In which class of airspace is VFR flight not permitted?',o:['Class A','Class C','Class D','Class G'],e:'VFR flights are not permitted in Class A airspace.'},
{q:'Which airspace classes are controlled airspace?',o:['A, B, C, D and E','C, D, E and F','A to G','D, E, F and G'],e:'Classes A to E are controlled airspace. Classes F and G are uncontrolled.'},
{q:'What is the maximum IAS for a VFR flight in Class D below FL 100?',o:['250 kt','140 kt','200 kt','300 kt'],e:'There is a 250 kt IAS limit below FL 100 for VFR flights in Classes C, D, E, F and G.'},
{q:'At an aerodrome in a control zone, VFR flights may not take off or land if:',o:['The ceiling is below 1,500 ft or the ground visibility is below 5 km','The ceiling is below 1,000 ft and the visibility is below 3 km','The visibility is below 8 km','There is any cloud below 3,000 ft'],e:'VFR operations at controlled aerodromes need a ceiling of at least 1,500 ft and ground visibility of at least 5 km. Below those, special VFR is the route.'},
{q:'Which transponder code should be selected after a radio communication failure?',o:['7600','7700','7500','7000'],e:'7600 is radio failure, 7700 is emergency, 7500 is unlawful interference and 7000 is the UK VFR conspicuity code.'}
]});

TOPICS.push({
id:'aerodromes', ref:'010.10', title:'Aerodromes and visual signals',
blurb:'Runway numbering, lighting colours, tower light signals and ground signals.',
learn:()=>`
<h3>Runway numbers</h3>
${FIG.runway()}
<p>Runway 27 points at a magnetic heading of about 270°. A runway on 163° is 16 (163° rounds to 160°). A runway on 355° is 36, not 35, because 355° rounds up to 360°.</p>
<h3>Aerodrome lighting colours</h3>
<div class="tbl"><table>
<tr><th>Light</th><th>Colour</th></tr>
<tr><td>Runway edge</td><td>White (amber on the last part of an instrument runway)</td></tr>
<tr><td>Threshold</td><td>Green</td></tr>
<tr><td>Runway end</td><td>Red</td></tr>
<tr><td>Taxiway edge</td><td>Blue</td></tr>
<tr><td>Taxiway centre line</td><td>Green</td></tr>
</table></div>
<h3>Light signals from the tower</h3>
<div class="tbl"><table>
<tr><th>Signal</th><th>To an aircraft in flight</th><th>To an aircraft on the ground</th></tr>
<tr><td><span class="dot g"></span>Steady green</td><td>Cleared to land</td><td>Cleared for take-off</td></tr>
<tr><td><span class="dot g fl"></span>Flashing green</td><td>Return for landing</td><td>Cleared to taxi</td></tr>
<tr><td><span class="dot r"></span>Steady red</td><td>Give way to other aircraft and continue circling</td><td>Stop</td></tr>
<tr><td><span class="dot r fl"></span>Flashing red</td><td>Aerodrome unsafe, do not land</td><td>Taxi clear of the landing area in use</td></tr>
<tr><td><span class="dot w fl"></span>Flashing white</td><td>Land at this aerodrome and proceed to the apron</td><td>Return to the starting point on the aerodrome</td></tr>
</table></div>
<h3>Ground signals in the signal square</h3>
<ul>
<li><b>Red square with yellow diagonals:</b> landing prohibited.</li>
<li><b>Red square with one yellow diagonal:</b> poor state of the manoeuvring area, take special care.</li>
<li><b>White dumbbell:</b> land, take off and taxi on runways and taxiways only.</li>
</ul>
<h3>The circuit</h3>
<p>In the aerodrome traffic circuit: observe other traffic, conform with or avoid the pattern of other aircraft, and make all turns to the <b>left</b> when approaching to land and after take-off unless told otherwise.</p>
<div class="box trap"><b>Common trap</b>Flashing red means different things in the air and on the ground. In the air it is "do not land"; on the ground it is "taxi clear of the landing area". Steady red means "stop" on the ground and "give way and keep circling" in the air.</div>
<div class="src">Sources: ICAO Annex 14 and Annex 2 Appendix 1 (signals), as listed in CAA 010.10 and 010.05. Circuit rules: Annex 2 / SERA.</div>`,
qs:[
{q:'A runway has a magnetic heading of about 270°. What is its number?',o:['27','07','72','270'],e:'Runway numbers are the magnetic heading to the nearest 10° divided by ten, so 270° is runway 27.'},
{q:'A runway lies on a magnetic heading of 163°. What is its number?',o:['16','17','15','163'],e:'163° rounds to the nearest 10°, which is 160°, giving runway 16.'},
{q:'A runway lies on a magnetic heading of 355°. What is its number?',o:['36','35','03','00'],e:'355° rounds to 360°, so the runway is numbered 36.'},
{q:'A steady green light is shown from the tower to an aircraft in flight. What does it mean?',o:['Cleared to land','Return for landing','Cleared for take-off','Cleared to taxi'],e:'To an aircraft in flight, steady green means cleared to land. On the ground it means cleared for take-off.'},
{q:'A steady red light is shown from the tower to an aircraft in flight. What does it mean?',o:['Give way to other aircraft and continue circling','Aerodrome unsafe, do not land','Land and proceed to the apron','Return for landing'],e:'In flight, steady red means give way to other aircraft and continue circling. A flashing red means the aerodrome is unsafe.'},
{q:'A flashing red light is shown to an aircraft in flight. What does it mean?',o:['Aerodrome unsafe, do not land','Give way and continue circling','Cleared to land','Return to the apron'],e:'Flashing red to an aircraft in flight: aerodrome unsafe, do not land.'},
{q:'A flashing red light is shown from the tower to an aircraft on the ground. What does it mean?',o:['Taxi clear of the landing area in use','Stop','Return to the starting point','Cleared to taxi'],e:'On the ground, flashing red means taxi clear of the landing area in use. Steady red means stop.'},
{q:'A flashing white light is shown to an aircraft on the ground. What does it mean?',o:['Return to the starting point on the aerodrome','Cleared for take-off','Stop','Cleared to taxi'],e:'Flashing white to an aircraft on the ground: return to the starting point on the aerodrome.'},
{q:'A red square panel with yellow diagonals is displayed in the signal square. What does it mean?',o:['Landing is prohibited','Take special care on the manoeuvring area','Use runways and taxiways only','Gliding is taking place'],e:'A red square with yellow diagonals means landing is prohibited. With a single yellow diagonal it warns of the poor state of the manoeuvring area.'},
{q:'What colour are taxiway edge lights?',o:['Blue','Green','White','Amber'],e:'Taxiway edge lights are blue. Taxiway centre line lights are green; runway edge lights are white; threshold lights are green; runway end lights are red.'},
{q:'When flying in an aerodrome traffic circuit, which way should all turns be made unless instructed otherwise?',o:['To the left','To the right','Away from the runway','Whichever is shorter'],e:'Make all turns to the left when approaching to land and after take-off, unless otherwise instructed.'}
]});
TOPICS.push({
id:'sar', ref:'010.11 · 010.05', title:'Distress, interception and search and rescue',
blurb:'Distress calls, survivor ground signals and what to do if you are intercepted.',
learn:()=>`
<h3>Distress and urgency</h3>
<p><b>MAYDAY ×3</b>: grave and imminent danger, immediate assistance needed. <b>PAN PAN ×3</b>: urgency, a situation affecting the safety of the aircraft or someone on board, but not needing immediate help. Squawk 7700 for an emergency.</p>
<h3>Ground-to-air signals for survivors</h3>
<p>Survivors on the ground lay out these shapes (or make them from any materials) so a pilot overhead can read them.</p>
<div class="sq">
<div class="tile"><div class="big">V</div><div class="d">Require assistance</div></div>
<div class="tile"><div class="big">X</div><div class="d">Require medical assistance</div></div>
<div class="tile"><div class="big">N</div><div class="d">No, negative</div></div>
<div class="tile"><div class="big">Y</div><div class="d">Yes, affirmative</div></div>
<div class="tile"><div class="big">↑</div><div class="d">Proceeding in this direction</div></div>
</div>
<h3>If you are intercepted</h3>
<p>Interception is rare for a light aircraft but it is syllabus material. The intercepting aircraft signals, and you must respond and comply.</p>
<div class="tbl"><table>
<tr><th>Intercepting aircraft does this</th><th>It means</th></tr>
<tr><td>Rocks its wings from slightly above and ahead, normally on your left, then makes a slow level turn on to the desired heading</td><td>You have been intercepted. Follow me.</td></tr>
<tr><td>Abrupt break-away: a climbing turn of 90° or more, without crossing your line of flight</td><td>You may proceed.</td></tr>
<tr><td>Lowers landing gear, shows steady landing lights and overflies the runway</td><td>Land at this aerodrome.</td></tr>
</table></div>
<p>As the intercepted pilot you should: follow the interceptor's instructions, notify the ATS unit, try to make contact on the emergency frequency <span class="mono">121.5 MHz</span>, and select <span class="mono">7700</span> on the transponder unless ATS says otherwise. Acknowledge visual signals by rocking your wings.</p>
<div class="src">Sources: ICAO Annex 2 (interception and signals) and Annex 12 (search and rescue signals), as listed in CAA 010.05 and 010.11.</div>`,
qs:[
{q:'Survivors lay out the letter V on the ground. What does it mean?',o:['Require assistance','Require medical assistance','Yes, affirmative','Proceeding in this direction'],e:'V means require assistance. X means require medical assistance, N means no and Y means yes.'},
{q:'Survivors lay out the letter X on the ground. What does it mean?',o:['Require medical assistance','Require assistance','No, negative','All is well'],e:'X means require medical assistance. V is the general call for assistance.'},
{q:'Which ground signal means "yes" or "affirmative"?',o:['Y','N','V','↑'],e:'Y is yes or affirmative; N is no or negative.'},
{q:'Which spoken signal is used for an urgent situation that does not need immediate assistance?',o:['PAN PAN, spoken three times','MAYDAY, spoken once','PAN PAN, spoken once','MAYDAY, spoken three times'],e:'PAN PAN spoken three times is the urgency signal. MAYDAY spoken three times is distress, meaning grave and imminent danger.'},
{q:'An aircraft rocks its wings from slightly above and ahead of you, then turns slowly on to a new heading. What does it mean?',o:['You have been intercepted: follow me','You may proceed','Land at this aerodrome','Do not enter this airspace'],e:'Rocking wings followed by a slow level turn means you have been intercepted and should follow.'},
{q:'An intercepting aircraft makes an abrupt climbing turn of 90° or more without crossing your line of flight. What does it mean?',o:['You may proceed','Follow me','Land at this aerodrome','You are in danger'],e:'The break-away manoeuvre means you may proceed.'},
{q:'You are intercepted. Which action is correct?',o:['Follow its instructions, call on 121.5 MHz and select 7700 unless ATS says otherwise','Ignore it and continue until the radio call','Squawk 7500 and descend','Switch the transponder off and land immediately'],e:'Follow the interceptor, notify ATS, try the emergency frequency 121.5 MHz, and select 7700 unless instructed otherwise.'}
]});

TOPICS.push({
id:'ais', ref:'010.09', title:'Aeronautical information',
blurb:'The AIP, NOTAM, AIRAC and AICs: where each kind of information lives.',
learn:()=>`
<p>Annex 15 covers the aeronautical information service. Pilots meet four products.</p>
<div class="tiles">
<div class="tile hi"><div class="n">AIP</div><div class="t">Aeronautical Information Publication</div><div class="d">Permanent information. Three parts: GEN (general), ENR (en route) and AD (aerodromes).</div></div>
<div class="tile hi"><div class="n">NOTAM</div><div class="t">Notice to Air Missions</div><div class="d">Timely notice of the establishment, condition or change of a facility, service, procedure or hazard.</div></div>
<div class="tile hi"><div class="n">AIRAC</div><div class="t">Regulation and control</div><div class="d">Significant changes issued on common effective dates, 28 days apart, with at least 28 days' notice.</div></div>
<div class="tile hi"><div class="n">AIC</div><div class="t">Information circular</div><div class="d">Information that fits neither the AIP nor a NOTAM: explanations, advice and administrative matters.</div></div>
</div>
<ul>
<li>Aerodrome details sit in AIP part <span class="mono">AD</span>; airspace and routes in <span class="mono">ENR</span>; differences from ICAO in <span class="mono">GEN 1.7</span>.</li>
<li>A temporary hazard, such as a crane near a runway or a temporary danger area, is notified by NOTAM.</li>
<li>The AIRAC cycle is <b>28 days</b>, which gives 13 cycles in a year.</li>
</ul>
<div class="box trap"><b>Common trap</b>"AIRAC" is about advance notice and common dates, not a separate publication. The changes it covers are then published in the AIP or by NOTAM.</div>
<div class="src">Sources: ICAO Annex 15 as listed in CAA 010.09 (AIP, NOTAM, AIRAC and AIC).</div>`,
qs:[
{q:'How long is the AIRAC cycle?',o:['28 days','14 days','30 days','56 days'],e:'AIRAC effective dates are 28 days apart, with information distributed at least 28 days ahead.'},
{q:'In which part of the AIP would you find aerodrome information?',o:['AD','GEN','ENR','AIC'],e:'The AIP has three parts: GEN (general), ENR (en route) and AD (aerodromes). AIC is a separate product.'},
{q:'What is an AIC used for?',o:['Information that suits neither the AIP nor a NOTAM, such as explanatory and administrative matters','Reporting a temporary runway closure','Publishing permanent aerodrome data','Issuing radar clearances'],e:'An aeronautical information circular carries information that does not qualify for the AIP or a NOTAM, such as explanations, advice and administrative matters.'},
{q:'Which product notifies a temporary hazard, such as a crane near a runway?',o:['NOTAM','AIP GEN','AIC','AIRAC'],e:'A NOTAM gives timely notice of the establishment, condition or change of any facility, service, procedure or hazard.'},
{q:'What does AIRAC aim to provide?',o:['Advance notice of significant changes, on common effective dates','Daily weather updates','Permission to enter controlled airspace','Real-time traffic information'],e:'AIRAC (Aeronautical Information Regulation and Control) gives advance notice of significant changes in operating practices, using common effective dates.'}
]});

TOPICS.push({
id:'accident', ref:'010.12 · 010.13', title:'Accident investigation and security',
blurb:'Annex 13 definitions and purpose; Annex 17 and unlawful interference.',
learn:()=>`
<h3>Annex 13 definitions</h3>
<div class="tiles">
<div class="tile hi"><div class="n">Accident</div><div class="d">Someone is fatally or seriously injured; the aircraft sustains substantial damage or structural failure needing major repair; or the aircraft is missing or completely inaccessible.</div></div>
<div class="tile"><div class="n">Serious incident</div><div class="d">An incident with circumstances indicating that an accident nearly occurred.</div></div>
<div class="tile"><div class="n">Incident</div><div class="d">An occurrence other than an accident that affects, or could affect, the safety of operation.</div></div>
</div>
<h3>Purpose and responsibility</h3>
<ul>
<li>The sole objective of an investigation is the <b>prevention of accidents and incidents</b>. It is not to apportion blame or liability.</li>
<li>The <b>State of Occurrence</b> institutes the investigation. The State of Registry, the Operator, the State of Design and the State of Manufacture can take part.</li>
</ul>
<h3>Annex 17: security</h3>
<p>Annex 17 aims to safeguard civil aviation against <b>acts of unlawful interference</b>. If you are being hijacked, the transponder code is 7500.</p>
<div class="src">Sources: ICAO Annex 13 and Annex 17, as listed in CAA 010.12 and 010.13.</div>`,
qs:[
{q:'What is the sole objective of an accident investigation under Annex 13?',o:['Prevention of future accidents and incidents','To apportion blame','To establish liability for compensation','To decide whether to prosecute'],e:'Annex 13 says the sole objective is prevention. It is not the purpose of the investigation to apportion blame or liability.'},
{q:'Which State normally institutes an investigation into an accident?',o:['The State of Occurrence','The State of Registry','The State of the aircraft operator','The State of Manufacture'],e:'The State in which the accident occurs institutes the investigation. Other States can take part.'},
{q:'Which of these meets the Annex 13 definition of an accident?',o:['A passenger is seriously injured during the flight','Two aircraft pass at an uncomfortably close distance','A pilot reports a minor instrument defect after landing','A flight is delayed by technical problems'],e:'Serious injury qualifies as an accident. A near-miss that nearly became an accident is a serious incident; a minor defect or a delay is not an accident.'},
{q:'Which Annex covers security and acts of unlawful interference?',o:['Annex 17','Annex 13','Annex 11','Annex 14'],e:'Annex 17 is security. Annex 13 is accident investigation, Annex 11 is air traffic services and Annex 14 is aerodromes.'}
]});

SUBJECTS.push({ id:"airlaw", code:"010", name:"Air Law",
  blurb:"The rules: ICAO and the Chicago Convention, licensing, rules of the air, airspace and VMC, altimetry, aerodromes and signals.",
  topics:TOPICS });
