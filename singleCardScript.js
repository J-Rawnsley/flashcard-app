function displayExamples({ word, examples }) {
  clear()
  
  document.getElementById("exampleHeading").innerHTML =
    "Example Sentence Flashcards";

  const table = document.getElementById("cloze-table");
  removeAllChildNodes(table);

  if (examples.length < 1) {
    document.getElementById("noExamples").innerHTML =
      "Sorry, there are no examples to display.";
  } else {
    document.getElementById("noExamples").innerHTML = "";

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Word</th><th>Example</th>";
    headerRow.classList.add("table-success")
    table.appendChild(headerRow);
    // console.log(examples);

    examples.forEach((element) => {
      // console.log(element);
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
  document.getElementById("definitionHeading").innerHTML =
    "Definition Flashcards";

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

async function createTablesSingle() {
  const word = document.getElementById("input").value;
  console.log(word);
  const clozeURL = `http://localhost:8888/.netlify/functions/token-hider-examples?word=${word}`;
  const meaningsURL = `http://localhost:8888/.netlify/functions/token-hider-definitions?word=${word}`;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": config.apiKey,
  //     "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  //   },
  // };

  try {
    const clozeResponse = await fetch(clozeURL);
    const clozeResult = await clozeResponse.json();

    const meaningsResponse = await fetch(meaningsURL);
    const meaningsResult = await meaningsResponse.json();

    console.log(clozeResult);
    console.log("meanings result", meaningsResult);

    displayExamples(clozeResult);
    displayMeanings(meaningsResult);


  } catch (error) {
    console.error(error);
    removeAllChildNodes(document.getElementById("meaning-table"));
    displayError(word);
  }
}
