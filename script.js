/*
Task to-do
1. Features
2. Data should be stored even after refresh : Local Storage
3. Delete the card 
4. Edit the card
5. Open the card
*/

const taskContainer = document.querySelector('.task__container');

const globalStore = [];

const generateNewCard = (taskData) => `
<div class="col-lg-4 col-md-6 col-sm-12" id=${taskData.id}>
    <div class="card">
        <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button type="button" class="btn btn-outline-danger">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
        <img src=${taskData.imageUrl} class="card-img-top p-2 rounded-3" alt="..." />

        <div class="card-body">
            <h5 class="card-title">${taskData.taskTitle}</h5>
            <p class="card-text">${taskData.taskDescription}</p>
            <a href="#" class="btn btn-primary">${taskData.taskType}</a>
        </div>
    
        <div class="card-footer">
            <button type="button" class="btn btn-outline-primary float-end">Open Task </button>
        </div>
    </div>
</div> 
`

const loadInitialCardData = () => {

    // Get items from localstorage using ID tasky
    const getCardData = localStorage.getItem("tasky");

    // convert the string data into normal object data
    const { cards } = JSON.parse(getCardData);

    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

        globalStore.push(cardObject);

    })

};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, // unique number for any id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);

    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));


};