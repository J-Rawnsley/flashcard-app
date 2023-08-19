function clozeDelete(sentence, word) {
    return sentence.replaceAll(word, "____")
}

console.log(clozeDelete("The quick brown fox jumped over the lazy dog.", "fox"))