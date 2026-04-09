const basicBool = "checkbox",
      enemyStates = [
          "Default state",
          "Violenced (includes SnowGrave)",
          "Spared",
          "Pacified",
          "In combat (Ch. 1)",
          "Violenced by uncontrolled Susie (unused in demo due to a bug)",
          "Frozen"
      ],
      tennaRanks = {
          "-1": "?",
          "0": "Z",
          "1": "C",
          "2": "B",
          "3": "A",
          "4": "S",
          "5": "T"
      },
      recruits = {
          // Unrecruitable enemy IDs commented
          1: "Invalid (1)", // placeholder enemy
          // 2: "Lancer 1",
          // 3: "Dummy",
          // 4: "Ralsei (unused tutorial)",
          5: "Rudinn",
          6: "Hathy",
          // 7: "Clover (unused)",
          // 9: "C. Round",
          // 10: "K. Round 1",
          11: "Ponman",
          // 12: "Lancer 3 (vs Susie)",
          13: "Rabbick",
          14: "Bloxer",
          15: "Jigsawry",
          // 16: "Clover 1",
          // 17: "DoomTank (old Thrash Machine)",
          // 18: "Lancer 2 (with Susie)",
          // 19: "Susie (with Lancer)",
          20: "JEVIL",
          // 21: "K. Round 2",
          22: "Rudinn Ranger",
          23: "Head Hathy",
          // 25: "King",
          
          30: "Ambyu-Lance",
          31: "Poppup",
          32: "Tasque",
          33: "Werewire",
          34: "Maus",
          35: "Virovirokun",
          36: "Swatchling",
          // 37: "Cap'n",
          // 38: "K_K",
          // 39: "Sweet",
          40: "Werewerewire",
          // 41: "GrazeTest (dojo?)"
          42: "Tasque Manager",
          // 43: "Berdly 1 (coaster)",
          44: "Mauswheel",
          // 45: "Rouxls 1 (pirate)",
          // 46: "Berdly 2",
          // 47: "Clover 2 (dojo)",
          // 48: "Queen",
          // 49: "Spamton",
          // 50: "Spamton NEO",
          // 51: "GIGA Queen",
          // 52: "Jigsaw Joe (dojo)",
          // 53: "Pipis",
          
          54: "Shadowguy",
          55: "Shuttah",
          56: "Zapper",
          57: "Ribbick",
          58: "Watercooler",
          59: "Pippins",
          60: "Elnina",
          61: "Lanino",
          // 102: "Rouxls 2 (card)",
          // 103: "Tenna 2",
          // 104: "Knight",
          // 105: "Tenna 1 (doom board)",
          // 106: "Elnina (dojo, unused)",
          // 107: "Lanino (dojo, unused)",
          
          62: "Guei",
          63: "Balthizard",
          64: "Bibliox",
          65: "Mizzle",
          66: "Wicabel",
          67: "Winglade",
          68: "Organikk",
          69: "Ms. Mizzle",
          // 105: "Hammer of Justice",
          // 106: "???/Sound of Justice",
          // 107: "Jackenstein",
          // 108: "Titan",
          // 109: "Titan Spawn",
          // 110: "Elnina 2 (dojo)",
          // 111: "Lanino 2 (dojo)",
          // 500: "Multiboss Example",
          // 501: "Multiboss C Example",
          
          
      },
      flagCount = 2500; // 9999 in Chapter 1, need a method for changing this dynamically (might just fork it lol)


