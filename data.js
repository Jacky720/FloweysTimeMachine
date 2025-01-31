// meta-info, state arrays
const basicBool = "checkbox",
      simpleDogStates = [
    "Initial state",
    "Killed",
    "Played fetch (Spared)"
],
      killedBool = [
    "Initial state",
    "Killed"
];

// Save structure
const iniIDs = [
    // Element ID, section, key
    // TODO: Consider restructuring as {section: {key: id}} or [id, values] or whatever
    
    // General
    ["ini-name",             "General", "Name"    ],
    ["ini-location",         "General", "Room"    ],
    ["ini-kills",            "General", "Kills"   ],
    ["ini-love",             "General", "Love"    ],
    ["ini-fun",              "General", "fun"     ],
    ["ini-gameover",         "General", "Gameover"],
    ["ini-asgore-deaths",    "Asgore",  "KillYou" ],
    ["ini-dodged-credits",   "reset",   "s_key"   ],
    ["ini-defeatedasriel",   "F7",      "F7"      ],
    ["ini-true-reset",       "reset",   "reset"   ],
    
    // Deja vu
    ["ini-toriel-pie",       "Toriel",  "Bscotch" ],
    ["ini-papyrus-met",      "Papyrus", "M1"      ],
    ["ini-papyrus-spared",   "Papyrus", "PS"      ],
    ["ini-papyrus-dated",    "Papyrus", "PD"      ],
    ["ini-undyne-dated",     "Undyne",  "UD"      ],
    ["ini-alphys-dated",     "Alphys",  "AD"      ],
    
    // Omega Flowey
    ["ini-omega-trapped",    "FFFFF",   "F"       ],
    ["ini-omega-soul",       "FFFFF",   "P"       ],
    ["ini-omega-deaths",     "FFFFF",   "D"       ],
    ["ini-omega-beat",       "FFFFF",   "E"       ],
    
    // Sans
    ["ini-sans-met",         "Sans",    "M1"      ],
    ["ini-papyrus-killed",   "Papyrus", "PK"      ],
    ["ini-sans-lv1",         "Sans",    "MeetLv1" ],
    ["ini-sans-lv2",         "Sans",    "MeetLv2" ],
    ["ini-sans-password",    "Sans",    "Pass"    ],
    ["ini-sans-level",       "Sans",    "MeetLv"  ],
    ["ini-sans-fights",      "Sans",    "F"       ],
    ["ini-sans-midpoint",    "Sans",    "MP"      ],
    ["ini-sans-dunk",        "Sans",    "SS"      ],
    ["ini-sans-undunk",      "Sans",    "SS2"     ],
    ["ini-sans-kill",        "Sans",    "SK"      ],
    
    // Flowey
    ["ini-flowey-met",       "Flowey",  "Met1"    ],
    ["ini-toriel-killed",    "Toriel",  "TK"      ],
    ["ini-toriel-spared",    "Toriel",  "TS"      ],
    ["ini-flowey-lecture",   "Flowey",  "FloweyExplain1"],
    ["ini-flowey-geno",      "Flowey",  "truename"],
    ["ini-flowey-geno",      "Flowey",  "alter2"  ], // I don't know if this works either
    ["ini-neutral-count",    "General", "Won"     ],
    ["ini-flowey-alter",     "Flowey",  "Alter"   ],
    ["ini-asgore-suicide",   "Flowey",  "SK"      ],
    ["ini-flowey-speech",    "EndF",    "EndF"    ],
    ["ini-flowey-kill",      "Flowey",  "K"       ],
    ["ini-flowey-gone",      "Flowey",  "SPECIALK"],
    ["ini-flowey-no-kills",  "Flowey",  "NK"      ],
    ["ini-flowey-i-kill",    "Flowey",  "IK"      ],
    ["ini-flowey-change",    "Flowey",  "CHANGE"  ],
    ["ini-flowey-asg-kill",  "Flowey",  "AK"      ],
    ["ini-alphys-date-fail", "Flowey",  "AF"      ],
    ["ini-flowey-extra",     "Flowey",  "EX"      ],
    
    // Speedrun strats (skipping certain scenes)
    ["ini-mett-opera",       "Mett",     "O"      ],
    ["ini-mett-fought",      "Mettaton", "BossMet"],
    ["ini-mett-essay",       "MTT",      "EssayNo"],
    ["ini-sans-met",         "Sans",     "EndMet" ],
    ["ini-under-tale",       "General",  "Tale"   ]
],
      flagOffset = 30, // UT flags start on line 31 and values[] is zero-indexed
      flagCount  = 512; // Counting 0; flag 512 isn't actually stored.

let fileStructure = [
    [
        "sav-name",
        "sav-love",
        "sav-hp",
        "sav-en",
        "sav-at",
        "sav-weaponat",
        "sav-df",
        "sav-armordf",
        "sav-speed",
        "sav-exp",
        "sav-gold",
        "sav-kills"
        // Additional entries added by loop below
    ],
    "flags",
    [
        "sav-plotvalue",
        "sav-haveitem",
        "sav-havestat",
        "sav-havecell",
        "sav-music",
        "sav-location",
        "sav-time"
    ]
];

for (let i = 1; i <= 8; i++) {
    fileStructure[0].push("sav-invslot" + i);
    fileStructure[0].push("sav-cellslot" + i);
}

fileStructure[0].push("sav-weapon");
fileStructure[0].push("sav-armor");

// Items and stats
const items = [
    "Empty",
    "Monster Candy",
    "Croquet Roll",
    "Stick",
    "Bandage",
    "Rock Candy",
    "Pumpkin Rings",
    "Spider Donut",
    "Stoic Onion",
    "Ghost Fruit",
    "Spider Cider",
    "Butterscotch Pie",
    "Faded Ribbon",
    "Toy Knife",
    "Tough Glove",
    "Manly Bandana",
    "Snowman Piece",
    "Nice Cream",
    "Puppydough Icecream",
    "Bisicle",
    "Unisicle",
    "Cinnamon Bun",
    "Temmie Flakes",
    "Abandoned Quiche",
    "Old Tutu",
    "Ballet Shoes",
    "Punch Card",
    "Annoying Dog",
    "Dog Salad",
    "Dog Residue (1)",
    "Dog Residue (2)",
    "Dog Residue (3)",
    "Dog Residue (4)",
    "Dog Residue (5)",
    "Dog Residue (6)",
    "Astronaut Food",
    "Instant Noodles",
    "Crab Apple",
    "Hot Dog...?",
    "Hot Cat",
    "Glamburger",
    "Sea Tea",
    "Starfait",
    "Legendary Hero",
    "Cloudy Glasses",
    "Torn Notebook",
    "Stained Apron",
    "Burnt Pan",
    "Cowboy hat",
    "Empty Gun",
    "Heart Locket",
    "Worn Dagger",
    "Real Knife",
    "The Locket",
    "Bad Memory",
    "Dream",
    "Undyne's Letter",
    "Undyne Letter EX",
    "Potato Chisps",
    "Junk Food",
    "Mystery Key",
    "Face Steak",
    "Hush Puppy",
    "Snail Pie",
    "temy armor",
    "<invalid>"
],
      weapons = {
    // "0": "Empty",
    "3": "Stick",
    "13": "Toy Knife",
    "14": "Tough Glove",
    "25": "Ballet Shoes",
    "45": "Torn Notebook",
    "47": "Burnt Pan",
    "49": "Empty Gun",
    "51": "Worn Dagger",
    "52": "Real Knife"
},
      armors = {
    // "0": "Empty",
    "4": "Bandage",
    "12": "Faded Ribbon",
    "15": "Manly Bandana",
    "24": "Old Tutu",
    "44": "Cloudy Glasses",
    "46": "Stained Apron",
    "48": "Cowboy Hat",
    "50": "Heart Locket",
    "53": "The Locket",
    "64": "temy armor"
},
      weaponAts = {
    "3": 0,   // stick
    "13": 3,  // toy knife
    "14": 5,  // tough glove
    "25": 7,  // ballet shoes
    "45": 2,  // torn notebook
    "47": 10, // burnt pan
    "49": 12, // empty gun
    "51": 15, // worn dagger
    "52": 99  // Real Knife
},
      armorAts = {
    "48": 5, // cowboy hat
    "64": 10 // temy armor
},
      armorDfs = {
    "4": 0,   // bandage
    "12": 3,  // faded ribbon
    "15": 7,  // manly bandana
    "24": 10, // old tutu
    "44": 6,  // clouded glasses
    "46": 11, // stained apron
    "48": 12, // cowboy hat
    "50": 15, // heart locket
    "53": 99, // The Locket
    "64": 20  // temy armor
};

let cellOpts = { // Must be let to change to Papyrus and Undyne
    "0": "Empty",
    "201": "Say Hello",
    "202": "Puzzle Help",
    "203": "About Yourself",
    "204": "Call Her \"Mom\"",
    "205": "Flirt",
    "206": "Toriel's Phone",
    "210": "Papyrus's Phone",
    "220": "Dimensional Box A",
    "221": "Dimensional Box B"
};

