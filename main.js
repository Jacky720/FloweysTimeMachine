let debugVars = {}; // Could be handy

// items, rooms, stats, flags defined in data.js

for (let i = 0; i < rooms[2].length; i++) {
    if (rooms[2][i].indexOf("[SAVE]") !== -1) {
        rooms[0][i] = rooms[2][i];
        rooms[1][i] = rooms[2][i];
    } else if (rooms[2][i].indexOf("[Dogchecked]") === -1) {
        rooms[1][i] = rooms[2][i];
    }
}
// rooms[0] is SAVE points only, rooms[1] is non-Dogchecked only, rooms[2] contains all rooms.

const roomSelectOptions = [
    "SAVE points only",
    "Accessible rooms only",
    "All rooms"
];

stateChoiceArrays["allowed-locations"]   = roomSelectOptions;
stateChoiceArrays["allowed-locations-2"] = roomSelectOptions;

let inputForFlag = {}; // reverse flagFor for later on (flagFor defined in data.js)
for (const id in flagFor) {
    inputForFlag["sav-flag-" + flagFor[id]] = id;
}

for (const id in flagFor) {
    if (!stateChoiceArrays[id]) {
        stateChoiceArrays[id] = flags[flagFor[id]][2];
    }
}

function parseIniFromText(text) {
    "use strict";
    let lines = text.match(/[^\r\n]+/g),
        section = null,
        ini = {};
    
    lines.forEach(function(line) {
        // Ignore empty lines
        if (line === "") {
            return;
        }
        // If line starts with [, it is a section header
        const lbracket = line.indexOf("[");
        if (lbracket !== -1) {
            const rbracket = line.slice(lbracket).indexOf("]") + lbracket;
            if (rbracket !== -1) {
                section = line.slice(lbracket + 1, rbracket);
                ini[section] = {};
            }
        } else { // Otherwise, it is assumed to be an assignment
            if (section === null) {
                throw "Assignment outside of a section";
            }
            
            const eq = line.indexOf("=");
            if (eq === -1) {
                throw "Expected '='";
            }
            
            const lquot = line.indexOf('"');
            if (lquot === -1) {
                throw "Expected '\"'";
            }
            
            const rquot = line.slice(lquot + 1).indexOf('"') + lquot + 1;
            if (rquot === -1) {
                throw "Unterminated value string";
            }
            
            const value = line.slice(lquot + 1, rquot),
                  key = line.slice(0, eq);
            ini[section][key] = value;
        }
    });
    return ini;
}

function flowey_laugh_once() {
    "use strict";
    if (localStorage.getItem("laughed") !== "true") {
        document.getElementById("floweyimg").src = "res/flowey_evil.png";
        if (!document.getElementById("mute").checked) {
            let audio = new Audio("res/flowey_laugh.mp3");
            audio.play();
        }
        localStorage.setItem("laughed", "true");
    }
}


// Load undertale.ini data into an ini object and execute a closure on it.
function loadIniFromFile(file, closure) {
    "use strict";
    let reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
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
    let reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        closure(text.match(/[^\r\n]+/g).map(function(line) {
            return line.trim();
        }));
    };
    reader.readAsText(file);
}

