import { createModal, toggleModal } from '../components/modal';
import createMenu from '../components/menu';
import createMain from '../components/main';
import createTodoList from '../components/todoList';
import render from './render';
import Project from '../project';
import Todo from '../todo';
import projects from '../store';

function handleClicks({ target }) {
    const menu = document.querySelector('.menu');
    const projectList = document.querySelector('.user-project-list');
    const todoList = document.querySelector('.todo-list');
    const overlays = document.querySelectorAll('.overlay');
    const dropdowns = document.querySelectorAll('.dropdown');
    const tab = document.querySelector('.tab-active');

    // Toggle menu sidebar
    if (target.matches('.btn-toggle-menu')) {
        menu.classList.toggle('menu-hidden');
        // Save menu's hidden status
        localStorage.setItem('hide-menu', menu.matches('.menu-hidden'));
    }

    // Open tab and update main content
    if (target.matches('.btn-tab')) {
        tab.classList.remove('tab-active');
        target.classList.add('tab-active');

        // Save open tab's index
        localStorage.setItem('active-tab', target.tabIndex);
        // Always show todo list when opening new tab
        localStorage.setItem('hide-todo-list', false);

        // render(createMain(), main);
        render(createMain());
    }

    // Hide/open lists
    if (target.matches('.btn-toggle-list')) {
        let list;

        if (target.matches('.btn-toggle-project-list')) {
            list = projectList;
        } else if (target.matches('.btn-toggle-todo-list')) {
            list = todoList;
        }

        target.classList.toggle('list-hidden');
        list.classList.toggle('list-hidden');

        // Save lists' hidden status
        localStorage.setItem(
            'hide-project-list',
            projectList.matches('.list-hidden')
        );
        localStorage.setItem(
            'hide-todo-list',
            todoList.matches('.list-hidden')
        );
    }

    // Open dropdown
    if (target.matches('.btn-open-dropdown')) {
        const dropdown = target.nextElementSibling;

        dropdown.classList.add('active');
        overlays.forEach((el) => el.classList.add('active'));

        // Hide menu sidebar on smaller screens
        if (window.screen.width < 750) menu.classList.add('menu-hidden');
    }

    // Cancel/close modal
    if (target.matches('.btn-cancel-modal')) {
        toggleModal(false);
    }

    // Close popups when clicking on overlay
    if (target.matches('.overlay')) {
        dropdowns.forEach((el) => el.classList.remove('active'));

        toggleModal(false);

        // Hide menu sidebar on smaller screens when clicking on main overlay
        if (window.screen.width < 750 && target.matches('.main .overlay')) {
            menu.classList.add('menu-hidden');
            localStorage.setItem('hide-menu', true);
        }
    }

    // Open add project modal
    if (target.matches('.btn-add-project')) {
        render(createModal('add', 'project'));
        toggleModal(true);
    }

    // Open edit project modal
    if (target.matches('.btn-edit-project')) {
        const project = Project.get(target.dataset.projectId);

        dropdowns.forEach((el) => el.classList.remove('active'));

        render(createModal('edit', 'project', project));
        toggleModal(true);
    }

    // Delete project
    if (target.matches('.btn-delete-project')) {
        const project = Project.get(target.dataset.projectId);
        const projectTab = document.querySelector(
            `.btn-tab[data-project-id="${target.dataset.projectId}"]`
        );

        project.delete();

        if (tab.tabIndex === projectTab.tabIndex) {
            // Return to inbox tab if open tab is deleted project
            localStorage.setItem('active-tab', 0);
            // Always show todo list when opening new tab
            localStorage.setItem('hide-todo-list', false);
        } else if (projectTab.tabIndex < tab.tabIndex) {
            // Reset tab index if opened tab is after deleted project
            localStorage.setItem(
                'active-tab',
                localStorage.getItem('active-tab') - 1
            );
        }

        overlays.forEach((el) => el.classList.remove('active'));

        render(createMenu());
        render(createMain());
    }

    // Open add todo modal
    if (target.matches('.btn-add-todo')) {
        render(createModal('add', 'todo'));
        toggleModal(true);
    }

    // Open edit todo modal
    if (target.matches('.btn-edit-todo')) {
        const todoItem = target.closest('.todo');
        const project = Project.get(todoItem.dataset.projectId);
        const todo = Todo.get(project, todoItem.dataset.todoId);

        render(createModal('edit', 'todo', todo));
        toggleModal(true);
    }

    // Delete todo
    if (target.matches('.btn-delete-todo')) {
        const todoItem = target.closest('.todo');
        const project = Project.get(todoItem.dataset.projectId);
        const todo = Todo.get(project, todoItem.dataset.todoId);

        todo.delete(project);
        render(createMenu());
        render(createMain());
    }
}

