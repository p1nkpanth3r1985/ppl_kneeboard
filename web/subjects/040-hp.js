// 040 Human Performance and Limitations
(() => {
const swiss = `<figure class="fig wide"><svg viewBox="0 0 440 200" role="img" aria-label="Swiss cheese model: an accident happens when holes in several layers of defence line up">
<rect class="fb" x="1" y="1" width="438" height="198" rx="6"/>
${[0,1,2,3].map(i=>{const x=90+i*80;return `<rect x="${x}" y="40" width="26" height="120" rx="4" class="f-tint ln"/>`+[[52+i*6,6],[100,9],[142-i*5,6]].map(([y,r])=>`<ellipse cx="${x+13}" cy="${y}" rx="7" ry="${r}" class="f-card ln"/>`).join('');}).join('')}
<line x1="30" y1="100" x2="420" y2="100" class="ln pb" style="stroke-width:2.5" marker-end="url(#arr)"/>
<text class="t" x="30" y="90">hazard</text><text class="t" x="420" y="90" text-anchor="end">accident</text>
<text class="tm" x="103" y="180" text-anchor="middle">rules</text><text class="tm" x="183" y="180" text-anchor="middle">training</text>
<text class="tm" x="263" y="180" text-anchor="middle">checklists</text><text class="tm" x="343" y="180" text-anchor="middle">the pilot</text>
</svg><figcaption>Each layer of defence has weaknesses. An accident happens when the holes line up and a hazard passes through all of them (James Reason's "Swiss cheese" model).</figcaption></figure>`;

const arousal = `<figure class="fig wide"><svg viewBox="0 0 420 220" role="img" aria-label="Performance is best at a moderate level of arousal and falls off when arousal is too low or too high">
<rect class="fb" x="1" y="1" width="418" height="218" rx="6"/>
<line x1="50" y1="180" x2="400" y2="180" class="ln"/><line x1="50" y1="180" x2="50" y2="20" class="ln"/>
<text class="tm" x="225" y="206" text-anchor="middle">arousal / stress</text>
<text class="tm" x="20" y="100" transform="rotate(-90 20 100)" text-anchor="middle">performance</text>
<path d="M60,170 Q140,170 200,60 Q225,30 250,60 Q310,170 390,170" class="ln pa" style="stroke-width:3"/>
<text class="t" x="70" y="155">bored, inattentive</text>
<text class="tb" x="225" y="34" text-anchor="middle">best</text>
<text class="t" x="300" y="135">overloaded</text>
</svg><figcaption>Performance is best at a moderate level of arousal (the Yerkes–Dodson relationship). Too little and attention drifts; too much and the pilot becomes overloaded.</figcaption></figure>`;

const T = [];
T.push({ id:"hypoxia", ref:"040 · 1", title:"Breathing, hypoxia and carbon monoxide",
blurb:"What happens to the body as air pressure falls, and two cabin hazards that feel the same.",
learn:()=>`
<h3>The atmosphere and oxygen</h3>
<p>Air is about <b>21% oxygen</b> at every altitude a light aircraft reaches. What falls with height is the <b>pressure</b>, so each breath delivers less oxygen into the blood.</p>
<h3>Hypoxia</h3>
<p>Hypoxia is a shortage of oxygen in the body's tissues. It is dangerous because it is <b>insidious</b>: one of the first things it affects is judgement, so the pilot may feel fine, even euphoric.</p>
<ul>
<li>Symptoms include impaired judgement, euphoria, slowed thinking, headache, tingling, visual impairment and cyanosis (blue lips and fingernails).</li>
<li><b>Night vision</b> is one of the first things affected, from as low as about 5,000 ft.</li>
<li>Smoking, alcohol, fatigue and poor fitness all lower your tolerance.</li>
<li>Treatment: descend, and use oxygen if available.</li>
</ul>
<h3>Hyperventilation</h3>
<p>Over-breathing, often from anxiety, washes too much <b>carbon dioxide</b> out of the blood. Symptoms are dizziness, tingling in the hands and lips, and feeling light-headed, very similar to hypoxia. Treatment: consciously slow your breathing rate and depth, or talk out loud, which naturally slows it.</p>
<h3>Carbon monoxide</h3>
<p>Carbon monoxide is colourless and odourless. In a light aircraft it most often comes from an exhaust leak into the <b>cabin heater</b>. It binds to haemoglobin about 200 times more readily than oxygen, so even small amounts block oxygen transport. Symptoms: headache, drowsiness, nausea, impaired judgement.</p>
<p>Action: heater off, fresh air vents open, land as soon as possible. A carbon monoxide detector in the cockpit is cheap protection.</p>
<div class="box trap"><b>Common trap</b>The proportion of oxygen does not fall with height. The partial pressure of oxygen does.</div>`,
qs:[
{q:"How does the percentage of oxygen in the air change as you climb in a light aircraft?",o:["It stays at about 21%","It falls steadily","It rises","It halves every 5,000 ft"],e:"The proportion stays at about 21%. The total pressure, and so the partial pressure of oxygen, falls."},
{q:"Why is hypoxia particularly dangerous for a pilot?",o:["Its early effects impair judgement, so the pilot may not recognise it","It always causes immediate unconsciousness","It only occurs above 25,000 ft","It is always accompanied by severe pain"],e:"Hypoxia is insidious: it degrades judgement early, and can bring euphoria, so the pilot may feel fine while performing badly."},
{q:"Which faculty is often affected first by mild hypoxia at moderate altitudes?",o:["Night vision","Hearing","Sense of smell","Muscle strength"],e:"Night vision is sensitive to reduced oxygen and can be impaired from as low as about 5,000 ft."},
{q:"What causes the symptoms of hyperventilation?",o:["Too much carbon dioxide being breathed out","Too little oxygen in the air","Carbon monoxide in the cabin","Nitrogen bubbles in the blood"],e:"Over-breathing lowers the carbon dioxide level in the blood, causing dizziness and tingling. The cure is to slow the breathing down."},
{q:"In a single-engine light aircraft, what is the most likely source of carbon monoxide in the cabin?",o:["An exhaust leak into the cabin heating system","The fuel tanks","The battery","Passengers' breath"],e:"Cabin heat is usually taken from a muff around the exhaust. A crack lets exhaust gas, including carbon monoxide, into the cabin."},
{q:"You suspect carbon monoxide poisoning in flight. What should you do?",o:["Turn the heater off, open the fresh air vents and land as soon as possible","Turn the heater up and climb","Breathe faster to clear it","Continue and see if the symptoms go"],e:"Stop the source, ventilate, and land. Carbon monoxide leaves the blood slowly, so symptoms can persist."},
{q:"Why is carbon monoxide so harmful even in small amounts?",o:["It combines with haemoglobin far more readily than oxygen does","It displaces nitrogen in the lungs","It raises blood pressure","It irritates the eyes"],e:"Haemoglobin takes up carbon monoxide about 200 times more readily than oxygen, so it blocks the blood's oxygen-carrying capacity."}
]});

T.push({ id:"vision", ref:"040 · 2", title:"Vision and lookout",
blurb:"How the eye works, night adaptation, scanning for traffic and approach illusions.",
learn:()=>`
<h3>The eye</h3>
<div class="tbl"><table>
<tr><th>Cells</th><th>Where</th><th>Good for</th></tr>
<tr><td>Cones</td><td>Concentrated at the centre (the fovea)</td><td>Colour and fine detail, in good light</td></tr>
<tr><td>Rods</td><td>Around the edge of the retina</td><td>Low light and movement; no colour</td></tr>
</table></div>
<ul>
<li>The <b>blind spot</b> is where the optic nerve leaves the eye. Using both eyes and moving the head covers it.</li>
<li>Full <b>dark adaptation</b> takes about 30 minutes. A bright light destroys it in seconds.</li>
<li>At night, look slightly to one side of an object (<b>off-centre viewing</b>), because the centre of the eye has no rods.</li>
</ul>
<h3>Lookout</h3>
<ul>
<li>In a featureless sky the eye relaxes to focus a metre or two away (<b>empty field myopia</b>). Focus on something distant, such as a cloud or the horizon, then scan.</li>
<li>The eye sees detail only when it stops. Scan in short, regular steps of about 10°, pausing at each.</li>
<li>An aircraft on a collision course stays at a <b>constant relative bearing</b>. It does not appear to move, and grows very slowly until the last few seconds.</li>
</ul>
<h3>Approach illusions</h3>
<div class="tbl"><table>
<tr><th>Runway</th><th>Makes you feel</th><th>Risk</th></tr>
<tr><td>Upsloping</td><td>Too high</td><td>Flying a low approach</td></tr>
<tr><td>Downsloping</td><td>Too low</td><td>Flying a high approach</td></tr>
<tr><td>Narrower than usual</td><td>Too high</td><td>Flying a low approach</td></tr>
<tr><td>Wider than usual</td><td>Too low</td><td>Flying a high approach</td></tr>
</table></div>`,
qs:[
{q:"Which cells in the eye are mainly used for vision at night?",o:["Rods","Cones","The fovea","The optic nerve"],e:"Rods are sensitive to low light and movement but not colour. Cones need good light."},
{q:"About how long does it take for the eyes to fully adapt to darkness?",o:["30 minutes","2 minutes","5 minutes","2 hours"],e:"Full dark adaptation takes around 30 minutes, and bright light can undo it almost at once."},
{q:"Another aircraft is on a collision course with you. How will it appear?",o:["Stationary in your field of view, at a constant relative bearing","Moving rapidly across the windscreen","Getting smaller","Moving up and down"],e:"An aircraft that is going to hit you holds the same relative position. Its lack of movement makes it hard to spot."},
{q:"What is empty field myopia?",o:["The eye relaxing to focus close by when there is nothing to look at","Short-sightedness caused by bright sunlight","Loss of colour vision at altitude","The blind spot in each eye"],e:"With no features to focus on, the eye focuses a metre or two away, so distant aircraft are missed. Focus on something distant before scanning."},
{q:"What is the best technique for scanning for other traffic?",o:["Short, regular movements of about 10°, pausing at each","One continuous sweep from side to side","Staring straight ahead","Looking only where traffic is reported"],e:"The eye only detects detail when it is still, so scan in short steps with a pause at each."},
{q:"Approaching an upsloping runway, what illusion is likely?",o:["Feeling too high, leading to a low approach","Feeling too low, leading to a high approach","Feeling too fast","No illusion"],e:"An upslope makes the runway look longer and steeper, as if you are high. Pilots then tend to descend too low."},
{q:"At night, how should you look at a dim object to see it best?",o:["Slightly to one side of it","Directly at it","With one eye closed","Through a red filter"],e:"The centre of the eye has only cones, which need good light. Looking slightly off-centre puts the image on the rods."}
]});

T.push({ id:"balance", ref:"040 · 3", title:"Balance, disorientation and pressure",
blurb:"The balance organs, the illusions they produce, and what pressure changes do to ears, sinuses and divers.",
learn:()=>`
<h3>The balance organs</h3>
<ul>
<li>The <b>semicircular canals</b> detect <b>angular acceleration</b> (starting or stopping a rotation). A steady rate of turn soon stops being felt.</li>
<li>The <b>otoliths</b> detect <b>linear acceleration</b> and gravity. They cannot tell the difference between tilting and accelerating.</li>
</ul>
<h3>Illusions</h3>
<div class="tbl"><table>
<tr><th>Illusion</th><th>Cause</th><th>Feels like</th></tr>
<tr><td>The leans</td><td>A slow roll into a turn goes undetected; rolling level is felt</td><td>Banked the other way when actually level</td></tr>
<tr><td>Somatogravic</td><td>Forward acceleration, e.g. take-off or go-around at night</td><td>Nose-up pitch, tempting the pilot to push the nose down</td></tr>
<tr><td>Coriolis</td><td>Moving the head during a turn</td><td>Strong tumbling sensation</td></tr>
</table></div>
<p>Without visual references these feelings are unreliable. The answer is to believe the instruments, and to avoid flying into cloud or poor visibility without the training to do so.</p>
<h3>Pressure changes</h3>
<ul>
<li>The <b>Eustachian tube</b> equalises pressure in the middle ear. Air escapes easily on the climb; on the <b>descent</b>, air has to get back in, and a cold or congestion can block it, causing severe ear pain. The <b>Valsalva</b> manoeuvre (pinch the nose, close the mouth, gently blow) helps. Don't fly with a heavy cold.</li>
<li>Sinuses can be blocked the same way.</li>
<li><b>Scuba diving</b>: the body absorbs extra nitrogen under water. Flying soon afterwards lowers the pressure further, and nitrogen can form bubbles in the blood (<b>decompression sickness</b>). Leave a suitable interval after diving; check current guidance with your instructor or AME.</li>
</ul>`,
qs:[
{q:"What do the semicircular canals detect?",o:["Angular acceleration","Linear acceleration","Gravity alone","Sound"],e:"The canals respond to changes in rotation. Linear acceleration and gravity are sensed by the otoliths."},
{q:"After a long, steady turn, a pilot rolls level but feels banked the other way. What is this illusion called?",o:["The leans","Somatogravic illusion","Coriolis illusion","Empty field myopia"],e:"The canals adapted to the steady turn, so rolling level is sensed as a roll in the opposite direction."},
{q:"At night, a pilot accelerating on take-off feels the nose pitching up. What is this, and what is the danger?",o:["A somatogravic illusion; the pilot may push the nose down towards the ground","The leans; the pilot may roll the wrong way","Coriolis illusion; the pilot may spin","Hypoxia; the pilot may lose consciousness"],e:"The otoliths can't tell acceleration from a nose-up tilt. Without visual cues, the pilot may lower the nose into a descent."},
{q:"Which head movement during a turn is most likely to cause a strong tumbling sensation?",o:["A sudden head movement, such as looking down to pick something up","Keeping the head still","Looking straight ahead","Closing one eye"],e:"Moving the head during a turn stimulates more than one canal at once, producing the Coriolis illusion."},
{q:"With a heavy cold, when is ear pain most likely in flight?",o:["During the descent","During the climb","In level cruise","Only on the ground"],e:"On the descent air has to flow back into the middle ear through the Eustachian tube, which congestion blocks."},
{q:"What is the Valsalva manoeuvre used for?",o:["To help equalise pressure in the middle ear","To cure hyperventilation","To recover from the leans","To improve night vision"],e:"Gently blowing against a closed mouth and pinched nose pushes air up the Eustachian tube into the middle ear."},
{q:"Why should you avoid flying soon after scuba diving?",o:["Nitrogen absorbed while diving can form bubbles as pressure falls, causing decompression sickness","Diving raises blood alcohol","Diving damages night vision","Salt water affects the balance organs for a week"],e:"Under pressure the body absorbs extra nitrogen. Reducing pressure by flying can bring it out of solution as bubbles. Leave a suitable interval, as current guidance advises."}
]});

T.push({ id:"health", ref:"040 · 4", title:"Fitness to fly",
blurb:"Alcohol and the law, medication, minor illness and the IMSAFE check.",
learn:()=>`
<h3>Alcohol</h3>
<ul>
<li>In the UK, the Railways and Transport Safety Act 2003 sets the limit for pilots at <b>20 mg of alcohol per 100 ml of blood</b> (9 µg per 100 ml of breath). That is a quarter of the drink-drive limit in England.</li>
<li>The body removes alcohol at roughly <b>one unit an hour</b>. Coffee, food, sleep or exercise do not speed it up.</li>
<li>A common guide is at least 8 hours from "bottle to throttle", and much longer after heavy drinking. The hangover itself impairs performance even when the alcohol has gone.</li>
</ul>
<h3>Medication and illness</h3>
<ul>
<li>Many over-the-counter medicines affect fitness to fly. Antihistamines (hay fever, cold remedies) commonly cause drowsiness.</li>
<li>If in doubt, ask an aviation medical examiner (AME) before flying.</li>
<li>A cold can block the ears and sinuses; an upset stomach causes dehydration and distraction.</li>
<li>Your medical certificate does not cover a temporary illness: you must not fly if you know or suspect you are unfit.</li>
</ul>
<h3>The IMSAFE check</h3>
<div class="sq">
<div class="tile"><div class="big">I</div><div class="d">Illness</div></div>
<div class="tile"><div class="big">M</div><div class="d">Medication</div></div>
<div class="tile"><div class="big">S</div><div class="d">Stress</div></div>
<div class="tile"><div class="big">A</div><div class="d">Alcohol</div></div>
<div class="tile"><div class="big">F</div><div class="d">Fatigue</div></div>
<div class="tile"><div class="big">E</div><div class="d">Eating</div></div>
</div>
<h3>Fatigue and the body clock</h3>
<ul>
<li>The <b>circadian rhythm</b> is a roughly 24-hour cycle. Alertness is lowest in the <b>early hours of the morning</b>, with a smaller dip in the early afternoon.</li>
<li><b>Acute</b> fatigue follows a long or demanding day and is cured by rest. <b>Chronic</b> fatigue builds up over weeks of poor sleep or stress and needs longer recovery.</li>
<li>Caffeine masks tiredness but does not remove it. Only sleep does.</li>
</ul>`,
qs:[
{q:"What is the UK legal alcohol limit in the blood for a pilot?",o:["20 mg per 100 ml","80 mg per 100 ml","50 mg per 100 ml","There is no limit, only a guideline"],e:"The Railways and Transport Safety Act 2003 sets 20 mg per 100 ml of blood for pilots, a quarter of the England drink-drive limit."},
{q:"Which of these speeds up the removal of alcohol from the body?",o:["None of them; only time does","Strong coffee","A big meal","Exercise"],e:"The liver removes alcohol at a roughly fixed rate, about one unit an hour. Nothing you eat or do changes that."},
{q:"Many hay fever and cold remedies contain antihistamines. What is their most likely effect on a pilot?",o:["Drowsiness","Better night vision","Faster reactions","No effect"],e:"Antihistamines commonly cause drowsiness and slowed reactions. Check with an AME before flying on any new medicine."},
{q:"What does the \"S\" in the IMSAFE check stand for?",o:["Stress","Sleep","Symptoms","Speed"],e:"IMSAFE: Illness, Medication, Stress, Alcohol, Fatigue, Eating."},
{q:"When is a person's natural alertness typically at its lowest?",o:["In the early hours of the morning","Mid-morning","Early evening","Just after waking"],e:"The circadian low is in the early hours of the morning, with a smaller dip in the early afternoon."},
{q:"What is the difference between acute and chronic fatigue?",o:["Acute follows a single demanding period and is cured by rest; chronic builds up over a long time","Acute is mild and chronic is severe","Acute is mental and chronic is physical","There is no difference"],e:"Acute fatigue is short-term and recovers with a good sleep. Chronic fatigue accumulates over weeks and needs longer to recover."},
{q:"Your Class 2 medical is valid, but you have a heavy cold today. Which statement is correct?",o:["You must not fly if you know or suspect you are unfit, whatever the certificate says","The valid certificate means you are fit to fly","You can fly if you take a decongestant","Colds are not relevant to flying"],e:"A medical certificate shows you met the standard when examined. You are responsible for not flying while temporarily unfit."}
]});

T.push({ id:"processing", ref:"040 · 5", title:"Information processing and stress",
blurb:"Memory, attention, expectation and how stress and workload affect performance.",
learn:()=>`
<h3>Memory</h3>
<ul>
<li><b>Short-term (working) memory</b> holds about <b>7 ± 2 items</b>, for only a short time unless rehearsed. That is why you write down clearances and use checklists.</li>
<li><b>Long-term memory</b> stores knowledge and experience.</li>
<li><b>Motor programmes</b> are well-practised skills that run without conscious thought, such as flaring for landing. Useful, but a programme can run in the wrong situation: selecting the wrong lever out of habit.</li>
</ul>
<h3>Attention and perception</h3>
<ul>
<li>Attention is limited. Focusing hard on one task (such as a radio problem) can push out others (such as flying the aircraft).</li>
<li><b>Expectation</b> shapes what we perceive. A pilot expecting "cleared to land" may hear it when ATC said something else.</li>
<li><b>Confirmation bias</b>: once we have made up our minds, we look for evidence that agrees and ignore what doesn't. A common route to getting lost.</li>
<li><b>Situational awareness</b> is an accurate picture of what is happening around you, and what is likely to happen next.</li>
</ul>
<h3>Stress and arousal</h3>
${arousal}
<p>Under high stress, attention narrows (<b>tunnel vision</b>), thinking becomes rigid, and people fall back on old habits. Stress outside flying (work, money, relationships) adds to the load you bring into the cockpit.</p>`,
qs:[
{q:"Roughly how many items can short-term memory hold?",o:["7 ± 2","3 ± 1","20 ± 5","Unlimited, for a few seconds"],e:"Working memory holds about seven items, which is why long clearances should be written down."},
{q:"What is a motor programme?",o:["A well-practised skill performed without conscious thought","A checklist","A long-term memory of a route","A computer program in the aircraft"],e:"Motor programmes free up attention, but can run automatically in the wrong context."},
{q:"According to the Yerkes–Dodson relationship, performance is best at:",o:["A moderate level of arousal","Very low arousal","Very high arousal","Any level of arousal"],e:"Too little arousal brings boredom and inattention; too much brings overload. Moderate arousal gives the best performance."},
{q:"A pilot hears \"cleared to land\" when ATC actually said \"continue approach\". What is the most likely cause?",o:["Expectation","Hypoxia","Empty field myopia","Hyperventilation"],e:"Expectation strongly shapes perception. Listening carefully and reading back properly guards against it."},
{q:"Uncertain of position, a pilot convinces himself a town ahead is the one on the plan and ignores a river that doesn't fit. This is an example of:",o:["Confirmation bias","The leans","Motor programme error","Empty field myopia"],e:"Confirmation bias makes us accept evidence that fits our picture and discount what doesn't."},
{q:"What is a typical effect of high stress on a pilot's attention?",o:["It narrows, causing tunnel vision","It widens to take in everything","It is unaffected","It becomes faster and more accurate"],e:"High stress narrows attention to a few items, so important information outside that focus is missed."},
{q:"What is situational awareness?",o:["An accurate picture of what is happening and what is likely to happen next","Knowing the aircraft's registration","The ability to fly without instruments","A memory technique for checklists"],e:"Good situational awareness covers the aircraft, the environment, the weather and the plan, now and in the near future."}
]});

T.push({ id:"decisions", ref:"040 · 6", title:"Decision making and error",
blurb:"How accidents happen, types of error, hazardous attitudes and a structured way to decide.",
learn:()=>`
${swiss}
<h3>Types of error</h3>
<div class="tbl"><table>
<tr><th>Error</th><th>What happens</th><th>Example</th></tr>
<tr><td>Slip</td><td>The right plan, carried out wrongly</td><td>Selecting the flap lever instead of the trim</td></tr>
<tr><td>Lapse</td><td>A memory failure: something forgotten</td><td>Forgetting to switch fuel tanks</td></tr>
<tr><td>Mistake</td><td>The wrong plan, carried out as intended</td><td>Choosing to continue into worsening weather</td></tr>
</table></div>
<p>Checklists catch slips and lapses. Mistakes need better decisions.</p>
<h3>Hazardous attitudes</h3>
<div class="tbl"><table>
<tr><th>Attitude</th><th>Sounds like</th><th>Antidote</th></tr>
<tr><td>Anti-authority</td><td>"Don't tell me what to do."</td><td>"Follow the rules; they are usually right."</td></tr>
<tr><td>Impulsivity</td><td>"Do something, quickly!"</td><td>"Not so fast. Think first."</td></tr>
<tr><td>Invulnerability</td><td>"It won't happen to me."</td><td>"It could happen to me."</td></tr>
<tr><td>Macho</td><td>"I can do it."</td><td>"Taking chances is foolish."</td></tr>
<tr><td>Resignation</td><td>"What's the use?"</td><td>"I'm not helpless. I can make a difference."</td></tr>
</table></div>
<h3>Deciding under pressure: DODAR</h3>
<p><b>D</b>iagnose · <b>O</b>ptions · <b>D</b>ecide · <b>A</b>ssign tasks · <b>R</b>eview. Fly the aircraft first; then work through the problem.</p>
<h3>Plan continuation</h3>
<p>"Get-there-itis" is the pull to continue with a plan despite signs it should change. Set <b>personal minimums</b> on the ground (weather, wind, fuel reserve) so the decision is made before the pressure is on.</p>`,
qs:[
{q:"In the \"Swiss cheese\" model, when does an accident happen?",o:["When weaknesses in several layers of defence line up","When a single pilot error occurs","Only when equipment fails","When the weather is below minimums"],e:"Every defence has holes. An accident happens when the holes line up and a hazard gets through all the layers."},
{q:"A pilot means to select carb heat but pulls the mixture by mistake. What type of error is this?",o:["A slip","A lapse","A mistake","A violation"],e:"The plan was right but the action went wrong: a slip."},
{q:"A pilot forgets to change fuel tanks at the planned time. What type of error is this?",o:["A lapse","A slip","A mistake","A violation"],e:"Lapses are failures of memory. Timed checks and checklists help."},
{q:"What is the antidote to the \"macho\" hazardous attitude?",o:["Taking chances is foolish","It could happen to me","Not so fast, think first","Follow the rules"],e:"Macho thinking ('I can do it') is countered by recognising that taking chances is foolish."},
{q:"In the DODAR decision model, what does the first D stand for?",o:["Diagnose","Decide","Divert","Delegate"],e:"DODAR: Diagnose, Options, Decide, Assign, Review."},
{q:"What is the main purpose of setting personal minimums before a flight?",o:["To make go/no-go decisions in advance, before pressure to continue builds","To meet legal requirements","To impress the instructor","To reduce fuel use"],e:"Deciding limits on the ground protects against plan continuation bias when you are in the air."},
{q:"A pilot continues towards the destination despite deteriorating weather, because friends are waiting. What is this commonly called?",o:["Get-there-itis (plan continuation bias)","The leans","Empty field myopia","Confirmation of minimums"],e:"The pull to complete a plan despite warning signs is one of the commonest factors in weather-related accidents."}
]});

SUBJECTS.push({ id:"hp", code:"040", name:"Human Performance",
  blurb:"Breathing and hypoxia, vision and lookout, balance and disorientation, fitness to fly, memory and stress, and decision making.",
  topics:T });
})();
