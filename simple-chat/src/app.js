// входные данные

// import images from "./index.js"

import chatImageJoker from "@/ss_trailer1_085.jpg"
import chatImageJoker2 from "@/1475670624_jaeyong-jung_harley-quinn.jpg"
import chatImageCillian from "@/c2c529459704340f67dbc2363bd95077.jpg"
import chatImageCillian2 from "@/MV5BNzkyOTcyMzI4OF5BMl5BanBnXkFtZTgwMzU4NTEyMTE@._V1_.jpg"
// const myIcon = new Image();
// myIcon.src = image
// console.log(myIcon)
// const imgq = new Image()
// const imgw = new Image()
// const imge = new Image()
// const imgr = new Image()

let objectiCllian2 = {
    sentStatus: "outgoing",
    contentType: "textMessage",
    content: {
        imgSrc: "",
        textData: "Здарова братец",
        sentAt: "10:16"
    }
}
console.log(objectiCllian2)

let objectiCllian3 = {
    sentStatus: "outgoing",
    contentType: "mediaMessage",
    content: {
        imgSrc: chatImageCillian,
        textData: "Такой накину",
        sentAt: "10:17"
    }
}

let objectiCllian = {
    sentStatus: "incoming",
    contentType: "textMessage",
    content: {
        imgSrc: "",
        textData: "Не забудь, сегодня едем на скачки, костюмчик нормальный приодень",
        sentAt: "7:30"
    }
}

let objectiCllian4 = {
    sentStatus: "incoming",
    contentType: "mediaMessage",
    content: {
        imgSrc: chatImageCillian2,
        textData: "Брату скажи, чтобы завязывал со снегом",
        sentAt: "7:30"
    }
}

let messagesCollectionStorageCillian = JSON.stringify([objectiCllian, objectiCllian2, objectiCllian3, objectiCllian4])

localStorage.setItem("85968cfd-32bf-4a7a-b2f7-e14a3cab6ad0", messagesCollectionStorageCillian)


let objectjoker = {
    sentStatus: "outgoing",
    contentType: "textMessage",
    content: {
        imgSrc: "",
        textData: "Че, как ты там потаскуха",
        sentAt: "10:16"
    }
}

let objectjoker2 = {
    sentStatus: "outgoing",
    contentType: "mediaMessage",
    content: {
        imgSrc: chatImageJoker2,
        textData: "Приеду, буду наказывать",
        sentAt: "10:17"
    }
}

let objectjoker3 = {
    sentStatus: "incoming",
    contentType: "textMessage",
    content: {
        imgSrc: "",
        textData: ")",
        sentAt: "7:30"
    }
}

let objectjoker4 = {
    sentStatus: "incoming",
    contentType: "mediaMessage",
    content: {
        imgSrc: chatImageJoker,
        textData: "С друзьями на отдыхе",
        sentAt: "7:30"
    }
}

let messagesCollectionStorageJoker = JSON.stringify([objectjoker, objectjoker2, objectjoker3, objectjoker4])

localStorage.setItem("f2dfa4db-6004-4ff3-a37e-6c0e3f18e816", messagesCollectionStorageJoker)



import imgPrev from "@/joker-anatomy2-superJumbo.jpg"
import imgPrev2 from "@/original.jpg"
import imgPrev3 from "@/292030_screenshots_20181116151013_1.jpg"

// const imagePrev = new Image()
// imagePrev.src = imgPrev
// const imagePrev2 = new Image()
// imagePrev2.src = imgPrev2
// const imagePrev3 = new Image()
// imagePrev3.src = imgPrev3
// console.log(imagePrev)


let userChatProfile1 = {
    userId: "f2dfa4db-6004-4ff3-a37e-6c0e3f18e816",
    userName: "Джокер",
    userImg: imgPrev
}

let userChatProfile2 = {
    userId: "85968cfd-32bf-4a7a-b2f7-e14a3cab6ad0",
    userName: "Киллиан",
    userImg: imgPrev2
}

let userChatProfile3 = {
    userId: "f9a2fbc6-e8c3-4d94-9b70-68d417bf1ae8",
    userName: "Цири",
    userImg: imgPrev3
}

localStorage.setItem("users", JSON.stringify([userChatProfile1, userChatProfile2, userChatProfile3]))



// функции

function lastMessageScroll(b) {
    let e = document.querySelector('.wrapper_Scrollbar');
    if (!e) return ; 
    
    e.scrollIntoView({
        behavior: b || 'auto',
        block: 'end',
    });
}



