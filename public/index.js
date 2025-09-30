// ---------------- DOM ELEMENTS ----------------
const LoginEmailDOM = document.getElementById('login-email');
const loginPasswordDOM = document.getElementById('login-password');
const loginBtnDOM = document.querySelector('.login-btn');
const loginConfirmDOM = document.getElementById('login-confirm');

const signupUsernameDOM = document.getElementById('signup-username');
const signupEmailDOM = document.getElementById('signup-email');
const signupPasswordDOM = document.getElementById('signup-password');
const signupBtnDOM = document.querySelector('.signup-btn');
const signupConfirmDOM = document.getElementById('signup-confirm');

// ---------------- TOGGLE LOGIN/SIGNUP ----------------
function showSignup() {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("signup-box").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("signup-box").classList.add("hidden");
    document.getElementById("login-box").classList.remove("hidden");
}

// ---------------- SIGNUP ----------------

signupBtnDOM.addEventListener('click', async(e) => {
    e.preventDefault();

    const name = signupUsernameDOM.value;
    const email = signupEmailDOM.value;
    const password = signupPasswordDOM.value;

    try {
        const response = await axios.post('/api/v1/auth/register', {
            name,
            email,
            password
        });

        // Save the token returned from backend
        const token = response.data.token;
        localStorage.setItem('token', token);

        // Redirect to todos page
        window.location.href = 'todo.html';
    } catch (err) {
        if (err.response && err.response.status === 401) {
            alert('Invalid email or password');
        } else {
            alert('Something went wrong. Try again later.');
        }
    }
});

// ---------------- LOGIN ----------------
loginBtnDOM.addEventListener('click', async(e) => {
    e.preventDefault();

    const email = LoginEmailDOM.value;
    const password = loginPasswordDOM.value;

    try {
        const response = await axios.post('/api/v1/auth/login', {
            email,
            password
        });

        // Save the token returned from backend
        const token = response.data.token;
        console.log(response); // full Axios response
        console.log(response.data); // should include { name, token }


        localStorage.setItem('token', token);

        // Redirect to todos page
        window.location.href = 'todo.html';
    } catch (err) {

        if (err.response && err.response.status === 401) {
            alert('Invalid email or password');
        } else {
            alert('Something went wrong. Try again later.');
        }
    }
});

// ---------------- EXAMPLE: USING TOKEN FOR API CALL ----------------
// Later, for protected routes:
// async function getTodos() {
//     const token = localStorage.getItem('token');
//     if (!token) return alert('Not logged in');

//     try {
//         const response = await axios.get('/api/v1/todos', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         console.log(response.data); // user's todos only
//     } catch (err) {

//     }
// }