let debugVars = {}; // Could be handy

// items, rooms, stats, flags defined in data.js

rooms[2].forEach(function(room, id) {
    if (room.indexOf("[SAVE]") !== -1) {
        rooms[0][id] = room;
    }
    if (room.indexOf("[Dogchecked]") === -1) {
        rooms[1][id] = room;
    }
});
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
    reader.addEventListener("load", function() {
        const text = this.result;
        try {
            closure(parseIniFromText(text));
        } catch (err) {
            window.alert("Error parsing undertale.ini: " + err);
        }
    });
    reader.readAsText(file);
}

// Load save data from a file into an array of values, and execute a closure on it.
function loadSaveFromFile(file, closure) {
    "use strict";
    let reader = new FileReader();
    reader.addEventListener("load", function() {
        const text = this.result;
        closure(text.match(/[^\r\n]+/g).map(function(line) {
            return line.trim();
        }));
    });
    reader.readAsText(file);
}

// Update the persistent data form from an ini object.
function updatePersistentDataForm(iniobj) {
    "use strict";
    iniIDs.forEach(function([elementID, section, key]) {
        if (iniobj[section]) {
            updateSelection(elementID, iniobj[section][key]);
        } else {
            updateSelection(elementID, 0);
        }
    });
}

// Update an ini object from the persistent data form.
function updateIniFromForm(iniobj) {
    "use strict";
    iniIDs.forEach(function([elementID, section, key]) {
        let value = 0;
        if (document.getElementById(elementID).type === "checkbox") {
            value = Number(document.getElementById(elementID).checked);
        } else {
            value = document.getElementById(elementID).value;
        }
        
        if (value) {
            if (!iniobj[section]) {
                iniobj[section] = {};
            }
            ini[section][key] = String(value);
        } else {
            if (iniobj[section]) {
                iniobj[section][key] = "0";
            }
        }
    });
}

