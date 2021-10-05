var basicBool = "checkbox";

var flags = {
    // Format of [name (String), description (String), options (Object)]
    // include single digits (I know 6 and 7 are used)
    8: ["simplify_vfx", "Self-explanatory. Set in Dark World menu.", basicBool],
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
    112: ["got_jevil_chest", "Whether you got the Jevilstail/Devilsknife from a chest. It appears outside the room if your inventory is full after the battle.", basicBool],
    113: ["got_clubswich", "Whether you got the Clubs Sandwich from... take a guess.", basicBool],
    114: ["got_castle_mint", "Whether you got the Revive Mint from that chest that appears when you interact with the portraits.", basicBool],
    115: ["got_key_a", "Whether you got the Broken Key A.", basicBool],
    116: ["got_key_b", "Whether you got the Broken Key B.", basicBool],
    117: ["got_key_c", "Whether you got the Broken Key C.", basicBool],
    118: ["got_glowwrist", "Whether you got the first Glow Wrist.", basicBool],
    119: ["got_nubert_treasure", "Whether you got the Fiber Scarf.", basicBool],
    120: ["got_glowwrist_2", "Whether you got that other Glow Wrist.", basicBool],
    121: ["unused", "Suspiciously unused flag."],
    122: ["got_tension_bit", "Whether you got the Tension Bit.", basicBool],
    123: ["got_ch2_mint", "Whether you got the THIRD Revive Mint.", basicBool],
    124: ["unused", "Suspiciously unused flag."],
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
    213: ["unused", "Suspiciously unused flag."],
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
            1: "Monogrammed track jackets"
            // extend
         }]
};
