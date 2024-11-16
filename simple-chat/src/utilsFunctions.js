
// let chatsOrder = JSON.parse(localStorage.getItem("usersIDs")) // ['85968cfd-32bf-4a7a-b2f7-e14a3cab6ad0', 'f2dfa4db-6004-4ff3-a37e-6c0e3f18e816', 'f9a2fbc6-e8c3-4d94-9b70-68d417bf1ae8']; 


// функции

export function lastMessageScroll(b) {
    let e = document.querySelector('.wrapper_Scrollbar');
    if (!e) return ; 
    
    e.scrollIntoView({
        behavior: b || 'auto',
        block: 'end',
    });
}


export function getTimeInfo(timestamp) {
    if(timestamp) {
        let time = new Date(timestamp)
        const hours = time.getHours().toString().padStart(2, "0")
        const minutes = time.getMinutes().toString().padStart(2, "0")
        return hours + ":" + minutes

    } else {
        return null
    }
}


export function setActiveChat(chatId) {

    let chatsOrder = JSON.parse(localStorage.getItem("usersIDs"))

    // Сначала нужно найти чат по ID
    const activeChat = document.querySelector(`.block[data-chat-id="${chatId}"]`);

    if (!activeChat) return;

    // Если этот чат уже был активен, ничего не делаем
    if (chatsOrder[0] === chatId) return;
  
    // Добавляем активный чат в начало массива
    if (chatsOrder.includes(chatId)) {chatsOrder.unshift(...chatsOrder.splice(chatsOrder.indexOf(chatId), 1))} else {chatsOrder.push(chatId);}

    // Обновляем порядок отображения чатов
    updateChatOrder(chatsOrder);
}


// Функция для обновления порядка чатов
export function updateChatOrder(chatsOrder) {
    console.log(chatsOrder)
    const chats = document.querySelectorAll(".block")
    // Сначала очищаем все чаты от классов order
    chats.forEach(chat => chat.classList.remove('go_top'));
  
    // Применяем order для чатов в нужном порядке
    chatsOrder.forEach((chatId, index) => {
      const chat = document.querySelector(`.block[data-chat-id="${chatId}"]`);
      if (chat) {
        // chat.classList.add('go_top');
        // Можно использовать индекс для задания order, чтобы управлять порядком
        chat.style.order = index;
      }
    });
    // console.log(chatsOrder)
}


export function updateChatProfileData(nameId, sentAt, message, imgSrc = '') {
    const block = document.getElementById(`${nameId}`)
    let time = block.querySelector(".details .listHead .messageStatus .time")
    let messageText = block.querySelector(".details .messageP p")
    if(!block.querySelector(".details .listHead .messageStatus .checkStatus")) {
        let checkStatus = document.createElement("div")
        checkStatus.className = "checkStatus"

        let checkSymbol = document.createElement("span")
        checkSymbol.className = "material-symbols-outlined"
        checkSymbol.innerText = "check"

        checkStatus.append(checkSymbol)

        block.querySelector(".details .listHead .messageStatus").prepend(checkStatus)
    }
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


export function getChatHeader(userImg, userName, chatHeader) {
    const headerImg = chatHeader.querySelector(".imgText .img img")
    const headerName = chatHeader.querySelector(".imgText .userData h4")
    headerImg.src = userImg.src
    headerName.innerText = userName.innerText
}