function moreThanOneWord() {
  return document.getElementById("input").value.split(" ").length > 1;
}

function createTables() {
  let input = document.getElementById("input").value;
  console.log("input = " + input);
  console.log("more than one word? " + moreThanOneWord());

  if (moreThanOneWord()) {
    console.log("creating tables for multi mode");
    createTablesMulti();
  } else {
    console.log("creating tables for single mode");
    createTablesSingle();
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function clozeDelete(sentence, word) {
  // console.log("sentence for cloze deletion: " + sentence);
  // console.log("word for cloze deletion: " + word);

  return sentence.replaceAll(word, "____");
}

function clear() {
    console.log("clearing.....")
  document.getElementById("exampleHeading").innerHTML = "";
  document.getElementById("definitionHeading").innerHTML = "";
  document.getElementById("noExamples").innerHTML = "";
  removeAllChildNodes(document.getElementById("cloze-table"));
  removeAllChildNodes(document.getElementById("meaning-table"));
  removeAllChildNodes(document.getElementById("wordNotFound"));
}

function displayError(word) {
  let errorMessage = document.createElement("p");
  errorMessage.innerHTML = `Word not found ("${word}"). Please check the spelling.`;
  document.getElementById("wordNotFound").appendChild(errorMessage);
}
