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
let xPos = -80;

function init() {
    startAnimation();
}

async function startAnimation() {
    //The main animation function
    while (true) {
        while (!(xPos >= 250)) {
            frameCount++;

            if (frameCount < 15) {
                window.requestAnimationFrame(startAnimation);
                return;
            }

            frameCount = 0;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawFrame(cycleLoop[currentLoopIndex], 20.4, xPos += 20, 80);
            currentLoopIndex++;

            if (currentLoopIndex >= cycleLoop.length) {
                currentLoopIndex = 0;
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame(cycleLoop[currentLoopIndex], 17.2, 250, 80);

        await sleep(1000);

        drawBubble(ctx, 0, 0, 300, 30, 20, "Where is King Clovis' Chamber?", "white", "brown", 80, 20, "12px Times New Roman");

        await sleep(2500);

        drawBubble(ctx, 0, 0, 300, 30, 20, "Right down the hall. Check in with the other knights before entering.", "white", "gray", 12, 19, "10px Times New Roman");

        await sleep(3000);

        drawBubble(ctx, 0, 0, 300, 30, 20, "Understood. Long live the king.", "white", "brown", 80, 20, "12px Times New Roman");

        await sleep(3000);

        ctx.clearRect(2, 0, canvas.width, canvas.height);
        drawFrame(2, 20.4, 250, 80);

        await sleep(250);

        xPos = -80;
        continue;
    }
}

function drawBubble(ctx, x, y, w, h, radius, text, backgroundColor, textColor, textX, textY, font) {
    //Draws the speech bubble for characters to talk
    var r = x + w;
    var b = y + h;

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;

    ctx.strokeStyle = "black";
    ctx.lineWidth = "1.5";
    ctx.moveTo(x + radius, y);

    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + h - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);

    ctx.fill();

    ctx.stroke();

    ctx.fillStyle = textColor;

    ctx.font = font;
    ctx.fillText(text, textX, textY);
}

function sleep(milliseconds) {
    //Allows a delay before another function is called
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}