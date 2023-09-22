import { isToday } from 'date-fns';

const projects = {
    default: [
        {
            name: 'Inbox',
            description: 'This is where all of your tasks go.',
            icon: 'fa-solid fa-inbox',
            filter: 'show-all',
            sortBy: 'added-date',
            sortOrder: 'oldest',
            todos: []
        },
        {
            name: 'Starred',
            description: 'This is where all of your starred tasks go.',
            icon: 'fa-solid fa-star',
            filter: 'show-all',
            sortBy: 'added-date',
            sortOrder: 'oldest',
            todos: []
        },
        {
            name: 'Today',
            description: 'This is where all of your tasks due for today go.',
            icon: 'fa-solid fa-calendar-day',
            filter: 'show-all',
            sortBy: 'added-date',
            sortOrder: 'oldest',
            todos: []
        },
        {
            name: 'Upcoming',
            description: 'This is where all of your upcoming due tasks go.',
            icon: 'fa-solid fa-calendar-days',
            filter: 'show-all',
            sortBy: 'added-date',
            sortOrder: 'oldest',
            todos: []
        }
    ],
    user: [],

    get all() {
        return this.default.concat(this.user);
    },

    update() {
        // Add todos to default categories
        const inbox = [];
        const starred = [];
        const today = [];
        const upcoming = [];

        this.user.forEach(({ todos }) => {
            todos.forEach((todo) => {
                inbox.push(todo);

                if (todo.starred) starred.push(todo);
                if (isToday(todo.dueDate)) today.push(todo);
                if (todo.dueDate > new Date()) upcoming.push(todo);
            });
        });

        this.default[0].todos = inbox;
        this.default[1].todos = starred;
        this.default[2].todos = today;
        this.default[3].todos = upcoming;

        // Sort todos
        this.all.forEach(({ todos, sortBy, sortOrder }) => {
            todos.sort((a, b) => {
                let valA;
                let valB;

                if (sortBy === 'added-date') {
                    [valA, valB] = [a.addedDate, b.addedDate];
                } else if (sortBy === 'due-date') {
                    [valA, valB] = [a.dueDate, b.dueDate];
                }

                return sortOrder === 'oldest' ? valA - valB : valB - valA;
            });
        });

        localStorage.setItem('projects', JSON.stringify(this));
    }
};

export default projects;