function updateSelection(id, value, newChoiceArray) {
    "use strict";
    let select = document.getElementById(id),
        type   = "unknown";
    
    if (select === null) { // Nonexistent element
        console.log("ERROR: Element with ID " + id + " not found" + (value ? " while setting to " + value : "") + ".");
        return;
    }
    
    if (select.nodeName === "SELECT") {
        type = "select";
    } else if (select.nodeName === "INPUT") {
        type = select.type;
    }
    
    // Sanitize value
    if (typeof value === "string") {
        if (type === "text") {
            value = value.trim();
        } else {
            value = Number(value.trim());
        }
    } else if (typeof value !== "number") {
        /* An undefined value indicates one of two things:
         * - A newChoiceArray is being set without changing the value
         * - The value is suppposed to be zero but is undefined (usually ini values)
         * Hence, if no newChoiceArray is found, it assumes the latter.
         */
        if (!newChoiceArray) {
            value = 0;
        } else if (select.value === undefined) {
            window.alert("ERROR: No value found for form input " + id + ", defaulting to 0.");
            value = 0;
        } else {
            value = select.value;
        }
    }
    
    switch (type) {
        case "select":
            // Change selected array
            if (newChoiceArray) {
                stateChoiceArrays[id] = newChoiceArray;
            }
            
            // Default case if incorrect ID is used (or stateChoiceArrays missing a case)
            if (!stateChoiceArrays[id]) {
                window.alert("ERROR: No associated array for form input " + id + " found, defaulting to [\"Error\"].");
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
            break;
        
        case "checkbox":
            if (select.checked !== Boolean(value)) {
                select.click(); // Triggers change events such as hidden element toggling
            }
            break;
        
        case "number":
        case "text":
            select.value = value;
            break;
        
        default:
            window.alert("ERROR: What are you trying to update?\nElement ID: " + id + "\nDetected type: " + type + "\nNode type: " + select.nodeName + "\nSub-type: " + select.type);
            break;
    }
}

// Update the save data form from an array of values.
function updateSaveDataForm(values) {
    "use strict";
    // Unfortunately these are still hardcoded
    if (Number(values[495].trim())) {
        cellOpts[210] = "Papyrus and Undyne";
    } else {
        cellOpts[210] = "Papyrus's Phone";
    }
    
    if (document.getElementById("allow-non-equipables").checked) {
        stateChoiceArrays["sav-weapon"] = items;
        stateChoiceArrays["sav-armor"] = items;
    } else {
        stateChoiceArrays["sav-weapon"] = items;
        stateChoiceArrays["sav-armor"] = items;
    }
    
    let currentValue = 0;
    fileStructure.forEach(function(idlist, key) {
        switch (typeof idlist) {
            case "object":
                idlist.forEach(function(id) {
                    updateSelection(id, values[currentValue]);
                    currentValue++;
                });
                break;
            case "string":
                switch (idlist) { // Futureproofing, may have other arrays in need of linking for DR.
                    case "flags":
                        for (const id in flagFor) {
                            updateSelection(id, values[flagOffset + flagFor[id]]);
                        }

                        for (let i = 0; i < flagCount; i++) {
                            updateSelection("sav-flag-" + i, values[flagOffset + i], flags[i][2]);
                            // Update checkboxes (should have no ill effects on non-checkbox-based flags)
                            if (document.getElementById("sav-flag-" + i).nodeName === "INPUT") {
                                document.getElementById("sav-flag-" + i).previousSibling.checked = Number(values[flagOffset + i]);
                            }
                        }

                        // I would do currentValue++ each loop but this is probably better
                        currentValue += flagCount;
                        break;
                    default:
                        window.alert("ERROR: Something has gone horribly wrong with the file structure in data.js.\nEncountered a string entry (\"" + idlist + "\") without defined handling.");
                        break;
                }
                break;
            default:
                window.alert("ERROR: Something has gone horribly wrong with the file structure in data.js.\nEncountered a non-string, non-object entry at entry " + key);
                console.log("Wacky file structure entry:");
                console.log(idlist);
                break;
        }
    });
}

// Update an array of values from the save data form.
function updateSaveValuesFromForm(values) {
    "use strict";
    
    let currentValue = 0;
    fileStructure.forEach(function(idlist, key) {
        switch (typeof idlist) {
            case "object":
                idlist.forEach(function(id) {
                    if (document.getElementById(id) !== null) {
                        if (document.getElementById(id).type === "checkbox") {
                            values[currentValue] = document.getElementById(id).checked ? "1" : "0";
                        } else {
                            values[currentValue] = document.getElementById(id).value;
                        }
                    } else {
                        console.log("ERROR: No element of ID " + id + " found while setting values[" + currentValue + "].");
                    }
                    currentValue++;
                });
                break;
            case "string":
                switch (idlist) { // Futureproofing, may have other arrays in need of linking for DR.
                    case "flags":
                        for (let i = 0; i < flagCount; i++) {
                            values[flagOffset + i] = document.getElementById("sav-flag-" + i).value;
                        }
                        for (const id in flagFor) {
                            if (document.getElementById(id).type === "checkbox") {
                                values[flagOffset + flagFor[id]] = document.getElementById(id).checked ? "1" : "0";
                            } else {
                                values[flagOffset + flagFor[id]] = document.getElementById(id).value;
                            }
                        }

                        currentValue += flagCount;
                        break;
                    default:
                        window.alert("ERROR: Something has gone horribly wrong with the file structure in data.js.\nEncountered a string entry (\"" + idlist + "\") without defined handling.");
                        break;
                }
                break;
            default:
                window.alert("ERROR: Something has gone horribly wrong with the file structure in data.js.\nEncountered a non-string, non-object entry at entry " + key);
                console.log("Wacky file structure entry:");
                console.log(idlist);
                break;
        }
    });
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

let ini, saveLines;
function loadPreset(name) {
    ini = presets[name].ini;
    saveLines = presets[name].lines;
    updateSaveDataForm(saveLines);
    updatePersistentDataForm(ini);
}

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
    
    // Initialize form
    updateSelection("allowed-locations", 1);
    updateSelection("allowed-locations-2", 1);
    let advanced = document.getElementById("advanced");
    if (advancedMode) {
        advanced.classList.remove("hidden");
        document.getElementById("hide-advanced").innerHTML = "Hide";
    }
    for (let i = 0; i < flags.length; i++) {
        let checkDesc = false,
            newDiv = document.createElement("div"),
            newLabel = document.createElement("label"),
            newField;
        newLabel.setAttribute("for", "sav-flag-" + i);
        newLabel.innerHTML = "[" + i + "] " + flags[i][0];
        if (typeof flags[i][1] === "string") {
            newLabel.title = flags[i][1];
            checkDesc = true;
        }
        
        // Hide unused flags, highlight debug ones.
        if (flags[i][0] === "unused" || (checkDesc && (
            flags[i][1].indexOf("nused") !== -1 || // "U" removed for case insensitivity
            flags[i][1].indexOf("Unaccessed") !== -1
        ))) {
            newLabel.classList.add("gray");
        } else if (checkDesc && flags[i][1].indexOf("Debug") !== -1) {
            newLabel.classList.add("red");
        }
        
        newDiv.appendChild(newLabel);
        
        if (typeof flags[i][2] === "object") { // Options listed
            newField = document.createElement("select");
            for (const key of Object.keys(flags[i][2]).sort((a, b) => a - b)) { // (Decimal keys don't automatically sort correctly)
                let newOption  = document.createElement("option"),
                    newContent = document.createTextNode(flags[i][2][key]);
                newOption.setAttribute("value", key);
                newOption.appendChild(newContent);
                newField.appendChild(newOption);
            }
            newField.setAttribute("id", "sav-flag-" + i);
            newField.value = 0;
        } else if (typeof flags[i][2] === "string") { // Simple boolean
            newField = document.createElement("div");
            newField.setAttribute("class", "checkbox");
            newField.style.marginTop = 0;
            
            let newCheckbox = document.createElement("input");
            newCheckbox.setAttribute("type", "checkbox");
            newCheckbox.addEventListener("change", function() {
                this.nextSibling.value = Number(this.checked);
            });
            newField.appendChild(newCheckbox);
            
            let newInput = document.createElement("input");
            newInput.setAttribute("type", "number");
            newInput.addEventListener("change", function() {
                this.previousSibling.checked = Number(this.value);
            });
            newInput.style.width = "100%";
            newInput.setAttribute("id", "sav-flag-" + i);
            newInput.value = 0;
            newField.appendChild(newInput);
        } else { // Numerical value
            newField = document.createElement("input");
            newField.setAttribute("type", "number");
            newField.setAttribute("id", "sav-flag-" + i);
            newField.value = 0;
        }
        newField.style.width = "100%";
        newDiv.appendChild(newField);
        advanced.appendChild(newDiv);
    }
    loadPresetSelect();
    loadPreset("Ruins Start");
    
    // Selecting a file
    let iniFile, saveFile;
    document.getElementById("ini-file").addEventListener("change", function() {
        iniFile = this.files[0];
        if (iniFile) {
            document.getElementById("ini-loadbutton").classList.remove('disabled');
            document.querySelector(`label[for="${this.id}"]`).style = "border-color: #fff";
        } else {
            document.getElementById("ini-loadbutton").classList.add('disabled');
        }
    });
    document.getElementById("sav-file").addEventListener("change", function() {
        saveFile = this.files[0];
        if (saveFile) {
            document.getElementById("sav-loadbutton").classList.remove('disabled');
            document.querySelector(`label[for="${this.id}"]`).style = "border-color: #fff";
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
        if (weaponAt !== undefined) {
            updateSelection("sav-weaponat", (weaponAt + armorAt));
        }
    });
    armorSelect.addEventListener("change", function() {
        const df = armorDfs[this.value];
        if (df !== undefined) {
            updateSelection("sav-armordf", df);
        }
        const weaponAt = weaponAts[weaponSelect.value],
              armorAt = armorAts[this.value] || 0;
        if (weaponAt !== undefined) {
            updateSelection("sav-weaponat", (weaponAt + armorAt));
        }
    });
    
    // Interface-altering options
    document.getElementById("allowed-locations").addEventListener("change", function() {
        updateSelection("allowed-locations-2", this.value);
        updateSelection("ini-location", null, rooms[this.value]);
        updateSelection("sav-location", null, rooms[this.value]);
    });
    document.getElementById("allowed-locations-2").addEventListener("change", function() {
        updateSelection("allowed-locations", this.value);
        updateSelection("ini-location", null, rooms[this.value]);
        updateSelection("sav-location", null, rooms[this.value]);
    });
    document.getElementById("allow-non-equipables").addEventListener("change", function() {
        if (this.checked) {
            updateSelection("sav-weapon", null, items);
            updateSelection("sav-armor",  null, items);
        } else {
            updateSelection("sav-weapon", null, weapons);
            updateSelection("sav-armor",  null, armors);
        }
    });
    document.getElementById("sav-undyne-cell").addEventListener("change", function() {
        if (this.checked) {
            cellOpts[210] = "Papyrus and Undyne";
        } else {
            cellOpts[210] = "Papyrus's Phone";
        }
        for (let i = 1; i <= 8; i++) {
            updateSelection("sav-cellslot" + i, null, cellOpts);
        }
    });
    
    // Presets
    document.getElementById("builtinpresetload").addEventListener("click", function() {
        loadPreset(document.getElementById("builtinpresetselect").value);
    });
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
        for (let child of children) {
            if (child.value === name) {
                selection.removeChild(child);
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
        advanced.classList.toggle("hidden");
        advancedMode = !advancedMode;
        if (advancedMode) {
            this.innerHTML = "Hide";
        } else {
            this.innerHTML = "Show";
        }
        localStorage.setItem("advanced", advancedMode);
    });
    
    document.querySelectorAll("[id^=\"sav-\"],[id^=\"ini-\"]").forEach(function(element) {
        if (flagFor[element.id] >= 0) {
            element.addEventListener("change", function() {
                if (this.type === "checkbox") {
                    updateSelection(("sav-flag-" + flagFor[this.id]), this.checked);
                } else {
                    updateSelection(("sav-flag-" + flagFor[this.id]), this.value);
                }
            });
        } else if (inputForFlag[element.id]) {
            element.addEventListener("change", function() {
                updateSelection(inputForFlag[this.id], this.value);
            });
        }
        if (element.dataset.hides) {
            element.addEventListener("change", function() {
                document.getElementById(this.dataset.hides).classList.toggle("hidden");
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", start);
