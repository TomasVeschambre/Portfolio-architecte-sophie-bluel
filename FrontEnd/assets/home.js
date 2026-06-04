import { checkToken } from "./utils.js";
const cats = await getCat()

if (checkToken()) {
    console.log("connected")
    const filterButton = document.querySelector("#portfolio > div.filter")
    filterButton.style.display="none"

    const modalButton = document.querySelector("#portfolio > div.titleSection > div")
    modalButton.style.display="flex"

    const editModeBar = document.querySelector("body > div")
    editModeBar.style.display="flex"

    const loginLink = document.getElementById("login")
    loginLink.style.display = 'none'

    const logoutLink = document.getElementById("logout")
    logoutLink.style.display = 'flex'
}


export async function getPost(){
    const url = "http://localhost:5678/api/works"
    const response = await fetch(url)

    const data = await response.json()
    return data;
    //console.log(data)
    //console.log(data[0].category.name)
}

export function displayPost(data){
        for (let i =0; i < data.length; i++){
        setPost(data[i])
    }
}

const data = await getPost()
displayPost(data);


function setPost (data){
    const figure = document.createElement("figure")
    figure.innerHTML = `<img class="post" src="${data.imageUrl}" alt="${data.title}" data-post-id="${data.id}">
                    <figcaption>${data.title}</figcaption>`

    document.querySelector(".gallery").append(figure)
    //document.querySelector(".modal-content").append(figure)
}

function removePost(){
    const containerPosts = document.querySelector(".gallery");
    containerPosts.innerHTML="";
}

export async function getCat() {
    const url = "http://localhost:5678/api/categories"
    const response = await fetch(url)
    const cat = await response.json()

    return cat
}
//getCat();

function setCat(cat){
    for (let i =0; i < cat.length; i++){
        setFilter(cat[i])
        //console.log(cat[i])
    }
}
setCat(cats);

function filterPosts(chosenCat){
    removePost()
    console.log("chosenCAt : " + chosenCat)
    for (let i =0; i < data.length; i++){
        //console.log(data[i].category.name)
            if (data[i].category.name == chosenCat){
                setPost(data[i])
            }
        }
}

function setFilter (cat){
    const filter = document.createElement("div")
    filter.innerHTML = `<div class="button-filtres" data-filter-id="${cat.name}" id="${cat.name.toLowerCase()}" > <strong> ${cat.name} </strong> </div>`
    document.querySelector('.filter').append(filter)

    filter.addEventListener("click",() => {
        filterPosts(cat.name)
    })
}

tous.addEventListener("click", () => {
    removePost()
    for (let i =0; i < data.length; i++){
        setPost(data[i])
    }})



/////////// LOGOUT ////////////////

const logoutLink = document.getElementById("logout")
logoutLink.addEventListener("click", () => {
    localStorage.removeItem("token")
    document.location.href = "./index.html"
})