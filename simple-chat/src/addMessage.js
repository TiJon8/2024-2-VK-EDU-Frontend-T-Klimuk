import { lastMessageScroll, updateChatProfileData, getTimeInfo, setActiveChat } from './utilsFunctions'
import { getModalMediaWindow } from './modalMedia'

const messageInput = document.querySelector(".messageInput input[type=text]")
const wrapper_Scrollbar = document.querySelector(".wrapper_Scrollbar")


function appendMessage(mediaSrc = '', textField = '', sentAt, contentType) {
    let message = document.createElement("div")
    message.classList.add("message", "outgoing")

    let content = document.createElement("div")
    content.className = "content"

    if(contentType === "mediaMessage") {
        let img
    
        if(mediaSrc) {
            let imgWrapper = document.createElement("div")
            imgWrapper.className = "img"
    
            img = document.createElement("img")
            img.src = mediaSrc
    
            imgWrapper.append(img)
            content.append(imgWrapper)
        }
    
        let imgSubData = document.createElement("div")
        imgSubData.className = "img_subData"
    
        if(textField) {
            let paragragp = document.createElement("p")
            paragragp.innerText = textField
    
            imgSubData.append(paragragp)
        }
    
        let messageStatus = document.createElement("span")
        messageStatus.className = "messageStatus"
    
        let time = document.createElement("span")
        time.className = "time"
        time.innerText = sentAt
    
        let doneSymbol = document.createElement("span")
        doneSymbol.className = "material-symbols-outlined"
        doneSymbol.innerText = "done"
    
        messageStatus.append(time)
        messageStatus.append(doneSymbol)
        imgSubData.append(messageStatus)
        content.append(imgSubData)
    
        message.append(content)
    
        img.addEventListener("click", (e) => {
            const elemPosition = img.getBoundingClientRect()
            // console.log(elemPosition)
            // console.log(img.parentNode.parentNode)
            // console.log(img.parentNode.parentNode.lastElementChild)
            // console.log(img.parentNode.parentNode.lastElementChild.children)
            const innerText = textField === '' ? null : img.parentNode.parentNode.lastElementChild.children[0].innerHTML
            const innerDate = textField === '' ? img.parentNode.parentNode.lastElementChild.children[0].children[0].innerHTML : img.parentNode.parentNode.lastElementChild.children[1].children[0].innerHTML
            console.log(innerText)
            console.log(innerDate)
            const userName = document.querySelector(".rightSide .header .imgText .userData h4")
            const modalW = getModalMediaWindow(elemPosition)
            let modal = modalW.initModalWindow(
                e.target.currentSrc,
                textField,
                sentAt,
                userName.innerText,
            )
            modalW.modalMediaView = true
            document.body.append(modal)
        })
    } else if(contentType === 'textMessage') {
        let paragragp = document.createElement("p")
        paragragp.innerText = textField

        let messageStatus = document.createElement("span")
        messageStatus.className = "messageStatus"

        let time = document.createElement("span")
        time.className = "time"
        time.innerText = sentAt

        let doneSymbol = document.createElement("span")
        doneSymbol.className = "material-symbols-outlined"
        doneSymbol.innerText = "done"


        messageStatus.append(time)
        messageStatus.append(doneSymbol)
        content.append(paragragp)
        content.append(messageStatus)
        message.append(content)
    }

    return message
}


function updateStorage(contentType, inputSource = '', imgSource = '') {
    const currentChat = document.querySelector(".chatWrapper")
    const currentChatId = currentChat.getAttribute("name")

    if(currentChat.classList.contains("nullMessages")) {
        currentChat.classList.remove("nullMessages")
    }

    const timestamp = new Date();

    const hoursAndMinutes = getTimeInfo(timestamp)
    const message = appendMessage(imgSource, inputSource, hoursAndMinutes, contentType)
    const obj = {
        sentStatus: "outgoing",
        contentType: contentType,
        content: {
            imgSrc: imgSource,
            textData: inputSource,
            sentAt: timestamp,
            checkStatus: "check"
        }
    }

    updateChatProfileData(currentChatId, hoursAndMinutes, inputSource, imgSource)

    setActiveChat(currentChatId);

    const data = localStorage.getItem(currentChatId)
    if(!data) {
        localStorage.setItem(currentChatId, JSON.stringify([obj]))
    } else {

        const localStorageData = JSON.parse(data)
        localStorageData.push(obj)

        localStorage.setItem(currentChatId, JSON.stringify(localStorageData))
    }

    document.querySelector(".chatBox").classList.add("new_Message")
    wrapper_Scrollbar.before(message)
    setTimeout(() => {
        message.classList.add('show');
    }, 10)

    lastMessageScroll("smooth")
}



messageInput.addEventListener("keydown", (e) => {
    if(e.keyCode === 13 && document.body.clientWidth > 425 && messageInput.value !== '') {
        updateStorage("textMessage", messageInput.value)
        messageInput.value = '';
    }
})


const attachMedia = document.querySelector("input[type='file']")
const mainContainer = document.querySelector(".container") 

attachMedia.onchange = (event) => {
    
    let attachMediaModalContainer = document.createElement("div")
    attachMediaModalContainer.id = "attachMediaModalContainer"
    attachMediaModalContainer.classList.add("attachMediaModalContainer")

    let mediaModalWrapper = document.createElement("div")
    mediaModalWrapper.className = "mediaModalWrapper"

    let imgWrapper = document.createElement("div")
    imgWrapper.className = "imgWrapper"
    let img = document.createElement("img")


    let inputField = document.createElement("div")
    inputField.className = 'inputField'
    let input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", "Добавить подпись")

    let sendButton = document.createElement("button")
    sendButton.innerText = 'Отправить'


    inputField.append(input)
    inputField.append(sendButton)

    
    let img_source

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload = () => {
        img.src = reader.result;
        img_source = reader.result;
    }

    imgWrapper.append(img)
    mediaModalWrapper.append(imgWrapper)
    mediaModalWrapper.append(inputField)
    attachMediaModalContainer.append(mediaModalWrapper)

    mainContainer.append(attachMediaModalContainer)

    window.addEventListener("click", (e) => {
        if (!mediaModalWrapper.contains(e.target)) {
            attachMediaModalContainer.classList.add("removed")
            attachMediaModalContainer.addEventListener("transitionend", () => {
                attachMediaModalContainer.remove()
            })
            reader.abort()
        }
    }) 
    sendButton.addEventListener("click", () => {
        attachMediaModalContainer.classList.add("removed")
        attachMediaModalContainer.addEventListener("transitionend", () => {
            attachMediaModalContainer.remove()
        })
        updateStorage("mediaMessage", input.value, reader.result)
    })
}


const input = document.querySelector(".messageInput")
const sendArrow = input.querySelector(".sendArrow")


messageInput.oninput = () => {
    if(document.body.clientWidth <= 425) {
        if(messageInput.value !== '' && !input.querySelector(".sendArrow").classList.contains("active")) {
            input.querySelector(".sendArrow").classList.add("active")
        }
        if(messageInput.value === '' && input.querySelector(".sendArrow").classList.contains("active")) {
            sendArrow.classList.remove("active")
        }
    }
}


sendArrow.onclick = () => {
    updateStorage("textMessage", messageInput.value)
    messageInput.value = '';
    if(messageInput.value === '' && input.querySelector(".sendArrow").classList.contains("active")) {
        sendArrow.classList.remove("active")
    }
}