// 040 Human Performance: extra questions and hands-on diagrams
extendTopic("hp", "hypoxia", { qs:[
{type:"match", q:"Match each condition to its typical cause and signs.", pairs:[["Hypoxia","Too little oxygen: impaired judgement, euphoria, blue lips"],["Hyperventilation","Too little carbon dioxide from over-breathing: tingling, dizziness"],["Carbon monoxide poisoning","Exhaust gas in the cabin: headache, drowsiness"],["Decompression sickness","Nitrogen bubbles after diving then flying: joint pain"]],
  e:"Hypoxia, hyperventilation and carbon monoxide poisoning can feel very alike. If in doubt, treat for the worst: more oxygen or fresh air, heater off, descend and land."},
{q:"Which of these lowers a pilot's tolerance to hypoxia?",o:["Smoking","Being well rested","Drinking water","Wearing sunglasses"],e:"Smokers already carry carbon monoxide in their blood, so they are effectively at a higher altitude. Alcohol, fatigue and illness also lower tolerance."},
{q:"What is meant by the time of useful consciousness?",o:["The time a pilot can still perform useful flying duties after the oxygen supply is lost","The time before a pilot faints from fatigue","The time taken to recover after a stall","The maximum flight time allowed without a break"],e:"After oxygen is lost at altitude, a pilot can act sensibly only for a limited time, which shortens sharply the higher you are."},
{q:"Which statement about carbon monoxide is correct?",o:["It is colourless and has no smell","It always smells strongly of exhaust","It only affects passengers in the rear seats","It is harmless below 5,000 ft"],e:"You cannot see or smell carbon monoxide itself; any exhaust smell comes from other gases. A detector is the reliable warning."},
{q:"How does alcohol in the body affect susceptibility to hypoxia?",o:["It increases it","It reduces it","It has no effect","It only affects it at night"],e:"Alcohol interferes with the body's use of oxygen, so its effects add to those of altitude."}
]});

extendTopic("hp", "vision", { qs:[
{q:"What causes the blind spot in each eye?",o:["The point where the optic nerve leaves the retina has no light-sensitive cells","The shadow of the eyelid","Cones failing in bright light","Damage from looking at the sun"],e:"There are no rods or cones where the optic nerve joins the retina. Using both eyes and moving the head covers it."},
{q:"Which part of the eye gives the sharpest central vision in daylight?",o:["The fovea, packed with cones","The edge of the retina, rich in rods","The blind spot","The lens"],e:"The fovea contains only cones, giving fine detail and colour in good light."},
{q:"Approaching a downsloping runway, what illusion is likely?",o:["Feeling too low, leading to a high approach","Feeling too high, leading to a low approach","Feeling too fast","Feeling too slow"],e:"A downslope makes the runway look shorter and flatter, as if you are low, so pilots tend to fly a high approach and land long."},
{q:"Approaching a runway that is much wider than you are used to, what illusion is likely?",o:["Feeling too low, leading to a high approach","Feeling too high, leading to a low approach","No illusion","Feeling that the runway is sloping up"],e:"A wide runway fills more of the view, as if you are closer and lower, so pilots tend to stay high. A narrow runway does the opposite."},
{q:"Why are polarised sunglasses often not recommended for flying?",o:["They can make some instrument displays and windscreen patterns hard to see","They block too much light","They increase the blind spot","They are not allowed by law"],e:"Polarising filters can hide or distort some displays and show stress patterns in the windscreen. Neutral grey, non-polarised lenses are usually advised."}
]});

extendTopic("hp", "balance", { qs:[
{type:"match", q:"Match each illusion to its cause.", pairs:[["The leans","A slow roll into a turn that the balance organs don't detect"],["Somatogravic illusion","Linear acceleration felt as a nose-up pitch"],["Coriolis illusion","Moving the head during a turn"],["Empty field myopia","A featureless sky with nothing to focus on"]],
  e:"The first three come from the balance organs; empty field myopia is a vision effect. All are worse without a visual horizon."},
{q:"What do the otolith organs detect?",o:["Linear acceleration and gravity","Angular acceleration","Sound","Changes in air pressure"],e:"The otoliths sense straight-line acceleration and the pull of gravity, and can't tell one from the other."},
{q:"A non-instrument-rated pilot is most at risk of disorientation when:",o:["Flying into cloud or poor visibility and losing the visual horizon","Flying in clear air on a sunny day","Taxiing at night","Flying straight and level over the sea in good visibility"],e:"Without a horizon the balance organs give false cues within seconds. The best defence is not to enter cloud; if you do, trust the instruments and turn back carefully."},
{q:"What is the main cause of motion sickness?",o:["A conflict between what the eyes see and what the balance organs feel","Low blood sugar","Carbon monoxide","Hyperventilation"],e:"Mismatched signals from the eyes and inner ear are the root cause. Looking outside at the horizon helps."},
{q:"Why does the middle ear usually equalise easily during a climb?",o:["Air escapes from the middle ear through the Eustachian tube without effort","The eardrum stretches","The sinuses absorb the extra pressure","Swallowing is impossible during the climb"],e:"The Eustachian tube opens readily to let air out as outside pressure falls. On the descent air must be pushed back in, which is harder."}
]});

