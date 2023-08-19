// let currentMode = "multi"

// function toggle(mode) {
//     currentMode = mode
//     console.log(currentMode)
// }

function moreThanOneWord() {
    return document.getElementById("input").value.split(" ").length > 1
}

function createTables() {
    // console.log(`should be creating tables for ${currentMode}`)

    let input = document.getElementById("input").value
    console.log("input = " + input);
    console.log("more than one word? " + moreThanOneWord());


    if (moreThanOneWord()) {
        console.log("creating tables for multi mode");
        createTablesMulti()
    }

    else {
        console.log("creating tables for single mode");
        createTablesSingle()
    }
}

console.log(createTables)