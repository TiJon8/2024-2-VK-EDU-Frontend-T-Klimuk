// входные данные

import chatImageJoker from "@/ss_trailer1_085.jpg"
import chatImageJoker2 from "@/1475670624_jaeyong-jung_harley-quinn.jpg"
import chatImageCillian from "@/c2c529459704340f67dbc2363bd95077.jpg"
import chatImageCillian2 from "@/MV5BNzkyOTcyMzI4OF5BMl5BanBnXkFtZTgwMzU4NTEyMTE@._V1_.jpg"

// авада 2

const fakeDate = new Date(2024, 10, 5, 7, 4)

let objectiCllian2 = {
    sentStatus: "outgoing",
    contentType: "textMessage",
    content: {
        imgSrc: "",
        textData: "Здарова братец",
        sentAt: fakeDate
    }
}


let objectiCllian3 = {
    sentStatus: "outgoing",
    contentType: "mediaMessage",
    content: {
        imgSrc: chatImageCillian,
        textData: "Такой накину",
        sentAt: fakeDate
    }
}

let objectiCllian = {
    sentStatus: "incoming",
    contentType: "textMessage",
    content: {
        imgSrc: "",
        textData: "Не забудь, сегодня едем на скачки, костюмчик нормальный приодень",
        sentAt: fakeDate
    }
}

let objectiCllian4 = {
    sentStatus: "incoming",
    contentType: "mediaMessage",
    content: {
        imgSrc: chatImageCillian2,
        textData: "Брату скажи, чтобы завязывал со снегом",
        sentAt: fakeDate
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
        sentAt: fakeDate
    }
}

let objectjoker2 = {
    sentStatus: "outgoing",
    contentType: "mediaMessage",
    content: {
        imgSrc: chatImageJoker2,
        textData: "Приеду, буду наказывать",
        sentAt: fakeDate
    }
}

let objectjoker3 = {
    sentStatus: "incoming",
    contentType: "textMessage",
    content: {
        imgSrc: "",
        textData: ")",
        sentAt: fakeDate
    }
}

let objectjoker4 = {
    sentStatus: "incoming",
    contentType: "mediaMessage",
    content: {
        imgSrc: chatImageJoker,
        textData: "С друзьями на отдыхе",
        sentAt: fakeDate
    }
}

let messagesCollectionStorageJoker = JSON.stringify([objectjoker, objectjoker2, objectjoker3, objectjoker4])

localStorage.setItem("f2dfa4db-6004-4ff3-a37e-6c0e3f18e816", messagesCollectionStorageJoker)



import imgPrev from "@/joker-anatomy2-superJumbo.jpg"
import imgPrev2 from "@/original.jpg"
import imgPrev3 from "@/292030_screenshots_20181116151013_1.jpg"



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


        let details = document.createElement("div")
        details.className = "details"


        let listHead = document.createElement("div")
        listHead.className = "listHead"


        let h4 = document.createElement("h4")
        h4.innerText = chatData.userName

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
        paragragp.innerText = lastChatData?.content.textData ?? "Новый чат"

        messageP.append(paragragp)

        listHead.append(h4)
        listHead.append(time)
        details.append(listHead)
        details.append(messageP)
        imgbx.append(img)
        block.append(imgbx)
        block.append(details)

        document.querySelector(".chatList").append(block)

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


function getTimeInfo(timestamp) {
    if(timestamp) {
        let time = new Date(timestamp)
        const hours = time.getHours().toString().padStart(2, "0")
        const minutes = time.getMinutes().toString().padStart(2, "0")
        return hours + ":" + minutes

    } else {
        return null
    }

}


