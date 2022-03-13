let img = new Image();

img.src = "robed-man-spreadsheet.png";

img.onload = function () {
    init();
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const scale = 2;
const width = 60;
const height = 60;
const scaledWidth = 60;
const scaledHeight = 60;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
        frameX * width, frameY * height, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
}

const cycleLoop = [0, 1, 2, 3, 0, 1, 2, 3];
let currentLoopIndex = 0;
let frameCount = 0;

function step() {
    frameCount++;
    if (frameCount < 15) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFrame(cycleLoop[currentLoopIndex], 20.4, 0, 90);
    currentLoopIndex++;

    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }

    window.requestAnimationFrame(step);
}

function init() {
    window.requestAnimationFrame(step);
}