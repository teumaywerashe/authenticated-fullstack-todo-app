// DOM elements
const taskIdDOM = document.getElementById('edit-task-id');
const taskNameDOM = document.getElementById('edit-task-name');
const taskDateDOM = document.getElementById('edit-task-date');
const editBtn = document.querySelector('.form-group-button');

// Get task ID from URL
const params = window.location.search;
const id = new URLSearchParams(params).get('id');

// Get token from localStorage
const token = localStorage.getItem('token'); // make sure token is stored

// Fetch task details
const getTask = async() => {
    try {
        const { data } = await axios.get(`/api/v1/lists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!data) {
            alert('No task found with that ID');
            return;
        }

        const { name, dueDate } = data;

        // Update DOM
        taskIdDOM.textContent = id; // if it's a span/div
        taskNameDOM.value = name;
        taskDateDOM.value = new Date(dueDate).toISOString().split('T')[0]; // format YYYY-MM-DD

    } catch (error) {
        console.log(error.message);
        alert('Failed to fetch task. Make sure you are logged in.');
    }
};

getTask();

// Edit task
editBtn.addEventListener('click', async(e) => {
    e.preventDefault();

    try {
        const taskName = taskNameDOM.value;
        const date = taskDateDOM.value;

        const { data } = await axios.patch(`/api/v1/lists/${id}`, {
            name: taskName,
            dueDate: date
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { name, dueDate } = data;

        taskNameDOM.value = name;
        taskDateDOM.value = new Date(dueDate).toISOString().split('T')[0];

        alert('Task updated successfully!');

    } catch (error) {
        console.log(error.message);
        alert('Failed to update task. Make sure you are logged in.');
    }
});