// Big data
let rooms = [[], [], []];
rooms[2] = [
    "Initializer [Dogchecked]",
    "Introduction [Dogchecked]",
    "Title [Dogchecked]",
    "Menu [Dogchecked]",
    "Ruins - Starting point",
    "Ruins - Flowey spot",
    "Ruins - Entrance [SAVE]",
    "Ruins - Toriel stepping tile puzzle",
    "Ruins - Switch puzzle",
    "Ruins - Dummy room",
    "Ruins - Spike puzzle",
    "Ruins - Long corridor",
    "Ruins - Leaf Pile [SAVE]",
    "Ruins - Candy pillar",
    "Ruins - Mandatory fall trapdoor",
    "Ruins - First stone pushing puzzle",
    "Ruins - Trapdoor corridor puzzle",
    "Ruins - Talkback rock",
    "Ruins - Mouse Hole [SAVE]",
    "Ruins - Napstablook",
    "Ruins - Spider Bake Sale",
    "Ruins - 2 frogs",
    "Ruins - Switch hidden under trapdoor puzzle",
    "Ruins - 3 Pillars room 1",
    "Ruins - 3 Pillars room 2",
    "Ruins - 3 Pillars room 3",
    "Ruins - 3 Pillars room 4",
    "Ruins - Pillars room pit",
    "Ruins - 3-way fork",
    "Ruins - Toriel gossip frog",
    "Ruins - Toy knife room",
    "Ruins - Home [SAVE]",
    "Toriel's House: Entrance",
    "Toriel's House: Reading room",
    "Toriel's House: Corridor",
    "Toriel's House: Toriel's Room",
    "Toriel's House: Your Room",
    "Toriel's House: Kitchen",
    "Toriel's Basement 1",
    "Toriel's Basement 2",
    "Toriel's Basement 3",
    "Toriel's Basement: Toriel Boss Battle",
    "Toriel's Basement: Corridor to Flowey",
    "Toriel's Basement: Flowey",
    "Snowdin - Ruin exit",
    "Snowdin - Dark forest path",
    "Snowdin - Box Road [SAVE]",
    "Snowdin - Fishing rod",
    "Snowdin - Papyrus' Sentry Station",
    "Snowdin - Doggo",
    "Snowdin - Compass sign",
    "Snowdin - Snowman",
    "Snowdin - Electricity Maze",
    "Snowdin - Snow golf",
    "Snowdin - 2 guard dog houses",
    "Snowdin - Monster Kidz Word Search",
    "Snowdin - Spaghetti [SAVE]",
    "Snowdin - Warning: Dog Marriage",
    "Snowdin - XO puzzle 1",
    "Snowdin - XO puzzle 2",
    "Snowdin - Color tile puzzle",
    "Snowdin - Dog House [SAVE]",
    "Snowdin - Snow Papyrus & Sans",
    "Snowdin - Sliding XO puzzle",
    "Snowdin - Teleporting Sans",
    "Snowdin - Ice Cave entrance",
    "Snowdin - Snow poffs (Greater Dog)",
    "Snowdin - Gauntlet of Deadly Terror",
    "Snowdin - Town [SAVE]",
    "Snowdin Town: Ice haul wolf",
    "Snowdin Town: Boat harbor",
    "Snowdin Town: Inn lobby",
    "Snowdin Town: Inn bedroom",
    "Snowdin Town: Grillby's",
    "Snowdin Town: Library",
    "Snowdin Town: Papyrus's shed",
    "Snowdin Town: Papyrus and Sans's house",
    "Snowdin Town: Papyrus's room",
    "Snowdin Town: Sans's room [Dogchecked]",
    "Snowdin Town: Sans's room (dark) [Dogchecked]",
    "Snowdin Town: Sans's basement [Dogchecked]",
    "Snowdin - Papyrus Battle",
    "Waterfall - Entrance",
    "Waterfall - Checkpoint [SAVE]",
    "Waterfall - Falling rocks",
    "Waterfall - Tutu room",
    "Waterfall - Hallway [SAVE]",
    "Waterfall - Lily pad bridge",
    "Waterfall - Lily pad vertical bridge",
    "Waterfall - Quiche room",
    "Waterfall - Telescope",
    "Waterfall - Boat plank",
    "Waterfall - Undyne Spear dodging 1",
    "Waterfall - Bush after spear dodging",
    "Waterfall - Crystal [SAVE]",
    "Waterfall - Sans Telescope",
    "Waterfall - Nice Cream Stand",
    "Waterfall - Split Pathway",
    "Waterfall - Ballet shoes",
    "Waterfall - Duck",
    "Waterfall - Onionsan",
    "Waterfall - Artifact hub",
    "Waterfall - Piano",
    "Waterfall - Legendary Artifact",
    "Waterfall - Rainy Statue",
    "Waterfall - Umbrellas",
    "Waterfall - Rainy Path 1",
    "Waterfall - Rainy Path 2",
    "Waterfall - Palace View",
    "Waterfall - Umbrella ledge",
    "Waterfall - Bridge [SAVE]",
    "Waterfall - Bridge spear dodge",
    "Waterfall - Bridge fall",
    "Waterfall - Trash Zone Flower bed",
    "Waterfall - Trash Zone [SAVE]",
    "Waterfall - Training Dummy revenge",
    "Waterfall - Quiet Area [SAVE]",
    "Waterfall - Undyne's house entrance",
    "Waterfall - Undyne's house interior",
    "Waterfall - Twin Ghost houses",
    "Waterfall - Napstablook's house interior",
    "Waterfall - Hapstablook's house interior",
    "Waterfall - Snail Farm",
    "Waterfall - Pre Bird (Unused)",
    "Waterfall - Turtle shop",
    "Waterfall - River boat",
    "Waterfall - 2 waterfalls",
    "Waterfall - Mushroom maze",
    "Waterfall - Temmie Village [SAVE]",
    "Waterfall - Lamp maze",
    "Waterfall - Behind you",
    "Waterfall - More flowers",
    "Waterfall - Cave bridge",
    "Waterfall - Cave exit",
    "Waterfall - Undyne area",
    "Waterfall - Undyne area + 1",
    "Waterfall - Hotland Welcome",
    "Hotland - Entrance",
    "Hotland - Water tank",
    "Hotland - Laboratory Entrance [SAVE]",
    "Hotland - River boat",
    "Hotland - Laboratory Hub",
    "Hotland - Laboratory Upper Floor",
    "Hotland - Laboratory Exit",
    "Hotland - Treadmills 1",
    "Hotland - Magma Chamber [SAVE]",
    "Hotland - Burnt Pan",
    "Hotland - Lasers 1",
    "Hotland - Puzzle Gate 1",
    "Hotland - Left Boz Puzzle Entrance",
    "Hotland - Left Box Puzzle",
    "Hotland - Right Box Puzzle Entrance",
    "Hotland - Right Box Puzzle",
    "Hotland - Arrow bridge",
    "Hotland - Kitchen",
    "Hotland - Core View [SAVE]",
    "Hotland - Elevator R1",
    "Hotland - Elevator R2",
    "Hotland - Hot Dog Stand",
    "Hotland - Art Club Entrance",
    "Hotland - Art Club",
    "Hotland - Stained Apron",
    "Hotland - Treadmill switch puzzle",
    "Hotland - Arrow puzzle",
    "Hotland - Bad Opinion Zone [SAVE]",
    "Hotland - Bro guards",
    "Hotland - Bombastic News report",
    "Hotland - Upper Core View",
    "Hotland - Elevator L2",
    "Hotland - Elevator L3",
    "Hotland - Spider Bake Sale",
    "Hotland - F3 Puzzle Gate",
    "Hotland - F3 South Puzzle Entrance",
    "Hotland - F3 South Puzzle",
    "Hotland - F3 North Puzzle Entrance",
    "Hotland - F3 North Puzzle",
    "Hotland - Spider Entrance [SAVE]",
    "Hotland - Spider Room",
    "Hotland - Mettaton Poster",
    "Hotland - Theater Stage",
    "Hotland - Colored Tile Maze 2",
    "Hotland - Nice Cream Stand",
    "Hotland - Hotel Entrance",
    "Hotland - Hotel Lobby [SAVE]",
    "Hotland - Hotel Restaurant",
    "Hotland - Hotel Cordidor",
    "Hotland - Hotel Alley",
    "Hotland - Elevator R3",
    "Hotland - Core Entrance",
    "Hotland - Core Elevator",
    "Hotland - Core Pit",
    "Hotland - Core North of Elavator",
    "Hotland - Core Wrong order lasers",
    "Hotland - Core Crossroads",
    "Hotland - Core Dead End",
    "Hotland - Core Power Laser Puzzle",
    "Hotland - Core Branch [SAVE]",
    "Hotland - Core Ice Deposit",
    "Hotland - Core West Puzzle Entrance",
    "Hotland - Core West Puzzle Entrance + 1",
    "Hotland - Core West Puzzle Entrance + 2",
    "Hotland - Core East Money Trash Bin Entrance",
    "Hotland - Core End - 3",
    "Hotland - South of 100G Trash Can",
    "Hotland - Core End - 4",
    "Hotland - Core Get Lost",
    "Hotland - Core West Puzzle",
    "Hotland - Core Glamburger Trash Can",
    "Hotland - Core 100G Trash Can",
    "Hotland - Core Battle Bridge",
    "Hotland - Core End - 1",
    "Hotland - Core End [SAVE]",
    "Hotland - Core Mettaton Room",
    "Hotland - Core Final Elevator Entrance",
    "Hotland - Elevator L1",
    "Hotland - Core Final Elevator",
    "Castle Elevator [SAVE]",
    "Castle - Another Elevator",
    "Castle - Dark Path",
    "New Home [SAVE]",
    "New Home - Entrance",
    "New Home - Reading Room",
    "New Home - Corridor",
    "New Home - Asgore's Room",
    "New Home - Your Room",
    "New Home - Kitchen",
    "New Home - Basement 1",
    "New Home - Basement 2",
    "New Home - Basement 3",
    "New Home - Basement 4",
    "New Home - Elevator",
    "Last Corridor [SAVE]",
    "Throne Entrance [SAVE]",
    "Throne Entrance - Stairs Down",
    "Throne Entrance - Coffins",
    "Throne Room [SAVE]",
    "The End [SAVE]",
    "Barrier",
    "Flowey post-battle",
    "Neutral credits [Dogchecked]",
    "Path to outside [Dogchecked]",
    "Outside [Dogchecked]",
    "Laboratory Elevator",
    "True Lab - Elevator",
    "True Lab - Elevator Entrance",
    "True Lab - South Corridor",
    "True Laboratory [SAVE]",
    "True Lab - West Corridor 1",
    "True Lab - West Sinks",
    "True Lab - West red key slot",
    "True Lab - North Corridor 1",
    "True Lab - Bedroom [SAVE]",
    "True Lab - Northeast Corridor",
    "True Lab - Northeast blue key slot",
    "True Lab - North Corridor 2",
    "True Lab - Green key",
    "True Lab - Northwest skull [SAVE?]",
    "True Lab - Yellow Key Slot + TV",
    "True Lab - Northwest refrigerators",
    "True Lab - Green Key Slot",
    "True Lab - Fans",
    "True Lab - Elevator 2",
    "True Lab - Power room corridor",
    "True Lab - Power room",
    "Gaster Room",
    "Snowdin - Ice Cave 1",
    "Snowdin - Developer Room [Dogchecked]",
    "room2 [Dogchecked]",
    "Waterfall - Mysteryman hallway [Dogchecked]",
    "Waterfall - Mysteryman room [Dogchecked]",
    "Snowdin - Sound Test Room [Dogchecked]",
    "TESTROOM [Dogchecked]",
    "Waterfall - Redacted [Dogchecked]",
    "Waterfall - Cut Bridge Puzzle [Dogchecked]",
    "room_overworld [Dogchecked]",
    "room_overworld3 [Dogchecked]",
    "Bullet Test [Dogchecked]",
    "room_water16A [Dogchecked]",
    "Pacifist credits [Dogchecked]",
    "Pacifist credits - Highway [Dogchecked]",
    "Pacifist credits - Beach [Dogchecked]",
    "Pacifist credits - Mettaton performance [Dogchecked]",
    "Pacifist credits - School entrance [Dogchecked]",
    "Pacifist credits - Mount Ebott [Dogchecked]",
    "Pacifist credits - Special Thanks [Dogchecked]",
    "Pacifist credits - Bedroom [Dogchecked]",
    "Pacifist credits - The End [Dogchecked]",
    "Sprite Test [Dogchecked]",
    "Settings menu [Dogchecked]",
    "Control test room [Dogchecked]",
    "Omega Flowey - Initializer [Dogchecked]",
    "Omega Flowey - Fake intro [Dogchecked]",
    "Omega Flowey - Fake menu [Dogchecked]",
    "Omega Flowey - Fake save point [Dogchecked] [SAVE?]",
    "Omega Flowey [Dogchecked]",
    "Omega Flowey - Respawn mocking [Dogchecked]",
    "room_fire4 [Dogchecked]",
    "room_fire10_old [Dogchecked]",
    "room_fire10A_old [Dogchecked]",
    "Snowdin - Ice Puzzle [Dogchecked]",
    "Ruins - Rock Candy [Dogchecked]",
    "Snowdin - Growing snowball [Dogchecked]",
    "Waterfall - Torch puzzle [Dogchecked]",
    "Waterfall - Meet Undyne (Unused) [Dogchecked]",
    "Waterfall - Rooted mushroom [Dogchecked]",
    "room_monsteralign_test [Dogchecked]",
    "Battle room [Dogchecked]",
    "Flowey battle room [Dogchecked]",
    "\"Fast\" battle room [Dogchecked]",
    "New Home - Story battle room [Dogchecked]",
    "Game Over [Dogchecked]",
    "Snowdin Town - Shop [Dogchecked]",
    "Waterfall - Gerson's shop [Dogchecked]",
    "Hotland - Bratty and Catty [Dogchecked]",
    "Hotland - Burgerpants [Dogchecked]",
    "Waterfall - Tem Shop [Dogchecked]",
    "River person transition room [Dogchecked]",
    "Papyrus date [Dogchecked]",
    "Alphys date [Dogchecked]",
    "Omega Flowey - Wilting [Dogchecked]",
    "Flowey's pacifist speech [Dogchecked]",
    "room_empty [Dogchecked]",
    "room_emptywhite [Dogchecked]",
    "room_emptyblack [Dogchecked]",
    "Genocide - The Nothingness [Dogchecked]",
    "Snowdin - Title [Dogchecked]",
    "Dogcheck room",
    "Hotland - Quiz battle (Unused) [Dogchecked]",
    "Pre-Asriel scene (Unused) [Dogchecked]",
    "Pre-Asriel scene 2 (Unused) [Dogchecked]",
    "Asriel appears [Dogchecked]",
    "Asriel room [Dogchecked]",
    "Asriel flashbacks [Dogchecked]",
    "Asriel animation test [Dogchecked]",
    "Asriel phase 2 animation test [Dogchecked]",
    "Snowdin - Dog Shrine [Dogchecked]"
];

