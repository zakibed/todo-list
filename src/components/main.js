import createDropdown from './dropdown';
import createAddTodoBtn from './addTodoBtn';
import createTodoList from './todoList';
import projects from '../store';

function createMain() {
    const project = projects.all[+localStorage.getItem('active-tab')];
    const isUserProject = projects.user.includes(project);
    const element = document.createElement('main');

    element.classList.add('main');
    element.dataset.projectName = project.name;

    element.innerHTML = `
        <div class="container">
            <section class="view-section">
                <header class="view-header">
                    ${
                        isUserProject
                            ? `<span class="project-color" style="background: ${project.color};"></span>`
                            : `<i class="${project.icon}"></i>`
                    }
                    <h2 class="view-title text-overflow-hidden">
                        ${project.name}
                    </h2>

                    ${createDropdown('sort').outerHTML}
                    ${createDropdown('filter').outerHTML}
                    ${isUserProject ? createDropdown('project').outerHTML : ''}
                </header>

                <p class="view-desc">${project.description}</p>

                <p class="view-todo-count">
                    Tasks
                    <span class="todo-count">${project.todos.length}</span>
                </p>

                ${isUserProject ? createAddTodoBtn('secondary').outerHTML : ''}

                <button class="btn btn-toggle-list btn-toggle-todo-list">
                    <i class="fa-solid fa-angle-down"></i>
                </button>
            </section>

            <section class="todo-section">
                ${createTodoList().outerHTML}
                <div class="list-cover"></div>
            </section>
        </div>

        <div class="overlay"></div>
    `;

    // Set project id attributes on user project dropdown btns
    if (isUserProject) {
        const editProjectBtn = element.querySelector('.btn-edit-project');
        const deleteProjectBtn = element.querySelector('.btn-delete-project');

        editProjectBtn.dataset.projectId = project.id;
        deleteProjectBtn.dataset.projectId = project.id;
    }

    // Set sort and filter input values
    element.querySelector(`[value="${project.sortBy}"]`).checked = true;
    element.querySelector(`[value="${project.sortOrder}"]`).checked = true;
    element.querySelector(`[value="${project.filter}"]`).checked = true;

    // Display toggle list btn's state based on todo list's hidden status
    const hideList = localStorage.getItem('hide-todo-list') === 'true';
    const toggleListBtn = element.querySelector('.btn-toggle-todo-list');

    toggleListBtn.classList.toggle('list-hidden', hideList);

    return element;
}

export default createMain;
