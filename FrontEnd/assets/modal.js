import { getPost } from "./home.js";
import { getToken } from "./utils.js";
import { getCat } from "./home.js";

const url = 'http://localhost:5678/api/works';
const data = await getPost();
const token = getToken();
const cat = await getCat();


function displayModal(data){
        for (let i =0; i < data.length; i++){
        setModal(data[i])
    }
}

displayModal(data);

export function setModal (data){
    const figure = document.createElement("figure")
        figure.innerHTML = `<img class="post" src="${data.imageUrl}" alt="${data.title}" data-id="${data.id}">
                             <img class="trash" src="./assets/icons/trash.svg" alt="trash" data-id="${data.id}">`

    document.querySelector(".modal-content").append(figure)

    addEventListenerProjet(figure)

}

function addEventListenerProjet(projet) {
    const trash = projet.querySelector(".trash")

    trash.addEventListener("click", (event) =>{
        console.log('suprre')
        const clickedElement = event.target;
        console.log(clickedElement)
        const parentDiv = clickedElement.parentElement;
        console.log('parentdiv : ' + parentDiv)
        const dataDeletedID = clickedElement.dataset.id
        console.log(dataDeletedID)

        console.log(dataDeletedID)
        console.log(data)
        console.log(data[dataDeletedID])
        console.log(`http://localhost:5678/api/works/${dataDeletedID}`)

        deletePost(dataDeletedID)
        parentDiv.remove(dataDeletedID)
        console.log(token)
    })
}

