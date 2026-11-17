// 080 Principles of Flight
(() => {
const forces = `<figure class="fig wide"><svg viewBox="0 0 420 250" role="img" aria-label="Four forces: lift up, weight down, thrust forward, drag back">
<rect class="fb" x="1" y="1" width="418" height="248" rx="6"/>
${acu(210,125,90,'ac-a',3.2)}
<line x1="210" y1="100" x2="210" y2="30" class="ln" style="stroke-width:3" marker-end="url(#arr)"/><text class="tb" x="222" y="40">LIFT</text>
<line x1="210" y1="150" x2="210" y2="220" class="ln" style="stroke-width:3" marker-end="url(#arr)"/><text class="tb" x="222" y="214">WEIGHT</text>
<line x1="260" y1="125" x2="340" y2="125" class="ln" style="stroke-width:3" marker-end="url(#arr)"/><text class="tb" x="300" y="112" text-anchor="middle">THRUST</text>
<line x1="160" y1="125" x2="80" y2="125" class="ln" style="stroke-width:3" marker-end="url(#arr)"/><text class="tb" x="120" y="112" text-anchor="middle">DRAG</text>
<line x1="380" y1="200" x2="300" y2="200" class="ln pb dash" marker-end="url(#arr)"/><text class="t" x="340" y="190" text-anchor="middle">relative airflow</text>
</svg><figcaption>Straight and level, unaccelerated: lift equals weight and thrust equals drag. Lift acts at right angles to the relative airflow; drag acts parallel to it.</figcaption></figure>`;

const liftCurve = `<figure class="fig wide"><svg viewBox="0 0 420 240" role="img" aria-label="Lift coefficient rises with angle of attack to a peak at the critical angle, then falls">
<rect class="fb" x="1" y="1" width="418" height="238" rx="6"/>
<line x1="50" y1="200" x2="400" y2="200" class="ln"/><line x1="50" y1="200" x2="50" y2="20" class="ln"/>
<text class="tm" x="225" y="228" text-anchor="middle">angle of attack (degrees)</text>
<text class="tm" x="20" y="110" transform="rotate(-90 20 110)" text-anchor="middle">lift coefficient CL</text>
${[0,4,8,12,16,20].map((d,i)=>`<text class="tm" x="${70+i*60}" y="214" text-anchor="middle">${d}</text>`).join('')}
<path d="M70,170 L290,55 Q310,42 322,52 Q340,80 380,110" class="ln pa" style="stroke-width:3"/>
<line x1="310" y1="44" x2="310" y2="200" class="ln dot2"/>
<text class="tb" x="300" y="34" text-anchor="end">critical angle ≈ 16°</text>
<text class="t" x="345" y="135">stall</text>
</svg><figcaption>Lift coefficient grows with angle of attack until the critical angle, about 15–16° for a typical light-aircraft wing. Beyond it the airflow separates and the wing stalls, at any airspeed.</figcaption></figure>`;

// Plotted from the drag equations, not by hand: induced ∝ 1/V², parasite ∝ V².
// Speeds are in units of Vmd, so both are 1 at Vmd and total drag is least there.
const dragCurve = (() => {
  const X = v => 60 + (v - 0.5) / 1.5 * 330, Y = d => 200 - d * 34;
  const line = f => { const pts = []; for (let v = 0.5; v <= 2.0001; v += 0.05) pts.push(X(v).toFixed(1) + "," + Y(Math.min(f(v), 5.2)).toFixed(1)); return "M" + pts.join(" L"); };
  return `<figure class="fig wide"><svg viewBox="0 0 420 240" role="img" aria-label="Induced drag falls with speed, parasite drag rises, total drag is lowest where they are equal">
<rect class="fb" x="1" y="1" width="418" height="238" rx="6"/>
<line x1="50" y1="200" x2="400" y2="200" class="ln"/><line x1="50" y1="200" x2="50" y2="14" class="ln"/>
<text class="tm" x="225" y="226" text-anchor="middle">airspeed</text><text class="tm" x="20" y="110" transform="rotate(-90 20 110)" text-anchor="middle">drag</text>
<path d="${line(v => 1/(v*v))}" class="ln pb dash" style="stroke-width:2"/>
<path d="${line(v => v*v)}" class="ln pa dash" style="stroke-width:2"/>
<path d="${line(v => 1/(v*v) + v*v)}" class="ln" style="stroke-width:3"/>
<line x1="${X(1)}" y1="${Y(2)}" x2="${X(1)}" y2="200" class="ln dot2"/>
<circle cx="${X(1)}" cy="${Y(2)}" r="4" class="f-ink"/>
<text class="tb" x="${X(1)}" y="${Y(2) - 10}" text-anchor="middle">Vmd</text>
<text class="t" x="${X(0.62)}" y="${Y(2.9)}">induced</text>
<text class="t" x="${X(1.62)}" y="${Y(1.9)}">parasite</text>
<text class="t" x="${X(1.5)}" y="${Y(3.6)}" text-anchor="end">total</text>
</svg><figcaption>Induced drag is greatest at low speed; parasite drag grows with the square of speed. Total drag is least at the minimum drag speed (Vmd), where the two are equal.</figcaption></figure>`;
})();

const loadFactor = `<div class="tbl"><table>
<tr><th>Bank angle</th><th>Load factor (1 ÷ cos bank)</th><th>Stall speed × √n</th></tr>
<tr><td>0°</td><td>1.0 g</td><td>× 1.00</td></tr>
<tr><td>30°</td><td>1.15 g</td><td>× 1.07</td></tr>
<tr><td>45°</td><td>1.41 g</td><td>× 1.19</td></tr>
<tr><td>60°</td><td>2.0 g</td><td>× 1.41</td></tr>
</table></div>`;

const T = [];
T.push({ id:"lift", ref:"080 · 1", title:"Lift and the four forces",
blurb:"What makes lift, the lift formula, and the angles you need to tell apart.",
learn:()=>`
${forces}
<h3>The lift formula</h3>
<p><span class="mono">Lift = CL × ½ρV² × S</span>, where CL is the lift coefficient (set mainly by angle of attack), ρ is air density, V is true airspeed and S is wing area. The <b>½ρV²</b> part is dynamic pressure, which is what the airspeed indicator measures as IAS.</p>
<ul>
<li>Double the speed and lift goes up four times, because V is squared.</li>
<li>For the same IAS the dynamic pressure is the same at any altitude, so the aircraft stalls at about the same <b>indicated</b> airspeed high or low.</li>
</ul>
<h3>Angles that get confused</h3>
<div class="tbl"><table>
<tr><th>Angle</th><th>Between</th></tr>
<tr><td>Angle of attack</td><td>The chord line and the relative airflow. You change it with the elevator.</td></tr>
<tr><td>Angle of incidence</td><td>The chord line and the aircraft's longitudinal axis. Fixed when the aircraft is built.</td></tr>
<tr><td>Pitch attitude</td><td>The longitudinal axis and the horizon. Not the same as angle of attack.</td></tr>
</table></div>
<h3>How a wing makes lift</h3>
<p>The cambered wing at a positive angle of attack speeds up the air over its upper surface. Faster air has lower static pressure (Bernoulli), so pressure above the wing is lower than below. The wing also turns the airflow downwards (downwash), and the reaction pushes the wing up. The total aerodynamic force acts through the <b>centre of pressure</b>, which moves forward as angle of attack increases, up to the stall.</p>
<div class="box trap"><b>Common trap</b>Angle of attack is measured to the relative airflow, not to the horizon. An aircraft in a steep descent can have a nose-down attitude and still be at a high angle of attack.</div>`,
qs:[
{q:"What is the angle of attack?",o:["The angle between the chord line and the relative airflow","The angle between the chord line and the longitudinal axis","The angle between the longitudinal axis and the horizon","The angle between the wing and the fuselage when viewed from the front"],e:"Angle of attack is between the chord line and the relative airflow. Chord to longitudinal axis is the angle of incidence; axis to horizon is pitch attitude; the front-view angle is dihedral."},
{q:"If true airspeed doubles and everything else stays the same, lift becomes:",o:["Four times as great","Twice as great","Half as great","Unchanged"],e:"Lift is proportional to V², so doubling the speed multiplies lift by four."},
{q:"In which direction does lift act?",o:["At right angles to the relative airflow","Vertically upwards, whatever the attitude","Along the chord line","At right angles to the longitudinal axis"],e:"Lift is defined as the component of the aerodynamic force at right angles to the relative airflow. Drag is the component parallel to it."},
{q:"In steady, straight and level flight, which statement is correct?",o:["Lift equals weight and thrust equals drag","Lift is greater than weight","Thrust is greater than drag","Lift equals thrust"],e:"Unaccelerated straight and level flight means the forces balance: lift = weight and thrust = drag."},
{q:"Why does an aircraft stall at about the same indicated airspeed at 1,000 ft and at 8,000 ft?",o:["IAS measures dynamic pressure, which is what produces lift","The air is the same density at both levels","True airspeed does not change with altitude","The stall warner adjusts for altitude"],e:"IAS is a measure of dynamic pressure (½ρV²). The same IAS gives the same dynamic pressure, so the same lift at the same angle of attack, whatever the density."},
{q:"What is the angle of incidence?",o:["The fixed angle between the wing chord line and the aircraft's longitudinal axis","The angle between the chord line and the relative airflow","The angle the nose makes with the horizon","The angle between the wing and the horizontal seen from the front"],e:"Incidence is set when the aircraft is built: chord line to longitudinal axis. It does not change in flight."},
{q:"As the angle of attack increases towards the stall, the centre of pressure normally:",o:["Moves forward","Moves aft","Stays fixed at the centre of gravity","Moves to the wing tip"],e:"On a conventional cambered wing the centre of pressure moves forward as angle of attack increases, then moves rapidly aft at the stall."}
]});

T.push({ id:"drag", ref:"080 · 2", title:"Drag and wake turbulence",
blurb:"Parasite and induced drag, minimum drag speed, ground effect and wingtip vortices.",
learn:()=>`
<h3>Two kinds of drag</h3>
<div class="tbl"><table>
<tr><th>Type</th><th>Made up of</th><th>Changes with speed</th></tr>
<tr><td>Parasite</td><td>Form (pressure) drag, skin friction, interference drag where parts meet</td><td>Increases with the square of speed</td></tr>
<tr><td>Induced</td><td>A by-product of making lift: wingtip vortices and downwash tilt the lift backwards</td><td>Decreases as speed increases (greatest at low speed and high angle of attack)</td></tr>
</table></div>
${dragCurve}
<h3>Reducing induced drag</h3>
<ul>
<li><b>High aspect ratio</b> (long, slender wings) weakens the tip vortices.</li>
<li><b>Ground effect</b>: within about one wingspan of the ground, the ground limits the downwash and tip vortices, so induced drag falls. The aircraft floats on landing, and can lift off before it is able to climb out of ground effect.</li>
</ul>
<h3>Wake turbulence</h3>
<p>Wingtip vortices trail behind every aircraft. They are strongest from aircraft that are <b>heavy, clean and slow</b> (high angle of attack). They sink below the generating aircraft's path and drift with the wind. Keep above a larger aircraft's flight path and allow time for vortices to drift or decay.</p>
<div class="box trap"><b>Common trap</b>Flying slower does not always mean less drag. Below Vmd, total drag rises again as induced drag takes over.</div>`,
qs:[
{q:"How does induced drag change as airspeed increases in level flight?",o:["It decreases","It increases with the square of speed","It stays constant","It increases in direct proportion to speed"],e:"Induced drag is greatest at low speed and high angle of attack. As speed rises the angle of attack needed falls, and induced drag decreases."},
{q:"How does parasite drag change if airspeed doubles?",o:["It increases about four times","It doubles","It halves","It stays the same"],e:"Parasite drag is proportional to the square of speed, so doubling speed roughly quadruples it."},
{q:"At the minimum drag speed (Vmd):",o:["Induced drag equals parasite drag","Induced drag is zero","Parasite drag is zero","Lift is at its maximum"],e:"Total drag is lowest where the falling induced drag curve and the rising parasite drag curve cross, so they are equal at Vmd."},
{q:"An aircraft floats along the runway further than expected just before touchdown. The main reason is:",o:["Ground effect reducing induced drag","Increased parasite drag near the ground","Higher air density at ground level","The flaps losing effectiveness"],e:"Within about a wingspan of the ground, downwash and tip vortices are reduced, so induced drag falls and the aircraft floats."},
{q:"Which wing reduces induced drag the most, other things being equal?",o:["A long, narrow wing (high aspect ratio)","A short, wide wing (low aspect ratio)","A wing with more camber","A wing with a thicker leading edge"],e:"High aspect ratio wings have weaker tip vortices relative to their lift, so less induced drag."},
{q:"Wake turbulence is greatest behind an aircraft that is:",o:["Heavy, clean and slow","Light, with flap down and fast","Light, clean and fast","Heavy and fast with flap down"],e:"Vortex strength depends on the lift being produced and the angle of attack: heavy, clean (no flap) and slow gives the strongest vortices."},
{q:"After they leave the wing tips, wake vortices tend to:",o:["Sink below the generating aircraft's flight path and drift with the wind","Rise above the flight path","Stay at the same height and remain stationary","Dissipate immediately in calm air"],e:"Vortices descend below the flight path and move with the wind. In calm conditions they can persist over the runway, which is when they are most dangerous."}
]});

T.push({ id:"stall", ref:"080 · 3", title:"Stalling, load factor and spins",
blurb:"Why a wing stalls, what changes the stall speed, and what a turn does to it.",
learn:()=>`
${liftCurve}
<h3>What changes the stall speed</h3>
<p>The wing always stalls at the same <b>angle of attack</b>. The <b>speed</b> at which you reach it changes:</p>
<ul>
<li><b>Weight</b>: heavier means higher stall speed (in proportion to the square root of weight).</li>
<li><b>Load factor</b>: a turn or a pull-up raises the stall speed.</li>
<li><b>Flap</b>: lowers the stall speed by increasing the maximum lift coefficient.</li>
<li><b>Power</b>: with power on, slipstream and the thrust line lower the indicated stall speed a little.</li>
<li>Ice, frost or damage on the wing raise the stall speed and can remove the warning.</li>
</ul>
<h3>Turns and load factor</h3>
<p>In a level turn the wing has to carry more than the aircraft's weight. Load factor <span class="mono">n = 1 ÷ cos(bank)</span>, and stall speed rises by <span class="mono">√n</span>.</p>
${loadFactor}
<p>Example: stalls at 50 kt straight and level, so in a 60° level turn it stalls at about 50 × 1.41 = <b>71 kt</b>.</p>
<h3>Stall warnings and wing design</h3>
<p>Signs of the approaching stall: the stall warner, buffet, controls becoming sloppy, high nose attitude and decreasing airspeed. Wings are designed to stall at the <b>root first</b>, so the ailerons near the tips keep working: <b>washout</b> (less incidence at the tip) and stall strips do this.</p>
<h3>Spins</h3>
<p>A spin needs two things: the wing <b>stalled</b> and <b>yaw</b>. One wing is more deeply stalled than the other and the aircraft autorotates. Recovery follows the POH for your type; in general it begins with power off, ailerons neutral and full opposite rudder, then moving the control column forward until the rotation stops.</p>
<div class="box trap"><b>Common trap</b>A stall is about angle of attack, not speed. A wing can stall at high speed in a steep turn or a sharp pull-up.</div>`,
qs:[
{q:"A wing stalls when:",o:["It exceeds the critical angle of attack","Airspeed falls below a fixed value","The nose is raised above the horizon","Engine power is reduced"],e:"The stall happens at the critical angle of attack, whatever the speed or attitude."},
{q:"What is the load factor in a level turn at 60° of bank?",o:["2 g","1.41 g","1.15 g","3 g"],e:"Load factor = 1 ÷ cos 60° = 1 ÷ 0.5 = 2."},
{q:"An aircraft stalls at 48 kt in straight and level flight. Roughly what is its stall speed in a level 60° banked turn?",o:["68 kt","52 kt","96 kt","60 kt"],e:"Stall speed rises by √n. At 60° bank n = 2 and √2 ≈ 1.41, so 48 × 1.41 ≈ 68 kt."},
{q:"What effect does increased weight have on stall speed?",o:["It increases it","It decreases it","It has no effect","It only affects the stall speed with flap down"],e:"More weight needs more lift. At the critical angle of attack that needs more speed, so stall speed rises."},
{q:"What is the main purpose of washout on a wing?",o:["To make the wing root stall before the tip, so the ailerons stay effective","To reduce parasite drag at cruise speed","To increase the stall speed","To reduce the effect of the propeller slipstream"],e:"Washout reduces the angle of incidence towards the tip, so the root reaches the critical angle first and the tips (with the ailerons) keep flying."},
{q:"Which two conditions must exist for a spin to develop?",o:["The wing must be stalled, and there must be yaw","High airspeed and full power","Flap down and a nose-down attitude","A steep turn and full aileron"],e:"A spin is an autorotation that needs the wing stalled and the aircraft yawing. Remove either and it cannot develop."},
{q:"How does lowering flap affect the stall speed?",o:["It reduces it","It increases it","It has no effect","It only changes the stall speed in a turn"],e:"Flap increases the maximum lift coefficient, so the wing produces the required lift at a lower speed and the stall speed falls."}
]});

T.push({ id:"stability", ref:"080 · 4", title:"Axes, controls and stability",
blurb:"The three axes, which control works about which, and what makes an aircraft stable.",
learn:()=>`
<h3>Axes and controls</h3>
<div class="tbl"><table>
<tr><th>Axis</th><th>Movement</th><th>Control</th><th>Stability</th></tr>
<tr><td>Longitudinal (nose to tail)</td><td>Roll</td><td>Ailerons</td><td>Lateral stability: dihedral, high wing</td></tr>
<tr><td>Lateral (wing tip to wing tip)</td><td>Pitch</td><td>Elevator</td><td>Longitudinal stability: tailplane, CG position</td></tr>
<tr><td>Normal (vertical)</td><td>Yaw</td><td>Rudder</td><td>Directional stability: fin and keel area</td></tr>
</table></div>
<p>All three axes pass through the centre of gravity.</p>
<h3>Stability</h3>
<p>A <b>stable</b> aircraft tends to return to its original condition after a disturbance, without the pilot doing anything.</p>
<ul>
<li><b>Longitudinal</b> stability comes from the tailplane acting like the feathers on a dart. The further forward the CG, the more stable the aircraft, and the heavier the elevator feels.</li>
<li>With the CG <b>aft</b>, the aircraft is less stable and the elevator feels light. Beyond the aft limit it can become unstable in pitch and hard to recover from a stall or spin.</li>
<li><b>Lateral</b> stability comes mainly from dihedral and a high wing: in a sideslip the lower wing meets the air at a greater angle and rolls the aircraft back towards level.</li>
<li><b>Directional</b> stability comes from the fin: a yaw puts the fin at an angle to the airflow and it pushes the tail back into line.</li>
</ul>
<div class="box trap"><b>Common trap</b>The lateral axis is the one through the wing tips, but it is the axis of <b>pitch</b>. Longitudinal stability (stability in pitch) is about the lateral axis.</div>`,
qs:[
{q:"The elevator controls movement about which axis?",o:["The lateral axis","The longitudinal axis","The normal axis","The vertical axis through the fin"],e:"The elevator pitches the aircraft about the lateral axis, which runs from wing tip to wing tip."},
{q:"The ailerons control movement about which axis?",o:["The longitudinal axis","The lateral axis","The normal axis","The propeller axis"],e:"Ailerons roll the aircraft about the longitudinal axis, which runs from nose to tail."},
{q:"Which feature mainly gives an aircraft directional stability?",o:["The fin","Dihedral","The tailplane","Washout"],e:"The fin (and side area behind the CG) returns the aircraft to straight after a yaw. Dihedral gives lateral stability; the tailplane gives longitudinal stability."},
{q:"What does dihedral provide?",o:["Lateral stability","Directional stability","Longitudinal stability","Reduced induced drag"],e:"In a sideslip the lower wing of a dihedral wing meets the air at a greater angle of attack, making more lift and rolling the aircraft back towards level."},
{q:"With the centre of gravity near the aft limit, an aircraft will be:",o:["Less stable in pitch, with lighter elevator forces","More stable in pitch, with heavier elevator forces","Unaffected in pitch","More stable laterally"],e:"An aft CG shortens the tailplane's moment arm, reducing longitudinal stability and making the elevator feel light."},
{q:"A forward centre of gravity tends to make an aircraft:",o:["More stable in pitch, with heavier elevator forces","Less stable in pitch","Easier to rotate at a lower speed","More prone to spinning"],e:"A forward CG increases longitudinal stability; the pilot needs more elevator force to change pitch."},
{q:"An aircraft is said to be stable if, after a disturbance, it:",o:["Tends to return to its original condition without pilot input","Stays exactly where the disturbance left it","Moves further away from its original condition","Needs constant pilot input to stay level"],e:"Positive stability is a tendency to return. Staying put is neutral stability; diverging is instability."}
]});

T.push({ id:"controls", ref:"080 · 5", title:"Control effects, trim and flaps",
blurb:"Adverse yaw and how designers reduce it, further effects, trim tabs, balancing and flaps.",
learn:()=>`
<h3>Adverse aileron yaw</h3>
<p>When you roll, the down-going aileron raises the lift on that wing, and with it the induced drag. The aircraft yaws <b>away</b> from the direction of the turn. Designers reduce this with:</p>
<ul>
<li><b>Differential ailerons</b>: the up-going aileron moves through a larger angle than the down-going one.</li>
<li><b>Frise ailerons</b>: the nose of the up-going aileron projects below the wing and adds drag on that side.</li>
<li>The pilot uses <b>rudder</b> in the direction of the turn to keep the balance ball centred.</li>
</ul>
<h3>Further effects</h3>
<ul>
<li><b>Further effect of rudder: roll.</b> Yaw speeds up the outer wing, which makes more lift, so the aircraft rolls the same way.</li>
<li><b>Further effect of aileron: yaw.</b> Bank leads to a sideslip, and the fin yaws the nose into the turn.</li>
</ul>
<h3>Trim and balance</h3>
<ul>
<li>A <b>trim tab</b> moves the opposite way to the control surface. To hold the elevator up (nose-up trim), the tab moves down.</li>
<li><b>Aerodynamic balance</b> (horn balance, inset hinge) reduces the force needed to move a control.</li>
<li><b>Mass balance</b> (weight ahead of the hinge line) prevents control surface <b>flutter</b>.</li>
</ul>
<h3>Flaps</h3>
<p>Flaps increase camber, which increases both lift and drag. They lower the stall speed, so the aircraft can approach slower, and allow a steeper approach at the same speed. Small settings add more lift than drag (sometimes used for take-off); large settings add mostly drag (for landing).</p>
<div class="box trap"><b>Common trap</b>Adverse yaw is caused by the <b>down-going</b> aileron, the one on the rising wing, not the up-going one.</div>`,
qs:[
{q:"What causes adverse aileron yaw?",o:["Extra induced drag from the down-going aileron","Extra parasite drag from the up-going aileron","The propeller slipstream","The fin stalling in the turn"],e:"The down-going aileron increases lift on the rising wing, and with it induced drag, which yaws the nose away from the turn."},
{q:"How do differential ailerons reduce adverse yaw?",o:["The up-going aileron moves through a larger angle than the down-going one","Both ailerons move down together","The down-going aileron moves further than the up-going one","They link the ailerons to the rudder"],e:"Moving the up-going aileron further increases drag on the descending wing, balancing the extra induced drag on the rising wing."},
{q:"What is the further effect of the rudder?",o:["Roll","Pitch","Yaw","A change in airspeed only"],e:"Yaw speeds up the outer wing, which makes more lift, so the aircraft rolls in the direction of the yaw."},
{q:"To trim the aircraft nose up, which way does the elevator trim tab move?",o:["Down","Up","It does not move; the elevator moves instead","To the side"],e:"The tab moves the opposite way to the surface it trims. A downward tab pushes the elevator trailing edge up, holding the nose up."},
{q:"What is the purpose of mass balancing a control surface?",o:["To prevent flutter","To reduce the stick force needed","To trim the aircraft","To increase control authority at low speed"],e:"Mass balance moves the surface's centre of gravity towards or ahead of the hinge line, preventing flutter. Aerodynamic balance reduces stick forces."},
{q:"What is the main effect of lowering a large flap setting on the approach?",o:["Lower stall speed and more drag, allowing a slower, steeper approach","Higher stall speed and less drag","Less lift and less drag","No change to the stall speed"],e:"Flap increases the maximum lift coefficient, lowering the stall speed, and large settings add a lot of drag, allowing a steeper approach without gaining speed."},
{q:"What is the further effect of the ailerons?",o:["Yaw","Pitch","Roll","Increase in airspeed"],e:"The bank causes a sideslip into the turn, and the fin then yaws the nose in the direction of the bank."}
]});

T.push({ id:"turn", ref:"080 · 6", title:"Turning, climbing and gliding",
blurb:"What turns an aircraft, the forces in a climb and glide, and what changes glide range.",
learn:()=>`
<h3>Turning</h3>
<p>To turn, the aircraft is banked so that the lift tilts. The <b>horizontal component of lift</b> provides the force towards the centre of the turn. To stop it descending, total lift must increase so that its vertical component still equals the weight. That is why you add back pressure, and often power, in a level turn.</p>
<ul>
<li>At the same airspeed, more bank gives a <b>higher rate</b> and a <b>smaller radius</b> of turn, and a higher load factor.</li>
<li>At the same bank, a higher speed gives a larger radius and a lower rate of turn.</li>
</ul>
<h3>Climbing</h3>
<p>In a steady climb part of the weight acts backwards along the flight path, so thrust must exceed drag. Lift is slightly <b>less</b> than weight, because lift only has to balance the part of the weight at right angles to the flight path.</p>
<ul>
<li><b>Vx</b>, best angle of climb: most height for distance travelled (obstacle clearance).</li>
<li><b>Vy</b>, best rate of climb: most height for time.</li>
</ul>
<h3>Gliding</h3>
<p>With no thrust, a component of weight along the flight path pulls the aircraft forward. The best glide distance comes from flying at the speed for the best <b>lift/drag ratio</b>.</p>
<ul>
<li>In still air, <b>weight does not change the best glide range</b>, only the speed you need to fly to get it (heavier means faster).</li>
<li>A <b>headwind</b> reduces the distance over the ground; a tailwind increases it.</li>
<li>Flap, an open door or a windmilling propeller adds drag and steepens the glide.</li>
</ul>
<div class="box trap"><b>Common trap</b>Flying slower than the best glide speed does not stretch the glide. It increases the rate of descent per mile and brings you closer to the stall.</div>`,
qs:[
{q:"What provides the force that turns an aircraft in a banked turn?",o:["The horizontal component of lift","The rudder","The vertical component of lift","The thrust of the propeller"],e:"Banking tilts the lift; its horizontal component provides the centripetal force. The rudder is used only to balance the turn."},
{q:"At a constant airspeed, increasing the angle of bank in a level turn will:",o:["Increase the rate of turn and decrease the radius","Decrease the rate of turn","Increase the radius of turn","Have no effect on the load factor"],e:"More bank gives a bigger horizontal lift component, so a tighter, quicker turn, and a higher load factor."},
{q:"In a steady climb, how does lift compare with weight?",o:["Lift is slightly less than weight","Lift is greater than weight","Lift is equal to weight","Lift is zero"],e:"In a steady climb, lift only has to balance the part of the weight at right angles to the flight path, so it is slightly less than the weight. Thrust makes up the difference."},
{q:"Which speed gives the most height gain in the shortest horizontal distance?",o:["Vx, best angle of climb","Vy, best rate of climb","Vmd","Cruise speed"],e:"Vx gives the steepest climb gradient and is used to clear obstacles. Vy gives the most height per minute."},
{q:"How does an increase in weight affect the maximum glide range in still air?",o:["It has no effect on range, but the best glide speed is higher","It increases the range","It decreases the range","It has no effect on range or speed"],e:"The best lift/drag ratio, and so the glide angle, does not depend on weight. A heavier aircraft must fly faster to achieve it, and covers the same distance in less time."},
{q:"To achieve maximum glide range, you should fly at the speed for:",o:["The best lift/drag ratio","The minimum sink rate","The stall speed plus 5 kt","The normal cruise speed"],e:"Best range comes from the best lift/drag ratio, the speed recommended in the POH as best glide."},
{q:"Gliding into a headwind compared with still air, the distance covered over the ground will be:",o:["Shorter","Longer","The same","Longer only with flap down"],e:"The headwind reduces groundspeed while the rate of descent stays the same, so less ground is covered before reaching the surface."}
]});

SUBJECTS.push({ id:"pof", code:"080", name:"Principles of Flight",
  blurb:"How a wing makes lift, drag, the stall and turning, stability, the controls, and the forces in a climb and glide.",
  topics:T });
})();
