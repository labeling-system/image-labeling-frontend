window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let selection = false;
    let startX;
    let startY;

    function startPosition(e){
        selection = true;
        startX = e.clientX;
        startY = e.clientY;
        console.log(startX, startY);
    }

    function endPosition(){
        selection = false;
        // ctx.beginPath();
    }

    function draw(e){
        if(!selection){return;}
        ctx.strokeStyle ="red";
        // ctx.lineWidth = 3;

        moveX = e.clientX - startX;
        moveY = e.clientY - startY;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeRect(startX,startY,moveX,moveY);
        console.log(startX,startY,moveX,moveY);

        // ctx.lineWidth = 10;
        // ctx.lineCap = "round";

        // ctx.lineTo(e.clientX, e.clientY);
        // ctx.stroke();
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
    // ctx.strokeStyle ="red";
    // ctx.lineWidth = 3;
    // ctx.strokeRect(50,50,200,200);

});

 