function getModalMediaWindow(elemPos) {

    const topOffset = elemPos.top
    const leftOffset = elemPos.left

    // let modalMediaView = false

    function initModalWindow(contentUrl, mediaContentText = '', mediaSentDate = '', userName = "null") {
        let modal = document.createElement("div");
        modal.id = "modalWindow"
        modal.classList.add("modalMedia")
        modal.classList.add("visible")

        if(document.body.clientWidth <= 425) {
            modal.animate([
                {backgroundColor: "#00000000"},
                {backgroundColor: "#000000"}
            ], 
            {duration: 200, iterations: 1})
        }


        let modalMediaContent = document.createElement("div")
        modalMediaContent.className = "modalMedia_content"
        modalMediaContent.id = "modalMedia_content"

        let modalContentImg = document.createElement("img")
        modalContentImg.src = contentUrl

        
        if(document.body.clientWidth <= 425) {

            let modalMediaHeader = document.createElement("div")
            modalMediaHeader.classList.add("modalMedia_Header", "visible")
            modalMediaHeader.id = "modalMedia_Header"
    
            let modalHeader_left = document.createElement("div")
            modalHeader_left.className = "modalHeader_left"


            let modalMedia_Header_back = document.createElement("div")
            modalMedia_Header_back.className = "modalMedia_Header_back"
            modalMedia_Header_back.id = "modalBackArrow"

            modalMedia_Header_back.addEventListener("click", (e) => {
                // const modal = e.target.parentNode.parentNode.parentNode.parentNode
                // const img = e.target.parentNode.parentNode.parentNode.parentNode.children[1].children[0].children[0]
                modal.classList.add("removed")
                modalContentImg.style.transform = `translate(${leftOffset}, ${topOffset})`
                modal.addEventListener("transitionend", () => {
                    modal.remove()
                })
            })

            let materialSymbolsOutlined = document.createElement("span")
            materialSymbolsOutlined.className = "material-symbols-outlined"
            materialSymbolsOutlined.innerText = "arrow_back"

            modalMedia_Header_back.append(materialSymbolsOutlined)
            modalHeader_left.append(modalMedia_Header_back)

            let modalMedia_Header_chatData = document.createElement("div")
            modalMedia_Header_chatData.className = "modalMedia_Header_chatData"
    
    
            let modalMedia_Header_chatData_name = document.createElement("div")
            modalMedia_Header_chatData_name.className = "modalMedia_Header_chatData_name"
            modalMedia_Header_chatData_name.innerText = userName
    
    
            let modalMedia_Header_chatData_date = document.createElement("div")
            modalMedia_Header_chatData_date.className = "modalMedia_Header_chatData_date"
            modalMedia_Header_chatData_date.innerText = mediaSentDate
    
    
            let modalMedia_Header_right = document.createElement("div")
            modalMedia_Header_right.className = "modalMedia_Header_right"
    
    
            let shareSymbol = document.createElement("span")
            shareSymbol.className = "material-symbols-outlined"
            shareSymbol.innerText = "share"
    
            let moreSymbol = document.createElement("span")
            moreSymbol.className = "material-symbols-outlined"
            moreSymbol.innerText = "more_vert"


            modalMediaContent.addEventListener("click", () => {
                if(document.body.clientWidth <= 425) {
                    modalMediaHeader.classList.toggle("visible")
                }
            })

    
            modalMedia_Header_chatData.append(modalMedia_Header_chatData_name)
            modalMedia_Header_chatData.append(modalMedia_Header_chatData_date)
            modalHeader_left.append(modalMedia_Header_chatData)
            modalMedia_Header_right.append(shareSymbol)
            modalMedia_Header_right.append(moreSymbol)
            modalMediaHeader.append(modalHeader_left)
            modalMediaHeader.append(modalMedia_Header_right)

            modal.append(modalMediaHeader)
        }


        let imgWrapper = document.createElement("div")
        imgWrapper.className = "img_wrapper"


        if(document.body.clientWidth <= 425) {
            let mediaInitTimer
            modalContentImg.classList.add("mobile")
            

            modalContentImg.style.setProperty("--modalInitialMediaHeight", `${elemPos.height}px`)
            modalContentImg.style.setProperty("--modalInitialMediaWidth", `${elemPos.width}px`)
            modalContentImg.style.setProperty("--modalInitialMediaTopOffset", `${elemPos.top}px`)
            modalContentImg.style.setProperty("--modalInitialMediaLeftOffset", `${elemPos.left}px`)

            mediaInitTimer = setTimeout(() => {
                modalContentImg.style.removeProperty("--modalInitialMediaHeight")
                modalContentImg.style.removeProperty("--modalInitialMediaWidth")
                modalContentImg.style.removeProperty("--modalInitialMediaTopOffset")
                modalContentImg.style.removeProperty("--modalInitialMediaLeftOffset")
                modalContentImg.classList.add("initial")
            }, 0)

        } else if(document.body.clientWidth > 425) {
            modalContentImg.classList.add("desktop")
        } 


        modalMediaContent.addEventListener("click", (e) => {
            if(document.body.clientWidth > 425) {
                // const modal = e.target.parentNode.parentNode.parentNode.parentNode
                // const img = e.target.parentNode.parentNode.parentNode.parentNode.children[1].children[0].children[0]
                modal.classList.add("removed")
                modalContentImg.style.transform = `translate(${leftOffset}, ${topOffset})`
                modal.addEventListener("transitionend", () => {
                    modal.remove()
                })
            }
        })



        imgWrapper.append(modalContentImg)
        modalMediaContent.append(imgWrapper)

        if(document.body.clientWidth <= 425) {
            let modalMediaText = document.createElement("div")
            modalMediaText.classList.add("modalMedia_text", "visible")
            modalMediaText.id = "modalMedia_text"
    
            let modalMediaTextParagraph = document.createElement("p")
            modalMediaTextParagraph.innerText = mediaContentText


            modalMediaContent.addEventListener("click", () => {
                if(document.body.clientWidth <= 425) {
                    modalMediaText.classList.toggle("visible")
                }
            })

    
            modalMediaText.append(modalMediaTextParagraph)

            modal.append(modalMediaText)
        }


        modal.append(modalMediaContent)


        if(document.body.clientWidth > 425) {
            let contentBlock = document.createElement("div")
            contentBlock.className = 'contentBlock show'

            let Timer


            let leftSideBlock = document.createElement("div")
            leftSideBlock.className = "leftSideBlock"
            let contentDataBlock = document.createElement("div")
            contentDataBlock.className = "contentDataBlock"
            let channelDateStatus = document.createElement("span")
            channelDateStatus.innerText = userName
            let contentDateStatus = document.createElement("span")
            contentDateStatus.innerText = mediaSentDate

            contentDataBlock.append(channelDateStatus)
            contentDataBlock.append(contentDateStatus)
            leftSideBlock.append(contentDataBlock)

            contentBlock.append(leftSideBlock)


            if(mediaContentText) {
                let textDataBlock = document.createElement("div")
                textDataBlock.className = "textDataBlock"
                let paragraphData = document.createElement("p")
                paragraphData.innerText = mediaContentText
    
                textDataBlock.append(paragraphData)
                contentBlock.append(textDataBlock)
            }


            let rightSideBlock = document.createElement("div")
            rightSideBlock.className = "rightSideBlock"
            let manipulationStatus = document.createElement("div")
            manipulationStatus.className = "manipulationStatus"
            let moreSymbol = document.createElement("span")
            moreSymbol.className = "material-symbols-outlined"
            moreSymbol.innerText = "more_vert"

            manipulationStatus.append(moreSymbol)
            rightSideBlock.append(manipulationStatus)


            Timer = setTimeout(() => {
                contentBlock.classList.add("hide");
            }, 5 * 1000);

            modal.addEventListener("mousemove", () => {
                clearTimeout(Timer);

                contentBlock.classList.remove("hide")

                Timer = setTimeout(() => {
                    contentBlock.classList.add("hide");
                }, 5 * 1000);
            })

            contentBlock.append(rightSideBlock)

            modal.append(contentBlock)
        }
        return modal
    }

    

    return {initModalWindow}

}




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

                img.addEventListener("click", (e) => {
                    const elemPosition = img.getBoundingClientRect()
                    const innerText = messageData.content.textData // === '' ? null : img.parentNode.parentNode.lastElementChild.children[0].innerText
                    const innerDate = getTimeInfo(messageData.content.sentAt) // === '' ? img.parentNode.parentNode.lastElementChild.children[0].children[0].innerText : img.parentNode.parentNode.lastElementChild.lastElementChild.children[0].innerText
                    const userName = document.querySelector(".rightSide .header .imgText .userData h4")
                    const modalW = getModalMediaWindow(elemPosition)
                    let modal = modalW.initModalWindow(
                        e.target.currentSrc,
                        innerText,
                        innerDate,
                        userName.innerText,
                    )
                    // modalW.modalMediaView = true
                    document.body.append(modal)
                })

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
                time.innerText = getTimeInfo(messageData.content.sentAt)

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
                time.innerText = getTimeInfo(messageData.content.sentAt)
        
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



