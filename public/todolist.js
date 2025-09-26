const nameDOM = document.querySelector('.text-input')
const dueDateDOM = document.querySelector('.date-input')
const container = document.querySelector('.display-container')
const addBtn = document.querySelector('.add-button')
const deleteBtn = document.querySelectorAll('.delete-button')
const editBtn = document.querySelector('.edit-button')
addBtn.addEventListener('click', async(e) => {
    e.preventDefault()
    const name = nameDOM.value
    nameDOM.value = ''
    const dueDate = dueDateDOM.value === '' ? Date.now() : dueDateDOM.value;
    dueDateDOM.value = ''
    try {

        await axios.post('/api/v1/lists', {
            name: name,
            dueDate: dueDate
        })
        display()
    } catch (error) {
        console.log(error);
    }
})

const display = async() => {
        try {
            const { data } = await axios.get('/api/v1/lists')

            if (data.length < 1) {
                container.innerHTML = `<p>empty list</p>`
                return
            }
            const allToDoList = data.map((task) => {
                const { name, dueDate, _id: taskID } = task
                return `<p>${name}</p>  
         <p>${dueDate}</p>
         <div><a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit edit-button"></i>
</a>
<i class="fas fa-trash delete-button" data-id='${taskID}' ></i></div>`

            }).join('')
            container.innerHTML = allToDoList
        } catch (error) {
            console.log(error);
        }

    }
    // const container = document.getElementById('task-list') 
    // parent of all tasks

container.addEventListener('click', async(e) => {
    if (e.target.classList.contains('delete-button')) {
        const id = e.target.dataset.id
        try {
            await axios.delete(`/api/v1/lists/${id}`)
            display() // refresh the task list
        } catch (err) {
            console.log(err)
        }
    }
})

display();