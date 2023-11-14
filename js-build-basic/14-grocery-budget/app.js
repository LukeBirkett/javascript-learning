// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');


// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearList);

// ****** FUNCTIONS **********
function addItem (e) {
    e.preventDefault();
    
    const value = grocery.value;
    const id = new Date().getTime().toString()
    
    if (value && !editFlag) {
        const element = document.createElement('article');
        
        // add class
        element.classList.add('grocery-item');
        
        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;

        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
          <button type="button" class="delete-btn"><i class="fas fa-edit"></i></button>
        </div>`;

        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);

        // append child
        list.appendChild(element);

        //display alert
        displayAlert('item added', 'success');

        // show container
        container.classList.add('show-container');

        // add to local storage
        addToLocalStorage(id, value);

        // set back to default
        setBackToDefault();

    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert('please enter value', 'danger')
    }
};

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 2000);
};

function setBackToDefault(id, value){
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
};

function clearList () {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function (item){
            list.removeChild(item);
        });
    };
    container.classList.remove('show-container');
    displayAlert('list removed', 'danger');
    setBackToDefault();

};

// delete item
function deleteItem (e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {container.classList.remove('show-container')};
    displayAlert('item removed', "danger");
    setBackToDefault();
    // remove from local storage
    // removeFromLocalStorage(id);
};

// edit item
function editItem (e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item 
    editElement = e.currentTarget.parentElement.previousElementSibling;

    // set form value
    grocery.value = editElement.innerHTML;

    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
};

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    const grocery = {id, value};
    let items = localStorage.getItem('list')? JSON.parse(localStorage.getItem("list")):[];
    console.log(items)
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
};

function removeFromLocalStorage(id){
    console.log('removed from  local storage')
};

// ****** SETUP ITEMS **********
function editLocalStorage(id, value){
    console.log('edit local storage')
};
