const inputItem = document.querySelector('#add-item')
const inputFilter = document.querySelector('#filter')
const btnAddItem = document.querySelector('#btn-add-item')
const btnClear = document.querySelector('#clear')
const listItems = document.querySelector('.list-items')


btnAddItem.addEventListener('click', addItemToList)


function addItemToList(e) {
    e.preventDefault();
   const li = document.createElement('li');
   const p = document.createElement('p');
   const i = document.createElement('i');
    
   if(inputItem.value.trim() !== ''){
    li.append(p);
    li.append(i)
    i.append('X')
    p.append(inputItem.value);
    listItems.append(li);
    clearInputItem();
    showFilterClear();
   }

}


function clearInputItem(){
    inputItem.value = "";
}


function showFilterClear(){
    inputFilter.style.display = 'block'
    btnClear.style.display = 'block'
}