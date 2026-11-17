// 080 Principles of Flight: extra questions and hands-on diagrams
extendTopic("pof", "lift", { try:[["liftspeed", "Lift and airspeed"]], qs:[
{type:"calc", gen:() => { const v1 = rnd(60, 80, 5), v2 = v1 + rnd(15, 45, 5), r = Math.pow(v2/v1, 2);
  return { q:`At a constant angle of attack, airspeed increases from ${v1} kt to ${v2} kt. By what factor does lift increase? (two decimal places)`, a:Math.round(r*100)/100, tol:0.05, unit:"×",
    steps:[`Lift is proportional to V².`, `Factor = (${v2} ÷ ${v1})² = ${(v2/v1).toFixed(3)}² = ${r.toFixed(2)}`] }; },
  e:"Because lift goes with the square of speed, a modest speed increase makes a large difference to lift."},
{q:"According to Bernoulli's principle, as air speeds up through a venturi its static pressure:",o:["Decreases","Increases","Stays the same","First increases, then decreases"],e:"Total pressure stays constant, so when dynamic pressure rises (faster air), static pressure falls. That's the basis of lift over the upper wing surface and of the carburettor venturi."},
{q:"At a constant airspeed, how can a pilot increase the lift from the wing?",o:["Increase the angle of attack, up to the critical angle","Reduce the angle of attack","Reduce power","Move the CG aft"],e:"With speed fixed, lift is controlled by the lift coefficient, which rises with angle of attack until the stall."},
{q:"Two wings have the same shape, angle of attack and airspeed, but one has twice the area. How does its lift compare?",o:["Twice as much","The same","Four times as much","Half as much"],e:"Lift is directly proportional to wing area S in the lift formula."},
{type:"match", q:"Match each term in the lift formula, L = CL × ½ρV² × S, to its meaning.", pairs:[["CL","Lift coefficient (set mainly by angle of attack)"],["ρ (rho)","Air density"],["V","True airspeed"],["S","Wing area"]],
  e:"½ρV² together is dynamic pressure, which the airspeed indicator measures as IAS."}
]});

extendTopic("pof", "drag", { try:[["dragspeed", "Drag at different speeds"]], qs:[
{type:"calc", gen:() => { const v1 = rnd(60, 80, 5), k = [1.5, 2][rnd(0, 1)], v2 = v1 * k, r = Math.pow(v1/v2, 2);
  return { q:`In level flight, speed increases from ${v1} kt to ${v2} kt. By what factor does induced drag change? (two decimal places)`, a:Math.round(r*100)/100, tol:0.03, unit:"×",
    steps:[`Induced drag is proportional to 1 ÷ V².`, `Factor = (${v1} ÷ ${v2})² = ${(v1/v2).toFixed(3)}² = ${r.toFixed(2)}`] }; },
  e:"Induced drag falls as speed rises, the opposite of parasite drag."},
{q:"Where does interference drag occur?",o:["Where airflows meet at junctions, such as wing to fuselage","Only at the wing tips","Only on the propeller","Inside the engine cowling"],e:"Interference drag comes from airflows around different parts mixing at junctions. Fairings reduce it."},
{q:"Which reduces skin friction drag?",o:["A smooth, clean surface","Lowering the flaps","Flying at a higher angle of attack","Adding dihedral"],e:"Skin friction depends on the surface: dirt, insects, rough paint and ice all increase it."},
{q:"An aircraft in level flight slows below its minimum drag speed. To maintain height, the pilot will need:",o:["More power","Less power","The same power","No power change, only more flap"],e:"Below Vmd total drag rises as speed falls (the 'back of the drag curve'), so more thrust is needed to fly slower."},
{type:"match", q:"Match each kind of drag to its cause.", pairs:[["Form drag","The shape of the body disturbing the airflow"],["Skin friction","Air dragging along the surface"],["Interference drag","Airflows meeting at junctions"],["Induced drag","A by-product of making lift"]],
  e:"Form, skin friction and interference drag together make up parasite drag, which rises with speed. Induced drag falls with speed."}
]});

