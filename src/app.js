const inputItem = document.querySelector('#add-item')
const inputFilter = document.querySelector('#filter')
const formAddItem = document.querySelector('#form-add-item')
const btnClear = document.querySelector('#clear')
const listItems = document.querySelector('.list-items')
let isUpdating = false;


function displayItems() {
    const items = getItemsFromLocalStorage()
    items.forEach(item => addItemToDOM(item))
    
}

function addItemToList(e) {
    e.preventDefault();
  const inputVal = inputItem.value.trim();
  
   if(inputVal === ''){
    showError(`Can't be blank`);
    return;
   }


   if(isUpdating) {
    const item = document.querySelector('.show-edit');
    formAddItem.querySelector('#btn-add-item').classList.remove('btn-edit');
    deteleItemFromLocalStorage(item.firstChild.textContent);
    item.remove()
   }

   if(isDuplicate(inputVal)){
    showError('The item already exist');
    return;
   }

   addItemToDOM(inputVal);
   clearError();
   addItemToLocalStorage(inputVal.toLowerCase());
   resetUI();
}

function addItemToDOM(inputVal) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const button = createDeleteBtn('delete-icon')
    li.append(p);
   li.append(button);
   p.append(inputVal);
   listItems.append(li);
}

// Add to local storage
function addItemToLocalStorage(item){
    let localStorageItems = getItemsFromLocalStorage();
  
    localStorageItems.push(item)
    localStorage.setItem('items' ,JSON.stringify(localStorageItems))
}

//Show items from local storage
function getItemsFromLocalStorage(){
    let localStorageItems = JSON.parse(localStorage.getItem('items'));
    if(localStorageItems == null) return localStorageItems = [];
    else  return localStorageItems;

}



// Validate input add item
function showError(message) {
    formAddItem.classList.add('show-error');
    formAddItem.querySelector('.error-message').innerText = message;
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
    const items = getItemsFromLocalStorage();
    
    inputFilter.innerText = '';
    inputItem.innerText = '';

    items.length > 0 ?
    (inputFilter.style.display = 'block',
    btnClear.style.display = 'block')
    :
    (inputFilter.style.display = 'none',
    btnClear.style.display = 'none')

    isUpdating = false;
}

function clearList() {
    while(listItems.firstChild){
        listItems.firstChild.remove()
    }
   localStorage.clear()
    resetUI()
}

function onClickItem(e){
   
    if(e.target.classList.contains('delete-icon')){
        const item = e.target.previousElementSibling.innerText;
        removeItem(e.target.parentElement)
        deteleItemFromLocalStorage(item)
        resetUI();
    }else {
        
        editItem(e.target);
    }
}

// edit item
function editItem(li){
    removeShowEditClass()
    isUpdating = true;
    li.classList.add('show-edit')
    inputItem.value = li.firstChild.textContent;
    formAddItem.querySelector('#btn-add-item').innerText = 'Update Item'
    formAddItem.querySelector('#btn-add-item').classList.add('btn-edit');
}

function removeShowEditClass() {
    listItems.querySelectorAll('li').forEach(item => item.classList.remove('show-edit'))
}


//delete item from DOM
function removeItem(item){
    if(confirm(`Are you sure you want to delete "${item.firstChild.textContent}"?`)) {
        item.remove()
    }
        
}

// Delete item from local storage
function deteleItemFromLocalStorage(item) {
    
    const items = getItemsFromLocalStorage()  
    const newItems = items.filter(i => i !== item.toLowerCase() ) 
    localStorage.setItem('items' ,JSON.stringify(newItems))
}

function showFilter(e) {
    const items = listItems.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemText = item.firstChild.textContent.toLocaleLowerCase();
        if(itemText.indexOf(text) !== -1){
            item.style.display= 'flex';   
        }else {
            item.style.display= 'none';
        }
    })
}


function isDuplicate(item) {
    const items = getItemsFromLocalStorage();
    return items.includes(item.toLowerCase());
}

//init app
function init() {
    formAddItem.addEventListener('submit', addItemToList)
    btnClear.addEventListener('click', clearList)
    listItems.addEventListener('click', onClickItem)
    inputFilter.addEventListener('input' ,showFilter)
    document.addEventListener('DOMContentLoaded', displayItems)
    resetUI();
}


init()