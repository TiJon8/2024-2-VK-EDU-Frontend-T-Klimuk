import { getTimeInfo, lastMessageScroll } from "./utilsFunctions"
import { getModalMediaWindow } from "./modalMedia"

const wrapper_Scrollbar = document.querySelector(".wrapper_Scrollbar")


export function showChatMessages(messagesCollection) {
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
            message.classList.add("show")
            message.setAttribute("uuid", messageData.uuid)

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