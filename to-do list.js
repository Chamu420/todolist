document.addEventListener("DOMContentLoaded" ,() => {
    const storedtask = JSON.parse(localStorage.getItem('tasks'))
    if (storedtask){
        storedtask.forEach((task) => tasks.push(task))
        updateTasklist();
        updatestats();
    }
    
});

let  tasks = [];
const savetask = () => {
    localStorage.setItem('tasks' , JSON.stringify(tasks))
}

const addtask = () => {
  const taskInput = document.getElementById('taskInput')  
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({text:text, completed: false});
    taskInput.value = "";
    updateTasklist();
    updatestats();
    savetask();
  }
 
};
const toggletaskcomplete = (index) => {
tasks[index].completed = !tasks[index].completed;
updateTasklist();
updatestats();
savetask();
};
const deletetask = (index) => {
    tasks.splice(index , 1);
    updateTasklist();  
    updatestats(); 
    savetask();
};
const edittask = (index) => {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text
    tasks.splice(index , 1)
    updateTasklist();
    updatestats();
    savetask();
}
const updatestats = () => {
    const completedtasks = tasks. filter((task) => task.completed).length;
    const totaltask = tasks.length;
    const progress = (completedtasks / totaltask) *100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%` ;
    document.getElementById ("number").innerText=`${completedtasks}/${totaltask}`;
    if(tasks.length && completedtasks === totaltask) {
        blasttask();
    }
};
const  updateTasklist = ()=> {
    const tasklist = document.getElementById("task-list");
    tasklist.innerHTML = "";
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML =`
        <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : ""
        } />
        <p>${task.text}</p>
        </div>
        <div class="icons">
        <button id="btn-edit"  onClick="edittask(${index})" >
        <i class="fa-regular fa-pen-to-square" alt="edit"></i>
        </button> 
        <button id="btn-delete" onClick="deletetask(${index})" >
        <i class="fa-solid fas fa-trash"></i>
        </button>
        </div>
        </div>
        `;
        listItem.addEventListener("change", () => toggletaskcomplete(index));
        tasklist.append(listItem);
    });
};
document.getElementById('newtask').addEventListener('click', function(e){
    e.preventDefault();
    addtask();
});
const blasttask = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