function deletePost(dataDeletedID) {

    fetch (`http://localhost:5678/api/works/${dataDeletedID}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }).then(() => {
            removeGallery(dataDeletedID)
    });


}

function removeGallery (dataDeletedID){
    const element = document.querySelector(`[data-post-id="${dataDeletedID}"]`).parentElement;

    if (element) {
        element.remove();
    }
}


/////////////////////////////////////// Section Ajout d'une photo //////////////////////////////////////

const AddPict = document.querySelector("#addPict")

AddPict.addEventListener('click',() => {
    const contentDelete = document.querySelector(".modalDelete")
    contentDelete.style.display = "none"

    const contentAdd = document.querySelector(".modalAdd")
    contentAdd.style.display = "flex"
})

const bouttonAdd = document.querySelector("#valid")
const input = document.getElementById('fileName')
const titrePost = document.getElementById('titrePost')
const catPost = document.getElementById('select')
const nombreOptions = document.querySelector('select')


function setSelectInput(cat){
    const option = document.createElement("option")
    option.innerHTML = `<option value="${cat.name}" data-options-id=${cat.id}> ${cat.name} </option>`
    document.querySelector('#select').append(option)
}

function selectInput(){
    for(let i = 0; i<cat.length; i++){
        setSelectInput(cat[i])
    }
}
selectInput()

bouttonAdd.addEventListener('click',() => {
    console.log("add")
    addPost()
})

//Ajout du poste dans la modal apres avoir rentré une nouvelle donnée
function addPostModal(newData){
    const figure = document.createElement("figure")
    figure.innerHTML = `<img class="post" src="${newData.imageUrl}" alt="${newData.title}" data-id="${newData.id}">
                        <img class="trash" src="./assets/icons/trash.svg" alt="trash" data-id="${newData.id}">
`

    document.querySelector(".modal-content").append(figure)
}

//Ajout du poste dans la gallery apres avoir rentré une nouvelle donnée
function addPostGallery(newData) {

    const figure = document.createElement("figure")

    figure.innerHTML = `<img class="post" src="${newData.imageUrl}" alt="${newData.title}" data-post-id="${newData.id}" >
                    <figcaption>${newData.title}</figcaption>`
    document.querySelector(".gallery").append(figure)
}

async function addPost () {


        //Recuperation de l'id de la categorie selectionné
        let catIdSelected;
        for(let i =0;i< nombreOptions.length-1; i++){
        if (catPost.value == cat[i].name){
            catIdSelected = cat[i].id
         }
        }

        const formData = new FormData();

        const file = document.getElementById("file-input").files[0];
        const texte = titrePost.value;

        console.log(file.name)
        formData.append("image", file);
        formData.append("title", texte);
        formData.append("category", catIdSelected);


    let response = await fetch (url , {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    })
    .then((response) => response.json())
    .then((newData) => {
        console.log(newData)
        addPostGallery(newData)
        //addPostModal(newData)
        setModal(newData)
    }).catch((error) => {
        console.log(error)
    })

    //addPostGallery(file, texte)
    //addPostModal()
}


const iconUpload = document.querySelector(".upload-icon")
const buttonUpload = document.querySelector(".upload-button")
const infoImage = document.querySelector(".upload-note")
const inputFile = document.getElementById("file-input");

let imageLoaded = false
let titleSet = false
let catChosed = false
let imageURL = null


  /// Affichage de la photo selectionne a la place de l'icon/boutton d'ajout
  inputFile.addEventListener("change", function (event) {

    iconUpload.style.display = "none"
    buttonUpload.style.display = "none"
    infoImage.style.display = "none"


    const figure = document.createElement("figure")

    
    const file = event.target.files[0];   // 👉 l’image sélectionnée

    if(imageURL !== "null"){
        URL.revokeObjectURL(imageURL);
    }
    imageURL = URL.createObjectURL(file);



    let uploadBox= document.querySelector(".upload-box");

    if(document.querySelector(".img-uploaded") !== null){
        document.querySelector(".img-uploaded").remove();
    }

    let newImage = document.createElement("img");
    newImage.classList.add("img-uploaded");

    newImage.src = imageURL;

    uploadBox.appendChild(newImage);

    if(newImage.src !== ''){
        imageLoaded = true
    }

    checkStatusModal()

});

const validBtn = document.getElementById("valid");


titrePost.addEventListener("input", () => {
    console.log("TYPING ......")
  if (titrePost.value !== "") {

    titleSet = true
  } else {

    titleSet = false
  }

    checkStatusModal()
});

console.log('cat : ' + catPost.value)

catPost.addEventListener("change", function (event) {


    if (catPost.value !== ""){
        catChosed = true
    }
    else{
        catChosed = false
    }

    checkStatusModal()
});

function checkStatusModal () {
    if(catChosed == true & titleSet == true & imageLoaded == true ){
        validBtn.style.backgroundColor = "#6fc468";
        validBtn.style.cursor = "pointer";
    }
    else{
        validBtn.style.backgroundColor = "#b5b5b5";
        validBtn.style.cursor = "not-allowed";
    }

}

function resetModal() {
 //Reset de la modal
    if(catChosed == true){
        catChosed = false
    }

    if(titleSet == true){
        titleSet = false
    }

    if(imageLoaded == true){
        imageLoaded = false
    }

    if(document.querySelector(".img-uploaded") !== null){
        document.querySelector(".img-uploaded").remove();
    }

    iconUpload.style.display = "flex"
    buttonUpload.style.display = "flex"
    infoImage.style.display = "flex"

    if(titrePost.value !== ""){
        titrePost.value = ""
    }

    if(catPost.value !== ""){
        catPost.value = ""
    }

    checkStatusModal ()
}

const backBtn = document.querySelector(".modalAdd .back-btn");
backBtn.addEventListener('click',() => {
    const contentDelete = document.querySelector(".modalDelete")
    contentDelete.style.display = "block"

    const contentAdd = document.querySelector(".modalAdd")
    contentAdd.style.display = "none"
    console.log('reset')
    console.log(catChosed)
   
    resetModal()
})

const closeBtn = document.querySelector(".modalAdd .close-btn");
closeBtn.addEventListener('click',() => {
    const modal = document.querySelector('.modal')
    modal.classList.remove('open');

    if(document.querySelector(".img-uploaded") !== null){
        document.querySelector(".img-uploaded").remove();
    }

    resetModal()
})