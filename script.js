let form = document.querySelector("#form"),
  inputName = document.querySelector("#name"),
  inputNumber = document.querySelector("#number"),
  inputScore = document.querySelector("#score"),
  inputSubmit = document.querySelector("#submit");

// Adding event listener for getting the data
inputSubmit.addEventListener("click", newData);

function newData(event) {
  event.preventDefault();
  // Getting the values
  let nameValue = inputName.value,
    numberValue = inputNumber.value,
    scoreValue = inputScore.value;

  // creating a new row and adding it to the table
  addRowToTable({ name: nameValue, number: numberValue, score: scoreValue });

  // Adding data to Local Storage
  addToLS({
    name: nameValue,
    number: numberValue,
    score: scoreValue,
    id: Math.random(),
  });

  // Reset form inputs after submission
  form.reset();
}

function addRowToTable(data) {
  // creating the form row
  let tr = document.createElement("tr");

  // creating individual cells for each data
  let tdName = document.createElement("td");
  let tdNumber = document.createElement("td");
  let tdScore = document.createElement("td");

  // Adding data to each cell
  tdName.textContent = data.name;
  tdNumber.textContent = data.number;
  tdScore.textContent = data.score;

  // Append cells to the row
  tr.appendChild(tdName);
  tr.appendChild(tdNumber);
  tr.appendChild(tdScore);

  // Append the row to the table
  document.querySelector("table").appendChild(tr);
}

function getLS() {
  let data;
  let lsData = localStorage.getItem("data");
  if (lsData == null) {
    data = [];
  } else {
    data = JSON.parse(lsData);
  }
  return data;
}

function addToLS(data) {
  let oldData = getLS();
  oldData.push(data);
  localStorage.setItem("data", JSON.stringify(oldData));
}

// Function to load data from LS and display in table
function loadFromLS() {
  let lsData = getLS();
  lsData.forEach(function(item) {
    addRowToTable(item); // Add each item to the table
  });
}

// Initialize Local Storage with empty array if not already set
if (localStorage.getItem("data") === null) {
  localStorage.setItem("data", "[]");
}

// Load data from Local Storage when the page is loaded
document.addEventListener("DOMContentLoaded", loadFromLS);
