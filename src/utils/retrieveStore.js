import { parseISO, add } from 'date-fns';
import Project from '../project';
import Todo from '../todo';
import projects from '../store';

function retrieveStore() {
    const storage = localStorage.getItem('projects');

    if (storage === null) {
        // Create intial page load welcome project
        const welcome = new Project(0, 'Welcome! 🎉', '', '#3b96eb');

        projects.user.push(welcome);
        welcome.todos.push(
            new Todo(0, 0, 'Get started with personal projects 🛠️'),
            new Todo(1, 0, 'Create, edit, and mark tasks as complete ✔️'),
            new Todo(2, 0, 'Set due dates as reminders 📆', new Date()),
            new Todo(3, 0, 'Star important tasks 🎯', '', true),
            new Todo(4, 0, 'Organize tasks by sorting and filtering ⬆️⬇️'),
            new Todo(5, 0, 'Customize with themes and colors 🎨')
        );
        welcome.todos.forEach((todo, index) => {
            todo.addedDate = add(todo.addedDate, { seconds: index });
        });

        welcome.todos[1].completed = true;

        projects.update();

        return;
    }

    const data = JSON.parse(storage, (key, value) =>
        key.endsWith('Date') ? parseISO(value) : value
    );

    projects.default = [];
    projects.user = [];

    data.default.forEach((project) => {
        projects.default.push({ ...project, todos: [] });
    });

    data.user.forEach((project) => {
        const newProject = new Project(
            project.id,
            project.name,
            project.description,
            project.color
        );

        newProject.filter = project.filter;
        newProject.sortOrder = project.sortOrder;
        newProject.sortBy = project.sortBy;

        project.todos.forEach((todo) => {
            const newTodo = new Todo(
                todo.id,
                todo.projectId,
                todo.task,
                todo.dueDate,
                todo.starred
            );

            newTodo.addedDate = todo.addedDate;
            newTodo.completed = todo.completed;

            newProject.todos.push(newTodo);
        });

        projects.user.push(newProject);
    });

    projects.update();
}

export default retrieveStore;
