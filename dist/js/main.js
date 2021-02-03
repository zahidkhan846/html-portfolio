const TypeEffect = function (textElement, words, waitTime = 3000) {
  this.textElement = textElement;
  this.words = words;
  this.text = "";
  this.wordsIndex = 0;
  this.waitTime = parseInt(waitTime, 10);
  this.type();
  this.deletingWord = false;
};

TypeEffect.prototype.type = function () {
  const currentWordIndex = this.wordsIndex % this.words.length;

  const currentWord = this.words[currentWordIndex];

  // check if deleting
  if (this.deletingWord) {
    this.text = currentWord.substring(0, this.text.length - 1);
  } else {
    this.text = currentWord.substring(0, this.text.length + 1);
  }

  ///insert text in html element
  this.textElement.innerHTML = `<span class="text">${this.text}</span>`;

  // type speed
  let typeSpeed = 300;

  if (this.deletingWord) {
    typeSpeed = typeSpeed / 2;
  }

  if (!this.deletingWord && this.text === currentWord) {
    typeSpeed = this.waitTime;
    this.deletingWord = true;
  } else if (this.deletingWord && this.text === "") {
    this.deletingWord = false;
    this.wordsIndex++;
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  const textElement = document.querySelector(".text-type");
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const waitTime = textElement.getAttribute("data-wait");

  new TypeEffect(textElement, words, waitTime);
}
