class Task {
    constructor({
    name,
    details,
    startTime,
    endTime,
    status
    }){
    this.name = name;
    this.details = details;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    }
    getHtml() {
        return `
            <li class="bg-white p-4 rounded shadow">
                <h3 class="text-lg font-semibold">${this.name}</h3>
                <p>${this.description}</p>
                <p>Inicio: ${this.startTime}</p>
                <p>Fin: ${this.endTime}</p>
                <p>Estado: ${this.status}</p>
            </li>
        `;
    }
}

const task = new Task({
    name : name,
    details: details,
    startTime: startTime,
    endTime: endTime,
    status: status
});

class TaskManager {
    constructor() {
        this.tasks = {
            pendiente: [],
            enProceso: [],
            hecha: []
        };
    }

    addTask(task) {
        this.tasks[task.status].push(task);
    }

    removeTask(task) {
        const index = this.tasks[task.status].indexOf(task);
        if (index !== -1) {
            this.tasks[task.status].splice(index, 1);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const taskManager = new TaskManager();
    const todoList = document.getElementById("todoList");
    const inProgressList = document.getElementById("inProgressList");
    const doneList = document.getElementById("doneList");
    const addTaskButton = document.getElementById("addTaskButton");

    addTaskButton.addEventListener("click", function () {
        const taskName = document.getElementById("taskName").value;
        const taskDescription = document.getElementById("taskDescription").value;
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;
        const taskStatus = document.getElementById("taskStatus").value;

        const task = new Task(taskName, taskDescription, startTime, endTime, taskStatus);

        // Add the task to task manager
        taskManager.addTask(task);

        // Add task to HTML
        const taskList = document.getElementById(`${taskStatus}List`);
        taskList.innerHTML += task.getHtml();

        // Clear fields after adding tasks
        document.getElementById("taskName").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("startTime").value = "";
        document.getElementById("endTime").value = "";
        document.getElementById("taskStatus").value = "pendiente";
    });
});
