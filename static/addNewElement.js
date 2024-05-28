// 28/05/24
// Wagg.ly/static/addNewDog.js

function addNewDog() {
    const listElement = document.getElementById('dogs-list');
    const list = listElement.querySelectorAll(".column");
    const count = list.length + 1;

    const dog = document.createElement('div');
    dog.innerHTML = `
        <div id="dog-${count}" class="column">
            <h2>Dog ${count}</h2>
            <p>Name:</p>
            <input id="dog-name-${count}" type="text" required>
            <p>Age:</p>
            <input id="dog-age-${count}" type="text" required>
            <p>Size:</p>
            <input id="dog-size-${count}" type="text" required>
        </div>
    `;

    listElement.appendChild(dog);
}

//addNewDog();