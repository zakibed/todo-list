import { format, isValid } from 'date-fns';

function toggleModal(show) {
    const modal = document.querySelector('.modal');
    const overlays = document.querySelectorAll('.overlay');

    if (show) {
        overlays.forEach((el) => el.classList.add('active', 'darken'));
    } else {
        modal.innerHTML = '';
        modal.className = 'modal';

        modal.removeAttribute('data-project-id');
        modal.removeAttribute('data-todo-id');

        overlays.forEach((el) => el.classList.remove('active', 'darken'));
    }
}

function createModal(action, type, item) {
    const element = document.createElement('div');

    element.classList.add('modal');

    // Return empty modal for initial page load render
    if (!action && !type && !item) return element;

    element.classList.add(`modal-${action}-${type}`, 'active');

    if (type === 'project') {
        const project = item;

        if (action === 'edit') element.dataset.projectId = project.id;

        element.innerHTML = `
            <form>
                <div class="modal-header">
                    <i class="fa-solid fa-screwdriver-wrench"></i>
                    <h3 class="modal-title">${action} Project</h3>
                </div>

                <div class="modal-input-row">
                    <label for="project-name">Name</label>
                    <input
                        type="text"
                        name="project-name"
                        id="project-name"
                        maxlength="45"
                        placeholder="My project..."
                        value="${action === 'edit' ? project.name : ''}"
                        required
                    />
                </div>

                <div class="modal-input-row">
                    <label for="project-desc">Description</label>
                    <textarea
                        name="project-desc"
                        id="project-desc"
                        rows="5"
                        maxlength="450"
                        placeholder="..."
                    >${action === 'edit' ? project.description : ''}</textarea>
                </div>

                <div class="modal-input-row">
                    <input 
                        type="color" 
                        name="project-color" 
                        id="project-color" 
                        value="${action === 'edit' ? project.color : '#8F8F8F'}"
                    />
                    <label for="project-color"> Color 
                        <span 
                            style="background: ${
                                action === 'edit' ? project.color : '#8F8F8F'
                            };"
                        ></span>
                    </label>
                </div>

                <div class="modal-btn-row">
                    <button type="reset" class="btn btn-cancel-modal">Cancel</button>
                    <button type="submit" class="btn btn-submit-modal">${action}</button>
                </div>
            </form>
        `;
    } else if (type === 'todo') {
        const todo = item;
        const dueDate =
            action === 'edit' && todo !== undefined && isValid(todo.dueDate)
                ? format(todo.dueDate, 'yyyy-MM-dd')
                : '';

        if (action === 'add') {
            element.dataset.projectId =
                document.querySelector('.btn-add-todo').dataset.projectId;
        } else {
            element.dataset.projectId = todo.projectId;
            element.dataset.todoId = todo.id;
        }

        element.innerHTML = `
            <form>
                <div class="modal-header">
                    <i class="fa-solid fa-check"></i>
                    <h3 class="modal-title">${action} Task</h3>
                </div>

                <div class="modal-input-row">
                    <label for="todo-task">Task</label>
                    <input 
                        type="text" 
                        name="todo-task" 
                        id="todo-task" 
                        maxlength="85"
                        placeholder="Stuff to do..." 
                        value="${action === 'edit' ? todo.task : ''}"
                        required 
                    />
                </div>

                <div class="modal-input-row">
                    <label for="todo-due-date">Due date</label>
                    <input 
                        type="date" 
                        name="todo-due-date" 
                        id="todo-due-date"
                        min="${format(new Date(), 'yyyy-MM-dd')}"
                        value="${dueDate}" 
                    />
                </div>

                <div class="modal-input-row">
                    <input 
                        type="checkbox" 
                        name="todo-star" 
                        id="todo-star" 
                        ${action === 'edit' && todo.starred ? 'checked' : ''}
                    />
                    <label for="todo-star">
                        Starred <span><i class="fa-regular fa-star"></i></span>
                    </label>
                </div>

                <div class="modal-btn-row">
                    <button type="reset" class="btn btn-cancel-modal">Cancel</button>
                    <button type="submit" class="btn btn-submit-modal">${action}</button>
                </div>
            </form>
        `;
    }

    return element;
}

export { createModal, toggleModal };