const plotValues = { // Unobtainable values are commented out; this may change to be similar to rooms
 // "0": "New game",
 // "1": "Flowey intro complete",
    "2": "First save",
    "3": "Stepping tile puzzle complete",
    "4": "Toriel waiting at switch puzzle",
    "4.5": "First switch flipped",
    "5": "Switch puzzle complete",
    "5.5": "Toriel waiting at dummy",
 // "6": "Dummy defeated",
    "7": "Toriel at spike puzzle",
 // "7.5": "Crossing spike puzzle",
    "8": "Spike puzzle complete",
 // "8.5": "Unnecessary Tension",
     "9": "Toriel left",
     "9.2": "Received Toriel puzzle call",
     "9.4": "Received Toriel preference call",
     "9.6": "Received Toriel confirmation call",
     "9.8": "Received Toriel allergies call",
  // "10.3": "Napstablook spared",
  // "10.35": "Battle exited",
  // "10.4": "And some dialogue", // needs better desc.
     "11": "Napstablook defeated",
     "12": "Received Toriel pockets call",
     "13": "Just one switch puzzle solved",
     "14": "Blue switch flipped",
     "15": "Red switch flipped",
     "16": "Green switch flipped",
     "17": "Met Toriel at Ruins end",
     "18": "Toriel waiting at bedrooms",
     "19": "Toriel reading",
     "19.1": "Received sleep suggestion",
     "19.2": "\"I have always wanted to be a teacher.\"",
  // "19.3": "Receiving snail fact",
     "19.4": "Received snail fact",
  // "19.9": "\"I have to do something\"",
  // "20": "Toriel standing up",
     "21": "Toriel in basement",
     "22": "Toriel in Basement 2",
     "23": "Toriel in Basement 3",
     "24": "Toriel at Ruins Exit",
     // It goes back to 11 for a moment here, fwiw. Copy-paste.
     "25": "Toriel defeated",
     // "28": "Flowey judgment complete",
     // "30": "Exited Ruins",
     // "36": "Met Sans and Papyrus, Sans hasn't left",
     "37": "Sans/Papyrus intro complete",
     "40": "Papyrus rock scene complete",
  // "41": "Doggo defeated, still in battle",
     "42": "Doggo defeated",
     "43": "Invisible Maze complete",
     "47": "Crossword complete",
     "49": "Undersnow switch complete",
  // "50": "Dogi defeated, still in battle",
     "51": "Dogi defeated",
     "53": "Small XO puzzle complete",
     "54": "Large XO puzzle started",
     "56": "Large XO puzzle complete",
     "57": "XO puzzles complete (Genocide)",
     "58": "Papyrus's tile puzzle complete",
     "63": "Icy XO puzzle complete",
  // "60": "Greater Dog defeated, still in battle",
  // "61": "Greater Dog spared",
     "65": "Greater Dog defeated",
     "67": "Gauntlet of Deadly Terror complete",
  // "100": "Papyrus defeated, in post-battle cutscene",
     "101": "Papyrus defeated",
     "106": "Undyne intro complete",
     "107": "Bridge Seed puzzles complete", // technically when you get Papyrus's call, or don't get it as the case may be, but this seems more apt.
     "108": "Hidden door opened",
  // "109": "", // Something about that unused torch puzzle in room_water7_older? Inaccessible anyway.
     "110": "Undyne spear-throwing scene complete",
     "111": "Shyren defeated",
     "112": "Monster Kid crouching",
     "113": "Climbed ledge",
     "115": "Undyne bridge spears scene complete (entered dump)",
     "116": "Mad Dummy defeated",
     "117": "Received Napstablook's directions/Glad Dummy defeated", // verify
     "118": "\"Behind you.\" scene complete",
     "119": "Pre-Undyne the Undying", // Set by a trigger in room_water19. The trigger also causes the Flowey echo flower and "Shouldn't proceed yet" on Genocide.
     "120": "Final Monster Kid scene complete",
     "121": "Received Undyne speech",
     "122": "Undyne defeated",
  // "126": "Quiz show complete, phone not upgraded",
     "127": "Quiz show complete (Neutral/Pacifist)",
     "130": "Received Alphys hangup",
     "131": "Received Alphys laser explanation",
     "132": "Received Alphys shooter puzzle explanation",
     "133": "First shooter puzzle complete", // triggers on door opening
     "133.5": "Received Alphys unnecessary puzzle explanation",
  // "134": "Ingredients collected",
     "135": "Cooking show complete",
     "137": "Received Alphys CORE explanation",
     "139": "Received Alphys three-switches explanation",
     "140": "Three-switches puzzle complete",
     "143": "Received Alphys bathroom call",
     "146": "Royal Guards defeated (Neutral/Pacifist)",
     "160": "Mettaton intro complete (Genocide)",
     "161": "News show complete",
     "162": "\"With your human soul, you can pass through the barrier!\"",
     "163": "\"Let's be friends on UnderNet!\"",
     "164": "Second shooter puzzle complete/Royal Guards defeated (Genocide)",
     "165": "Muffet defeated (Neutral/Pacifist)",
  // "167": "Opera scene complete",
     "168": "Mettaton's tile puzzle complete",
     "176": "Spotted mercenaries",
     "177": "Received Alphys elevator call",
     "179": "First Madjick battle complete",
     "180": "Received Alphys laser order call",
     "181": "Received Alphys apology call",
     "182": "\"Try heading to the right!\"",
     "184": "Reactivating lasers bridge complete",
     "185": "\"This doesn't look like my map at all\"/Muffet defeated (Genocide)",
  // "193": "Mettaton defeated, Alphys scene incomplete",
     "199": "Mettaton defeated",
     "201": "True Lab (Pacifist)/Last Corridor (Neutral/Genocide) complete",
     "206": "Asgore intro complete",
     "207": "\"A visit to the dentist\"",
     "208": "Pre-Asgore",
     "999": "Pacifist epilogue"
};

