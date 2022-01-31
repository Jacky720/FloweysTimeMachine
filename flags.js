var basicBool = "checkbox",
    enemyStates = [
        "Default state",
        "Violenced (includes SnowGrave)",
        "Spared",
        "Pacified",
        "In combat (Ch. 1)",
        "Susie (unused)",
        "Frozen"
    ],
    recruits = {
        1: "Invalid (1)",
        5: "Rudinn",
        6: "Hathy",
        11: "Ponman",
        13: "Rabbick",
        14: "Bloxer",
        15: "Jigsawry",
        20: "JEVIL",
        22: "Rudinn Ranger",
        23: "Head Hathy",
        30: "Ambyu-Lance",
        31: "Poppup",
        32: "Tasque",
        33: "Werewire",
        34: "Maus",
        35: "Virovirokun",
        36: "Swatchling",
        40: "Werewerewire",
        42: "Tasque Manager",
        44: "Mauswheel"
    };

// Big thanks to Xkeeper for cluing me in on a bunch of the Chapter 1 flags: https://mini.xkeeper.net/private/deltarune/data/flags.txt
// This definitely saved a lot of time in figuring out stuff like Thrash Machine and Goner values.
var flags = {
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
    29: ["susie_show_eyes", "Makes Susie show her eyes at the end of Chapter 1. Ignored in Chapter 2; she shows her eyes anyway.", basicBool],
    30: ["ralsei_hat_state", "Controls Ralsei's face selection. Ignored in Chapter 2; he's hatless anyway.", [
            "Hat",
            "Hood",
            "Hatless"
        ]],
    31: ["disable_loud_steps", "Stops the echoing step sound found in the ?????? area and Jevil's room.", basicBool],
    32: ["hide_equip_comments", "Prevents Susie and Ralsei from commenting on items you give them when in room_man.", basicBool],
    33: ["choice_time_taken", "Volatile. The time, in frames, you take to make a choice. Used by Sans."],
    34: ["disable_monster_acts", "Apparently initialized to 1, reset to 0 when unlocking S-Action and R-Action (?)", basicBool],
    35: ["gameover_mode", "Controls what the game does on game over. Usually 0.", [
            "Normal Game Over",
            "Party Dojo",
            "Immediate respawn?"
        ]],
    36: ["dojo_failure", "Set when losing Party Dojo battles (i.e. when flag 35 is 1). Affects prize and dialogue.", basicBool],
    37: ["dojo_active", "Alters battle win text and prevents you from gaining money outside of prizes.", basicBool],
    38: ["no_battle_end_msg", "Disables the battle end message. Used for SnowGraving Berdly and Party Dojo.", basicBool],
    39: ["dojo_abort?", "Something to do with immediately ending Party Dojo battles.", basicBool],
    40: ["violences", "Total number of enemies defeated through FIGHTing. Can be reduced by obtaining forgiveness from Rudinn or Hathy."],
    41: ["spares", "Total number of enemies SPAREd. Unaccessed."],
    42: ["pacifies", "Total number of enemies Pacify/Sleep Mist-ed. Unaccessed."],
    43: ["autosusie_violences", "Violences committed by Susie while not under player control. Never set due to a bug, but it would be possible to get the Chapter 1 Overthrow ending even if this is 1."],
    44: ["kills", "Total number of enemies you killed for realsies. Includes SnowGrave and killing Pipis."],
    45: ["freezes", "I have no idea?? It looks like nothing sets it, but apparently it's intended for IceShock violences..."],
    // no 46-49
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
    64: ["storage_size", "The amount of items you can keep in your pockets. Always 24. No idea why this needed to be a flag."],
    65: ["times_leveled", "The number of times you have leveled up by violently defeating an encounter. Used for certain increases that only occur every 2, 4, or 10 encounters."],
    66: ["times_gained_at", "The number of times your AT and Magic have increased due to leveling up (every ten encounters). Used to prevent overly increasing them when sealing the fountain."],
    
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
    111: ["got_bloxer_mint", "Whether you got the Revive Mint from that room with Bloxers.", basicBool],
    112: ["got_JEVIL_chest", "Whether you got the Jevilstail/Devilsknife from a chest. It appears outside the room if your inventory is full after the battle.", basicBool],
    113: ["got_clubswich", "Whether you got the Clubs Sandwich from... take a guess.", basicBool],
    114: ["got_castle_mint", "Whether you got the Revive Mint from that chest that appears when you interact with the portraits.", basicBool],
    115: ["got_key_a", "Whether you got the Broken Key A.", basicBool],
    116: ["got_key_b", "Whether you got the Broken Key B.", basicBool],
    117: ["got_key_c", "Whether you got the Broken Key C.", basicBool],
    118: ["got_glowwrist", "Whether you got the first Glow Wrist.", basicBool],
    119: ["got_nubert_treasure", "Whether you got the Fiber Scarf.", basicBool],
    120: ["got_glowwrist_2", "Whether you got that other Glow Wrist.", basicBool],
    // 121: ["unused", "Suspiciously unused flag."],
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
    139: ["got_mansion_glowshard", "Whether you got the Glowshard in Queen's Mansion. No, I don't know where it is. Or if it's actually obtainable.", basicBool],
    140: ["got_trash_candy", "Whether you got a Dark Candy from the Dark Candy trash can.", basicBool],
    141: ["got_chain_mail", "Whether you got the Chain Mail armor.", basicBool],
    142: ["got_spamton_chest", "Whether you got the Dealmaker/Puppet Scarf from a chest. There's one immediately after you beat Spamton, and one back at My Castle Town.", basicBool],
    
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
            -1: "In design",
            0: "Laser",
            1: "Sword",
            2: "Flame",
            3: "Duck"
         }],
    221: ["thrash_machine_body", "Your Thrash Machine's chassis.", {
            -1: "In design",
            0: "Plain",
            1: "Wheel",
            2: "Tank",
            3: "Duck"
         }],
    222: ["thrash_machine_shoe", "Your Thrash Machine's... well, there's a lot of variance here.", {
            -1: "In design",
            0: "Shoes",
            1: "Wheels",
            2: "Treads",
            3: "Duck"
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
    250: ["thrash_repeats", "The number of times you died to Lancer and Susie, thus requiring them to blow up another Thrash Machine. Unique dialogue at 1 and 2."],
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
            "Talking (volatile",
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
            "Received bouquet"
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
            -10: "Kris...?",
            0: "Headband",
            1: "Go to bed"
         }],
    268: ["called_in_house", "Whether you called Toriel's home phone, while at home. Unaccessed.", basicBool],
    269: ["talked_to_alphys", "Whether you met Alphys after school in Chapter 1. Alters her dialogue the morning of Chapter 2.", basicBool],
    270: ["talked_to_undyne", "Whether you met Undyne in Chapter 1.", basicBool],
    271: ["talk_pizzapants", "Progress chatting with BurgerPizzaSodaCandyPants.", [
            "Default state",
            "Mask off",
            "Talked"
         ]],
    272: ["times_called_mom", "The number of times you called Toriel after school."],
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
    
    290: ["solved_ragger_puzzle", "Whether you solved the suits puzzle to obtain Ragger.", basicBool],
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
    307: ["fave_party_member", "Records who you gave the plush to, but, uh, it's reset to 1 in the acid river ride, right before some really interesting Ralsei dialogue that's cut because of it.", [
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
         ]],
    310: ["touched_cheese_maze", "Whether you touched the cheese in the maze, triggering an encounter and destroying it.", basicBool],
    311: ["destroyed_cheese_alone", "Whether you triggered the cheese maze without Noelle, prompting slightly different text when interacting with it; a cruel victory for those who hate cheese.", basicBool],
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
    319: ["ferris_scene_plot", "Tracks how Suselle becomes canon. Returns to 2 after the whole scene.", [
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
    357: ["recruit_hacker", "Whether you collected all three Blue Checksmarks for Hacker.", basicBool],
    358: ["entered_basement", "Tracks how many times you entered the basement, and whether you can see Susie stealing Ralsei's glasses. Might max out at 2?"],
    359: ["met_hacker", "Whether you talked to Hacker. Note that the 2 state isn't directly used; see flag 357.", [
            "Default state",
            "Talked",
            "Recruited"
         ]],
    360: ["did_cheese_fight", "Whether you triggered the cheese maze, destroying the cheese.", basicBool],
    361: ["did_right_cheese_fight", "Apparently like 360 but only for the right cheese, and unaccessed.", basicBool],
    362: ["mauswheel_defeated", "Whether you defeated Mauswheel on the normal route, freeing the Swatchlings.", basicBool],
    // no 363, 364, 365
    366: ["tasque_released", "Makes one particular Tasque persist leaving the wall screen in Field?", basicBool],
    367: ["got_chestmark", "Whether you got the Blue Checksmark from a treasure chest.", basicBool],
    368: ["solved_mice_2", "Progress on solving the second mice puzzle.", {
            "0": "Default state",
            "0.5": "Mice in hole",
            "1": "Forcefield down"
         ]],
    369: ["saw_ralsusie", "Whether Noelle gave her one-time dialogue about seeing Ralsei and Susie having fun.", basicBool],
    370: ["solved_mansion_traffic", "There was traffic in the mansion?? And this disables it? Are mice involved?", basicBool],
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
    377: ["mouselottery_solved", "Whether you put the mice in, uh, one of the mansion mouse holes.", basicBool],
    378: ["mouselottery_solved_2", "The status of the other mice. No, I don't know which is which.", basicBool],
    379: ["noelle_beat_fear", "Whether Noelle stopped being afraid of mice.", basicBool],
    380: ["called_mom_after_lab", "Whether you called Toriel after leaving the computer lab. Prevents her from repeating her dialogue.", basicBool],
    381: ["dog_opened_door", "Whether the dog, ah, forced open the double door in the bajillion platters room in the mansion.", basicBool],
    382: ["dining_hall_complete", "Whether you finished the ultimate dining hall puzzle.", basicBool],
    383: ["solved_forcefield_1", "Whether you successfully activated both switches in the first forcefield puzzle, disabling it forever.", basicBool],
    384: ["fought_cheese_something?", "WHY ARE THERE SO MANY FLAGS FOR CHEESE??", basicBool],
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
    391: ["fought_maze_viro", "I think this is unused? It prevents a Virovirokun from respawning... somewhere.", basicBool],
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
    408: ["seen_djs_flyby", "Whether you saw Sweet Cap'n Cakes fly by after fighting them?", basicBool],
    409: ["inspected_kris_bed", "Whether you inspected your own bed. Necessary to retain your Bed Inspector title.", basicBool],
    410: ["inspected_susie_bed", "Whether you inspected Susie's bed. Necessary to retain your Bed Inspector title.", basicBool],
    411: ["inspected_lancer_bed", "Whether you inspected Lancer's bed. Necessary to retain your Bed Inspector title.", basicBool],
    412: ["inspected_clover_bed", "Whether you inspected Clover's bed. Necessary to retain your Bed Inspector title.", basicBool],
    413: ["inspected_noelle_bed", "Whether you inspected Noelle's bed. Necessary to retain your Bed Inspector title.", basicBool],
    414: ["bed_inspector_ch2", "Whether you retained your Bed Inspector title. That is, got slightly different Noelle bed dialogue.", basicBool],
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
            -1: "RRB",
            0: "ROB",
            1: "BGY",
            2: "ROY",
            3: "BYR",
            4: "RBY",
            5: "BYG",
            6: "RYB",
            7: "BRY",
            8: "YGO"
         }],
    427: ["unlocked_mint_chest", "Whether Virovirokun triggered the hidden path to the Revive Mint chest.", basicBool],
    428: ["finished_sweet_dodging", "Whether you... finished... the part where Sweet attacks you? Which one?", basicBool],
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
    436: ["called_mom_busy", "Whether you called home during the end sequence. Unique dialogue the first time, then everyone's too busy to pick it up.", basicBool],
    437: ["fave_party_member_2", "Who you told Susie you would take to the festival in the end cutscene. Unaccessed.", [
            "Default state",
            "Noelle",
            "Ralsei",
            "Susie",
            "..."
         ]],
    438: ["tutor_viro_location", "Where you fought the tutorial Virovirokun. Persists its ice statue in Snowgrave. VERIFY WHICH!", [
            "Default state",
            "Progressed",
            "Backtracked"
         ]],
    439: ["deposited_ch2_egg", "Whether you put the egg in the egg basket in Sans's store. It also works if you interact with any object on the northeast side of the store lol.", basicBool],
    440: ["interacted_ferris_poster", "Whether you interacted with the Ferris wheel poster with Noelle. One-time event.", basicBool],
    441: ["talked_friend_addison", "Whether you talked to the Addison selling Dating Shoes. One-time event. See also flag 421.", basicBool],
    442: ["learned_teacups", "Whether you've taken your first teacup ride and possibly gotten a tutorial on operating it.", basicBool],
    443: ["told_save_town", "Whether Ralsei told you to feel free to SAVE and take a break in Castl- RALSEI KNOWS ABOUT SAVING??", basicBool],
    444: ["told_visit_town", "Whether Susie told you to go back and check out Castle Town, if you went down south first.", basicBool],
    445: ["read_cleaning_poster", "Whether you interacted with the poster for Queen Cleaning Agent with Noelle behind you. Interesting dialogue exclusive to non-Snowgrave.", basicBool],
    446: ["went_weird_door", "Whether you brought Noelle all the way back to the gray door. Unique dialogue about its creepiness, but not required for Snowgrave.", basicBool],
    447: ["broke_balloon_cheese", "I don't remember where this is but when a forcefield pops the balloon on some cheese, balloon cheese stops spawning?", basicBool],
    448: ["finished_big_forcefield", "Whether you finished and disabled the right-side forcefields in that room where Noelle stands on a button forever.", basicBool],
    449: ["easter_egg_forcefield", "Whether you disabled the Easter egg forcefield (with the balloons) by all getting in one teacup.", basicBool],
    450: ["easter_teacup_plot", "Progress in the balloon-teacup Easter egg.", [
            "Default state",
            "Read sign",
            "Rode teacups"
         ]],
    451: ["talked_about_pap", "Whether you talked to Sans about Papyrus in both chapters 1 and 2; talking in Chapter 2 only isn't saved.", basicBool],
    452: ["told_wrongway", "Whether Noele questioned if you were going the right way while backtracking further into the trash zone.", basicBool],
    453: ["talked_snowgrave_neo", "Whether you talked to Spamton through the basement door while he was changing forms. He doesn't repeat himself.", basicBool],
    454: ["got_dealmaker", "Whether you spared Spamton NEO. What, you thought that would be in flag 309?", basicBool],
    455: ["ride_with_me", "Whether you said 'Noelle will ride with me' on Snowgrave. Unaccessed.", basicBool],
    456: ["beat_snowgrave_neo", "Whether you defeated Spamton NEO on Snowgrave. Unaccessed.", basicBool],
    457: ["spared_berdly", "Whether you spared Berdly all three times, keeping him from breaking his arm.", basicBool],
    458: ["houses_hit", "The number of houses you hit with the swan boat, converted to TP at the start of the Rouxls fight. Maximum 7?"],
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
    501: ["triple_hathy_outcome", "Seems to be intended for some other, non-Hathy fight in room_field2. Changes the dialogue of... a nonexistent NPC in the room. And it's only set by enemies that don't appear in that room.", basicBool],
    502: ["times_ponman_fought", "The number of times you fought Ponmen. Minor changes to the overworld chasing Ponmen."],
    503: ["susie_complimented", "Whether Susie has attempted to compliment Rudinn Ranger. Free ham sandwich day does not repeat.", basicBool],
    504: ["susie_flirted", "The number of times you used X-Flirt on Head Hathy. She tries the first time, makes Ralsei try the second, and you take over from the third."],
    505: ["fought_rabbick", "Whether you fought any Rabbicks. If so, they run slower in the forest maze.", basicBool],
    506: ["fought_bloxer", "Whether you fought Bloxer. If so, they don't chase you as diligently.", basicBool],
    507: ["fought_rudinn_ranger", "Whether you fought Rudinn Ranger. If so, they don't chase you at all.", basicBool],
    508: ["fought_hathyx", "Whether you fought Head Hathy. If so, they don't chase you at all.", basicBool],
    // no 509-519?
    520: ["rudinn_violences", "The number of Rudinns you have beat up. Subtracted from flag 40 if you apologize."],
    521: ["hathy_violences", "The number of Hathys you have beat up. Subtracted from flag 40 if 2 or less and you apologize."],
    522: ["clover_violence", "Whether you beat up Clover the first time. You can't apologize.", basicBool],
    523: ["rudinn_susie_whacks", "Intended for Susie beating up Rudinns, but unset. See flag 43."],
    524: ["hathy_susie_whacks", "Intended for Susie beating up Hathys, but unset. See flag 43."],
    
    // here be encounter flags
    525: ["encount_first_ww", "Tracks the state of the first random Werewire encounter.", enemyStates],
    526: ["encount_first_tasq", "Tracks the state of the first random Tasque encounter, the one that jumps out at you. Then it's reused for like Giga Queen deaths or something, which is a little broken."], // shoutout to Colinator27 for finding the reuse
    527: ["encount_first_viro", "Tracks the state of the first Virovirokun encounter, the one en route to AGREE2ALL.", enemyStates],
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
    558: ["encount_tasque_return", "Tracks the state of the Tasques found when backtracking to Tasque Manager's room.", enemyStates],
    // Snowgrave.
    559: ["encount_trash_popup", "Tracks the state of the Poppups found when backtracking to the Trash Zone with Noelle.", enemyStates],
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
    
    // recruits, can take fractional values but the checkbox is alongside a number box anyway so whatever
    601: ["recruit_enemy", "Whether you recruited the Chapter 1 placeholder enemy. Unused x2.", basicBool],
    602: ["recruit_lancer", "Unused. He doesn't have recruit info anyway.", basicBool],
    603: ["recruit_dummy", "Unused. It doesn't have recruit info anyway.", basicBool],
    604: ["recruit_ralsei", "Recruit entry for tutorial Ralsei. Unused.", basicBool],
    605: ["recruit_rudinn", "Set at the start of Chapter 2. You NEED at least one recruit.", basicBool],
    606: ["recruit_hathy", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    607: ["recruit_clover_old", "Unused, both for the enemy and the recruiting.", basicBool],
    608: ["recruit_pippins", "Unused, both for the enemy and the recruiting.", basicBool],
    609: ["recruit_c_round", "Unused. It doesn't have recruit info anyway.", basicBool],
    610: ["recruit_k_round", "Unused. It doesn't have recruit info anyway.", basicBool],
    611: ["recruit_ponman", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    612: ["recruit_lancer_2", "Unused. He doesn't have recruit info anyway.", basicBool],
    613: ["recruit_rabbick", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    614: ["recruit_bloxer", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    615: ["recruit_jigsaw", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    616: ["recruit_clover", "Unused. She doesn't have recruit info anyway.", basicBool],
    617: ["recruit_doomtank", "Unused, both for the enemy and the recruiting. Thrash Machine was better anyway.", basicBool],
    618: ["recruit_lancer_3", "Unused. He doesn't have recruit info anyway.", basicBool],
    619: ["recruit_susie", "Unused. She doesn't have recruit info anyway.", basicBool],
    620: ["recruit_JEVIL", "If I say 'Debug' it'll highlight this in red, because JEVIL does have recruit info.", basicBool],
    621: ["recruit_k_round_2", "Unused. It doesn't have recruit info anyway.", basicBool],
    622: ["recruit_rudinn_ranger", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    623: ["recruit_head_hathy", "Self-explanatory. Set at the start of Chapter 2.", basicBool],
    625: ["recruit_king", "Unused. He doesn't have recruit info anyway.", basicBool],
    
    630: ["recruit_medic", "Whether you recruited Ambyu-Lance.", basicBool],
    631: ["recruit_poppup", "Whether you recruited Poppup.", basicBool],
    632: ["recruit_tasque", "Whether you recruited Tasque.", basicBool],
    633: ["recruit_plugboy", "Whether you recruited Plugboy, by which I mean Werewire.", basicBool],
    634: ["recruit_maus", "Whether you recruited Maus.", basicBool],
    635: ["recruit_viro", "Whether you recruited Virovirokun.", basicBool],
    636: ["recruit_butler", "Whether you recruited Swatchling.", basicBool],
    637: ["recruit_cap?", "Whether you recruited Cap'n? Probably unused, I don't remember ever seeing a 'Recruit!' in that scene. And they don't have recruit info.", basicBool],
    638: ["recruit_k_k?", "See flag 637. Unused?", basicBool],
    639: ["recruit_sweet?", "See flag 637. Unused?", basicBool],
    640: ["recruit_www", "Whether you recruited Werewerewire. It doesn't appear for the powers combined scene.", basicBool],
    641: ["recruit_graze_test", "Whether you somehow recruited this 'Graze Test' enemy that I don't see used anywhere. There's no recruit info. Unused.", basicBool],
    642: ["recruit_task_manager", "Whether you recruited Tasque Manager.", basicBool],
    643: ["recruit_berdly", "Whether you somehow found a way to recruit Berdly in his first battle. No recruit info. Unused.", basicBool],
    644: ["recruit_mauswheel", "Whether you recruited Mauswheel.", basicBool],
    645: ["recruit_rouxls", "Probably unused. It's just Rouxls/Thrash Machine's enemy ID.", basicBool],
    646: ["recruit_berdly_2", "Whether you somehow found a way to recruit Berdly in his second battle. No recruit info. Unused.", basicBool],
    647: ["recruit_dojo_clover", "Whether you somehow found a way to recruit Clover in her Party Dojo encounter. Very unused.", basicBool],
    648: ["recruit_queen", "Unused. You always 'recruit' Queen, but she isn't a recruit, if you get my drift.", basicBool],
    649: ["recruit_spamton", "Whether you somehow found a way to recruit Spamton. No recruit info. Unused.", basicBool],
    650: ["recruit_spam_neo", "Whether you somehow found a way to recruit Spamton NEO. No recruit info. Unused.", basicBool],
    651: ["recruit_giga_queen", "Whether you somehow found a way to recruit GIGA Queen. No recruit info. Unused.", basicBool],
    652: ["recruit_joe", "Whether you somehow found a way to recruit Jigsaw Joe at the Party Dojo. Very unused.", basicBool],
    653: ["recruit_pipis", "You can't recruit Pipis. Unused.", basicBool],
    
    // Are there NO 700s flags?? Must be saving for more recruit info...
    
    800: ["cafe_topleft", "The recruit seated in the top-left of the Cafe. Defaults to Jigsawry.", recruits],
    801: ["cafe_topright", "The recruit seated in the top-right of the Cafe. Defaults to Rudinn.", recruits],
    802: ["cafe_bottomleft", "The recruit seated in the bottom-left of the Cafe. Defaults to Hathy.", recruits],
    803: ["cafe_bottomright", "The recruit seated in the bottom-right of the Cafe. Defaults to Rudinn.", recruits],
    
    810: ["beat_grazing", "Whether you beat the grazing challenge in the Party Dojo.", basicBool],
    811: ["beat_dojo_clover", "Whether you beat Clover's rematch in the Party Dojo.", basicBool],
    812: ["beat_tm_says", "Whether you beat the 'Tasque Manager Says' challenge in the Party Dojo.", basicBool],
    813: ["beat_allstars", "Whether you beat the Ch2 All Stars challenge in the Party Dojo.", basicBool],
    814: ["beat_joe", "Whether you defeated Jigsaw Joe in the Party Dojo and took his life savings.", basicBool],
    
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
            -3: "Voice",
            -2: "Bravery",
            -1: "Ambition",
            0: "Mind",
            1: "Kindness",
        }],
    910: ["ch1_egg_room", "Your progress to finding... him.", [
            "Default state",
            "Entered room",
            "Interacted with man"
         ]],
    911: ["got_ch1_egg", "Set when entering Chapter 2 if you had or deposited the Chapter 1 egg, but not if you dropped it. Maybe. It checks the key item.", basicBool],
    912: ["language", "Damn it Toby you already have global.lang what more do you want", ["English", "Japanese"]],
    913: ["interacted_man_car", "Whether you saw the man wave at you from his car, if flag 910 up there was 2 (even if you refused the offer).", basicBool],
    914: ["chapter_started", "The chapter you started your current save file on. Set to 1 when continuing a Chapter 1 file into 2. Only used for a little Light World stats text."],
    915: ["snowgrave_plot", "Your progress on the Snowgrave Route. This is a big one.", {
            "0": "Default state",
            "1": "Froze tutor Virovirokun",
            "1.5": "Froze Trash Zone enemies",
            "1.75": "Froze roadway enemies",
            "2": "Ready for Freeze Ring",
            "3": "Got Freeze Ring",
            "4": "Passed forcefield",
            "5": "Froze mouse puzzle",
            "6": "SnowGrave."
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
    
    // no 929-949
    950: ["shadow_failed", "Whether you used the Shadow Crystal in Chapter 2 and saw nothing. 952 is more interesting.", basicBool],
    951: ["glass_failed", "Whether you used the Glass in Chapter 2 and saw nothing. 953 and 281 are more interesting.", basicBool],
    952: ["shadow_lab", "Whether you saw the computer lab using the Shadow Crystal.", basicBool],
    953: ["glass_susie_glare", "Whether you saw Susie glare at you using the Glass.", basicBool],     
    954: ["gave_JEVIL_crystal", "Whether you gave Seam JEVIL's Shadow Crystal.", basicBool],
    // no 955-960
    961: ["failed_spam_crystal", "Whether you got JEVIL's Shadow Crystal but failed to find Spamton's, and told Seam. They seem quite dejected...", basicBool], // :(
    
    // I'll need to check if any four-digit values are actually used, and go over all of this with a fine comb, but, wow! Nice!
};
