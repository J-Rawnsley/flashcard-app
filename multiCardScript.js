function displayCard({ word, examples }, meaningsResult) {
  document.getElementById("exampleHeading").innerHTML = "Flashcards";
  document.getElementById("definitionHeading").innerHTML = "";

  const table = document.getElementById("cloze-table");

  if (examples.length < 1) {
    console.log("no examples", meaningsResult);
    const thisRow = document.createElement("tr");
    thisRow.innerHTML = `<td>${word}</td><td>(${meaningsResult.definitions[0].partOfSpeech}) ${meaningsResult.definitions[0].definition}</td>`;
    table.appendChild(thisRow);
  } else {
    console.log(examples[0]);
    const thisRow = document.createElement("tr");
    thisRow.innerHTML = `<td>${word}</td><td>${clozeDelete(
      examples[0],
      word
    )}</td>`;
    table.appendChild(thisRow);
  }
}

async function createTablesMulti() {
  clear();

  const words = document.getElementById("input").value.split(" ");
  console.log(words);

  const clozeTable = document.getElementById("cloze-table");

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = "<th>Word</th><th>Clue</th>";
  clozeTable.appendChild(headerRow);

  words.map((word) => createLine(word));
}

async function createLine(word) {

  const examplesURL = `${urlStem}/.netlify/functions/token-hider-examples?word=${word}`;

  const meaningsURL = `${urlStem}/.netlify/functions/token-hider-definitions?word=${word}`;

  try {
    const examplesResponse = await fetch(examplesURL);
    const examplesResult = await examplesResponse.json();
    const meaningsResponse = await fetch(meaningsURL);
    const meaningsResult = await meaningsResponse.json();

    console.log(examplesResult);
    console.log(meaningsResult);

    displayCard(examplesResult, meaningsResult);
  } catch (error) {
    console.error(error);
    removeAllChildNodes(document.getElementById("meaning-table"));
    displayError(word);
  }
}
