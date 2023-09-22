import createDropdown from './dropdown';

function createHeader() {
    const element = document.createElement('header');

    element.classList.add('header');

    element.innerHTML = `
        <button class="btn btn-toggle-menu"><i class="fa-solid fa-bars"></i><span>Menu</span></button>
        
        <div class="logo">
            <i class="fa-regular fa-square-check"></i>
            <h1>Todo List</h1>
        </div>

        ${createDropdown('appearance').outerHTML}

        <a href="https://github.com/ikaz1/todo-list" target="_blank" class="btn btn-link-github">
            <i class="fa-brands fa-github"></i>
        </a>

        <div class="overlay"></div>
    `;

    return element;
}

export default createHeader;