function handleSubmit(e) {
    e.preventDefault();

    if (e.target.closest('.modal') !== null) {
        const modal = e.target.closest('.modal');

        // Add project
        if (modal.matches('.modal-add-project')) {
            const name = document.querySelector('#project-name').value;
            const desc = document.querySelector('#project-desc').value;
            const color = document.querySelector('#project-color').value;
            const id = Project.generateId();
            const project = new Project(id, name, desc, color);

            project.add();
            localStorage.setItem('hide-project-list', false);
        }

        // Edit project
        if (modal.matches('.modal-edit-project')) {
            const name = document.querySelector('#project-name').value;
            const desc = document.querySelector('#project-desc').value;
            const color = document.querySelector('#project-color').value;
            const project = Project.get(modal.dataset.projectId);

            project.edit(name, desc, color);
        }

        // Add todo
        if (modal.matches('.modal-add-todo')) {
            const task = document.querySelector('#todo-task').value;
            const dueDate = document.querySelector('#todo-due-date').value;
            const starred = document.querySelector('#todo-star').checked;
            const projectId = +modal.dataset.projectId;
            const project = Project.get(projectId);
            const id = Todo.generateId(project);
            const todo = new Todo(id, projectId, task, dueDate, starred);

            todo.add();
            localStorage.setItem('hide-todo-list', false);
        }

        // Edit todo
        if (modal.matches('.modal-edit-todo')) {
            const task = document.querySelector('#todo-task').value;
            const dueDate = document.querySelector('#todo-due-date').value;
            const starred = document.querySelector('#todo-star').checked;
            const project = Project.get(modal.dataset.projectId);
            const todo = Todo.get(project, modal.dataset.todoId);

            todo.edit(task, dueDate, starred);
        }

        toggleModal(false);
        render(createMenu());
        render(createMain());
    }
}

function handleChanges({ target }) {
    const root = document.querySelector(':root');
    const tab = document.querySelector('.tab-active');

    // Change project modal's color display
    if (target.matches('[id$="project-color"]')) {
        const span = target.nextElementSibling.children[0];

        span.style.background = target.value;
    }

    // Set theme and reset appearance values
    if (target.matches('[name="theme"]')) {
        const accentSelect = document.querySelector('#accent-options');
        const layoutInput = document.querySelector('#layout-option-1');

        accentSelect.value = 'default';
        layoutInput.checked = true;

        root.className = `theme-${target.value} accent-default layout-1`;

        localStorage.setItem('theme', target.value);
        localStorage.setItem('accent', 'default');
        localStorage.setItem('layout', '1');
    }

    // Set accent color and layout style
    if (target.matches('[name="accent"], [name="layout"]')) {
        const rootClass = Array.from(root.classList);
        const index = rootClass.findIndex((x) => x.startsWith(target.name));

        rootClass.splice(index, 1, `${target.name}-${target.value}`);

        root.className = rootClass.join(' ');

        localStorage.setItem(target.name, target.value);
    }

    // Sort and filter todos
    if (target.matches('[name^="sort"], [name^="filter"]')) {
        const sortBy = document.querySelector('[name="sort-by"]:checked').value;
        const sortOrder = document.querySelector(
            '[name="sort-order"]:checked'
        ).value;
        const filter = document.querySelector('[name="filter"]:checked').value;
        const project = projects.all[tab.tabIndex];

        project.sortBy = sortBy;
        project.sortOrder = sortOrder;
        project.filter = filter;

        projects.update();
        render(createTodoList());
    }

    // Mark todo checkbox and set todo as complete
    if (target.matches('input.todo-checkbox')) {
        const todoItem = target.closest('.todo');
        const project = Project.get(todoItem.dataset.projectId);
        const todo = Todo.get(project, todoItem.dataset.todoId);

        todoItem.classList.toggle('todo-completed');
        todo.completed = todoItem.matches('.todo-completed');

        projects.update();
        render(createTodoList());
    }

    // Star todo
    if (target.matches('input.todo-checkbox-starred')) {
        const todoItem = target.closest('.todo');
        const project = Project.get(todoItem.dataset.projectId);
        const todo = Todo.get(project, todoItem.dataset.todoId);

        todoItem.classList.toggle('todo-starred');
        todo.starred = todoItem.matches('.todo-starred');

        projects.update();
        render(createMenu());

        // Rerender todo list if on starred tab
        if (tab.tabIndex === 1) render(createMain());
    }
}

function handleEvents() {
    // Handle click, change, and submit events
    document.documentElement.addEventListener('click', handleClicks);
    document.documentElement.addEventListener('change', handleChanges);
    document.documentElement.addEventListener('submit', handleSubmit);

    // Hide (close) list when fully covered after transition
    document.documentElement.addEventListener('transitionend', (e) => {
        if (!e.target.matches('.list-cover')) return;
        if (e.propertyName !== 'height') return;

        const list = e.target.previousElementSibling;

        if (list.matches('.list-hidden')) list.setAttribute('hidden', true);
    });

    // Show list before completed transition when opened
    document.documentElement.addEventListener('transitionstart', (e) => {
        if (!e.target.matches('.list-cover')) return;
        if (e.propertyName !== 'height') return;

        const list = e.target.previousElementSibling;

        if (!list.matches('.list-hidden')) list.removeAttribute('hidden');
    });
}

export default handleEvents;
