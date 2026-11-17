// 090 Communications: extra questions and hands-on diagrams
extendTopic("comms", "phonetics", { try:[["phonetic", "Spell a callsign"], ["numbers", "Say it on the radio"]], qs:[
{type:"match", q:"Match each letter to its phonetic word.", pairs:[["J","Juliett"],["Y","Yankee"],["K","Kilo"],["F","Foxtrot"],["I","India"]],
  e:"The ICAO alphabet uses these exact spellings, including Alfa and Juliett."},
{q:"ATC passes \"QNH one zero zero tree\". What is the QNH?",o:["1003 hPa","1033 hPa","1030 hPa","1013 hPa"],e:"'Tree' is the radio pronunciation of 3: one zero zero three."},
{q:"The time is 14:27 UTC and there is no risk of confusion about the hour. How is it normally spoken?",o:["Two seven","One four two seven","Twenty-seven past two","One four point two seven"],e:"Normally only the minutes are given. The hour is added when there could be confusion."},
{q:"How is a heading of 005° transmitted?",o:["Heading zero zero fife","Heading fife","Heading five degrees","Heading zero fife"],e:"Headings are always three digits, spoken separately, with 'fife' for 5."},
{q:"How is the letter W spelt phonetically?",o:["Whiskey","William","Wilco","Whisky"],e:"The ICAO spelling is 'Whiskey', with an e. Other words like 'William' come from older or non-aviation alphabets."}
]});

extendTopic("comms", "words", { qs:[
{type:"match", q:"Match each standard word or phrase to its meaning.", pairs:[["AFFIRM","Yes"],["NEGATIVE","No, or permission not granted"],["WILCO","I understand and will comply"],["STANDBY","Wait and I will call you"],["SAY AGAIN","Repeat your last transmission"]],
  e:"ROGER is not on this list because it only acknowledges receipt; it answers nothing."},
{q:"You make an error during a transmission. What should you say?",o:["Correction, followed by the correct version","Say again","Disregard, then switch off","Negative, then start a new call later"],e:"'Correction' means an error has been made in this transmission and the correct version follows."},
{q:"What does \"I say again\" mean?",o:["I am repeating for clarity or emphasis","Please repeat your message","I did not understand","I am cancelling my last message"],e:"'I say again' is used by the sender to repeat. 'Say again' asks the other station to repeat."},
{q:"What is \"BREAK\" used for?",o:["To separate parts of a message, or messages to different stations","To end a radio exchange","To request radio silence","To declare an emergency"],e:"BREAK marks a separation within a transmission, for example between instructions to two different aircraft."},
{q:"What does \"APPROVED\" mean?",o:["Permission for the proposed action is granted","I have received your message","Yes, that is correct","The clearance is cancelled"],e:"APPROVED grants a request, for example 'Golf-CD, orbit overhead approved'."}
]});

extendTopic("comms", "readback", { qs:[
{type:"order", q:"ATC: \"Golf-CD, climb altitude three thousand feet, squawk four five two one, QNH one zero one two.\" Put your readback in the correct order.", items:["Climb altitude three thousand feet","Squawk four five two one","QNH one zero one two","Golf-CD"],
  e:"Read back in the order given, and finish with your callsign."},
{q:"ATC: \"Golf-CD, hold short runway 27.\" What is the correct reply?",o:["Hold short runway 27, Golf-CD","Roger, Golf-CD","Wilco, Golf-CD","Golf-CD"],e:"Instructions to hold short of an active runway must be read back in full."},
{q:"ATC: \"Golf-CD, report final.\" Which reply is correct?",o:["Wilco, Golf-CD","Report final, Golf-CD, cleared to land","Roger, final","Affirm, Golf-CD"],e:"A request to report doesn't need a readback: WILCO confirms you'll do it."},
{q:"With a landing clearance, ATC also gives the surface wind. What do you read back?",o:["The clearance and the runway; the wind need not be read back","Only the wind","Everything, including the wind","Only your callsign"],e:"Landing clearances are on the readback list; the surface wind is information and is not."},
{q:"ATC: \"Golf-CD, line up and wait runway 25.\" What may you do?",o:["Enter the runway and line up, but not take off","Take off when ready","Hold at the holding point","Cross the runway"],e:"Line up and wait means enter and line up only. Take-off needs a separate clearance using the words 'cleared for take-off'."}
]});

