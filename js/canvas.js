window.addEventListener('load', () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    let onSelection = false; 
    let startX; //initial coordinate for X
    let startY; //initial coordinate for Y
    let width = 0;
    let height = 0;
    let listSelection = []; //All selection box in workspace
    let id = 0; //Initial id for selection box

    image.src = "data/dataset.jpeg";        

    resize();
    drawImage(); 

    function _selection(x,y, width, height){ //Constructor
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    function drawImage(){ //insert dataset for labelling
        ctx.drawImage(image,10,10);
    }

    function resize(){ //size of workspace
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }

    function startPosition(e){//start position when mouse down
        onSelection = true;
        startX = e.clientX;
        startY = e.clientY;

        listSelection[id] = new _selection(startX,startY, 0, 0);
        // console.log(startX, startY, id);
    }
    
    function endPosition(){//ending position when mouse up
        onSelection = false;
        listSelection[id].width = width;
        listSelection[id].height = height;
        // console.log(listSelection.length);
        id += 1;
    }

    function drawArea(){//draw all selected area in workspace
        drawImage();
        for(let i = 0 ; i < listSelection.length ; i++){
            ctx.strokeRect(listSelection[i].x,listSelection[i].y,listSelection[i].width,listSelection[i].height);
        }
    }

    function clear(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }

    function draw(e){
        if(!onSelection){return;}
        ctx.strokeStyle ="red";
        ctx.lineWidth = 3;

        width = e.clientX - listSelection[id].x;
        height = e.clientY - listSelection[id].y;
        // console.log(startX,startY,width,height);
        clear();
        drawArea();
        ctx.strokeRect(listSelection[id].x,listSelection[id].y,width,height);
    }

    canvas.addEventListener("mousedown", startPosition); 
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

});

 