// Hands-on diagrams and extra questions for 020 AGK, 030 FPP and 070 Ops
extendTopic("agk", "engine", { try:[["fourstroke", "Step through the four strokes"]] });
extendTopic("agk", "instruments", { try:[["asi", "Read the ASI markings"], ["pitotstatic", "Pitot and static blockages"]] });

extendTopic("fpp", "mass", { try:[["wb", "Load the example aircraft"]] });
extendTopic("fpp", "takeoff", { try:[["perf", "Factor a take-off or landing distance"]] });
extendTopic("fpp", "density", { try:[["densalt", "Pressure and density altitude"]], qs:[
{q:"On a hot day at a sea-level aerodrome, the density altitude is 2,500 ft. How will the aircraft perform?",o:["As if it were taking off from about 2,500 ft","Exactly as at sea level","Better than at sea level","As if it were at 25,000 ft"],e:"Density altitude is the altitude in the standard atmosphere with the same density, and performance follows density."},
{q:"QNH is higher than 1013 hPa. Compared with the aerodrome elevation, the pressure altitude is:",o:["Lower","Higher","The same","Always zero"],e:"Pressure altitude = elevation + (1013 − QNH) × 30. With QNH above 1013 the correction is negative."}
]});
extendTopic("fpp", "climbcruise", { qs:[
{q:"Why might you climb at a speed above Vy on a long climb on a hot day?",o:["To improve engine cooling","To reach altitude in less time","To reduce the take-off distance","To lower the stall speed"],e:"A cruise-climb at a slightly higher speed gives more cooling airflow over the cylinders, at the cost of a lower climb rate."},
{q:"What happens to the rate of climb as altitude increases?",o:["It reduces","It increases","It stays constant","It increases until the service ceiling"],e:"Power available falls as air density falls, so the excess power for climbing shrinks until the aircraft can barely climb at all."}
]});
extendTopic("fpp", "fuelplan", { try:[["fuelplan", "Build a fuel plan"]] });

extendTopic("ops", "wake", { try:[["wake", "Wake turbulence spacing and drift"]] });
extendTopic("ops", "emergency", { qs:[
{q:"Your checklist's cabin fire drill starts with the master switch. Why might it say to switch it back on after 3 seconds?",o:["To restore essential services once the electrical source of the fire is cut off, as the drill directs","To restart the engine","To test the fire extinguisher","To reset the magnetos"],e:"Follow your checklist exactly: it gives the master switch action, shedding non-essentials, the extinguisher and ventilation, then the radio call."}
]});
extendTopic("ops", "landings", { qs:[
{q:"Over water, how should life jackets be worn by the occupants of a single-engine aircraft, according to your checklist's preparation section?",o:["Worn, uninflated","Stowed in the baggage area","Worn and inflated","Only carried by the pilot"],e:"Your Pilot's Preparation checklist says life jackets should be worn uninflated over water. There is no time to put them on after an engine failure."}
]});
