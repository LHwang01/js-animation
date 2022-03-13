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

async function walkToKnight() {
    while (true) {
        frameCount++;

        if (frameCount < 15) {
            window.requestAnimationFrame(walkToKnight);
            return;
        }

        frameCount = 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (xPos >= 130) {
            drawFrame(cycleLoop[currentLoopIndex], 17.2, 150, 80);
            break;
        }

        drawFrame(cycleLoop[currentLoopIndex], 20.4, xPos += 20, 80);
        currentLoopIndex++;

        if (currentLoopIndex >= cycleLoop.length) {
            currentLoopIndex = 0;
        }
    }

    await sleep(1000);

    drawBubble(ctx, 0, 0, 300, 30, 20, "Where is King Clovis' Chamber?", "white", "black", 80, 20);

    //double while loop
}

function sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
}

function drawBubble(ctx, x, y, w, h, radius, text, backgroundColor, textColor, textX, textY)
{
   var r = x + w;
   var b = y + h;

   ctx.beginPath();
   ctx.fillStyle = backgroundColor;

   ctx.strokeStyle = "black";
   ctx.lineWidth = "1.5";
   ctx.moveTo(x + radius, y);

   ctx.lineTo(r - radius, y);
   ctx.quadraticCurveTo(r, y, r, y + radius);
   ctx.lineTo(r, y + h-radius);
   ctx.quadraticCurveTo(r, b, r - radius, b);
   ctx.lineTo(x + radius, b);
   ctx.quadraticCurveTo(x, b, x, b - radius);
   ctx.lineTo(x, y + radius);
   ctx.quadraticCurveTo(x, y, x + radius, y);

   ctx.fill();

   ctx.stroke();

   ctx.fillStyle = textColor;

   ctx.font = "12px Times New Roman";
   ctx.fillText(text, textX, textY);
}

function init() {
    walkToKnight();
}