const messageInput = document.querySelector(".messageInput input[type=text]")
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

                let backArrowDiv = document.createElement("div")
                backArrowDiv.className = "backArrow"
    
                let backArrow = document.createElement("span")
                backArrow.className = "material-symbols-outlined"
                backArrow.innerText = "arrow_back"
    
                backArrowDiv.append(backArrow)
                addBackArrow.prepend(backArrowDiv)
    
                backArrowDiv.addEventListener("click", (e) => {
                    rightSide.classList.toggle("active")
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


function addNewMediaMessage(mediaSrc, textField = '', sentAt) {
    let message = document.createElement("div")
    message.classList.add("message", "outgoing")

    let content = document.createElement("div")
    content.className = "content"

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
        const innerText = textField === '' ? null : img.parentNode.parentNode.lastElementChild.children[0].innerHTML
        const innerDate = sentAt // textField === '' ? img.parentNode.parentNode.lastElementChild.children[0].children[0].innerHTML : img.parentNode.parentNode.lastElementChild.children[1].children[0].innerHTML
        const userName = document.querySelector(".rightSide .header .imgText .userData h4")
        const modalW = getModalMediaWindow(elemPosition)
        let modal = modalW.initModalWindow(
            e.target.currentSrc,
            textField,
            sentAt,
            userName.innerText,
        )
        // modalW.modalMediaView = true
        document.body.append(modal)
    })

    return message
}


