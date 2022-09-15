
const container = document.querySelector('#container');
const removableContainer = document.createElement('div');
removableContainer.classList.add('remove');
container.appendChild(removableContainer);

alert('Hello hello hello!\nDouble-click for a whole new show!\nPress space key to enter grey mode!\nClick on Shift to shift what you see!\nOr to mix it all up, Enter is your key!')

for (i = 0; i < 16; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    removableContainer.appendChild(row);
    for (p=0; p < 16; p++) {
        let block = document.createElement('div');
        block.classList.add('block');
        block.style.cssText = `flex: 1 1 auto; margin: 0; width: 6.25vh; height: 6.25vh;`
        row.appendChild(block);
    };
};

// addColor();
addBlack();
addEventMagicOther();

let roundToggleTracking = 0;
let roundTracking = 0;
let blackColorToggleTracking = 0;

addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        blackColorToggleTracking += 1;
        if (blackColorToggleTracking % 2 === 0) {
        removeColor();
        } else {
            addColor();
        }

        
//     let blocks = document.querySelectorAll('.block');
//     blocks.forEach((block) => {
//         block.removeEventListener('mouseover', randomBackgroundColor)
//         });
//    addBlack();

    } else if (e.keyCode === 13) {
        roundToggleTracking += 1;
        if (roundToggleTracking % 2 === 0) {
            removeRound();
            let blocks = document.querySelectorAll('.block');
            blocks.forEach((block) => {
                block.removeEventListener('mouseover', toggleRound);
            })
        } else {
            let blocks = document.querySelectorAll('.block');
            blocks.forEach((block) => {
                block.addEventListener('mouseover', toggleRound);
            })
        } 
    } else if (e.keyCode === 16) {
        roundTracking += 1;
        if (roundTracking % 2 === 0) {
            removeRound();
        } else {
            removeRound();
            let blocks = document.querySelectorAll('.block');
            blocks.forEach((block) => {
                block.classList.add('round');
            })
        }
    } else {
        return
    }
})


function removeRound() {
    let rounds = document.querySelectorAll('.round');
    rounds.forEach((round) => {
        round.classList.remove('round');
    })
}

function toggleRound (e) {
    e.target.classList.toggle('round');
}

function generateRandomRGB() {
    return Math.floor(Math.random() * 256);
};

function adjustGrid(num) {
    roundToggleTracking = 0;
    roundTracking = 0;
    let blockSize = (100/num);
    let newRemovableContainer = document.createElement('div');
    newRemovableContainer.classList.add('remove');
    container.appendChild(newRemovableContainer);
    for (i = 0; i < num; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        newRemovableContainer.appendChild(row)
        for (p = 0; p < num; p++) {
            let block = document.createElement('div');
            block.classList.add('block');
            block.style.cssText = `flex: 1 1 auto; margin: 0; width: ${blockSize}vh; height: ${blockSize}vh`;
            row.appendChild(block);
        }
    }
    // addColor();
    addBlack();
    addEventMagicOther();
}

function promptOutcomes(input) {
    if (input === null || input === '') {
        return
    } else if (input < 1) {
        alert('Oh my, oh no!\nI cannot count that low!')
        return
    } else if (isNaN(+input)) {
        alert('What an interesting word!\nBut I cannot make it so...')
        return
    } else if (input <= 100) {
        document.querySelector('.remove').remove();
        adjustGrid(+input);
    }
}

function addColor() {
    let blocks = document.querySelectorAll('.block');
    blocks.forEach((block) => {
        block.addEventListener('mouseover', randomBackgroundColor)
        });
    }

function removeColor() {
    let blocks = document.querySelectorAll('.block');
    blocks.forEach((block) => {
        block.removeEventListener('mouseover', randomBackgroundColor)
    })
}

function randomBackgroundColor(e) {
    let r = generateRandomRGB();
    let g = generateRandomRGB();
    let b = generateRandomRGB();
    e.target.classList.add('colored');
    e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function addBlack() {  
    let blocks = document.querySelectorAll('.block');
    blocks.forEach((block) => {
        let blackness = 1;    
        block.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('colored')) {
                blackness = 1;
                e.target.classList.remove('colored');
                e.target.style.backgroundColor = 'rgb(255,255,255)';
            } else if (blackness >= 0) {
                blackness = blackness - 0.1;
                rgbValue = (255 * blackness)
                e.target.style.backgroundColor = `rgb(${rgbValue},${rgbValue},${rgbValue})`;
            };
        });;
        });
    }

function addEventMagicOther() {
    let blocks = document.querySelectorAll('.block');
    blocks.forEach((block) => {
        block.addEventListener('click', randomBackgroundColor);
        block.addEventListener('dblclick', () => {
            const gridChangeValue = prompt('A number of blocks per row\nthat will double as the number of rows\nis what I request to know\nand we shall see how that goes', '');
            promptOutcomes(gridChangeValue);
            if (gridChangeValue > 100) {
                let newValue = 101;
                while (newValue > 100) {
                    newValue = prompt('Unfortunately so,\nthere is a limit to how much I can grow.', '')
                    promptOutcomes(newValue);
                }
            }
        })
    });
}