extendTopic("pof", "stall", { try:[["loadfactor", "Bank angle, load factor and stall speed"]], qs:[
{type:"calc", gen:() => { const b = [30, 45, 60, 70][rnd(0, 3)], n = 1 / Math.cos(b * Math.PI / 180);
  return { q:`What is the load factor in a level turn at ${b}° of bank? (two decimal places)`, a:Math.round(n*100)/100, tol:0.05, unit:" g",
    steps:[`n = 1 ÷ cos(bank)`, `cos ${b}° = ${Math.cos(b*Math.PI/180).toFixed(3)}`, `n = 1 ÷ ${Math.cos(b*Math.PI/180).toFixed(3)} = ${n.toFixed(2)} g`] }; },
  e:"Load factor climbs steeply beyond 45°: 2 g at 60° and nearly 3 g at 70°."},
{type:"calc", gen:() => { const vs = rnd(44, 56), b = [30, 45, 60][rnd(0, 2)], n = 1 / Math.cos(b * Math.PI / 180), v = vs * Math.sqrt(n);
  return { q:`An aircraft stalls at ${vs} kt wings level. Roughly what is its stall speed in a level ${b}° banked turn? (nearest knot)`, a:Math.round(v), tol:1, unit:" kt",
    steps:[`n = 1 ÷ cos ${b}° = ${n.toFixed(2)}`, `√n = ${Math.sqrt(n).toFixed(3)}`, `${vs} × ${Math.sqrt(n).toFixed(3)} = ${v.toFixed(1)} kt`] }; },
  e:"Stall speed rises with the square root of the load factor."},
{q:"How does frost or ice on the wing affect the stall?",o:["It raises the stall speed and can remove the normal warning","It lowers the stall speed","It has no effect if the layer is thin","It only affects the stall with flap down"],e:"Even a thin, rough layer disturbs the airflow, reducing the maximum lift coefficient. The wing can stall at a lower angle of attack and higher speed, with little warning."},
{q:"Which of these is a typical sign of an approaching stall?",o:["Airframe buffet","An increase in control effectiveness","A rise in airspeed","A nose-down attitude"],e:"Buffet from turbulent airflow breaking away over the wing, the stall warner and sloppy controls are the usual signs."},
{q:"At the stall, one wing drops. Why is it risky to use aileron to try to pick it up?",o:["The down-going aileron increases the angle of attack on that wing, which can deepen the stall and start a spin","Ailerons do not work at low speed","It increases the stall speed of the other wing only","It causes the nose to pitch down sharply"],e:"Lowering the aileron on the dropping wing increases its angle of attack. If it is already stalled, that can make it worse and lead to autorotation. Prevent further yaw and unstall the wing first."}
]});

extendTopic("pof", "stability", { qs:[
{type:"match", q:"Match each axis to the movement about it and the control that produces it.", pairs:[["Longitudinal axis","Roll, using the ailerons"],["Lateral axis","Pitch, using the elevator"],["Normal axis","Yaw, using the rudder"],["Centre of gravity","The point all three axes pass through"]],
  e:"The longitudinal axis runs nose to tail, the lateral axis wing tip to wing tip, and the normal axis vertically through the CG."},
{q:"An aircraft has neutral stability. After a disturbance it will:",o:["Stay in its new condition, neither returning nor diverging","Return to its original condition","Diverge further from its original condition","Oscillate with increasing amplitude"],e:"Neutral stability means no tendency either way: it stays where the disturbance left it."},
{q:"What is the danger of loading an aircraft with the CG behind the aft limit?",o:["It may be unstable in pitch and difficult or impossible to recover from a stall or spin","The stall speed becomes much higher","The elevator becomes too heavy to move","The aircraft becomes too stable to rotate"],e:"Behind the aft limit the tailplane may not have enough moment to restore pitch, and stall or spin recovery may not be possible."},
{q:"With a forward CG, compared with an aft CG, how will the flare for landing feel?",o:["More elevator force is needed","Less elevator force is needed","No difference","The flare is impossible"],e:"A forward CG increases stability, so the elevator has to work harder to raise the nose. Near the forward limit you may run out of elevator in the flare."},
{q:"Which feature makes a high-wing aircraft such as the Cessna 150 laterally stable, even with little dihedral?",o:["The high-wing position, which produces a rolling moment back towards level in a sideslip","The large fin","The tailplane","Washout at the wing tips"],e:"In a sideslip, the airflow around the fuselage raises the angle of attack of the leading wing on a high-wing aircraft, rolling it back towards level. Many textbooks describe this as the high-wing or keel effect."}
]});

