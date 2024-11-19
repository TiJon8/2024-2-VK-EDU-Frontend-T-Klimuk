import './styles/contactModal.css'

import {getTimeInfo, setActiveChat} from "./utilsFunctions.js"
import { getConversationWindow } from './app.js'
import IMask from 'imask'

import hardy from '@/hardy.jpeg'

const fakeUser = {
    userId: "ca844adf-08de-4fde-854a-1e272792236b",
    phoneNumber: "+7 (916) 189-44-24",
    userName: "Том",
    userImg: hardy
}



function addChatProfile(chatData) {

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


    let time = document.createElement("p")
    time.className = "time"
    time.innerText = getTimeInfo(lastChatData?.content.sentAt) ?? null


    let messageP = document.createElement("div")
    messageP.className = "messageP"


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

    setActiveChat(chatData.userId)
}





document.querySelector(".add_Navigation").addEventListener("click", (e) => {
    let addContactModal = document.createElement("div")
    addContactModal.className = "addContactModal"

    let addContactBlock = document.createElement("div")
    addContactBlock.className = "addContactBlock"

    let addContactInfo = document.createElement("div")
    addContactInfo.className = "addContactInfo"

    let notifyHeader = document.createElement("div")
    notifyHeader.className = "notifyHeader"

    let notifyText = document.createElement("p")
    notifyText.className = "notifyText"
    notifyText.innerText = "Добавить контакт"

    let inputSection = document.createElement("div")
    inputSection.className = "inputSection"

    let inputField = document.createElement("input")
    inputField.setAttribute("type", "text")
    inputField.setAttribute("maxlength", "18")
    inputField.className = "inputField"
    inputField.setAttribute("placeholder", "Номер телефона")


    let addUserButtonSection = document.createElement("div")
    addUserButtonSection.className = "addUserButtonSection"

    let addUserButton = document.createElement("button")
    addUserButton.className = "addUserButton"
    addUserButton.innerText = "Создать"



    inputField.oninput = (у) => {
        console.log(inputField.value)
        if(inputField.value.length !== 18 && document.querySelector("#showSearchUser")) {
            // document.querySelector(".showSearchUser").classList.add("removed")
            document.querySelector(".showSearchUser").classList.add("removed")
            document.querySelector(".showSearchUser").addEventListener("transitionend", () => {
                const de = document.querySelector("#showSearchUser")
                de?.remove()
            })
        }
        if(!addUserButton.innerText !== "Создать") {
            addUserButton.innerText = "Создать"
        }
        if(inputField.value.length === 18) {
            
            console.log(inputField.value)

            // какой-то мегу супер пупер сложный и куртой запрос в базу данных для нахождения юзера по номеру

            setTimeout(() => {
                inputField.readOnly = true
                addUserButton.classList.add("loading")
                addUserButton.setAttribute('disabled', '')
            }, 10)
            

            setTimeout(() => {

            // если юзер существует
            if(inputField.value === fakeUser.phoneNumber) {
                const profilesList = JSON.parse(localStorage.getItem("usersIDs"))
                console.log(profilesList)
                
                let showSearchUser = document.createElement("div")
                showSearchUser.className = "showSearchUser"
                showSearchUser.id = "showSearchUser"

                let userSection = document.createElement("div")
                userSection.className = "userSection"

                let userProfileImg = document.createElement("div")
                userProfileImg.className = "userProfileImg"

                let img = document.createElement("img")
                img.src = fakeUser.userImg

                let userDataSection = document.createElement("div")
                userDataSection.className = "userDataSection"

                let userName = document.createElement("div")
                userName.className = "userName"
                userName.innerText = fakeUser.userName

                userDataSection.append(userName)


                userProfileImg.append(img)

                userSection.append(userProfileImg)
                userSection.append(userDataSection)

                showSearchUser.append(userSection)
                inputSection.append(showSearchUser)
                setTimeout(() => {
                    showSearchUser.classList.add("show")
                }, 10)

                inputField.readOnly = false
                addUserButton.classList.toggle("loading")
                addUserButton.removeAttribute('disabled')

                if(profilesList.includes(fakeUser.userId)) {
                    addUserButton.innerText = "Уже в друзьях"
                }

                // setTimeout(() => {
                //     inputSection.style.height = `${inputSection.scrollHeight}px`;
                // }, 10);

                addUserButton.onclick = () => {
                    if(inputField.value) {

                        let isBe
                        let getUserId
                        
                        if(profilesList.includes(fakeUser.userId)) {
                            addContactModal.classList.add("removed")
                            addContactModal.addEventListener("transitionend", () => {
                                addContactModal.remove()
                            })
                            console.log(document.querySelector(`.chatList .block[id=${fakeUser.userId}]`))
                            getConversationWindow(document.querySelector(`.chatList .block[id=${fakeUser.userId}]`))
                            // loadConversation(document.querySelector(`.chatList .block[id=${getUserId.userId}]`))
                        } else {
                            const usersList = JSON.parse(localStorage.getItem("users"))
                            usersList.push(fakeUser)
                            localStorage.setItem("users", JSON.stringify(usersList))

                            addChatProfile(fakeUser)
                            profilesList.push(fakeUser.userId)
                            localStorage.setItem("usersIDs", JSON.stringify(profilesList))
                            
                            getConversationWindow(document.querySelector(`.chatList .block[id=${fakeUser.userId}]`))

                            addContactModal.classList.add("removed")
                            addContactModal.addEventListener("transitionend", () => {
                                addContactModal.remove()
                            })
                        }

                    }
                }
            } else {
                inputField.readOnly = false
                addUserButton.classList.toggle("loading")
                addUserButton.removeAttribute('disabled')
                addUserButton.innerText = "Доступ ограничен"
            }


            }, 2000)

        }
        IMask(
            inputField,
            {
            mask: '+{7} (000) 000-00-00'
            }
        )
        
    }

    addUserButtonSection.append(addUserButton)

    inputSection.append(inputField)
    notifyHeader.append(notifyText)
    addContactInfo.append(notifyHeader)
    addContactInfo.append(inputSection)
    addContactInfo.append(addUserButtonSection)
    addContactBlock.append(addContactInfo)
    addContactModal.append(addContactBlock)

    document.querySelector(".container").append(addContactModal)

    function onClickModal(e) {
        if (!addContactBlock.contains(e.target) && !document.querySelector(".add_Navigation").contains(e.target)) {
            window.removeEventListener("click", onClickModal)
            addContactModal.classList.add("removed")
            addContactModal.addEventListener("transitionend", () => {
                addContactModal.remove()
            })
        }
    }

    window.addEventListener("click", onClickModal) 
})