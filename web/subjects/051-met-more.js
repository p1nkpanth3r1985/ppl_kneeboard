// 050 Meteorology: extra questions and hands-on diagrams
extendTopic("met", "atmos", { try:[["altimeter", "Altimeter setting errors"]], qs:[
{type:"calc", gen:() => { const set = rnd(1008, 1022), act = set - rnd(5, 18), ind = rnd(2000, 4000, 500), tru = ind + (act - set) * 30;
  return { q:`Your altimeter has ${set} hPa set and reads ${ind.toLocaleString("en-GB")} ft. The actual QNH where you are is ${act} hPa. What is your true altitude?`, a:tru, tol:0, unit:" ft",
    steps:[`Difference = ${act} − ${set} = ${act - set} hPa`, `× 30 ft per hPa = ${(act - set) * 30} ft`, `${ind} ${act - set < 0 ? "−" : "+"} ${Math.abs((act - set) * 30)} = ${tru} ft`] }; },
  e:"Pressure lower than the setting means you are lower than indicated: high to low, look out below."},
{type:"calc", gen:() => { const alt = rnd(2, 10) * 1000, t = 15 - 2 * alt / 1000;
  return { q:`Using 2 °C per 1,000 ft, what is the ISA temperature at ${alt.toLocaleString("en-GB")} ft?`, a:t, tol:1, unit:" °C",
    steps:[`ISA at sea level = +15 °C`, `Lapse = 2 × ${alt/1000} = ${2*alt/1000} °C`, `15 − ${2*alt/1000} = ${t} °C`] }; },
  e:"The exact ISA lapse rate is 1.98 °C per 1,000 ft; 2 °C is close enough for working."},
{type:"calc", gen:() => { const alt = rnd(2, 8) * 1000, isa = 15 - 2 * alt / 1000, oat = isa + rnd(-8, 12);
  return { q:`At ${alt.toLocaleString("en-GB")} ft the outside air temperature is ${oat} °C. What is the ISA deviation? (use 2 °C per 1,000 ft; a minus sign for colder than ISA)`, a:oat - isa, tol:0, unit:" °C", neg:true,
    steps:[`ISA at ${alt} ft = 15 − ${2*alt/1000} = ${isa} °C`, `Deviation = actual − ISA = ${oat} − (${isa}) = ${oat - isa} °C`] }; },
  e:"Warmer than ISA (a positive deviation) means lower density and poorer performance; colder than ISA means the altimeter over-reads."},
{q:"Which of these increases density altitude?",o:["A rise in temperature","A rise in pressure","A fall in humidity","A fall in temperature"],e:"Warmer air is less dense, so the aircraft performs as if it were higher. Lower pressure and higher humidity also raise density altitude."},
{q:"What is pressure altitude?",o:["The altitude shown when 1013.25 hPa is set on the subscale","The height above the aerodrome","The altitude corrected for temperature","The altitude shown with the regional QNH set"],e:"Pressure altitude is height in the standard atmosphere above the 1013.25 hPa level. It is the starting point for performance charts and flight levels."}
]});

extendTopic("met", "stability", { try:[["cloudbase", "Estimating cloud base"]], qs:[
{type:"calc", gen:() => { const t = rnd(10, 25), d = t - rnd(2, 8), base = (t - d) * 400;
  return { q:`Temperature ${t} °C, dew point ${d} °C. Estimate the base of cumulus cloud above the surface.`, a:base, tol:0, unit:" ft",
    steps:[`Spread = ${t} − ${d} = ${t - d} °C`, `× 400 = ${base.toLocaleString("en-GB")} ft`] }; },
  e:"Rising air and its dew point converge at about 2.5 °C per 1,000 ft, which is where the 400 ft per degree comes from."},
{q:"What is a temperature inversion?",o:["A layer where temperature increases with height","A layer where temperature falls faster than the DALR","The point where air reaches its dew point","A sudden fall in surface pressure"],e:"In an inversion the air gets warmer with height. It is very stable and traps haze, smoke and low cloud beneath it."},
{q:"Moist air is forced over a mountain range, loses its moisture as rain on the windward side, and descends on the lee side. What is the air like on the lee side?",o:["Warmer and drier than on the windward side at the same level (the Föhn effect)","Colder and wetter","Exactly the same","Full of fog"],e:"On the way up the air cools at the slower saturated rate after condensation; descending it warms at the faster dry rate, so it arrives warmer and drier."},
{q:"When the temperature equals the dew point, what is the relative humidity?",o:["100%","50%","0%","It cannot be worked out"],e:"Air at its dew point is saturated: 100% relative humidity. Expect cloud, mist or fog."},
{type:"match", q:"Match each lapse rate to its value or meaning.", pairs:[["Dry adiabatic (DALR)","3 °C per 1,000 ft"],["Saturated adiabatic (SALR)","About 1.5 °C per 1,000 ft"],["ISA","About 2 °C per 1,000 ft"],["Environmental (ELR)","The actual rate in today's atmosphere"]],
  e:"Comparing the ELR with the DALR and SALR tells you whether the air is stable or unstable."}
]});

