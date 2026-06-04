import { setModal } from "./modal.js";
import { getPost } from "./home.js";
const data = await getPost()

export function checkToken () {
    const token = localStorage.getItem("token");
    if (!token){
        return false
    } else {
        return true;
    }
}

export function getToken() {
    return localStorage.getItem("token");
}

const modal = document.getElementById('modal');
const closeBtn = document.querySelector(".close-btn");
const openBtn = document.querySelector("#portfolio > div.titleSection > div");

openBtn.addEventListener("click", () => {
    //Actualisation par defaut de la modal
    const contentDelete = document.querySelector(".modalDelete")
    contentDelete.style.display = "block"
    
    const contentAdd = document.querySelector(".modalAdd")
    contentAdd.style.display = "none"

    modal.classList.add('open');
})

closeBtn.addEventListener("click", () => {
    modal.classList.remove('open');
})