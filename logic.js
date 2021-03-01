let addBtn = document.getElementById('addNoteBtn')
let textArea = document.getElementById('addedNote')
let cardArea = document.getElementById('cardArea')
let searchText = document.getElementById('searchBar')
showCard()

addBtn.addEventListener('click', function(){
    let notes = localStorage.getItem('notes')
    if (notes == null){
        notesObj = []
    }
    else{
        notesObj = JSON.parse(notes)
    }
    notesObj.push(textArea.value)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    textArea.value = ""

    showCard()
})

function showCard(){
    while(cardArea.firstChild){
        cardArea.removeChild(cardArea.firstChild)
    }
    notes = JSON.parse(localStorage.getItem('notes'))
    if(notes==null){
        return
    }
    notes.forEach(function(item, index){
        let card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `
        <div class="cardHeading">Note ${index+1}</div>
        <hr>
        <div class="cardData">${item}</div>
        <button id="${index}" onclick="deleteNote(this.id)" class="cardDeleteBtn">Delete Note</button>
        `
        cardArea.appendChild(card)
    })
}

function deleteNote(index){
    notesObj = JSON.parse(localStorage.getItem('notes'))
    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showCard()
}

searchText.addEventListener('input', function(){
    let inputVal = searchText.value.toLowerCase()
    let cards = document.getElementsByClassName('card')
    Array.from(cards).forEach(function(element){
        let cardText = element.getElementsByClassName('cardData')[0].innerText.toLowerCase()
        if(cardText.includes(inputVal)){
            element.style.display = 'flex'
        }
        else{
            element.style.display = 'none'
        }
    })
})