let flags = {
    // Format of [name (String), description (String), options (Object)]
    // 0-3 are unused
    4: ["undyne_trigger_override", "Debug variable. Allows Undyne to give her Pacifist speech even if one (but only one) monster is killed.", basicBool],
    5: ["fun", "The fun value. See above list for effects."],
    6: ["hardmode", "Hard Mode.", basicBool],
    7: ["true_pacifist", "In the Pacifist epilogue.", basicBool],
    8: ["disable_random_encounters", "Self-explanatory. Set at the start of the Undyne's Letter quest or after defeating Mettaton NEO.", basicBool],
    9: ["flowey_seen_stalking", "Unaccessed. Tracks how often you backtracked to catch Flowey."],
    10: ["spared_last", "Whether you spared the previous enemy.", basicBool],
    11: ["escaped_last", "Whether you fled the previous battle.", basicBool],
    12: ["killed_last", "Whether you killed the previous enemy.", basicBool],
    13: ["bored_last", "Intended for Dummy. Copied to all Ruins enemies.", basicBool],
    14: ["status_dummy", "What you did to that poor, poor Dummy.", [
            "Escaped from",
            "Killed",
            "Talked to",
            "Bored"
        ]],
    15: ["in_battle", "Whether you are in a battle.", basicBool],
    16: ["type_heart_transition", "Whether you are entering a 'quick' battle.", basicBool],
    17: ["menu_disabled", "Whether you cannot access your menu due to an overworld event (e.g. Undyne chasing you).", basicBool],
    18: ["view_rotated", "Whether the view is rotated. Only used for Undyne's speech.", basicBool],
    // no 19
    20: ["animation_index", "Certain enemies' current animation frame."],
    21: ["cooked_noodles", "Whether you are cooking the Instant Noodles. Makes the text unskippable in battle.", basicBool],
    22: ["name_color", "Color of the names of spareable enemies.", [
            "Yellow",
            "White",
            "Pink"
        ]],
    23: ["spares", "How many enemies you have spared."],
    24: ["escapes", "How many enemies you have fled from."],
    25: ["dialogues_skipped", "How many textboxes you have skipped."],
    26: ["murderlevel_override", "Debug variable. Overrides the Genocide Route progress. Normally, each level also requires all previous levels to be met.", {
            0: "No murder level",
            1: "20 Ruins kills",
            2: "Toriel",
            3: "Doggo",
            4: "Dogi",
            5: "Greater Dog",
            6: "Snowdrake",
            7: "16 Snowdin kills",
            8: "Papyrus",
            9: "Shyren",
            10: "Glad Dummy",
            11: "18 Waterfall kills",
            12: "Undyne",
            13: "Royal Guards",
            14: "Muffet",
            15: "40 Hotland kills",
            16: "Mettaton",
            50: "Level 50 (Debug)"
        }],
    27: ["spared_specific", "Whether you spared certain bosses or minibosses, aborting the Genocide Route.", basicBool],
    28: ["fast_text_skip", "Debug variable. Makes [C] skip most text very fast.", basicBool],
    // no 29
    30: ["tutorial_froggit_met", "Whether you have fought the scripted Froggit.", basicBool],
    31: ["pushed_rock_1", "Whether you have pushed the middle rock.", basicBool],
    32: ["pushed_rock_2", "Whether you have pushed the top rock.", basicBool],
    33: ["pushed_rock_3", "Whether you have completed the second rock-pushing puzzle.", basicBool],
    34: ["candy_taken", "How much Monster Candy you have taken.", [
            "None",
            "One piece",
            "Two pieces",
            "Three pieces",
            "Four pieces, you Monster."
        ]],
    35: ["pushed_rock_4", "Whether you have completed the first rock-pushing puzzle.", basicBool],
    36: ["spared_napstablook", "Tracks your interaction with Napstablook in the Ruins.", [
            "Inital state",
            "Spared",
            "Spared, met in hole"
        ]],
    37: ["dog_call_status", "Tracks the Toriel phone calls when waiting, especially about the Annoying Dog.", [
            "Initial state",
            "Dog has Toriel's phone",
            "Toriel's phone recovered"
        ]],
    // 38, 39 unused
    40: ["greeted_toriel", "How many times you have called Toriel to say hello."],
    41: ["flirted_toriel", "How many times you have called Toriel to flirt with her."],
    42: ["call_mom_toriel", "Whether you have called Toriel 'mom'.", basicBool],
    43: ["ruins_switches_pressed", "When greater than 25, changes the displayed text upon pressing a switch."],
    44: ["disobeyed_toriel", "How many times Toriel had to return you upstairs."],
    45: ["status_toriel", "Self-explanatory.", {
            0: "Initial state",
            1: "In basement",
            3: "Fled from",
            4: "Killed",
            5: "Spared"
        }],
    46: ["choice_flavor", "Your choice for Toriel's pie flavor.", [
            "Cinnamon",
            "Butterscotch"
        ]],
    47: ["status_creepy_tundra", "Partly handles progress through the 'creepy' part of Sans's introduction scene.", {
        "0": "Initial state",
        "2": "Stick broken",
        "3": "Sans spotted",
        "-1": "Scene complete",
    }],
    // no 48, 49
    50: ["know_water_sausage", "Read about water sausages in Toriel's room. Makes you recognize the plant in Toriel's living room.", basicBool],
    51: ["wrong_switches_pressed", "Gives you a hint after two failures."],
    52: ["status_doggo", "Self-explanatory.", simpleDogStates],
    53: ["status_dogcouple", "Self-explanatory.", simpleDogStates],
    54: ["status_greaterdog", "Self-explanatory.", [
            "Inital state",
            "Killed",
            "Played fetch (Spared)",
            "Ignored"
        ]],
    55: ["status_lesserdog", "Self-explanatory.", [
            "Initial state",
            "Killed",
            "Continued petting [Yellow credit]"
        ]],
    56: ["status_snowman", "Status of the snowman in Snowdin Forest (Neutral/Pacifist).", {
            0: "Initial state",
            1: "Have a Snowman Piece",
            2: "Have a second Snowman Piece",
            4: "Ate the Piece in front of him",
            5: "Talked to him after"
        }],
    57: ["status_snowdrake", "Self-explanatory.", [
            "Initial state",
            "Laughed at joke [Yellow credit]",
            "Killed"
        ]],
    58: ["choice_harder_puzzle", "Which puzzle you told Sans and Papyrus was harder.", [
            "Junior Jumble",
            "Crossword"
        ]],
    59: ["spider_donations_total", "How much money you've given to either Spider Bake Sale."],
    60: ["nicecream_donations_total", "How much money you've spent on Nice Cream (+1 for talking to him at all)."],
    // no 61
    62: ["choice_ate_left_spaghetti", "What you told Papyrus you did with his spaghetti. Affects phone dialogue in the spaghetti room.", [
            "Initial state",
            "Ate it",
            "Left it"
        ]],
    63: ["xoxo_resets", "How many times you failed the second XO puzzle. Affects Sans's dialogue in the room."],
    64: ["toggled_snow_switch", "Status of the hidden switch puzzle in the Dogi/Lesser Dog room.", {
            "-1": "Moved the snow",
            "0": "Initial state",
            "1": "Pressed switch w/o moving snow or on Genocide"
        }],
    65: ["got_snowpoff_gold", "Self-explanatory.", basicBool],
    66: ["flirted_papyrus_fight", "Self-explanatory. Changes his hangout to a date.", basicBool],
    67: ["status_papyrus", "Self-explanatory.", {
            "-3": "Lost to thrice",
            "-2": "Lost to twice",
            "-1": "Lost to once",
            "0": "Initial state",
            "1": "Killed"
        }],
    68: ["fought_papyrus", "Self-explanatory. Basically used for the cutscene to tell if the fight is done. Reset each refight.", basicBool],
    69: ["bpants_alt_dialogue", "Debug variable. Slightly alters Burgerpants's dialogue in old versions of the game; appears intended to track being in shops before. Unused in newer versions.", basicBool],
    70: ["progress_tundra_battles", "Loosely, how many Snowdin encounters you've had. Guarantees you encounter a variety of enemies.", {
            0: "Initial state",
            1: "Encountered Snowdrake",
            2: "Encountered Ice Cap",
            4: "Encountered Lesser Dog"
        }],
    // no 71
    72: ["status_inn", "Tracks your interaction with the innkeep.", [
            "Initial state",
            "Stayed a night",
            "Stayed a night with no money"
        ]],
    73: ["in_inn", "Whether you are currently sleeping in the inn.", basicBool],
    74: ["betrayed_gyftrot", "Whether you cruelly added another decoration to Gyftrot. Unaccessed.", basicBool],
    75: ["armor_papyrus_inquiry", "The armor you were wearing when Papyrus called to ask.", {
            0: "Initial state",
            4: "Bandage",
            12: "Faded Ribbon",
            15: "Manly Bandana",
            24: "Old Tutu",
            44: "Cloudy Glasses (impossible)",
            46: "Stained Apron (impossible)",
            48: "Cowboy Hat (impossible)",
            50: "Heart Locket (impossible)",
            53: "The Locket (impossible)",
            64: "temy armor (impossible)"
        }],
    76: ["choice_papyrus_inquiry", "What you told Papyrus about your armor.", [
            "Truth",
            "Lied"
        ]],
    77: ["armor_undyne_saw", "The armor Undyne saw you wearing. Affect's Papyrus's call about it.", {
            0: "Initial state",
            4: "Bandage",
            12: "Faded Ribbon",
            15: "Manly Bandana",
            24: "Old Tutu",
            44: "Cloudy Glasses (impossible)",
            46: "Stained Apron (impossible)",
            48: "Cowboy Hat (impossible)",
            50: "Heart Locket (impossible)",
            53: "The Locket (impossible)",
            64: "temy armor (impossible)"
        }],
    78: ["strong_tough_glove", "Whether you tore up a Punch Card in the current battle, strengthening the Tough Glove.", basicBool],
    79: ["nicecream_business", "Whether you interacted with Nice Cream Guy in Waterfall.", {
            0: "Initial state",
            8: "Interacted"
        }],
    80: ["punchcards_bought", "The amount of Punch Cards in the Punch Card Box."],
    81: ["status_shyren", "Self-explanatory.", [
            "Initial state",
            "Killed",
            "Continued humming [Yellow credit]"
        ]],
    82: ["papyrus_sink_event_occurred", "Self-explanatory.", basicBool],
    83: ["got_couch_gold", "Self-explanatory.", basicBool],
    84: ["mushroom_talk_progress", "Your status with the inaccessible NPC in room_water_mushroom.", {
            0: "Initial state",
            2: "Accepted request",
            3: "Returned (impossible)",
            4: "Said it was different",
            5: "Said it was the same"
        }],
    85: ["have_umbrella", "Self-explanatory.", basicBool],
    86: ["music_statue_on", "Whether you've given the music statue an umbrella.", basicBool],
    // no 87
    88: ["dated_papyrus", "Tracks progress through Papyrus's date.", [
            "Initial state",
            "Spared Papyrus",
            "Papyrus in house",
            "Unlocked Papyrus's room",
            "Date/hangout complete"
        ]],
    89: ["dated_sans1", "Tracks progress through the Grillby's hangout", [
            "Initial state",
            "In Grillby's",
            "Hangout complete"
        ]],
    90: ["choice_mkid_umbrella", "Tracks Monster Kid's knowledge of your umbrella habits.", [
            "Initial state",
            "Met without umbrella",
            "Met with umbrella",
            "Put umbrella back"
        ]],
    91: ["trash_save_mkid_pos", "Tracks progress through the Monster Kid following sequence... and interacting with the Garbage Dump save point.", {
            0: "Initial state",
            1: "'Undyne is sooooooo cool.'/Interacted with save",
            3: "'How COOL would it be if UNDYNE came to school!?'",
            4: "'She's too cool to ever hurt an innocent person!'",
            6: "Seen castle",
            10: "Scene complete"
        }],
    92: ["status_stable", "Tracks the status of the unused stable and its key.", [
            "Initial state",
            "[redacted] in stable (impossible)",
            "Interacted with [redacted]",
            "Key acquired",
            "Stable unlocked (impossible)"
        ]],
    93: ["dated_napstablook", "Tracks progress through Napstablook's house.", {
            0: "Initial state",
            1: "Have been introduced",
            3: "Felt like garbage",
            9: "Did not feel like garbage"
        }],
    94: ["current_napstablook_song", "Which of Napstablook's songs is currently playing. Setting this value outside of the area might cause problems (but most of these do that).", [
            "Initial state",
            "Spooktune",
            "Spookwave",
            "Ghouliday"
        ]],
    95: ["aaron_woshua_event", "Whether you encountered Aaron and Woshua while one of Napstablook's songs was playing. Necessary for Aaron's yellow credit.", basicBool],
    96: ["conversation_emblem", "How much you've talked with Gerson about the Delta Rune.", [
            "Initial state",
            "'That emblem'",
            "'Emblem's meaning'",
            "'The prophecy'"
        ]],
    97: ["creepy_friend_seen", "Whether the NPC in room_water_prebird saw your creepy friend. The room is unused.", basicBool],
    98: ["saved_mkid", "What you did to Monster Kid.", [
            "Initial state/ran away",
            "Stayed, did nothing",
            "Saved them"
        ]],
    99: ["undyne_times_fought", "Stores how many times you have fought/run from Undyne. (Also increased at the end of each phase.) Alters her dialogue."],
    100: ["got_ribbon", "Self-explanatory. Does not directly affect your inventory, only the item's presence on the ground.", basicBool],
    // no 101
    102: ["got_toyknife", "Self-explanatory. Does not directly affect your inventory, only the item's presence on the ground.", basicBool],
    103: ["got_bscotch_pie", "Self-explanatory. Does not directly affect your inventory, only the item's presence on the ground.", [
             "Initial state",
             "Floor pie",
             "Item acquired"
         ]],
    104: ["got_quiche", "Self-explanatory. Does not directly affect your inventory, only the item's presence under the bench.", basicBool],
    105: ["got_tutu", "Self-explanatory. Does not directly affect your inventory, only the item's presence on the ground.", basicBool],
    106: ["got_ballet_shoes", "Self-explanatory. Does not directly affect your inventory, only the item's presence on the ground.", basicBool],
    107: ["got_artifact", "Self-explanatory. Does not directly affect your inventory, only the item's presence on the pedestal.", [
             "Initial state",
             "Artifact gone",
             "Dog in inventory"
         ]],
    108: ["got_spacefood", "Status of the Astronaut Food cooler.", [
             "Initial state",
             "Interacted with",
             "One taken",
             "Both taken"
         ]],
    109: ["got_instant_noodles", "Self-explanatory. Does not directly affect your inventory, only the item's presence in the fridge.", basicBool],
    110: ["got_frying_pan", "Self-explanatory. Does not directly affect your inventory, only the item's presence on the ground.", basicBool],
    111: ["got_apron", "Self-explanatory. Does not directly affect your inventory, only the item's presence on the ground.", basicBool],
    112: ["got_glamburger_trashcan", "Whether you took the Glamburger from a trashcan in the CORE.", basicBool],
    113: ["got_gold_trashcan", "Whether you took the G from a trashcan in the CORE.", basicBool],
    114: ["got_dagger", "Self-explanatory. Does not directly affect your inventory, only the item's presence in the box.", basicBool],
    115: ["got_locket", "Self-explanatory. Does not directly affect your inventory, only the item's presence in the box.", basicBool],
    // no 116-129
    130: ["spared_froggit", "Whether you Complimented Froggit. Used for its yellow credit.", basicBool],
    131: ["spared_whimsun", "Whether you Consoled Whimsun. Used for its yellow credit.", basicBool],
    132: ["spared_moldsmal", "Whether you Flirted with/Imitated Moldsmal. Used for its yellow credit.", basicBool],
    133: ["spared_loox", "Whether you Didn't Pick On Loox. Used for his yellow credit.", basicBool],
    134: ["spared_vegetoid", "Whether you Spared Vegetoid. Used for its yellow credit.", basicBool],
    135: ["spared_migosp", "Whether you Spared or Talked to Migosp. Used for its yellow credit.", basicBool],
    136: ["spared_snowdrake", "Whether you Laughed at Snowdrake's joke. Used for his yellow credit.", basicBool],
    137: ["spared_icecap", "Whether you Complimented Ice (after Stealing its hat). Used for its yellow credit.", basicBool],
    138: ["spared_gyftrot", "Whether you removed three items from Gyftrot. Used for its yellow credit.", basicBool],
    139: ["spared_doggo", "Whether you Petted Doggo. Used for his yellow credit.", basicBool],
    140: ["spared_nuzzle_champs", "Whether you successfully petted both Dogi. Used for their yellow credit.", basicBool],
    141: ["spared_lesserdog", "Whether you Petted Lesser Dog four times. Used for its yellow credit.", basicBool],
    142: ["spared_greatdog", "Whether Greater Dog's pet capacity reached 100%. Used for its yellow credit.", basicBool],
    143: ["spared_aaron", "Whether Aaron flexed himself out of the room. Unaccessed (see flag 95).", basicBool],
    144: ["spared_moldsmalx", "Whether you Unhugged Moldbygg. Used for its yellow credit.", basicBool],
    145: ["spared_woshua", "Whether you Spared Woshua without damaging him. Used for his yellow credit.", basicBool],
    146: ["spared_temmie", "Whether you Talked to or gave Temmie the Temmie Flakes. Used for her yellow credit.", basicBool],
    147: ["spared_maddummy", "Whether you Talked to Mad Dummy. Used for their yellow credit.", basicBool],
    148: ["spared_vulkin", "Whether you Spared Vulkin without damaging it. Used for its yellow credit.", basicBool],
    149: ["spared_tsunderplane", "Whether you Spared Tsunderplane without damaging it. Used for its yellow credit.", basicBool],
    150: ["spared_pyrope", "Whether you Spared Pyrope without damaging it. Used for its yellow credit.", basicBool],
    151: ["spared_finalfroggit", "Whether you Spared Final Froggit without damaging it. Used for its yellow credit.", basicBool],
    152: ["spared_whimsalot", "Whether you Spared Whimsalot without damaging it. Used for its yellow credit.", basicBool],
    153: ["spared_astigmatism", "Whether you Spared Astigmatism without damaging it. Used for its yellow credit.", basicBool],
    154: ["spared_madjick", "Whether you Spared Madjick without damaging it. Used for its yellow credit.", basicBool],
    155: ["spared_finalknight", "Whether you Spared Knight Knight without damaging her. Used for her yellow credit.", basicBool],
    156: ["spared_endogeny", "Whether you satisfied Endogeny. Used for the Amalgamates' yellow credit.", basicBool],
    157: ["status_mewmew", "Tracks the status of Mad Mew Mew. Switch-only.", [
             "Initial state",
             "Door opened",
             "Mew Mew spared",
             "Mew Mew killed"
         ]],
    158: ["image_mewmew", "Which overworld sprite Mad Mew Mew uses. Switch-only. (Options are approximate color scheme.)", [
             "Pink",
             "White",
             "Green"
         ]],
    // no 159-190
    191: ["talk_toriel_pacifist", "The number of times you have talked to Toriel in the True Pacifist ending."],
    192: ["talk_sans_pacifist", "The number of times you have talked to Sans in the True Pacifist ending."],
    193: ["talk_undyne_pacifist", "The number of times you have talked to Undyne in the True Pacifist ending."],
    194: ["unlock_napsta_pacifist", "Whether Undyne mentioned Napstablook yet in the True Pacifist ending. Alters Blooky's dialogue.", basicBool],
    195: ["talk_papyrus_pacifist", "The number of times you have talked to Papyrus in the True Pacifist ending."],
    196: ["talk_alphys_pacifist", "The number of times you have talked to Alphys in the True Pacifist ending."],
    197: ["talk_asgore_pacifist", "The number of times you have talked to Asgore in the True Pacifist ending."],
    198: ["talk_mettaton_pacifist", "The number of times you have talked to Mettaton in the True Pacifist ending."],
    199: ["talk_blooky_pacifist", "The number of times you have talked to Napstablook in the True Pacifist ending."],
    200: ["kills_area_pointer", "Assigned when moving between areas. Points at the area-specific kill counter.", {
             0: "No area counter",
             202: "Ruins",
             203: "Snowdin",
             204: "Waterfall",
             205: "Hotland/CORE"
         }],
    201: ["kills", "Volatile kill counter, used to increment global.kills after a battle. Otherwise, global.kills is preferred and this is mostly redundant."],
    202: ["kills_ruins", "Your kill count in the Ruins. Can reach 22 or so, but you stop getting random encounters after 20."],
    203: ["kills_tundra", "Your kill count in Snowdin Forest. Can reach 18 or so, but you stop getting random encounters after 16."],
    204: ["kills_water", "Your kill count in Waterfall. Can reach 20 or so, but you stop getting random encounters after 18."],
    205: ["kills_hotland", "Your kill count in Hotland/CORE. Can reach 47 or so, but you stop getting random encounters after 40."],
    206: ["hide_hotland_npcs", "Debug variable. Prevents Hotland/CORE NPCs from appearing, even in the epilogue.", basicBool],
    // no 207-220
    221: ["genocide_ruins", "Whether you have completed the kill count for the Ruins. Alters the music in the area.", basicBool],
    222: ["genocide_tundra", "Whether you have completed the kill count for Snowdin Forest. Alters the music in the area (even if Genocide was previously aborted).", basicBool],
    223: ["genocide_water", "Whether you have completed the kill count for Waterfall. Alters the music in the area (even if Genocide was previously aborted).", basicBool],
    224: ["genocide_hotland", "Whether you have completed the kill count for Hotland (while in Hotland). Alters the music in the area (even if Genocide was previously aborted).", basicBool],
    225: ["genocide_core", "Whether you have completed the kill count for the CORE (while in the CORE). Unaccessed.", basicBool],
    // no 226-249
    250: ["nicecream_business2", "Whether you interacted with Nice Cream Guy in Hotland.", basicBool],
    251: ["killed_undyne_ex", "Whether you killed Undyne the Undying, a key point of the Genocide Route.", basicBool],
    252: ["killed_glad_dummy", "Whether you killed Glad Dummy.", basicBool],
    253: ["killed_snowman", "The number of times you have interacted with the Snowman on the Genocide Route. Correlates with the number of pieces taken."],
    254: ["interacted_crosswords", "Whether you interacted with the crossword puzzle. Alters Sans and Papyrus's dialogue in the scene.", basicBool],
    255: ["robbed_snowdin", "Whether you took the 758G from Snowdin Shop on Genocide.", basicBool],
    256: ["robbed_core", "Whether you took the 5G from the alley shop on Genocide.", basicBool],
    // no 257-259
    260: ["used_recovery_item", "Whether you used any consumable items. Alters Sans's Neutral ending dialogue.", basicBool],
    261: ["interacted_fakedog", "Whether you interacted with the dog-shaped Dog Residue in the Dog Room.", basicBool],
    262: ["delivered_seatea", "Whether you put a Sea Tea under the correct door at MTT Resort.", basicBool],
    263: ["delivered_cinnabun", "Whether you put a Cinnamon Bun under the correct door at MTT Resort.", basicBool],
    264: ["delivered_hotdog", "Whether you put a Hot Dog under the correct door at MTT Resort.", basicBool],
    265: ["tem_sell_parameter", "The number of items you need to sell (0-9) before Temmie takes particular interest in one. Decrements with all sales except Tem Flakes."],
    266: ["tem_flakes_sold", "If false, the first Tem Flakes you sell will be at a premium. After that, the flag is set to true.", basicBool],
    267: ["status_hotel", "Tracks progress of the MTT Resort hotel. A value of 2 prevents the receptionist from repeating herself.", [
             "Initial state",
             "Stayed once",
             "Interacted again"
         ]],
    // no 268
    269: ["allergy_tem_talked", "Whether Tem has burst into hoivs.", basicBool],
    270: ["glowshrooms_on", "Whether you have visited Tem Village or completed the glow shroom puzzle. Causes the puzzle to remain lit.", basicBool],
    271: ["fighting_sans", "Whether you are currently fighting Sans. Used to render KR.", basicBool],
    272: ["geeettttttt_dunked_on", "Self-explanatory.", basicBool],
    // no 273, 274
    275: ["tundra_stick_broken", "Tracks progress through Sans's introduction cutscene. See also flag 47.", [
             "Initial state",
             "Stick broken",
             "Sans seen between trees"
         ]],
    276: ["temmie_college_paid", "Self-explanatory. Unlocks a dialogue option about Temmie Armor.", basicBool],
    277: ["fun_call_occurred", "Whether you've received a fun-value phone call. Prevents the call from repeating.", basicBool],
    278: ["completed_tile_puzzle", "Whether you actually completed Mettaton's tile puzzle. Alters Papyrus's phone call in the room.", basicBool],
    279: ["interacted_clamgirl", "Whether you spoke with Clam Girl before the pacifist ending. Summons the 'don't forget' photograph in Sans's basement.", basicBool],
    280: ["conversation_elderpuzzles", "Your progress with the Elder Puzzler.", [
             "Initial state",
             "Received suggestion",
             "'Bah!'"
         ]],
    281: ["status_sosorry", "Self-explanatory.", [
             "Initial state",
             "Killed",
             "Spared"
         ]],
    282: ["encountered_glyde", "Self-explanatory. Unaccessed (you can fight him again).", basicBool],
    283: ["dated_papyrus2", "A mostly redundant flag (see 88) for completing Papyrus's date.", basicBool],
    284: ["undyne_spears_anger1", "Whether Undyne reached her maximum spear-throwing speed (around 100 volleys). Affects Monster Kid's following dialogue.", basicBool],
    285: ["undyne_spears_anger2", "Whether Undyne reached her maximum spear-stabbing speed around 82 volleys. Unaccessed.", basicBool],
    286: ["conversation_toriel_sms", "The number of text messages you have received from Toriel."],
    287: ["sms_parameters", "The number of text messages you are 'allowed' to receive from Toriel. Increments when moving between rooms until all messages are received."],
    288: ["failed_defusing", "Whether you ran out of defusing time while still in battle. Slightly alters dialogue.", basicBool],
    289: ["stepped_green_tile", "Whether you stepped on a green tile. Alters Mettaton's reason for fighting you.", basicBool],
    290: ["papyrus_special_attack", "Whether you fought Papyrus on Genocide. Alters dialogue if he is spared.", basicBool],
    291: ["geno_electric_puzzle", "Whether you reached the Invisible Electricity Maze on Genocide. Affects Papyrus's phone call in the room if he is spared.", basicBool],
    292: ["donation_amt_or_cherry", "The amount of G dognated to the Dog Shrine on PlayStation. On Xbox, 1 if you got a triple cherry."],
    293: ["donation_goal_or_ghost", "The amount of G for the next dognation level on PlayStation (e.g. '5 out of 70' not '65 more'). On Xbox, 1 if you got a triple ghost."],
    294: ["shrine_level_or_bones", "The current dognation level of the Dog Shrine on PlayStation (0-15). On Xbox, 1 if you got triple bones."],
    295: ["shrine_desc_or_DOG", "Prevents the Dog Shrine from repeating its description after certain upgrades on PlayStation (0-6). On Xbox, 1 if you spelled DOG."],
    296: ["donation_box_usable", "Whether you have interacted with the dognation box in the Garbage Dump. Allows you to start dognating to it.", basicBool],
    297: ["casino_chat_progress", "Your progress in the plot of the Dog Casino.", {
             "0": "Initial state",
             "1": "Switch shrine cleared",
             "2": "Was prevented from playing Dog Poker",
             "3": "Offered item commentary",
             "3.1": "Got Sans blizzard dialogue",
             "4": "Mew Mew introduced",
             "5": "Mew Mew introduced without JPEG Sans",
             "6.1": "Got Mew Mew's special song"
         }],
    298: ["casino_coins", "The number of Coin's you have in the Xbox One Dog Casino."],
    299: ["casino_donation", "The number of Coin's you donated back to the Dog Casino."],
    300: ["dimensional_box_A_1", "The item in a given slot of a given box.", items],
    301: ["dimensional_box_A_2", "The item in a given slot of a given box.", items],
    302: ["dimensional_box_A_3", "The item in a given slot of a given box.", items],
    303: ["dimensional_box_A_4", "The item in a given slot of a given box.", items],
    304: ["dimensional_box_A_5", "The item in a given slot of a given box.", items],
    305: ["dimensional_box_A_6", "The item in a given slot of a given box.", items],
    306: ["dimensional_box_A_7", "The item in a given slot of a given box.", items],
    307: ["dimensional_box_A_8", "The item in a given slot of a given box.", items],
    308: ["dimensional_box_A_9", "The item in a given slot of a given box.", items],
    309: ["dimensional_box_A_10", "The item in a given slot of a given box.", items],
    310: ["box_A_interacted", "Whether you have interacted with Dimensional Box A. Unaccessed.", {
             0: "Initial state",
             999: "Interacted" // probably not intended for this but that's the only thing it does
         }],
    // no 311
    312: ["dimensional_box_B_1", "The item in a given slot of a given box.", items],
    313: ["dimensional_box_B_2", "The item in a given slot of a given box.", items],
    314: ["dimensional_box_B_3", "The item in a given slot of a given box.", items],
    315: ["dimensional_box_B_4", "The item in a given slot of a given box.", items],
    316: ["dimensional_box_B_5", "The item in a given slot of a given box.", items],
    317: ["dimensional_box_B_6", "The item in a given slot of a given box.", items],
    318: ["dimensional_box_B_7", "The item in a given slot of a given box.", items],
    319: ["dimensional_box_B_8", "The item in a given slot of a given box.", items],
    320: ["dimensional_box_B_9", "The item in a given slot of a given box.", items],
    321: ["dimensional_box_B_10", "The item in a given slot of a given box.", items],
    322: ["box_B_interacted", "Whether you have interacted with Dimensional Box B. Unaccessed.", {
             0: "Initial state",
             999: "Interacted"
         }],
    // no 323-349
    350: ["status_undyne", "Self-explanatory.", [
             "Initial state",
             "Killed",
             "Sick"
         ]],
    351: ["undyne_hp_left", "How much HP Undyne has. Used to persist it even when you flee."],
    352: ["fought_undyne", "Self-explanatory. Alters her dialogue upon returning to finish the fight.", basicBool],
    353: ["poured_water_ground", "The amount of water poured on the ground (0-21). Affects the puddle size and Clam Guy's dialogue."],
    354: ["conversation_papyrus_calls", "Your loose progress through Waterfall as monitored by Papyrus's phone calls.", [
             "Initial state",
             "Received second clothes call",
             "Received Undyne hangout suggestion"
         ]],
    355: ["choice_maddummy", "Your interaction with the Mad Dummy before fighting it.", [
             "Initial state",
             "Punched",
             "Spared"
         ]],
    356: ["completed_piano_puzzle", "Self-explanatory.", basicBool],
    357: ["progress_water_battles", "How many Waterfall encounters you've had before Onionsan. Guarantees you encounter a variety of enemies.", [
             "Initial state",
             "Fought Aaron",
             "Fought Woshua",
             "Fought Moldsmals",
             "[4] And so on..."
         ]],
    358: ["progress_water2_battles", "How many Waterfall encounters you've had after Shyren. Guarantees you encounter a variety of enemies.", [
             "Initial state",
             "Fought Temmie",
             "Fought Moldsmal + Moldbygg",
             "Fought Woshua + Aaron",
             "Fought Moldbygg + Woshua",
             "[5] And so on..."
         ]],
    // no 359
    360: ["rain_unmuted", "Whether the rain in Waterfall is making sound. IGNORED IN LOADING.", basicBool],
    361: ["rain_track1_volume", "The volume of one of the rain tracks (0-0.5). IGNORED IN LOADING."],
    362: ["rain_track2_volume", "The volume of the other rain track (0-0.5). IGNORED IN LOADING."],
    363: ["rain_track1", "The sound index of rain track 1. IGNORED IN LOADING.", {
             0: "Uninitialized",
             277: "rain.ogg (v1.08)"
         }],
    364: ["rain_track2", "The sound index of rain track 2. IGNORED IN LOADING.", {
             0: "Uninitialized",
             277: "rain_deep.ogg (v1.08)"
         }],
    // no 365
    366: ["have_water", "Whether you have a cup of water.", basicBool],
    367: ["disable_alphys_calls", "Self-explanatory. Only set on Genocide.", basicBool],
    368: ["disable_alphys_statuses", "Self-explanatory. Only set on Genocide.", basicBool],
    369: ["progress_alphys_statuses", "Progress with Alphys's statuses. Prevents them from repeating, even if you leave the room.", {
             0: "Initial state",
             2: "First status (post-lab)",
             3: "Second status",
             4: "Third status",
             5: "Fourth status (conveyors)",
             6: "Fifth status (vents)",
             7: "Sixth status",
             8: "Seventh status (lasers)",
             9: "Eighth status",
             10: "Ninth status (shooter hub)",
             11: "Tenth status",
             12: "Eleventh status (right shooter)",
             13: "Twelfth status (vent chain)",
             16: "Thirteenth status (branch to apron)",
             17: "Papyrus status",
             18: "Fifteenth status",
             19: "Papyrus status 2",
             20: "Seventeenth status (many vents)",
             21: "Eighteenth status (Bad Opinion Zone)",
             22: "Nineteenth status",
             23: "Twentieth status",
             24: "21st status (Royal Guards)",
             25: "22nd status",
             26: "Anime phonecall",
             99: "Genocide"
         }],
    370: ["quick_battle", "An ID for the last quick battle you were in.", [
             "Initial state",
             "Undyne spears",
             "Hotland lasers",
             "CORE lasers"
         ]],
    371: ["laser1_off", "Whether the first lasers are, indeed, off.", basicBool],
    372: ["lasers_off", "Whether Alphys disabled the lasers for you because you got hurt. Alters dialogue and disables some later lasers.", basicBool],
    373: ["laser2_off", "Whether Alphys disabled the impassable laser.", basicBool],
    374: ["completed_shoot_puzzle1", "Whether you completed the left shooting puzzle.", basicBool],
    375: ["completed_shoot_puzzle2", "Whether you completed the right shooting puzzle.", basicBool],
    376: ["conveyor_puzzle_variable", "Persists the protagonist's x coordinate in the unused conveyor puzzle of room_fire10_old."],
    377: ["failed_jetpack_segment", "Whether you did, in fact, fail the jetpack segment.", basicBool],
    378: ["hot_dogs_money_spent", "The amount of money spent on hot dogs. Unaccessed."],
    379: ["conversation_hotdogs", "The number of hot animals bought."],
    380: ["headdogs", "The number of hot dogs on your head (0-30)."],
    381: ["reached_headdogs_limit", "Whether Sans has explained that thirty is the limit. Prevents him from repeating himself.", basicBool],
    382: ["muffet_bribe_price", "Muffet's current price to be bribed. Various, but trends upward."],
    383: ["muffet_bribe_money_spent", "Self-explanatory."],
    // no 384
    385: ["status_yellow_button", "Status of your phone's yellow button.", [
             "Initial state",
             "Available",
             "Pressed"
         ]],
    386: ["bridgeseed_puzzle1_solved", "Whether the first Bridge Seed puzzle is complete.", basicBool],
    387: ["won_ball_game", "Whether you earned the red flag. Alters reward amount and text.", basicBool],
    388: ["falling", "Whether you are currently falling from a Ruins puzzle. Keeps code from duplicating.", basicBool],
    389: ["dated_undyne", "Your progress in dating Undyne.", {
             0: "Initial state",
             3: "Left house",
             4: "Undyne left",
             5: "Date complete"
         }],
    390: ["undyne_expression", "Causes some changes to Undyne's faces.", [
             "Default",
             "Sweating",
             "Tomato-covered"
         ]],
    391: ["choice_meal_grillby", "The meal you got with Sans.", [
             "Initial state",
             "Fries",
             "Burger"
         ]],
    // no 392
    393: ["wizard_orb_special", "Used as a sound index for a Madjick Easter Egg. Unset.", {
             0: "Initial state",
             296: "mus_star.ogg (v1.08)"
         }],
    // no 394
    395: ["bombs_defused", "Self-explanatory. 0-6."],
    396: ["muffet_progress", "Progress through the pre-Muffet fight scene.", [
             "Initial state",
             "First textbox",
             "Second textbox",
             "Third textbox",
             "Fourth textbox",
             "Fifth textbox",
             "Muffet defeated"
         ]],
    397: ["killed_muffet", "Self-explanatory.", basicBool],
    398: ["current_elevator_floor", "Manages the elevator choicer and your destination.", [
             "L1",
             "R1",
             "R2",
             "L2",
             "L3",
             "R3"
         ]],
    399: ["completed_shoot_puzzle3", "Whether you completed the bottom shooting puzzle.", basicBool],
    400: ["completed_shoot_puzzle4", "Whether you completed the top shooting puzzle.", basicBool],
    401: ["asked_papyrus_rg", "Whether Undyne explained the brainwashing in Mew Mew Kissie Cutie. Alters the Royal Guard encounter.", basicBool],
    402: ["killed_rg", "Self-explanatory.", basicBool],
    403: ["spider_sale_big_spendings", "Whether you've bought from the expensive bake sale. Unaccessed.", basicBool],
    404: ["laser3_off", "Whether you managed to hit all three switches despite the call (glitches required). Unaccessed.", basicBool],
    405: ["conversation_wares", "How much you've talked with Bratty and Catty about their wares.", [
             "Initial state",
             "'About your wares'",
             "'Origin of wares'",
             "'Origin of garbage'"
         ]],
    406: ["conversation_mettaton", "How much you've talked with Bratty and Catty about Mettaton.", [
             "Initial state",
             "'About Mettaton'",
             "'Origin of Mettaton'"
         ]],
    407: ["conversation_alphys", "How much you've talked with Bratty and Catty about Alphys.", [
             "Initial state",
             "'About Alphys'",
             "'Royal Scientist'",
             "'About ASGORE'"
         ]],
    408: ["progress_hotland_battles", "How many Hotland (not CORE) encounters you've had. Guarantees you encounter a variety of enemies.", [
             "Initial state",
             "Fought Vulkin",
             "Fought Tsunderplane",
             "Fought Pyrope",
             "Fought Tsunderplane + Vulkin",
             "Fought Pyrope x2",
             "[6] And so on..."
         ]],
    409: ["got_napstablook_friend_req", "Whether you got Napstablook's self-rejecting friend request.", basicBool],
    // no 410-412
    413: ["dated_sans2", "Progress through dating Sans at MTT Resort.", [
             "Initial state",
             "In date",
             "Date complete"
         ]],
    414: ["got_alphys_advice1", "Whether you have attempted to take the elevator through the CORE.", basicBool],
    415: ["got_alphys_advice2", "Whether you have attempted to take the right path through the CORE.", basicBool],
    416: ["got_alphys_advice3", "Whether Alphys has told you not to head right, or if she's bailed.", basicBool],
    417: ["got_alphys_advice4", "Whether you have fought the scripted Knight Knight battle.", basicBool],
    418: ["core_shooter_complete", "Whether you have completed the final shooter puzzle. Unlocks the End.", basicBool],
    419: ["warriors_path_complete", "Whether you have completed the Warrior's Path. Unlocks the End.", basicBool],
    420: ["core_laser_timeout", "Whether you have waited the full minute. Unlocks the End.", basicBool],
    421: ["warriors_path_progression", "Your progression through the Warrior's Path.", [
             "Initial state",
             "Whimsalot + Final Froggit defeated",
             "Knight Knight + Madjick defeated",
             "'Nightmare' team defeated"
         ]],
    // no 422
    423: ["progress_core_battles", "Ensures a variety of encounters... for the unused obj_lazyencounterer_core."],
    424: ["turn_mettaton", "Status of turning around Mettaton.", [
             "Initial state",
             "Available",
             "Pressed"
         ]],
    425: ["killed_mettaton", "Whether you have killed Mettaton.", basicBool],
    426: ["progress_core_battles2", "How many CORE (not Hotland) encounters you've had. Guarantees you encounter a variety of enemies.", [
             "Initial state",
             "Fought Astigmatism",
             "Fought Whimsalot + Final Froggit",
             "Fought Whimsalot + Astigmatism",
             "Fought Final Froggit + Astigmatism",
             "Fought Knight Knight + Madjick",
             "[6] And so on..."
         ]],
    // no 427-429
    430: ["alphys_expression", "Controls which set of facial expressions Alphys is currently using.", [
             "Default",
             "Panicked (after Mettaton)",
             "Depressed (after Mettaton)",
             "Repentant (lab end)",
             "Resolute (Alphys ending)"
         ]],
    431: ["current_final_floor", "Which direction you are currently going or last took in the final elevator.", [
             "CORE",
             "New Home"
         ]],
    432: ["rode_long_elevator", "Whether you already took the long elevator. Significantly shortens the ride.", basicBool],
    433: ["unlocked_mettaton_house", "Whether you've unlocked the pink house.", basicBool],
    434: ["choice_flamey_challenge", "Your response to Heats Flamesman.", [
             "Initial state",
             "Remembered",
             "Forgot"
         ]],
    435: ["status_bpants", "Your progress toward talking with Burgerpants.", [
             "Initial state",
             "Made purchase",
             "Talked"
         ]],
    436: ["conversation_mtt", "How much you've talked with Burgerpants about Mettaton.", [
             "Initial state",
             "'Mettaton'",
             "'Why is Mettaton bad'",
             "'Why else is MTT bad'"
         ]],
    437: ["conversation_girls", "How much you've talked with Burgerpants/Bratty and Catty about each other.", {
             0: "Initial state",
             1: "Bpants: 'Romance Advice'",
             2: "Bpants: 'Glamburger Story'",
             // bruh making me use a dictionary
             4: "Girls: 'Burgerpants'",
             5: "Girls: 'More Burgerpants'",
             6: "Bpants: 'Bratty & Catty'",
             7: "Girls: 'B.Pants Hangout?'",
             8: "Girls: 'That Kind of Guy'",
             9: "Bpants: 'Catty's Invitation'"
         }],
    // no 438, 439
    440: ["water_taken_amount", "The amount of water taken from the Hotland cooler."],
    441: ["water_wasted_amount", "The amount of water poured out in front of Undyne. Unaccessed."],
    442: ["got_gun", "Whether you purchased the Empty Gun, a unique item.", basicBool],
    443: ["got_cowboy_hat", "Whether you purchased the Cowboy Hat, a unique item.", basicBool],
    444: ["got_mystery_key", "Whether you purchased the Mystery Key, a unique item.", basicBool],
    445: ["got_face_steak", "Whether you purchased the Face Steak, a unique item.", basicBool],
    // no 446-449
    450: ["progress_story", "Loosely, How much of Asriel's story you've heard.", [
             "Initial state",
             "'A long time ago'",
             "2-3 encounters (see 455-456)",
             "'Very ill' (basement)",
             "'One request'",
             "'The human died'",
             "'Incredible power'",
             "'Into the sunset'",
             "'Golden flowers'",
             "'The villagers saw ASRIEL'",
             "'Blow after blow'",
             "'ASRIEL smiled'",
             "'Across the garden'",
             "'Fell into despair'",
             "'End our suffering'",
             "'Not long now'",
             "'You should be smiling'",
             "'You're going to be free'"
         ]],
    // no 451
    452: ["have_castle_key1", "Whether you have the kitchen key.", basicBool],
    453: ["have_castle_key2", "Whether you have the bedrooms key.", basicBool],
    454: ["unlocked_latchkey", "Your progress in unlocking Asgore's basement.", {
             "0": "Initial state",
             "0.5": "Interacted with",
             "1": "Unlocked"
         }],
    455: ["early_story_parameter1", "How many story encounters you got (0-2) en route to the kitchen. Prevents a 'fourth' encounter."],
    456: ["early_story_parameter2", "How many story encounters you got (0-2) en route to the bedrooms. Prevents a 'fourth' encounter."],
    457: ["told_asgore_ready", "Whether you said you weren't ready. Slightly alters Asgore's dialogue on returning.", basicBool],
    458: ["experience_cosmic_garbage", "Whether you have felt like garbage with Napstablook. Alters their dialogue afterward.", basicBool],
    459: ["riverman_destination", "The destination you selected with River Person.", [
             "Initial state",
             "Snowdin",
             "Waterfall",
             "Hotland"
         ]],
    460: ["riverman_times_rode", "The amount of fast travel you have found use for in such a short game."],
    461: ["tem_boat_version", "Whether your last boat ride featured the dog face. (It alternates.)", basicBool],
    462: ["called_already", "The number of phone calls you have made in the current room. Only has effects beyond 2."],
    // no 463, 464
    465: ["papyrus_and_undyne", "Whether Undyne can be called with Papyrus (after her date).", basicBool],
    // no 466-469
    470: ["conversation_undyne_mad", "Whether Undyne and Papyrus have discussed meterology on the phone. Prevents her from repeating it, even if you re-enter the room.", basicBool],
    // no 471-474
    475: ["killed_flowey", "Self-explanatory.", basicBool],
    476: ["killed_asgore", "Self-explanatory.", basicBool],
    // no 477, 478
    479: ["truelab_unsuppress_border", "Whether the True Lab border has been unlocked. Maintains the border when backtracking to the first two initially-borderless rooms.", basicBool],
    480: ["inside_truelab", "Whether you are inside the True Lab. Darkens obj_mainchara appropriately.", basicBool],
    481: ["truelab_red_key_status", "Status of the red key.", [
             "Initial state",
             "In sink",
             "Collected",
             "In slot"
         ]],
    482: ["truelab_blue_key_status", "Status of the blue key.", [
             "Initial state",
             "On ground",
             "Collected",
             "In slot"
         ]],
    483: ["truelab_green_key_status", "Status of the green key.", [
             "Initial state",
             "In tub",
             "Collected",
             "In slot"
         ]],
    484: ["truelab_yellow_key_status", "Status of the yellow key.", [
             "Initial state",
             "On bed",
             "Collected",
             "In slot"
         ]],
    485: ["truelab_complete", "Whether you have restored power. Activates the 'creepy' lab monitors.", basicBool],
    486: ["truelab_sink_interact_count", "The number of times you have turned on True Lab sinks. Used for Memoryhead spawning, after which it jumps to 10."],
    487: ["truelab_sink_key", "Which sink has the key in it.", [
             "None",
             "Left sink",
             "Middle sink",
             "Right sink"
         ]],
    488: ["truelab_spared_reaperbird", "Whether you have defeated Reaper Bird.", basicBool],
    489: ["truelab_spared_lemon", "Whether you have defeated Lemon Bread.", basicBool],
    490: ["truelab_spared_endogeny", "Whether you have defeated Endogeny.", basicBool],
    491: ["truelab_elevator_power", "Whether the power switch has been flipped (kind of redundant to 485).", basicBool],
    492: ["enable_alphys_date", "Whether you've defeated Mettaton, locking the door to the Lab until Alphys is dated (when it is reset to 0)", basicBool],
    493: ["true_pacifist_progression", "Tracks progress through True Pacifist.", {
             0: "Initial state",
             8: "Undyne waiting with letter",
             9: "Letter acquired",
             10: "Alphys date complete",
             11: "Received Papyrus call",
             12: "True Lab complete"
         }],
    494: ["status_undyne_letter", "Status of dropping Undyne's Letter.", {
             0: "Initial state",
             1: "Dropped",
             3: "Received EX letter"
         }],
    495: ["popato_chisps_bought", "Amount of potato chisps you have bought. (0-8)"],
    496: ["conversation_onionsan", "Onionsan's status.", {
             "-1": "Rejected",
             "0": "Initial state",
             "1": "Onionsan appeared",
             "2": "'It's my Big Favorite'",
             "3": "'Like all my friends did'",
             "4": "'Undyne's gonna fix everything'",
             "5": "'See you around'",
             "6": "'I'm starting a band'",
             "7": "Met in epilogue"
         }],
    497: ["got_sans_room_key", "Progress with Sans's keys.", [
             "Initial state",
             "Got room key",
             "Entered room",
             "Got silver key"
         ]],
    // no 498
    499: ["seen_cast", "Whether the credits have activated, keeps them from re-activating even when the room changes.", basicBool],
    500: ["but_it_refused", "Cannot die.", basicBool],
    501: ["conversation_asriel_fight", "Progress in Asriel's second phase.", [
             "Initial state",
             "SAVE available",
             "All friends SAVED",
             "Begun SAVING Asriel"
         ]],
    502: ["refuse_count", "Number of times you died to Asriel."],
    503: ["dreamed_asriel_fight", "Whether you have Dreamed yet. Alters the Dream narration.", basicBool],
    504: ["asriel_turn_restore_point", "The turn that will be reloaded to when you refuse to die to Asriel."],
    505: ["saved_undyne", "Self-explanatory.", basicBool],
    506: ["saved_alphys", "Self-explanatory.", basicBool],
    507: ["saved_papyrus_sans", "Self-explanatory.", basicBool],
    508: ["saved_toriel_asgore", "Self-explanatory.", basicBool],
    509: ["decimal_hp_state", "Overrides the HP writer for the low decimals.", [
             "Initial state",
             "00.001",
             "00.0001",
             "00.000001",
             "00.0000000001"
         ]],
    510: ["plot_over", "Somewhat controls the waking-up scene after the Asriel fight.", [
             "Initial state",
             "Scene started",
             "Scene complete"
         ]],
    511: ["conversation_asriel2", "The amount you have talked to Asriel in the Ruins."],
    512: ["choice_left_toriel", "Your choice in the final scene. Not in save data.", [
             "I want to stay with you",
             "I have places to go"
         ]]
};

