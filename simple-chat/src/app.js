import './loadInitData'
import { getTimeInfo, updateChatOrder, getChatHeader, lastMessageScroll } from './utilsFunctions'
import { showChatMessages } from './Conversation'
import './addMessage'
import './addContact'


const rightSideSection = document.querySelector(".rightSide")
const addBackArrow = document.querySelector(".imgText")
const messageInput = document.querySelector(".messageInput input[type=text]")


const chatsList = []


function callback(mutations, observer) {
    console.log(mutations)
    for(const mutation of mutations){
        if(mutation.target === document.querySelector(".chatList")) {
            console.log(mutation.target)
            chatsList.push(mutation.addedNodes[0])
            loadConversation(mutation.addedNodes[0])
        }
    }
    console.log(chatsList)
}

const observer = new MutationObserver(callback)

observer.observe(document.querySelector(".chatList"), {
    childList: true,
    subtree: true,
})



function getChatProfiles(chatsProfiles) {
    for(let i=0; i<chatsProfiles.length; i++) {

        const chatData = chatsProfiles[i]
        const storageData = localStorage.getItem(chatData.userId)
        const lastChatData = JSON.parse(storageData)?.slice(-1)[0]

        let block = document.createElement("div")
        block.className = "block"
        block.setAttribute("name", "hasID")
        block.setAttribute("data-chat-id", `${chatData.userId}`)
        block.id = chatData.userId


        let imgbx = document.createElement("div")
        imgbx.className = "imgbx"


        let img = document.createElement("img")
        img.src = chatData.userImg


        let details = document.createElement("div")
        details.className = "details"


        let listHead = document.createElement("div")
        listHead.className = "listHead"


        let h4 = document.createElement("h4")
        h4.innerText = chatData.userName


        let messageStatus = document.createElement("div")
        messageStatus.className = 'messageStatus'


        if(lastChatData?.sentStatus === "outgoing") {
            let checkStatus = document.createElement("div")
            checkStatus.className = "checkStatus"
    
            let checkSymbol = document.createElement("span")
            checkSymbol.className = "material-symbols-outlined"
            checkSymbol.innerText = lastChatData.content.checkStatus
    
            checkStatus.append(checkSymbol)

            messageStatus.append(checkStatus)
        }


        let time = document.createElement("p")
        time.className = "time"
        time.innerText = getTimeInfo(lastChatData?.content.sentAt) ?? null


        let messageP = document.createElement("div")
        messageP.className = "messageP"

        if(lastChatData?.contentType === "mediaMessage") {
            let thumbMediaPreview = document.createElement("div")
            thumbMediaPreview.className = "thumbMediaPreview"

            let imgPreview = document.createElement("img")
            imgPreview.src = lastChatData.content.imgSrc

            thumbMediaPreview.append(imgPreview)
            messageP.append(thumbMediaPreview)
        }


        let paragragp = document.createElement("p")
        paragragp.innerText = lastChatData?.content?.textData ?? "Новый чат"

        messageP.append(paragragp)

        messageStatus.append(time)

        listHead.append(h4)
        listHead.append(messageStatus)

        details.append(listHead)
        details.append(messageP)
        imgbx.append(img)
        block.append(imgbx)
        block.append(details)

        document.querySelector(".chatList").append(block)
    }
    updateChatOrder(JSON.parse(localStorage.getItem("usersIDs")))
}

function buildListOfProfiles(data) {
    let l = []
    for(const e of data) {
        l.push(e.userId)
    }
    localStorage.setItem("usersIDs", JSON.stringify(l))
}


window.onload = () => {
    const data = localStorage.getItem("users")
    buildListOfProfiles(JSON.parse(data))
    getChatProfiles(JSON.parse(data))
    
    if(document.body.clientWidth > 425) {
        rightSideSection.classList.add("rightSideOnLoad")
    }
}


export function getConversationWindow(chat) {

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
        rightSideSection.classList.toggle("active")

        // if(document.querySelector(".imgText + span.material-symbols-outlined")) {
        //     document.querySelector(".imgText + span.material-symbols-outlined").remove()
        // }
        let backArrowDiv = document.createElement("div")
        backArrowDiv.className = "backArrow"

        let backArrow = document.createElement("span")
        backArrow.className = "material-symbols-outlined"
        backArrow.innerText = "arrow_back"
        
        backArrowDiv.append(backArrow)
        addBackArrow.prepend(backArrowDiv)

        backArrowDiv.addEventListener("click", (e) => {
            rightSideSection.classList.toggle("active")
            backArrowDiv.remove()
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
        const removeNodes = document.querySelectorAll('.chatWrapper .conversationSection > div.message')
        removeNodes.forEach(node => {
            node.remove()
        })
        oppenedChat.setAttribute("name", `${chatProfileId}`)
        const data = localStorage.getItem(chatProfileId)
        
        const localStorageData = JSON.parse(data)
        showChatMessages(localStorageData)

        const imgProfile = chat.querySelector(".imgbx img")
        const nameProfile = chat.querySelector(".listHead h4")
        getChatHeader(imgProfile, nameProfile, chatHeader)

    }
}



export function loadConversation(chat) {

    chat.addEventListener("click", (e) => {

        chat.classList.add('clicked');

        getConversationWindow(chat)

        setTimeout(() => {
            chat.classList.toggle('clicked');
        }, 140);

    })
}