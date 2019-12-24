const maxLevel = 3;
const ballRadius = 20;
const starORadius = 30;
const starIRadius = 15

function drawTree() {
    const canvas = document.getElementById("canvas");
    canvas.setAttribute("width", window.innerWidth)
    canvas.setAttribute("height", window.innerHeight)
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);
    let xpos = canvas.width / 2;
    let ypos = 200;
    const height = canvas.height / (maxLevel + 2);
    const width = canvas.width / (maxLevel * 2);
    ctx.font = Math.floor(Math.max(canvas.height / 30, canvas.width / 50)) + "px Comic Sans MS, Comic Sans, cursive";
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.fillText("Merry Christmas!", xpos, ypos - 70);
    ctx.moveTo(xpos, ypos);
    drawNode(ctx, xpos, ypos, 0, height, width);
}

function drawNode(ctx, xpos, ypos, level, h, w) {
    if (level < maxLevel) {
        ctx.beginPath();
        ctx.moveTo(xpos, ypos)
        ctx.lineTo(xpos - w, ypos + h)
        ctx.moveTo(xpos, ypos)
        ctx.lineTo(xpos + w, ypos + h)
        ctx.lineWidth = 10
        ctx.strokeStyle = "green"
        ctx.stroke();
        drawNode(ctx, xpos - w, ypos + h, level + 1, h, w / 2);
        drawNode(ctx, xpos + w, ypos + h, level + 1, h, w / 2);
    }
    if (level == 0)
        drawStar(ctx, xpos, ypos, 30, 15)
    else
        drawBall(ctx, xpos, ypos);
}

function drawBall(ctx, xpos, ypos) {
    ctx.beginPath();
    ctx.arc(xpos, ypos, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = getRandomColor();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fill();
}

function drawStar(ctx, xpos, ypos) {
    let rot = Math.PI / 2 * 3;
    let x = xpos;
    let y = ypos;
    const step = Math.PI / 5;

    ctx.strokeSyle = "black";
    ctx.beginPath();
    ctx.moveTo(xpos, ypos - starORadius)
    for (i = 0; i < 5; i++) {
        x = xpos + Math.cos(rot) * starORadius;
        y = ypos + Math.sin(rot) * starORadius;
        ctx.lineTo(x, y)
        rot += step

        x = xpos + Math.cos(rot) * starIRadius;
        y = ypos + Math.sin(rot) * starIRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(xpos, ypos - starORadius)
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "yellow";
    ctx.fill();
}

function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

drawTree();