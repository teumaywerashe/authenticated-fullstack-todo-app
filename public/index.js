const LoginEmailDOM = document.getElementById("login-email");
const loginPasswordDOM = document.getElementById("login-password");
const loginBtnDOM = document.querySelector(".login-btn");
const loginConfirmDOM = document.getElementById("login-confirm");

const signupUsernameDOM = document.getElementById("signup-username");
const signupEmailDOM = document.getElementById("signup-email");
const signupPasswordDOM = document.getElementById("signup-password");
const signupBtnDOM = document.querySelector(".signup-btn");
const signupConfirmDOM = document.getElementById("signup-confirm");

const loginContainer = document.getElementById("login");
const sigupContainer = document.getElementById("signup");

function showSignup() {
    console.log(sigupContainer);
    loginContainer.classList.add("hidden");
    sigupContainer.classList.remove("hidden");
}

function showLogin() {
    console.log(loginContainer);
    sigupContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
}

signupBtnDOM.addEventListener("click", async(e) => {
    e.preventDefault();

    const name = signupUsernameDOM.value;
    const email = signupEmailDOM.value;
    const password = signupPasswordDOM.value;

    try {
        const response = await axios.post("/api/v1/auth/register", {
            name,
            email,
            password,
        });

        const token = response.data.token;
        const username = response.data.name;
        console.log(username);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        window.location.href = "todo.html";
    } catch (err) {
        if (err.response && err.response.status === 401) {
            alert("Invalid email or password");
        } else {
            alert("Something went wrong. Try again later.");
        }
    }
});

loginBtnDOM.addEventListener("click", async(e) => {
    e.preventDefault();

    const email = LoginEmailDOM.value;
    const password = loginPasswordDOM.value;

    try {
        const response = await axios.post("/api/v1/auth/login", {
            email,
            password,
        });

        const token = response.data.token;

        const username = response.data.name;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        window.location.href = "todo.html";
    } catch (err) {
        if (err.response && err.response.status === 401) {
            alert("Invalid email or password");
        } else {
            alert("Something went wrong. Try again later.");
        }
    }
});