

const socket = io();

// TABLA DE PRODUCTOS

const  Add = document.querySelector("#Add") 
const  InputTitle = document.querySelector("#exampleInputEmail1")
const  InputPrice = document.querySelector("#exampleInputPassword1")
const  InputThumbnail = document.querySelector("#exampleInputPassword2")
 



function NewProduct(product) {
    socket.emit("client: new product", product)
}

async function renderProducts(products) {    
     await fetch("./productos.hbs").then((
     response) => {   
        response.text().then((plantilla) => {
     document.querySelector("#productos1").innerHTML = " "
    
     products.forEach((product) => {
        const template =  Handlebars.compile(plantilla)
        const html =  template(product)
        document.querySelector("#productos1").innerHTML += html})})
    })
}

function submitHandler (e) {
    e.preventDefault()
    const product = {
        title: InputTitle.value,
        price: InputPrice.value,
        thumbnail: InputThumbnail.value
    }
    NewProduct(product)
}


Add.addEventListener("submit", submitHandler)

socket.on("server: productos", renderProducts)


//CHAT




function sendMessage(author12) {
   
    socket.emit('client:message', author12)
}
const messageForm = document.querySelector('#messageForm')
const Email1 = document.querySelector('#Emailinput')
const nombre2= document.querySelector('#nombreinput')
const apellido3 = document.querySelector('#apellidoinput')
const edad4 = document.querySelector('#edadinput')
const alias5 = document.querySelector("#aliasinput")
const avatar6 = document.querySelector('#avatarinput')
const messageInput = document.querySelector('#messageInput')

const messagesPool = document.querySelector('#messagesPool')
const fecha = Date()
console.log(fecha)
function renderMessages(messagesInfo) {
        
        const html = messagesInfo.map(author1 => {
            return(`<div>
                <strong id="EmailShow">${author1.author.id}</strong>:
                <p id="Date">${fecha}</p>
                <img id="avatar1" src=${author1.author.avatar}/>
                <em id="Message">${author1.Message}</em> </div>
                
                `)
            }).join(" ");
       
        messagesPool.innerHTML = html;    
}

function submitHandler2 (event) {
    event.preventDefault()
    
    const author1 = {id : Email1.value ,nombre: nombre2.value , apellido: apellido3.value , edad : edad4.value, alias: alias5.value , avatar: avatar6.value, Message : messageInput.value}

    sendMessage(author1)
}  


messageForm.addEventListener('submit', submitHandler2)

socket.on('server:mensajes', renderMessages)



// porcentajes

    socket.on("server:porcentajes", Number => {
        console.log(Number)
        document.querySelector("#porcentaje").innerHTML = `${Number}%`
       
    })
    