const taskIdDOM = document.getElementById('edit-task-id')
const taskNameDOM = document.getElementById('edit-task-name')
const taskDateDOM = document.getElementById('edit-task-date')
const editBtn = document.querySelector('.form-group-button')
const params = window.location.search
const id = new URLSearchParams(params).get('id')

const getTask = async() => {
    try {
        const { data } = await axios.get(`/api/v1/lists/${id}`)
        if (!data) {
            alert('no task with that id')
        }
        const { name, dueDate } = data
        taskIdDOM.textContent = id
        taskNameDOM.value = name
        taskDateDOM.value = dueDate
    } catch (error) {
        console.log(error.message);
    }

}
getTask()


editBtn.addEventListener('click', async(e) => {
    // e.preventDefault()
    try {
        const taskName = taskNameDOM.value
        const date = taskDateDOM.value
        const { data } = await axios.patch(`/api/v1/lists/${id}`, {
            name: taskName,
            dueDate: date
        })
        const { name, dueDate } = data
        console.log(name, dueDate);
        taskNameDOM.value = name
        taskDateDOM.value = dueDate
    } catch (error) {
        console.log(error.message);
    }

})