//Define UI Vars
const form = document.querySelector("#task-form"); //id
const taskList = document.querySelector(".collection"); //classname
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter"); //input
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners(); //khali declare kora arki

//Load all event listeners
function loadEventListeners() {
  //DOM LOAD EVENTS
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //Fitler Task Events
  filter.addEventListener("keyup", filterTasks); //key tip deyar por release korlei trigger
}
//Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //since tasks is a loop
  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement("li"); //the <li></li> is inside li variable
    //Add class
    li.className = "collection-item";
    //Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement("a");
    //Add class to the <a> tag
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li); //ul e dhukalam
  });
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
  //Store in LS
  storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = "";
  e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();

      //Remove from the localstorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
//remove From LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  } //extract kore anlam
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1); //i dont know what this is
      //index is basically the position we want to add or delete
      // and the next argument tells us how many numbers we want to delete
      // if the argument is zero it means we want to ADD
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  //localstorage theke direct remove korte parbo na since JSON format e ase
}
//Clear Tasks
function clearTasks() {
  //taskList.innerHTML='';
  //Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Clear From LS
  clearTasksFromLocalStorage();
}
//Clear Tasks From LS
function clearTasksFromLocalStorage(params) {
  localStorage.clear();
}
//Filter Tasks
function filterTasks(e) {
  //quite clever
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
