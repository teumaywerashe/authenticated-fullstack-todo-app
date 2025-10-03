const nameDOM = document.querySelector('.text-input')
const dueDateDOM = document.querySelector('.date-input')
const container = document.querySelector('.display-container')
const addBtn = document.querySelector('.add-button')
const logoutBtn = document.getElementById('logout-btn')

// const profileUserName = document.getElementById('user-name')
// const username = localStorage.getItem('username')
// profileUserName.textContent = username



document.addEventListener('DOMContentLoaded', () => {
    const profileUserName = document.getElementById('user-name');
    const username = localStorage.getItem('username');

    if (profileUserName && username) {
        profileUserName.textContent = username;
    }

    document.getElementById('profile-photo').alt = username.charAt(0)
});

const display = async() => {
    try {
        const token = localStorage.getItem('token')
        if (!token) return alert('Not logged in')

        const { data } = await axios.get('/api/v1/lists', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (data.length < 1) {
            container.innerHTML = `<p>no to do to show </p>`
            return
        }

        const allToDoList = data.map((task) => {
            const { name, dueDate, _id: taskID } = task
            return `
                <p>${name}</p>  
                <p>${dueDate}</p> 
                <div>
                    <a href="task.html?id=${taskID}" class="edit-link">
                        <i class="fas fa-edit edit-button"></i>
                    </a>
                    <i class="fas fa-trash delete-button" data-id='${taskID}'></i>
                </div>
            `
        }).join('')

        container.innerHTML = allToDoList

    } catch (error) {
        console.log(error)
    }
}

addBtn.addEventListener('click', async(e) => {
    e.preventDefault()
    const name = nameDOM.value
    const dueDate = dueDateDOM.value || new Date().toISOString()

    nameDOM.value = ''
    dueDateDOM.value = ''

    try {
        const token = localStorage.getItem('token')
        if (!token) return alert('Not logged in')

        await axios.post('/api/v1/lists', { name, dueDate }, {
            headers: { Authorization: `Bearer ${token}` }
        })

        display()
    } catch (error) {
        console.log(error)
    }
})

container.addEventListener('click', async(e) => {
    if (e.target.classList.contains('delete-button')) {
        const id = e.target.dataset.id
        try {
            const token = localStorage.getItem('token')
            if (!token) return alert('Not logged in')

            await axios.delete(`/api/v1/lists/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            display()
        } catch (err) {
            console.log(err)
        }
    }
})


logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
})

display()