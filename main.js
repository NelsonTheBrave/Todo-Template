// ARRAYS TO USE FOR SAVING AND PRESENTING INFORMATION
const itemsRemaining = [0, 0];
const itemsNames = [];

// SELECTORS FOR CLICKABLE INTERACTIONS
document.querySelector("button").addEventListener("click", submit);
document.querySelector("ul").addEventListener("click", checkOrDelete);
const warningText = document.querySelector("#warning");

// MAIN EVENT HANDLERS FOR CLICKING ON BUTTONS
function submit(e) {
  e.preventDefault();
  let input = document.querySelector("input");
  if (input.value != "") {
    addTodo(input.value);
    input.value = "";
    warningText.innerText = "";
    warningText.classList.remove("blink");
    console.log("removed");
  } else {
    warningText.innerText = "Input must not be empty";
    warningText.classList.add("blink");
  }
}

function checkOrDelete(e) {
  if (e.target.className == "listText") checkTodo(e);
  if (e.target.name == "deleteButton") deleteTodo(e);
}

// HELPER FUNCTIONS
function addTodo(todo) {
  itemsNames.push(todo);
  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  li.id = todo; //To know which <li> tag to delete later on
  li.innerHTML = `
        <span class="listText"></span>
        <button name="deleteButton" class="deleteBtn"></button>
    `;
  li.firstElementChild.innerText = todo; // Had to make separate code to add text to <span> to avoid possibility of adding HTML
  ul.appendChild(li);
  update();
}

function checkTodo(e) {
  let item = e.target.parentNode;
  if (item.style.textDecoration == "line-through") {
    item.style.textDecoration = "none";
    item.style.color = "black";
    itemsRemaining[0]--;
  } else {
    item.style.textDecoration = "line-through";
    item.style.color = "gray";
    itemsRemaining[0]++;
  }
  update();
}

function deleteTodo(e) {
  let item = e.target.parentNode;
  for (let i = 0; i < itemsNames.length; i++) {
    if (itemsNames[i] == item.id) itemsNames.splice(i, 1);
  }
  if (item.style.textDecoration == "line-through") itemsRemaining[0]--;
  item.remove();
  update();
}

function update() {
  let listLength = document.querySelector("ul");
  itemsRemaining[1] = listLength.childNodes.length;
  let counter = document.querySelector("#counter");
  counter.innerHTML = itemsRemaining[0] + " completed";
  console.log(itemsNames);
}