function updateChatProfileData(nameId, sentAt, message, imgSrc = '') {
    const block = document.getElementById(`${nameId}`)
    let time = block.querySelector(".details .listHead .time")
    let messageText = block.querySelector(".details .messageP p")
    if(!imgSrc && block.querySelector(".details .messageP").contains(block.querySelector(".details .messageP .thumbMediaPreview"))) {
        block.querySelector(".details .messageP .thumbMediaPreview").remove()
    }
    time.innerText = sentAt
    messageText.innerText = message
    if(imgSrc) {
        if(block.querySelector(".details .messageP").contains(block.querySelector(".details .messageP .thumbMediaPreview"))) {
            block.querySelector(".details .messageP .thumbMediaPreview").remove()
        }
        let thumbMediaPreview = document.createElement("div")
        thumbMediaPreview.className = "thumbMediaPreview"

        let imgPreview = document.createElement("img")
        imgPreview.src = imgSrc

        thumbMediaPreview.append(imgPreview)
        block.querySelector(".details .messageP").prepend(thumbMediaPreview)
    }
}



function updateStorage() {
    const currentChat = document.querySelector(".chatWrapper")
    const currentChatId = currentChat.getAttribute("name")

    if(currentChat.classList.contains("nullMessages")) {
        currentChat.classList.remove("nullMessages")
    }

    const timestamp = new Date();

    const hoursAndMinutes = getTimeInfo(timestamp)
    const message = addNewMessage(messageInput.value, hoursAndMinutes)
    const obj = {
        sentStatus: "outgoing",
        contentType: "textMessage",
        content: {
            imgSrc: "",
            textData: messageInput.value,
            sentAt: timestamp
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
    if(e.keyCode === 13 && document.body.clientWidth > 425 && messageInput.value !== '') {
        updateStorage()
    }
})


const attachMedia = document.querySelector("input[type='file']")
const mainContainer = document.querySelector(".container") 

attachMedia.onchange = (event) => {

    let outerAttachMediaContainer = document.createElement("div")
    outerAttachMediaContainer.className = "outerAttachMediaContainer"
    
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
                outerAttachMediaContainer.remove()
            })
            reader.abort()
        }
    }) 
    sendButton.addEventListener("click", () => {
        attachMediaModalContainer.classList.add("removed")
        attachMediaModalContainer.addEventListener("transitionend", () => {
            attachMediaModalContainer.remove()
        })

        const currentChat = document.getElementById("chatWrapper")
        const currentChatId = currentChat.getAttribute("name")

        const timestamp = new Date();

        const hoursAndMinutes = getTimeInfo(timestamp)
        const message = addNewMediaMessage(img.src, input.value, hoursAndMinutes)

        const obj = {
            sentStatus: "outgoing",
            contentType: "mediaMessage",
            content: {
                imgSrc: reader.result,
                textData: input.value,
                sentAt: timestamp
            }
        }

        updateChatProfileData(currentChatId, hoursAndMinutes, input.value, reader.result)

        const data = localStorage.getItem(currentChatId)
        if(!data) {
            localStorage.setItem(currentChatId, JSON.stringify([obj]))
        } else {

            const localStorageData = JSON.parse(data)
            localStorageData.push(obj)
    
            localStorage.setItem(currentChatId, JSON.stringify(localStorageData))
        }
        


        const wrapperScrollbar = document.querySelector(".wrapper_Scrollbar")
        document.querySelector(".chatBox").classList.add("new_Message")
        wrapperScrollbar.before(message)

        lastMessageScroll("smooth")
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
    updateStorage()

    if(messageInput.value === '' && input.querySelector(".sendArrow").classList.contains("active")) {
        sendArrow.classList.remove("active")
    }
}