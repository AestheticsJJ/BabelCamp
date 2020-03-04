const todoList = document.querySelector('#TaskList') as HTMLUListElement;
const allTasksButton = document.querySelector('#allButton') as HTMLButtonElement;
const pendingsButton = document.querySelector('#pendingButton') as HTMLButtonElement;
const completedButton = document.querySelector('#completedButton') as HTMLButtonElement;
const taskInput = document.querySelector('#addTaskInput') as HTMLInputElement;
const tasksLeft = document.querySelector('#tasksLeft') as HTMLParagraphElement;
const removalDiv = document.querySelector('.modal-container') as HTMLDivElement;
const taskToRemoveName = document.querySelector('#taskToRemoveName') as HTMLParagraphElement;
const confirmRemovalButton = document.querySelector('#ConfirmRemoval') as HTMLButtonElement;
const denyRemovalButton = document.querySelector('#DenyRemoval') as HTMLButtonElement;

let taskToRemove : HTMLLIElement;
let tasksLeftnumber : number = 0;

taskInput.focus();

// functions
function addJsToImportedData(){
    for(let i = 0; i < todoList.childElementCount; i++){
        // Add removal functionality
        let binIcon : HTMLElement = todoList.children[i].getElementsByTagName('i')[0];
        binIcon.addEventListener('click', () => 
            displayRemovalConfirmation(todoList.children[i] as HTMLLIElement,
                 todoList.children[i].getElementsByTagName('span')[0].innerHTML));

        // Add check functionality
        let checkBox : HTMLInputElement = todoList.children[i].getElementsByTagName('input')[0];
        checkBox.addEventListener('click', () => checkTask(checkBox));
    }
}

function updateTasksPending(){
    tasksLeft.innerHTML = "Quedan " + tasksLeftnumber + " tareas";
}

function displayRemovalConfirmation(targetTask : HTMLLIElement, text: string){
    taskToRemoveName.innerHTML = text;
    taskToRemove = targetTask;
    removalDiv.className = 'modal-container open';
}

function hideRemovalConfirmation(){
    taskToRemoveName.innerHTML = 'Una tarea para eliminar (default)';
    taskToRemove = null;
    removalDiv.className = 'modal-container';
}

function checkTask(box : HTMLInputElement){
    box.checked ? tasksLeftnumber -= +!+[] : tasksLeftnumber += +!+[];
    updateTasksPending();
}

function addTask(eventTarget : HTMLInputElement){
    let li=document.createElement('li');
    let li_div=document.createElement('div');
    let li_input=document.createElement('input');
    let li_span=document.createElement('span');
    let li_i= document.createElement('i');
    let taskName = eventTarget.value;

    li_i.className = 'material-icons btn-delete';
    li_i.innerHTML = 'delete_outline';
    li_i.addEventListener('click', () => displayRemovalConfirmation(li, taskName));
    li_span.innerHTML = taskName;
    li_input.type = 'checkbox';
    li_input.addEventListener('click', () => checkTask(li_input));

    li_div.appendChild(li_input);
    li_div.appendChild(li_span);
    li.appendChild(li_div);
    li.appendChild(li_i);

    todoList.appendChild(li);
    localStorage.setItem('todoList', todoList.innerHTML);

    tasksLeftnumber += +!+[];
    updateTasksPending();

    eventTarget.value = '';
    eventTarget.focus();
}

function showPendingTasks(){
    pendingsButton.disabled = true;
    completedButton.disabled = false;
    allTasksButton.disabled = false;

    for(let i = 0; i < todoList.childElementCount; i++){
        let taskStatus : HTMLInputElement = todoList.children[i].getElementsByTagName('input')[0];
        taskStatus.checked ? (todoList.children[i] as HTMLLIElement).style.display = "none" : (todoList.children[i] as HTMLLIElement).style.display = "";
    }
}

function showCompletedTasks(){
    pendingsButton.disabled = false;
    completedButton.disabled = true;
    allTasksButton.disabled = false;

    for(let i = 0; i < todoList.childElementCount; i++){
        let taskStatus : HTMLInputElement = todoList.children[i].getElementsByTagName('input')[0];
        taskStatus.checked ? (todoList.children[i] as HTMLLIElement).style.display = "" : (todoList.children[i] as HTMLLIElement).style.display = "none";
    }
}

function showAllTasks(){
    pendingsButton.disabled = false;
    completedButton.disabled = false;
    allTasksButton.disabled = true;

    for(let i = 0; i < todoList.childElementCount; i++){
        (todoList.children[i] as HTMLLIElement).style.display = "";
    }
}

// Events
taskInput.addEventListener('keydown', (e) => {
    if(e.keyCode == 13) addTask(e.target as HTMLInputElement);
})

confirmRemovalButton.addEventListener('click', () => {
    todoList.removeChild(taskToRemove);
    tasksLeftnumber -= +!+[];
    localStorage.setItem('todoList', todoList.innerHTML);
    updateTasksPending();
    hideRemovalConfirmation();
})

denyRemovalButton.addEventListener('click', () => hideRemovalConfirmation());

pendingsButton.addEventListener('click', () => showPendingTasks());

completedButton.addEventListener('click', () => showCompletedTasks());

allTasksButton.addEventListener('click', () => showAllTasks());


// retrieving info from localStorage

let retrievedData = localStorage.getItem('todoList');
if(retrievedData){
    todoList.innerHTML = retrievedData;
    tasksLeftnumber = todoList.childElementCount;
    // After retrieving the HTML, the event listeners of the elements are lost
    addJsToImportedData();
    updateTasksPending();
}