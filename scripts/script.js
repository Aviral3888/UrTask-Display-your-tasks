/*
Task to-do
    
Features:

1. Data should be stored even after refresh : Local Storage (Done)
2. Delete the card (Done)
3. Edit the card (Done)
4. Open the card
5. Search the Card
*/

// For local Storage
const state = {
    taskList: [],
}

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

const htmlTaskContent = ({
        id,
        title,
        description,
        type,
        url
    }) =>
    `
<div class="col-lg-4 col-md-6 col-sm-12" id= ${id} key = ${id}>
    <div class="card shadow-sm task__card">
        <div class="card-header d-flex justify-content-end gap-2 task__card__header">
            <button 
                type="button" 
                id=${id} 
                class="btn btn-outline-success w-auto"
                onclick = "editTask.apply(this, arguments)"
            >
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button 
                type="button" 
                id=${id}
                class="btn btn-outline-danger w-auto" 
                onclick = "deleteTask.apply(this, arguments)"
            >
                <i class="fas fa-trash-alt "></i>
            </button>
        </div>

        <div class="card-body">
            <img src=${url} alt="Task Image" class="card-img-top rounded-3 p-2" />

            <h5 class="task__card__title">${title}</h5>
            <p class="description">${description}</p>
            <div class="tags text-white d-flex flex-wrap">
                <span class="badge bg-primary m-1">${type}</span>
            </div>
        </div>
        <div class="card-footer">
            <button 
                type="button" 
                class="btn btn-outline-dark float-end btn__base btn__open"
                data-bs-toggle="modal"
                data-bs-target="#showTask"
                onclick = "openTask.apply(this, arguments)"
                id=${id}
            >
                Open Task
            </button>
        </div>
    </div>
</div>

`

// Modal Box

const htmlModalContent = ({ id, title, description, url }) => {

        const date = new Date(parseInt(id));

        return `
            <div id=${id}>
            <img 
                src = ${url || `https://images.unsplash.com/photo-1572214350916-571eac7bfced?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80`}"
                alt = "Card Image"
                class = "img-fluid place__holder__image mb-3"
            />
            <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
            <h2 class="my-3">${title}</h2>
            <p class="lead">${description} </p>
            </div>
    `;
}

// Open Modal Box

const openTask = (e) => {

    if (!e) e = window.event;

    const getTask = state.taskList.filter(({ id }) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask[0]);

}

const handleSubmit = (e) => {
    const id = `${Date.now()}`; // unique number for any id
    const input = {
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("taskTitle").value,
        description: document.getElementById("taskDescription").value,
        type: document.getElementById("Tags").value,
    };

    taskContents.insertAdjacentHTML(
        "beforeend",
        htmlTaskContent({ ...input, id })
    );
    state.taskList.push({ ...input, id });
    updateLocalStorage();
}

// LocalStorage Features 

const updateLocalStorage = () => {

    localStorage.setItem("tasky", JSON.stringify({
        tasks: state.taskList
    }));

}

const loadInitialData = () => {

    const localStorageCopy = JSON.parse(localStorage.tasky);

    if (localStorageCopy)
        state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardData) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });

};

// Delete Card Feature

const deleteTask = (e) => {
    if (!e) e = window.event;

    const targetID = e.target.id;
    const type = e.target.tagName;
    const removeTask = state.taskList.filter(({ id }) =>
        id !== targetID
    );
    state.taskList = removeTask;

    updateLocalStorage();

    if (type === "BUTTON") {
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        )
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
    );

};

// Edit Task 

const editTask = (e) => {
    if (!e) e = window.event;
    const targetID = e.target.id;
    const type = e.target.tagName;

    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;

    if (type === "BUTTON") {
        parentNode = e.target.parentNode.parentNode;
    } else {
        parentNode = e.target.parentNode.parentNode.parentNode;
    }

    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDescription = parentNode.childNodes[3].childNodes[5];
    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    submitButton = parentNode.childNodes[5].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");

    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
    submitButton.innerHTML = "Save Changes";

}

const saveEdit = (e) => {
    if (!e) e = window.event;
    const targetID = e.target.id;
    const parentNode = e.target.parentNode.parentNode;
    // console.log(parentNode.childNodes);

    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const submitButton = parentNode.childNodes[5].childNodes[1];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];

    const updateData = {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML,
    }

    let stateCopy = state.taskList;

    stateCopy = stateCopy.map((task) =>
        task.id === targetID ? {
            id: task.id,
            title: updateData.taskTitle,
            description: updateData.taskDescription,
            type: updateData.taskType,
            url: task.url,
        } :
            task
    );

    state.taskList = stateCopy;

    updateLocalStorage();

    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");
    submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#showTask");
    submitButton.innerHTML = "Open Task";
}