// Update the persistent data form from an ini object.
function updatePersistentDataForm(iniobj) {
    "use strict";
    if (document.getElementById("ini-omega-flowey-trapped").checked != Number(iniobj.FFFFF && iniobj.FFFFF.F && iniobj.FFFFF.F.trim())) {
        document.getElementById("sav-savefile8").classList.toggle('hidden');
    }
    document.getElementById("ini-name").value = iniobj.General.Name;
    updateSelection("ini-location", iniobj.General.Room);
    document.getElementById("ini-kills").value = Number(iniobj.General.Kills.trim());
    document.getElementById("ini-love").value = Number(iniobj.General.Love.trim());
    if (iniobj.FFFFF) {
        if (iniobj.FFFFF.F) {
            document.getElementById("ini-omega-flowey-trapped").checked = Number(iniobj.FFFFF.F.trim());
        } else {
            document.getElementById("sav-savefile8").classList.add('hidden');
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
    
    for (const [elementID, section, key] of iniIDs) {
        let value = 0;
        if (document.getElementById(elementID).type === "checkbox") {
            value = Number(document.getElementById(elementID).checked);
        } else {
            value = document.getElementById(elementID).value;
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
}

function updateSelection(id, value, newChoiceArray) {
    "use strict";
    let select = document.getElementById(id);
    
    // Sanitize value
    if (typeof value === "string") {
        value = Number(value.trim());
    } else if (value == undefined) {
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
    for (const key of Object.keys(stateChoiceArrays[id]).sort((a, b) => a - b)) { // (Decimal keys don't automatically sort correctly)
        let newOption = document.createElement("option"),
            newContent = document.createTextNode(stateChoiceArrays[id][key]);
        newOption.setAttribute("value", key);
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
    document.getElementById("sav-love").value = values[1];
    document.getElementById("sav-hp").value = values[2];
    // global.maxen is values[3]
    document.getElementById("sav-at").value = values[4];
    document.getElementById("sav-weaponat").value = values[5];
    document.getElementById("sav-df").value = values[6];
    document.getElementById("sav-armordf").value = values[7];
    // global.sp is values[8]
    document.getElementById("sav-exp").value = values[9];
    document.getElementById("sav-gold").value = values[10];
    document.getElementById("sav-kills").value = values[11];
    
    if (Number(values[495].trim())) {
        cellOpts[210] = "Papyrus and Undyne";
    } else {
        cellOpts[210] = "Papyrus's Phone";
    }
    if (Number(values[545].trim()) != document.getElementById("sav-havecell").checked) {
        document.getElementById("cellslots").classList.toggle('hidden');
    }
    for (let i = 1; i <= 8; i++) { // values[12] through values[27]
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
    
    for (const id in flagFor) {
        if (document.getElementById(id).nodeName === "SELECT") {
            updateSelection(id, values[30 + flagFor[id]]);
        } else {
            document.getElementById(id).value = Number(values[30 + flagFor[id]].trim());
            document.getElementById(id).checked = Number(values[30 + flagFor[id]].trim());
        }
    }
    document.getElementById("sav-exitedtruelab").checked = (Number(values[523].trim()) === 12);
    
    for (let i = 0; i < 512; i++) {
        if (document.getElementById("sav-flag-" + i).nodeName === "SELECT") {
            updateSelection("sav-flag-" + i, values[30 + i], flags[i][2]);
        } else {
            document.getElementById("sav-flag-" + i).value = values[30 + i];
            // Update checkboxes (should have no ill effects on non-checkbox-based flags)
            document.getElementById("sav-flag-" + i).previousSibling.checked = Number(values[30 + i]);
        }
    }
    
    updateSelection("sav-plotvalue", values[542]);
    // Access to ITEM and STAT menus is values 543 and 544, respectively.
    document.getElementById("sav-havecell").checked = (Number(values[545].trim()) === 1);
    // global.currentsong is values[546]
    updateSelection("sav-location", values[547]);
    // global.time is values[548], stored in frames
}

// Update an array of values from the save data form.
function updateSaveValuesFromForm(values) {
    "use strict";
    values[523] = "0"; // Initialize correctly, can be overridden by flag entry OR True Lab checkbox
    for (let i = 0; i < flags.length; i++) {
        values[30 + i] = document.getElementById("sav-flag-" + i).value;
    }
    values[0] = document.getElementById("sav-name").value;
    values[1] = document.getElementById("sav-love").value;
    values[2] = document.getElementById("sav-hp").value;
    // global.maxen is values[3]
    values[4] = document.getElementById("sav-at").value;
    values[5] = document.getElementById("sav-weaponat").value;
    values[6] = document.getElementById("sav-df").value;
    values[7] = document.getElementById("sav-armordf").value;
    // global.sp is values[8]
    values[9] = document.getElementById("sav-exp").value;
    values[10] = document.getElementById("sav-gold").value;
    values[11] = document.getElementById("sav-kills").value;
    for (let i = 1; i <= 8; i++) {
        values[10 + (i * 2)] = document.getElementById("sav-invslot" + i).value;
        values[11 + (i * 2)] = document.getElementById("sav-cellslot" + i).value;
    }
    values[28] = document.getElementById("sav-weapon").value;
    values[29] = document.getElementById("sav-armor").value;
    
    for (const id in flagFor) {
        if (document.getElementById(id).type === "checkbox") {
            values[30 + flagFor[id]] = document.getElementById(id).checked ? "1" : "0";
        } else {
            values[30 + flagFor[id]] = document.getElementById(id).value;
        }
    }
    
    if (document.getElementById("sav-exitedtruelab").checked) {
        values[523] = "12";
    }
    values[542] = document.getElementById("sav-plotvalue").value;
    values[545] = document.getElementById("sav-havecell").checked ? "1" : "0";
    values[547] = document.getElementById("sav-location").value;
}

function saveIniToFile(ini) {
    "use strict";
    let string = "";
    for (const section in ini) {
        string += "[" + section + "]\r\n";
        for (const key in ini[section]) {
            string += key + "=\"" + ini[section][key] + "\"\r\n";
        }
    }
    
    saveAs(
      new Blob([string], {type: "text/plain;charset=utf-8"}),
      "undertale.ini",
      true
    );
    flowey_laugh_once();
}

function saveSaveValuesToFile(values, slot) {
    "use strict";
    if (!slot) {
        slot = "0";
    }
    let string = "";
    for (let i = 0; i < values.length; i++) {
        string += values[i] + "\r\n";
    }
    
    saveAs(
      new Blob([string], {type: "application/octet-stream"}),
      "file" + slot,
      true
    );
    flowey_laugh_once();
}

function loadPresetSelect() {
    "use strict";
    let selectNode = document.getElementById("builtinpresetselect");
    for (const k in presets) {
        let newOption  = document.createElement("option"),
            newContent = document.createTextNode(k);
        newOption.appendChild(newContent);
        selectNode.appendChild(newOption);
    }
}

function start() {
    "use strict";
    let userPresets = localStorage.getItem("userPresets"),
        advancedMode = (localStorage.getItem("advanced") == "true");
    if (userPresets === null) {
        localStorage.setItem("userPresets", JSON.stringify({}));
    } else {
        for (const key in JSON.parse(userPresets)) {
            let presetSelect2 = document.getElementById("userpresetselect"),
                option2 = document.createElement("option"),
                text2 = document.createTextNode(key);
            option2.appendChild(text2);
            presetSelect2.appendChild(option2);
        }
    }
    if (localStorage.getItem("laughed") === "true") {
        document.getElementById("floweyimg").src = "res/flowey_evil.png";
    }
    let ini, saveLines;
    function loadPreset(name) {
        ini = presets[name].ini;
        saveLines = presets[name].lines;
        updateSaveDataForm(saveLines);
        updatePersistentDataForm(ini);
    }
    // Initialize form
    updateSelection("allowed-locations", 1);
    updateSelection("allowed-locations-2", 1);
    let advanced = document.getElementById("advanced");
    if (advancedMode) {
        advanced.classList.remove('hidden');
        document.getElementById("hide-advanced").innerHTML = "Hide";
    }
    for (let i = 0; i < flags.length; i += 3) {
        for (let j = 0; j < 3; j++) {
            let checkDesc = false,
                newLabel = document.createElement("label");
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
        for (let j = 0; j < 3; j++) {
            let newField;
            if (typeof flags[i + j][2] === "object") { // Options listed
                newField = document.createElement("select");
                for (const key of Object.keys(flags[i + j][2]).sort((a, b) => a - b)) { // (Decimal keys don't automatically sort correctly)
                    let newOption  = document.createElement("option"),
                        newContent = document.createTextNode(flags[i + j][2][key]);
                    newOption.setAttribute("value", key);
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
                
                let newOption = document.createElement("input");
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
    let iniFile, saveFile;
    document.getElementById("ini-file").addEventListener("change", function(evt) {
        iniFile = evt.target.files[0];
        if (iniFile) {
            document.getElementById("ini-loadbutton").classList.remove('disabled');
            document.querySelector(`label[for="${evt.target.id}"]`).style = "border-color: #fff";
        } else {
            document.getElementById("ini-loadbutton").classList.add('disabled');
        }
    });
    document.getElementById("sav-file").addEventListener("change", function (evt) {
        saveFile = evt.target.files[0];
        if (saveFile) {
            document.getElementById("sav-loadbutton").classList.remove('disabled');
            document.querySelector(`label[for="${evt.target.id}"]`).style = "border-color: #fff";
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
    document.getElementById("sav-savefile8").addEventListener("click", function() {
        updateSaveValuesFromForm(saveLines);
        saveSaveValuesToFile(saveLines, "8");
    });
    
    // system_information download
    document.getElementById("savesi2").addEventListener("click", function() {
        saveAs(
          new Blob([], {type: "application/octet-stream"}),
          "system_information_962",
          true
        );
        flowey_laugh_once();
    });
    document.getElementById("savesi3").addEventListener("click", function() {
        saveAs(
          new Blob([], {type: "application/octet-stream"}),
          "system_information_963",
          true
        );
        flowey_laugh_once();
    });
    
    // Weapon/armor AT/DF calculation
    let weaponSelect = document.getElementById("sav-weapon"),
        armorSelect = document.getElementById("sav-armor");
    weaponSelect.addEventListener("change", function() {
        const weaponAt = weaponAts[this.value],
              armorAt = armorAts[armorSelect.value] || 0; // Cowboy Hat, Temmie Armor
        if (typeof weaponAt !== "undefined") {
            document.getElementById("sav-weaponat").value = weaponAt + armorAt;
        }
    });
    armorSelect.addEventListener("change", function() {
        const df = armorDfs[this.value];
        if (typeof df !== "undefined") {
            document.getElementById("sav-armordf").value = df;
        }
        const weaponAt = weaponAts[weaponSelect.value],
              armorAt = armorAts[this.value] || 0;
        if (typeof weaponAt !== "undefined") {
            document.getElementById("sav-weaponat").value = weaponAt + armorAt;
        } else {
            document.getElementById("sav-weaponat").value = Number(document.getElementById("sav-weaponat").value) + armorAt;
        }
    });
    
    // Interface-altering options
    let allowedLocations1 = document.getElementById("allowed-locations"),
        allowedLocations2 = document.getElementById("allowed-locations-2");
    allowedLocations1.addEventListener("change", function() {
        allowedLocations2.value = this.value;
        updateSelection("ini-location", null, rooms[this.value]);
        updateSelection("sav-location", null, rooms[this.value]);
    });
    allowedLocations2.addEventListener("change", function() {
        allowedLocations1.value = this.value;
        updateSelection("ini-location", null, rooms[this.value]);
        updateSelection("sav-location", null, rooms[this.value]);
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
    document.getElementById("sav-undyne-cell").addEventListener("change", function() {
        if (this.checked) {
            cellOpts[210] = "Papyrus and Undyne";
        } else {
            cellOpts[210] = "Papyrus's Phone";
        }
        for (let i = 1; i <= 8; i++) {
            updateSelection("sav-cellslot" + i);
        }
    });
    document.getElementById("ini-omega-flowey-trapped").addEventListener("change", function() {
        document.getElementById("sav-savefile8").classList.toggle('hidden');
    });
    
    // Presets
    document.getElementById("builtinpresetload").addEventListener("click", function() {
        loadPreset(this.value);
    });
    function saveUserPreset(name) {
        updateIniFromForm(ini);
        updateSaveValuesFromForm(saveLines);
        let obj = {
            "ini": ini,
            "lines": saveLines,
        },
            presets = JSON.parse(localStorage.getItem("userPresets"));
        presets[name] = obj;
        localStorage.setItem("userPresets", JSON.stringify(presets));
    }
    document.getElementById("userpresetnew").addEventListener("click", function() {
        const name = window.prompt("Enter the name for your new preset");
        if (name === null || name === "") {
            window.alert("You did not enter a valid name, preset not created.");
        } else {
            saveUserPreset(name);
            let presetSelect = document.getElementById("userpresetselect"),
                option = document.createElement("option"),
                text = document.createTextNode(name);
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
        const name = document.getElementById("userpresetselect").value;
        if (name !== null && name !== "") {
            saveUserPreset(name);
        } else {
            window.alert("You need to select a valid preset first!");
        }
    });
    document.getElementById("userpresetload").addEventListener("click", function() {
        const name = document.getElementById("userpresetselect").value;
        if (name !== null && name !== "") {
            let item = localStorage.getItem("userPresets"),
                presets = JSON.parse(item),
                obj = presets[name];
            ini = obj.ini;
            saveLines = obj.lines;
            updateSaveDataForm(saveLines);
            updatePersistentDataForm(ini);
        } else {
            window.alert("You need to select a valid preset first!");
        }
    });
    document.getElementById("userpresetdelete").addEventListener("click", function() {
        let selection = document.getElementById("userpresetselect"),
            name = selection.value,
            children = selection.childNodes;
        for (let i = 0; i < children.length; i++) {
            if (children[i].value === name) {
                selection.removeChild(children[i]);
                break;
            }
        }
        let item = localStorage.getItem("userPresets"),
            presets = JSON.parse(item);
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
        let presets = JSON.parse(localStorage.getItem("userPresets")),
            name = document.getElementById("userpresetselect").value;
        saveUserPreset(name);
        const preset = presets[name],
              string = "presets[\"" + name + "\"] = " + JSON.stringify(preset) + ";";
        saveAs(
          new Blob([string], {type: "application/octet-stream"}),
          name + ".js",
          true
        );
    });
    
    document.getElementById("floweyimg").addEventListener("click", function() {
        this.src = "res/flowey_wink.png";
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
    
    let saveElements = document.querySelectorAll("input[id^=\"sav-\"],select[id^=\"sav-\"]");
    for (let i = 0; i < saveElements.length; i++) {
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
                let targetElement = document.getElementById(inputForFlag[this.id]);
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
