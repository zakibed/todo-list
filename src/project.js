import projects from './store';

class Project {
    constructor(id, name, description, color) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.color = color;
        this.filter = 'show-all';
        this.sortBy = 'added-date';
        this.sortOrder = 'oldest';
        this.todos = [];
    }

    static get(id) {
        return projects.user.find((project) => project.id === +id);
    }

    static generateId() {
        return projects.user.length;
    }

    add() {
        projects.user.push(this);

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    edit(name, description, color) {
        this.name = name;
        this.description = description;
        this.color = color;

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    delete() {
        projects.user.splice(
            projects.user.findIndex((project) => project.id === this.id),
            1
        );
        // Reset project ids
        projects.user.forEach((project, index) => {
            project.id = index;
            project.todos.forEach((todo) => {
                todo.projectId = index;
            });
        });
        projects.update();
    }
}

export default Project;
