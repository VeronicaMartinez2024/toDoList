class Task {
    constructor({
        name,
        details = "Detalles no disponibles",
        startTime,
        endTime,
        status
    }) {
        this.name = name;
        this.details = details;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
    }

    getHtml() {
        
        return `
            <li draggable="true">
                <h3>${this.name}</h3>
                <p>${this.details}</p>
                <p>Inicio: ${this.startTime}</p>
                <p>Fin: ${this.endTime}</p>
                <p>Estado: ${this.status}</p>
            </li>
        `;
    }
}

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
}

document.addEventListener("DOMContentLoaded", function () {
    const taskManager = new TaskManager();
    const addTaskButton = document.getElementById("addTaskButton");

    addTaskButton.addEventListener("click", function () {
        const taskName = document.getElementById("taskName").value;
        const taskDescription = document.getElementById("taskDescription").value;
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;
        const taskStatus = document.getElementById("taskStatus").value;

        const task = new Task({
            name: taskName,
            details: taskDescription,
            startTime,
            endTime,
            status: taskStatus
        });

        // Add the task to the task manager
        taskManager.addTask(task);

        // Add task to HTML
        const taskList = document.getElementById(task.status + "List");
        taskList.insertAdjacentHTML("beforeend", task.getHtml());

        // Clear fields after adding tasks
        document.getElementById("taskName").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("startTime").value = "";
        document.getElementById("endTime").value = "";
        document.getElementById("taskStatus").value = "pendiente";
    });
    document.addEventListener("DOMContentLoaded", function () {
        const tasks = document.querySelectorAll(".draggable");
        const columns = document.querySelectorAll(".droppable");
    
        let draggedItem = null;
    
        tasks.forEach((task) => {
            task.addEventListener("dragstart", () => {
                draggedItem = task;
                setTimeout(() => {
                    task.style.display = "none";
                }, 0);
            });
    
            task.addEventListener("dragend", () => {
                setTimeout(() => {
                    draggedItem.style.display = "block";
                    draggedItem = null;
                }, 0);
            });
        });
    
        columns.forEach((column) => {
            column.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
    
            column.addEventListener("dragenter", (e) => {
                e.preventDefault();
                column.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            });
    
            column.addEventListener("dragleave", () => {
                column.style.backgroundColor = "transparent";
            });
    
            column.addEventListener("drop", () => {
                column.appendChild(draggedItem);
                column.style.backgroundColor = "transparent";
            });
        });
    });    
});