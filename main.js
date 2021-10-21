var debugVars = {}; // Could be handy

var consumables = [
    "Empty",
    "Dark Candy",
    "Revive Mint",
    "Glowshard",
    "Manual",
    "Broken Cake (unused)",
    "Top Cake",
    "Spin Cake",
    "Darkburger",
    "Lancer Cookie",
    "Giga Salad",
    "Clubs Sandwich",
    "Hearts Donut",
    "Choco Diamond",
    "Fav Sandwich",
    "RouxlsRoux",
    "CD Bagel",
    "Mannequin (unused)",
    "Kris Tea",
    "Noelle Tea",
    "Ralsei Tea",
    "Susie Tea",
    "DD-Burger",
    "Light Candy",
    "Butler Juice",
    "Spaghetti Code",
    "Java Cookie",
    "Tension Bit",
    "Tension Gem",
    "Tension Max",
    "Revive Dust",
    "Revive Brite",
    "S. POISON",
    "Dog Dollar",
    "<invalid>"
];

var weapons = [
    // Stats in same order as save file: AT, DF, Mag, attack bolts (presumably the thing that you use to time attacks), some unused values (grazeamt, grazesize, boltspeed, itemspecial), element (6 is Cat), element bonus amount.
    // name              AT  DF MAG BLT GZ GZ BS IS EL ELM
    ["Empty",            0,  0, 0,  0,  0, 0, 0, 0, 0, 0],
    ["Wood Blade",       0,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Mane Ax",          0,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Red Scarf",        0,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Everybody Weapon", 12, 6, 8,  1,  0, 0, 0, 0, 0, 0],
    ["Spookysword",      2,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Brave Ax",         2,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Devilsknife",      5,  0, 4,  1,  0, 0, 0, 0, 0, 0],
    ["Trefoil",          4,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Ragger",           2,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Dainty Scarf",     0,  0, 2,  1,  0, 0, 0, 0, 0, 0],
    ["Twisted Sword",    16, 0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Snow Ring",        0,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Thorn Ring",       14, 0, 12, 1,  0, 0, 0, 0, 0, 0],
    ["Bounce Blade",     2,  1, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Cheer Scarf",      1,  0, 2,  1,  0, 0, 0, 0, 0, 0],
    ["Mecha Saber",      4,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Auto Axe",         4,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Fiber Scarf",      2,  0, 2,  1,  0, 0, 0, 0, 0, 0],
    ["Ragger 2",         5,  0, -1, 1,  0, 0, 0, 0, 0, 0],
    ["Broken Sword",     0,  0, 0,  1,  0, 0, 0, 0, 0, 0],
    ["Puppet Scarf",     10, 0, -6, 1,  0, 0, 0, 0, 0, 0],
    ["Freeze Ring"       4,  0, 4,  1,  0, 0, 0, 0, 0, 0]
];

var armors = [
    // Stats in same order as save file: AT, DF, Mag, attack bolts (presumably the thing that you use to time attacks), some unused values (grazeamt, grazesize, boltspeed, itemspecial), element (6 is Cat), element bonus amount.
    // name           AT DF MAG BLT GZ GZ BS IS EL ELM
    ["Empty",         0, 0, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Amber Card",    0, 1, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Dice Brace",    0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Pink Ribbon",   0, 1, 0,  0,  0, 20,0, 0, 0, 0   ],
    ["White Ribbon",  0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Iron Shackle",  1, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Mouse Token",   0, 0, 2,  0,  0, 0, 0, 0, 7, 0.5 ],
    ["Jevilstail",    2, 2, 2,  0,  0, 0, 0, 0, 0, 0   ],
    ["Silver Card",   0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Twin Ribbon",   0, 3, 0,  0,  0, 20,0, 0, 0, 0   ],
    ["Glow Wrist",    0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Chain Mail",    0, 3, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["B.Shot Bowtie", 0, 2, 1,  0,  0, 0, 0, 0, 0, 0   ],
    ["Spike Band",    2, 1, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Silver Watch",  0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Tension Bow",   0, 2, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Mannequin",     0, 0, 0,  0,  0, 0, 0, 0, 6, 0.35],
    ["DarkGold Band", 0, 0, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Sky Mantle",    0, 1, 0,  0,  0, 0, 0, 0, 1, 0.5 ],
    ["Spike Shackle", 3, 1, 0,  0,  0, 0, 0, 0, 0, 0   ],
    ["Frayed Bowtie", 1, 1, 1,  0,  0, 0, 0, 0, 6, 0.15],
    ["Dealmaker",     0, 5, 5,  0,  0, 0, 0, 0, 6, 0.4 ],
    ["Royal Pin"      0, 3, 1,  0,  0, 0, 0, 0, 0, 0   ]
];

var lightItems = [
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
    "Wristwatch"
];

var keyItems = [
    "Empty",
    "Cell Phone",
    "Egg",
    "Broken Cake",
    "Broken Key A",
    "Door Key",
    "Broken Key B",
    "Broken Key C",
    "Lancer",
    "Rouxls Kaard",
    "Empty Disk",
    "Loaded Disk",
    "KeyGen",
    "Shadow Crystal",
    "Starwalker",
    "Pure Crystal"
];

var cellOpts = {
    "0": "Empty",
    "201": "Call Home",
    "202": "Sans's Number"
};

var rooms = [[], [], []];
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

for (var i = 0; i < rooms[2].length; i++) {
    if (rooms[2][i].indexOf("[SAVE]") !== -1) {
        rooms[0][i] = rooms[2][i];
        rooms[1][i] = rooms[2][i];
    } else if (rooms[2][i].indexOf("[Dogchecked]") === -1) {
        rooms[1][i] = rooms[2][i];
    }
}
// rooms[0] is SAVE points only, rooms[1] is non-Dogchecked only, rooms[2] contains all rooms.

var roomSelectOptions = [
    "SAVE points only",
    "Accessible rooms only",
    "All rooms"
];

// Flags initialized in flags.js
var flagFor = { // Link flags with inputs
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
    "sav-ruinskills": 202,
    "sav-snowdinkills": 203,
    "sav-waterfallkills": 204,
    "sav-hotlandkills": 205,
    "sav-undynestate1": 251,
    "sav-maddummystate": 252,
    "sav-undynestate2": 350,
    "sav-muffetstate": 397,
    "sav-broguardsstate": 402,
    "sav-mettatonstate": 425,
    "sav-undyne-cell": 465
};

var inputForFlag = {}; // and vice versa
for (var id in flagFor) {
    inputForFlag["sav-flag-" + flagFor[id]] = id;
}

var killedBool = [
    "Initial state",
    "Killed"
];

var simpleDogStates = [
    "Initial state",
    "Killed",
    "Played fetch (Spared)"
];

var stateChoiceArrays = {
    "sav-trainingdummystate": [
        "Initial state",
        "Killed",
        "Talked to",
        "Tired of your shenanigans"
    ],
    "sav-torielstate": {
        "0": "Initial state",
        "1": "In basement",
        "3": "Fled from",
        "4": "Killed",
        "5": "Spared"
    },
    "sav-doggostate": simpleDogStates,
    "sav-dogamydogaressastate": simpleDogStates,
    "sav-greaterdogstate": [
        "Initial state",
        "Killed",
        "Played fetch (Spared)",
        "Ignored"
    ],
    "sav-comedianstate": [
        "Initial state",
        "Laughed at joke [Yellow credit]",
        "Killed"
    ],
    "sav-papyrusstate": {
        "-3": "Lost to thrice",
        "-2": "Lost to twice",
        "-1": "Lost to once",
        "0": "Initial state",
        "1": "Killed"
    },
    "sav-shyrenstate": [
        "Initial state",
        "Killed",
        "Continued humming [Yellow credit]"
    ],
    "sav-undynestate1": killedBool, // Undyne The Undying
    "sav-maddummystate": killedBool, // *Glad Dummy
    "sav-undynestate2": [ // Undyne in general
        "Initial state",
        "Killed",
        "Sick"
    ],
    "sav-muffetstate": killedBool,
    "sav-broguardsstate": killedBool,
    "sav-mettatonstate": killedBool,
    "sav-weapon": weapons,
    "sav-armor": armors,
    "sav-plotvalue": { // Chapter 2, it's separate from Chapter 1 values and hell am I doing those
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
        // "33": "Arcade game introduced", // out of order??
        "49": "Bed skip",
        "50": "Entered Cyber World",
        "51": "Met Queen",
        "52": "Seen Sweet", // I have no idea where
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
        "165": "Queen defeated"
    },
    "sav-location": rooms[1],
    "ini-location": rooms[1],
    "allowed-locations": roomSelectOptions,
    "allowed-locations-2": roomSelectOptions,
    "ini-omega-flowey-soul": [
        "None (Initial state)",
        "Light blue (Initiated fight)",
        "Orange",
        "Blue",
        "Purple",
        "Green",
        "Yellow",
        "None (Finished fight)"
    ]
};

for (var i = 1; i <= 8; i++) {
    stateChoiceArrays["sav-invslot" + i] = items;
    stateChoiceArrays["sav-cellslot" + i] = cellOpts;
}

function parseIniFromText(text) {
    "use strict";
    var lines = text.match(/[^\r\n]+/g);
    var section = null;
    var ini = {};
    lines.forEach(function(line) {
        // Ignore empty lines
        if (line === "") {
            return;
        }
        // If line starts with [, it is a section header
        var lbracket = line.indexOf("[");
        if (lbracket !== -1) {
            var rbracket = line.slice(lbracket).indexOf("]") + lbracket;
            if (rbracket !== -1) {
                section = line.slice(lbracket + 1, rbracket);
                ini[section] = {};
            }
        } else { // Otherwise, it is assumed to be an assignment
            if (section === null) {
                throw "Assignment outside of a section";
            }
            
            var eq = line.indexOf("=");
            if (eq === -1) {
                throw "Expected '='";
            }
            
            var lquot = line.indexOf('"');
            if (lquot === -1) {
                throw "Expected '\"'";
            }
            
            var rquot = line.slice(lquot + 1).indexOf('"') + lquot + 1;
            if (rquot === -1) {
                throw "Unterminated value string";
            }
            
            var value = line.slice(lquot + 1, rquot);
            var key = line.slice(0, eq);
            ini[section][key] = value;
        }
    });
    return ini;
}

function flowey_laugh_once() {
    "use strict";
    if (localStorage.getItem("laughed") !== "true") {
        document.getElementById("floweyimg").src = "res/flowey_evil.png";
        if(!document.getElementById("mute").checked) {
            var audio = new Audio("res/flowey_laugh.mp3");
            audio.play();
        }
        localStorage.setItem("laughed", "true");
    }
}


// Load undertale.ini data into an ini object and execute a closure on it.
function loadIniFromFile(file, closure) {
    "use strict";
    var reader = new FileReader();
    reader.onload = function(e) {
        var text = e.target.result;
        try {
            closure(parseIniFromText(text));
        } catch (err) {
            window.alert("Error parsing undertale.ini: " + err);
        }
    };
    reader.readAsText(file);
}

// Load save data from a file into an array of values, and execute a closure on it.
function loadSaveFromFile(file, closure) {
    "use strict";
    var reader = new FileReader();
    reader.onload = function(e) {
        var text = e.target.result;
        closure(text.match(/[^\r\n]+/g).map(function(line) {
            return line.trim();
        }));
    };
    reader.readAsText(file);
}

// Update the persistent data form from an ini object.
function updatePersistentDataForm(iniobj) {
    "use strict";
    document.getElementById("ini-name").value = iniobj.General.Name;
    updateSelection("ini-location", iniobj.General.Room);
    document.getElementById("ini-kills").value = Number(iniobj.General.Kills.trim());
    document.getElementById("ini-love").value = Number(iniobj.General.Love.trim());
    if (iniobj.FFFFF) {
        if (iniobj.FFFFF.F) {
            document.getElementById("ini-omega-flowey-trapped").checked = Number(iniobj.FFFFF.F.trim());
        }
        if (iniobj.FFFFF.P) {
            updateSelection("ini-omega-flowey-soul", iniobj.FFFFF.P);
        }
        if (iniobj.FFFFF.D) {
            document.getElementById("ini-omega-flowey-deaths").value = Number(iniobj.FFFFF.D.trim());
        }
    } else {
        document.getElementById("ini-omega-flowey-trapped").checked = false;
    }
    if (iniobj.reset) {
        if (iniobj.reset.s_key) {
            document.getElementById("ini-dodged-all-special-thanks").checked = Number(iniobj.reset.s_key.trim());
        }
    } else {
        document.getElementById("ini-dodged-all-special-thanks").checked = false;
    }
    if (iniobj.General.fun) {
        document.getElementById("ini-fun").value = Number(iniobj.General.fun.trim());
    }
}

// Update an ini object from the persistent data form.
function updateIniFromForm(ini) {
    "use strict";
    
    function formItemToObj(section, key, id) {
        var value = 0;
        if (document.getElementById(id).type === "checkbox") {
            value = Number(document.getElementById(id).checked);
        } else {
            value = Number(document.getElementById(id).value);
        }
        
        if (value) {
            if (!ini[section]) {
                ini[section] = {};
            }
            ini[section][key] = String(value);
        } else {
            if (ini[section]) {
                ini[section][key] = "0";
            }
        }
    }
    
    formItemToObj("General", "Name", "ini-name");
    formItemToObj("General", "Room", "ini-location");
    formItemToObj("General", "Kills", "ini-kills");
    formItemToObj("General", "Love", "ini-love");
    formItemToObj("General", "fun", "ini-fun");
    formItemToObj("FFFFF", "F", "ini-omega-flowey-trapped");
    formItemToObj("FFFFF", "P", "ini-omega-flowey-soul");
    formItemToObj("FFFFF", "D", "ini-omega-flowey-deaths");
    formItemToObj("reset", "s_key", "ini-dodged-all-special-thanks");
}

function updateSelection(id, value, newChoiceArray) {
    "use strict";
    var select = document.getElementById(id);
    
    // Sanitize value
    if (typeof value === "string") {
        value = Number(value.trim());
    } else if (value === undefined) {
        if (select.value === undefined) {
            window.alert("No value found for form input " + id + ", defaulting to 0.");
            value = 0;
        } else {
            value = select.value;
        }
    }
    
    // Switch selected array
    if (newChoiceArray) {
        stateChoiceArrays[id] = newChoiceArray;
    }
    
    // Default case if incorrect ID is used (or stateChoiceArrays missing a case)
    if (!stateChoiceArrays[id]) {
        window.alert("No associated array for form input " + id + " found, defaulting to [\"Error\"].");
        stateChoiceArrays[id] = ["Error"];
    }
    
    // Add "Unrecognized" value if necessary
    if (!stateChoiceArrays[id][value]) {
        stateChoiceArrays[id][value] = "Unrecognized (" + value + ")";
    }
    
    // Clear old options
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    
    // Create options
    for (var key of Object.keys(stateChoiceArrays[id]).sort((a, b) => a - b)) { // (Decimal keys don't automatically sort correctly)
        var newOption = document.createElement("option");
        newOption.setAttribute("value", key);
        var newContent = document.createTextNode(stateChoiceArrays[id][key]);
        newOption.appendChild(newContent);
        select.appendChild(newOption);
    }
    
    // Update value
    select.value = value;
}

// Update the save data form from an array of values.
function updateSaveDataForm(values) {
    "use strict";
    document.getElementById("sav-name").value = values[0];
    document.getElementById("sav-kills").value = values[11];
    document.getElementById("sav-love").value = values[1];
    document.getElementById("sav-hp").value = values[2];
    document.getElementById("sav-exp").value = values[9];
    document.getElementById("sav-gold").value = values[10];
    document.getElementById("sav-at").value = values[4];
    document.getElementById("sav-weaponat").value = values[5];
    document.getElementById("sav-df").value = values[6];
    document.getElementById("sav-armordf").value = values[7];
    document.getElementById("sav-undyne-cell").checked = (Number(values[495].trim()) === 1);
    if (Number(values[495].trim()) === 1) {
        cellOpts[210] = "Papyrus and Undyne";
    } else {
        cellOpts[210] = "Papyrus's Phone";
    }
    for (var i = 1; i <= 8; i++) {
        updateSelection("sav-invslot" + i, values[10 + (i * 2)]);
        updateSelection("sav-cellslot" + i, values[11 + (i * 2)]);
    }
    if (document.getElementById("allow-non-equipables").checked) {
        updateSelection("sav-weapon", values[28], items);
        updateSelection("sav-armor", values[29], items);
    } else {
        updateSelection("sav-weapon", values[28], weapons);
        updateSelection("sav-armor", values[29], armors);
    }
    updateSelection("sav-trainingdummystate", values[44]);
    updateSelection("sav-torielstate", values[75]);
    updateSelection("sav-doggostate", values[82]);
    updateSelection("sav-dogamydogaressastate", values[83]);
    updateSelection("sav-greaterdogstate", values[84]);
    updateSelection("sav-comedianstate", values[87]);
    updateSelection("sav-papyrusstate", values[97]);
    updateSelection("sav-shyrenstate", values[111]);
    document.getElementById("sav-ruinskills").value = values[232];
    document.getElementById("sav-snowdinkills").value = values[233];
    document.getElementById("sav-waterfallkills").value = values[234];
    document.getElementById("sav-hotlandkills").value = values[235];
    updateSelection("sav-undynestate1", values[281]);
    updateSelection("sav-maddummystate", values[282]);
    updateSelection("sav-undynestate2", values[380]);
    updateSelection("sav-muffetstate", values[427]);
    updateSelection("sav-broguardsstate", values[432]);
    updateSelection("sav-mettatonstate", values[455]);
    document.getElementById("sav-exitedtruelab").checked = (Number(values[523].trim()) === 12);
    document.getElementById("sav-defeatedasriel").checked = (Number(values[37].trim()) === 1);
    updateSelection("sav-plotvalue", values[542]);
    if (Number(values[545].trim()) != document.getElementById("sav-havecell").checked) {
        document.getElementById("cellslots").classList.toggle('hidden');
    }
    document.getElementById("sav-havecell").checked = (Number(values[545].trim()) === 1);
    updateSelection("sav-location", values[547]);
    document.getElementById("sav-fun").value = Number(values[35].trim());
    for (var i = 0; i < 512; i++) {
        if (document.getElementById("sav-flag-" + i).nodeName === "SELECT") {
            updateSelection("sav-flag-" + i, values[30 + i], flags[i][2]);
        } else {
            document.getElementById("sav-flag-" + i).value = values[30 + i];
        }
        // Update checkboxes (should have no ill effects on non-checkbox-based flags)
        document.getElementById("sav-flag-" + i).previousSibling.checked = Number(document.getElementById("sav-flag-" + i).value);
    }
}

// Update an array of values from the save data form.
function updateSaveValuesFromForm(values) {
    "use strict";
    values[523] = "0"; // Initialize correctly
    for (var i = 0; i < flags.length; i++) {
        values[30 + i] = document.getElementById("sav-flag-" + i).value;
    }
    values[0] = document.getElementById("sav-name").value;
    values[1] = document.getElementById("sav-love").value;
    values[2] = document.getElementById("sav-hp").value;
    values[4] = document.getElementById("sav-at").value;
    values[5] = document.getElementById("sav-weaponat").value;
    values[6] = document.getElementById("sav-df").value;
    values[7] = document.getElementById("sav-armordf").value;
    values[9] = document.getElementById("sav-exp").value;
    values[10] = document.getElementById("sav-gold").value;
    values[11] = document.getElementById("sav-kills").value;
    for (var i = 1; i <= 8; i++) {
        values[10 + (i * 2)] = document.getElementById("sav-invslot" + i).value;
        values[11 + (i * 2)] = document.getElementById("sav-cellslot" + i).value;
    }
    values[28] = document.getElementById("sav-weapon").value;
    values[29] = document.getElementById("sav-armor").value;
    values[44] = document.getElementById("sav-trainingdummystate").value;
    values[75] = document.getElementById("sav-torielstate").value;
    values[82] = document.getElementById("sav-doggostate").value;
    values[83] = document.getElementById("sav-dogamydogaressastate").value;
    values[84] = document.getElementById("sav-greaterdogstate").value;
    values[87] = document.getElementById("sav-comedianstate").value;
    values[97] = document.getElementById("sav-papyrusstate").value;
    values[111] = document.getElementById("sav-shyrenstate").value;
    values[232] = document.getElementById("sav-ruinskills").value;
    values[233] = document.getElementById("sav-snowdinkills").value;
    values[234] = document.getElementById("sav-waterfallkills").value;
    values[235] = document.getElementById("sav-hotlandkills").value;
    values[281] = document.getElementById("sav-undynestate1").value;
    values[282] = document.getElementById("sav-maddummystate").value;
    values[380] = document.getElementById("sav-undynestate2").value;
    values[427] = document.getElementById("sav-muffetstate").value;
    values[432] = document.getElementById("sav-broguardsstate").value;
    values[455] = document.getElementById("sav-mettatonstate").value;
    values[495] = Number(document.getElementById("sav-undyne-cell").checked);
    if (document.getElementById("sav-exitedtruelab").checked) {
        values[523] = "12";
    }
    values[37] = Number(document.getElementById("sav-defeatedasriel").checked);
    values[542] = document.getElementById("sav-plotvalue").value;
    values[545] = Number(document.getElementById("sav-havecell").checked);
    values[547] = document.getElementById("sav-location").value;
    values[35] = document.getElementById("sav-fun").value;
}

function saveIniToFile(ini) {
    "use strict";
    var string = "";
    for (var section in ini) {
        string += "[" + section + "]\r\n";
        for (var key in ini[section]) {
            string += key + "=\"" + ini[section][key] + "\"\r\n";
        }
    }
    var blob = new Blob([string], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "undertale.ini", true);
    flowey_laugh_once();
}

function saveSaveValuesToFile(values) {
    "use strict";
    var string = "";
    for (var i = 0; i < values.length; i++) {
        string += values[i] + "\r\n";
    }
    var blob = new Blob([string], {type: "application/octet-stream"});
    saveAs(blob, "file0", true);
    flowey_laugh_once();
}

function loadPresetSelect() {
    "use strict";
    var selectNode = document.getElementById("builtinpresetselect");
    for (var k in presets) {
        var newOption = document.createElement("option");
        var newContent = document.createTextNode(k);
        newOption.appendChild(newContent);
        selectNode.appendChild(newOption);
    }
}

function start() {
    "use strict";
    var userPresets = localStorage.getItem("userPresets");
    var advancedMode = (localStorage.getItem("advanced") == "true");
    if (userPresets === null) {
        localStorage.setItem("userPresets", JSON.stringify({}));
    } else {
        for (var key in JSON.parse(userPresets)) {
            var presetSelect2 = document.getElementById("userpresetselect");
            var option2 = document.createElement("option");
            var text2 = document.createTextNode(key);
            option2.appendChild(text2);
            presetSelect2.appendChild(option2);
        }
    }
    if (localStorage.getItem("laughed") === "true") {
        document.getElementById("floweyimg").src = "res/flowey_evil.png";
    }
    var ini, saveLines;
    function loadPreset(name) {
        ini = presets[name].ini;
        saveLines = presets[name].lines;
        updateSaveDataForm(saveLines);
        updatePersistentDataForm(ini);
    }
    // Initialize form
    updateSelection("allowed-locations", 1);
    updateSelection("allowed-locations-2", 1);
    var advanced = document.getElementById("advanced");
    if (advancedMode) {
        advanced.classList.remove('hidden');
        document.getElementById("hide-advanced").innerHTML = "Hide";
    }
    for (var i = 0; i < flags.length; i += 3) {
        for (var j = 0; j < 3; j++) {
            var checkDesc = false;
            var newLabel = document.createElement("label");
            newLabel.setAttribute("for", "sav-flag-" + (i + j));
            newLabel.innerHTML = "[" + (i + j) + "] " + flags[i + j][0];
            if (typeof flags[i + j][1] === "string") {
                newLabel.title = flags[i + j][1];
                checkDesc = true;
            }
            
            // Hide unused flags, highlight debug ones.
            if (flags[i + j][0] === "unused" || (checkDesc && (
                flags[i + j][1].indexOf("nused") !== -1 || // "U" removed for case insensitivity
                flags[i + j][1].indexOf("Unaccessed") !== -1
            ))) {
                newLabel.classList.add("gray");
            } else if (checkDesc && flags[i + j][1].indexOf("Debug") !== -1) {
                newLabel.classList.add("red");
            }
            
            advanced.appendChild(newLabel);
        }
        for (var j = 0; j < 3; j++) {
            var newField;
            if (typeof flags[i + j][2] === "object") { // Options listed
                newField = document.createElement("select");
                for (var key of Object.keys(flags[i + j][2]).sort((a, b) => a - b)) { // (Decimal keys don't automatically sort correctly)
                    var newOption = document.createElement("option");
                    newOption.setAttribute("value", key);
                    var newContent = document.createTextNode(flags[i + j][2][key]);
                    newOption.appendChild(newContent);
                    newField.appendChild(newOption);
                }
                newField.setAttribute("id", "sav-flag-" + (i + j));
                newField.value = 0;
                if (i > 500) {
                    debugVars[i + j] = newField;
                }
            } else if (typeof flags[i + j][2] === "string") { // Simple boolean
                newField = document.createElement("div");
                newField.setAttribute("class", "checkbox");
                newField.style.marginTop = 0;
                var newOption = document.createElement("input");
                newOption.setAttribute("type", "checkbox");
                newOption.addEventListener("change", function() {
                    this.nextSibling.value = Number(this.checked);
                });
                newField.appendChild(newOption);
                newOption = document.createElement("input");
                newOption.setAttribute("type", "number");
                newOption.addEventListener("change", function() {
                    this.previousSibling.checked = Number(this.value);
                });
                newOption.style.width = "100%";
                newOption.setAttribute("id", "sav-flag-" + (i + j));
                newOption.value = 0;
                newField.appendChild(newOption);
            } else { // Numerical value
                newField = document.createElement("input");
                newField.setAttribute("type", "number");
                newField.setAttribute("id", "sav-flag-" + (i + j));
                newField.value = 0;
            }
            advanced.appendChild(newField);
        }
    }
    loadPresetSelect();
    loadPreset("Ruins Start");
    
    // Selecting a file
    var iniFile, saveFile;
    document.getElementById("ini-file").addEventListener("change", function(evt) {
        iniFile = evt.target.files[0];
        if (iniFile) {
            document.getElementById("ini-loadbutton").classList.remove('disabled');
            document.querySelector(`label[for="${event.target.id}"]`).style = "border-color: #fff"
        } else {
            document.getElementById("ini-loadbutton").classList.add('disabled');
        }
    });
    document.getElementById("sav-file").addEventListener("change", function (evt) {
        saveFile = evt.target.files[0];
        if (saveFile) {
            document.getElementById("sav-loadbutton").classList.remove('disabled');
            document.querySelector(`label[for="${event.target.id}"]`).style = "border-color: #fff"
        } else {
            document.getElementById("sav-loadbutton").classList.add('disabled');
        }
    });
    
    // Loading
    document.getElementById("ini-loadbutton").addEventListener("click", function() {
        if (!iniFile) {
            window.alert("You need to choose a file first!");
            return;
        }
        loadIniFromFile(iniFile, function(iniobj) {
            updatePersistentDataForm(iniobj);
            ini = iniobj;
        });
    });
    document.getElementById("sav-loadbutton").addEventListener("click", function() {
        if (!saveFile) {
            window.alert("You need to choose a file first!");
            return;
        }
        loadSaveFromFile(saveFile, function(lines) {
            updateSaveDataForm(lines);
            saveLines = lines;
        });
    });
    
    // Saving
    document.getElementById("ini-savebutton").addEventListener("click", function() {
        updateIniFromForm(ini);
        saveIniToFile(ini);
    });
    document.getElementById("sav-savebutton").addEventListener("click", function() {
        updateSaveValuesFromForm(saveLines);
        saveSaveValuesToFile(saveLines);
    });
    
    // system_information download
    document.getElementById("savesi2").addEventListener("click", function() {
        var blob = new Blob([], {type: "application/octet-stream"});
        saveAs(blob, "system_information_962", true);
        flowey_laugh_once();
    });
    document.getElementById("savesi3").addEventListener("click", function() {
        var blob = new Blob([], {type: "application/octet-stream"});
        saveAs(blob, "system_information_963", true);
        flowey_laugh_once();
    });
    
    // Weapon/armor AT/DF calculation
    var weaponSelect = document.getElementById("sav-weapon");
    var armorSelect = document.getElementById("sav-armor");
    weaponSelect.addEventListener("change", function() {
        var weaponAt = weaponAts[weaponSelect.value];
        var armorAt = armorAts[armorSelect.value] || 0; // Cowboy Hat, Temmie Armor
        if (typeof weaponAt !== "undefined") {
            document.getElementById("sav-weaponat").value = weaponAt + armorAt;
        }
        
    });
    armorSelect.addEventListener("change", function() {
        var df = armorDfs[armorSelect.value];
        if (typeof df !== "undefined") {
            document.getElementById("sav-armordf").value = df;
        }
        var weaponAt = weaponAts[weaponSelect.value];
        var armorAt = armorAts[armorSelect.value] || 0;
        if (typeof weaponAt !== "undefined") {
            document.getElementById("sav-weaponat").value = weaponAt + armorAt;
        } else {
            document.getElementById("sav-weaponat").value = Number(document.getElementById("sav-weaponat").value) + armorAt;
        }
    });
    
    // Interface-altering options
    var allowedLocations1 = document.getElementById("allowed-locations");
    var allowedLocations2 = document.getElementById("allowed-locations-2");
    allowedLocations1.addEventListener("change", function() {
        allowedLocations2.value = allowedLocations1.value;
        updateSelection("ini-location", null, rooms[allowedLocations1.value]);
        updateSelection("sav-location", null, rooms[allowedLocations1.value]);
    });
    allowedLocations2.addEventListener("change", function() {
        allowedLocations1.value = allowedLocations2.value;
        updateSelection("ini-location", null, rooms[allowedLocations1.value]);
        updateSelection("sav-location", null, rooms[allowedLocations1.value]);
    });
    document.getElementById("allow-non-equipables").addEventListener("change", function() {
        if (document.getElementById("allow-non-equipables").checked) {
            updateSelection("sav-weapon", null, items);
            updateSelection("sav-armor",  null, items);
        } else {
            updateSelection("sav-weapon", null, weapons);
            updateSelection("sav-armor",  null, armors);
        }
    });
    document.getElementById("sav-havecell").addEventListener("change", function() {
        document.getElementById("cellslots").classList.toggle('hidden');
    });
    var callUndyne = document.getElementById("sav-undyne-cell");
    callUndyne.addEventListener("change", function() {
        if (callUndyne.checked) {
            cellOpts[210] = "Papyrus and Undyne";
        } else {
            cellOpts[210] = "Papyrus's Phone";
        }
        for (var i = 1; i <= 8; i++) {
            updateSelection("sav-cellslot" + i);
        }
    });
    
    // Presets
    document.getElementById("builtinpresetload").addEventListener("click", function() {
        var name = document.getElementById("builtinpresetselect").value;
        loadPreset(name);
    });
    function saveUserPreset(name) {
        updateIniFromForm(ini);
        updateSaveValuesFromForm(saveLines);
        var obj = {
            "ini": ini,
            "lines": saveLines,
        };
        var presets = JSON.parse(localStorage.getItem("userPresets"));
        presets[name] = obj;
        localStorage.setItem("userPresets",JSON.stringify(presets));
    }
    document.getElementById("userpresetnew").addEventListener("click", function() {
        var name = window.prompt("Enter the name for your new preset");
        if (name === null || name === "") {
            window.alert("You did not enter a valid name, preset not created.");
        } else {
            saveUserPreset(name);
            var presetSelect = document.getElementById("userpresetselect");
            var option = document.createElement("option");
            var text = document.createTextNode(name);
            option.appendChild(text);
            presetSelect.appendChild(option);
            presetSelect.value = name;
            document.getElementById("userpresetload").classList.remove('disabled');
            document.getElementById("userpresetsave").classList.remove('disabled');
            document.getElementById("userpresetdelete").classList.remove('disabled');
            document.getElementById("userpresetexport").classList.remove('disabled');
        }
    });
    document.getElementById("userpresetsave").addEventListener("click", function() {
        var name = document.getElementById("userpresetselect").value;
        if (name !== null && name !== "") {
            saveUserPreset(name);
        } else {
            window.alert("You need to select a valid preset first!");
        }
    });
    document.getElementById("userpresetload").addEventListener("click", function() {
        var name = document.getElementById("userpresetselect").value;
        if (name !== null && name !== "") {
            var item = localStorage.getItem("userPresets");
            var presets = JSON.parse(item);
            var obj = presets[name];
            ini = obj.ini;
            saveLines = obj.lines;
            updateSaveDataForm(saveLines);
            updatePersistentDataForm(ini);
        } else {
            window.alert("You need to select a valid preset first!");
        }
    });
    document.getElementById("userpresetdelete").addEventListener("click", function() {
        var selection = document.getElementById("userpresetselect");
        var name = selection.value;
        var children = selection.childNodes;
        for (var i = 0; i < children.length; i++) {
            if (children[i].value === name) {
                selection.removeChild(children[i]);
                break;
            }
        }
        var item = localStorage.getItem("userPresets");
        var presets = JSON.parse(item);
        delete presets[name];
        localStorage.setItem("userPresets", JSON.stringify(presets));
        if (document.getElementById("userpresetselect").value === "") {
            document.getElementById("userpresetload").classList.add('disabled');
            document.getElementById("userpresetsave").classList.add('disabled');
            document.getElementById("userpresetdelete").classList.add('disabled');
            document.getElementById("userpresetexport").classList.add('disabled');
        }
    });
    if (document.getElementById("userpresetselect").value !== "") {
        document.getElementById("userpresetload").classList.remove('disabled');
        document.getElementById("userpresetsave").classList.remove('disabled');
        document.getElementById("userpresetdelete").classList.remove('disabled');
        document.getElementById("userpresetexport").classList.remove('disabled');
    }
    document.getElementById("userpresetexport").addEventListener("click", function() {
        var presets = JSON.parse(localStorage.getItem("userPresets"));
        var name = document.getElementById("userpresetselect").value;
        saveUserPreset(name);
        var preset = presets[name];
        var string = "presets[\"" + name + "\"] = " + JSON.stringify(preset) + ";";
        var blob = new Blob([string], {type: "application/octet-stream"});
        saveAs(blob, name + ".js", true);
    });
    
    document.getElementById("floweyimg").addEventListener("click", function() {
        document.getElementById("floweyimg").src = "res/flowey_wink.png";
        localStorage.setItem("laughed", false);
    });
    document.getElementById("hide-advanced").addEventListener("click", function() {
        if (advancedMode) {
            advanced.classList.add('hidden');
            advancedMode = false;
            localStorage.setItem("advanced", false);
            this.innerHTML = "Show";
        } else {
            advanced.classList.remove('hidden');
            advancedMode = true;
            localStorage.setItem("advanced", true);
            this.innerHTML = "Hide";
        }
    });
    
    var saveElements = document.querySelectorAll("input[id^=\"sav-\"],select[id^=\"sav-\"]");
    for (var i = 0; i < saveElements.length; i++) {
        if (flagFor[saveElements[i].id] >= 0) {
            saveElements[i].addEventListener("change", function() {
                if (this.type == "checkbox") {
                    document.getElementById("sav-flag-" + flagFor[this.id]).value = Number(this.checked);
                } else {
                    document.getElementById("sav-flag-" + flagFor[this.id]).value = this.value;
                }
            });
        } else if (inputForFlag[saveElements[i].id]) {
            saveElements[i].addEventListener("change", function() {
                var targetElement = document.getElementById(inputForFlag[this.id]);
                if (targetElement.type == "checkbox") {
                    targetElement.checked = Number(this.value);
                } else if (targetElement.type == "number") {
                    targetElement.value = this.value;
                } else { // dropdown
                    updateSelection(targetElement.id, this.value);
                }
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", start);