// Options and links for options
let flagFor = { // Link flags with inputs
    "sav-fun": 5,
    "sav-defeatedasriel": 7,
    "sav-trainingdummystate": 14,
    "sav-torielstate": 45,
    "sav-doggostate": 52,
    "sav-dogamydogaressastate": 53,
    "sav-greaterdogstate": 54,
    "sav-comedianstate": 57,
    "sav-papyrusstate": 67,
    "sav-shyrenstate": 81,
    "sav-papdate": 88,
    "sav-ruinskills": 202,
    "sav-snowdinkills": 203,
    "sav-waterfallkills": 204,
    "sav-hotlandkills": 205,
    "sav-undynestate1": 251,
    "sav-maddummystate": 252,
    "sav-undynestate2": 350,
    "sav-unddate": 389,
    "sav-muffetstate": 397,
    "sav-broguardsstate": 402,
    "sav-mettatonstate": 425,
    "sav-asgkey1": 452,
    "sav-asgkey2": 453,
    "sav-undyne-cell": 465,
    "sav-redkey": 481,
    "sav-blukey": 482,
    "sav-grnkey": 483,
    "sav-ylwkey": 484,
    "sav-alpdate": 493,
    "sav-sanskey": 497
};

for (let i = 1; i <= 10; i++) {
    flagFor["sav-boxa" + i] = 299 + i;
    flagFor["sav-boxb" + i] = 311 + i;
}

