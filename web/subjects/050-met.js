// 050 Meteorology
(() => {
const fronts = `<figure class="fig wide"><svg viewBox="0 0 480 240" role="img" aria-label="Cross-section of a frontal system moving east: cold front behind, warm sector, warm front ahead with its clouds">
<rect class="fb" x="1" y="1" width="478" height="238" rx="6"/>
<rect class="f-ground" x="10" y="196" width="460" height="10"/>
<path d="M150,196 Q132,128 70,62" class="ln pa" style="stroke-width:2.5"/>
<path d="M280,196 L470,66" class="ln" style="stroke-width:2.5"/>
<ellipse cx="172" cy="104" rx="22" ry="50" class="f-card ln"/><text class="tb" x="172" y="108" text-anchor="middle">Cb</text>
<path d="M160,160 l-5,16 M170,160 l-5,16 M180,160 l-5,16" class="ln pa" style="stroke-width:1.5"/>
<text class="t" x="304" y="160">Ns</text><text class="t" x="352" y="126">As</text><text class="t" x="402" y="92">Cs</text><text class="t" x="446" y="60">Ci</text>
<path d="M298,170 l-5,18 M310,170 l-5,18 M322,170 l-5,18 M334,170 l-5,18 M346,170 l-5,16 M358,170 l-5,12" class="ln pa" style="stroke-width:1"/>
<text class="tm" x="40" y="110">cold air</text>
<text class="tm" x="225" y="150" text-anchor="middle">warm sector</text>
<text class="tm" x="430" y="180" text-anchor="middle">cold air</text>
<text class="tb" x="150" y="226" text-anchor="middle">COLD FRONT</text>
<text class="tb" x="290" y="226" text-anchor="middle">WARM FRONT</text>
<text class="tm" x="196" y="186">heavy showers</text>
<text class="tm" x="372" y="150">long spell of rain</text>
<line x1="370" y1="22" x2="460" y2="22" class="ln" marker-end="url(#arr)"/><text class="tm" x="415" y="16" text-anchor="middle">system moves east</text>
</svg><figcaption>The system moves left to right. The warm front slopes gently forward, so an observer ahead sees high cloud first (Ci, Cs), then lowering As and Ns with a long band of rain. The cold front behind it is steep: a narrow band of heavy showers, possibly Cb, then clearer, colder air.</figcaption></figure>`;

const clouds = `<div class="tbl"><table>
<tr><th>Level</th><th>Types</th><th>Notes</th></tr>
<tr><td>High</td><td>Cirrus (Ci), cirrocumulus (Cc), cirrostratus (Cs)</td><td>Ice crystals. Cs can give a halo round the sun or moon.</td></tr>
<tr><td>Medium</td><td>Altocumulus (Ac), altostratus (As)</td><td>"Alto" means medium level. As often comes ahead of a warm front.</td></tr>
<tr><td>Low</td><td>Stratus (St), stratocumulus (Sc), nimbostratus (Ns)</td><td>Ns is the thick rain-bearing layer cloud; its base is often low.</td></tr>
<tr><td>Vertical development</td><td>Cumulus (Cu), cumulonimbus (Cb)</td><td>Formed by convection in unstable air. Cb brings thunder, hail, icing and severe turbulence.</td></tr>
</table></div>`;

const T = [];
T.push({ id:"atmos", ref:"050 · 1", title:"The atmosphere and altimetry",
blurb:"The International Standard Atmosphere, pressure with height, and how pressure and temperature fool the altimeter.",
learn:()=>`
<h3>International Standard Atmosphere (ISA)</h3>
<div class="tbl"><table>
<tr><th>Value</th><th>ISA</th></tr>
<tr><td>Mean sea level pressure</td><td>1013.25 hPa</td></tr>
<tr><td>Mean sea level temperature</td><td>+15 °C</td></tr>
<tr><td>Temperature lapse rate</td><td>1.98 °C per 1,000 ft (use 2 °C)</td></tr>
<tr><td>Tropopause</td><td>About 36,000 ft, at −56.5 °C</td></tr>
</table></div>
<p>Near the surface, pressure falls by about <b>1 hPa for every 30 ft</b> of height. Use 30 ft per hPa for altimeter calculations.</p>
<h3>Density</h3>
<p>Air density falls with height, with higher temperature and with higher humidity. Low density means less engine power, less propeller thrust and longer take-off runs. <b>Density altitude</b> is the height in the ISA that has the same density as the air you are in: a hot day at a high airfield can perform like a much higher one.</p>
<h3>Altimeter errors</h3>
<ul>
<li><b>Pressure:</b> flying from high to low pressure with the subscale unchanged, the altimeter over-reads, so you are <b>lower</b> than indicated. "High to low, look out below."</li>
<li><b>Temperature:</b> in air colder than ISA the altimeter also over-reads, so you are lower than indicated.</li>
</ul>
<p>Example: QNH 1013 set, and the actual QNH is now 1003. That is 10 hPa × 30 ft = 300 ft. You are 300 ft lower than the altimeter shows.</p>
<div class="box trap"><b>Common trap</b>Both errors point the same way when things get worse: lower pressure or colder air than the altimeter assumes puts you closer to the ground than it says.</div>`,
qs:[
{q:"What is the ISA temperature at mean sea level?",o:["+15 °C","0 °C","+20 °C","+10 °C"],e:"The International Standard Atmosphere assumes +15 °C and 1013.25 hPa at mean sea level."},
{q:"What is the ISA temperature lapse rate in the lower atmosphere?",o:["About 2 °C per 1,000 ft","About 3 °C per 1,000 ft","About 1.5 °C per 1,000 ft","About 1 °C per 1,000 ft"],e:"ISA cools at 1.98 °C per 1,000 ft up to the tropopause. Don't confuse it with the dry adiabatic rate of 3 °C per 1,000 ft."},
{q:"Near the surface, approximately how much height does 1 hPa represent?",o:["30 ft","10 ft","100 ft","300 ft"],e:"Use 30 ft per hPa for altimetry calculations at low level."},
{q:"You fly from an area of high pressure to an area of low pressure without changing the altimeter subscale. What happens?",o:["You are lower than the altimeter indicates","You are higher than the altimeter indicates","The altimeter reads correctly","The altimeter reads zero"],e:"With the old, higher setting still set, the altimeter over-reads. High to low, look out below."},
{q:"The altimeter is set to 1013 hPa but the actual QNH is 998 hPa. Roughly how far is the aircraft below its indicated altitude?",o:["450 ft","150 ft","45 ft","1,500 ft"],e:"The difference is 15 hPa × 30 ft = 450 ft, and because pressure has fallen, the aircraft is lower than indicated."},
{q:"How does air colder than ISA affect a pressure altimeter?",o:["It over-reads, so the aircraft is lower than indicated","It under-reads, so the aircraft is higher than indicated","It reads correctly","It reads correctly only above 3,000 ft"],e:"Cold air is denser and the pressure levels sit closer together, so at an indicated altitude you are lower than the altimeter assumes."},
{q:"Which combination gives the highest density altitude and the poorest take-off performance?",o:["High temperature, high aerodrome elevation, low pressure","Low temperature, low elevation, high pressure","Low temperature, high elevation, high pressure","High temperature, low elevation, high pressure"],e:"Heat, height and low pressure all reduce air density, which cuts engine power, propeller thrust and wing lift."}
]});

T.push({ id:"stability", ref:"050 · 2", title:"Moisture, cloud base and stability",
blurb:"Dew point, the adiabatic lapse rates, estimating cloud base, and stable versus unstable air.",
learn:()=>`
<h3>Moisture</h3>
<p>The <b>dew point</b> is the temperature to which air must be cooled, at constant pressure, to become saturated. When air cools to its dew point, water vapour condenses into cloud, fog or dew. The closer temperature and dew point are, the more humid the air.</p>
<h3>Adiabatic lapse rates</h3>
<p>Rising air expands and cools without exchanging heat with its surroundings (adiabatic cooling).</p>
<div class="tbl"><table>
<tr><th>Rate</th><th>Value</th><th>Applies to</th></tr>
<tr><td>Dry adiabatic (DALR)</td><td>3 °C per 1,000 ft</td><td>Unsaturated rising air</td></tr>
<tr><td>Saturated adiabatic (SALR)</td><td>About 1.5 °C per 1,000 ft (varies)</td><td>Saturated rising air: condensation releases latent heat, so it cools more slowly</td></tr>
<tr><td>Environmental (ELR)</td><td>Whatever the actual atmosphere is doing</td><td>The air around the rising parcel</td></tr>
</table></div>
<h3>Estimating cloud base</h3>
<p>A rising parcel's temperature and dew point close at about 2.5 °C per 1,000 ft, so <span class="mono">cloud base (ft) ≈ (temperature − dew point) × 400</span>. Example: 15 °C and 9 °C gives 6 × 400 = 2,400 ft.</p>
<h3>Stability</h3>
<ul>
<li><b>Stable</b>: ELR less than SALR. Lifted air ends up colder than its surroundings and sinks back. Layer cloud (stratus), poor visibility in haze or drizzle, smooth air.</li>
<li><b>Unstable</b>: ELR greater than DALR. Lifted air stays warmer than its surroundings and keeps rising. Heap cloud (cumulus, Cb), showers, good visibility outside showers, bumpy air.</li>
<li><b>Conditionally unstable</b>: ELR between the two. Unstable only once the air is saturated.</li>
</ul>
<div class="box trap"><b>Common trap</b>Don't mix up the ISA lapse rate (about 2 °C per 1,000 ft) with the dry adiabatic rate (3 °C per 1,000 ft). ISA is a reference atmosphere; DALR describes a rising parcel of air.</div>`,
qs:[
{q:"What is the dew point?",o:["The temperature to which air must be cooled to become saturated","The temperature at which water freezes","The temperature at the cloud base","The difference between air temperature and humidity"],e:"Cool air to its dew point at constant pressure and it becomes saturated; any further cooling causes condensation."},
{q:"What is the dry adiabatic lapse rate?",o:["3 °C per 1,000 ft","2 °C per 1,000 ft","1.5 °C per 1,000 ft","1 °C per 1,000 ft"],e:"Unsaturated air cools at 3 °C per 1,000 ft as it rises. About 2 °C is ISA; about 1.5 °C is the saturated rate."},
{q:"Why is the saturated adiabatic lapse rate lower than the dry rate?",o:["Condensation releases latent heat into the rising air","Saturated air is denser","Saturated air rises more slowly","Water vapour absorbs radiation from the sun"],e:"As water vapour condenses it gives up latent heat, partly offsetting the cooling from expansion."},
{q:"Surface temperature is 17 °C and dew point is 11 °C. Approximately where will the base of cumulus cloud be?",o:["2,400 ft","1,200 ft","4,800 ft","600 ft"],e:"(17 − 11) × 400 = 2,400 ft."},
{q:"Air is described as stable when:",o:["The environmental lapse rate is less than the saturated adiabatic lapse rate","The environmental lapse rate is greater than the dry adiabatic lapse rate","The dew point is higher than the temperature","Surface heating is strong"],e:"If the environment cools more slowly than even saturated rising air, a lifted parcel becomes colder than its surroundings and sinks back. That is stable air."},
{q:"Which weather is typical of unstable air?",o:["Cumulus cloud, showers and good visibility outside them","Layer cloud, drizzle and poor visibility","Clear skies and haze","Fog and smooth air"],e:"Unstable air keeps rising, building heap cloud and showers; it mixes well, so visibility away from the showers is usually good."},
{q:"Which weather is typical of stable air?",o:["Stratiform cloud, poor visibility and smooth air","Cumulonimbus and thunderstorms","Heavy showers and gusty winds","Good visibility and bumpy air"],e:"Stable air resists vertical movement: layer cloud, trapped haze or drizzle, and little turbulence."}
]});

T.push({ id:"clouds", ref:"050 · 3", title:"Clouds, fog and visibility",
blurb:"Cloud types by level, how radiation and advection fog form, and the visibility definitions.",
learn:()=>`
${clouds}
<h3>Fog</h3>
<p><b>Fog</b> is visibility below <b>1,000 m</b> due to water droplets. <b>Mist</b> is the same thing with visibility of 1,000 m or more. <b>Haze</b> is caused by dry particles such as dust and smoke.</p>
<div class="tbl"><table>
<tr><th>Type</th><th>How it forms</th><th>How it clears</th></tr>
<tr><td>Radiation fog</td><td>Over land, on a clear night with moist air and light wind (about 2–8 kt). The ground cools by radiation and chills the air above it to the dew point.</td><td>Heating after sunrise, or the wind strengthening and lifting it into low stratus</td></tr>
<tr><td>Advection fog</td><td>Warm, moist air moving over a colder surface, such as the sea in spring or cold ground in winter. Can form in stronger winds and at any time of day.</td><td>A change of air mass or wind direction; it can persist for days</td></tr>
<tr><td>Hill fog</td><td>Moist air forced up a slope cools to its dew point; low cloud sits on the hills.</td><td>Change of air mass</td></tr>
<tr><td>Frontal fog</td><td>Rain falling from warmer air into colder air below saturates it, near a front.</td><td>Passage of the front</td></tr>
</table></div>
<div class="box trap"><b>Common trap</b>Radiation fog needs <b>clear skies</b> (to let the ground cool) and <b>light</b> wind. Cloud cover or a strong wind prevents it. Advection fog does not need a clear night.</div>`,
qs:[
{q:"Which conditions favour radiation fog?",o:["A clear night, moist air and a light wind over land","An overcast night with strong winds","Warm, moist air moving over a cold sea","A sunny afternoon in summer"],e:"Clear skies let the ground lose heat; light wind mixes the cooling into a shallow layer; moist air reaches its dew point. Strong wind or cloud prevents it."},
{q:"How does advection fog form?",o:["Warm, moist air moves over a colder surface","Cold air moves over a warm sea","The ground cools on a clear night","Rain falls into cold air"],e:"Advection means horizontal movement: warm, moist air is cooled from below as it passes over cold land or sea."},
{q:"What visibility defines fog?",o:["Less than 1,000 m","Less than 5 km","Less than 1,500 m","Less than 500 m"],e:"Fog is visibility below 1,000 m due to water droplets. With visibility of 1,000 m or more it is reported as mist (BR)."},
{q:"Which cloud is the thick, grey, rain-bearing layer cloud with a low base?",o:["Nimbostratus","Cirrostratus","Altocumulus","Cumulus"],e:"Nimbostratus is the dense layer cloud that gives continuous rain or snow, often ahead of and at a warm front."},
{q:"Altostratus is classed as which level of cloud?",o:["Medium","Low","High","Vertical development"],e:"\"Alto\" means medium level. Altostratus and altocumulus are medium-level clouds."},
{q:"Which hazards are associated with cumulonimbus?",o:["Severe turbulence, icing, hail, lightning and windshear","Only light rain","Poor visibility but smooth air","Only icing above 10,000 ft"],e:"Cb is the most hazardous cloud: strong up and down draughts, hail, lightning, severe icing and gusty, shearing winds below it. Keep well clear."},
{q:"How does radiation fog usually clear?",o:["By surface heating after sunrise, or by the wind increasing","By the arrival of colder air","By darkness falling","It never clears without a front passing"],e:"Morning sun warms the ground and lifts the temperature above the dew point; an increasing wind can also lift it into a layer of low stratus."}
]});

T.push({ id:"airmass", ref:"050 · 4", title:"Air masses, fronts and wind",
blurb:"The air masses that reach the UK, warm and cold fronts, and how wind behaves near the surface.",
learn:()=>`
<h3>Air masses affecting the UK</h3>
<div class="tbl"><table>
<tr><th>Air mass</th><th>From</th><th>Typical weather</th></tr>
<tr><td>Polar maritime (Pm)</td><td>North-west, over the Atlantic</td><td>The commonest. Unstable: cumulus, showers, good visibility outside showers.</td></tr>
<tr><td>Tropical maritime (Tm)</td><td>South-west</td><td>Warm and moist. Stable: low stratus, drizzle, poor visibility, hill and sea fog.</td></tr>
<tr><td>Polar continental (Pc)</td><td>East, from Europe in winter</td><td>Very cold and dry; snow showers on the east coast after crossing the North Sea.</td></tr>
<tr><td>Tropical continental (Tc)</td><td>South-east, in summer</td><td>Hot, dry, hazy, with thunderstorms possible.</td></tr>
<tr><td>Arctic maritime (Am)</td><td>North</td><td>Very cold, unstable; snow showers in winter.</td></tr>
</table></div>
<h3>Fronts</h3>
${fronts}
<div class="tbl"><table>
<tr><th></th><th>Warm front passes</th><th>Cold front passes</th></tr>
<tr><td>Temperature</td><td>Rises</td><td>Falls</td></tr>
<tr><td>Wind (northern hemisphere)</td><td>Veers</td><td>Veers, often sharply, with gusts</td></tr>
<tr><td>Pressure</td><td>Falls ahead, then steadies</td><td>Rises after passage</td></tr>
<tr><td>Visibility</td><td>Poor in rain and in the warm sector</td><td>Improves behind the front</td></tr>
</table></div>
<h3>Wind</h3>
<ul>
<li><b>Buys Ballot's law</b>: in the northern hemisphere, stand with your back to the wind and low pressure is on your <b>left</b>.</li>
<li>Above the friction layer (about 2,000 ft) the wind blows roughly along the isobars, around lows anticlockwise and highs clockwise.</li>
<li>Near the surface, friction slows the wind and turns it towards low pressure: the surface wind is <b>backed</b> and <b>lighter</b> than the wind at 2,000 ft. Climbing away from the surface, the wind <b>veers and increases</b>, more over land (about 30°) than over sea (about 10°).</li>
<li><b>Veer</b> means the direction changes clockwise; <b>back</b> means anticlockwise.</li>
</ul>`,
qs:[
{q:"In the northern hemisphere, if you stand with your back to the wind, where is the low pressure?",o:["On your left","On your right","In front of you","Behind you"],e:"Buys Ballot's law: back to the wind in the northern hemisphere, low pressure is on the left."},
{q:"Which air mass most commonly affects the UK, bringing cumulus, showers and good visibility?",o:["Polar maritime","Tropical maritime","Polar continental","Tropical continental"],e:"Polar maritime air arrives from the north-west over the Atlantic, warms from below and becomes unstable: showers and good visibility."},
{q:"A tropical maritime air mass over the UK in winter typically brings:",o:["Low stratus, drizzle and poor visibility","Clear skies and good visibility","Heavy showers and thunderstorms","Very cold, dry conditions"],e:"Tm air is warm and moist and cools from below over the UK in winter, making it stable: low cloud, drizzle, mist and fog."},
{q:"What is the usual order of clouds as a warm front approaches?",o:["Cirrus, cirrostratus, altostratus, nimbostratus","Nimbostratus, altostratus, cirrostratus, cirrus","Cumulus, cumulonimbus, stratus","Stratus, cumulus, cirrus"],e:"The gentle frontal slope means the high cloud arrives first, then progressively lower and thicker cloud ending in nimbostratus and rain."},
{q:"After a cold front has passed, what would you normally expect?",o:["Temperature falls and visibility improves","Temperature rises and visibility worsens","Wind backs and pressure falls","Continuous drizzle and low stratus"],e:"Behind a cold front comes colder, often unstable air: temperature drops, pressure rises, the wind veers and visibility usually improves."},
{q:"Climbing from the surface to 2,000 ft over land, the wind normally:",o:["Veers and increases","Backs and decreases","Veers and decreases","Stays the same"],e:"Surface friction slows the wind and backs it. Above the friction layer it is stronger and veered, by about 30° over land."},
{q:"What does it mean when the wind \"veers\"?",o:["It changes direction clockwise","It changes direction anticlockwise","It increases in speed","It becomes gusty"],e:"Veering is a clockwise change, for example from 240° to 280°. Backing is anticlockwise."}
]});

T.push({ id:"hazards", ref:"050 · 5", title:"Icing, thunderstorms and mountain waves",
blurb:"Carburettor and airframe icing, the life of a thunderstorm, and turbulence near hills.",
learn:()=>`
<h3>Carburettor icing</h3>
<p>Fuel evaporating in the carburettor, and the pressure drop in the venturi, can cool the air by 20 °C or more. Ice can form even on a <b>warm, humid day</b>. It is most likely with <b>high humidity</b> and at <b>reduced power</b> (descent, approach), when the throttle valve is partly closed. Signs: a drop in RPM (fixed-pitch propeller) and rough running. Use carburettor heat as your checklist and POH direct.</p>
<h3>Airframe icing</h3>
<p>Ice forms when <b>supercooled water droplets</b> (liquid below 0 °C) hit the airframe and freeze.</p>
<div class="tbl"><table>
<tr><th>Type</th><th>Forms from</th><th>Character</th></tr>
<tr><td>Clear (glaze) ice</td><td>Large supercooled drops, typically 0 to −10 °C, in cumuliform cloud or freezing rain</td><td>Heavy, hard, spreads back over the wing before freezing. The most dangerous.</td></tr>
<tr><td>Rime ice</td><td>Small supercooled drops, colder temperatures, layer cloud</td><td>White, brittle, rough; freezes on the leading edge.</td></tr>
<tr><td>Hoar frost</td><td>Water vapour freezing directly on a surface below 0 °C, e.g. after a cold night or a descent into warm moist air</td><td>Feathery; must be removed before flight.</td></tr>
</table></div>
<h3>Thunderstorms</h3>
<p>Need moist air, instability and a trigger to lift it (heating, a front or hills). Three stages:</p>
<ol>
<li><b>Cumulus</b>: updraughts throughout; the cloud grows.</li>
<li><b>Mature</b>: begins when precipitation falls from the base; violent up and downdraughts side by side, hail, lightning, gust front and microbursts. The most dangerous stage.</li>
<li><b>Dissipating</b>: mainly downdraughts; the storm rains itself out.</li>
</ol>
<h3>Mountain waves</h3>
<p>Strong wind blowing across a ridge, with stable air above, can set up standing waves downwind. <b>Lenticular</b> (lens-shaped) clouds mark the crests, and <b>rotor</b> clouds below them mark severe turbulence. Expect strong downdraughts on the lee side of hills.</p>`,
qs:[
{q:"When is carburettor icing most likely?",o:["At reduced power settings in humid air","Only when the outside air temperature is below 0 °C","At full power in dry air","Only in cloud"],e:"Partly closed throttle and high humidity give the greatest risk. The cooling in the carburettor means ice can form on a warm day."},
{q:"What first sign of carburettor icing would you expect in an aircraft with a fixed-pitch propeller?",o:["A drop in RPM","A rise in oil temperature","A rise in RPM","A rise in oil pressure"],e:"Ice restricts the airflow through the carburettor, reducing power, which shows as falling RPM with a fixed-pitch propeller, followed by rough running."},
{q:"What are supercooled water droplets?",o:["Liquid water droplets at a temperature below 0 °C","Ice crystals in high cloud","Water droplets just above 0 °C","Hailstones that have partly melted"],e:"Small droplets can stay liquid well below freezing. They freeze on impact with an aircraft, causing airframe icing."},
{q:"Which type of airframe ice is generally the most dangerous?",o:["Clear ice","Rime ice","Hoar frost","Ice crystals"],e:"Clear ice from large supercooled drops spreads back before freezing, is heavy and hard to see, and badly distorts the wing section."},
{q:"Which stage of a thunderstorm is the most dangerous?",o:["Mature","Cumulus","Dissipating","All stages are equally dangerous"],e:"The mature stage has precipitation, violent up and downdraughts side by side, hail, lightning and microbursts."},
{q:"What marks the start of the mature stage of a thunderstorm?",o:["Precipitation beginning to fall from the cloud base","The first updraught","The anvil top dissipating","The cloud base lifting"],e:"Falling precipitation drags air down with it, setting up the downdraughts that characterise the mature stage."},
{q:"Lenticular clouds downwind of a ridge indicate:",o:["Mountain waves, with possible severe turbulence and downdraughts","Fair weather and calm conditions","An approaching warm front","Radiation fog forming"],e:"Lens-shaped clouds sit in the crests of standing waves. Rotor beneath them can be severely turbulent, and downdraughts on the lee side can exceed an aircraft's climb rate."}
]});

T.push({ id:"reports", ref:"050 · 6", title:"METARs and TAFs",
blurb:"Reading the coded actual reports and forecasts, cloud amounts, CAVOK and change groups.",
learn:()=>`
<h3>A METAR, decoded</h3>
<p class="mono">EGNT 171020Z 24012KT 9999 FEW030 SCT045 12/07 Q1009</p>
<div class="tbl"><table>
<tr><th>Group</th><th>Meaning</th></tr>
<tr><td>EGNT</td><td>Aerodrome (Newcastle)</td></tr>
<tr><td>171020Z</td><td>17th day of the month, 10:20 UTC</td></tr>
<tr><td>24012KT</td><td>Wind from 240° <b>true</b> at 12 kt</td></tr>
<tr><td>9999</td><td>Visibility 10 km or more</td></tr>
<tr><td>FEW030 SCT045</td><td>Few cloud at 3,000 ft, scattered at 4,500 ft, <b>above aerodrome level</b></td></tr>
<tr><td>12/07</td><td>Temperature 12 °C, dew point 7 °C</td></tr>
<tr><td>Q1009</td><td>QNH 1009 hPa</td></tr>
</table></div>
<h3>Cloud amounts</h3>
<div class="sq">
<div class="tile"><div class="big">FEW</div><div class="d">1–2 oktas</div></div>
<div class="tile"><div class="big">SCT</div><div class="d">3–4 oktas</div></div>
<div class="tile"><div class="big">BKN</div><div class="d">5–7 oktas</div></div>
<div class="tile"><div class="big">OVC</div><div class="d">8 oktas</div></div>
</div>
<h3>CAVOK</h3>
<p>Ceiling and visibility OK: visibility 10 km or more, no cloud below 5,000 ft (or below the highest minimum sector altitude if higher), no cumulonimbus or towering cumulus, and no significant weather.</p>
<h3>Weather codes</h3>
<p><span class="mono">RA</span> rain, <span class="mono">DZ</span> drizzle, <span class="mono">SN</span> snow, <span class="mono">SH</span> showers, <span class="mono">TS</span> thunderstorm, <span class="mono">BR</span> mist, <span class="mono">FG</span> fog, <span class="mono">HZ</span> haze, <span class="mono">GR</span> hail. A <span class="mono">−</span> prefix means light, <span class="mono">+</span> heavy, and <span class="mono">VC</span> in the vicinity. So <span class="mono">−SHRA</span> is light rain showers.</p>
<h3>TAF change groups</h3>
<ul>
<li><b>BECMG</b>: a lasting change happening during the stated period.</li>
<li><b>TEMPO</b>: temporary fluctuations, each lasting less than an hour and in total less than half the period.</li>
<li><b>PROB30 / PROB40</b>: 30% or 40% probability.</li>
</ul>
<div class="box trap"><b>Common trap</b>METAR and TAF winds are in degrees <b>true</b>. The wind a tower or ATIS gives you for take-off and landing is in degrees <b>magnetic</b>, to match the runway.</div>`,
qs:[
{q:"In a METAR, what does SCT mean?",o:["3 to 4 oktas of cloud","1 to 2 oktas","5 to 7 oktas","8 oktas"],e:"FEW 1–2, SCT 3–4, BKN 5–7, OVC 8 oktas."},
{q:"In a METAR, what does BKN040 mean?",o:["5 to 7 oktas of cloud with a base of 4,000 ft above aerodrome level","Broken cloud at 400 ft","5 to 7 oktas at 4,000 ft above mean sea level","Cloud broken by thunderstorms at 4,000 ft"],e:"BKN is 5–7 oktas, and cloud heights in METARs are in hundreds of feet above aerodrome level."},
{q:"What does 9999 mean in the visibility group of a METAR?",o:["10 km or more","9,999 m exactly","Visibility not reported","Less than 10 km"],e:"9999 is the code for 10 km or more."},
{q:"Which of these is part of the definition of CAVOK?",o:["Visibility 10 km or more and no cloud below 5,000 ft (or the highest minimum sector altitude if higher)","No cloud at all","Visibility 5 km or more and no cloud below 1,500 ft","Wind calm and visibility unlimited"],e:"CAVOK needs 10 km or more visibility, no cloud below 5,000 ft or the highest MSA if higher, no CB or TCU and no significant weather. There may still be cloud higher up."},
{q:"In a METAR, the wind direction is given relative to:",o:["True north","Magnetic north","The runway in use","Grid north"],e:"Met reports give wind in degrees true. ATC and ATIS give surface wind in degrees magnetic for take-off and landing."},
{q:"What does −SHRA mean?",o:["Light rain showers","Heavy rain showers","Light snow showers","Shallow rain"],e:"− is light, SH is showers, RA is rain."},
{q:"In a TAF, what does TEMPO indicate?",o:["Temporary fluctuations, each lasting less than an hour and in total less than half the period","A permanent change during the period","A 30% chance of the conditions","Conditions at the start of the forecast only"],e:"TEMPO means conditions that come and go: each spell under an hour, and together less than half the stated period. BECMG is a lasting change."}
]});

SUBJECTS.push({ id:"met", code:"050", name:"Meteorology",
  blurb:"The standard atmosphere, cloud and stability, fog, air masses and fronts, icing and thunderstorms, and reading METARs and TAFs.",
  topics:T });
})();
