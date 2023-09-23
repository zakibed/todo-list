import { parseISO, add } from 'date-fns';
import Project from '../project';
import Todo from '../todo';
import projects from '../store';

function retrieveStore() {
    if (localStorage.getItem('projects') === null) {
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

    // Get projects and todos from localStorage and reinitialize with constructors
    const storage = JSON.parse(
        localStorage.getItem('projects'),
        (key, value) => (key.endsWith('Date') ? parseISO(value) : value)
    );

    projects.default = [];
    projects.user = [];

    storage.default.forEach((project) => {
        projects.default.push({
            ...project,
            todos: project.todos.map((todo) => Object.assign(new Todo(), todo))
        });
    });

    storage.user.forEach((project) => {
        projects.user.push(
            Object.assign(new Project(), project, {
                todos: project.todos.map((todo) =>
                    Object.assign(new Todo(), todo)
                )
            })
        );
    });
}

export default retrieveStore;
