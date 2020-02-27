import React from 'react';
import asrap from '../static/img/data.jpeg';


class Canvas extends React.Component {

    componentDidMount() {
        const canvas = this.refs.canvas
        // const ctx = canvas.getContext("2d")
        // const img = this.refs.image

        window.addEventListener('load', () => {
            // const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            const image = new Image();
            let onSelection = false;
            let startX; //initial coordinate for X
            let startY; //initial coordinate for Y
            let width = 0;
            let height = 0;
            let listSelection = []; //All selection box in workspace
            let id = 0; //Initial id for selection box

            image.src = asrap;

            resize();
            drawImage();

            function _selection(x, y, width, height) { //Constructor
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.label_name = "Label 0";
                this.label_x = 0;
                this.label_y = 0;
            }

            function drawImage() { //insert dataset for labelling
                ctx.drawImage(image, 10, 10);
            }

            function resize() { //size of workspace
                canvas.height = window.innerHeight;
                canvas.width = window.innerWidth;
            }

            function startPosition(e) {//start position when mouse down
                onSelection = true;
                startX = e.clientX;
                startY = e.clientY;

                listSelection[id] = new _selection(startX, startY, 0, 0);
                // console.log(startX, startY, id);
            }

            function endPosition() {//ending position when mouse up
                onSelection = false;
                listSelection[id].width = width;
                listSelection[id].height = height;
                listSelection[id].label_x = width / 2 + listSelection[id].x;
                listSelection[id].label_y = listSelection[id].y - 10;
                if (height < 0) {
                    listSelection[id].label_y += height;
                }
                listSelection[id].label_name = "Label " + id;
                ctx.fillText(listSelection[id].label_name, listSelection[id].label_x, listSelection[id].label_y);
                // console.log(listSelection[id].label_x);
                id += 1; //increment id
            }

            function drawArea() {//draw all selected area in workspace
                drawImage();
                for (let i = 0; i < listSelection.length; i++) {
                    ctx.strokeRect(listSelection[i].x, listSelection[i].y, listSelection[i].width, listSelection[i].height);
                    ctx.fillText(listSelection[i].label_name, listSelection[i].label_x, listSelection[i].label_y);
                }
            }

            function clear() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            function draw(e) {
                if (!onSelection) { return; }
                //setting for selection box
                ctx.strokeStyle = "red";
                ctx.lineWidth = 3;

                //Setting for labelling
                ctx.font = "20px Lato";
                ctx.fillStyle = "red";
                ctx.textAlign = "center";

                width = e.clientX - listSelection[id].x;
                height = e.clientY - listSelection[id].y;
                // console.log(startX,startY,width,height);
                clear();
                drawArea();
                ctx.strokeRect(listSelection[id].x, listSelection[id].y, width, height);


            }

            canvas.addEventListener("mousedown", startPosition);
            canvas.addEventListener("mouseup", endPosition);
            canvas.addEventListener("mousemove", draw);

        });
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" />
            </div>
        )

    }

}

export default Canvas;

// window.addEventListener('load', () => {
//     // const canvas = document.getElementById("canvas");
//     const ctx = canvas.getContext("2d");
//     const image = new Image();
//     let onSelection = false; 
//     let startX; //initial coordinate for X
//     let startY; //initial coordinate for Y
//     let width = 0;
//     let height = 0;
//     let listSelection = []; //All selection box in workspace
//     let id = 0; //Initial id for selection box

//     image.src = asrap;        

//     resize();
//     drawImage(); 

//     function _selection(x,y, width, height){ //Constructor
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.label_name = "Label 0";
//         this.label_x = 0;
//         this.label_y = 0;
//     }

//     function drawImage(){ //insert dataset for labelling
//         ctx.drawImage(image,10,10);
//     }

//     function resize(){ //size of workspace
//         canvas.height = window.innerHeight;
//         canvas.width = window.innerWidth;
//     }

//     function startPosition(e){//start position when mouse down
//         onSelection = true;
//         startX = e.clientX;
//         startY = e.clientY;

//         listSelection[id] = new _selection(startX,startY, 0, 0);
//         // console.log(startX, startY, id);
//     }

//     function endPosition(){//ending position when mouse up
//         onSelection = false;
//         listSelection[id].width = width;
//         listSelection[id].height = height;
//         listSelection[id].label_x = width/2 + listSelection[id].x;
//         listSelection[id].label_y = listSelection[id].y - 10;
//         if(height < 0 ){
//             listSelection[id].label_y += height;
//         }
//         listSelection[id].label_name = "Label " + id;
//         ctx.fillText(listSelection[id].label_name, listSelection[id].label_x, listSelection[id].label_y);        
//         // console.log(listSelection[id].label_x);
//         id += 1; //increment id
//     }

//     function drawArea(){//draw all selected area in workspace
//         drawImage();
//         for(let i = 0 ; i < listSelection.length ; i++){
//             ctx.strokeRect(listSelection[i].x,listSelection[i].y,listSelection[i].width,listSelection[i].height);
//             ctx.fillText(listSelection[i].label_name, listSelection[i].label_x, listSelection[i].label_y);        
//         }
//     }

//     function clear(){
//         ctx.clearRect(0,0,canvas.width,canvas.height);
//     }

//     function draw(e){
//         if(!onSelection){return;}
//         //setting for selection box
//         ctx.strokeStyle ="red";
//         ctx.lineWidth = 3;

//         //Setting for labelling
//         ctx.font ="20px Lato";
//         ctx.fillStyle = "red";
//         ctx.textAlign = "center";

//         width = e.clientX - listSelection[id].x;
//         height = e.clientY - listSelection[id].y;
//         // console.log(startX,startY,width,height);
//         clear();
//         drawArea();
//         ctx.strokeRect(listSelection[id].x,listSelection[id].y,width,height);


//     }

//     canvas.addEventListener("mousedown", startPosition); 
//     canvas.addEventListener("mouseup", endPosition);
//     canvas.addEventListener("mousemove", draw);

// });

// export default Canvas;