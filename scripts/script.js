/*
Task to-do
    
Features:

1. Data should be stored even after refresh : Local Storage (Done)
2. Delete the card 
3. Edit the card
4. Open the card
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
        htmlTaskContent({...input, id })
    );
    state.taskList.push({...input, id });
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