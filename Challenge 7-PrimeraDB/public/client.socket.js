const socket = io();

const {startChat, readChat, postMessage, chatArray} = require(`../API/chatDB.js`);

const {add} = require(`../API/productDB.js`);

const userInput = document.getElementById(`username`);
const messageInput = document.getElementById(`userMessage`);
const chatDisplay = document.getElementById(`chat`);

const nameInput = document.getElementById(`name`);
const priceInput = document.getElementById(`price`);
const thmb = document.getElementById(`thmb`);
const prodDisplay = document.getElementById(`display`);

startChat();

postMessage(`asfas`, `asfasfasfasfas`);

const sendMessage = (info) => {
    postMessage(info.user, info.message)
    socket.emit(`client:message`, info);
}

const submitMessage = () => {
    event.preventDefault();
    if(userInput.value !== "" && messageInput.value !== ""){
        const now = new Date(Date.now());
        const msg = {
            user: userInput.value,
            message: messageInput.value,
            time: now,
        }
        sendMessage(msg);
    } else {
        alert(`Revise que los campos del chat no estén incompletos`);
    }
}

const renderMessages = (msgArray) => {
    const content = msgArray.map((obj) => {
        return(
            `<div>
                <strong>${obj.user}</strong>
                <span>${obj.time}</span>:
                <em>${obj.message}</em>
            </div>`
        )
    }).join(" ");
    chatDisplay.innerHTML = content;
}

const renderProducts = (prodArray) => {
    const content = prodArray.map((obj) => {
        return(
            `<div id=${obj.id}>
                <span>${obj.name}</span>
                <span>$${obj.price}</span>
                <img src=${obj.thumbnail} alt="img" height="30px"></img>
            </div>`
        )
    }).join(" ")
    prodDisplay.innerHTML = content;
}

const sendProduct = async () => {
    await add(nameInput, priceInput, thmb);
    socket.emit(`client:sentProd`);
}

socket.on(`server:chatUpdate`, (msgArray) =>  renderMessages(msgArray));

socket.on(`server:products`, (prodArray) => renderProducts(prodArray))

socket.on(`server:prodRecieved`, (prodArray) => renderProducts(prodArray));