// document.getElementById("initiate").innerHTML = "single card script initiated";

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

function displayExamples({ word, examples }) {
  document.getElementById("exampleHeading").innerHTML = "Example Sentence Flashcards";

  const table = document.getElementById("cloze-table");
  removeAllChildNodes(table);

  if (examples.length < 1) {
    document.getElementById("noExamples").innerHTML =
      "Sorry, there are no examples to display.";
  } else {
    document.getElementById("noExamples").innerHTML = "";

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Word</th><th>Example</th>";
    table.appendChild(headerRow);
    console.log(examples);

    examples.forEach((element) => {
      console.log(element);
      const thisRow = document.createElement("tr");
      thisRow.innerHTML = `<td>${word}</td><td>${clozeDelete(
        element,
        word
      )}</td>`;
      table.appendChild(thisRow);
    });
  }
}

function displayMeanings({ word, definitions }) {
  document.getElementById("definitionHeading").innerHTML = "Definition Flashcards";

  const table = document.getElementById("meaning-table");
  removeAllChildNodes(table);

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = "<th>Word</th><th>Definition</th>";
  table.appendChild(headerRow);

  definitions.forEach((element) => {
    console.log(element.definition);
    console.log(element.partOfSpeech);
    const thisRow = document.createElement("tr");
    thisRow.innerHTML = `<td>${word}</td><td>(${element.partOfSpeech}) ${element.definition}</td>`;
    table.appendChild(thisRow);
  });
}

  function displayError() {
    document.getElementById("exampleHeading").innerHTML = "";
    document.getElementById("definitionHeading").innerHTML = "";
    document.getElementById("noExamples").innerHTML =
      "Word not found. Please check the spelling.";
  }

async function createTablesSingle() {
  const word = document.getElementById("input").value;
  console.log(word);
  const clozeURL = `https://wordsapiv1.p.rapidapi.com/words/${word}/examples`;
  const meaningsURL = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "df7a0a6242msh560c398f0a328c5p11815fjsndbccdb562679",
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  try {
    const clozeResponse = await fetch(clozeURL, options);
    const clozeResult = await clozeResponse.json();
    const meaningsResponse = await fetch(meaningsURL, options);
    const meaningsResult = await meaningsResponse.json()
    
    displayExamples(clozeResult);
    displayMeanings(meaningsResult);

    console.log(clozeResult);
    console.log(meaningsResult)

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