extendTopic("met", "clouds", { qs:[
{type:"match", q:"Match each cloud to its level.", pairs:[["Cirrus","High"],["Altostratus","Medium"],["Stratus","Low"],["Cumulonimbus","Vertical development"]],
  e:"Ci, Cc and Cs are high; Ac and As medium; St, Sc and Ns low; Cu and Cb grow through several levels."},
{q:"When does a sea breeze usually blow?",o:["During the day, from the sea towards the land","At night, from the land towards the sea","At night, from the sea towards the land","Only in winter"],e:"By day the land heats faster than the sea, air rises over the land and cooler sea air flows in. At night the reverse (a land breeze) can happen."},
{q:"Which change would NOT help to clear radiation fog?",o:["The wind dropping to calm","The sun heating the ground","The wind strengthening","Cloud moving over the area and stopping further cooling"],e:"Calm air lets the fog sit and thicken. Heating, stronger wind or cloud cover all help to disperse it."},
{q:"What is the difference between haze and mist?",o:["Haze is caused by dry particles; mist by water droplets","Haze is thicker than fog","Mist only forms over the sea","There is no difference"],e:"Haze (HZ) is dust, smoke or pollution in dry air. Mist (BR) is water droplets with visibility of 1,000 m or more."},
{q:"Which cloud is most likely to produce drizzle?",o:["Stratus","Cirrus","Cumulonimbus","Altocumulus"],e:"Drizzle comes from thin, low layer cloud such as stratus, typically in moist, stable tropical maritime air."}
]});

extendTopic("met", "airmass", { qs:[
{type:"order", q:"Put the clouds in the order an observer on the ground sees them as a warm front approaches.", items:["Cirrus","Cirrostratus","Altostratus","Nimbostratus"],
  e:"The warm frontal surface slopes gently ahead of the surface front, so the highest cloud arrives first and the base gets steadily lower."},
{q:"What is an occluded front?",o:["Where a cold front has caught up with a warm front and lifted the warm sector off the ground","A front that has stopped moving","A front between two warm air masses","The boundary of a sea breeze"],e:"Cold fronts move faster than warm fronts. When one catches up, the warm air is lifted aloft and the front is occluded."},
{q:"A large anticyclone is over the UK in winter. Which weather is likely?",o:["Light winds, an inversion, and a risk of fog, haze or extensive low stratus","Strong winds and heavy showers","Thunderstorms","Rapidly changing frontal weather"],e:"Sinking air in a high warms and creates an inversion. In winter, moisture trapped below it gives fog, haze or a persistent layer of stratus ('anticyclonic gloom')."},
{q:"In the northern hemisphere, in which direction does the wind blow around a depression?",o:["Anticlockwise","Clockwise","Directly into the centre","Directly out from the centre"],e:"Around a low the wind circulates anticlockwise in the northern hemisphere, and around a high clockwise."},
{q:"From which direction does polar continental air usually reach the UK?",o:["From the east, in winter","From the south-west","From the north-west, over the Atlantic","From the south, in summer"],e:"Pc air comes from continental Europe and Scandinavia in winter: very cold, and dry until it crosses the North Sea."}
]});

extendTopic("met", "hazards", { qs:[
{type:"order", q:"Put the stages of a thunderstorm in order.", items:["Cumulus stage: updraughts throughout","Mature stage: precipitation, up and downdraughts","Dissipating stage: mainly downdraughts"],
  e:"The mature stage begins when precipitation falls from the base and is the most dangerous."},
{q:"You suspect carburettor icing and apply full carburettor heat. If ice was present, what would you expect?",o:["RPM drops further and the engine may run roughly, then RPM rises as the ice melts","RPM rises immediately and stays high","No change at all","The engine stops"],e:"Hot air is less dense, so RPM falls at first. Melted ice passing through can make the engine rough. As the ice clears, RPM recovers above where it was."},
{q:"Flying into a microburst on the approach, what is the likely sequence?",o:["An increasing headwind and climb, then a strong downdraught and tailwind with a loss of airspeed and height","A steady tailwind only","A gradual increase in airspeed","Smooth air with light rain"],e:"The outflow first gives a headwind gain, which can tempt the pilot to reduce power, then the downdraught and tailwind cause a sudden loss of performance."},
{q:"How does freezing rain usually form?",o:["Rain falls from a warmer layer above into sub-zero air below and freezes on impact","Snow melts as it falls","Water vapour freezes directly on the airframe","Hail breaks up in the cloud"],e:"Supercooled raindrops freeze on contact with the aircraft, forming clear ice very quickly. Typically found ahead of a warm front in winter."}
]});

extendTopic("met", "reports", { try:[["metar", "Decode a METAR"]], qs:[
{type:"match", q:"Match each METAR weather code to its meaning.", pairs:[["BR","Mist"],["FG","Fog"],["HZ","Haze"],["TS","Thunderstorm"],["DZ","Drizzle"]],
  e:"BR is from the French 'brume'. FG is visibility below 1,000 m; BR is 1,000 m or more."},
{q:"What does VRB03KT mean in a METAR?",o:["Wind variable in direction at 3 kt","Wind from 030° at 3 kt","Visibility reduced by 3 km","Variable wind gusting 30 kt"],e:"VRB means the direction is variable, which is usual when the wind is light."},
{q:"What does 27018G30KT mean?",o:["Wind from 270° true at 18 kt, gusting 30 kt","Wind from 270° at 30 kt, gusting 18 kt","Wind from 018° at 27 kt","Runway 27, wind 18 kt"],e:"Direction (true), mean speed, then G and the gust speed, all in knots."},
{q:"A METAR includes OVC004. What does this mean?",o:["Overcast, base 400 ft above aerodrome level","Overcast at 4,000 ft","4 oktas of cloud","Visibility 400 m"],e:"Heights are in hundreds of feet above aerodrome level. 400 ft overcast is well below VFR circuit height."}
]});
