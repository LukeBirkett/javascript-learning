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
        console.log(element);
        
        // add class
        element.classList.add('grocery-item');
        console.log(element);
        
        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        console.log(attr);

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
        console.log('edit');
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

function addToLocalStorage(id, value){
    console.log('added to local storage')
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
function deleteItem () {console.log("del")};
function editItem () {console.log("edit")};

// edit item

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