extendTopic("comms", "services", { qs:[
{type:"match", q:"Match each station suffix to the service it provides.", pairs:[["TOWER","Aerodrome control"],["GROUND","Ground movement control"],["APPROACH","Approach control"],["INFORMATION","Flight information service"],["RADIO","Air/ground communication service"]],
  e:"The suffix tells you what to expect: control and clearances, information only, or an air/ground radio operator."},
{q:"For which flights is the UK Deconfliction Service intended?",o:["IFR flights","VFR flights in the circuit","Flights inside controlled airspace only","Gliders"],e:"Deconfliction Service gives traffic information plus avoiding-action advice and is intended for IFR flight. VFR pilots usually take Basic or Traffic Service."},
{q:"Under a Traffic Service, ATC reports traffic in your 12 o'clock, 3 miles, opposite direction. Who decides what to do about it?",o:["The pilot","The controller","The other aircraft's pilot","Whoever spots the other first"],e:"Under Traffic Service the controller gives information; avoiding action is the pilot's decision."},
{q:"You are receiving a Traffic Service and want to change to a Basic Service. What should you do?",o:["Tell the controller and agree the change","Simply stop listening","Change squawk to 7000 without telling ATC","Switch frequency"],e:"The type of service is agreed between pilot and controller, and changes are agreed and read back too."},
{q:"An aerodrome uses the callsign suffix INFORMATION. What does that tell you about landing?",o:["The FISO gives information; the decision to land is yours","You need a landing clearance from the FISO","The aerodrome is closed","Only ATC-cleared aircraft may land"],e:"An aerodrome FISO gives information to help you, but doesn't issue landing or take-off clearances."}
]});

extendTopic("comms", "emergency", { qs:[
{type:"order", q:"Put the main parts of a MAYDAY message in order, after \"MAYDAY MAYDAY MAYDAY\" and the station addressed.", items:["Callsign","Aircraft type","Nature of the emergency","Intentions","Position, height and heading","Pilot qualification"],
  e:"Then other useful information such as persons on board and endurance. If time is short, say what you can; the order helps the controller, but getting the call out matters most."},
{q:"When should you select squawk 7700?",o:["In an emergency, unless ATC has already given you a code","Whenever you are uncertain of your position","On every flight outside controlled airspace","When your radio fails"],e:"7700 alerts every radar unit to an emergency. If you are already working ATC on a discrete code, keep it unless told otherwise."},
{q:"ATC asks you to use the speechless procedure. What does that mean?",o:["Your transmitter carrier is heard but not your voice, so you answer by pressing the transmit button a set number of times","You must stop transmitting completely","You should squawk 7600 and land","You should switch to 121.5"],e:"If ATC can hear your carrier but no speech, they can ask yes/no questions and you reply with presses of the transmit button."},
{q:"You are uncertain of your position but not in danger. What is the most suitable call?",o:["A PAN, or ask for a training fix, on 121.5 MHz or the frequency in use","A MAYDAY","No call; keep looking","Squawk 7500"],e:"PAN covers an urgent situation without immediate danger. 121.5 MHz is staffed to help, and asking early is the right thing to do."}
]});

extendTopic("comms", "vhf", { qs:[
{type:"calc", gen:() => { const h = [900, 1600, 2500, 3600][rnd(0, 3)], r = 1.23 * Math.sqrt(h);
  return { q:`At ${h.toLocaleString("en-GB")} ft over flat ground, roughly how far away can you expect to talk to a ground station? (nearest nm)`, a:Math.round(r), tol:2, unit:" nm",
    steps:[`Range ≈ 1.23 × √height in feet`, `√${h} = ${Math.sqrt(h)}`, `1.23 × ${Math.sqrt(h)} = ${r.toFixed(1)} nm`] }; },
  e:"Climbing improves VHF range. High ground between you and the station can block it whatever the range."},
{type:"order", q:"Put the parts of a UK FIS freecall in order, after you've been asked to pass your message.", items:["Callsign","Aircraft type","Departure point","Destination","Position","Altitude and altimeter setting","Flight rules","Request or intentions"],
  e:"Giving the details in the expected order lets the controller write them down quickly."},
{q:"What does \"pass your message\" mean?",o:["Go ahead with the details of your flight or request","Change to another frequency","Repeat your callsign only","Stop transmitting"],e:"It invites you to give your full message now that the controller is ready."},
{q:"What is the squelch control for?",o:["To silence background noise when no one is transmitting","To make your transmissions louder","To change frequency","To set the transponder"],e:"Squelch cuts the hiss on an idle frequency. Set too high it can also cut out weak transmissions."}
]});

// Air Law: hands-on cruising-level diagram
extendTopic("airlaw", "altimetry", { try:[["semicircular", "Pick a cruising level"]] });