extendTopic("pof", "controls", { qs:[
{type:"match", q:"Match each device to its purpose.", pairs:[["Trim tab","Relieve the pilot of a steady control force"],["Mass balance","Prevent control surface flutter"],["Horn balance","Reduce the force needed to move a control"],["Differential ailerons","Reduce adverse yaw"]],
  e:"Trim tabs and aerodynamic balances deal with stick forces; mass balance deals with flutter; differential and Frise ailerons deal with adverse yaw."},
{q:"How do Frise ailerons reduce adverse yaw?",o:["The nose of the up-going aileron projects below the wing and adds drag on that side","Both ailerons go down together","The down-going aileron moves further","They automatically move the rudder"],e:"The extra drag on the descending wing's side balances the induced drag from the down-going aileron on the rising wing."},
{q:"In level flight with the wings held level by the pilot, rudder is applied to the left and the ailerons are then released. What happens next?",o:["The aircraft rolls to the left","The aircraft rolls to the right","Nothing; rudder only causes yaw","The nose pitches up"],e:"Further effect of rudder: the yaw speeds up the right wing, which makes more lift, so the aircraft rolls left."},
{q:"What does a Fowler flap do?",o:["It moves back as well as down, increasing both camber and wing area","It only increases camber","It only increases drag, with no extra lift","It reduces the stall speed by raising the leading edge"],e:"Fowler flaps slide aft on tracks, adding wing area as well as camber, for a large increase in lift."}
]});

extendTopic("pof", "turn", { qs:[
{q:"In a balanced level turn, the pilot increases the bank without changing the back pressure or power. What happens?",o:["The aircraft starts to descend","The aircraft climbs","Nothing changes","The airspeed falls but height is held"],e:"More bank tilts the lift further, so its vertical component no longer balances the weight. Without more back pressure (and usually power) the aircraft descends."},
{q:"At the same angle of bank, how does a higher airspeed affect a level turn?",o:["Larger radius and lower rate of turn","Smaller radius and higher rate of turn","No effect on radius or rate","Higher load factor"],e:"Load factor depends only on bank. At a higher speed the same turning force gives a wider, slower turn."},
{q:"In a glide, what is the effect of lowering full flap?",o:["A steeper glide angle","A flatter glide angle","No change to the glide angle","A longer glide range"],e:"Flap adds drag, lowering the lift/drag ratio, so the aircraft descends more steeply over a shorter distance."},
{type:"calc", gen:() => { const ld = rnd(8, 10), h = rnd(2000, 4000, 500), nm = h * ld / 6076;
  return { q:`An aircraft with a best lift/drag ratio of ${ld}:1 glides from ${h.toLocaleString("en-GB")} ft above the ground in still air. Roughly how far can it glide, in nautical miles? (one decimal place)`, a:Math.round(nm*10)/10, tol:0.3, unit:" nm",
    steps:[`Glide distance = height × L/D = ${h} × ${ld} = ${(h*ld).toLocaleString("en-GB")} ft`, `÷ 6,076 ft per nm = ${nm.toFixed(1)} nm`] }; },
  e:"The glide ratio equals the lift/drag ratio, in still air. A headwind shortens the distance over the ground; a tailwind lengthens it."}
]});
