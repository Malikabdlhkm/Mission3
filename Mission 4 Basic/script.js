document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

document.getElementById('add-task-btn').addEventListener('click', function() {
    addTask();
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const priorityInput = document.getElementById('priority-input');
    const dateInput = document.getElementById('date-input');
    
    const taskText = taskInput.value.trim();
    const priorityText = priorityInput.value.trim();
    const dateText = dateInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById('task-list');
        const newTask = document.createElement('li');
        
        newTask.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText} - Prioritas: ${priorityText} - Tanggal: ${dateText}</span>
            <button class="remove-btn">Hapus</button>
        `;
        
        newTask.querySelector('.remove-btn').addEventListener('click', function() {
            taskList.removeChild(newTask);
            saveTasks(); 
        });

        newTask.querySelector('.checkbox').addEventListener('change', function() {
            if (this.checked) {
                moveTaskToDone(newTask);
            }
        });

        taskList.appendChild(newTask);

        saveTasks(); 

        taskInput.value = "";
        priorityInput.value = "";
        dateInput.value = "";
    }
}

function moveTaskToDone(task) {
    const doneList = document.getElementById('done-list');
    const taskList = document.getElementById('task-list');
    
    task.classList.add('done');
    task.querySelector('.checkbox').disabled = true; 
    taskList.removeChild(task);
    doneList.appendChild(task);

    task.querySelector('.remove-btn').addEventListener('click', function() {
        doneList.removeChild(task);
        saveTasks(); 
    });

    saveTasks(); 
}

function saveTasks() {
    const tasks = [];
    const doneTasks = [];

    document.querySelectorAll('#task-list li').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            done: false
        });
    });

    document.querySelectorAll('#done-list li').forEach(task => {
        doneTasks.push({
            text: task.querySelector('span').textContent,
            done: true
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];

    const taskList = document.getElementById('task-list');
    const doneList = document.getElementById('done-list');

    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${task.text}</span>
            <button class="remove-btn">Hapus</button>
        `;
        
        newTask.querySelector('.remove-btn').addEventListener('click', function() {
            taskList.removeChild(newTask);
            saveTasks();
        });

        newTask.querySelector('.checkbox').addEventListener('change', function() {
            if (this.checked) {
                moveTaskToDone(newTask);
            }
        });

        taskList.appendChild(newTask);
    });

    doneTasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.classList.add('done');
        newTask.innerHTML = `
            <input type="checkbox" class="checkbox" disabled>
            <span>${task.text}</span>
            <button class="remove-btn">Hapus</button>
        `;
        
        newTask.querySelector('.remove-btn').addEventListener('click', function() {
            doneList.removeChild(newTask);
            saveTasks();
        });

        doneList.appendChild(newTask);
    });
}
