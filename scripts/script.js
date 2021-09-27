/*
Task::
1. On save changes card should be displayed 

Task to-do
1. Features
2. Data should be stored even after refresh : Local Storage (Done)
3. Delete the card (Done)
4. Edit the card
5. Open the card
*/

const taskContainer = document.querySelector('.task__container');

let globalStore = [];

const generateNewCard = (taskData) =>
    `
<div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card ">
        <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" id=${taskData.id} class="btn btn-outline-success w-auto">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button type="button" class="btn btn-outline-danger w-auto ">
                <i class="fas fa-trash-alt "></i>
            </button>
        </div>
        <img src=${taskData.imageUrl} alt="Task Image" class="card-img-top rounded-3 p-2" />

        <div class="card-body">
            <h5 class="card-title">${taskData.taskTitle}</h5>
            <p class="card-text">${taskData.taskDescription}</p>
            <a href="#" class="btn btn-primary btn__style btn__base">${taskData.taskType}</a>
        </div>
        <div class="card-footer">
            <button type="button " class="btn btn-outline-dark float-end btn__base btn__open">
                Open Task
            </button>
        </div>
    </div>
</div>

`

const handleSubmit = () => {
    const taskData = {
        id: `${Date.now()}`, // unique number for any id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    taskContainer.insertAdjacentHTML(
        "beforeend",
        generateNewCard(taskData)
    );

    globalStore.push(taskData);
}