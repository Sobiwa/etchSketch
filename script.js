
const container = document.querySelector('#container');

// for (i = 1; i < 257; i++) {
//     let block = document.createElement('div')
//     block.classList.add('block');
//     container.appendChild(block);
// }

for (i = 0; i < 16; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);
    for (p=0; p < 16; p++) {
        let block = document.createElement('div');
        block.classList.add('block');
        row.appendChild(block);
    };
};
const blocks = document.querySelectorAll('.block');

const colorArray = ['red','orange','yellow','green','blue', 'purple']
blocks.forEach((block) => {
    block.addEventListener('mouseover', () => {
        let r = generateRandomRGB();
        let g = generateRandomRGB();
        let b = generateRandomRGB();
        block.style.cssText = `background-color: rgb(${r},${g},${b})`;
    });
    block.addEventListener('click', () => {
        let r = generateRandomRGB();
        let g = generateRandomRGB();
        let b = generateRandomRGB();
        block.style.cssText = `background-color: rgb(${r},${g},${b})`;
    });
});

function generateRandomRGB() {
    return Math.floor(Math.random() * 256);
};