const consumables = {
     0: "Empty",
     1: "Dark Candy",
     2: "Revive Mint",
     3: "Glowshard",
     4: "Manual",
     5: "Broken Cake (unused)",
     6: "Top Cake",
     7: "Spin Cake",
     8: "Darkburger",
     9: "Lancer Cookie",
    10: "Giga Salad",
    11: "Clubs Sandwich",
    12: "Hearts Donut",
    13: "Choco Diamond",
    14: "Fav Sandwich",
    15: "RouxlsRoux",
    
    16: "CD Bagel",
    17: "Mannequin (unused)",
    18: "Kris Tea",
    19: "Noelle Tea",
    20: "Ralsei Tea",
    21: "Susie Tea",
    22: "DD-Burger",
    23: "Light Candy",
    24: "Butler Juice",
    25: "Spaghetti Code",
    26: "Java Cookie",
    27: "Tension Bit",
    28: "Tension Gem",
    29: "Tension Max",
    30: "Revive Dust",
    31: "Revive Brite",
    32: "S. POISON",
    33: "Dog Dollar",
    
    34: "TVDinner",
    35: "Pipis",
    36: "FlatSoda",
    37: "TVSlop",
    38: "ExecBuffet",
    39: "DeluxeDinner",
    
    60: "AncientSweet",
    61: "Rhapsotea",
    62: "Scarlixir",
    63: "BitterTear",
    
    64: "<invalid>"
},
      weapons = {
    // Stats in same order as save file: AT, DF, Mag, attack bolts (presumably the thing that you use to time attacks), some unused values (grazeamt, grazesize, boltspeed, itemspecial), element (6 is Cat), element bonus amount.
    //   name                AT  DF MAG BLT GZ GZ BS IS EL ELM
     0: ["Empty",            0,  0, 0,  0,  0, 0, 0, 0, 0, 0],
     1: ["Wood Blade",       0,  0, 0,  1,  0, 0, 0, 0, 0, 0],
     2: ["Mane Ax",          0,  0, 0,  1,  0, 0, 0, 0, 0, 0],
     3: ["Red Scarf",        0,  0, 0,  1,  0, 0, 0, 0, 0, 0],
     4: ["Everybody Weapon", 12, 6, 8,  1,  0, 0, 0, 0, 0, 0],
     5: ["Spookysword",      2,  0, 0,  1,  0, 0, 0, 0, 0, 0],
     6: ["Brave Ax",         2,  0, 0,  1,  0, 0, 0, 0, 0, 0],
     7: ["Devilsknife",      5,  0, 4,  1,  0, 0, 0, 0, 0, 0],
     8: ["Trefoil",          4,  0, 0,  1,  0, 0, 0, 0, 0, 0],
     9: ["Ragger",           2,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    10: ["Dainty Scarf",     0,  0, 2,  1,  0, 0, 0, 0, 0, 0],
    
    11: ["Twisted Sword",    16, 0, 0,  1,  0, 0, 0, 0, 0, 0],
    12: ["Snow Ring",        0,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    13: ["Thorn Ring",       14, 0, 12, 1,  0, 0, 0, 0, 0, 0],
    14: ["Bounce Blade",     2,  1, 0,  1,  0, 0, 0, 0, 0, 0],
    15: ["Cheer Scarf",      1,  0, 2,  1,  0, 0, 0, 0, 0, 0],
    16: ["Mecha Saber",      4,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    17: ["Auto Axe",         4,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    18: ["Fiber Scarf",      2,  0, 2,  1,  0, 0, 0, 0, 0, 0],
    19: ["Ragger 2",         5,  0, -1, 1,  0, 0, 0, 0, 0, 0],
    20: ["Broken Sword",     0,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    21: ["Puppet Scarf",     10, 0, -6, 1,  0, 0, 0, 0, 0, 0],
    22: ["Freeze Ring",      4,  0, 4,  1,  0, 0, 0, 0, 0, 0],
    
    23: ["Saber10",          6,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    24: ["Toxic Axe",        6,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    25: ["Flex Scarf",       4,  0, 1,  1,  0, 0, 0, 0, 0, 0],
    26: ["Black Shard",      16, 0, 0,  1,  0, 0, 0, 0, 0, 0],
    
    50: ["Jingle Blade",     7,  1, 0,  1,  0, 0, 0, 0, 0, 0],
    51: ["Scarf Mark",       4,  1, 1,  1,  0, 0, 0, 0, 0, 0],
    52: ["Justice Axe",      12, 0, 0,  1,  0, 0, 0, 0, 0, 0],
    53: ["Winglade",         8,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    54: ["Absorb Ax",        8,  0, 0,  1,  0, 0, 0, 0, 0, 0],
},
      armors = {
    // Stats in same order as save file: AT, DF, Mag, attack bolts (presumably the thing that you use to time attacks), some unused values (grazeamt, grazesize, boltspeed, itemspecial), element (6 is Cat), element bonus amount.
    //   name               AT DF MAG BLT GZ GZ BS IS EL ELM
     0: ["Empty",           0, 0, 0,  0,  0, 0, 0, 0, 0, 0   ],
     1: ["Amber Card",      0, 1, 0,  0,  0, 0, 0, 0, 0, 0   ],
     2: ["Dice Brace",      0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
     3: ["Pink Ribbon",     0, 1, 0,  0,  0, 20,0, 0, 0, 0   ],
     4: ["White Ribbon",    0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
     5: ["Iron Shackle",    1, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
     6: ["Mouse Token",     0, 0, 2,  0,  0, 0, 0, 0, 7, 0.5 ],
     7: ["Jevilstail",      2, 2, 2,  0,  0, 0, 0, 0, 0, 0   ],
     8: ["Silver Card",     0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    
     9: ["Twin Ribbon",     0, 3, 0,  0,  0, 20,0, 0, 0, 0   ],
    10: ["Glow Wrist",      0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    11: ["Chain Mail",      0, 3, 0,  0,  0, 0, 0, 0, 0, 0   ],
    12: ["B.Shot Bowtie",   0, 2, 1,  0,  0, 0, 0, 0, 0, 0   ],
    13: ["Spike Band",      2, 1, 0,  0,  0, 0, 0, 0, 0, 0   ],
    14: ["Silver Watch",    0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    15: ["Tension Bow",     0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    16: ["Mannequin",       0, 0, 0,  0,  0, 0, 0, 0, 6, 0.35],
    17: ["DarkGold Band",   0, 0, 0,  0,  0, 0, 0, 0, 0, 0   ],
    18: ["Sky Mantle",      0, 1, 0,  0,  0, 0, 0, 0, 1, 0.5 ],
    19: ["Spike Shackle",   3, 1, 0,  0,  0, 0, 0, 0, 0, 0   ],
    20: ["Frayed Bowtie",   1, 1, 1,  0,  0, 0, 0, 0, 6, 0.15],
    21: ["Dealmaker",       0, 5, 5,  0,  0, 0, 0, 0, 6, 0.4 ],
    22: ["Royal Pin",       0, 3, 1,  0,  0, 0, 0, 0, 0, 0   ],
    
    23: ["Shadow Mantle",   0, 4, 0,  0,  0, 0, 0, 0, 5, 0.66],
    24: ["Lode Stone",      0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    25: ["Ginger Guard",    0, 3, 0,  0,  0, 0, 0, 0, 0, 0   ],
    26: ["Blue Ribbon",     0, 1, 1,  0,  0, 0, 0, 0, 0, 0   ],
    27: ["Tenna Tie",       0, 5, -2, 0,  0, 0, 0, 0, 0, 0   ],
    
    50: ["Waferguard",      0, 4, 0,  0,  0, 0, 0, 0, 0, 0   ],
    51: ["Mystic Band",     0, 0, 4,  0,  0, 0, 0, 0, 0, 0   ],
    52: ["Power Band",      4, 0, 0,  0,  0, 0, 0, 0, 0, 0   ],
    53: ["Princess Ribbon", 2, 4, 0,  0,  0, 0, 0, 0, 0, 0   ],
    54: ["Gold Widow",      1, 5, 1,  0,  0, 0, 0, 0, 0, 0   ],
},
      lightItems = [
    "Empty",
    "Hot Chocolate",
    "Pencil",
    "Bandage",
    "Bouquet",
    "Ball of Junk",
    "Halloween Pencil",
    "Lucky Pencil",
    "Egg",
    
    "Cards",
    "Box of Heart Candy",
    "Glass",
    "Eraser",
    "Mechanical Pencil",
    "Wristwatch",
    
    "Holiday Pencil",
    "Cactus Needle",
    "Black Shard",
    "Quill Pen",
],
      keyItems = {
     0: "Empty",
     1: "Cell Phone",
     2: "Egg",
     3: "Broken Cake",
     4: "Broken Key A",
     5: "Door Key",
     6: "Broken Key B",
     7: "Broken Key C",
    
     8: "Lancer",
     9: "Rouxls Kaard",
    10: "Empty Disk",
    11: "Loaded Disk",
    12: "KeyGen",
    13: "Shadow Crystal",
    14: "Starwalker",
    15: "Pure Crystal",
    
    16: "Odd Controller",
    17: "Backstage Pass",
    18: "Trip Ticket",
    19: "Lancer Controller",
    
    30: "Sheet Music",
    31: "Claimb Claws",
},
      cellOpts = {
    "0": "Empty",
    "201": "Call Home",
    "202": "Sans's Number"
};

let rooms = [[], [], []];
rooms[2] = [
    /* rooms list here, strings containing either "SAVE" or "Dogchecked" (well, or neither) */
];

const plotValues = [
    /* Chapter 1 */
    {
        0: "New game",
        1: "Left bed",
        2: "Looking for partner",
        3: "Susie came and went",
        4: "At entrance to closet",
        5: "Inside closet",
        10: "Entered Dark World",
        11: "Stood up after entering Dark World",
        12: "Seen first background Lancer",
        13: "Seen second background Lancer",
        14: "Found (and lost) Susie",
        16: "Landed in Castle Town",
        20: "Viewing Legend",
        21: "Viewed Legend",
        22: "Beat Lancer",
        30: "Ralsei joined",
        31: "Passed dummy fight",
        32: "Ralsei mentioned door",
        33: "Entered Field of H&D",
        34: "Lancer 'invited' you to 3 Hathy fight",
        36: "Entered 3 Hathy fight",
        37: "Susie joined",
        39: "Ralsei mentioned Susie should ACT",
        40: "C. Round fight",
        42: "Ralsei discussed warning",
        45: "Susie threatened Lancer",
        50: "Did box puzzle",
        55: "Did bucket scene",
        60: "Beat K. Round",
        70: "Dark Fun Gang introduced",
        71: "Entered first suits puzzle",
        72: "Did the puzzle on Lancer and Susie's behalf",
        75: "Clover fight",
        80: "Bought Lancer Cookie",
        85: "Warned about forest maze",
        90: "Entered forest maze",
        95: "Found Lancer dead end",
        100: "Found Susie dead end",
        120: "Escaped forest maze",
        130: "Lancer joined",
        152: "Freed Susie from prison",
        154: "Susie spared Lancer",
        156: "Party reunited",
        165: "Susie joined for real",
        175: "Beat K. Round 2",
        235: "King fight",
        240: "Left toward fountain",
        241: "Compelled to go back for goodbyes",
        242: "Talked to Ralsei about talking to Lancer",
        243: "Talked to Lancer",
        244: "Left toward fountain for real",
        250: "Awakened in classroom",
        251: "Susie left"
    },
    /* Chapter 2 */
    {
        "0": "New game",
        "1": "Left bed",
        "2": "Arrived in class",
        "6": "At dark door",
        "7": "Entered Dark World",
        "8": "Met Ralsei",
        "9": "Got junk ball",
        "10": "Populated Castle Town",
        "12": "Invited to castle",
        "13": "Entered castle",
        "14": "Checked upstairs",
        "15": "Checked Susie's room",
        "16": "Got key characters",
        "17": "Left Dark World",
        "20": "Entering Cyber World",
        "49": "Bed skip",
        "50": "Entered Cyber World",
        "51": "Met Queen",
        "52": "Seen Sweet", // After the first teacup ride.
        "33": "Arcade game introduced", // out of order
        "54": "Powers combined",
        "55": "Played arcade game",
        "60": "Fought Sweet Cap'n Cakes",
        "64": "Fought Berdly 1",
        "65": "Entered Cyber City",
        "65.5": "Learned about storage", // this is like the only decimal in the chapter
        "66": "Ralsei and Susie left",
        "67": "Seen Ralsei and Susie in background",
        "68": "Seen Noelle",
        "69": "Seen Noelle again",
        "70": "Noelle joined",
        "72": "First mouse puzzle done",
        "75": "Berdly statue introduced",
        "77": "Second mouse puzzle done",
        "78": "Third mouse puzzle done",
        "79": "Fought Berdly 2",
        "80": "Finished car game",
        "82": "Finished unused puzzle",
        "83": "Left after unused puzzle", // obj_ch2_city04 has Berdly, Queen, and 'You know Susie would just lord it over me'.
        "85": "Beat Spamton",
        "90": "Left car",
        "94": "Finished DECEMBER sequence",
        "95": "Full party",
        "99": "Sent to room",
        "100": "Freed Lancer",
        "101": "Berdly rejoined",
        "105": "1st light puzzle solved",
        "110": "2nd light puzzle solved",
        "115": "FOR THE SIDE OF IGNORANCE",
        "120": "Regained Ralsei",
        "125": "Lost Susie and Berdly",
        "140": "Hit hand",
        "150": "Swan ride complete",
        "160": "Susie rejoined/reached 3F (Weird)",
        "165": "Queen defeated",
        "170": "GIGA Queen skipped",
        "171": "GIGA Queen defeated",
        "200": "Sealed fountain",
        "205": "Susie following",
        "210": "Susie & Toriel cooking",
        "211": "Washed your hands"
    },
    /* Chapter 3 */
    {
        0: "New game",
        10: "Woke up",
        20: "Met Ralsei",
        21: "Completed blind eye puzzle",
        22: "Completed standing on buttons puzzle",
        30: '"I can\'t go to the Light World."',
        40: "Explained darker than dark",
        45: "Revealed Darkners as objects",
        50: "Tenna introduced",
        60: "Tenna introduction",
        70: "Before the Show",
        80: "Board 1 started",
        99: "Cooking show started",
        100: "Cooking tutorial completed",
        110: "Board 1 completed",
        120: "A WORD from our sponsors",
        121: "Reached Green Room",
        122: "Susie talked to Tenna",
        128: "Board 2 ready",
        130: "Board 2 started",
        131: "Entered Atlantis",
        140: "Board 2 completed",
        150: "A WORM from our sponsors",
        160: "Reached Green Room again",
        170: "Doom Board started",
        180: "Board 3 started (unused)",
        199: "Board 3 Yogurt Emergency (unused)",
        215: "Board 3 completed (unused)",
        225: "Board 3 attempt 2 failed due to Sword Route (unused)",
        230: "Doom Board more started",
        250: "Escaped Tenna",
        255: "Started cowboy game",
        270: "Darkners left Tenna",
        280: "Mike left Tenna",
        290: "Tenna prefight speech started",
        300: "Tenna prefight speech completed",
        310: "Tenna defeated",
        320: '"No one\'s gonna get thrown away.\"',
        340: "Knight passed", // value duplicated when reaching light world
        350: "Shelter opened"
    },
    /* Chapter 4 */
    {
        "0": "New game",
        "5": "Woke up",
        "10": "Eating breakfast",
        "11": "Got church clothes",
        "15": "Off to church",
        "20": "In church lobby",
        "25": "Wandering around church",
        "30": "Invited to Noelle's",
        "40": "Ditched church clothes",
        "45": "Holiday gate unlocked",
        "50": "In front of ho-ho-home",
        "55": "Entered ho-ho-home",
        "60": "Susie distracting Noelle from phone",
        "61": "SOUL ripped out",
        "62": "Noelle went to her room (Weird Route)",
        "63": "Thrown in present",
        "64": "Kris and Noelle escaped (aborted Weird Route)",
        "65": "SOUL captured by Noelle",
        "66": "SOUL left on table",
        "67": "Susie got guitar",
        "85": "Re-equipped Thorn Ring (Weird Route)",
        "90": "Met Carol",
        "91": "Leaving ho-ho-home",
        "95": "Ate snack tray",
        "100": "Rain started",
        "105": "Entered Dark Sanctuary",
        "108": '"Kinda gives me the creeps."',
        "110": "Cast down by Knight",
        "120": "Met Ralsei",
        "125": "Entered Guei room",
        "126": "Seen first prophecies",
        "127": "Ralsei acknowledges his is a summary",
        "128": "Glimpsed Gerson",
        "140": "Met Gerson",
        "141": "Gerson entered next room",
        "145": "Ralsei stool form",
        "150": "Entered room Gerson gets lost in",
        "160": "Gerson went to the study",
        "170": "Party went to the study",
        "175": "Getting sheet music",
        "180": "Got sheet music",
        "185": "Played piano",
        "190": "Said bye to Gerson",
        "194": "Susie chasing Knight",
        "195": "Knight escaped",
        "200": "Sealed Dark Sanctuary",
        "210": "Door is locked",
        "220": "Wait, Gerson is dead",
        "225": "Creating Second Sanctuary",
        "230": "Created Second Sanctuary",
        "231": "Entered Second Sanctuary",
        "234": "Triggered Second Sanctuary music",
        "235": "Entered first Second Sanctuary prophecy room",
        "236": "Susie acknowledges prophecy",
        "237": "Movable piano room",
        "238": "Fully in movable piano room",
        "238.1": "Walking on walls room",
        "238.2": "Susie noticing \"cage\" prophecy",
        "238.3": "\"Cage\" prophecy completed",
        "238.5": "Entered first cylinder tower climb",
        "238.6": "Susie saw hope prophecy",
        "238.61": "Climbed first cylinder tower",
        "238.65": "Susie saw love prophecy",
        "239": "Reached abandoned study",
        "239.1": "Dialogue in abandoned study",
        "239.2": "Considered taking hammer to Castle Town",
        "239.99": "Warped to Sound of Justice",
        "240": "Defeated Sound of Justice",
        "241": "Ralsei offers honesty",
        "242": "Ralsei doesn't know anything else useful",
        "242.3": "Fire extinguisher knows the code",
        "243": "Met Ralsei in Third Sanctuary",
        "244": "Looking for Knight",
        "244.9": "First save point in Third Sanctuary",
        "245": "Rode recruits tower",
        "248": "Climbed past a ton of swords",
        "250": "Climbing Titan (1)",
        "259": "Inside Titan",
        "260": "Defeated Titan",
        "270": "Susie rejects final prophecy",
        "280": "Closed last fountain",
        "290": "Realizes that was all pointless",
        "300": "Exited church",
        "310": "Went to bed",
        "320": "Chapter complete",
    }
];

// Big thanks to Xkeeper for cluing me in on a bunch of the Chapter 1 flags: https://mini.xkeeper.net/private/deltarune/data/flags.txt
// This definitely saved a lot of time in figuring out stuff like Thrash Machine and Goner values.
let flags = {
    // Format of [name (String), description (String), options (Object)]
    6: ["disable_text_skip", "Volatile. Prevents you from skipping text in some cutscenes.", basicBool],
    7: ["disable_menu?", "Seems to prevent you opening the Dark World menu. And affect the music when leaving shops?", basicBool],
    8: ["simplify_vfx", "Self-explanatory. Set in Dark World menu.", basicBool],
    9: ["battle_music", "Volatile. Allows or prevents the game from playing Rude Buster at the start of an encounter.", [
            "Default state",
            "In battle",
            "Starting boss music"
       ]],
    10: ["wrist_protector", "Whether you have the Wrist Protector. Enabled by default since the Chapter 1&2 release.", basicBool],
    11: ["auto_run", "Whether you have enabled auto-run.", basicBool],
    12: ["disable_shaking", "Debug variable. Keeps the game screen from shaking. Intended to be set in Dark World menu?", basicBool],
    13: ["use_old_attack", "Debug variable. Use Z, X, and C, not just Z, to time attacks.", basicBool],
    14: ["remember_battle_menu", "Debug variable. Prevents the game from resetting your selection to 'FIGHT' each turn.", basicBool],
    15: ["sound_volume", "Volume of sound effects. Doesn't work correctly?"],
    16: ["music_volume", "Volume of music. Doesn't work correctly?"],
    17: ["audio_volume", "Volume of all audio. Doesn't work correctly?"],
    20: ["other_text_command", "Volatile. Controls how some characters' overworld sprites interact with their dialogue, among other things."],
    21: ["door_freeze_timer", "Volatile. Controls timing of room fades?"],
    22: ["disable_x_slowing", "Added in 1.08. Pressing Z while holding C in combat toggles it. Becomes debug-only in 1.09.", basicBool],
    23: ["can_climb", "Whether you can climb walls using the Claimb Claws.", basicBool],
    29: ["susie_show_eyes", "Makes Susie show her eyes at the end of Chapter 1. Ignored in Chapter 2; she shows her eyes anyway.", basicBool],
    30: ["ralsei_hat_state", "Controls Ralsei's face selection. Ignored in Chapter 2; he's hatless anyway.", [
            "Hat",
            "Hood",
            "Hatless"
        ]],
    31: ["disable_loud_steps", "Stops the echoing step sound found in the ?????? area, Great Door field, and Jevil's room.", basicBool],
    32: ["hide_equip_comments", "Prevents Susie and Ralsei from commenting on items you give them when in room_man.", basicBool],
    33: ["choice_time_taken", "Volatile. The time, in frames, you take to make a choice. Used by Sans."],
    34: ["disable_monster_acts", "Initialized to 1, reset to 0 when unlocking S-Action and R-Action.", basicBool],
    35: ["gameover_mode", "Controls what the game does on game over. Usually 0.", [
            "Normal Game Over",
            "Party Dojo",
            "Immediate respawn?"
        ]],
    36: ["dojo_failure", "Set when losing Party Dojo battles (i.e. when flag 35 is 1). Affects prize and dialogue.", basicBool],
    37: ["dojo_active", "Alters battle win text and prevents you from gaining money outside of prizes.", basicBool],
    38: ["no_battle_end_msg", "Disables the battle end message. Used for SnowGraving Berdly and Party Dojo.", basicBool],
    39: ["dojo_abort?", "Something to do with immediately ending Party Dojo battles, also used in the Jackenstein fight.", basicBool],
    40: ["violences", "Total number of enemies defeated through FIGHTing. Can be reduced by obtaining forgiveness from Rudinn or Hathy."],
    41: ["spares", "Total number of enemies SPAREd. Unaccessed."],
    42: ["pacifies", "Total number of enemies Pacify/Sleep Mist-ed. Unaccessed."],
    43: ["autosusie_violences", "Violences committed by Susie while not under player control. In SURVEY_PROGRAM and Chapter 1&2 it's never set due to a bug. It is possible to get the Chapter 1 Overthrow ending even if this is 1."],
    44: ["kills", "Total number of enemies you killed for realsies. Includes SnowGrave and killing Pipis."],
    45: ["freezes", "Total number of enemies you froze."],
    // no 46-48
    49: ["last_encounter_tp", "Amount of TP gained in last encounter, used for Tenna's scoring system."],
    50: ["last_encounter_end", "Volatile. Contains what you did in the last encounter. For multiple enemies, priority is Violence > Spare > Pacify > IceShock.", enemyStates],
    51: ["last_monster_end_0", "Volatile. What you did to the top monster in the last encounter.", enemyStates],
    52: ["last_monster_end_1", "Volatile. What you did to the middle monster in the last encounter.", enemyStates],
    53: ["last_monster_end_2", "Volatile. What you did to the bottom monster in the last encounter.", enemyStates],
    54: ["encounter_pointer", "Volatile. Contains a numerical value representing the current encounter, which is used to permanently store the outcome of that encounter in a flag."],
    55: ["enemy_x", "Volatile. Used to return enemies to the correct spot in the overworld when frozen."],
    56: ["enemy_y", "Volatile. Used to return enemies to the correct spot in the overworld when frozen."],
    60: ["dojo_next_encounter", "Volatile. Used to chain encounters for the Party Dojo All Stars challenge.", {
            0: "Default state",
            90: "Werewires",
            91: "Smorgasbord",
            92: "Tasques + Maus",
            93: "Swatchlings",
            94: "Werewerewires"
        }],
    61: ["disable_recruiting", "Prevents you from recruiting enemies in Party Dojo battles.", basicBool],
    62: ["nonnarrative_intro_text", "Used when Noelle enters her first battle and when Susie wants to demonstrate UltimateHeal to not use the normal battle introduction typer.", basicBool],
    63: ["violenced_last", "Volatile. Triggers 'You/Noelle became stronger' when violencing enemies.", basicBool],
    64: ["storage_size", "The amount of items you can keep in your pockets. Always 24 in Chapters 2 and 3, 36 in Chapter 4, code exists to set it to 48 in Chapter 6 and later."],
    65: ["times_leveled_ch2", "The number of times you have leveled up by violently defeating an encounter. Used for certain increases that only occur every 2, 4, or 10 encounters."],
    66: ["times_gained_at_ch2", "The number of times your AT and Magic have increased due to leveling up (every ten encounters). Used to prevent overly increasing them when sealing the fountain."],
    
    100: ["got_glowshard", "Whether you obtained the Glowshard. Prevents it from re-appearing.", basicBool],
    101: ["got_candy", "How much Dark Candy you've taken from the first Dark Candy tree.", [
            "None",
            "One candy",
            "Both candies"
         ]],
    102: ["got_candy_2", "How much Dark Candy you've taken from the second Dark Candy tree.", [
            "None",
            "One candy",
            "Both candies"
         ]],
    103: ["got_broken_cake", "Whether you took a piece of the Broken Cake.", basicBool],
    104: ["got_white_ribbon", "Whether you got the White Ribbon."],
    105: ["got_iron_shackle", "Whether you took the Iron Shackle.", basicBool],
    106: ["ate_ch1_moss", "Whether you ate the moss in Chapter 1. Allows you to obtain the Moss Finder title.", basicBool],
    107: ["got_dancer_mint", "Whether you got the Revive Mint from the Scissor Dancers room.", basicBool],
    108: ["got_ragger", "Whether you got the Ragger. Affects the Royal Coat Rack's dialogue about it.", basicBool],
    109: ["got_dice_brace", "Whether you got the Dice Brace.", basicBool],
    110: ["got_bloxer_money", "Whether you got the 40D$ from that room with Bloxers.", basicBool],
    111: ["got_bloxer_mint", "Whether you got a Revive Mint from that room with Bloxers. Unused because there isn't actually a Revive Mint chest in that room.", basicBool],
    112: ["got_JEVIL_chest", "Whether you got the Jevilstail/Devilsknife from a chest. It appears outside the room if your inventory is full after the battle.", basicBool],
    113: ["got_clubswich", "Whether you got the Clubs Sandwich from... take a guess.", basicBool],
    114: ["got_castle_mint", "Whether you got the Revive Mint from that chest that appears when you interact with the portraits.", basicBool],
    115: ["got_key_a", "Whether you got the Broken Key A. Also set if you defeat the Knight in Chapter 3 due to an encounterflag reuse.", basicBool],
    116: ["got_key_b", "Whether you got the Broken Key B.", basicBool],
    117: ["got_key_c", "Whether you got the Broken Key C.", basicBool],
    118: ["got_glowwrist", "Whether you got the first Glow Wrist.", basicBool],
    119: ["got_nubert_treasure", "Whether you got the Fiber Scarf.", basicBool],
    120: ["got_glowwrist_2", "Whether you got that other Glow Wrist.", basicBool],
    121: ["encount_tenna", "Tracks the state of the Tenna battle, for some reason.", enemyStates],
    122: ["got_tension_bit", "Whether you got the Tension Bit.", basicBool],
    123: ["got_ch2_mint", "Whether you got the THIRD Revive Mint.", basicBool],
    // 124: ["unused", "Suspiciously unused flag."],
    125: ["got_dust_fake", "Unused. Intended for obtaining the Revive Dust, but overwritten by 137."],
    126: ["got_trash_$20", "Whether you got 20D$ from the twenty-dollar trash can.", basicBool],
    127: ["got_trash_$80", "Whether you got 80D$ from the eighty-dollar trash can.", basicBool],
    128: ["got_trash_bagel", "Whether you got a CD Bagel from the CD Bagel trash can.", basicBool],
    129: ["got_ragger2", "Whether you got the Ragger2.", basicBool],
    130: ["got_bounce_blade", "Whether you got the Bounce Blade.", basicBool],
    131: ["got_trash_$20_2", "Whether you got 20D$ from the other twenty-dollar trash can.", basicBool],
    132: ["got_trash_bagel_2", "Whether you got a CD Bagel from the other CD Bagel trash can.", basicBool],
    133: ["got_basement_dollar", "Whether you got the $1 from the one-dollar treasure chest.", basicBool],
    134: ["got_pink_ribbon", "Whether you got the Pink Ribbon.", basicBool],
    135: ["got_chest_bagel", "Whether you got a CD Bagel from the CD Bagel treasure chest.", basicBool],
    136: ["got_chest_candy", "Whether you got a Dark Candy from the super secret Dark Candy location. (IDK)", basicBool], // RESEARCH THIS
    137: ["got_revive_dust", "Whether you got the Revive Dust.", basicBool],
    138: ["got_painting_mint", "Whether you got the fourth Revive Mint from a painting.", basicBool],
    139: ["got_mansion_glowshard", "Whether you got the Glowshard in Queen's Mansion, found by activating all the platters behind the door on the 2F moving vases room.", basicBool],
    140: ["got_trash_candy", "Whether you got a Dark Candy from the Dark Candy trash can.", basicBool],
    141: ["got_chain_mail", "Whether you got the Chain Mail armor.", basicBool],
    142: ["got_spamton_chest", "Whether you got the Dealmaker/Puppet Scarf from a chest. There's one immediately after you beat Spamton, and one back at My Castle Town.", basicBool],

    176: ["encount_sound_of_justice_1", "Tracks the state of the Susie-only stage of the Sound of Justice Battle, always 2.", enemyStates],
    177: ["encount_titan_spawn", "Tracks the state of the Titan Spawn encounter.", enemyStates],
    186: ["encount_sound_of_justice_2", "Tracks the state of the Kris stage of the Sound of Justice Battle, always 2.", enemyStates],

    200: ["ran_in_school", "Whether you ran to Susie in the Chapter 1 school scene. Unaccessed.", basicBool],
    201: ["solved_eye_puzzle", "Whether you solved the eye puzzle in the ?????? area.", basicBool],
    202: ["ran_in_dark", "How you proceeded once finding Susie in the ?????? area.", [
            "Walked",
            "Ran",
            "Wrong way"
         ]],
    203: ["skipped_prophecy", "Whether you skipped Ralsei's prophecy. Lancer explains it instead.", basicBool],
    204: ["be_subject_answer", "How you answered Ralsei when he said he had no subjects... that is, unused.", [
            "Default state",
            "I'll be your subject",
            "Keep dreaming"
         ]],
    205: ["tutorial_end", "What happened during Ralsei's tutorial.", [
            "Skipped tutorial",
            "Success",
            "Hug Ralsei (in unused version of tutorial)",
            "Beat up Ralsei",
            "Beat up dummy",
            "Continued defending",
            "Missed dummy"
         ]],
    206: ["learned_to_run", "Set to 1 whether Ralsei explains it or you demonstrate. Just prevents him from asking again.", basicBool],
    207: ["dropped_manual", "Your progress on being a terrible person. Ralsei gives you a trash can for the manual instead of a stand, in case you ever want to trash it again.", [
            "Default state",
            "Dropped once",
            "Dropped twice"
         ]],
    208: ["re_convinced_rudinn", "Whether you Convinced Rudinn after failing to do. Unused, since it works first try now.", basicBool],
    209: ["seen_field_song", "Prevents you from seeing the Field of Hopes and Dreams title every single room.", basicBool],
    210: ["lancer_thrash_talk", "Alters Lancer's dialogue if interacted with prior to the triple Hathy fight.", [
            "Default state",
            "Talked",
            "Did not talk"
         ]],
    211: ["c_round_outcome", "What happened to C. Round. Can skip Ralsei telling Susie not to fight.", [
            "Default state",
            "Complimented by Susie",
            "Warned",
            "Attacked by Kris/Ralsei"
         ]],
    212: ["box_puzzle_state", "Progress on the vandalized box puzzle.", [
            "Default state",
            "Initiated puzzle",
            "Failure (unused)"
         ]],
    // 213: ["unused", "Suspiciously unused flag."],
    214: ["team_name", "The name of your team.", [
            "The Guys",
            "The $!$? Squad",
            "The Lancer Fan Club",
            "The Fun Gang"
         ]],
    215: ["talked_joe", "Whether you talked to Joe (and were inevitably offered a tutorial). Makes him help with the Warp Door.", basicBool],
    216: ["donated_to_hole", "Whether you put a dollar in the donation hole.", basicBool],
    217: ["solved_rouxls_puzz", "Whether you solved Rouxls's first puzzle.", basicBool],
    218: ["solved_rouxls_puzz_2", "Whether you solved Rouxls's second puzzle.", basicBool],
    // no 219, but not as suspicious as some of these others
    220: ["thrash_machine_head", "Your Thrash Machine's head.", {
            "-1": "In design",
            "0": "Laser",
            "1": "Sword",
            "2": "Flame",
            "3": "Duck"
         }],
    221: ["thrash_machine_body", "Your Thrash Machine's chassis.", {
            "-1": "In design",
            "0": "Plain",
            "1": "Wheel",
            "2": "Tank",
            "3": "Duck"
         }],
    222: ["thrash_machine_shoe", "Your Thrash Machine's... well, there's a lot of variance here.", {
            "-1": "In design",
            "0": "Shoes",
            "1": "Wheels",
            "2": "Treads",
            "3": "Duck"
         }],
    223: ["thrash_head_color", "Your Thrash Machine's head color. You should probably just edit it in-game."],
    224: ["thrash_body_color", "Your Thrash Machine's chassis color. You should probably just edit it in-game."],
    225: ["thrash_shot_color", "Your Thrash Machine's shoe color. You should probably just edit it in-game."],
    226: ["made_thrash_machine", "Whether you designed the Thrash Machine yet.", basicBool], // Why is this not a plot value?!
    // no 227 or 228?
    229: ["lancer_follow_progress", "How far Lancer has followed you after joining the team.", {
            0: "Default state",
            1: "Monogrammed track jackets",
            3: "Just chill with us",
            4: "Stop making fun of me",
            5: "Darkberry Teacakes (unused)",
            6: "A candy tree!",
            7: "My teeth are disintegrating!",
            8: "Does your dad seem happy?",
            9: "I also feel kinda...",
            10: "...maybe.",
            11: "That's the FOUNTAIN!",
            12: "All we gotta do is crush them.",
            99: "Max value (unused)"
         }],
    // no 230
    231: ["jail_interacts", "The number of times you have interacted with objects while in jail. The cutscene is triggered by talking to Ralsei after 3+ interactions."],
    232: ["interacted_salsa", "Whether you interacted with the salsa stump. NOT what you actually did; that isn't saved.", basicBool],
    233: ["talked_about_chest", "Whether you talked to the Royal Coat Rack before taking the Ragger. Changes their dialogue if you take it without asking.", basicBool],
    234: ["solved_clover_puzzle", "Whether you solved the suits puzzle before the Clover fight.", basicBool],
    235: ["clover_puzzle_2?", "Unused? If 0, the suits puzzle makes and immediately destroys an (entrance?) barrier."],
    236: ["interacted_clover?", "Unused? Set to 1 when talking to all of Clover before her fight. Is that even possible? As one NPC. Alters her dialogue.", basicBool],
    237: ["solved_dark_puzzle", "Whether you solved the puzzle in the darknening room. It does not save if you did it without going in the middle.", basicBool],
    238: ["susie_bought_snack", "Whether Susie and Lancer bought their Hearts Donut yet.", basicBool],
    239: ["elevator_floor", "Volatile. Tracks the floor you're currently on when in elevators.", [
            "Basement B1",
            "Floor 1F",
            "Floor 5F",
            "???? (JEVIL)"
         ]],
    240: ["elevator_unlocked", "Whether you have unlocked the Card Castle elevator by going to floor 5F.", basicBool],
    241: ["JEVIL_plot", "Your progress with JEVIL. Alters Seam's dialogue.", {
            0: "Default state",
            1: "Talked to JEVIL",
            5: "Opened door",
            6: "Fought",
            7: "Spared"
         }],
    242: ["JEVIL_chest", "The item in the chest outside JEVIL's room, if you don't have enough storage space for it. See also flag 112.", [
            "Default state",
            "Devilsknife",
            "Jevilstail"
         ]],
    243: ["talked_to_rudinn", "The status of your talking to Rudinn in Card Castle. Special dialogue if set to 3 but you then hurt Rudinns.", [
            "Default state",
            "Apologized",
            "Did not apologize",
            "Did not need to apologize"
         ]],
    244: ["talked_to_hathy", "Whether you talked to Hathy in Card Castle. Only set if you had two or fewer Hathy kills.", basicBool],
    245: ["made_bluh_chest", "Whether you interacted with all four Bluh Paintings, summoning the Bluh Chest.", basicBool],
    246: ["checkers_act", "Whether you Checked K. Round the first time, changing its act to Checkers (including in the second fight).", basicBool],
    247: ["spared_king", "Whether you exhausted King rather than fighting him.", basicBool],
    248: ["massacre_end", "Whether you got the bad (beat people up) ending in Chapter 1. Minor dialogue differences in Castle Town.", basicBool],
    249: ["spared_lancer", "Whether you spared Lancer and Susie.", basicBool],
    250: ["thrash_repeats", "The number of times you fought Lancer and Susie, thus requiring them to blow up a Thrash Machine. Unique dialogue at 1 and 2."],
    251: ["shortcut_door_help", "Whether Jigsaw Joe helped restore the Warp Door. No functional change.", basicBool],
    252: ["inspected_beds_ch1", "Whether you inspected all four beds in Chapter 1, becoming a Bed Inspector.", basicBool],
    253: ["traded_topcake", "Whether you returned the TopCake, receiving a SpinCake in its place.", basicBool],
    254: ["starwalker", "Whether you talked to the original Starwalker. That's foresight.", basicBool],
    
    255: ["talk_rudy_ch1", "Progress talking with Rudolph Holiday in Chapter 1. Not sure how it interacts with Chapter 2.", [
            "Default state",
            "Noelle left",
            "Talked to Rudy"
         ]],
    256: ["talked_berdly_window", "Whether you talked to Berdly about visiting the hospital window to have something thrown at him. Slightly alters his dialogue about How to Draw Dragons.", basicBool],
    257: ["table_hole_fingers", "Whether you tried to put your fingers in the picnic table.", basicBool],
    258: ["onionsan_ch1", "Onion's status.", [
            "Default state",
            "Talking (volatile)",
            "Befriended",
            "Rejected"
         ]],
    259: ["onionsan_your_name", "The name you told Onion was yours.", [
            "Default state",
            "Kris",
            "Hippopotamus"
         ]],
    260: ["onionsan_name", "The name you told Onion was theirs.", [
            "Default state",
            "Onion",
            "Beauty",
            "Asriel II",
            "Disgusting"
         ]],
    261: ["talked_qc_ch1", "Tracks your talking with QC.", [
            "Default state",
            "Received Hot Chocolate",
            "Full inventory"
         ]],
    262: ["bouquet_quest_stage", "Progress toward failing to redeem Toriel and Asgore's relationship in Chapter 1.", [
            "Default state",
            "In flower shop",
            "Received bouquet",
            "Gave to Toriel",
            "Disposed of"
         ]],
    263: ["fridge_egg_status", "The Chapter 1 egg status, with regards to Asgore's fridge. Each stage correlates with an egg quantity in the fridge.", [
            "(0) Default state",
            "(1) Egg dropped/fridge inspected eggless",
            "(2) Egg put in fridge"
         ]],
    264: ["asgore_stairs_side", "Volatile. Persists the different door sides when going upstairs in Asgore's fridge via Kris's x-coordinate."],
    265: ["talked_to_catty", "Whether you talked to Catty in Chapter 1.", basicBool],
    // no 266
    267: ["unused_toriel_talk", "Progress talking to Toriel... in an unused variant. The whole thing is thouroughly broken.", {
            "-10": "Kris...?",
            "0": "Headband",
            "1": "Go to bed"
         }],
    268: ["called_in_house", "Whether you called Toriel's home phone, while at home. Unaccessed.", basicBool],
    269: ["talked_to_alphys", "Whether you met Alphys after school in Chapter 1. Alters her dialogue the morning of Chapter 2.", basicBool],
    270: ["talked_to_undyne", "Whether you met Undyne in Chapter 1.", basicBool],
    271: ["talk_pizzapants", "Progress chatting with BurgerPizzaSodaCandyPants.", [
            "Default state",
            "Mask off",
            "Talked"
         ]],
    272: ["times_called_mom", "The number of times you called Toriel after school. If zero when leaving the school, she calls you instead, incrementing the flag."],
    273: ["talked_to_sans", "Progress chatting up the funny bone man in Chapter 1.", [
            "Default state",
            "Talked",
            "Invited over"
         ]],
    274: ["sans_phone", "Your progress toward being called an idiot baby.", [
            "Default state",
            "Received number",
            "Called"
         ]],
    275: ["idiot_baby_status", "What you are.", [
            "None",
            "Idiot",
            "Baby",
            "Idiot Baby"
         ]],
    276: ["talked_to_noelle", "Your progress talking to Noelle outside her house in Chapter 1. If 2, she gives Susie the Light Candy in Chapter 2.", [
            "Default state",
            "Talked",
            "Talked about Susie"
         ]],
    277: ["times_came_home", "The number of times you have returned home at the end of Chapter 1. Special dialogue at 0, 1, and 7; stops counting at 8."],
    278: ["used_rudy_sink", "Whether you used the sink in Chapter 1 (of the 1&2 demo). Rudy comments on you 'loving that sink'.", basicBool],
    279: ["loaded_legacy_file", "Set to 1 while loading a Chapter 1 file (which has different room offsets). If 1 on an old file, you might load into a Chapter 2 room.", basicBool],
    280: ["used_shadow_ch1", "Your Shadow Crystal usage in Chapter 1. Unique dialogue if less than 2.", [
            "Default state",
            "Saw toys",
            "Not useful"
         ]],
    281: ["used_glass_alone", "Your Glass usage without Susie around/in Chapter 1.", [
            "Default state",
            "Saw through hand",
            "Not useful (Ch1)"
         ]],
    
    290: ["solved_dice_puzzle", "Whether you solved the suits puzzle to obtain Dice Brace.", basicBool],
    291: ["maze_progress", "Volatile. Counts the number of correct rooms you've gone through in the maze, or something like that. Find Susie at 4, done at 9."],
    292: ["maze_fail_count", "Volatile. Counts how much you've taken the wrong choice in the forest maze. Jumps straight to 3 (dead end) if you got lost before or found Susie."],
    293: ["lancer_deadend", "The number of times you found the Lancer dead end."],
    294: ["susie_deadend", "The number of times you found the Susie dead end."],
    295: ["youre_clovers_mom", "Whether you talked to Topchef in the pacifist end after returning the Topcake. He thinks Susie is Clover's mom.", basicBool],
    296: ["visited_jail", "Whether you visited the jail. No effects in Ch 1&2 demo, but does *something* weird if 0 in the Chapter 1 demo. Seems the cages are supposed to disappear?", basicBool],
    
    300: ["hugged_dummy_ch2", "Whether you hugged the dummy in Chapter 2. Some slight dialogue changes.", basicBool],
    301: ["talked_king_prologue", "Whether you talked to King in jail before visiting Cyber World.", [
            "Default state",
            "Talked",
            "Left"
         ]],
    302: ["toy_deliver_progress", "Your progress in delivering Ralsei's first batch of subjects.", [
            "Default state",
            "Ball on head",
            "Toys delivered"
         ]],
    303: ["been_called_normal", "Whether you saw Alphys and Toriel talking about you. Alters Toriel's dialogue if called.", basicBool],
    304: ["susie_ate_cake", "Whether Susie ate Ralsei's entire cake (yet).", basicBool],
    305: ["told_mom_studying", "Whether you told Toriel you were going to be studying with Susie over the phone, with or without mentioning the trash orb.", basicBool],
    306: ["told_mom_orb", "Whether you called Toriel while just around the corner with a trash orb on your head. Also sets flag 305.", basicBool],
    307: ["fave_party_member", "Records who you gave the plush to. In pre-1.08 versions, there's a bug resetting it to 1 before the acid river ride", [
            "Default state",
            "Ralsei",
            "Susie",
            "Noelle",
            "Berdly"
         ]],
    308: ["seen_eggs_husband", "Whether you've seen Asgore make a fool of himself in public.", basicBool],
    309: ["spamton_plot", "Your progress in learning about the power of NEO.", {
            0: "Default state",
            1: "Spared Spamton",
            3: "Purchased KeyGen",
            4: "Used KeyGen",
            5: "Entered basement",
            7: "Disk Loaded",
            8: "Disk inserted",
            9: "Defeated Spamton NEO"
         }],
    310: ["first_cheese_destroyed", "Whether the first cheese on the left was destroyed.", basicBool],
    311: ["destroyed_cheese_alone", "Whether you triggered the first cheese without Noelle, prompting slightly different text when interacting with it. Is this even possible?", basicBool],
    312: ["talked_seam_ch2", "Seems to be set to 1 when you talk to Seam in Chapter 2, preventing them from repeating themselves.", basicBool],
    313: ["got_spincake_ch2", "Whether you received a fresh Spincake since Chapter 2.", basicBool],
    314: ["mr_society_left", "Whether Mr. Society, the bishop, flew up the cliff after being talked to.", basicBool],
    315: ["seen_shelter_scene", "Whether Monster Kid and Snowy fled Susie at the bunker. They go home.", basicBool],
    316: ["seen_hospital_scene", "Whether Noelle went home in Chapter 2 yet (yes, either route).", basicBool],
    317: ["seen_police_scene", "Tracks how yoooouuu let the dogs out!", [
            "Default state",
            "Dogs escaped",
            "Alarm playing"
         ]],
    // no 318
    319: ["ferris_scene_plot", "Tracks how Suselle becomes canon. Returns to 2 after the whole scene?", [
            "Default state",
            "On Ferris wheel",
            "Off Ferris wheel",
            "WHAT? WHAT? WHAT?"
         ]],
    320: ["talked_queenie_beanie", "Whether you've seen the touching reunion of King and Queen.", basicBool],
    // no 321-323
    324: ["spamton_stress_response", "What you said- made Kris say- after fighting Spamton NEO.", [
            "Default state",
            "OK",
            "Not OK"
         ]],
    325: ["ralsei_photo_choice", "The purty picture you took with Ralsei. Affects his title and whether he hugs Kris after Spamton NEO.", [
            "Default state",
            "Hugged",
            "Peace sign",
            "Rude gesture",
            "No pose"
         ]],
    326: ["rouxls_pirate_hat", "Whether Rouxls Kaard is currently wearing a pirate hat.", basicBool],
    327: ["interacted_hathyx_www", "Whether you interacted with a Head Hathy or Werewerewire together at the cafe. Alters Werewerewire narration if subsequently moved away from Head Hathy.", basicBool],
    // no 328
    329: ["talked_spamton_knight", "Whether you talked with Spamton about the Knight, changing his talk option to Friends.", basicBool],
    330: ["found_tasque_switch", "Honestly I have no idea but there's a switch here and if you don't flip it it shows a faint hint.", basicBool],
    331: ["seen_ferris_scene", "Set to 1 after the Ferris wheel scene, even if skipped.", basicBool],
    332: ["found_maze_switch", "See 330, but this time one of the objects has 'old' in the name, so it might be unused.", basicBool],
    333: ["solved_agree2all", "Whether you solved the AGREE2ALL puzzle.", basicBool],
    // no 334
    335: ["shovel_door_open", "Whether you opened the door to the room filled with 999 shovels.", basicBool],
    336: ["susie_avoid_alphys", "Whether Susie is waiting due east of you rather than come close to Alphys.", basicBool],
    337: ["talked_alvin", "Tracks how much you talk to Alvin about his father and the hammer, and whether he mumbles to himself as you leave.", [
            "Default state",
            "Talked once",
            "Talked twice",
            "Heard mumbling"
         ]],
    // no 338
    339: ["found_basement_switch", "Whether you activated the secret backdoor to the mansion's basement. Alter's Hacker's dialogue.", basicBool],
    340: ["found_shortcut_out", "Whether you flipped the less-secret switch to connect the basement to the foyer. Also set on entry into the foyer on Snowgrave.", basicBool],
    341: ["susie_avoid_catti", "Whether Susie has told you she isn't going into the diner (Catti's working there!)", basicBool],
    342: ["chocolates_who_gave", "Who did you give the Box of Heart-Shaped Chocolates to?", [
            "Default value",
            "Ate alone",
            "Shared with Susie",
            "Gave to Alphys",
            "Returned to Sans"
         ]],
    343: ["made_high_five", "Whether you pulled the lever to make a giant high-five and progress the swan ride.", basicBool],
    344: ["solved_saucer_puzzle?", "Looks to be set to 1 when completing the first shell game-style saucer puzzle.", basicBool],
    345: ["seen_toilet_statue", "Whether you interacted with the Berdly statue in the toilet. Spawns the NPC outside waiting for the statue to finish in there.", basicBool],
    346: ["solved_saucer_shortcut", "Whether you've unlocked a shortcut in Mansion by doing a saucer puzzle. I don't know which.", basicBool],
    347: ["times_seen_statue", "The number of times you interacted with the Berdly statue with Noelle with you. She has unique comments up to 8 on how obsessed you are with it."],
    // no 348
    349: ["frozen_chicken", "Whether there is a large ice crystal you cannot see into blocking the way.", basicBool],
    350: ["hatboy_plugged", "Whether you walked far enough away for the fedora'd Plugboy to get Werewired offscreen.", basicBool],
    351: ["maze_hint_debug?", "Seems to be an unset flag that would make a little hint popup in room_dw_cyber_maze_queenscreen.", basicBool],
    352: ["solved_viro_dodge", "Whether you got the key in room_dw_cyber_viro_ring.", basicBool],
    353: ["talk_two_crystals", "How much you've talked to Seam since obtaining both Shadow Crystals.", [
            "Default state",
            "Gave both",
            "Talked about mantle"
         ]],
    354: ["bagels_purchased", "The number of CD Bagels you purchased from K_K. He stops selling them at six, in case somebody orders 400."],
    // no 355
    356: ["lancer_cared_for", "Whether statue-Lancer has been pushed to the table and given his adorable bib.", basicBool],
    357: ["recruit_hacker", "Whether you talked to Hacker after collecting all three Blue Checksmarks.", basicBool],
    358: ["entered_basement", "Tracks how many times you entered the basement alone. Does not go past 1 until you've seen Susie stealing Ralsei's glasses, after which it gets set to 2."],
    359: ["met_hacker", "Whether you talked to Hacker. Note that the 2 state isn't directly used; see flag 357.", [
            "Default state",
            "Talked",
            "Recruited"
         ]],
    360: ["approached_cheese_maze", "Whether you've approached the cheese maze, destroying the lone cheese or triggering Noelle dialogue if it's already destroyed.", basicBool],
    361: ["did_right_cheese_fight", "Apparently like 360 but only for the right cheese, and unaccessed.", basicBool],
    362: ["mauswheel_defeated", "Whether you defeated Mauswheel on the normal route, freeing the Swatchlings.", basicBool],
    // no 363, 364, 365
    366: ["tasque_released", "Makes one particular Tasque persist leaving the wall screen in Field?", basicBool],
    367: ["got_chestmark", "Whether you got the Blue Checksmark from a treasure chest.", basicBool],
    368: ["solved_mice_2", "Progress on solving the second mice puzzle.", {
            "0": "Default state",
            "0.5": "Mice in hole",
            "1": "Forcefield down"
         }],
    369: ["saw_ralsusie", "Whether Noelle gave her one-time dialogue about seeing Ralsei and Susie having fun.", basicBool],
    370: ["solved_mansion_traffic", "Whether the traffic challenge at the end of floor 1F was completed, opening the room with the backdoor switch.", basicBool],
    371: ["fought_tasque_manager", "Whether you fought Tasque Manager.", basicBool],
    // no 372
    373: ["unlocked_east_basement", "Whether you disabled the forcefield in the basement with the final boss. Yeah, the teacups.", basicBool],
    374: ["mice_got_$20", "Whether the mice got $20. Alters Mousemillian's dialogue.", basicBool],
    375: ["mice_got_$1", "Whether the mice got $1. Alters Mousemillian's dialogue.", basicBool],
    376: ["funny_butler_progress", "Progress in the room with the Swatchling and the bridges and the unavoidable vase.", [
            "Default state",
            "Swatchling freed",
            "Vase spawned"
         ]],
    377: ["mouselottery_solved", "Whether the mice have triggered the blue house.", basicBool],
    378: ["mouselottery_solved_2", "Whether the mice have triggered the red house.", basicBool],
    379: ["noelle_beat_fear", "Whether Noelle stopped being afraid of mice.", basicBool],
    380: ["called_mom_after_lab", "Whether you called Toriel after leaving the computer lab. Prevents her from repeating her dialogue.", basicBool],
    381: ["dog_opened_door", "Whether the dog, ah, forced open the double door in the bajillion platters room in the mansion.", basicBool],
    382: ["dining_hall_complete", "Whether you finished the ultimate dining hall puzzle.", basicBool],
    383: ["solved_forcefield_1", "Whether you successfully activated both switches in the first forcefield puzzle, disabling it forever.", basicBool],
    384: ["fought_cheese_maze", "Whether you touched the cheese maze, triggering an encounter and destroying it.", basicBool],
    385: ["balance_pot_status", "What happened in the vase-balancing minigame.", [
            "Default state",
            "Dropped pot",
            "Success"
         ]],
    386: ["visited_spamton", "Prevents you from getting repeat dialogue every single time you visit Spamton's shop.", [
            "Default state",
            "First time in shop",
            "Exited"
         ]],
    387: ["returned_castle_town", "Whether you've seen Queen introduce herself to Castle Town.", basicBool],
    388: ["got_no_recruits", "Whether you sealed the Fountain with no recruits at all, on the normal route anyway.", basicBool],
    389: ["fought_bridge_werewire", "Whether you fought the Werewire in the acid lake bridge room, unlocking the Revive Dust chest.", basicBool],
    390: ["solved_apple_puzzle", "Whether you unlocked the way to NUBERT'S TREASURE.", basicBool],
    391: ["fought_first_viro", "Tracks whether you've encountered the first Virovirokun. When set, it will fly around in a circle instead of staying still.", basicBool],
    392: ["3f_bookcase_override", "Seems to unlock a mansion shortcut early on the Snowgrave Route.", basicBool],
    393: ["stole_susie_statue", "Whether you stole the Susie statue from Noelle's room.", basicBool],
    394: ["stole_ice_e_statue", "Whether you stole the Ice-E statue from Noelle's room.", basicBool],
    395: ["opened_sidea_painting", "Not a reference to Side B (alt route). Seems a painting opens a passageway.", basicBool],
    396: ["opened_sideb_painting", "Not a reference to Side B (alt route). Seems a painting opens a passageway.", basicBool],
    397: ["paintings_active", "Whether Queen warned you not to take your eyes off her paintings, and activated the painting fireballs.", basicBool],
    398: ["activated_mint_painting", "Whether you activated the Revive Mint painting with a different painting.", basicBool],
    399: ["activated_painting_exit", "Whether you disabled a fire painting blocking the exit by interacting with a different painting.", basicBool],
    400: ["vase_intro_status", "Your progress in learning the basics of Queen's Mansion.", [
            "Default state",
            "Learned rules",
            "Broke vase"
         ]],
    // no 401-406
    407: ["got_chestmark_2", "Whether you got the second Chest-Checksmark.", basicBool],
    408: ["seen_djs_flyby", "Whether you saw Sweet Cap'n Cakes fly by after fighting them.", basicBool],
    409: ["inspected_kris_bed", "Whether you inspected your own bed. Necessary to retain your Bed Inspector title.", basicBool],
    410: ["inspected_susie_bed", "Whether you inspected Susie's bed. Necessary to retain your Bed Inspector title.", basicBool],
    411: ["inspected_lancer_bed", "Whether you inspected Lancer's bed. Necessary to retain your Bed Inspector title.", basicBool],
    412: ["inspected_clover_bed", "Whether you inspected Clover's bed. Necessary to retain your Bed Inspector title. Only obtainable on v1.09+ due to a bug.", basicBool],
    413: ["inspected_noelle_bed", "Whether you inspected Noelle's bed. Necessary to retain your Bed Inspector title.", basicBool],
    414: ["bed_inspector_ch2", "Whether you retained your Bed Inspector title. That is, got slightly different Noelle bed dialogue. Only obtainable on v1.09+ due to a bug.", basicBool],
    415: ["mice_attack_reason", "What you told Noelle about the mice attacking her. The question was, 'What do I look like, the girl from the Nutcracker?'", [
            "Default state",
            "They like you",
            "Unknown",
            "You look like her"
         ]],
    416: ["field_tempsave", "Whether you returned to the Cyber Field hub after defeating Sweet Cap'n Cakes and triggered a tempsave.", basicBool],
    417: ["trash_tempsave", "Whether you reached Cyber City by falling into the dump and triggered a tempsave.", basicBool],
    418: ["got_shoe", "Whether you got a free sample from Cyber Shoes. Alters Lancer's dialogue and prevents a Mansion tempsave from happening (reused flag).", basicBool],
    419: ["tasque_manager_response", "Whether you got all or most of Tasque Manager's questions correct. She starts with 100% if all, 50% if you miss the last due to her phrasing.", [
            "Default state",
            "All correct",
            "Thought alphabetical"
         ]],
    420: ["giasfelfebrehber", "Whether you solved the Giasfclfebrebrebrebehr typing puzzle, earning the third Blue Checksmark.", basicBool],
    421: ["noelle_friend", "Whether you told Noelle you were 'something else.' Necessary for Snowgrave.", [
            "Friends",
            "Something else"
         ]],
    422: ["talked_mettaton", "Whether you talked to Mettaton in Chapter 2. They don't repeat themselves.", basicBool],
    423: ["stolen_bagels", "How many CD Bagels you stole on the Snowgrave Route (0-4)."],
    424: ["talked_onion_ch2", "Whether you talked to Onionsan in Chapter 2. Probably kinda important, you know.", basicBool],
    425: ["onion_was_missed", "What you told Onion. Probably kinda important, especially if you didn't miss them.", [
            "Default state",
            "Missed",
            "Did not miss"
         ]],
    426: ["swatchling_combo", "Volatile. The current combination of Swatchlings you are fighting. Later ones are harder, generally.", {
            "-1": "RRB",
            "0": "ROB",
            "1": "BGY",
            "2": "ROY",
            "3": "BYR",
            "4": "RBY",
            "5": "BYG",
            "6": "RYB",
            "7": "BRY",
            "8": "YGO"
         }],
    427: ["unlocked_mint_chest", "Whether Virovirokun triggered the hidden path to the Revive Mint chest.", basicBool],
    428: ["saw_sweet", "Whether you saw Sweet right after the first teacup ride. Prevents him from appearing multiple times.", basicBool],
    429: ["statue_sink_progress", "The amount by which the statue of Queen has sunk into the acid, in frames, so it persists even if you leave."],
    430: ["took_azzy_money", "Whether you took five bucks from Asriel's drawer.", basicBool],
    431: ["talked_joe_ch2", "Whether you talked to Jigsaw Joe yet in the Party Dojo, which he introduces.", basicBool],
    432: ["told_to_explore", "Whether Ralsei told you and Susie to explore the Castle Town yet.", basicBool],
    433: ["told_to_run_ch2", "Whether Susie reminded you that you can run in this game (if you fail to do so in the chapter).", basicBool],
    434: ["talked_our_deal", "Whether Spamton told you about our deal and the machine in the basement. Prevents him from skipping it if you buy KeyGen first.", basicBool],
    435: ["house_game_winner", "Who won Rouxls's house minigame.", [
            "Default state",
            "Rouxls",
            "Kris",
            "Draw"
         ]],
    436: ["called_mom_busy", "Whether you called home during the Chapter 2 end sequence. Unique dialogue the first time, then everyone's too busy to pick it up.", basicBool],
    437: ["fave_party_member_2", "Who you told Susie you would take to the festival in the Chapter 2 end cutscene. Unaccessed.", [
            "Default state",
            "Noelle",
            "Ralsei",
            "Susie",
            "..."
         ]],
    438: ["tutor_viro_location", "Where you fought the tutorial Virovirokun. Persists its ice statue in Snowgrave.", [
            "Default state",
            "Progressed",
            "Backtracked"
         ]],
    439: ["deposited_ch2_egg", "Whether you put the egg in the egg basket in Sans's store.", basicBool],
    440: ["interacted_ferris_poster", "Whether you interacted with the Ferris wheel poster with Noelle. One-time event.", basicBool],
    441: ["talked_friend_addison", "Whether you talked to the Addison selling Dating Shoes. One-time event. See also flag 421.", basicBool],
    442: ["learned_teacups", "Whether you've taken your first teacup ride and possibly gotten a tutorial on operating it.", basicBool],
    443: ["told_save_town", "Whether Ralsei told you to feel free to SAVE and take a break in Castl- RALSEI KNOWS ABOUT SAVING??", basicBool],
    444: ["told_visit_town", "Whether Susie told you to go back and check out Castle Town, if you went down south first.", basicBool],
    445: ["read_cleaning_poster", "Whether you interacted with the poster for Queen Cleaning Agent with Noelle behind you. Interesting dialogue exclusive to non-Snowgrave.", basicBool],
    446: ["went_weird_door", "Whether you brought Noelle all the way back to the gray door. Unique dialogue about its creepiness, but not required for Snowgrave.", basicBool],
    447: ["broke_balloon_cheese", "Whether the balloon cheese, found right before the mice basket puzzle, was dropped.", basicBool],
    448: ["finished_big_forcefield", "Whether you finished and disabled the right-side forcefields in that room where Noelle stands on a button forever.", basicBool],
    449: ["easter_egg_forcefield", "Whether you disabled the Easter egg forcefield (with the balloons) by all getting in one teacup.", basicBool],
    450: ["easter_teacup_plot", "Progress in the balloon-teacup Easter egg.", [
            "Default state",
            "Read sign",
            "Rode teacups"
         ]],
    451: ["talked_about_pap", "Whether you talked to Sans about Papyrus in both chapters 1 and 2; talking in Chapter 2 only isn't saved.", basicBool],
    452: ["told_wrongway", "Whether Noelle questioned if you were going the right way while backtracking further into the trash zone.", basicBool],
    453: ["talked_snowgrave_neo", "Whether you talked to Spamton through the basement door while he was changing forms. He doesn't repeat himself.", basicBool],
    454: ["got_dealmaker", "Whether you spared Spamton NEO. What, you thought that would be in flag 309?", basicBool],
    455: ["ride_with_me", "Whether you said 'Noelle will ride with me' on Snowgrave. Unaccessed.", basicBool],
    456: ["beat_snowgrave_neo", "Whether you defeated Spamton NEO on Snowgrave.", basicBool],
    457: ["spared_berdly", "Whether you spared Berdly all three times, keeping him from breaking his arm.", basicBool],
    458: ["houses_hit", "The number of houses you hit with the swan boat, converted to TP at the start of the Rouxls fight. Maximum 7."],
    459: ["put_disk_mannequin", "Whether you tried to put the LoadedDisk into the Mannequin. It doesn't repeat.", basicBool],
    460: ["got_jevil_hole", "Whether you got the Jevil item from the Castle Town hole. Accessed, but not necessary.", basicBool],
    461: ["interacted_sink_ch2", "Whether you interacted with Rudy's sink in Chapter 2. See also flag 278.", basicBool],
    462: ["cars_hit", "The number of cars you hit. If less than 3 and you're otherwise pacifistic enough, you get the Castle Town tiny car."],
    463: ["read_cyberpedia", "Whether you read Ralsei's editable Cyberpedia entry. Is Wikipedia actually trademarked?", basicBool],
    464: ["talked_swatch", "Whether you talked to Swatch in the Castle Town Cafe about removing Topchef. Poor man.", basicBool],
    465: ["car_part_completed", "Whether you completed the car sequence. You can't get the tiny car on Snowgrave, even with all recruits, because of this.", basicBool],
    466: ["junkball_dropped", "Whether you dropped the Ball of Junk at any point. Unaccessed.", basicBool],
    467: ["chestmark_opened", "HOW MANY FLAGS DO YOU NEED FOR THIS? It keeps you from opening the chest multiple times.", basicBool],
    468: ["spamton_no_room", "Whether you had no room after defeating Spamton NEO. Spawns the chest.", [
            "Default state",
            "No room Pacifist",
            "No room Snowgrave"
         ]],
    469: ["cant_go_back_tip", "Whether the save point reminded you that you can't go back to the Cyber World if you overwrite your save in Castle Town. Consider this carefully!", basicBool],
    // no 470-499
    
    500: ["times_rudinn_fought", "The number of times you've fought the first Rudinn. Changes its encounter text."],
    501: ["triple_hathy_outcome", "Seems to be intended for some other, non-Hathy fight in room_field2. Changes the dialogue of... a nonexistent NPC in the room. And it's only set by enemies that don't appear in that room.", enemyStates],
    502: ["times_ponman_fought", "The number of times you fought Ponmen. Minor changes to the overworld chasing Ponmen."],
    503: ["susie_complimented", "Whether Susie has attempted to compliment Rudinn Ranger. Free ham sandwich day does not repeat.", basicBool],
    504: ["susie_flirted", "The number of times you used X-Flirt on Head Hathy. She tries the first time, makes Ralsei try the second, and you take over from the third."],
    505: ["fought_rabbick", "Whether you fought any Rabbicks. If so, they run slower in the forest maze. Also set when you fight Clover for some reason.", basicBool],
    506: ["fought_bloxer", "Whether you fought Bloxer. If so, they don't chase you as diligently.", basicBool],
    507: ["fought_rudinn_ranger", "Whether you fought Rudinn Ranger. If so, they don't chase you at all.", basicBool],
    508: ["fought_hathyx", "Whether you fought Head Hathy. If so, they don't chase you at all.", basicBool],
    // no 509-519? not in chapter 2
    
    509: ["pippins_r_act", "Number of Bribe ACTs used on Pippins, apparently multiplied by number of Pippins present. Unique dialogue first time."],
    510: ["pippins_s_act", "Number of Cheat ACTs used on Pippins, apparently multiplied by number of Pippins present. Unaccessed?"],
    511: ["shuttah_s_act", "Whether you've used S-Action during a Shuttah battle. Randomizes flavortext on repeat.", basicBool],
    512: ["shuttah_r_act", "Whether you've used R-Action during a Shuttah battle. Reduces flavortext on repeat.", basicBool],
    513: ["shuttah_kris_pic", "Whether you took a photo of Kris during the Shuttah fight. Alters repeat dialogue.", basicBool],
    514: ["shuttah_susie_pic", "Whether you took a photo of Susie during the Shuttah fight. Alters repeat dialogue.", basicBool],
    515: ["shuttah_ralsei_pic", "Whether you took a photo of Ralsei during the Shuttah fight. Alters repeat dialogue.", basicBool],
    
    520: ["rudinn_violences", "The number of Rudinns you have beat up. Subtracted from flag 40 if you apologize."],
    521: ["hathy_violences", "The number of Hathys you have beat up. Subtracted from flag 40 if 2 or less and you apologize."],
    522: ["clover_violence", "Whether you beat up Clover the first time. You can't apologize.", basicBool],
    523: ["rudinn_susie_whacks", "Intended for Susie beating up Rudinns, but unset. See flag 43."],
    524: ["hathy_susie_whacks", "Intended for Susie beating up Hathys, but unset. See flag 43."],
    
    // here be encounter flags
    525: ["encount_first_ww", "Tracks the state of the first random Werewire encounter.", enemyStates],
    526: ["encount_first_tasq", "Tracks the state of the first random Tasque encounter, the one that jumps out at you. Then it's reused for like Giga Queen deaths or something, which is a little broken."], // shoutout to Colinator27 for finding the reuse
    527: ["encount_first_viro", "Tracks the state of the first Virovirokun encounter, the one en route to AGREE2ALL. Also reused for Giga Queen stuff, doing Round 1 hitless causes this to be set to 1.", enemyStates],
    528: ["encount_smorgas_2", "Tracks the state of the Smorgasboard 2 encounter.", enemyStates],
    529: ["encount_berdly_1", "Tracks the state of the first Berdly battle. Used to determine if he breaks his arm.", enemyStates],
    530: ["encount_poppup_1", "Tracks the state of the first Poppup encounter, before you meet Noelle.", enemyStates],
    531: ["encount_tutor_viro", "Tracks the state of the Virovirokun that tells Noelle how to battle.", enemyStates],
    532: ["encount_ambulance", "Tracks the state of the first Ambyu-Lance encounter.", enemyStates],
    533: ["encount_antivirus", "Tracks the state of the Ambyu-Lance + Virovirokun encounter.", enemyStates],
    534: ["encount_double_ww", "Tracks the state of the double Werewire encounter toward the middle of Cyber City.", enemyStates],
    535: ["encount_eraser_viro", "Tracks the state of the double Virovirokun encounter blocking the way to the Bounce Blade.", enemyStates],
    536: ["encount_single_maus", "Tracks the state of the single Maus encounter when rubbing the cheese.", enemyStates],
    537: ["encount_misc_maus", "Tracks the state of Maus encounters when bumping into cheese.", enemyStates],
    538: ["encount_popup_maus", "Tracks the state of the Poppup and Maus encounter after the last mouse puzzle.", enemyStates],
    539: ["encount_glowwrist_tasq", "Tracks the state of the second random Tasque encounter, in the room with the Glow Wrist and checksmark.", enemyStates],
    540: ["encount_butlers_1", "Tracks the state of the first Swatchling encounter when disrespecting the pottery.", enemyStates],
    541: ["encount_butlers_many", "Tracks the state of the second Swatchling encounter, in the room full of vases.", enemyStates],
    542: ["encount_task_manager", "Tracks the state of the Tasque Manager battle.", enemyStates],
    543: ["encount_mauswheel", "Tracks the state of the Mauswheel battle.", enemyStates],
    544: ["encount_run_butlers", "Tracks the state of the Swatchlings running after/from vases on 2F.", enemyStates],
    545: ["encount_acid_ww", "Tracks the state of the Werewires on the acid lake.", enemyStates],
    546: ["encount_rouxls", "Tracks the state of the Rouxls/Thrash Machine battle.", enemyStates],
    547: ["encount_www", "Tracks the state of the Werewerewire encounter.", enemyStates],
    548: ["encount_queen", "Tracks the state of the normal Queen battle. Used to determine if Berdly breaks his arm.", enemyStates],
    549: ["encount_spamton", "Tracks the state of the normal Spamton battle.", enemyStates],
    550: ["encount_berdly_2", "Tracks the state of the second Berdly battle. Used to determine if he breaks his arm.", enemyStates],
    551: ["encount_gigaqueen", "Honestly I have no idea what gets properly saved to this or if it's ever accessed but take a wild guess.", enemyStates],
    552: ["encount_scripted", "Tracks the state of various scripted encounters that are non-repeatable anyway (first Werewires and Sweet Cap'n Cakes).", enemyStates],
    553: ["encount_triple_medic", "Tracks the state of the triple Ambyu-Lance encounter on Snowgrave in the big car room.", enemyStates],
    554: ["encount_task_viro", "Tracks the state of the double Virovirokun single Tasque encounter on Snowgrave.", enemyStates],
    555: ["encount_sg_maice", "Tracks the state of the first Maice encounter on Snowgrave (no cheese is involved).", enemyStates],
    556: ["encount_flee_task", "Tracks the state of the Snowgrave Tasques that run away from you.", enemyStates],
    557: ["encount_pipis_fake", "Tracks the state of the last Pipis encounter you had in the dining hall. Well, it would. Pipis don't chase you."],
    558: ["encount_tasque_return", "Tracks the state of the Tasques and Swatchlings found when backtracking to Tasque Manager's room.", enemyStates],
    559: ["encount_trash_popup", "Tracks the state of the Poppups found when backtracking to the Trash Zone with Noelle.", enemyStates],
    // Snowgrave.
    560: ["encount_trash_viro", "Tracks the state of the Virovirokun found when backtracking to the Trash Zone on Snowgrave.", enemyStates],
    561: ["encount_trash_ww", "Tracks the state of the Werewire found when backtracking to the Trash Zone on Snowgrave.", enemyStates],
    562: ["encount_road_medic", "Tracks the state of the Ambyu-Lance found in the middle of the road on Snowgrave.", enemyStates],
    563: ["encount_road_tasque", "Tracks the state of the Tasque found in the middle of the road on Snowgrave.", enemyStates],
    564: ["encount_road_viro", "Tracks the state of the Virovirokun found in the middle of the road on Snowgrave.", enemyStates],
    565: ["encount_road_ww", "Tracks the state of the Werewire found in the middle of the road on Snowgrave.", enemyStates],
    566: ["encount_sg_maice_2", "Tracks the state of the second Maice encounter on Snowgrave.", enemyStates],
    567: ["encount_sg_popup", "Tracks the state of the double Poppup encounter that hides under a cone on Snowgrave.", enemyStates],
    // no 568??
    569: ["encount_www_sg", "That's gotta be the most abbreviated one yet! Tracks the state of Werewerewire on Snowgrave, since it's found elsewhere.", enemyStates],
    570: ["encount_ult_medic", "Tracks the state of the Ambyu-Lance encounter where Susie demonstrates UltimateHeal.", enemyStates],
    571: ["encount_spamton_neo", "For some reason doesn't use 'encounterflag' but tracks the state of Spamton NEO in case that's ever needed later. There are already like 2 flags for him anyway.", enemyStates],
    572: ["encount_vase_poppup", "Tracks the state of the Poppup under the vase near where Susie and Ralsei leave you.", enemyStates],
    
   // Chapter 3
    580: ["encount_board1_2shadowguys", "Tracks the state of the Shadowguy encounter in the room on the left of the oasis in Board 1.", enemyStates],
    581: ["encount_board1_3shadowguys", "Tracks the state of the Shadowguy encounter in the block-pushing room in Board 1.", enemyStates],
    582: ["encount_board2_2pippins", "Tracks the state of the Pippins encounter in the room on the left of the Kodakoda shrine in Board 2.", enemyStates],
    583: ["encount_board2_3pippins", "Tracks the state of the Pippins encounter that Susie runs into using Kris's controller in Board 2.", enemyStates],
    584: ["encount_board2_shuttah", "Tracks the state of the Shuttah boss battle in Board 2.", enemyStates],
    585: ["encount_rouxls_weather", "Tracks the state of the Rouxls Kaard throuple battle.", enemyStates],
    586: ["encount_zapper_shuttah", "Tracks the state of the Zapper + Shuttah encounter later in TV world.", enemyStates],
    587: ["encount_first_watercooler", "Tracks the state of the Watercooler in the C-rank room.", enemyStates],
    588: ["encount_b3bs_watercooler", "Never set, would have tracked the state of a Watercooler encounter in the unused room_dw_b3bs_watercooler.", enemyStates],
    589: ["encount_first_zapper", "Tracks the state of the Zapper in front of the suspicious door.", enemyStates],
    590: ["encount_first_shadowguy", "Tracks the state of the first Shadow Guy + Shuttah encounter in TV World.", enemyStates],
    591: ["encount_first_ribbick", "Tracks the state of the first Ribbick encounter in TV World.", enemyStates],
    592: ["encount_second_watercooler", "Tracks the state of the Watercooler encounter in TV World, along with the Shadowguys that drop down in the Susiezilla room.", enemyStates],
    593: ["encount_second_ribbick", "Tracks the state of the second Ribbick encounter in TV World. Can turn into disguised rabbicks.", enemyStates],
    // recruits, can take fractional values or be -1 for LOST but the checkbox is alongside a number box anyway so whatever
    // 601: ["recruit_enemy", "Whether you recruited the Chapter 1 placeholder enemy. Unused x2.", basicBool],
    // 602: ["recruit_lancer", "Unused. He doesn't have recruit info anyway.", basicBool],
    // 603: ["recruit_dummy", "Unused. It doesn't have recruit info anyway.", basicBool],
    // 604: ["recruit_ralsei", "Recruit entry for tutorial Ralsei. Unused.", basicBool],
    605: ["recruit_rudinn", "Set at the start of Chapter 2. You NEED at least one recruit.", basicBool],
    606: ["recruit_hathy", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    // 607: ["recruit_clover_old", "Unused, both for the enemy and the recruiting.", basicBool],
    // 608: ["recruit_pippins", "Unused, both for the enemy and the recruiting.", basicBool],
    // 609: ["recruit_c_round", "Unused. It doesn't have recruit info anyway.", basicBool],
    // 610: ["recruit_k_round", "Unused. It doesn't have recruit info anyway.", basicBool],
    611: ["recruit_ponman", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    // 612: ["recruit_lancer_2", "Unused. He doesn't have recruit info anyway.", basicBool],
    613: ["recruit_rabbick", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    614: ["recruit_bloxer", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    615: ["recruit_jigsaw", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    // 616: ["recruit_clover", "Unused. She doesn't have recruit info anyway.", basicBool],
    // 617: ["recruit_doomtank", "Unused, both for the enemy and the recruiting. Thrash Machine was better anyway.", basicBool],
    // 618: ["recruit_lancer_3", "Unused. He doesn't have recruit info anyway.", basicBool],
    // 619: ["recruit_susie", "Unused. She doesn't have recruit info anyway.", basicBool],
    620: ["recruit_JEVIL", "If I say 'Debug' it'll highlight this in red, because JEVIL does have recruit info.", basicBool],
    // 621: ["recruit_k_round_2", "Unused. It doesn't have recruit info anyway.", basicBool],
    622: ["recruit_rudinn_ranger", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    623: ["recruit_head_hathy", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    // 625: ["recruit_king", "Unused. He doesn't have recruit info anyway.", basicBool],
    
    630: ["recruit_medic", "Whether you recruited Ambyu-Lance.", basicBool],
    631: ["recruit_poppup", "Whether you recruited Poppup.", basicBool],
    632: ["recruit_tasque", "Whether you recruited Tasque.", basicBool],
    633: ["recruit_plugboy", "Whether you recruited Plugboy, by which I mean Werewire.", basicBool],
    634: ["recruit_maus", "Whether you recruited Maus.", basicBool],
    635: ["recruit_viro", "Whether you recruited Virovirokun.", basicBool],
    636: ["recruit_butler", "Whether you recruited Swatchling.", basicBool],
    // 637: ["recruit_cap?", "Whether you recruited Cap'n? Probably unused, I don't remember ever seeing a 'Recruit!' in that scene. And they don't have recruit info.", basicBool],
    // 638: ["recruit_k_k?", "See flag 637. Unused?", basicBool],
    // 639: ["recruit_sweet?", "See flag 637. Unused?", basicBool],
    640: ["recruit_www", "Whether you recruited Werewerewire. It doesn't appear for the powers combined scene.", basicBool],
    // 641: ["recruit_graze_test", "Whether you somehow recruited this 'Graze Test' enemy that I don't see used anywhere. There's no recruit info. Unused.", basicBool],
    642: ["recruit_task_manager", "Whether you recruited Tasque Manager.", basicBool],
    // 643: ["recruit_berdly", "Whether you somehow found a way to recruit Berdly in his first battle. No recruit info. Unused.", basicBool],
    644: ["recruit_mauswheel", "Whether you recruited Mauswheel.", basicBool],
    // 645: ["recruit_rouxls", "Probably unused. It's just Rouxls/Thrash Machine's enemy ID.", basicBool],
    // 646: ["recruit_berdly_2", "Whether you somehow found a way to recruit Berdly in his second battle. No recruit info. Unused.", basicBool],
    // 647: ["recruit_dojo_clover", "Whether you somehow found a way to recruit Clover in her Party Dojo encounter. Very unused.", basicBool],
    // 648: ["recruit_queen", "Unused. You always 'recruit' Queen, but she isn't a recruit, if you get my drift.", basicBool],
    // 649: ["recruit_spamton", "Whether you somehow found a way to recruit Spamton. No recruit info. Unused.", basicBool],
    // 650: ["recruit_spam_neo", "Whether you somehow found a way to recruit Spamton NEO. No recruit info. Unused.", basicBool],
    // 651: ["recruit_giga_queen", "Whether you somehow found a way to recruit GIGA Queen. No recruit info. Unused.", basicBool],
    // 652: ["recruit_joe", "Whether you somehow found a way to recruit Jigsaw Joe at the Party Dojo. Very unused.", basicBool],
    // 653: ["recruit_pipis", "You can't recruit Pipis. Unused.", basicBool],
    654: ["recruit_shadowguy", "Recruit progress.", basicBool],
    655: ["recruit_shuttah", "Recruit progress.", basicBool],
    656: ["recruit_zapper", "Recruit progress.", basicBool],
    657: ["recruit_ribbick", "Recruit progress.", basicBool],
    658: ["recruit_cooler", "Recruit progress.", basicBool],
    659: ["recruit_pippins", "Recruit progress.", basicBool],
    660: ["recruit_elnina", "Recruit progress.", basicBool],
    661: ["recruit_lanino", "Recruit progress.", basicBool],
    662: ["recruit_guei", "Recruit progress.", basicBool],
    663: ["recruit_balthizard", "Recruit progress.", basicBool],
    664: ["recruit_bibliox", "Recruit progress.", basicBool],
    665: ["recruit_mizzle", "Recruit progress.", basicBool],
    666: ["recruit_wicabel", "Recruit progress.", basicBool],
    667: ["recruit_winglade", "Recruit progress.", basicBool],
    668: ["recruit_organikk", "Recruit progress.", basicBool],
    669: ["recruit_ms_mizzle", "Recruit progress.", basicBool],
    
    // Chapter 4 flags
    700: ["did_sticker_fight", "Viewed the cutscene of Kris and Susie placing stickers on each other at the church. Unaccessed as of chapter 4.", basicBool],
    701: ["had_diner_with_susie", "Finished the cutscene of the diner with Susie.", basicBool],
    702: ["drew_susie", "Drew Susie during the diner cutscene.", basicBool],
    703: ["wrote_in_corner", "Wrote something in the corner during the diner cutscene. Unaccessed as of chapter 4.", basicBool],
    704: ["found_darkroom_wallswitch", "Activated the switch in the unused room_dw_church_darkroom1_old.", basicBool],
    705: ["lit_all_unused_candles", "Whether all the candles were lit in an unused candle lighting room.", basicBool],
    706: ["returned_castle_town_ch4", "Finished the cutscene of returning to Castle Town and greeting Ralsei at the start of chapter 4.", basicBool],
    707: ["got_slapped_by_noelle_weird", "Aborted the Weird Route late enough for Noelle to yell and slap you for your 'prank'.", basicBool],
    708: ["took_noelle_watch", "Kept Noelle's watch in your equipment or inventory at the end of chapter 2.", basicBool],
    709: ["opened_holiday_gate", "Opened the gate of the Holiday residence. There is a bug where it is set to -1 if you kill a Titan Spawn because the game thinks it's recruitable.", basicBool],
    710: ["saw_ralsei_room", "Whether you saw the emptiness of Ralsei's room in Castle Town.", {
        "0": "Default state",
        "1": "Susie ran off, followed by Ralsei",
        "2": "Finished the Ralsei room cutscene"
    }],
    711: ["ralsei_wants_more_plushies", "Listened to Ralsei after interacting with his Ralsei plush (obtained in chapter 2) in his room.", basicBool],
    712: ["sat_down_at_lake", "Progress in cutscene after sitting down by the lake at the end of chapter 4. Interrupted by getting up.", {
        "0": "Default state",
        "1": "Susie asks if you can hear a song",
        "2": "Kris looks at Susie",
        "3": "Susie asks if she got something on her face",
        "4": "Given the option to say what's on your mind",
        "5": "Susie gets up and says they should go"
    }],
    713: ["said_something_at_lake", "Which option you picked when asked to say what's on your mind or nothing at the lake. Unaccessed as of chapter 4.", {
        "0": "Default state",
        "1": "Say what's on your mind",
        "2": "Say nothing"
    }],
    714: ["answered_berdly_call", "Progress in the Berdly phone call at Noelle's house.", {
        "0": "Default state",
        "1": "Picked up Noelle's phone",
        "2": "Go with Berdly",
        "3": "Sing the wrong number song"
    }],
    715: ["asked_alvin_about_shelter", "Talked to Alvin and picked 'Enter the shelter' after his sermon.", basicBool],
    716: ["bangin_sermon_my_man", "Talked to Alvin and picked the best option after his sermon.", basicBool],
    717: ["asked_alvin_about_asgore", "Talked to Alvin and picked 'Asgore' after his sermon.", basicBool],
    718: ["talked_monster_kid_church", "What you said to Monster Kid after Alvin's sermon.", {
        "0": "Default state",
        "1": "Shelter",
        "2": "Susie will not be tamed"
    }],
    719: ["made_alphys_juice", "Successfully created Alphys' juice combo at church.", basicBool],
    720: ["brought_alphys_juice", "Whether you gave Alphys her juice combo… or not.", {
        "0": "Default state",
        "1": "Offer juice",
        "2": "Drink juice in front of her"
    }],
    722: ["told_alphys_why_shelter", "The reason you gave to Alphys for asking about the shelter.", {
        "0": "Default state",
        "1": "Architectural history research",
        "2": "Put hay inside new house for Susie"
    }],
    723: ["talked_alphys_about_undyne", "Talked to Alphys about Undyne at church. An extra value is available if we gave her Undyne's chocolate in chapter 2.", {
        "0": "Default state",
        "1": "Undyne / She gave you chocolates though",
        "2": "It's because of me"
    }],
    726: ["noelle_santa_comment", "Whether Noelle has explained the Santas.", basicBool],
    727: ["noelle_dead_santa_comment", "Whether Noelle commented on Kris trying to 'starve' the Santas.", basicBool],
    728: ["activated_treat_launcher", "Viewed the cutscene of Noelle showing off the unused holiday treat launcher.", basicBool],
    730: ["noelle_cactus_comment", "Whether Noelle commented on the cactus being called Tsuntsun by Berdly.", basicBool],
    731: ["checked_noelle_history", "Checked Noelle's browsing history with Susie.", basicBool],
    732: ["found_cat_petterz", "Noticed Cat Petterz 4 on Noelle's computer.", basicBool],
    733: ["took_noelle_pencil", "Took the pencil from Noelle's homework desk.", basicBool],
    // Back to Chapter 3 for this one flag for some reason
    734: ["ral_susie_festival_talk", "Whether you completed the talk between Susie and Ralsei prior to Tenna's introduction in Chapter 3.", basicBool],
    
    736: ["noelle_kitchen_phone_current_line", "Tracks the current line in the spooky phone call to Kris in Noelle's kitchen.", {
        "0": "... dark... fountain... next...",
        "1": "... Susie... must not get... guitar...",
        "2": "... need... soul...",
        "3": "Without... soul... Kris... will...",
        "4": "... Susie... guitar... code... stop...",
        "5": "... police... sacrifice... next week...",
        "6": "... church... tonight...",
        "7": "... Kris... dark world... no soul... can't...",
        "8": "...... ...... ......"
    }],
    737: ["noelle_kitchen_soul_catch_progress", "Tracks the progress in the cutscene of Kris catching the Soul in Noelle's kitchen.", {
        "0": "Default state",
        "1": "Kris caught Soul in kitchen",
        "2": "Kris put back Soul in closet"
    }],
    738: ["noelle_kitchen_piano_current_song", "Tracks the current piano song being played by Kris in Noelle's kitchen.", {
        "0": "Default state",
        "1": "kris_piano_sevenfour",
        "2": "kris_piano_quiz",
        "3": "kris_piano_lancer_waltz",
        "4": "kris_piano_rouxls",
        "5": "kris_piano_waitingroom",
        "6": "kris_piano_shop",
        "7": "kris_piano_last_prophecy",
        "8": "kris_piano_prophecy",
        "9": "Kris played all songs (unused?)"
    }],
    739: ["noelle_present1_x", "X coordinate of the first present in Noelle's present room."],
    740: ["noelle_present2_x", "X coordinate of the second present in Noelle's present room."],
    741: ["noelle_present3_x", "X coordinate of the third present in Noelle's present room."],
    742: ["noelle_bathroom_asgore_current_line", "Tracks the current line in the Asgore cutscene in Noelle's bathroom.", {
        "0": "Default state",
        "1": "Dum dee dum...",
        "2": "Phew! Cleaning up sure works up an appetite.",
        "3": "... I wonder if the kitchen has any treats for me...",
        "4": "... No. Not now. I can't afford to take a break.",
        "5": "Now, more than ever... I need to concentrate.",
        "6": "... to settle this once and for all.",
        "7": "... I've got to go look again."
    }],
    744: ["showed_susie_family_photo", "Showed to Susie the old family photo on your fridge.", basicBool],
    745: ["showed_susie_asriel_photo", "Showed to Susie the Asriel photo on your fridge.", basicBool],
    746: ["susie_saw_dragon_book", "Opened the drawer containing How To Draw Dragons in front of Susie.", basicBool],
    748: ["cleaned_up_stain", "Cleaned up the stain with Susie in Kris's room.", basicBool],
    750: ["talked_berdly_librarby", "Talked to Berdly at the Librarby.", basicBool],
    751: ["discussed_plans_berdly_librarby", "Discussed plans with Berdly at the Librarby.", basicBool],
    752: ["introduced_susie_rudy_after_church", "Brought Susie to see Rudy at the hospital after church, if we didn't see him at the end of chapter 2 (flag 316).", basicBool],
    753: ["brought_susie_rudy_after_church", "Brought Susie to see Rudy at the hospital after church, if we did see him at the end of chapter 2 (flag 316).", basicBool],
    754: ["interacted_sink_ch4", "Interacted with Rudy's sink in chapter 4, after also doing it in chapter 1 (flag 278) and 2 (flag 461).", basicBool],
    755: ["talked_berdly_hospital_ch4", "Visited Berdly's room at the hospital after church if his arm was injured in chapter 2.", basicBool],
    756: ["changed_bottle_berdly_hospital", "Changed Berdly's water bottle at the hospital during the Weird Route.", basicBool],
    757: ["turned_up_heater_berdly_hospital", "Turned up the space heater in Berdly's room at the hospital during the Weird Route.", basicBool],
    758: ["talked_susie_berdly_visit", "Viewed the cutscene of Susie talking to Kris after exiting Berdly's hospital room if his arm was injured in chapter 2.", basicBool],
    759: ["talked_susie_berdly_visit_weird", "Tracks Susie talking before and after we enter Berdly's hospital room in the Weird Route.", {
        "0": "Default state",
        "1": "Susie asked if Kris wants to go alone",
        "2": "Susie talked to Kris after they come out"
    }],
    760: ["talked_catty_alley", "Talked to Catty in the alley.", basicBool],
    761: ["eavesdropped_blue_bunny", "Eavesdropped on Blue Bunny at the diner.", basicBool],
    762: ["talked_bratty_about_catty", "Talked to Bratty about Catty at the diner.", basicBool],
    763: ["talked_to_alphys_ch4", "Talked to Alphys in Hometown in chapter 4, if we already talked to her in chapter 1 (flag 269).", basicBool],
    764: ["talked_to_alphys_ch4_explain", "Talked to Alphys in Hometown in chapter 4 and asked her to explain herself, if we didn't talk to her in chapter 1 (flag 269).", basicBool],
    765: ["scared_kid_after_knocking", "Viewed the cutscene of Susie scaring the kid behind one of the knockable doors.", basicBool],
    767: ["talked_catti_about_susie", "Talked to Catti about Susie in Hometown.", basicBool],
    768: ["interacted_gerson_grave_end_ch4", "Interacted with Gerson's grave with Susie at the end of chapter 4.", basicBool],
    769: ["interacted_shelter_end_ch4", "Interacted with the Shelter with Susie at the end of chapter 4.", basicBool],
    770: ["interacted_school_end_ch4", "Tried to enter the school at the end of chapter 4.", basicBool],
    771: ["lake_cutscene_progress_ch4", "Tracks the progress of the lake cutscene with Susie in chapter 4.", {
        "0": "Default state",
        "1": "Susie remarks our weird friend is busy today",
        "2": "Normal NPC when coming back",
        "3": "Viewed the skipping stones cutscene"
    }],
    773: ["interacted_table_before_rain", "Interacted with the table near the lake with Susie, before it started raining.", basicBool],
    774: ["interacted_table_after_rain", "Interacted with the table near the lake with Susie, after it started raining.", basicBool],
    775: ["interacted_berdly_desk", "Interacted with Berdly's desk with the egg(s) on it in Alphys' class.", basicBool],
    776: ["heard_more_burgerpants", "Picked 'Hear more' when talking to Burgerpants.", basicBool],
    777: ["burgerpants_date_progress", "Tracks the progress of the Burgerpants date cutscene.", {
        "0": "Default state",
        "1": "Burgerpants got cookies and left",
        "2": "Talked to Nice Cream Guy"
    }],
    778: ["toriel_blush", "Whether Toriel is blushing. Used for the end of chapter 4.", basicBool],
    779: ["tenna_mettaton_progress", "Tracks the progress of giving Tenna to Mettaton.", {
        "0": "Default state",
        "1": "Offered to give our TV",
        "2": "Gave our TV"
    }],
    780: ["tenna_brought_to_castle_town", "Brought Tenna to school.", basicBool],
    782: ["interacted_treat_catcher_susie", "Interacted with the holiday treat catcher with Susie and Noelle at Noelle's house.", basicBool],
    783: ["ornament_finished_rolling", "Whether the unused ornament in Noelle's house has finished rolling after falling.", basicBool],
    784: ["noelle_fan_rotating", "Whether the unused rotating fan in Noelle's house is rotating.", basicBool],
    785: ["noelle_fan_current_frame", "The current frame of the unused rotating fan in Noelle's house."],
    786: ["talked_sans_grill", "Talked to Sans in front of his grill in Hometown.", basicBool],
    787: ["noelle_kitchen_kris_piano_progress", "Tracks the progress of the cutscene of Kris walking to the piano in Noelle's kitchen.", {
        "0": "Default state",
        "1": "Entered kitchen again after getting caught",
        "2": "Kris walks to the left",
        "3": "Kris walks down",
        "4": "Kris walks to the right"
    }],
    788: ["saw_lancer_room_ch4", "Viewed the cutscene about Lancer's room being renovated.", basicBool],
    789: ["talked_king_about_knight", "Talked to King about the Knight.", basicBool],
    790: ["tenna_entertained_king", "Viewed the cutscene of Tenna entertaining King.", basicBool],
    791: ["talked_queen_drinking", "Viewed the cutscene of Queen drinking in front of the giant speakers.", basicBool],
    792: ["addison_current_lineup", "Current lineup of the Addison booth in Castle Town.", {
        "0": "Lineup 1",
        "1": "Lineup 2",
        "2": "Lineup 3",
        "3": "Lineup 4"
    }],
    793: ["susie_carried_lancer", "Whether Susie carried Lancer on her back in Castle Town.", basicBool],
    794: ["rain_state", "Activated when it's raining (mainly to control music and effects).", {
        "0": "Default state",
        "1": "Chapter 4 ending (becomes state 2 after setting some parameters)",
        "2": "Rain initialized (overrides other states)",
        "3": "Used for certain room transitions (set back to 2 immediately if rain exists in the next room)"
    }],
    795: ["stairs_prophecies_seen", "How many of the two prophecies were seen in the two unused room_dw_church_stairs_topleft and room_dw_church_stairs_topright.", {
        "0": "Default state",
        "1": "Saw one prophecy",
        "2": "Saw both prophecies"
    }],
    797: ["checked_shelter_panel", "Checked the Shelter's panel.", basicBool],
    798: ["sans_sign_progress", "Tracks the progress of the Sans sign shenanigans.", {
        "0": "Default state",
        "1": "Talked to Sans before checking the sign",
        "2": "Checked Open sign",
        "3": "Talked to Sans when sign says Open",
        "4": "Went away and came back",
        "5": "Talked to Sans when sign says Clopen",
        "6": "Went away and came back",
        "7": "Talked to Sans when sign is Sans"
    }],
    799: ["saw_man_in_diner", "Saw the Man in the diner, if you got the Egg in chapter 3.", basicBool],
    
    800: ["cafe_topleft", "The recruit seated in the top-left of the Cafe. Defaults to Jigsawry.", recruits],
    801: ["cafe_topright", "The recruit seated in the top-right of the Cafe. Defaults to Rudinn.", recruits],
    802: ["cafe_bottomleft", "The recruit seated in the bottom-left of the Cafe. Defaults to Hathy.", recruits],
    803: ["cafe_bottomright", "The recruit seated in the bottom-right of the Cafe. Defaults to Rudinn.", recruits],
    
    810: ["beat_grazing", "Whether you beat the grazing challenge in the Party Dojo.", basicBool],
    811: ["beat_dojo_clover", "Whether you beat Clover's rematch in the Party Dojo.", basicBool],
    812: ["beat_tm_says", "Whether you beat the 'Tasque Manager Says' challenge in the Party Dojo.", basicBool],
    813: ["beat_allstars", "Whether you beat the Ch2 All Stars challenge in the Party Dojo.", basicBool],
    814: ["beat_joe", "Whether you defeated Jigsaw Joe in the Party Dojo and took his life savings.", basicBool],

    815: ["beat_weather_duo", "Whether you defeated Lanino & Elnina in the chapter 4 Party/Love Dojo.", {
        "0": "Default state",
        "2": "Won"
    }],

    831: ["talked_toriel_after_church", "Viewed the cutscene of Toriel telling us to come by the church if we need anything.", basicBool],
    832: ["took_azzy_money_ch4", "Whether you took five bucks from Asriel's drawer in chapter 4.", basicBool],
    833: ["cant_afford_diner", "Tried to get diner while not having the money for it.", basicBool],
    834: ["showed_compassion", "Showed compassion to Ralsei by splatting next to him in the church Dark World.", basicBool],
    835: ["interacted_prophecy_savepoint", "Interacted with the save point under the prophecy panel at the start of the First Sanctuary.", basicBool],
    836: ["talked_gerson_study", "Talked to Gerson once he's installed in his study.", basicBool],
    837: ["talked_gerson_prejack_letter", "Asked Gerson in his study what he's doing, before healing Jackenstein.", basicBool],
    838: ["talked_gerson_prejack_knight", "Asked Gerson in his study about the Knight, before healing Jackenstein.", basicBool],
    841: ["unused_hide_elixir_study", "If activated, hides the elixir on the table of Gerson's study. Never set.", {
        "0": "Default state",
        "2": "Hide elixir"
    }],
    844: ["susie_copied_notes", "Viewed the cutscene of Susie talking to Gerson and writing down the music notes on the wall.", basicBool],
    845: ["thought_about_knight", "Viewed the cutscene of Kris thinking about the Knight. Unaccessed as of chapter 4.", basicBool],
    846: ["thought_about_noelle_weird", "Viewed the cutscene of Kris thinking about Noelle in the Weird Route. Unaccessed as of chapter 4.", basicBool],
    847: ["sheetmusic_progress", "Tracks the progress of the cutscene of Kris playing the organ/piano and opening the central door in Gerson's study.", {
        "0": "Default state",
        "1": "Used sheet music (for some reason opens the door early, likely a leftover)",
        "2": "Kris played piano",
        "3": "Unused (relies on unused flag 848)"
    }],
    848: ["unused_organ_thing", "Set by unreachable code, might be related to a cut player-only solve."],
    849: ["saw_jackenstein_face", "Saw Jackenstein's true face after defeating him. Unaccessed as of chapter 4.", basicBool],
    850: ["jackenstein_progress", "Tracks the progress of the Jackenstein cutscenes.", {
        "0": "Default state",
        "0.5": "Found one set of four tones",
        "1": "Found both sets of four tones",
        "2": "Solved piano puzzle",
        "3": "Fell into THE DARK ZONE",
        "4": "Jackenstein hit chandelier",
        "5": "Susie healed Jackenstein",
        "6": "Susie offered Kris to heal again"
    }],
    851: ["gerson_progress", "Tracks the progress of the Gerson cutscenes.", {
        "0": "Default state",
        "1": "Solved secret piano puzzle",
        "2": "Fought Gerson",
        "3": "Viewed post-battle cutscene"
    }],
    852: ["beat_hammer_of_justice", "Whether you defeated the Hammer of Justice.", basicBool],
    853: ["hammer_of_justice_fight_attempts", "Number of times you fought the Hammer of Justice."],
    854: ["should_ralsei_have_feelings", "What you answered to Ralsei asking you if a Darkner should be starting to develop his own desires. Unaccessed as of chapter 4.", {
        "0": "Default state",
        "1": "Please be yourself",
        "2": "Of course not"
    }],
    855: ["talked_seam_addisons", "Talked to Seam about taking everything from the Addisons to scare them.", basicBool],
    856: ["gave_knight_crystal", "Whether you gave Seam the Knight's Shadow Crystal.", basicBool],
    862: ["talked_rudy_about_asgore", "Talked to Rudy about Asgore at church.", basicBool],
    863: ["got_sideclimb_chest", "Got the Power Band from the chest in the room with the Mizzle on top.", basicBool],
    864: ["stole_ladder_for_ralsei", "Stole the ladder in the bookshelf puzzle room to decorate Ralsei's room.", basicBool],
    865: ["stole_pillow_for_ralsei", "Stole the pillow in the right piano piece room to decorate Ralsei's room.", basicBool],
    866: ["park_your_butt_mister", "Told Ralsei to park his butt.", basicBool],
    867: ["talked_extinguisher", "Talked to the most important Darkner.", basicBool],
    868: ["gerson_recruited_guei", "Whether Gerson recruited the Gueis.", basicBool],
    869: ["solved_intropiano", "Solved the first piano puzzle.", basicBool],
    871: ["got_darkmaze_chest", "Opened the empty chest in the dark maze room.", basicBool],
    872: ["darker_candy_bowl", "Tracks what you did with the Darker Candy bowl.", {
        "0": "Default state",
        "1": "Took one candy",
        "3": "Spilled the bowl"
    }],
    873: ["interacted_locked_church_door", "Interacted with the locked church door before Susie got an idea.", basicBool],
    874: ["triggered_gerson_silhouette", "Triggered the silhouette of Gerson walking away in the intro dark maze room.", basicBool],
    875: ["should_ralsei_smile", "What you told Ralsei after he told you he was smiling.", {
        "0": "Default state",
        "1": "It's okay not to smile",
        "2": "Good. Keep smiling"
    }],
    876: ["bookshelfpuzzle_shelf1_x", "X coordinate of the first shelf in the bookshelf puzzle room."],
    877: ["bookshelfpuzzle_shelf1_y", "Y coordinate of the first shelf in the bookshelf puzzle room."],
    878: ["bookshelfpuzzle_shelf2_x", "X coordinate of the second shelf in the bookshelf puzzle room."],
    879: ["bookshelfpuzzle_shelf2_y", "Y coordinate of the second shelf in the bookshelf puzzle room."],
    880: ["bookshelfpuzzle_shelf3_x", "X coordinate of the third shelf in the bookshelf puzzle room."],
    881: ["bookshelfpuzzle_shelf3_y", "Y coordinate of the third shelf in the bookshelf puzzle room."],
    882: ["pianopiece_right_shelf1_x", "X coordinate of the first shelf in the right piano piece room."],
    883: ["pianopiece_right_shelf1_y", "Y coordinate of the first shelf in the right piano piece room."],
    884: ["pianopiece_right_shelf2_x", "X coordinate of the second shelf in the right piano piece room."],
    885: ["pianopiece_right_shelf2_y", "Y coordinate of the second shelf in the right piano piece room."],
    886: ["revealed_pianopuzzle_hint_right", "Revealed the right piano hint for the piano puzzle.", {
        "0": "Default state",
        "1": "Revealed hint",
        "-1": "Solved piano puzzle"
    }],
    887: ["revealed_intropiano_hint_left", "Revealed the left piano hint in the intro piano room.", basicBool],
    888: ["revealed_intropiano_hint_right", "Revealed the right piano hint in the intro piano room.", basicBool],
    889: ["revealed_darkmaze_hint_bottom", "Revealed the bottom piano hint in the dark maze room.", basicBool],
    890: ["revealed_darkmaze_hint_top", "Revealed the top piano hint in the dark maze room.", basicBool],
    891: ["revealed_pianopuzzle_hint_left", "Revealed the left piano hint for the piano puzzle.", {
        "0": "Default state",
        "1": "Revealed hint",
        "-1": "Solved piano puzzle"
    }],
    892: ["solved_pianopuzzle", "Solved the piano puzzle before Jackenstein.", basicBool],
    893: ["tried_pianopuzzle_without_hint", "Tried to solve the piano puzzle without hint.", {
        "0": "Default state",
        "1": "Interacted with piano once",
        "1.1": "Interacted with piano more than once"
    }],
    894: ["got_pianopiece_left_chest", "Got the Scarlixir from the chest in the left piano piece room.", basicBool],
    895: ["susie_basement_current_line_weird", "Tracks the current line of Susie's dialogue alone in Noelle's basement during the Weird Route.", {
        "0": "Default state",
        "1": "... Damn, I've moved everything but I can't find anything...",
        "2": "... wonder how Kris's search is going.",
        "3": "... nothing to do but keep looking, I guess."
    }],
    897: ["prevent_piano_one_hint", "Flag never set, but would have prevented use of the piano if we had gotten one of the two hints?", basicBool],
    898: ["moneyfountain_donation", "The amount of money you donated to the money fountain."],
    899: ["encount_holywatercooler", "Tracks the state of the Holywatercooler encounter.", enemyStates],
    
    // wow things are really opening up now
    
    // credit to Nisha Wolfe of Spamton Save Editor for the vessel names, saved a lot of work https://saveeditor.spamton.com/deltarune2
    900: ["vessel_head", "The head of your vessel.", [ // if you want better options find a way to include images in dropdowns
            "Bald",
            "Kris-like",
            "Left lock",
            "Middle part",
            "Thick hair",
            "Loose",
            "Balding line",
            "Refined"
         ]],
    901: ["vessel_torso", "The body of your vessel.", [
            "Long sleeves",
            "Short sleeves",
            "Baggy sleeves",
            "Baggier sleeves",
            "Zipper",
            "Buttons"
         ]],
    902: ["vessel_legs", "The legs of your vessel.", [
            "Wider on right",
            "Wider on right",
            "Wider on right",
            "Wider on right",
            "Wider on left"
         ]],
    903: ["vessel_food", "Your vessel's favorite food.", [
            "Sweet",
            "Soft",
            "Sour",
            "Salty",
            "Pain",
            "Cold"
         ]],
    904: ["vessel_blood", "Your favorite blood type.", [
            "A",
            "AB",
            "B",
            "C",
            "D"
         ]],
    905: ["vessel_color", "Your vessel's favorite color.", [
            "Red",
            "Blue",
            "Green",
            "Cyan"
         ]],
    906: ["vessel_feeling", "How you feel about your vessel.", [
            "Love",
            "Hope",
            "Disgust",
            "Fear"
         ]],
    907: ["vessel_honest", "Were you honest about your vessel choices?", ["Yes", "No"]],
    908: ["vessel_seizure", "Do you acknowledge the possibility of pain and seizure?", ["Yes", "No"]],
    909: ["vessel_gift", "The gift you give your vessel. Stored in reverse order for some reason.", {
            "-3": "Voice",
            "-2": "Bravery",
            "-1": "Ambition",
            "0": "Mind",
            "1": "Kindness",
        }],
    910: ["ch1_egg_room", "Your progress to finding... him.", [
            "Default state",
            "Entered room",
            "Interacted with man"
         ]],
    911: ["got_ch1_egg", "Set when entering Chapter 2 if you had or deposited the Chapter 1 egg, but not if you dropped it. Maybe. It checks the key item.", basicBool],
    912: ["language_name", "Language your name was entered in, used to display the correct font even if you change the game language later.", ["English", "Japanese"]],
    913: ["interacted_man_car", "Whether you saw the man wave at you from his car, if flag 910 up there was 2 (even if you refused the offer).", basicBool],
    914: ["chapter_started", "The chapter you started your current save file on, is 0 if the file was created on the current chapter."],
    915: ["snowgrave_plot", "Your progress on the Snowgrave Route. This is a big one.", {
            "0": "Default state",
            "1": "Froze tutor Virovirokun",
            "1.5": "Froze Trash Zone enemies",
            "1.75": "Froze roadway enemies",
            "2": "Ready for Freeze Ring",
            "3": "Got Freeze Ring",
            "4": "Passed forcefield",
            "5": "Froze mouse puzzle",
            "6": "SnowGrave.",
            "7": "Entered mansion",
            "8": "Rouxls's condition explained",
            "9": "Did not see Suselle scene",
            "19": "Seen Noelle with Rudy",
            "20": "Creeped Noelle out"
        }],
    916: ["snowgrave_fail", "Whether you failed the Snowgrave Route at any point, by any action. Reverts practically every effect of the route.", basicBool],
    917: ["ch2_egg_room", "Your progress to finding him. Again.", [
            "Default state",
            "Killed by dog",
            "Entered egg room",
            "Interacted with man"
         ]],
    918: ["got_ch2_egg", "Whether you got the Chapter 2 egg, for Temmie's collection.", basicBool],
    919: ["times_noelle_leveled", "Like flag 65 but for Noelle in particular. Unaccessed."],
    920: ["got_ch2_moss", "Whether you got the Moss in Chapter 2 and the Moss Finder title.", basicBool],
    921: ["noelle_moss", "Whether Noelle was with you when you found the Moss, earning the Moss Neutral title.", basicBool],
    922: ["susie_moss", "Whether Susie was with you when you found the Moss, earning the Moss Enjoyer title.", basicBool],
    923: ["forgot_ring", "Whether you failed the Snowgrave route because of not having the Thorn Ring at Berdly. Unaccessed.", basicBool],
    924: ["snowgrave_attempts", "The number of times you told Noelle to KILL HIM, KILL HIM NOW. (0-4)"],
    925: ["iceshocks", "The number of IceShocks Noelle has used, finishing or not. Each increases her Coldness by 7."],
    926: ["iceshocked_encounters", "The number of encounters defeated with IceShock. Unaccessed."],
    // no 927?
    928: ["creepy_steps", "The number of steps you take toward Noelle (0-3) after the hospital scene on Snowgrave. Yeah, that's a thing."],
    
    930: ["got_ch3_egg", "Whether you got the Chapter 3 egg.", basicBool],
    931: ["got_ch4_egg", "Whether you got the Chapter 4 egg.", basicBool],

    932: ["amount_pain_ch1", "Number of times hit in Chapter 1, used for trophies."],
    933: ["amount_ice_e_pain_ch1", "Number of times you looked at the ICE-E pain scale in Chapter 1, used for trophies."],
    934: ["amount_pain_ch2", "Number of times hit in Chapter 2, used for trophies."],
    935: ["amount_ice_e_pain_ch2", "Number of times you looked at the ICE-E pain scale in Chapter 2, used for trophies."],
    936: ["amount_pain_ch3", "Number of times hit in Chapter 3, used for trophies."],
    937: ["amount_pain_ch4", "Number of times hit in Chapter 4, used for trophies."],
    938: ["amount_ice_e_pain_ch4", "Number of times you looked at the ICE-E pain scale in Chapter 4, used for trophies."],
    939: ["amount_treasure", "Number of chests opened, used for trophies."],
    
    950: ["shadow_failed_ch2", "Whether you used the Shadow Crystal in Chapter 2 and saw nothing. 952 is more interesting.", basicBool],
    951: ["glass_failed_ch2", "Whether you used the Glass in Chapter 2 and saw nothing. 953 and 281 are more interesting.", basicBool],
    952: ["shadow_lab", "Whether you saw the computer lab using the Shadow Crystal.", basicBool],
    953: ["glass_susie_glare", "Whether you saw Susie glare at you using the Glass.", basicBool],     
    954: ["gave_JEVIL_crystal", "Whether you gave Seam JEVIL's Shadow Crystal.", basicBool],
    // no 955-960
    961: ["failed_spam_crystal", "Whether you got JEVIL's Shadow Crystal but failed to find Spamton's, and told Seam. They seem quite dejected...", basicBool], // :(
    
    1001: ["tiny_pyramid_state", "Progress finding the even tinier pyramid in Desert Board. Resets to 0 if you enter Rouxls's shop.", [
             "Default state",
             "Tiny pyramid mentioned",
             "Rouxls evicted",
             "Locked out"
          ]],
    1002: ["fought_shadowmantle", "Whether you've started the Shadow Mantle fight. Speeds up repeat fights, as your death isn't a real Game Over and doesn't reload a save.", basicBool],
    1003: ["board_losses", "Number of Game Overs attained in Tenna's show."],
    1004: ["got_crowd_treasure", "Whether you opened the chest in the lower-left corner of that maze with Zapper+Shuttah fights."],
    1005: ["found_maze_crowd", "Whether you triggered the cheering crowd in the upper-right corner of that maze with Zapper+Shuttah fights.", basicBool],
    1006: ["forest_cut_progress", "Number of repeating forest rooms passed through looking for the Ice Key."],
    1007: ["swordroute_evict", "Whether you've (recently) done something to get yourself kicked out of the original game. Like dying.", basicBool],
    1008: ["found_shadowtease", "Whether you found the 'See you soon' hidden message in the Sword Route.", basicBool],
    1009: ["shadowtease_eyes", "Whether you saw the teaser eyes on the side of the pyramid in Sword Board 1.", basicBool],
    1010: ["shadowtease_grin", "Whether you saw the teaser grin on the side of the pyramid in Sword Board 1.", basicBool],
    1011: ["gameshow_battles", "Number of battles entered on Tenna's show? Unaccessed, but there's an empty code block here."],
    1012: ["gameshow_name_1", "First letter selected for Kris's name on the game show.", ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]],
    1013: ["gameshow_name_2", "Second letter selected for Kris's name on the game show.", ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]],
    1014: ["gameshow_name_3", "Third letter selected for Kris's name on the game show.", ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]],
    
    1017: ["fave_weather", "Whose attack you liked better, causing the Weather to not Stick Together.", [
             "Elnina",
             "Lanino"
          ]],
    1018: ["seen_preegg_board", "Whether you saw the board that's a prerequisite for solving Nowhere. Unaccessed.", basicBool],
    1019: ["quiz_right_answers", "Number of correct answers (totalled on all characters) in the most recent of Tenna's quizzes. Slightly alters the Tenna-sphinx dialogue."],
    1020: ["got_power_croissant", "Whether Susie has obtained the Power Croissant, allowing her to pick up boxes, pots, weeds, and Ralsei.", basicBool],
    1021: ["ch3_couch_walkaway", "Whether the couch has begun walking away (if you go right then go back to it) at the start of Chapter 3.", basicBool],
    1022: ["tenna_board_absent", "Whether Tenna has left the current board, allowing for additional chicanery. Volatile?", basicBool],
    1023: ["cant_grab_ralsei", "Seems to? prevent Susie from picking up Ralsei in Tenna's minigames.", basicBool],
    1024: ["board_transitioning?", "Seems to be a volatile value to freeze characters on Chapter 3 minigame transitions.", basicBool],
    1025: ["board_key_count", "Board 1 key count. Unaccessed. See flag 1122 instead. Also incremented if you buy the useless board 2 key."],
    // 1026?
    1027: ["s_star_splat", "Whether you interacted with the stars in the S-Rank room, causing one of them to fall on the floor.", basicBool],
    1028: ["got_ramb_prize_1", "Whether you got the first board reward from Ramb (if available based on rank).", [
             "Default state",
             "Got prize",
             "Got nothing (Z-Rank)"
          ]],
    1029: ["ramb_back_talk_2", "How much you've talked with Ramb backstage. More complicated?", [
             "Default state",
             "Ramb moved away from the door the first time",
             "'I'm glad you're having REAL fun, Kris. (moves for the second time)'",
             "Talked round 3 (unused?)"
          ]],
    1030: ["got_ramb_prize_2", "Whether you got the second board reward from Ramb (if available based on rank).", [
             "Default state",
             "Got prize",
             "Got nothing (Z-Rank)"
          ]],
    1031: ["entered_changing_room", "Whether you've interacted to enter the S- or Z-Rank room. Stops Susie's and Ralsei's dialogue on repeat.", basicBool],
    1032: ["ramb_first_talk", "Whether you've talked to Ramb at least once in the Green Room. Alters repeat interaction.", basicBool],
    1033: ["tried_racing", "Whether you've interacted with the TV with the racing game at least once. Alters repeat interaction.", basicBool],
    1034: ["times_played_racing", "Number of times you played the unseeable racing game."],
    1035: ["won_racing", "Whether you won the racing game. Susie refuses to play any more afterward.", basicBool],
    // 1036?
    1037: ["ral_cheer_equip", "Number of times you've equipped the Blue Ribbon to Ralsei, giving progress of a cheer chant."],
    1038: ["pipis_sounds", "Status of the Pipis in your inventory. Increases over time.", [
             "Default state",
             "Chirping",
             "Clucking"
          ]],
    1039: ["tenna_pipis_state", "State of Tenna's Pipis in the Bonus Zone (without Spamton).", [
             "Default state",
             "Tenna panicked",
             "Got Pipis"
          ]],
    /*1040: ["hole_warp_num", "Progress using holes to warp in unused boards of Chapter 3?", [
             "Default state",
             "Found first warp",
             "Found second warp",
             "Dug up keycard"
          ]],*/
    1040: ["got_hero_photo", "Whether you've photographed the three heroes for Shuttah. The same flag is reused in some scrapped content.", basicBool],
    1041: ["got_half_flower", "Whether you've photographed the half flower in Board 2.", basicBool],
    1042: ["got_spring_photo", "Whether you've photographed the healing green spring in Board 2.", basicBool],
    1043: ["got_cactus_photo", "Whether you've photographed the only cactus in Board 2.", basicBool],
    1044: ["points", "Your point total in Chapter 3."],
    1045: ["susie_heal_practice", "The number of times you have used UltraHeal/OKHeal/BetterHeal. Improves the spell. Caps at 5 in Chapter 3, 15 in Chapter 4."],
    // 1046?
    1047: ["knight_ch3_status", "Whether you beat the Knight... down to 80% of its health. Also saved to ini.", [
             "Default state",
             "Won",
             "Lost"
          ]],
    1048: ["lancer_cost", "Amount spent on Lancer in Board 2. Decreases if he is photographed before purchase.", {
             0: "Uninitialized",
             9: "9 points",
             99: "99 points",
             999: "999 points"
          }],
    1049: ["board_1_battles", "Number of battles engaged in on Board 1."],
    1050: ["beat_mantle", "Whether the Shadow Mantle boss was defeated.", basicBool],
    1051: ["times_admitted_cheat", "Number of times you admitted to Zappers that you're a cheater, usually triggering a battle. ?"],
    1052: ["tenna_deleted_grass", "Whether Tenna deleted the grass to keep Susie from wasting time on it in the unused Board 3.", basicBool],
    // 1053?
    1054: ["tenna_voice_pitch", "Appears to be a volatile factor applied to Tenna's voice bite. Only used for his flashback.", {
             "0": "Uninitialized",
             "0.8": "80% pitch",
             "1": "Full pitch"
          }],
    1055: ["sword_route_progress", "Progress on the Sword Route, the Chapter 3 side quest for the Shadow Mantle.", {
             "0": "Not started",
             "1": "Got Ice Key",
             "1.5": "Entered Ice Palace",
             "2": "She was used up.",
             "3": "Got Shelter Key",
             "4": "Entered red dungeon",
             "5": "Entered shelter",
             "6": "Defeated boss"
          }],
    1056: ["kris_tenna_chat", "Whether Tenna tried to justify himself to Kris between rounds.", basicBool],
    1057: ["unused", "Seems to be a tracker for a scrapped backstage sequence in Chapter 3? There's code to advance to 2, but not to 1."],
    1058: ["found_island_tenna", "Whether you found Tenna at the Tropic of Love on the original game, and heard his musings.", basicBool],
    1059: ["rouxls_ch3_status", "Battle status of the Rouxls Kaard Rules Card battle (probably always Spared?)", enemyStates],
    1060: ["got_elnina_controller", "Whether you got the Elnina Controller for an unused game. The item ID got repurposed as the Odd Controller.", basicBool],
    1061: ["shadowgunner_photos", "Number of photos taken of the Shadowmen shooting at you from trees. They have bunny ears after 5."],
    1062: ["got_curtain_saber10", "Whether you got the Saber10 from the quiet person behind the S-Rank curtain.", basicBool],
    
    1066: ["talked_ramb_fountain", "Whether Ramb explained (after Board 3) that he saw Kris make the fountain.", basicBool],
    1067: ["got_shadowmantle", "Whether you've opened the chest containing the Shadow Mantle.", basicBool],
    1068: ["talked_lancer_greenroom", "Whether you've talked to Lancer in the Green Room (and he phased through the door).", basicBool],
    
    1071: ["ch3_couch_skip", "Whether you used the couch to skip to Board 1 in Chapter 3.", basicBool],
    // 1072?
    1073: ["lancer_tv_name", "What you (and Ralsei) named Lancer in Tenna's quiz.", [
             "Lancer",
             "Dancer",
             "Prancer",
             "Mr. Generosity"
          ]],
    1074: ["got_in_s_rank_1", "Whether you've talked to the Zapper guarding the S-Rank room and gotten in for board 1.", basicBool],
    1075: ["got_in_s_rank_2", "Whether you've talked to the Zapper guarding the S-Rank room and gotten in for board 2.", basicBool],
    1076: ["counterfeit_s_1", "Buying the counterfeit S-Rank for Board 1.", [
             "Default state",
             "Have counterfeit",
             "Reset"
          ]],
    1077: ["counterfeit_s_2", "Buying the counterfeit S-Rank for Board 2.", [
             "Default state",
             "Have counterfeit",
             "Reset"
          ]],
    1078: ["got_ch3_moss", "Whether you got the Moss in Chapter 3 and the Moss Mystery title.", basicBool],
    1079: ["drank_oasis", "Whether you chose to deplete the oasis by drinking it. Dries up all the trees.", basicBool],
    1080: ["suziezilla_losses", "Times lost at Suziezilla, up to 8."],
    1081: ["suziezilla_result", "Exactly how much you won at Suziezilla.", [
             "Default state",
             "Destroyed by Spamton's big shot without ever hitting him",
             "Declared win by Tenna",
             "Defeated final wave"
          ]],
    // 1082?
    1083: ["got_lancer_name_q", "Whether you've faced the question of Tenna forgetting Lancer's name. Unaccessed (there's an unused follow-up).", basicBool],
    1084: ["ramb_game_opinion", "Your choice to Ramb of whether you're enjoying Tenna's game.", [
             "Default state",
             "Super fun",
             "Eh"
          ]],
    1085: ["unused_puzzle_start", "Seems to be set when you enter an unused Chapter 3 room with a board puzzle?", basicBool],
    1086: ["beat_doom_shadowman", "Whether you've defeated the Shadowman on the Doom Board, to prompt the Zapper encounter instead.", basicBool],
    1087: ["entered_ice_palace", "Seems to be? set upon entering the Ice Palace on Sword Board 2 as a checkpoint.", basicBool],
    1088: ["cheated_dice_val", "Number on the die in the unused room where a Pippins challenges you to roll even.", [
             "Uninitialized",
             "1", "2", "3", "4", "5", "6"
          ]],
    1089: ["cooking_losses", "Times lost at the cooking game."],
    1090: ["parent_lock_1_scene", "Whether you've completed specifically the introductory scene activating the puzzle for Parental Lock 1.", basicBool],
    1091: ["susie_notice_sword", "Status of Susie noticing Kris has a sword in the minigame if the OddController was obtained.", [
             "Default state",
             "Sword used",
             "Susie commented"
          ]],
    1092: ["ch3_bibliox_state", "Progress obtaining the TripTicket to Nowhere from the Bibliox.", [
             "Default state",
             "Wardrobe mentioned",
             "Wardrobe appeared",
             "Wardrobe checked",
             "Got TripTicket",
             "Got post-Mantle hint",
             "Got alternate TripTicket"
          ]],
    1093: ["jailed_cheater", "Whether you confessed to the Zapper that you are cheaters, and went into the highly escapable prison.", basicBool],
    1094: ["parent_lock_1", "Whether you solved the first parental lock in Chapter 3.", basicBool],
    1095: ["parent_lock_2", "Whether you solved the second parental lock in Chapter 3.", basicBool],
    1096: ["rhythm_game_losses", "Total number of losses on the rock band game."],
    1097: ["idcard_puzz_found", "Whether you found something(?) with the water of the unused ID card puzzle.", basicBool],
    1098: ["cheater_pip_left", "Whether the unused dice-cheating Pippins have fled from being photographed.", basicBool],
    1099: ["lancer_control_num", "Number of Lancer Controllers obtained."],
    1100: ["got_cooltrashy_reward", "Whether you got Trashy's DeluxeDinner.", basicBool],
    1101: ["point_chest_state", "Progress with the 10-point chest in the dust pile at the start of Chapter 3.", [
             "Default state",
             "Found chest",
             "Got points"
          ]],
    1102: ["zapper_sneezed", "Whether a Zapper left of the Chapter 3 starting area gave itself away by sneezing.", basicBool],
    1103: ["ice_key_fail", "Whether you reached the Ice Palace with no key, thus forgetting something important.", basicBool],
    1104: ["got_cut_ribbick_item", "Unused? Set for a Ribbick trigger in what I think is an unused room.", basicBool],
    1105: ["cut_ribbick_fights", "Unused? Counts up with a Ribbick trigger in what I think is an unused room."],
    1106: ["did_cut_weather_puz", "Seems to be? a flag for an unused puzzle involving a bridge and the Weather Duo.", basicBool],
    1107: ["lanina_puzz_found", "Whether you found something(?) with the water of the unused Rouxls and Lanina puzzle.", basicBool],
    1108: ["lanina_puzz_grass", "Amount of grass plucked by Susie in the unused Rouxls and Lanina puzzle. Just keeps you from re-plucking."],
    1109: ["save_preegg_x", "X coordinate of the persistent block needed for the Ch3 egg."],
    1110: ["save_preegg_y", "Y coordinate of the persistent block needed for the Ch3 egg."],
    1111: ["save_preegg_block", "Status of the puzzle with the persistent block needed for the Ch3 egg.", [
             "Default state",
             "Block saved",
             "Puzzle solved"
          ]],
    1112: ["solve_nowherepuzz", "Whether you've solved the block puzzle to get to the Chapter 3 Bibliox with the TripTicket.", basicBool],
    1113: ["guard_zapper_buttons", "Progress with the Zapper guarding the cold area.", [
             "Default state",
             "Played chest like bongos",
             "Shood off"
          ]],
    1114: ["guard_zapper_fought", "Attempting to do nothing against the Zapper guarding the cold area.", basicBool],
    1115: ["mailroom_status", "Progress entering Tenna's secret mail room.", [
             "Default state",
             "Discovered",
             "Entered",
             "Found empty"
          ]],
    1116: ["points_from_battle", "Number of points earned in battles on the current board. Used for the board score."],
    1117: ["points_spent", "Number of points spent on the current board. Used to include them in the board score as well as held points."],
    1118: ["last_minigame_points", "Seems to be? the number of points earned in the last PHYSICAL CHALLENGE, tracked into the overall round evaluation."],
    1119: ["cooler_beg_count", "Number of times begged for mercy from Watercooler. Alters repeat flavortext."],
    
    1122: ["board_key_count_2", "Board 1 key count. Used to award bonuses for extra keys. Also incremented if you buy the useless board 2 key.", basicBool],
    1123: ["entered_parent_0", "Whether you've entered the room before the first Parental Lock, acknowledged by the party.", basicBool],
    1124: ["tenna_falling_stuff", "What Tenna last called the falling objects on Board 1. Alters Board 2 dialogue.", [
             "Default state",
             "Rocks",
             "Peaches"
          ]],
    1125: ["started_cowboy_game", "Whether you reached the first cowboy game in Chapter 3.", basicBool],
    1126: ["times_caught_wc_topleft", "Number of times captured in the top-left zone of the unused big sneaking section.", basicBool],
    1127: ["times_caught_wc_topright", "Number of times captured in the top-right zone of the unused big sneaking section.", basicBool],
    1128: ["times_caught_wc_botleft", "Number of times captured in the left zone of the unused big sneaking section.", basicBool],
    1129: ["times_caught_wc_hard1", "Number of times captured in the first 'hard' zone of the unused big sneaking section.", basicBool],
    1130: ["times_caught_wc_hard2", "Number of times captured in the second 'hard' zone of the unused big sneaking section.", basicBool],
    1131: ["overworld_quiz_1", "Whether you completed the 1st overworld quiz while escaping.", basicBool],
    1132: ["overworld_quiz_2", "Whether you completed the 2nd overworld quiz while escaping.", basicBool],
    1133: ["parent_lock_1_start", "Whether you got a wrong answer for the first parental lock, activating the screen with the puzzle.", basicBool],
    1134: ["parent_lock_2_start", "Whether you've activated the second parental lock puzzle by interacting with it.", basicBool],
    1135: ["unlocked_stealth", "Whether Susie has suggested the use of stealth.", basicBool],
    1136: ["unused_paannounce", "Never set, would have changed the logic of an incomplete 'PA' system.", basicBool],
    1137: ["found_trash_switch", "Whether you've activated the trash switch at the end of the first stealth section.", basicBool],
    1138: ["got_nothing", "Whether you got an undefined item from an unused watercooler room in Chapter 3.", basicBool],
    1139: ["got_ch3_mint", "Whether you got the puzzle-locked Revive Mint in Chapter 3.", basicBool],
    1140: ["got_one_point", "Whether you got the chest with a singular point in the room with the Zapper who takes you nowhere.", basicBool],
    1141: ["ch3_bibliox_talk", "Number of times talked to the Chapter 3 in-game Bibliox. Dialogue does not reset."],
    1142: ["cam_remind_solve", "Apparently? used for the unused camerareminder puzzle in Chapter 3.", [
             "Default state",
             "Solved",
             "Solved with Ralsei"
          ]],
    1143: ["cooler_avoid_num", "Number of times you entered the room with the second Watercooler fight. They get closer up to 5 times, then block the way. Set to 50 after actually doing the fight."],
    1144: ["cooler_2_flirt", "Status flirting with the second Watercooler. Affects curtain flavortext.", [
             "Default state",
             "Flirted",
             "Did not flirt",
             "Checked curtain after flirting"
          ]],
    // 1145?
    1146: ["interacted_curtain_cooler", "Whether you interacted with the curtain after fighting the second Watercooler. Unaccessed?", basicBool],
    1147: ["lawnmower_beat_paper", "Whether you used the lawnmower to destroy the Shadowmen's contracts. Earns their gratitude if not previously LOST.", basicBool],
    1148: ["rouxls_snacks_ch3", "Rouxls's progress when he shows up with the weather duo.", [
             "Default state",
             "Showed up for snacks",
             "Took snacks and left"
          ]],
    // 1149?
    1150: ["parent_lock_3", "Progress with the third parental lock puzzle.", {
             "0": "Default state",
             "1": "Activated",
             "1.5": "Used TV",
             "2": "Solved block puzzle",
             "3": "Solved bridge puzzle",
             "4": "Got camera"
          }],
    1151: ["saw_spamtenna_scene", "Whether you saw Tenna coat Spamton in foam in self-defense.", basicBool],
    1152: ["horse_ralsei", "Whether Ralsei forgot to change out of his horse costume.", basicBool],
    1153: ["hay_response", "Set based on how Susie reacts to Ralsei considering eating hay. Depends on whether you've previously eaten moss.", [
             "Default state",
             "It's for sleeping (no moss)",
             "Eat spinach (ate moss with Susie)"
          ]],
    1154: ["bonus_zone_treasure_1", "Whether you got the 1st treasure chest (of points) in Tenna's bonus zone.", basicBool],
    1155: ["bonus_zone_treasure_2", "Whether you got the 2nd treasure chest (of points) in Tenna's bonus zone.", basicBool],
    1156: ["bonus_zone_treasure_3", "Whether you got the 3rd treasure chest (of points) in Tenna's bonus zone.", basicBool],
    1157: ["bonus_zone_points_1", "Whether you got the 1st coin in Tenna's bonus zone.", basicBool],
    1158: ["bonus_zone_points_2", "Whether you got the 2nd coin in Tenna's bonus zone.", basicBool],
    1159: ["bonus_zone_points_3", "Whether you got the 3rd coin in Tenna's bonus zone.", basicBool],
    1160: ["bonus_zone_points_4", "Whether you got the 4th coin in Tenna's bonus zone.", basicBool],
    1161: ["tenna_bonus_zone", "Whether you've entered Tenna's Bonus Zone behind the green panel (prior to Pipis scene).", basicBool],
    1162: ["bonus_big_chest", "Whether you've opened the giant test in Tenna's Bonus Zone (with a Pippins).", basicBool],
    1163: ["check_recruits_ch3", "Whether you checked the employee list in Chapter 3 to tell if you had missed any recruits.", basicBool],
    1164: ["lightmaze_fought", "Whether you fought the Zapper in the lightmaze room so unused, it has no exits.", basicBool],
    1165: ["overworld_quiz_3", "Whether you completed an overworld quiz in the big maze room.", basicBool],
    1166: ["overworld_quiz_4", "Whether you completed an overworld quiz in the big maze room.", basicBool],
    1167: ["overworld_quiz_5", "Whether you completed an overworld quiz in the big maze room.", basicBool],
    1168: ["overworld_quiz_6", "Whether you completed an overworld quiz in the big maze room.", basicBool],
    1169: ["got_lanina_points", "Whether you got a 100-point chest in the unused Rouxls and Lanina puzzle room.", basicBool],
    // 1170?
    1171: ["board_2_battles", "Number of battles engaged in on Board 2."],
    // 1172?
    1173: ["rank_board_1", "Your rank on Board 1.", tennaRanks],
    1174: ["rank_board_2", "Your rank on Board 2.", tennaRanks],
    // 1175?
    1176: ["oddcontroller_state", "Progress obtaining the OddController.", [
             "Default state",
             "Tried game",
             "Got controller"
          ]],

    1177: ["got_tenna_tie", "Whether you got the Tenna Tie from the Ball Machine.", basicBool],
    1178: ["got_execbuffet", "Whether you got the Executive Buffet from the Ball Machine.", basicBool],
    1179: ["got_tensionmax", "Whether you got the TensionMax from the Ball Machine.", basicBool],
    1180: ["got_revivemint", "Whether you got the Revive Mint from the Ball Machine.", basicBool],
    1181: ["got_blue_ribbon", "Whether you got the Blue Ribbon from the Ball Machine.", basicBool],
    1182: ["gacha_lastbet", "Amount previously spent on the gumball machine in Chapter 3, used to compute gold prize odds. Resets upon earning a gold prize."],
    // 1183?
    1184: ["sneaking_fast", "Whether the party has decided to sneak really fast.", basicBool],
    1185: ["s_rank_room_answer", "What you told Susie you were doing in the S-Rank room.", [
             "Default state",
             "Playing games",
             "Nothing"
          ]],
    1186: ["s_rank_return_2", "Whether you've gotten the scene of Ralsei mentioning RPGs after returning from the Sword Island Board.", basicBool],
    1187: ["z_rank_unlock", "Whether you've talked to unlock the Z-Rank door. Changes for each board.", [
             "Default state",
             "Open Board 1",
             "Open Board 2"
          ]],
    1188: ["cooler_status", "Status of the Watercooler encounter in the C-Rank room.", enemyStates],
    1189: ["bought_suziezilla", "Whether you've purchased access to the Suziezilla game.", basicBool],
    1190: ["control_unjumble", "Whether you chose to... keep your controls? It's reversed, Ralsei playing as Kris (board 2) is actually the 0 value.", [
             "You can have a turn",
             "Let's all go back to normal"
          ]],
    1191: ["ch3_manhole_activation", "When you last used the Z-Rank manhole to reach the original game. Used to open the return manhole.", [
             "Default state",
             "Opened after board 1",
             "Opened after board 2"
          ]],
    1192: ["s_rank_return_3", "Whether you've gotten the scene of Susie and Ralsei racing after returning with the Shadow Mantle.", basicBool],
    1193: ["cooking_best_score", "Highest score at the cooking minigame."],
    1194: ["cooking_best_rank", "The corresponding rank to your cooking minigame high score.", tennaRanks],
    1195: ["raise_bat_hiscore", "Highest score on Raise Up Your Bat, Normal Mode"],
    1196: ["raise_bat_hirank", "Highest rank on Raise Up Your Bat, Normal Mode", tennaRanks],
    1197: ["suziezilla_best_score", "Seems to be the high score at Susiezilla."],
    1198: ["suziezilla_best_rank", "The corresponding rank to your Susiezilla high score.", tennaRanks],
    1199: ["susie_tenna_chat_1", "Whether you saw Susie compliment Tenna's show between boards.", basicBool],
    1200: ["ralsei_face_thoughts", "Your commentary on Ralsei's face, if not watching Susie.", [
             "Default state",
             "Seen it before",
             "It's unique",
             "It's cute"
          ]],
    1201: ["tenna_opinion_susie", "Your opinion on Tenna as given to Susie before Board 2.", [
             "Default state",
             "He's fun",
             "He sucks"
          ]],
    1202: ["got_trash_ch3_1", "Whether you opened the 1st trash can in Chapter 3, with 10 points inside.", basicBool],
    1203: ["got_trash_ch3_2", "Whether you opened the 2nd trash can in Chapter 3, with nothing inside.", basicBool],
    1204: ["got_trash_ch3_3", "Whether you opened the 3rd trash can in Chapter 3, with the TVSlop.", basicBool],
    1205: ["got_trash_ch3_4", "Whether you opened the 4th trash can in Chapter 3, with nothing inside.", basicBool],
    1206: ["got_trash_ch3_5", "Whether you opened the 5th trash can in Chapter 3, with 2 points inside.", basicBool],
    1207: ["got_trash_ch3_6", "Whether you opened the 6th trash can in Chapter 3, with 50 points inside.", basicBool],
    1208: ["susie_tenna_chat_2", "Progress with Susie questioning Tenna's show between boards.", [
             "Default state",
             "Started scene",
             "Finished scene"
          ]],
    1209: ["got_trash_ch3_7", "Whether you opened the 7th trash can in Chapter 3, with nothing inside.", basicBool],
    1210: ["elnina_greenroom_comment", "What you told Elnina about her relationship in the Green Room.", [
             "Default state",
             "You're strong and independent",
             "Your forecast is love"
          ]],
    1211: ["lanino_greenroom_comment", "What you told Lanino about his relationship in the Green Room.", [
             "Default state",
             "You're strong and independent",
             "Your forecast is love"
          ]],
    1212: ["susiebridge_state", "Progress on the unused Susie bridging minigame. There isn't any code to set it to 1, very unused.", [
             "Default state",
             "???",
             "Complete"
          ]],
    1213: ["got_300_points", "Whether you got the chest of points in the room with a Susie board puzzle.", basicBool],
    1214: ["who_asked_okay", "Who you asked whether they were okay in the Chapter 3 parental lock room.", [
             "Default state",
             "Susie",
             "Ralsei",
             "Neither"
          ]],
    1215: ["susie_reassurance", "What you said to Susie (if talking to her) in the parental lock room.", [
             "Default state",
             "I'm not a dream (creepy)",
             "Your friendships are real (fake-heroic)",
             "Sucks to be you (unwittingly ironic)"
          ]],
    1216: ["ralsei_reassurance", "What you said to Ralsei (if talking to him) in the parental lock room.", [
             "Default state",
             "It's ok to take it easy",
             "Stay on task"
          ]],
    1217: ["icecream_for_susie", "What you said to Ralsei about getting ice cream from him to Susie.", [
             "Default state",
             "I'm not going with her",
             "I'm saying it's from me",
             "Of course"
          ]],
    1218: ["festival_ral_whoelse", "Who you told Ralsei you're going to the festival with, if not Susie.", [
             "Default state",
             "Noelle",
             "Ralsei",
             "Berdly (BERDLY!?)",
             "Not going"
          ]],
    1219: ["tried_suziezilla", "Whether you completed the intro scene for the Susiezilla game.", basicBool],
    1220: ["beat_suziezilla?", "Whether you reached the elusive BOARD CLEAR of the Suziezilla game.", basicBool],
    1221: ["got_cooler_crater", "Whether you got the 200 points from underneath the C-Rank Watercooler.", basicBool],
    1222: ["got_tenna_statue", "Whether you got the Golden Tenna Statue from the Ball Machine.", basicBool],
    1223: ["got_dog_dollar", "Whether you got the Dog Dollar from the Ball Machine.", basicBool],
    1224: ["opened_bonus_zone", "Whether you opened Tenna's secret bonus zone behind a green screen.", basicBool],
    1225: ["opened_sams_zone", "Whether you opened the secret zone where you can choose whether the talking cages love or hate. Behind a green screen.", basicBool],
    1226: ["got_1225_room", "Whether you entered the secret 1225 room in the Ball Machine game. Yes, the flag is so close.", basicBool],
    1227: ["got_antlion_photo", "Whether you photographed the red antlion in Board 2.", basicBool],
    1228: ["entered_coldplace", "Whether you've entered the Cold Place and such has been acknowledged by the party.", basicBool],
    1229: ["last_sneak_times_found", "Number of times caught by the Zapper who later reveals he doesn't wanna be here either."],
    1230: ["sneak_zapper_state", "Progress with the Zapper who doesn't wanna be here either.", [
             "Default state",
             "Zapper joined",
             "Passed room"
          ]],
    1231: ["parent_lock_3_done", "Whether you solved the undefined parental lock in Chapter 3, optional on Sword Route.", basicBool],
    1232: ["started_cowboy_game_2", "Whether you reached the second cowboy game in Chapter 3.", basicBool],
    1233: ["parent_lock_3_used", "Whether you went through the door after the undefined parental lock in Chapter 3.", basicBool],
    1234: ["suziezilla_best_time", "The duration of your best Suziezilla run, I think?"],
    1235: ["tenna_mad_at_staff", "Whether you've seen the scene where Tenna gets mad the Darkners haven't found the Lightners yet.", basicBool],
    1236: ["ramb_quit", "Whether you've seen the scene where Tenna gets mad Ramb is quitting on him.", basicBool],
    1237: ["got_rouxls_block", "Whether you purchased Rouxls's block for 1 point. Unaccessed?", basicBool],
    1238: ["ramb_push_3", "Whether you've moved Ramb to play the final game. Enjoy the games, eh, luv?", basicBool],
    1239: ["ramb_petrify_lore", "Your progress in learning about why Ramb petrified.", [
             "Default state",
             "Spawned Pippins",
             "'No one will shed a tear for him.'"
          ]],
    1240: ["talk_starwalker_ch3", "Whether you've talked to Starwalker in the first room after escaping Tenna.", basicBool],
    1241: ["ral_suspect_zapper", "Whether you've interacted with the Zapper guarding the parental locks, preventing Ralsei's dialogue from repeating.", basicBool],
    1242: ["best_food_stack", "Number of food items successfully served in a single simultaneous stack in the cooking minigame. Used to track the record on replay."],
    1243: ["zapper_jail_2", "Progress on the second highly ineffective jail you are placed in by a Zapper while sneaking.", [
             "Default state",
             "Imprisoned",
             "Escaped"
          ]],
    1244: ["parent_got_camera", "Whether you got the camera in the Parental Lock 3 puzzle.", basicBool],
    1245: ["num_parent_photos", "Number of photos taken in the Parental Lock 3 puzzle. The in-game console crashes after 8."],
    1246: ["got_100_dig", "Whether you dug up the rare 100-point hole in the room with the many Lancers.", basicBool],
    // 1247?
    1248: ["times_leveled_ch3", "The number of times you have leveled up by violently defeating an encounter. Used for certain increases that only occur every 2, 4, or 10 encounters."],
    1249: ["times_gained_at_ch3", "The number of times your AT and Magic have increased due to leveling up (every ten encounters)."],
    1250: ["jail_dinner_talked", "Whether you've talked to the imprisoned Pippins selling TV Dinners. Alters repeat interaction.", basicBool],
    1251: ["goulden_son_tale", "Progress telling of Goulden Son.", {
             "0": "Default state",
             "1": "Interacted with 2",
             "1.5": "Told of 2",
             "2": "2 knew of 1",
             "3": "1 became 3",
             "4": "Told of 3"
          }],
    1252: ["goulden_son_destination", "Used to determine which is Goulden Son and which is Goulden Son 2. The one you interact with first after the lights are gone will be Goulden Son.", [
             "Default state",
             "Right is Goulden Son 2",
             "Left is Goulden Son 2"
          ]],
    1253: ["got_trash_ch3_8", "Whether you opened the 8th trash can in Chapter 3, with 120 points inside.", basicBool],
    1254: ["stone_lancer_ch3", "Whether you saw Lancer petrified in Chapter 3 (in the room where you get his controllers).", basicBool],
    1255: ["sword_route_kills", "Number of enemies killed using your sword in the Chapter 3 minigames. Appears in Kris's stats."],
    1256: ["times_plucked_grass", "The number of times Susie (Kris as Susie?) plucks grass in the Chapter 3 minigames. Appears in Susie's stats (up to 99)."],
    1257: ["times_carried_ralsei", "The number of times Ralsei was carried in the Chapter 3 minigames. Appears in Ralsei's stats (up to 99)."],
    1258: ["ch3_run_reminder", "Whether Susie reminded you you can run at the start of Chapter 3.", basicBool],
    1259: ["ch3_run_reminder_2", "Whether Ralsei reminded you you can run in Chapter 3.", basicBool],
    1260: ["talked_ral_eye_puzzle", "Whether you've talked to Ralsei at the Chapter 3 starting eye puzzle. Alters repeat dialogue.", basicBool],
    1261: ["talked_sus_eye_puzzle", "Whether you've talked to Susie at the Chapter 3 starting eye puzzle. Alters repeat dialogue.", basicBool],
    1262: ["parent_lock_1_close", "Number of times you got the first parental lock numbers, but in the wrong order. Ralsei has special dialogue for the first couple tries."],
    1263: ["almost_beat_knight", "Whether you've gotten the one-off pep talk from Gaster for reaching the damage threshold then dying.", basicBool],
    1264: ["knight_deaths", "Number of times you died to the Knight -- it doesn't reset your save when you retry."],
    1265: ["phaser_cannons", "Whether you performed the Phaser Cannons Easter Egg in the cooking minigame.", basicBool],
    1266: ["moved_ramb_2", "Whether you've talked to Ramb after round 2 for him to move away from the door.", basicBool],
    1267: ["lawnmower_score", "Score in Tenna's lawnmower minigame, minimum 1. Reused for a TVDinner chest."],
    1268: ["mini_attack_susie", "Whether the mini-Kris tried to attack Susie, causing her to offer to let Kris knaw her hair. Unaccessed?", basicBool],
    1269: ["shadow_home", "Whether you saw the smashed TV using the Shadow Crystal.", basicBool],
    1270: ["shadow_failed_ch3", "Whether you used the Shadow Crystal in Chapter 3 and saw nothing. 1269 is more interesting.", basicBool],
    1271: ["glass_undyne_froze", "Whether you used the Glass in Chapter 3 and saw Undyne frozen in ice. Unused; you cannot visit the Light World in Chapter 3.", basicBool],
    1272: ["glass_failed_ch3", "Whether you used the Glass in Chapter 3 and saw nothing. 1271 is more interesting.", basicBool],
    1273: ["gameshow_name_ja", "Whether the start of Chapter 3 (naming Kris on the show) was played in Japanese.", basicBool],
    1274: ["gameshow_name_1_backup", "Secondary tracker for the first letter of Kris's name (used for safety with translation).", ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]],
    1275: ["gameshow_name_2_backup", "Secondary tracker for the second letter of Kris's name (used for safety with translation).", ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]],
    1276: ["gameshow_name_3_backup", "Secondary tracker for the third letter of Kris's name (used for safety with translation).", ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]],
    1277: ["pippins_bonus_stole", "Appears? to be the number of chests looted by Pippinses in Tenna's bonus zone."],
    1278: ["swordroute_soda", "Status of the soda left by Susie after obtaining the Shadow Mantle.", [
             "Default state",
             "Soda placed",
             "Soda collected"
          ]],
    1279: ["raise_bat_hard_hiscore", "High score on Raise Up Your Bat, Hard Mode. (Unused in Chapter 3)"],
    1280: ["raise_bat_hard_hirank", "Highest rank on Raise Up Your Bat, Hard Mode. (Unused in Chapter 3)", tennaRanks],

    1500: ["moneyfountain_donation_over_100", "Donated at least 100 Dark Dollars to the money fountain.", basicBool],
    1501: ["candy_bowl_progress", "Tracks your progress in the candy bowl cutscene.", {
        "0": "Default state",
        "1": "Approached candy bowl",
        "2": "Spilled candy bowl"
    }],
    1502: ["rippleworship_progress", "Tracks your progress in the ripple worship room.", {
        "0": "Default state",
        "1": "Opened the north path",
        "2": "Revealed the piano notes"
    }],
    1503: ["gerson_tea_finished", "Finished the tea party with Gerson.", basicBool],
    1504: ["interacted_church_cupboard", "Interacted with the cupboard while looking for the code to the church's locked door.", basicBool],
    1505: ["interacted_church_books", "Interacted with the books while looking for the code to the church's locked door.", basicBool],
    1506: ["interacted_church_candles", "Interacted with the candles before going inside.", basicBool],
    1507: ["who_kris_prayed_for", "Who you decided to pray for in front of the hope candles.", {
        "0": "Default state",
        "1": "Pray for Susie",
        "2": "Pray for Noelle",
        "3": "Pray for Asriel"
    }],
    1508: ["interacted_church_bookshelf", "Interacted with the bookshelf while looking for the code to the church's locked door.", basicBool],
    1509: ["what_candles_are_for", "What you told Susie when she asked if the candles were for birthdays.", {
        "0": "Default state",
        "1": "That's right",
        "2": "Prayer"
    }],
    1510: ["opened_church_closet", "Viewed the cutscene of opening the church closet and getting jumpscared by Jackenstein.", basicBool],
    1511: ["listened_susie_piano_story", "Viewed the cutscene of Susie telling her story about smashing a piano.", {
        "0": "Default state",
        "1": "Listen (it might be long)",
        "2": "Not now"
    }],
    1512: ["will_kris_play_again", "What you told Susie after her piano story. Unaccessed as of chapter 4.", {
        "0": "Default state",
        "1": "I'll play again someday",
        "2": "If you play too",
        "3": "I'll never play again"
    }],
    1513: ["talked_jackenstein_study", "Talked to Jackenstein in Gerson's study.", basicBool],
    1514: ["would_you_like_sugar", "What you said to Ralsei asking if you would like sugar during his tea party.", {
        "0": "Default state",
        "1": "No",
        "2": "Yes",
        "3": "Two lumps please"
    }],
    1515: ["who_eats_the_cake", "What you said to Ralsei after he said he never had cake before during his tea party. Unaccessed as of chapter 4.", {
        "0": "Default state",
        "1": "Ralsei eat the cake",
        "2": "That's my cake"
    }],
    1516: ["ralsei_has_a_surprise", "Whether Ralsei told you he had a surprise if we went into our rooms in Castle Town.", basicBool],
    1517: ["got_worship_chest", "Got the Mystic Band / Power Band from the chest in the worship room.", basicBool],
    1519: ["gerson_tea_fancy_a_drink", "What you said when Gerson asked if you would fancy a drink.", {
        "0": "Default state",
        "1": "Yes",
        "2": "No",
        "3": "We already had tea"
    }],
    1521: ["gerson_tea_drink_it", "What you did after getting sugar in your tea with Gerson.", {
        "0": "Default state",
        "1": "Drink it",
        "2": "Don't drink it"
    }],
    1523: ["gerson_tea_are_you_sure", "What you said when Gerson asked you if you were sure you didn't want to have tea now.", {
        "0": "Default state",
        "1": "Not now",
        "2": "Actually I will have tea"
    }],
    1524: ["climbing_challenge_first_time", "How fast you did the first climbing challenge."],
    1525: ["climbing_challenge_second_time", "How fast you did the second climbing challenge."],
    1526: ["awakened_mizzle_progress", "Tracks the progress of awakening the Mizzle protected by the cups.", {
        "0": "Default state",
        "1": "First cup started charging",
        "2": "Mizzle left",
        "3": "Started exiting (triggers shortened return path)"
    }],
    1527: ["finished_noelle_house_weird", "Viewed the cutscene after coming out of the Noelle's house during the Weird Route. Unaccessed as of chapter 4.", basicBool],
    1528: ["hometown_weird_cutscene_progress", "Tracks the progress of the cutscene in the Weird Route when you walk with Susie in the rain.", {
        "0": "Default state",
        "1": "Got dialogue near Sans' store",
        "2": "Got dialogue near church"
    }],
    1529: ["broke_knight_prophecy", "Broke the Knight prophecy in the north prophecies room.", basicBool],
    1530: ["activated_trueclimbadventure_shortcut_left", "Rung the left bell to activate the left shortcut in the climbing room leading to the grand piano.", basicBool],
    1531: ["talked_nubert_ch4", "Talked to Nubert in Castle Town in chapter 4.", basicBool],
    1532: ["talked_rudinn_ch4", "Talked to Rudinn in Castle Town in chapter 4.", basicBool],
    1533: ["slept_through_service", "Whether you chose to sleep through service at church. Unaccessed as of chapter 4.", {
        "0": "Default state",
        "1": "Sleep through service",
        "2": "Watch service"
    }],
    1534: ["what_you_did_during_service", "What you chose to do during service at church. Unaccessed as of chapter 4.", {
        "0": "Default state",
        "1": "Let's play attention",
        "2": "Look in pocket for fun"
    }],
    1535: ["interacted_church_choir_door", "Interacted with the church's choir room's door before going inside.", basicBool],
    1536: ["interacted_church_office_door", "Interacted with the church's office's door before going inside.", basicBool],
    1537: ["got_moneyfountain_chest", "Got the Darker Candy / Scarlixir / Revive Mint / Bitter Tear / Gold Widow from the chest in the money fountain room.", basicBool],
    1538: ["moved_movable_piano", "Moved a movable piano.", basicBool],
    1539: ["got_libraryconnector_chest", "Got the Rhapsotea from the chest in the Second Sanctuary's library connector room.", basicBool],
    1540: ["got_library_chest", "Got the Revive Mint from the chest in the Second Sanctuary's library.", basicBool],
    1541: ["breakable_bookshelves_state_alt", "Tracks the state of the breakable bookshelves in the unused alternate Second Sanctuary's library."],
    1543: ["removed_piano_and_bookshelves", "Flag never set, but would have removed the moving piano and bookshelves in the Second Sanctuary's library.", basicBool],
    1544: ["alerted_mizzles", "Prevented future Mizzles to start a battle tired, by ringing the bell or waking up an initially tired Mizzle.", basicBool],
    1545: ["got_gallery_chest", "Got 500 Dark Dollars from the chest in the Second Sanctuary's gallery.", basicBool],
    1547: ["solved_golden_piano", "Played the golden piano and opened the fireplace secret passage in Gerson's study.", basicBool],
    1548: ["interacted_fireplace_mural", "Interacted with the mural in Gerson's study and read about the cool axe.", basicBool],
    1549: ["talked_gerson_about_magic_axe", "Talked to Gerson in his study about the Magic Axe.", basicBool],
    1550: ["got_ripseq1_chest", "Got the Scarlixir from the chest in the Gerson chase room.", basicBool],
    1551: ["should_check_on_ralsei", "What you said to Susie when asked if you should check on Ralsei, after rain starts if you haven't returned to Castle Town in chapter 4 yet.", {
        "0": "Default state",
        "1": "Yeah",
        "2": "Nah"
    }],
    1552: ["talked_napstablook_about_undyne", "Talked to Napstablook about Undyne.", basicBool],
    1553: ["talked_napstablook_about_shelter", "Talked to Napstablook about the Shelter.", basicBool],
    1554: ["talked_catti_about_susie", "Talked to Catti about Susie.", basicBool],
    1555: ["kris_susie_locked_out", "Tried to enter Kris's house after rain started and realized it's locked.", basicBool],
    1556: ["interacted_gerson_remains", "Interacted with the glass container containing Gerson's remains after the cutscene where it's discovered.", basicBool],
    1557: ["why_we_should_enter_church", "What you said to Susie after she suggested waiting outside the church's Dark World. Unaccessed as of chapter 4.", {
        "0": "Default state",
        "1": "But we aren't logical",
        "2": "But Mom could be in there"
    }],
    1558: ["noelle_bedroom_asgore_current_line", "Tracks the current line in the Asgore cutscene in Carol's bedroom.", {
        "0": "Default state",
        "1": "We're almost there, aren't we, old friend?",
        "2": "This time for sure... Tori will finally see.",
        "3": "... see what really happened.",
        "4": "... that I just wanted to... protect everyone...",
        "5": "And this time, she'll have to believe me.",
        "6": "... they all will.",
        "7": "Then...",
        "8": "We'll all be a happy family again... won't we?",
        "9": "...",
        "10": "It sure is beautiful, isn't it...?",
        "11": "... this black shard."
    }],
    1559: ["kept_noelle_waiting", "Whether you did something after opening the gate at Noelle's house while she was waiting for you.", {
        "0": "Default state",
        "1": "Had tea party with Ralsei",
        "2": "Had diner with Susie"
    }],
    1560: ["gallery_cutscene_progress", "Tracks the progress of the unused Second Sanctuary's gallery cutscene. Mostly reused for the rotating tower monologue."],
    1561: ["played_megalovania", "Tried playing Megalovania on the piano and got ran over by the Annoying Dog.", basicBool],
    1562: ["dug_through_dess_stuff", "Dug through Dess' stuff in her room.", basicBool],
    1563: ["talked_noelle_after_throwing_phone", "Talked to Noelle after Susie threw her phone.", basicBool],
    1564: ["talked_susie_after_throwing_phone", "Talked to Susie after she threw Noelle's phone.", basicBool],
    1565: ["talked_asgore_about_outfit", "Asked Asgore about his outfit after coming out of Noelle's house.", basicBool],
    1566: ["talked_asgore_are_you_okay", "Asked Asgore if he's okay after coming out of Noelle's house.", basicBool],
    1567: ["pressed_knightclimbpost_switch", "Pressed the switch making a bridge at the end of the Second Sanctuary.", basicBool],
    1569: ["susie_got_betterheal", "Whether Susie's OKHeal spell improved to BetterHeal, by winning against Gerson or starting the fight against the Sound of Justice.", basicBool],
    1570: ["interacted_item_fountain", "Interacted with the item fountain in Gerson's study.", basicBool],
    1571: ["activated_trueclimbadventure_shortcut_right", "Rung the right bell to activate the right shortcut in the climbing room leading to the grand piano.", basicBool],
    1572: ["susie_bellroom_progress", "Tracks the progress of Susie in the bell room cutscene.", {
        "0": "Default state",
        "1": "Moved to first point",
        "2": "Moved to second point"
    }],
    1573: ["windows_looped", "Number of loops done in the Sanctuary's window room. At 8, the Egg door appears."],
    1574: ["interacted_tv_broken", "Interacted with the TV at Kris's house, if it wasn't repaired.", basicBool],
    1575: ["talked_mettaton_tv_broken", "Suggested Tenna to Mettaton, if it wasn't repaired.", basicBool],
    1576: ["interacted_tv_fixed", "Interacted with the TV at Kris's house, if it was repaired.", basicBool],
    1577: ["talked_swatch_cat_cafe", "Talked to Swatch in the Cafe, if you've recruited Tasque Manager, Tasque and Shadowguy.", basicBool],
    1578: ["talked_jigsaw_joe_love_dojo", "Talked to Jigsaw Joe now that the dojo has become the Love Dojo.", basicBool],
    1579: ["made_noise_in_noelle_house", "Number of times you touched a dancing Santa or a bell and made noise in Noelle's house."],
    1580: ["times_leveled_ch4", "The number of times you have leveled up by violently defeating an encounter. Used for certain increases that only occur every 2, 4, or 10 encounters."],
    1581: ["got_prophecymaze_chest", "Got the Scarlixir from the chest in the Second Sanctuary's statue maze room.", basicBool],
    1582: ["got_bookshelfpuzzle_chest", "Got the Absorb Ax from the chest in the bookshelf puzzle room.", basicBool],
    1583: ["times_killed_by_spawncloud", "Number of times you died from the spawns chasing you vertically (used to reduce their speed).", {
        "0": "Default state",
        "1": "Died once",
        "2": "Died twice",
        "3": "Died thrice or more"
    }],
    1584: ["breakable_bookshelves_state", "Tracks the state of the breakable bookshelves in the Second Sanctuary's library."],
    1585: ["moving_piano_xy", "Combination of X and Y coordinates of the moving piano."],
    1586: ["got_rightconnect_chest", "Got the Winglade from the chest in the room on the right of Gerson's study.", basicBool],
    1587: ["got_minorlegend_chest", "Got the Rhapsotea from the chest in the Jockington prophecy room.", basicBool],
    1588: ["got_pianopiece_right_chest", "Got the Revive Mint from the chest in the right piano piece room.", basicBool],
    1589: ["got_trueclimbadventure_chest", "Got the Tension Gem from the chest in the climbing room.", basicBool],
    1590: ["got_jackenstein_chest", "Got 500 Dark Dollars from the chest in the Jackenstein room.", basicBool],
    1591: ["ralsei_bloody_face", "Whether Ralsei got blood on his face from Susie at the end of chapter 4.", basicBool],
    1592: ["got_ch4_moss", "Whether you got the moss in chapter 4.", {
        "0": "Default state",
        "1": "Consumed with gusto",
        "2": "Left for the next person"
    }],
    1593: ["interacted_gerson_table_second_sanctuary", "Interacted with the table in Gerson's study in the Second Sanctuary.", {
        "0": "Default state",
        "1": "Tried to take items",
        "2": "Didn't try to take items"
    }],
    1594: ["rhapsotea_extra_dollars", "Number of dollars paid extra for the Rhapsoteas in Gerson's study in the Second Sanctuary."],
    1595: ["wafer_room_state", "Tracks your progression in obtaining the Third Sanctuary Waferguard chest. See also flag 1616.", {
        "0": "Default state",
        "1": "Revealed chest",
        "2": "Wafer obtained, area locked (nothing more to do, so the game has blocked off the area)"
    }],
    1596: ["seen_angel_prophecy", "Viewed the cutscene of the gang looking at the angel prophecy.", basicBool],
    1597: ["purified_count", "Number of Titan spawns purified. The Purify ACT will always add two to this flag, even if you've already slain one."],
    1598: ["slain_count", "Number of Titan spawns slain."],
    1599: ["interacted_cupstack_lift", "Interacted with the cup stack lift.", basicBool],
    1600: ["interacted_gersonstudy_savepoint", "Interacted with the save point in Gerson's study.", {
        "0": "Default state",
        "1": "First interaction",
        "2": "Second interaction if mural wasn't checked yet"
    }],
    1601: ["interacted_nwconnect_savepoint", "Interacted with the save point in the north-west connector room.", basicBool],
    1602: ["interacted_pianopuzzle_savepoint", "Interacted with the save point in the piano puzzle room before Jackenstein.", basicBool],
    1603: ["interacted_superprophecies_savepoint", "Interacted with the save point in the room where the Third Sanctuary music starts playing.", basicBool],
    1604: ["gerson_left_room_without_others", "Talked to Gerson after his walk is completed without Susie running ahead.", basicBool],
    1605: ["talked_gerson_postsheet_knight", "Talked to Gerson in his study about the Knight after using the sheet music.", basicBool],
    1606: ["third_sanctuary_missed_something", "Your interaction when asked if you missed something on the other side of your mind.", {
        "0": "Default state",
        "1": "Didn't miss anything (while not having the Egg)",
        "2": "Already have the Egg"
    }],
    1607: ["talked_gerson_postjack_letter", "Talked to Gerson in his study and asked him what he's doing after healing Jackenstein and before getting the sheet music.", basicBool],
    1608: ["talked_gerson_postsheet_letter", "Talked to Gerson in his study and asked him what he's doing after getting the sheet music.", basicBool],
    1609: ["sanctuary_intro_tempsave", "Entered the room with the prophecies at the start of the First Sanctuary (makes a temporary save).", basicBool],
    1610: ["got_prophecies_chest", "Got the Princess Ribbon from the chest next to the Tail of Hell prophecy.", basicBool],
    1611: ["returned_second_jockington_prophecy", "Returned from the second Jockington prophecy room in the Third Sanctuary. Unaccessed as of chapter 4.", basicBool],
    1612: ["interacted_gerson_table_first_sanctuary", "Interacted with the table in Gerson's study in the First Sanctuary.", basicBool],
    1613: ["interacted_gerson_table_third_sanctuary", "Interacted with the table in Gerson's study in the Third Sanctuary.", basicBool],
    1614: ["got_encounter2_chest", "Got 100 Dark Dollars from the chest in the Third Sanctuary's dark maze room. Inaccessible as there isn't actually a chest in this room.", basicBool],
    1615: ["started_third_sanctuary_music", "Entered the room where the Third Sanctuary music plays.", basicBool],
    1616: ["got_treasure_chest", "Got the Wafer Guard from the chest in the Third Sanctuary's treasure chest room.", basicBool],
    1617: ["interacted_useless_gloves", "Interacted with the hidden chest with the gloves that make you worth at climbing.", basicBool],
    1618: ["times_gained_at_ch4", "The number of times your AT and Magic have increased due to leveling up (every ten encounters)."],
    1619: ["church_clues_gathered", "Number of clues gathered at church.", {
        "0": "Default state",
        "1": "1 clue",
        "2": "2 clues, ready to tell Susie"
    }],
    1620: ["got_noelle_clue", "Talked to Noelle about the locked door at church.", basicBool],
    1621: ["got_alphys_clue", "Talked to Alphys about the shelter at church.", basicBool],
    1622: ["washed_hands_therapy", "Used the sink to wash your hands after getting the Egg in chapter 4. Unaccessed as of chapter 4.", basicBool],
    1623: ["glass_noelle_whispering", "Used the Glass in Noelle's house in chapter 4.", basicBool],
    1624: ["shadow_sanctuary", "Used the Shadow Crystal in the Sanctuary.", basicBool],
    1625: ["shadow_final_prophecy", "Used the Shadow Crystal in front of the final prophecy in the Third Sanctuary.", basicBool],
    1626: ["shadow_failed_ch4", "Whether you used the Shadow Crystal in Chapter 4 and saw nothing. 1624 and 1625 are more interesting.", basicBool],
    1627: ["presents_checked", "Number of presents checked in Noelle's present room."],
    1628: ["ch4_chair_skip", "Whether you used the chair to skip to the First Sanctuary in chapter 4.", basicBool],
    1629: ["started_gerson_battle", "Started the battle against Gerson.", basicBool],
    1630: ["talked_malius_about_new_fusions", "Talked to Malius at the Bakery about NEW FUSIONS.", basicBool],
    1631: ["talked_malius_leave", "Selected Malius's Leave dialogue option in chapter 4.", basicBool],
    1632: ["talked_malius_ch4", "Talked to Malius at the Bakery in chapter 4.", basicBool],
    1633: ["talked_topchef_ch4", "Talked to Top Chef at the Bakery in chapter 4, if not currently eligible for a SpinCake.", basicBool],
    1634: ["spooky_hand_pushed_back", "Tried to go back after the final prophecy cutscene, and was pushed back by a mysterious hand out of view.", basicBool],
    1635: ["knocked_east_door_end_ch4", "Knocked on the door at the east of Hometown at the end of chapter 4.", basicBool],
    1636: ["ch4_run_reminder", "Whether Susie reminded you you can run at the start of Chapter 4.", basicBool],
    1637: ["pumpkin_progress", "Tracks the progress of Ralsei's interaction with the pumpkin NPC after the Jackenstein battle.", {
        "0": "Default state",
        "1": "Told a joke",
        "2": "Told a story"
    }],
    1638: ["got_dogclimb_chest", "Got the Dog Dollar from the chest in the Annoying Dog climbing race room.", basicBool],
    1639: ["used_act_guei", "Used S-Action or R-Action during the first Guei encounter, or was reminded if you didn't.", basicBool],
    1640: ["titan_fight_attempts", "Number of times you fought the Titan."],
    1641: ["sound_of_justice_fight_attempts", "Number of times you fought the Sound of Justice."],
    1642: ["finished_annoying_dog_race", "Finished the climbing race against the Annoying Dog.", basicBool],
    1643: ["times_entered_noelle_kitchen", "Number of times you entered Noelle's kitchen while being in the vent. Maximum 3."],
    1644: ["took_shadow_crystal_in_cliff", "Whether there is a Shadow Crystal to grab in the left cliff. Also requires other save data.", basicBool],
    1645: ["unlocked_mike_zone_door", "Unlocked the Mike zone door using the 6453 combination.", basicBool],
    1646: ["got_shadow_crystal_ch1", "Obtained the Shadow Crystal from Jevil in chapter 1.", basicBool],
    1647: ["got_shadow_crystal_ch2", "Obtained the Shadow Crystal from Spamton NEO in chapter 2.", basicBool],
    1648: ["got_shadow_crystal_ch3", "Obtained the Shadow Crystal from the Knight in chapter 3.", basicBool],
    1649: ["got_shadow_crystal_ch4", "Obtained the Shadow Crystal from Gerson in chapter 4.", basicBool],
    1650: ["talked_cupstack_finalclimb", "Talked to the cup stack in the fragile tower room.", basicBool],
    1651: ["temmie_song_current_line", "Tracks the current line of Temmie singing Don't forget in Alphys' classroom.", {
        "0": "When the light is running low",
        "1": "And the shadows start to grow",
        "2": "And the places that you know",
        "3": "Seem like fantasy"
    }],
    1652: ["talked_gerson_postbattle", "Talked to Gerson in his study after defeating him and before saying goodbye to him.", basicBool],
    1654: ["interacted_chairiel_susie", "Interacted with Chairiel in front of Susie.", basicBool],
    1655: ["first_added_juice", "Added juice to your glass at least once at church.", basicBool],
    1656: ["weird_route_fail_ch4", "Aborted the Weird Route during chapter 4. Unaccessed as of chapter 4.", basicBool],
    1657: ["talked_rudy_church_weird", "Talked to Rudy at church during the Weird Route.", basicBool],
    1658: ["mike_portal_unlocked", "Unlocked the way back to Castle Town by finishing chapter 4 and returning to the Third Sanctuary.", basicBool],
    1659: ["mike_portal_cutscene", "Viewed the cutscene of the pillar of light in the Third Sanctuary.", basicBool],
    1660: ["mike_portal_return_choice", "Chose or not to return to Castle Town after getting to the pillar of light for the first time.", basicBool],
    1661: ["mike_portal_how_many_trips", "How many times Kris went into the pillar of light to come back to Castle Town."],
    1663: ["interacted_microphone_crystal", "Interacted with the microphone crystal in the Mike zone.", basicBool],
    1664: ["interacted_krisroom_savepoint", "Interacted with the save point in Kris's room.", basicBool],
    1665: ["interacted_rudy_flowers_ch4", "Interacted with the flowers in Rudy's hospital room in chapter 4.", basicBool],
    1688: ["got_justiceaxe", "Got the Justice Axe after winning against Gerson.", {
        "0": "Default state",
        "1": "Got the axe",
        "2": "Won the fight with inventory full"
    }],
    1689: ["entered_mike_zone_accompanied", "Went past the Mike locked door with Susie and Ralsei.", basicBool],
    1690: ["pet_first_mike_statue", "Pet the first cat-eared statue in the Mike zone.", basicBool],
    1691: ["didnt_pet_first_mike_statue", "If you chose not to pet the first statue in the Mike zone when prompted (looks like it should have been on flag 1690). Unaccessed as of chapter 4.", {
        "0": "Default state",
        "2": "Chose Don't pet"
    }],
    1692: ["saved_terrified_maus", "Viewed the cutscene of the MAUS turning into the MOUSE.", basicBool],
    1693: ["pet_chest_mike_statue", "Pet the tall statue in the Mike hat room which had a chest behind it.", basicBool],
    1694: ["mike_statues_state", "Tracks which statues have been pet."],
    1695: ["started_mike_battle", "Started the battle against Mike.", basicBool],
    1696: ["talked_mikes_postbattle", "Viewed the cutscene of the fake Mikes after defeating them.", basicBool],
    1697: ["opened_mike_door", "Opened the volume-controlled door before the Mike battle.", basicBool],
    1698: ["battat_high_score", "High score on the BATTAT minigame."],
    1699: ["jongler_high_score", "High score on the JONGLER minigame."],
    1700: ["pluey_high_score", "High score on the PLUEY minigame."],
    1701: ["mic_sensitivity", "Flag never set, but would have been a microphone sensitivity setting."],
    1702: ["unlocked_mike_minigames", "Unlocked the Mike minigames room after the Mike battle.", basicBool],
    1703: ["got_tv_zone_3_chest", "Got the TV Dinner from the chest in the Mike hat room.", basicBool],
    1704: ["kris_noelle_escape_weird_abort", "Failed to enter Kris's body in time during the Weird Route cutscene and let them escape with Noelle.", {
        "0": "Default state",
        "1": "Let Kris and Noelle escape",
        "2": "Got put back in closet"
    }],
    1780: ["encount_balthizard", "Tracks the state of the Balthizard encounter at the start of the First Sanctuary.", enemyStates],
    1781: ["encount_balthizard_oldman", "Tracks the state of the Balthizard encounter at the start of the First Sanctuary when coming back with Gerson.", enemyStates],
    1782: ["encount_second_guei", "Tracks the state of the Guei encounter when Gerson turns the lights back on in the dark maze room.", enemyStates],
    1783: ["encount_first_mizzle", "Tracks the state of the Mizzle encounter in the room to the right of Gerson's study.", enemyStates],
    1784: ["encount_winglade", "Tracks the state of the Winglade encounter at the start of the Second Sanctuary.", enemyStates],
    1785: ["encount_second_organikk", "Tracks the state of the Organikk encounter in the Second Sanctuary's library connector room.", enemyStates],
    1786: ["encount_first_organikk", "Tracks the state of the Organikk encounter in the Second Sanctuary's worship room.", enemyStates],
    1787: ["encount_steel", "Tracks the state of the Winglade/Organikk encounter in the Second Sanctuary's money fountain room.", enemyStates],
    1788: ["encount_first_wicabel", "Tracks the state of the Wicabel encounter in the Second Sanctuary's bell room.", enemyStates],
    1789: ["encount_first_cacophony", "Tracks the state of the Wicabel/Organikk encounter in the Second Sanctuary's gallery.", enemyStates],
    1790: ["encount_second_cacophony", "Tracks the state of the Wicabel/Organikk encounter in the Second Sanctuary's room to the right of Gerson's study.", enemyStates],
    1791: ["encount_flapping", "Tracks the state of the Bibliox/Winglade encounter in the Third Sanctuary's bookshelf maze room.", enemyStates],
    1792: ["encount_third_cacophony", "Tracks the state of the Organikk/Organikk/Wicabel encounter in the Third Sanctuary's dark maze room.", enemyStates],
    1793: ["encount_elements", "Tracks the state of the Balthizard/Mizzle/Guei encounter in the Third Sanctuary's angel prophecy room.", enemyStates],
    1794: ["encount_second_wicabel", "Tracks the state of the Wicabel encounter in the Third Sanctuary's golden piano room.", enemyStates],
    1795: ["encount_first_guei", "Tracks the state of the Guei encounter at the start of the First Sanctuary.", enemyStates],
    1796: ["encount_bibliox", "Tracks the state of the Bibliox encounter in the library.", enemyStates],
    1797: ["encount_scented_candles", "Tracks the state of the Guei/Balthizard encounter if you touch a roaming flame in the library.", enemyStates],
    1798: ["encount_second_mizzle", "Tracks the state of the Mizzle encounter in the watercooler room.", enemyStates],
    
};

for (let i = 0; i < flagCount; i++) {
    if (!flags[i])
        flags[i] = ["unused"];
}
