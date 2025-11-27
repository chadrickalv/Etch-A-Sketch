
let drawing = false;
document.body.onmousedown = () => (drawing = true);
const container = document.querySelector('.container');
container.addEventListener('mouseover', (e) => {
    if (drawing && e.target.classList.contains('square')) {
        // random RGB color
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
    });

function createGrid(size = 16) {
    // Clear existing squares
    container.innerHTML = '';

    // Calculate square size in pixels based on container width (container is 400px in CSS)
    const containerWidth = container.clientWidth;
    const squareSize = Math.floor(containerWidth / size);

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        // Use fixed pixel dimensions so flex-wrap produces a perfect grid
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        container.appendChild(square);
    }
}

// Build initial grid (16x16)
createGrid(16);
//div to hold reset + new grid
const divControls = document.createElement('div');
divControls.classList.add('control-container');
document.body.appendChild(divControls);



// Button to create a New grid
const again = document.createElement('button');
again.classList.add('again');
again.textContent = 'New Grid';
divControls.appendChild(again);

again.addEventListener('click', () => {
    let userInput = prompt('Enter a number up to 100 for a new Grid of squares:');
    let gridSize = parseInt(userInput);

    if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        alert('Please enter a valid number between 1 and 100.');
        return;
    }

    createGrid(gridSize);
});

// Button to reset the grid
const reset = document.createElement('button');
reset.classList.add('reset');
reset.textContent = 'Reset Grid';
divControls.appendChild(reset);

reset.addEventListener('click', () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = 'transparent';
    });
});

// A container div to hold color buttons
const divBtns = document.createElement('div');
divBtns.classList.add('button-container');
document.body.appendChild(divBtns, container);


// Event delegation: works for initial and newly created squares
const randomColorBtn = document.createElement('button');
randomColorBtn.classList.add('random-color');
randomColorBtn.textContent = 'RGB';
divBtns.appendChild(randomColorBtn);

randomColorBtn.addEventListener('click', () => {
    container.addEventListener('mouseover', (e) => {
    if (drawing && e.target.classList.contains('square')) {
        // random RGB color
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
    });
});

const colorModes = [
    { name: 'black', color: 'black'},
    { name: 'red', color: 'red'},
    { name: 'green', color: 'green'},
    { name: 'blue', color: 'blue'},
    { name: 'yellow', color: 'yellow'},
    { name: 'pink', color: 'pink'},
    { name: 'purple', color: 'purple'},
    { name: 'eraser', color: 'transparent'},

]

colorModes.forEach(mode => {
    const btn = document.createElement('button');
    btn.classList.add(mode.name);
    btn.textContent = mode.name.charAt(0).toUpperCase() + mode.name.slice(1);
    divBtns.appendChild(btn);

    btn.addEventListener('click', () => {
        container.addEventListener('mouseover', (e) => {
            if (drawing && e.target.classList.contains('square')) {
            e.target.style.backgroundColor = mode.color;
            }
        });
    });
});


    