function getChatProfiles(chatsProfiles) {
    for(let i=0; i<chatsProfiles.length; i++) {

        const chatData = chatsProfiles[i]
        const storageData = localStorage.getItem(chatData.userId)
        const lastChatData = JSON.parse(storageData)?.slice(-1)[0]

        let block = document.createElement("div")
        block.className = "block"
        block.setAttribute("name", "hasID")
        block.id = chatData.userId


        let imgbx = document.createElement("div")
        imgbx.className = "imgbx"


        let img = document.createElement("img")
        img.src = chatData.userImg
        console.log(chatData)


        let details = document.createElement("div")
        details.className = "details"


        let listHead = document.createElement("div")
        listHead.className = "listHead"


        let h4 = document.createElement("h4")
        h4.innerText = chatData.userName

        let time = document.createElement("p")
        time.className = "time"
        time.innerText = lastChatData?.content?.sentAt ?? null


        let messageP = document.createElement("div")
        messageP.className = "messageP"

        let paragragp = document.createElement("p")
        paragragp.innerText = lastChatData?.content?.textData ?? "Новый чат"


        messageP.append(paragragp)
        listHead.append(h4)
        listHead.append(time)
        details.append(listHead)
        details.append(messageP)
        imgbx.append(img)
        block.append(imgbx)
        block.append(details)

        const chatList = document.querySelector(".chatList")
        chatList.append(block)

    }
}



const data = localStorage.getItem("users")
getChatProfiles(JSON.parse(data))

const rightSideSection = document.querySelector(".rightSide")
if(document.body.clientWidth > 425) {
    rightSideSection.classList.add("rightSideOnLoad")
}


function getChatHeader(userImg, userName, chatHeader) {
    const headerImg = chatHeader.querySelector(".imgText .img img")
    const headerName = chatHeader.querySelector(".imgText .userData h4")
    headerImg.src = userImg.src
    headerName.innerText = userName.innerText
}



const wrapper_Scrollbar = document.querySelector(".wrapper_Scrollbar")

function showChatMessages(messagesCollection) {
    const chatWrapper = document.querySelector(`.chatWrapper`)

    if (!messagesCollection) {
        chatWrapper.classList.add("nullMessages")

    } else{
        document.querySelector(`.chatWrapper`).classList.add("loading")
        let media = []
        let counter = 0
        chatWrapper.classList.remove("nullMessages")

        for(let i=0; i<messagesCollection.length; i++) {
            const messageData = messagesCollection[i]

            let message = document.createElement("div")
            message.className = `message ${messageData.sentStatus === "outgoing" ? "outgoing" : "incoming"}`

            let content = document.createElement("div")
            content.className = "content"

            if(messageData.contentType === "mediaMessage") {

                let img_wrapper = document.createElement("div")
                img_wrapper.className = "img"

                let img = document.createElement("img")
                img.src = messageData.content.imgSrc
                counter++
                media.push(img)
                img.onload = () => {
                    media++
                }
                img.alt = "chatImage"

                img_wrapper.append(img)

                let img_subData = document.createElement("div")
                img_subData.className = "img_subData"


                img_wrapper.append(img)
                content.append(img_wrapper)

                if(messageData.content.textData) {
                    let paragraph = document.createElement("p")
                    paragraph.innerText = messageData.content.textData

                    img_subData.append(paragraph)
                }

                let messageStatus = document.createElement("span")
                messageStatus.className = "messageStatus"

                let time = document.createElement("span")
                time.className = "time"
                time.innerText = messageData.content.sentAt

                messageStatus.append(time)

                if(messageData.sentStatus === "outgoing") {
                    let checkSymbol = document.createElement("span")
                    checkSymbol.className = "material-symbols-outlined"
                    checkSymbol.innerText = "check"

                    messageStatus.append(checkSymbol)
                }


                img_subData.append(messageStatus)
                content.append(img_subData)

                img.addEventListener("load", () => {
                    lastMessageScroll("instant")

                })

            } else if(messageData.contentType === "textMessage") {
                let paragraph = document.createElement("p")
                paragraph.innerText = messageData.content.textData
        
                let messageStatus = document.createElement("span")
                messageStatus.className = "messageStatus"
        
                let time = document.createElement("span")
                time.className = "time"
                time.innerText = messageData.content.sentAt
        
                messageStatus.append(time)
        
                if(messageData.sentStatus === "outgoing") {
                    let checkSymbol = document.createElement("span")
                    checkSymbol.className = "material-symbols-outlined"
                    checkSymbol.innerText = "check"
        
                    messageStatus.append(checkSymbol)
                }
        

                content.append(paragraph)
                content.append(messageStatus)
            }

            message.append(content)

            wrapper_Scrollbar.before(message)
        }
        
        if(counter === media.length) {
            lastMessageScroll("instant")
            document.querySelector(`.chatWrapper`).classList.remove("loading")
        }
    }
}