let stateChoiceArrays = {
    "sav-trainingdummystate": [
        "Initial state",
        "Killed",
        "Talked to",
        "Tired of your shenanigans"
    ],
    "sav-undynestate1": killedBool, // Undyne The Undying
    "sav-maddummystate": killedBool, // *Glad Dummy
    "sav-muffetstate": killedBool,
    "sav-broguardsstate": killedBool,
    "sav-mettatonstate": killedBool,
    "sav-asgkey1": ["Initial state", "Got key"],
    "sav-asgkey2": ["Initial state", "Got key"],
    "sav-weapon": weapons,
    "sav-armor": armors,
    "sav-plotvalue": plotValues,
    "sav-location": rooms[1],
    "ini-location": rooms[1],
    "ini-omega-soul": [
        "None (Initial state)",
        "Light blue (Initiated fight)",
        "Orange",
        "Blue",
        "Purple",
        "Green",
        "Yellow",
        "None (Finished fight)"
    ],
    "ini-toriel-pie": [
        "Initial state",
        "Butterscotch",
        "Cinnamon"
    ],
    "ini-omega-beat": [
        "Initial state",
        "Fight or Spare",
        "At exit"
    ],
    "ini-sans-password": [
        "Initial state",
        "\"stupid doodoo butt\"",
        "\"legendary fartmaster\"",
        "\"out of material\""
    ],
    "ini-flowey-speech": [
        "Initial state",
        "Credits complete",
        "Received speech"
    ],
    "ini-flowey-change": [
        "Initial state",
        "Changed to pacifism",
        "Changed from pacifism"
    ],
    "ini-flowey-extra": [
        "Initial state",
        "\"You're pissing me off.\"",
        "Flowey Fan Club",
        "Smiley Trashbag",
        "\"You're just bored.\"",
        "\"Don't you have anything better to do?\""
    ]
};

for (let i = 0; i < flagCount; i++) {
    if (!flags[i])
        flags[i] = ["unused"];
}

for (let i = 1; i <= 8; i++) {
    stateChoiceArrays["sav-invslot"  + i] = items;
    stateChoiceArrays["sav-cellslot" + i] = cellOpts;
}
