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
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //Fitler Task Events
  filter.addEventListener("keyup", filterTasks); //key tip deyar por release korlei trigger
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

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}
//Clear Tasks
function clearTasks() {
  //taskList.innerHTML='';

  //Faster
  while (taskList.firstChild) {
    //while there is still a first child
    taskList.removeChild(taskList.firstChild); //not complicated at all
  }
}
//Filter Tasks
function filterTasks(e) {
  //quite clever
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    //we can use foreach since querySelectorAll returns a nodelist
    //jodi getElementsByClass dile HTML collection return korto jeta array teh convert kortam amra
    const item = task.firstChild.textContent; //whatever text is inside the element
    //firstChild is a way to traverse through the DOM
    if (item.toLowerCase().indexOf(text) != -1) {
      //ektu ghuray bolse arki
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