extendTopic("hp", "health", { try:[["imsafe", "IMSAFE self-check"]], qs:[
{type:"order", q:"Put the IMSAFE checks in order.", items:["Illness","Medication","Stress","Alcohol","Fatigue","Eating"],
  e:"A quick personal check before every flight, alongside the aircraft checks."},
{q:"Roughly how long does the body take to remove four units of alcohol?",o:["About four hours","About one hour","About half an hour","About twelve hours"],e:"The liver removes roughly one unit an hour. Four units take about four hours, and longer for some people."},
{q:"A pilot's blood alcohol is now zero after a heavy night. Which statement is correct?",o:["Hangover effects can still impair performance","They are fully fit as soon as the alcohol has gone","A large breakfast removes any remaining effects","Coffee restores normal reaction times"],e:"Dehydration, poor sleep and the after-effects of alcohol can impair judgement and coordination after the alcohol has cleared."},
{q:"Why might a pilot be advised not to fly soon after giving blood?",o:["The reduced blood volume can cause faintness","It raises the risk of carbon monoxide poisoning","It affects night vision only","It increases blood alcohol"],e:"Losing blood temporarily reduces circulating volume and can cause light-headedness. Check current guidance with your AME before flying."},
{q:"Which is a typical effect of mild dehydration on a pilot?",o:["Fatigue, headache and reduced concentration","Better night vision","Improved tolerance to G","No effect at all"],e:"Even mild dehydration affects concentration and increases fatigue. Take water on longer flights, especially in a warm cockpit."}
]});

extendTopic("hp", "processing", { qs:[
{type:"order", q:"Put the stages of a simple information-processing model in order.", items:["The senses detect a stimulus","Perception: the brain interprets what was sensed","Decision: choose what to do","Response: carry out the action"],
  e:"Errors can creep in at every stage: missing a stimulus, misinterpreting it, choosing badly, or doing the wrong thing."},
{type:"order", q:"When things get busy, put a pilot's priorities in order.", items:["Aviate: fly the aircraft","Navigate: know where you are going","Communicate: talk to ATC and others"],
  e:"Control first. Radio calls never take priority over keeping the aircraft flying safely."},
{q:"A pilot reaches for the flap lever when meaning to adjust the trim, because the levers are in different places in the club's other aircraft. This is best described as:",o:["A habit or environmental capture error, linked to motor programmes","Hypoxia","A violation","Confirmation bias"],e:"Well-practised actions can run automatically in the wrong context, especially when switching between aircraft types."},
{q:"What is selective attention?",o:["Focusing on some information while filtering out the rest","Paying equal attention to everything","Only listening to ATC","Recalling information from long-term memory"],e:"Selective attention is necessary, but the filter can screen out something important, such as a radio call or a warning light."}
]});

extendTopic("hp", "decisions", { qs:[
{type:"match", q:"Match each hazardous attitude to its antidote.", pairs:[["Anti-authority","Follow the rules; they are usually right"],["Impulsivity","Not so fast. Think first"],["Invulnerability","It could happen to me"],["Macho","Taking chances is foolish"],["Resignation","I'm not helpless. I can make a difference"]],
  e:"Recognising the attitude in your own thinking is the first step; saying the antidote to yourself is the second."},
{type:"order", q:"Put the steps of the DODAR decision model in order.", items:["Diagnose","Options","Decide","Assign tasks","Review"],
  e:"Fly the aircraft first. Then use DODAR when there is time to think the problem through."},
{q:"What is a violation?",o:["A deliberate departure from rules or procedures","An honest mistake in planning","A slip caused by distraction","A memory lapse"],e:"Slips, lapses and mistakes are unintentional. A violation is deliberate, even if the person believes it is harmless."},
{q:"In threat and error management, which of these is an example of a threat?",o:["Deteriorating weather at the destination","Forgetting to set the QNH","Selecting the wrong frequency","Misreading the fuel gauge"],e:"Threats come from outside the pilot (weather, terrain, traffic, an unfamiliar airfield). The other three are errors the pilot makes."}
]});
