// document.getElementById("initiate").innerHTML = "multi card script initiated";

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function clozeDelete(sentence, word) {
  console.log("sentence for cloze deletion: " + sentence);
  console.log("word for cloze deletion: " + word);

  return sentence.replaceAll(word, "____");
}

function displayCard({ word, examples }, meaningsResult) {
  document.getElementById("exampleHeading").innerHTML = "Flashcards";

  const table = document.getElementById("cloze-table");
  // removeAllChildNodes(table);

  // const headerRow = document.createElement("tr");
  // headerRow.innerHTML = "<th>Word</th><th>Clue</th>";
  // table.appendChild(headerRow);

  if (examples.length < 1) {
    console.log(meaningsResult)
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

// function displayMeanings({ word, definitions }) {
//   document.getElementById("definitionHeading").innerHTML = "Definition Flashcards";

//   const table = document.getElementById("meaning-table");
//   removeAllChildNodes(table);

//   const headerRow = document.createElement("tr");
//   headerRow.innerHTML = "<th>Word</th><th>Definition</th>";
//   table.appendChild(headerRow);

//   definitions.forEach((element) => {
//     console.log(element.definition);
//     console.log(element.partOfSpeech);
//     const thisRow = document.createElement("tr");
//     thisRow.innerHTML = `<td>${word}</td><td>(${element.partOfSpeech}) ${element.definition}</td>`;
//     table.appendChild(thisRow);
//   });
// }

  function displayError() {
    document.getElementById("exampleHeading").innerHTML = "";
    document.getElementById("definitionHeading").innerHTML = "";
    document.getElementById("noExamples").innerHTML =
      "Word not found. Please check the spelling.";
  }

async function createTablesMulti() {
  const words = document.getElementById("input").value.split(" ");
  console.log(words)

  const table = document.getElementById("cloze-table");
  removeAllChildNodes(table);

  const meaningsTable = document.getElementById("meaning-table");
  removeAllChildNodes(meaningsTable);

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = "<th>Word</th><th>Clue</th>";
  table.appendChild(headerRow);

  words.map(word => createLine(word))

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
    const meaningsResult = await meaningsResponse.json()

    console.log(examplesResult);
    console.log(meaningsResult);

    displayCard(examplesResult, meaningsResult);
    // displayMeanings(meaningsResult);
    

  } catch (error) {
    console.error(error);
    const table = document.getElementById("meaning-table");
    removeAllChildNodes(table);
    displayError();
  }
}

// async function createMeaningsTable() {
//   const word = document.getElementById("input").value;
//   console.log(word);
//   const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "df7a0a6242msh560c398f0a328c5p11815fjsndbccdb562679",
//       "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     displayMeanings(result);
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function createTables() {
//   createClozeTable();
//   createMeaningsTable();
// }
