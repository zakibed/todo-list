import { createModal } from '../components/modal';
import createHeader from '../components/header';
import createMenu from '../components/menu';
import createMain from '../components/main';
import retrieveStore from './retrieveStore';
import render from './render';
import setStyles from './setStyles';
import handleEvents from './handleEvents';

function loadPage() {
    const content = document.querySelector('#content');

    retrieveStore();

    localStorage.setItem('active-tab', 0);
    localStorage.setItem('hide-project-list', false);
    localStorage.setItem('hide-todo-list', false);

    render(createHeader(), content);
    render(createMenu(), content);
    render(createMain(), content);
    render(createModal(), content);

    setStyles();
    handleEvents();
}

export default loadPage;
