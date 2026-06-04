const url = "http://localhost:5678/api/users/login"
const buttonLogin = document.getElementById('loginPage');
const email = document.getElementById('email');
const password = document.getElementById('password')

buttonLogin.addEventListener("click", (e) => {
    e.preventDefault(),
    getUsers();
})

async function getUsers() {
    console.log(email.value);
    console.log(password.value);

    let user = {
    email : email.value,
    password : password.value
    //email : "sophie.bluel@test.tld",
    //password : "S0phie"
    }

    let response = await fetch (url , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then((response) => response.json())
    .then((result) => {
        if (result && result.token) {
            localStorage.setItem("token", result.token)
            document.location.href = "./index.html"
            return result
        } else {
            const erreurMessage = document.getElementById("wrongPassword")
            erreurMessage.style.display="flex"
        }
    })
    .catch(() => {
        alert ("Erreur de connexion. Veuillez réssayer")
    })
}