const messageInput = document.querySelector(".messageInput input")
const rightSide = document.querySelector('.rightSide')
const addBackArrow = document.querySelector(".imgText")



window.onload = () => {
    const chatId = document.querySelectorAll("[name=hasID]")

    chatId.forEach(chat => {
        chat.addEventListener("click", (e) => {

            const chatProfileId = chat.id
            const oppenedChat = document.querySelector(`.chatWrapper`)
            const chatBox = document.querySelector(".chatBox")
            const chatHeader = document.querySelector(".rightSide .header")
            const messageInputSection = document.querySelector(".rightSide .messageInput")

            rightSideSection.classList.remove("rightSideOnLoad")

            chatBox.classList.add("active")
            chatHeader.classList.add("active")
            messageInputSection.classList.add("active")

            
    
            if(document.body.clientWidth <= 425) {
                rightSide.classList.add("active")
    
                let backArrow = document.createElement("span")
                backArrow.className = "material-symbols-outlined"
                backArrow.innerText = "arrow_back"
    
                addBackArrow.prepend(backArrow)
    
                backArrow.addEventListener("click", (e) => {
                    rightSide.classList.remove("active")
                    backArrow.remove()
                })
            }
    
            if(oppenedChat.getAttribute("name") !== chat.id) {
                const activeChatProfile = document.querySelector(".chatList .block.active")
                activeChatProfile?.classList.remove("active")
                messageInput.value = ''
            }

            if(!chat.classList.contains("active") && document.body.clientWidth > 425) {
                chat.classList.add("active")
            }

            if(oppenedChat.getAttribute("name") === chat.id) {
                lastMessageScroll("smooth")
            } else {
                const removeNodes = document.querySelectorAll('.chatWrapper > div.message')
                removeNodes.forEach(node => {
                    node.remove()
                })
                oppenedChat.setAttribute("name", `${chatProfileId}`)
                const data = localStorage.getItem(chatProfileId)
                showChatMessages(JSON.parse(data))

                const imgProfile = chat.querySelector(".imgbx img")
                const nameProfile = chat.querySelector(".listHead h4")
                getChatHeader(imgProfile, nameProfile, chatHeader)
    
            }
        })
    })
}


function addNewMessage(text, sentAt) {
    let message = document.createElement("div")
    message.classList.add("message", "outgoing")

    let content = document.createElement("div")
    content.className = "content"

    let paragragp = document.createElement("p")
    paragragp.innerText = text

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

    return message
}


function updateChatProfileData(nameId, sentAt, message) {
    const block = document.getElementById(`${nameId}`)
    let time = block.querySelector(".details .listHead .time")
    let messageText = block.querySelector(".details .messageP p")
    time.innerText = sentAt
    messageText.innerText = message
}


function updateStorage() {
    const currentChat = document.querySelector(".chatWrapper")
    const currentChatId = currentChat.getAttribute("name")

    if(currentChat.classList.contains("nullMessages")) {
        currentChat.classList.remove("nullMessages")
    }

    const nowDate = new Date();
    const hours = nowDate.getHours() < 10 ? "0" + +nowDate.getHours() : +nowDate.getHours()
    const minutes = nowDate.getMinutes() < 10 ? "0" + +nowDate.getMinutes() : +nowDate.getMinutes()
    
    const hoursAndMinutes = hours + ":" + minutes
    const message = addNewMessage(messageInput.value, hoursAndMinutes)
    const obj = {
        sentStatus: "outgoing",
        contentType: "textMessage",
        content: {
            imgSrc: "",
            textData: messageInput.value,
            sentAt: hoursAndMinutes
        }
    }

    updateChatProfileData(currentChatId, hoursAndMinutes, messageInput.value)

    const data = localStorage.getItem(currentChatId)
    if(!data) {
        localStorage.setItem(currentChatId, JSON.stringify([obj]))
    } else {

        const localStorageData = JSON.parse(data)
        localStorageData.push(obj)

        localStorage.setItem(currentChatId, JSON.stringify(localStorageData))
    }

    wrapper_Scrollbar.before(message)
    messageInput.value = '';

    lastMessageScroll("smooth")
}



messageInput.addEventListener("keydown", (e) => {
    if(e.keyCode === 13 && messageInput.value !== '') {
        updateStorage()
    }
})


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
    updateStorage()

    if(messageInput.value === '' && input.querySelector(".sendArrow").classList.contains("active")) {
        sendArrow.classList.remove("active")
    }
}