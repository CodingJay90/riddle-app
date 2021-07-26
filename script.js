import { riddlesBank } from "./riddleBank.js";
const startGameBtn = document.querySelector("#start-game");
const startPage = document.querySelector(".start-page-content");
const riddlePageContent = document.querySelector(".riddle-page-content");
const riddleBox = document.querySelector(".question__box h3");
const answerBox = document.querySelector(".answer__box ul");
const optionsBox = document.querySelector(".options__box ul");
const toastContainer = document.querySelector(".toast-container");

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let numOfRiddles = 0;
let answerLength = 0;
let correctAnswer = "";
const riddles = [];
let optionsArray = [];
let selectedOptions = [];
let currentQuestionIndex = 0;

function animatePage() {
  startPage.style.opacity = 0;
  setTimeout(() => startPage.classList.add("d-none"), 500);
  setTimeout(() => (riddlePageContent.style.opacity = 1), 500);
  riddlePageContent.classList.remove("d-none");
}

function pickRandomRiddles() {
  const uniques = chance.unique(chance.natural, numOfRiddles, {
    min: 0,
    max: 99,
  });

  uniques.forEach((i) => riddles.push(riddlesBank[i]));
  console.log(riddles);
}

function randomizeOptions(length, option) {
  const uniques = chance.unique(chance.natural, length, {
    min: 1,
    max: 25,
  }); //create unique numbers

  uniques.forEach((item) => {
    for (let i = 0; i < option.length; i++) {
      optionsArray.push(option.charAt(i)); //map through the answer(string) and push into options array
    }
    optionsArray.push(letters[item]);
  });

  let uniq = (a) => [...new Set(a)]; //remove duplicate values

  let shuffledArray = uniq(optionsArray)
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value); //shuffle the array

  optionsArray = shuffledArray; //assign the shuffled array to options array
}

function compareAnswer() {
  const finalAnswer = selectedOptions.join("");

  if (finalAnswer.toLowerCase() == correctAnswer.toLowerCase()) {
    toastMessage("Got it Riddle Master");
  } else {
    toastMessage("Wrong answer! try again");
  }
}

function toastMessage(message) {
  const output = `
        <div>
            <p class="display-6 lead">${message}</p>
            
        </div>
    `;
  toastContainer.innerHTML = output;
  toastContainer.style.transform = "translateX(-10%)";
  setTimeout(() => {
    toastContainer.style.transform = "translateX(100%)";
  }, 2500);
}

window.resetValues = function resetValues() {
  answerLength = 0;
  correctAnswer = "";
  numOfRiddles = 0;
  selectedOptions = [];
  optionsArray = [];
};

window.handleSelect = function handleSelect(e) {
  const letter = e.target.textContent;
  const options = answerBox.children;

  if (selectedOptions.length !== answerLength) {
    selectedOptions.push(letter);
    const arr = Array.from(options);
    arr.forEach((i, index) => {
      i.textContent = selectedOptions[index];
    });
  } else {
    compareAnswer();
  }
};

window.handleNextRiddle = function handleNextRiddle(e) {
  9;
  currentQuestionIndex = currentQuestionIndex + 1;
  if (currentQuestionIndex == riddles.length) e.disabled = true;
  if (currentQuestionIndex > 1)
    document.querySelector(".prev").disabled = false;
  resetValues();
  displayRiddle(currentQuestionIndex);
};

window.handlePrevRiddle = function handlePrevRiddle(e) {
  currentQuestionIndex = currentQuestionIndex - 1;
  if (currentQuestionIndex < 1) e.disabled = true;
  if (currentQuestionIndex != riddles.length)
    document.querySelector(".next").disabled = false;
  resetValues();
  displayRiddle(currentQuestionIndex);

  //   if (currentQuestionIndex > 0) e.disabled = true;
};

function displayRiddle(num) {
  const optionLength = riddles[num].answer.length;
  const answer = riddles[num].answer;
  randomizeOptions(optionLength, answer); //call on the function to create options a user select from
  answerLength = optionLength;
  correctAnswer = answer;

  optionsBox.innerHTML = ""; //clear all options (li element) before adding a new one
  answerBox.innerHTML = ""; //clear all options (li element) before adding a new one

  let i = 0;
  while (i < optionLength) {
    answerBox.innerHTML += `<li></li>`;
    i++;
  }

  optionsArray.forEach(
    (i) =>
      (optionsBox.innerHTML += `<li onclick="handleSelect(event)" >${i.toUpperCase()}</li>`)
  );

  console.log(optionsArray);
  riddleBox.innerHTML = riddles[num].question;
}

const startGame = (e) => {
  e.preventDefault();
  numOfRiddles = document.querySelector("input").value;
  if (numOfRiddles > 0 && !isNaN(numOfRiddles) && numOfRiddles < 99) {
    animatePage();
    pickRandomRiddles();
    displayRiddle(0);
  } else {
    // alert("please input a numeric value from 1 to 100");
    toastMessage("please input a numeric value from 1 to 99");
  }
};

startGameBtn.addEventListener("click", startGame);
