function createDropdown(type) {
    const element = document.createElement('div');

    element.classList.add('dropdown-container');

    if (type === 'appearance') {
        element.innerHTML = `
            <button class="btn btn-open-dropdown btn-toggle-appearance">
                <i class="fa-solid fa-palette"></i>
            </button>
        
            <div class="dropdown dropdown-appearance">
                <h4 class="dropdown-title">Appearance</h4>
        
                <div class="dropdown-row">
                    <p>Theme</p>
        
                    <label for="theme-option-light" class="form-control">
                        <input type="radio" name="theme" id="theme-option-light" value="light" checked />
                        <span class="btn radio-switch"><i class="fa-regular fa-sun"></i></span>
                    </label>
        
                    <label for="theme-option-dark" class="form-control">
                        <input type="radio" name="theme" id="theme-option-dark" value="dark" />
                        <span class="btn radio-switch"><i class="fa-regular fa-moon"></i></span>
                    </label>
                </div>
        
                <div class="dropdown-row">
                    <p>Accent</p>

                    <select name="accent" id="accent-options">
                        <option value="default">Default</option>
                        <option value="noir">Noir</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="orange">Orange</option>
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                    </select>
                </div>
        
                <div class="dropdown-row">
                    <p>Layout</p>
        
                    <label for="layout-option-1" class="form-control">
                        <input type="radio" name="layout" id="layout-option-1" value="1" checked />
                        <span class="btn radio-switch">1</span>
                    </label>
        
                    <label for="layout-option-2" class="form-control">
                        <input type="radio" name="layout" id="layout-option-2" value="2" />
                        <span class="btn radio-switch">2</span>
                    </label>
        
                    <label for="layout-option-3" class="form-control">
                        <input type="radio" name="layout" id="layout-option-3" value="3" />
                        <span class="btn radio-switch">3</span>
                    </label>
                </div>
            </div>
        `;
    } else if (type === 'sort') {
        element.innerHTML = `
            <button class="btn btn-open-dropdown btn-toggle-sort">
                <i class="fa-solid fa-sort"></i><span>Sort</span>
            </button>

            <div class="dropdown dropdown-sort">
                <div class="dropdown-section">
                    <h4 class="dropdown-title">Sort tasks by</h4>

                    <label for="sort-by-added-date" class="dropdown-row">
                        <input
                            type="radio"
                            name="sort-by"
                            id="sort-by-added-date"
                            value="added-date"
                            checked
                        />
                        <span class="btn radio-switch">Date added</span>
                    </label>

                    <label for="sort-by-due-date" class="dropdown-row">
                        <input type="radio" name="sort-by" id="sort-by-due-date" value="due-date" />
                        <span class="btn radio-switch"> Due date</span>
                    </label>
                </div>

                <div class="dropdown-section">
                    <h4 class="dropdown-title">Order</h4>

                    <label for="sort-order-oldest" class="dropdown-row">
                        <input
                            type="radio"
                            name="sort-order"
                            id="sort-order-oldest"
                            value="oldest"
                            checked
                        />
                        <span class="btn radio-switch">
                            <i class="fa-solid fa-arrow-up-short-wide"></i> Oldest
                        </span>
                    </label>

                    <label for="sort-order-newest" class="dropdown-row">
                        <input type="radio" name="sort-order" id="sort-order-newest" value="newest" />
                        <span class="btn radio-switch">
                            <i class="fa-solid fa-arrow-down-wide-short"></i> Newest
                        </span>
                    </label>
                </div>
            </div>
        `;
    } else if (type === 'filter') {
        element.innerHTML = `
            <button class="btn btn-open-dropdown btn-toggle-filter">
                <i class="fa-solid fa-filter"></i><span>Filter</span>
            </button>

            <div class="dropdown dropdown-filter">
                <h4 class="dropdown-title">Filter tasks</h4>

                <label for="filter-show-all" class="dropdown-row">
                    <input type="radio" name="filter" id="filter-show-all" value="show-all" checked />
                    <span class="btn radio-switch">Show all</span>
                </label>

                <label for="filter-hide-completed" class="dropdown-row">
                    <input
                        type="radio"
                        name="filter"
                        id="filter-hide-completed"
                        value="hide-completed"
                    />
                    <span class="btn radio-switch">Hide completed</span>
                </label>
            </div>
        `;
    } else if (type === 'project') {
        element.innerHTML = `
            <button class="btn btn-open-dropdown btn-toggle-more">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
        
            <div class="dropdown dropdown-more">
                <button
                    class="dropdown-row btn btn-edit-project btn-open-modal"
                    data-modal-selector=".modal-edit-project"
                >
                    <i class="fa-solid fa-pen-to-square"></i> Edit project
                </button>
        
                <button class="dropdown-row btn btn-delete btn-delete-project">
                    <i class="fa-regular fa-trash-can"></i> Delete project
                </button>
            </div>
        `;
    }

    return element;
}

export default createDropdown;
