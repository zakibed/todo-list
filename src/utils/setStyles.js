function setStyles() {
    const root = document.querySelector(':root');
    const theme = localStorage.getItem('theme') || 'light';
    const accent = localStorage.getItem('accent') || 'default';
    const layout = localStorage.getItem('layout') || '1';
    const themeInput = document.querySelector(`#theme-option-${theme}`);
    const layoutInput = document.querySelector(`#layout-option-${layout}`);
    const accentSelect = document.querySelector('#accent-options');

    themeInput.checked = true;
    layoutInput.checked = true;
    accentSelect.value = accent;

    root.className = `theme-${theme} accent-${accent} layout-${layout}`;
}

export default setStyles;
