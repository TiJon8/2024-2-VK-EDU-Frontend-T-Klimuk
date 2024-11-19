// входные данные

import chatImageJoker from "@/ss_trailer1_085.jpg"
import chatImageJoker2 from "@/1475670624_jaeyong-jung_harley-quinn.jpg"
import chatImageCillian from "@/c2c529459704340f67dbc2363bd95077.jpg"
import chatImageCillian2 from "@/MV5BNzkyOTcyMzI4OF5BMl5BanBnXkFtZTgwMzU4NTEyMTE@._V1_.jpg"

// авада 2

const fakeDate = new Date(2024, 10, 5, 7, 4)
const fakeDate2 = new Date(2024, 10, 6, 16, 49)

let objectiCllian2 = {
    sentStatus: "outgoing",
    contentType: "textMessage",
    content: {
        imgSrc: "",
        textData: "Здарова братец",
        sentAt: fakeDate,
        checkStatus: "done_all"
    }
}


let objectiCllian3 = {
    sentStatus: "outgoing",
    contentType: "mediaMessage",
    content: {
        imgSrc: chatImageCillian,
        textData: "Такой накину",
        sentAt: fakeDate,
        checkStatus: "done_all"
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
        sentAt: fakeDate2
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
        sentAt: fakeDate,
        checkStatus: "done_all"
    }
}

let objectjoker2 = {
    sentStatus: "outgoing",
    contentType: "mediaMessage",
    content: {
        imgSrc: chatImageJoker2,
        textData: "Приеду, буду наказывать",
        sentAt: fakeDate,
        checkStatus: "check"
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