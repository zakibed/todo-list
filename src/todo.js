import Project from './project';
import projects from './store';

class Todo {
    constructor(id, projectid, task, dueDate, starred = false) {
        this.id = id;
        this.projectId = projectid;
        this.task = task;
        this.dueDate = new Date(dueDate);
        this.addedDate = new Date();
        this.starred = starred;
        this.completed = false;
    }

    static get({ todos }, id) {
        return todos.find((todo) => todo.id === +id);
    }

    static generateId({ todos }) {
        return todos.length;
    }

    add() {
        const project = Project.get(this.projectId);

        project.todos.push(this);
        projects.update();
    }

    edit(task, dueDate, starred) {
        this.task = task;
        this.dueDate = new Date(dueDate);
        this.starred = starred;

        projects.update();
    }

    delete({ todos }) {
        todos.splice(
            todos.findIndex((todo) => todo.id === this.id),
            1
        );
        projects.update();
    }
}

export default Todo;
