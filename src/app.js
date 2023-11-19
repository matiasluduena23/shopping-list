const inputItem = document.querySelector('#add-item')
const inputFilter = document.querySelector('#filter')
const formAddItem = document.querySelector('#form-add-item')
const btnClear = document.querySelector('#clear')
const listItems = document.querySelector('.list-items')





function addItemToList(e) {
    e.preventDefault();
   const li = document.createElement('li');
   const p = document.createElement('p');
   const button = createDeleteBtn('delete-icon')
    
   if(inputItem.value.trim() === ''){
    showError();
    return;
   }
   li.append(p);
   li.append(button);
   p.append(inputItem.value);
   listItems.append(li);
   inputItem.value = "";
   resetUI();
}

// Validate input add item
function showError() {
    formAddItem.classList.add('show-error');
}

function clearError() {
    formAddItem.classList.remove('show-error');
}


function createDeleteBtn(classes) {
    const button = document.createElement('button');
    button.className = classes;
    button.append('X')
    return button;
}


function resetUI(){
    const items = listItems.querySelectorAll('li');
    
    items.length > 0 ?
    (inputFilter.style.display = 'block',
    btnClear.style.display = 'block')
    :
    (inputFilter.style.display = 'none',
    btnClear.style.display = 'none')
}

function clearList() {
    while(listItems.firstChild){
        listItems.firstChild.remove()
    }
    resetUI()
}

function removeItem(e){
    if(e.target.classList.contains('delete-icon')){
        const item = e.target.previousElementSibling.innerText;
        confirm(`Are you sure you want to delete "${item}"?`) && e.target.parentElement.remove();

    }
    resetUI();
}


// Events listeners
formAddItem.addEventListener('submit', addItemToList)
btnClear.addEventListener('click', clearList)
listItems.addEventListener('click', removeItem)