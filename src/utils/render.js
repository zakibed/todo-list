function render(element, node) {
    if (!node) {
        const placeholder = document.querySelector(`.${element.classList[0]}`);

        placeholder.replaceWith(element);
        return;
    }

    node.appendChild(element);
}

export default render;
