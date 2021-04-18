const btnAdd = document.querySelector('.add')
const textAreaAll = document.querySelector('textarea')

// PULLING NOTES THAT ARE IN LOCALSTORAGE
const notesAddedLocalStorage = JSON.parse(localStorage.getItem('notes'))
// if local storage note exist, pass that note to addNewNote(note)
if (notesAddedLocalStorage) {
    notesAddedLocalStorage.forEach(note => {
        console.log(note)
        addNewNote(note);
    })
}

btnAdd.addEventListener('click', () => addNewNote())

// CREATING NOTES
function addNewNote(text = '') {
    // creating note element
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
    <div class="tools">
    <button class="edit">
        <i class="fas fa-edit"></i>
    </button>
    <button class="delete">
        <i class="fas fa-trash-alt"></i>
    </button>
    </div>
    <div class="main"></div>
    <textarea></textarea>
        `

    // !!! ELEMENTS ARE SELECTED FROM NOTE ELEMENT NOT FROM GLOBAL DOCUMENT ==> ONLY WAY ITS WORKING !!!
    const btnEdit = note.querySelector('.edit')
    const btnTrash = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    // TEXT VALUE ARGUMENT IS PASSED FROM LOCALSTORAGE
    textArea.value = text;

    // resize textarea height automatically
    const tx = note.getElementsByTagName("textarea")
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
        tx[i].addEventListener("input", OnInput, false)
    }
    function OnInput() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px"
        // NOTE HEIGHT is textarea height + 28px for tools element
        note.style.height = (this.scrollHeight) + 28 + "px";
    }
    // DELETE NOTE
    btnTrash.addEventListener('click', () => {
        note.remove()
        // update localstorage, so it removes deleted notes
        updateLocalStorage()
    })
    // TOGGLE LOCKED STATE OF NOTE TYPING, WITH CLASS Z-INDEX
    btnEdit.addEventListener('click', () => {
        textArea.classList.toggle('unlocked')
        main.style.height = textArea.style.height;

        // if textarea has unlocked status, focus cursor to textarea
        if (textArea.classList.contains('unlocked')) {
            textArea.focus();
        }
    })

    textArea.addEventListener('input', (e) => {
        updateLocalStorage()
    })
    document.body.appendChild(note)
}


function updateLocalStorage() {
    // selecting all textareas
    const notesText = document.querySelectorAll('textarea')
    const notesArray = [];
    // pushing all textarea.values to notesArray
    notesText.forEach(note => notesArray.push(note.value))
    // console.log(notesArray)
    // pushing all notes from notesArray to localstorage
    localStorage.setItem('notes', JSON.stringify(notesArray));
}