import projects from '../store';

function createAddTodoBtn(type) {
    const project = projects.all[+localStorage.getItem('active-tab')];
    const element = document.createElement('button');

    element.className = `btn btn-add-todo btn-add-todo-${type} btn-open-modal`;
    element.dataset.projectId = project.id;

    element.innerHTML = `
        <i class="fa-solid fa-plus"></i> ${type === 'primary' ? 'Add Task' : ''}
    `;

    return element;
}

export default createAddTodoBtn;
