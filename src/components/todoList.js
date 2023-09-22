import { addDays, isValid, isToday, isTomorrow } from 'date-fns';
import formatDueDate from '../utils/formatDueDate';
import createAddTodoBtn from './addTodoBtn';
import Project from '../project';
import projects from '../store';

function createTodoItem(todo) {
    const project = Project.get(todo.projectId);
    const element = document.createElement('li');

    element.classList.add('todo');
    element.dataset.projectId = todo.projectId;
    element.dataset.todoId = todo.id;

    if (todo.completed) element.classList.add('todo-completed');
    if (todo.starred) element.classList.add('todo-starred');

    // Style due date element
    let dueDateColor = 'var(--clr-date)';
    let dueDateIcon = 'fa-solid fa-calendar-days';

    if (isValid(todo.dueDate)) {
        const currentDate = new Date();

        if (todo.dueDate <= addDays(currentDate, 7)) {
            dueDateColor = 'var(--clr-date-week)';
            dueDateIcon = 'fa-solid fa-calendar-week';
        }

        if (isTomorrow(todo.dueDate)) {
            dueDateColor = 'var(--clr-date-tomorrow)';
            dueDateIcon = 'fa-solid fa-calendar-day';
        }

        if (isToday(todo.dueDate)) {
            dueDateColor = 'var(--clr-date-today)';
            dueDateIcon = 'fa-solid fa-calendar-day';
        }

        if (todo.dueDate < currentDate && !isToday(todo.dueDate)) {
            dueDateColor = 'var(--clr-date-overdue)';
            dueDateIcon = 'fa-solid fa-calendar-xmark';
        }
    }

    element.innerHTML = `
        <label class="todo-checkbox-container">
            <input 
                type="checkbox" 
                name="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
            />
        </label>

        <div class="todo-content">
            <div class="todo-task">
                <span class="todo-task-star"><i class="fa-solid fa-star"></i></span>
                <span class="todo-task-desc text-overflow-hidden">
                    ${todo.task}
                </span>
            </div>

            <div class="todo-info">
                <div class="todo-info-due" style="color: ${dueDateColor}">
                    <i class="${dueDateIcon}"></i>
                    <span class="todo-due-date">${formatDueDate(
                        todo.dueDate
                    )}</span>
                </div>

                <div class="todo-info-project">
                    <span 
                        class="project-color todo-project-color" 
                        style="background: ${project.color};"
                    ></span>
                    <span class="project-name todo-project-name">
                        ${project.name}
                    </span>
                </div>
            </div>
        </div>

        <div class="todo-options">
            <label class="label-todo-starred">
                <input 
                    type="checkbox" 
                    class="todo-checkbox-starred" 
                    ${todo.starred ? 'checked' : ''} 
                />
                <span class="btn btn-star-todo"><i class="fa-regular fa-star"></i></span>
            </label>

            <button class="btn btn-edit-todo btn-open-modal">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>

            <button class="btn btn-delete btn-delete-todo">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `;

    // Hide/show info elements based on properties
    const tabIndex = +localStorage.getItem('active-tab');

    if (!isValid(todo.dueDate) && tabIndex > 3) {
        // Remove container element if both no due date and open tab is on user project
        element.querySelector('.todo-info').remove();
    } else if (!isValid(todo.dueDate)) {
        // Remove due date element if no due date
        element.querySelector('.todo-info-due').remove();
    } else if (tabIndex > 3) {
        // Remove project element if open tab is on user project
        element.querySelector('.todo-info-project').remove();
    }

    return element;
}

function createTodoList() {
    const project = projects.all[+localStorage.getItem('active-tab')];
    const element = document.createElement('ul');

    element.classList.add('todo-list');

    // Filter todos
    const todos =
        project.filter === 'hide-completed'
            ? project.todos.filter((todo) => !todo.completed)
            : project.todos;

    // Append todos to list
    todos.forEach((todo) => element.appendChild(createTodoItem(todo)));

    // Display add todo btn if open tab is on user project
    if (projects.user.includes(project)) {
        const li = document.createElement('li');

        li.appendChild(createAddTodoBtn('primary'));
        element.appendChild(li);
    }

    // Hide/show todo list based on previous hidden status
    const hideList = localStorage.getItem('hide-todo-list') === 'true';

    element.classList.toggle('list-hidden', hideList);

    return element;
}

export default createTodoList;
