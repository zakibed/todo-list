import projects from '../store';

function createMenuItem(project, index) {
    const element = document.createElement('li');

    element.classList.add('menu-item');

    if (projects.default.includes(project)) {
        element.innerHTML = `
            <button class="btn btn-tab" tabindex="${index}">
                <i class="${project.icon}"></i>
                ${project.name} 
                <span class="todo-count">${project.todos.length}</span>
            </button>
        `;
    } else if (projects.user.includes(project)) {
        element.innerHTML = `
            <button 
                class="btn btn-tab" 
                tabindex="${index + 4}"
                data-project-id="${project.id}"
            >
                <span 
                    class="project-color" 
                    style="background: ${project.color};"
                ></span>
                <span class="project-name text-overflow-hidden">
                    ${project.name}
                </span>
                <span class="todo-count">${project.todos.length}</span>
            </button>

            <button 
                class="btn btn-edit-project 
                btn-open-modal" 
                data-project-id="${project.id}"
            >
                <i class="fa-solid fa-pen-to-square"></i>
            </button>

            <button 
                class="btn btn-delete 
                btn-delete-project" 
                data-project-id="${project.id}"
            >
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;
    }

    return element;
}

function createMenuList(arr) {
    const element = document.createElement('ul');

    element.classList.add('menu-list');

    if (arr === projects.default) {
        element.classList.add('default-project-list');
    } else if (arr === projects.user) {
        element.classList.add('user-project-list');
    }

    arr.forEach((project, index) => {
        element.appendChild(createMenuItem(project, index));
    });

    return element;
}

function createMenu() {
    const element = document.createElement('nav');

    element.classList.add('menu');

    element.innerHTML = `
        <div class="menu-section">
            <div class="menu-header">
                <i class="fa-solid fa-list-check"></i>
                <h4 class="menu-title">Tasks</h4>
            </div>

            ${createMenuList(projects.default).outerHTML}
        </div>

        <div class="menu-section">
            <div class="menu-header">
                <i class="fa-solid fa-screwdriver-wrench"></i>
                <h4 class="menu-title">Projects</h4>

                <button class="btn btn-add-project btn-open-modal" data-modal-selector=".modal-add-project">
                    <i class="fa-solid fa-plus"></i>
                </button>
                <button class="btn btn-toggle-list btn-toggle-project-list">
                    <i class="fa-solid fa-angle-down"></i>
                </button>
            </div>
           
          
            ${createMenuList(projects.user).outerHTML}

            <div class="list-cover"></div>
        </div>

        <div class="overlay"></div>
    `;

    // Highlight active/open tab
    const tabIndex = +localStorage.getItem('active-tab');
    const tabs = element.querySelectorAll('.btn-tab');

    tabs.forEach((el) => {
        if (el.tabIndex === tabIndex) el.classList.add('tab-active');
    });

    // Hide/show menu and user project list based on previous hidden status
    const hideMenu = localStorage.getItem('hide-menu') === 'true';
    const hideList = localStorage.getItem('hide-project-list') === 'true';
    const toggleListBtn = element.querySelector('.btn-toggle-list');
    const projectList = element.querySelector('.user-project-list');

    element.classList.toggle('menu-hidden', hideMenu);
    toggleListBtn.classList.toggle('list-hidden', hideList);
    projectList.classList.toggle('list-hidden', hideList);

    return element;
}

export default createMenu;
