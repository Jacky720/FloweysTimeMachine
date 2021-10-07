var basicBool = "checkbox";

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
    20: ["manual_face_sprite", "Volatile. Controls some characters' faces."],
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
    34: ["disable_s_act?", "Apparently initialized to 1, reset to 0 when unlocking S-Action and R-Action (?)", basicBool],
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
    50: ["last_encounter_end", "Volatile. Contains what you did in the last encounter. For multiple enemies, priority is Violence > Spare > Pacify > IceShock.", {
            0: "Default state",
            1: "Violenced (includes SnowGrave)",
            2: "Spared",
            3: "Pacified",
            6: "Frozen"
        }],
    51: ["last_monster_end_0", "Volatile. What you did you the top monster in the last encounter.", {
            0: "Default state",
            1: "Violenced (includes SnowGrave)",
            2: "Spared",
            3: "Pacified",
            6: "Frozen"
        }],
    52: ["last_monster_end_1", "Volatile. What you did you the middle monster in the last encounter.", {
            0: "Default state",
            1: "Violenced (includes SnowGrave)",
            2: "Spared",
            3: "Pacified",
            6: "Frozen"
        }],
    53: ["last_monster_end_2", "Volatile. What you did you the bottom monster in the last encounter.", {
            0: "Default state",
            1: "Violenced (includes SnowGrave)",
            2: "Spared",
            3: "Pacified",
            6: "Frozen"
        }],
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
    307: ["fave_party_member", "Apparently intended for who you gave the plush to, but- oh my that's a decompiler failure. It's reset to 1 in the acid river ride, right before some really interesting Ralsei dialogue that's cut because of it.", [
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
         ]]
};
