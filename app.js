//Define UI Vars
const form = document.querySelector("#task-form"); //id
const taskList = document.querySelector(".collection"); //classname
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners(); //khali declare kora arki

//Load all event listeners
function loadEventListeners() {
  form.addEventListener("submit", addTask);
}

//Add Tasks
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  //Create li element
  const li = document.createElement("li"); //the <li></li> is inside li variable
  //Add class
  li.className = "collection-item";
  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement("a");
  //Add class to the <a> tag
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);

  taskList.appendChild(li); //no quotes

  //clear input
  taskInput.value = ""; //input ta clear kore dilam

  e.preventDefault();
}
