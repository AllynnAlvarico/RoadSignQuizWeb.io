let currentQuestionIndex = 0;
let isBasicMode = true;
let correctAnswer;  // Track the correct answer
let score = 0;

const path = '.\\resource\\images\\';

const basicModeButton = document.getElementById('default-mode');
const advancedModeButton = document.getElementById('picture-mode');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextQuestionButton = document.getElementById('next-question');
const quizHeading = document.getElementById('quiz-heading');
const scoreElement = document.getElementById('score');
const quizlengthElement = document.getElementById('quiz-length-container');
const checkAnswerElement = document.getElementById('check-answer');
const correctAnswerElement = document.getElementById('correct-answer');

const roadSigns = [
    // Road Signs Ireland
    { title: "Dangerous corner ahead", imagePath: path + "sharp-curve-to-the-left.png" },
    { title: "Roundabout ahead", imagePath: path + "roundabout.png" },
    { title: "Mini-Roundabout ahead", imagePath: path + "Mini-roundabout-ahead-300x300.png" },
    { title: "Merging Traffic", imagePath: path + "Merging-traffic.png" },
    { title: "Two-way Traffic", imagePath: path + "Two-way-traffic.png" },
    { title: "Dangerous bend ahead", imagePath: path + "Dangerous bend ahead.webp" },
    { title: "Series of dangerous bends ahead", imagePath: path + "Series-of-dangerous-bends-ahead.webp" },
    { title: "Series of dangerous corners ahead", imagePath: path + "Series-of-dangerous-corners-ahead.webp" },
    { title: "Restricted headroom", imagePath: path + "Restricted-headroom.png" },
    { title: "T-junction", imagePath: path + "T-junction-1.png" },
    // Junction Signs
    { title: "Crossroad", imagePath: path + "crossroads.png" },
    { title: "Side road", imagePath: path + "Sideroad.png" },
    { title: "T-junction", imagePath: path + "T-junction-1.png" },
    { title: "Y-junction", imagePath: path + "Y-junction-1.png" },
    { title: "Staggered crossroads", imagePath: path + "Staggered-crossroads.png" },
    // Advanced Warning Signs of Roads
    { title: "T-junction of a dual carriageway", imagePath: path + "T-junctions-of-a-dual-carriageway-300x300.png" },
    { title: "Crossroad with dual carriageway", imagePath: path + "Crossroads-with-dual-carriageway-300x300.png" },
    { title: "Crossroad", imagePath: path + "crossroads-1.png" },
    // General Warning Signs
    { title: "Drive on left", imagePath: path + "Drive-on-left-2.png" },
    { title: "Safe height plate", imagePath: path + "Safe-height-plate.png" },
    { title: "Low-flying aircrafts", imagePath: path + "Low-flying aircrafts-300x300.png" },
    { title: "Road divides", imagePath: path + "Road-divides.png" },
    { title: "Merging/diverging traffic", imagePath: path + "Merging-diverging-traffic-300x300.png" },
    { title: "Dual carriage ends", imagePath: path + "Dual-carriage-ends.png" },
    { title: "Traffic crossover ahead", imagePath: path + "Traffic-crossover-ahead-300x300.png" },
    { title: "Overhead electric cables", imagePath: path + "Overhead-electric-cables-1-300x300.png" },
    { title: "Traffic signals ahead", imagePath: path + "Traffic-signals-ahead-300x300.png" },
    { title: "Pedestrian crossing ahead", imagePath: path + "Pedestrian-crossing-ahead.png" },
    { title: "Slippery road ahead", imagePath: path + "Slippery-road-ahead-300x300.png" },
    { title: "Road narrows on both sides", imagePath: path + "Road-narrows-on-both-sides-300x300.png" },
    { title: "Road narrows from left", imagePath: path + "Road-narrows-from-left-300x300.png" },
    { title: "Road narrows from right", imagePath: path + "Road-narrows-from-right-300x300.png" },
    { title: "Tunnel ahead", imagePath: path + "Tunnel-ahead-300x300.png" },
    { title: "Cyclists", imagePath: path + "Cyclists-300x300.png" },
    { title: "Start of a passing lane", imagePath: path + "Start-of-a-passing-lane-300x300.png" },
    { title: "Lane loss", imagePath: path + "Lane-loss.png" },
    { title: "Start of a climbing lane", imagePath: path + "Start-of-a-climbing-lane.png" },
    { title: "Loop road ahead", imagePath: path + "Loop-road-ahead-150x150.png" },
    { title: "Sharp dip ahead", imagePath: path + "Sharp-dip-ahead.png" },
    { title: "Series of bumps ahead", imagePath: path + "Series-of-bumps-ahead-300x300.png" },
    { title: "Sharp rise ahead", imagePath: path + "Sharp-rise-ahead.png" },
    { title: "Wild animals ahead", imagePath: path + "Wild-animals-ahead-300x300.png" },
    { title: "Sheep", imagePath: path + "Sheep-300x300.png" },
    { title: "Cattle and farm animals", imagePath: path + "Cattle-and-farm-animals-300x300.png" },
    { title: "Accompanied horses and ponies", imagePath: path + "Accompanied-horses-and-ponies-300x300.png" },
    { title: "Crosswinds", imagePath: path + "Crosswinds.png" },
    { title: "Steep descent ahead", imagePath: path + "Steep-descent-ahead-300x300.png" },
    { title: "Steep ascent ahead", imagePath: path + "Steep-ascent-ahead-300x300.png" },
    { title: "Danger of falling rocks", imagePath: path + "Danger-of-falling-rocks-300x300.png" },
    { title: "Unprotected quay, canal or river", imagePath: path + "Unprotected-quay-canal-or-river.png" },
    { title: "Level crossing ahead, guarded by gates or lifting barrier", imagePath: path + "Level-crossing-ahead-guarded-by-gates-or-lifting-barrier-300x300.png" },
    { title: "Level crossing ahead, unguarded by gates or lifting barrier", imagePath: path + "Level-crossing-ahead-unguarded-by-gates-or-lifting-barrier-300x300.png" },
    { title: "Level crossing ahead, guarded by gates or lifting barriers", imagePath: path + "Level-crossing-ahead-guarded-by-gates-or-lifting-barriers-300x300.png" },
    { title: "Stop when lights are red", imagePath: path + "Stop-when-lights-are-red-1.png" },
    { title: "Automatic level crossing ahead", imagePath: path + "Automatic-level-crossing-ahead-1.png" },
    { title: "Chevron board (left)", imagePath: path + "Chevron-board-left.png" },
    { title: "Chevron board (right)", imagePath: path + "Chevron-board-right-1.png" },
    // Tram Signs
    { title: "Tram lane crossing ahead", imagePath: path + "Tram-lane-crossing-ahead-300x300.png" },
    { title: "Tram lane warning signs for pedestrians (look left)", imagePath: path + "Tram-lane-warning-signs-for-pedestrians-look-left-1.png" },
    { title: "Tram lane warning signs for pedestrians (look both sides)", imagePath: path + "Tram-lane-warning-signs-for-pedestrians-look-both-sides-1.png" },
    { title: "Tram lane warning signs for pedestrians (look right)", imagePath: path + "Tram-lane-warning-signs-for-pedestrians-look-right.png" },
    { title: "Slippery for cyclists", imagePath: path + "Slippery-for-cyclists.png" },
    // Warning signs for schools and children
    { title: "School ahead", imagePath: path + "School-ahead-300x300.png" },
    { title: "School children crossing ahead", imagePath: path + "School-children-crossing-ahead.png" },
    { title: "Children crossing ahead (in residential areas)", imagePath: path + "Children-crossing-ahead.png" },
    //======================================= Warning signs for road work =======================================
    { title: "Road works ahead", imagePath: path + "Road-works-ahead-1-300x300.png" },
    { title: "One-lane crossover (out)", imagePath: path + "One-lane-crossover-out.png" },
    { title: "One-lane crossover (back)", imagePath: path + "Diamond_road_sign_one-lane_crossover_back.svg-300x300.png" },
    { title: "Move to right (one lane)", imagePath: path + "Move-to-right-one-lane-1.png" },
    { title: "Move to left (one lane)", imagePath: path + "Move-to-left-one-lane-1.png" },
    { title: "Move to right (two lanes)", imagePath: path + "Move-to-left-two-lanes-3.png" },
    { title: "Move to left (two lanes)", imagePath: path + "Move-to-right-two-lanes.png" },
    { title: "Obstruction between lanes", imagePath: path + "Obstruction-between-lanes-1.png" },
    { title: "End of obstruction between lanes", imagePath: path + "End-of-obstruction-between-lanes-2.png" },
    { title: "Start of central reserve or obstruction", imagePath: path + "Startofcentralreserve.png" },
    { title: "End of central reserve or obstruction", imagePath: path + "Endofobstructionbetweenlanes.png" },
    { title: "Lanes diverge at crossover", imagePath: path + "Lanes-diverge-at-crossover.png" },
    { title: "Lanes rejoin at crossover", imagePath: path + "Lanes-rejoin-at-crossover.png" },
    { title: "Two-lanes crossover (back)", imagePath: path + "Two-lanes-crossover-back-150x150.png" },
    { title: "Two-lanes crossover (out)", imagePath: path + "Two-lanes-crossover-out-1.png" },
    { title: "Single-lane (for shuttle working)", imagePath: path + "Single-lane-for-shuttle-working.png" },
    { title: "Two-way traffic", imagePath: path + "Two-way-traffic-1.png" },
    { title: "Road narrows from left", imagePath: path + "Road-narrows-from-left.png" },
    { title: "Road narrows from right", imagePath: path + "Road-narrows-from-right.png" },
    { title: "Road narrows on both sides", imagePath: path + "Road-narrows-on-both-sides.png" },
    { title: "Offside lane (of two) closed", imagePath: path + "Offside-lane-of-two-closed.png" },
    { title: "Nearside lane (of two) closed", imagePath: path + "a_3yPcS-300x300.png" },
    { title: "Offside lane (of three) closed", imagePath: path + "Offside-lane-of-three-closed.png" },
    { title: "Nearside lane (of three) closed", imagePath: path + "as-300x300.png" },
    { title: "Two offside lanes (of three) closed", imagePath: path + "Two-offside-lanes-of-three-closed.png" },
    { title: "Two nearside lanes (of three) closed", imagePath: path + "Two-nearside-lanes-of-three-closed.-Two-alternative-styles.png" },
    { title: "Offside lane (of four) closed", imagePath: path + "Offside-lane-of-four-closed-1.png" },
    { title: "Nearside lane (of four) closed", imagePath: path + "WK046-300x300.png" },
    { title: "Two offside lanes (of four) closed", imagePath: path + "Two-offside-lanes-of-four-closed-1.png" },
    { title: "Two nearside lanes (of four) closed", imagePath: path + "Two-nearside-lanes-of-four-closed-1.png" },
    { title: "Side road on left", imagePath: path + "Side-road-on-left-1.png" },
    { title: "Side road on right", imagePath: path + "Side-road-on-right-2.png" },
    { title: "Site access on left", imagePath: path + "Site-access-on-left-300x300.png" },
    { title: "Site access on right", imagePath: path + "ssfdf-300x300.png" },
    { title: "Temporary traffic signal ahead", imagePath: path + "Temporary-traffic-signal-ahead.png" },
    { title: "Flagman ahead", imagePath: path + "Flagman-ahead-300x300.png" },
    { title: "Slippery road", imagePath: path + "Slippery-road-300x300.png" },
    { title: "Loose chippings", imagePath: path + "Loose-chippings.png" },
    { title: "Queues likely", imagePath: path + "Queues-likely.png" },
    { title: "Hump or ramp", imagePath: path + "Hump-or-ramp.png" },
    { title: "Pedestrian cross to right", imagePath: path + "Pedestrian-cross-to-right-300x300.png" },
    { title: "Overhead electric cables", imagePath: path + "Overhead-electric-cables-2.png" },
    { title: "Pedestrian cross to left", imagePath: path + "Pedestrian-cross-to-left-300x300.png" },
    { title: "Uneven surface", imagePath: path + "Uneven-surface-3-300x300.png" },
    { title: "Detour ahead", imagePath: path + "Detour-ahead-1.png" },
    { title: "Detour to left", imagePath: path + "Detour-to-left-300x300.png" },
    { title: "Detour to right", imagePath: path + "Detour-to-right-300x300.png" },
    { title: "Road closed", imagePath: path + "Road-closed-300x300.png" },
    { title: "Diverted traffic left", imagePath: path + "Diverted-traffic-left-300x300.png" },
    { title: "Diverted traffic", imagePath: path + "Diverted-traffic-300x300.png" },
    { title: "Diverted traffic", imagePath: path + "Diverted-traffic.png" },
    { title: "Diverted traffic", imagePath: path + "Diverted-traffic-1.png" },
    { title: "End of detour", imagePath: path + "End-of-detour-1.png" },
    { title: "Detour destination", imagePath: path + "Detour-destination-300x300.png" },
    // Informative Signs for work at road
    { title: "Distance", imagePath: path + "Distance-1.png" },
    { title: "Length", imagePath: path + "Length.png" },
    { title: "Direction", imagePath: path + "Direction-1.png" },
    { title: "Direction and distance", imagePath: path + "Direction-and-distance.png" },
    { title: "Slow", imagePath: path + "Go-mall-300x300.png" },
    { title: "End", imagePath: path + "Direction-and-distance-1.png" },
    { title: "Cautionary speed", imagePath: path + "Cautionary-speed-1.png" },
    { title: "Type of works", imagePath: path + "Type-of-works.png" },
    { title: "Use hard shoulder", imagePath: path + "Use-hard-shoulder.png" },
    { title: "Unfinished road surface", imagePath: path + "Unfinished-road-surface-300x300.png" },
    { title: "Barrier board", imagePath: path + "Barrier-board-300x300.png" },
    { title: "Concealed Entrance", imagePath: path + "Concealed-Entrance-300x300.png" },
    { title: "Chevron board", imagePath: path + "Chevron-board-1.png" },
    { title: "Speed limit ahead", imagePath: path + "Speed-limit-ahead.png" },
    { title: "Speed limit ahead", imagePath: path + "Hard-shoulder-closed-1.png" },
    // Manual Signs for Traffic control at road
    { title: "Flagman ahead", imagePath: path + "Flagman-ahead-1-300x300.png" },
    { title: "Stop", imagePath: path + "Stop-300x300.png" },
    { title: "Either form of go can be used", imagePath: path + "Either-form-of-go-can-be-used-2.png" },
    { title: "Either form of téigh can be used", imagePath: path + "Either-form-of-teigh-can-be-used-1.png" },
    // Regulatory Traffic Signs
    { title: "Stop", imagePath: path + "Stop-1-300x300.png" },
    { title: "Yield", imagePath: path + "Yield-1.png" },
    { title: "School wardens stop sign", imagePath: path + "School-wardens-stop-sign-300x300.png" },
    { title: "Parking prohibited", imagePath: path + "Parking-prohibited.png" },
    { title: "No left turn", imagePath: path + "No-left-turn-300x300.png" },
    { title: "No entry or ‘No straight ahead’", imagePath: path + "No-entry-or-‘No-straight-ahead-300x300.png" },
    { title: "No right turn", imagePath: path + "No-right-turn-300x300.png" },
    { title: "Clearway", imagePath: path + "Clearway-300x300.png" },
    { title: "Speed Limit 30", imagePath: path + "Max-speed-limit-30kmh-300x300.png" },
    { title: "Speed Limit 50", imagePath: path + "Max-speed-limit-50kmh-300x300.png" },
    { title: "Speed Limit 60", imagePath: path + "Max-speed-limit-60kmh-300x300.png" },
    { title: "Speed Limit 80", imagePath: path + "Max-speed-limit-80kmh-300x300.png" },
    { title: "Speed Limit 100", imagePath: path + "Max-speed-limit-100kmh-300x300.png" },
    { title: "Speed Limit 120", imagePath: path + "Max-speed-limit-120kmh-300x300.png" },
    { title: "No ridden or accompanied horses", imagePath: path + "No-ridden-or-accompanied-horses-300x300.png" },
    { title: "No bicycles", imagePath: path + "No-bicycles-300x300.png" },
    { title: "Maximum gross weight", imagePath: path + "No-entry-for-large-vehicles-by-reference-to-weight.png" },
    { title: "Maximum vehicle length", imagePath: path + "Maximum-vehicle-length-1.png" },
    { title: "No entry to vehicles", imagePath: path + "No-entry-to-vehicles-300x300.png" },
    { title: "Maximum vehicle width", imagePath: path + "Maximum-vehicle-width-300x300.png" },
    { title: "Maximum axle weight", imagePath: path + "Maximum-axle-weight-300x300.png" },
    { title: "No overtaking for three-axle vehicles", imagePath: path + "No-overtaking-for-three-axle-vehicles.png" },
    { title: "No horse carriages", imagePath: path + "No-horse-carriages-300x300.png" },
    { title: "Height restriction", imagePath: path + "Height-restriction-1-300x300.png" },
    { title: "No overtaking", imagePath: path + "No-overtaking-for-three-axle-vehicles-300x300.png" },
    { title: "Taxi rank", imagePath: path + "Taxi-rank-300x300.png" },
    { title: "No entry for large vehicles", imagePath: path + "No-entry-for-large-vehicles-by-reference-to-weight.png" },
    { title: "No U-Turn", imagePath: path + "No-U-Turn-300x300.png" },
    { title: "End of the restriction zone", imagePath: path + "End-of-the-restriction-zone.png" },
    { title: "Parking permitted", imagePath: path + "Parking-permitted.png" },
    { title: "Pedestrianised street", imagePath: path + "Pedestrianised-street.png" },
    { title: "Zonal restriction", imagePath: path + "Zonal-restriction-–-parking-of-large-vehicles.png" },
    { title: "Disc parking plate", imagePath: path + "Disc-parking-plate.png" },
    // Mandatory Turns at Junctions
    { title: "Turn left ahead", imagePath: path + "Turn-left-ahead.webp" },
    { title: "Turn right ahead", imagePath: path + "Turn-right-ahead.webp" },
    { title: "Turn left", imagePath: path + "Turn-left.webp" },
    { title: "Turn right", imagePath: path + "Turn-right.webp" },
    { title: "Straight ahead", imagePath: path + "Straight-ahead.webp" },
    { title: "Keep left", imagePath: path + "Keep-left.webp" },
    { title: "Keep right", imagePath: path + "Keep-right.webp" },
    { title: "Pass either side", imagePath: path + "Pass-either-side.webp" },
    { title: "Mini roundabout", imagePath: path + "Mini-roundabout.webp" },
    // Other Manual Work Signs for work at road
    { title: "Stop", imagePath: path + "Stop-300x300.png" },
    { title: "Either form of go", imagePath: path + "Either-form-of-go-can-be-used-2.png" },
    { title: "Either form of téigh", imagePath: path + "Either-form-of-teigh-can-be-used-1.png" },
    { title: "No entry for pedestrians to tramway", imagePath: path + "No-entry-for-pedestrians-to-tramway.png" },
    { title: "No entry to goods vehicles", imagePath: path + "No-entry-to-goods-vehicles-by-reference-to-number-of-axles-300x300.png" },
    { title: "Contra flow bus lane", imagePath: path + "Contra-flow-bus-lane-1.png" },
    { title: "With flow bus lane on left", imagePath: path + "With-flow-bus-lane-on-left.png" },
    { title: "With flow bus lane on right", imagePath: path + "With-flow-bus-lane-on-right.png" },
    { title: "Tram lane on left", imagePath: path + "Tram-lane-on-left.png" },
    { title: "Tram lane on right", imagePath: path + "Tram-lane-on-right.png" },
    { title: "Start of cycle track", imagePath: path + "Start-of-cycle-track.png" },
    { title: "End of cycle track", imagePath: path + "End-of-cycle-track.png" },
    { title: "Tram only street ireland", imagePath: path + "Tram-only-street-ireland.png" },
    { title: "Turn back", imagePath: path + "Turn-back-1.png" },
    { title: "Bus only street", imagePath: path + "Bus-only-street.png" },
    { title: "Pedestrians and bicycles only", imagePath: path + "Pedestrians-and-bicycles-only-300x300.png" },
    { title: "Separate bicycle and pedestrian lanes", imagePath: path + "Separate-bicycle-and-pedestrian-lanes.png" },
    // Traffic Lane Signs
    { title: "Go (Lane open)", imagePath: path + "Go-Lane-open.png" },
    { title: "Stop (Lane closed)", imagePath: path + "Stop-Lane-closed.png" },
    { title: "Move into the right-hand lane", imagePath: path + "Move-into-the-right-hand-lane.png" },
    { title: "Move into the left-hand lane", imagePath: path + "Move-into-the-left-hand-lane-1.png" },
    //Advance Information Signs
    { title: "Motorway", imagePath: path + "Motorway-1.png" },
    { title: "National road", imagePath: path + "National-road.png" },
    { title: "Regional road", imagePath: path + "Regional-road.png" },
    { title: "National road", imagePath: path + "National-road1.png" },
    { title: "Lane destination sign", imagePath: path + "Lane-destination-sign.png" },
    { title: "Dublin Port Tunnel ahead", imagePath: path + "Dublin-Port-Tunnel-ahead.png" },
    // Advance Direction Signs
    { title: "Motorway direction sign", imagePath: path + "Motorway-direction-sign.png" },
    { title: "National road direction signs", imagePath: path + "National-road-direction-signs.png" },
    { title: "Regional road direction sign", imagePath: path + "Regional-road-direction-sign.png" },
    { title: "Local road direction sign", imagePath: path + "Local-road-direction-sign.png" },
    { title: "Town or village sign", imagePath: path + "Town-or-village-sign.png" },
    { title: "Destination distance sign", imagePath: path + "Destination-distance-sign.png" },
    { title: "Slow lane sign", imagePath: path + "Slow-lane-sign-1.png" },
    { title: "Cul-de-sac", imagePath: path + "Cul-de-sac.png" },
    { title: "Disabled persons parking bay", imagePath: path + "Disabled-persons-parking-bay.png" },
    { title: "Airport symbol", imagePath: path + "Airport-symbol.png" },
    { title: "Industrial estate symbol", imagePath: path + "Industrial-estate-symbol.png" },
    { title: "Ferry symbol", imagePath: path + "Ferry-symbol-1.png" },
    { title: "Alternative route for high vehicles", imagePath: path + "Alternative-route-for-high-vehicles.png" },
    { title: "Lay-by ahead sign", imagePath: path + "Lay-by-ahead-sign-1.png" },
    { title: "Hospital ahead sign", imagePath: path + "Hospital-ahead-sign-1.png" },
    { title: "Lay-by sign", imagePath: path + "Lay-by-sign.png" },
    { title: "Hospital sign", imagePath: path + "Hospital-sign.png" },
    { title: "SOS lay-by", imagePath: path + "SOS-lay-by-1.png" },
    { title: "Car park with facilities for disabled person", imagePath: path + "Car-park-with-facilities-for-disabled-person-1.png" },
    { title: "Speed camera", imagePath: path + "Speed-camera-2.png" },
    { title: "Advance information sign for low clearance", imagePath: path + "Advance-information-sign-for-low-clearance-1.png" },
    { title: "Alternative route for heavy vehicles", imagePath: path + "Alternative-route-for-heavy-vehicles.png" },
    { title: "Traffic calming sign", imagePath: path + "Traffic-calming-sign-1.png" },
    { title: "Speed limit change ahead", imagePath: path + "Speed-limit-change-ahead.png" },
    // Motorway Signs
    { title: "Motorway ahead", imagePath: path + "Motorway-ahead.png" },
    { title: "Motorway ahead", imagePath: path + "Motorway-ahead-1.png" },
    { title: "Advance direction sign", imagePath: path + "Advance-direction-sign-1.png" },
    { title: "100m to next exit", imagePath: path + "100m-to-next-exit-1.png" },
    { title: "200m to next exit", imagePath: path + "200m-to-next-exit-1.png" },
    { title: "300m to next exit", imagePath: path + "300m-to-next-exit-1.png" },
    { title: "The motorway ends 1km ahead", imagePath: path + "The-motorway-ends-1km-ahead-1.png" },
    { title: "Motorway ends 500m ahead", imagePath: path + "Motorway-ends-500m-ahead.png" },
    { title: "End of motorway", imagePath: path + "End-of-motorway-1.png" },
    { title: "Route confirmatory sign for M7", imagePath: path + "Route-confirmatory-sign-for-M7.png" },
    { title: "Advance direction for destination", imagePath: path + "Advance-direction-for-destination.png" },
    { title: "Entry to motorway", imagePath: path + "Entry-to-motorway.png" },
    { title: "Toll plaza ahead", imagePath: path + "Toll-plaza-ahead-1.png" },
    { title: "Toll charges", imagePath: path + "Toll-charges.png" },
    { title: "Toll plaza information sign", imagePath: path + "Toll-plaza-information-sign.png" },
    { title: "Garda only", imagePath: path + "Garda-only-1.png" },
    { title: "Authorized vehicles only", imagePath: path + "Authorized-vehicles-only.png" },
    { title: "Typical 2km next exit sign", imagePath: path + "Typical-2km-next-exit-sign.png" },
    { title: "Motorway service plaza", imagePath: path + "Motorway-service-plaza.png" },
    { title: "Route confirmatory sign with Euro Route marker plate", imagePath: path + "Route-confirmatory-sign-with-Euro-Route-marker-plate.png" },
    { title: "Typical lane gain sign", imagePath: path + "Typical-lane-gain-sign.png" },
];

