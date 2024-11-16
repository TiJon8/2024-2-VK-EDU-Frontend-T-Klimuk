export function getModalMediaWindow(elemPos) {

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