function displayCard({ word, examples }, meaningsResult) {
  document.getElementById("exampleHeading").innerHTML = "Flashcards";
  document.getElementById("definitionHeading").innerHTML = ""

  const table = document.getElementById("cloze-table");

  if (examples.length < 1) {
    console.log(meaningsResult);
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

  clear()

  const words = document.getElementById("input").value.split(" ");
  console.log(words);

  const clozeTable = document.getElementById("cloze-table");

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = "<th>Word</th><th>Clue</th>";
  clozeTable.appendChild(headerRow);

  words.map((word) => createLine(word));
}

async function createLine(word) {
  const examplesURL = `https://wordsapiv1.p.rapidapi.com/words/${word}/examples`;
  const meaningsURL = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "df7a0a6242msh560c398f0a328c5p11815fjsndbccdb562679",
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  try {
    const examplesResponse = await fetch(examplesURL, options);
    const examplesResult = await examplesResponse.json();
    const meaningsResponse = await fetch(meaningsURL, options);
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