function startQuiz(basicMode) {
    isBasicMode = basicMode;
    currentQuestionIndex = 0;
    quizContainer.style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const currentSign = roadSigns[currentQuestionIndex];

    correctAnswer = currentSign; // Track the correct answer
    quizHeading.textContent = `Question ${currentQuestionIndex + 1}`;
    quizlengthElement.textContent = `Number of signs ${roadSigns.length}`;

    if (isBasicMode) {
        questionText.innerHTML = `<img src="${currentSign.imagePath}" alt="Road Sign" style="max-width: 300px; max-height: 300px; height: auto; width: auto;">`;
    } else {
        questionText.textContent = `What does the sign titled '${currentSign.title}' look like?`;
    }

    const shuffledSigns = shuffleArray(roadSigns); // Shuffle the entire array of road signs to ensure random selection of options

    // Select the correct sign and get 3 random signs from the shuffled array
    const options = [currentSign, ...shuffledSigns.filter(sign => sign !== currentSign).slice(0, 3)];

    // Shuffle the options again so the correct answer appears in a random position
    const finalOptions = shuffleArray(options);

    // Clear previous options
    optionsContainer.innerHTML = '';
    checkAnswerElement.textContent = '';
    correctAnswerElement.textContent = '';



    // Display the options // lambda function
    finalOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = isBasicMode ? option.title : 'See Image';

        if (!isBasicMode) {
            button.innerHTML = `<img src="${option.imagePath}" alt="Road Sign" style="max-width: 100px; max-height: 100px; height: auto; width: auto;">`;
        }
        button.onclick = () => handleAnswer(option, button);
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(selectedOption, buttonClicked) {
    // checkAnswerElement.textContent = 'Waiting';
    // Compare the selected option with the correct answer
    if (isBasicMode) {
        if (selectedOption.title === correctAnswer.title) {
            score++;
            // alert('Correct!');
            checkAnswerElement.textContent = 'Correct';
            checkAnswerElement.style.color = "green";
        } else {

            // alert('Wrong answer, try again. You chose: ' + selectedOption.title);
            checkAnswerElement.textContent = 'Incorrect!';
            checkAnswerElement.style.color = "red";
            correctAnswerElement.textContent = 'Correct answer is: ' + correctAnswer.title;

        }
    } else {
        if (selectedOption.imagePath === correctAnswer.imagePath) {
            score++;
            alert('Correct!');
        } else {
            alert('Wrong answer, try again. You chose an image of: ' + selectedOption.title);
        }
    }

    // Disable all buttons after selection (correct or wrong)
    const allButtons = optionsContainer.querySelectorAll('button');
    allButtons.forEach(button => {
        button.disabled = true;  // Disable the button
    });

    // Update score on the screen
    scoreElement.textContent = score;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= roadSigns.length) {
        alert('Quiz Completed!');
        quizContainer.style.display = 'none';
    } else {
        displayQuestion();
    }
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

basicModeButton.onclick = () => startQuiz(true);
advancedModeButton.onclick = () => startQuiz(false);
nextQuestionButton.onclick = nextQuestion;