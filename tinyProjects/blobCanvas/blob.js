let blobs = new Array();
let curInterval;
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d")

function canvasDraw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    blobs.forEach(function (obj) {
        obj.move();
        obj.draw();
    })
}

function validateBlobSubmission() {
    let text;

    const blobSize = document.getElementById("size").value;
    const blobColor = document.getElementById("color").value;

    if (isNaN(blobSize) || blobSize < 1 || blobSize > 100) {
        text = "not valid";
    } else {
        if (isNaN(curInterval) === false) {
            clearInterval(curInterval)
        }

        const newBlob = new Blob(blobColor, blobSize);
        text = "valid";
        blobs.push(newBlob);
        curInterval = setInterval(canvasDraw, 10);
    }

    document.getElementById("demo").innerHTML = text;
}

class Blob {
    constructor(color, size) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.color = color;
        this.size = size;
        this.xChange = 1;
        this.yChange = 1;
    }

    move() {
        if (this.x >= canvas.width || this.x <= 0) {
            this.xChange *= -1;
        }
        if (this.y >= canvas.height || this.y <= 0) {
            this.yChange *= -1;
        }

        this.x += this.xChange;
        this.y += this.yChange;
    }


    draw() {
        // context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // X, Y, size, starting angle, stop angle
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
    }
}

        // const newBlob1 = new Blob("green", 25);
        // const newBlob2 = new Blob("red", 25);
        // const newBlob3 = new Blob("blue", 25);
        // const newBlob4 = new Blob("orange", 25);

        // blobs.push(newBlob1);
        // blobs.push(newBlob2);
        // blobs.push(newBlob3);
        // blobs.push(newBlob4);

        // setInterval(canvasDraw, 10);