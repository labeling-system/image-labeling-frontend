import React from 'react';
import data from '../static/img/data.jpeg';
import Selection from './selection'
import Workspace from '../containers/workspace';
export class canvas extends React.Component {
    constructor(props) {
        super(props);
        
        // this.props = props;
        // console.log(this.props[data]);
        //this.data = props.data;
        this.mySelection = [];
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        if(this.props.parentState.data === "images/data.jpeg"){
            console.log("yuhu");
        }
        console.log(this.props.parentState.data);
        
        //console.log(props.data);        
    }

    currentId = 0;             
    widthSize = 1000;
    heightSize = 800;
    tempWidth = 0;
    tempHeight = 0;
    data = "url(" + this.props.parentState.data + ")";
    // temp = this.props.parentState.data;
    // data = `url(${require(this.temp)})`;
    
    
    

    setWorkspaceSetting = {
        marginTop: "10px",
        marginLeft: "10px",
        display: "flex",
        //backgroundImage: `url(${this.data})`,
        //{ console.log(data); }
        //backgroundImage: `url(${data})`,
        backgroundImage: this.data,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        height: `${this.heightSize}`,
        width: `${this.widthSize}`
    };

    onSelection = false;

    componentDidMount() {
        console.log("test");
        this.canvas.width = this.widthSize;
        this.canvas.height = this.heightSize;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 3;
        
        // this.canvasRect = this.canvas.getBoundingClientRect(); 
        // const image = new Image();
        // // image.onload = drawImageActualSize();
        // image.src = data;
        // // this.ctx.drawImage(image, this.canvasRect.left,this.canvasRect.top);
        // // this.ctx.drawImage(image, 0,0,this.canvas.width,this.canvas.height);
        
        // // drawImageProp(this.ctx,image, 0, 0, this.canvas.width, this.canvas.height);
        // image.onload = () => {
        //     console.log(image.naturalHeight);
        //     let imgHeight = image.naturalHeight;
        //     let imgWidth = image.naturalWidth;
        //     if(image.naturalWidth >= this.canvas.width) {
        //             imgWidth = this.canvas.width
        //         }
        //     if(image.naturalHeight >= this.canvas.height) {
        //         imgHeight = this.canvas.height;
        //     }

        //     this.ctx.drawImage(image, 0,0,imgWidth,imgHeight);
        //     console.log("wakgeng");
        // };    
    }

    drawArea() {
        for(let i = 0; i < this.mySelection.length; i++) {
            console.log("check ke ", i);
            this.ctx.strokeRect(
                this.mySelection[i].getX(), 
                this.mySelection[i].getY(), 
                this.mySelection[i].getWidth(), 
                this.mySelection[i].getHeight());
        }
    }

    clear(){
        this.ctx.clearRect(
            0,0,
            // this.startPos.offsetX,this.startPos.offsetY,
            // (this.lastPos.offsetX - this.startPos.offsetX),
            // (this.lastPos.offsetY - this.startPos.offsetY));
            (this.widthSize),
            (this.heightSize));
    }

    onMouseDown({nativeEvent}) {
        if(this.props.parentState.rectangle === true) {
            this.onSelection=true;
            const {offsetX, offsetY} = nativeEvent;
            // console.log(offsetX, "  ", offsetY);
            this.select = new Selection(this.currentId);
            // this.mySelection.push(this.select);
            
            // select.label.setLabelName("Todo");
            // select.label.setLabelPosition(1,1);
            // console.log(this.select);
            // const {offsetX, offsetY} = nativeEvent;
            // this.onSelection = true;
            this.startPos = {offsetX,offsetY};
            this.lastPos = {offsetX,offsetY};
            this.width = 0;
            this.height = 0;
            // console.log("wak");
            // this.maxSize = {offsetX,offsetY};
        }
    }

    onMouseMove({nativeEvent}) {
        if(this.props.parentState.rectangle === true) {
            if(!this.onSelection) {
                return;
            }
            const {offsetX, offsetY} = nativeEvent;
            this.lastPos = {offsetX,offsetY};
            // if(Math.abs(this.lastPos.offsetX) > Math.abs(this.maxSize.offsetX) ) {
            //     this.maxSize.offsetX = this.lastPos.offsetX;
            // }
            // if(Math.abs(this.lastPos.offsetY) > Math.abs(this.maxSize.offsetY) ) {
            //     this.maxSize.offsetY = this.lastPos.offsetY;
            // }
            
            
            this.width = this.lastPos.offsetX - this.startPos.offsetX;
            this.height = this.lastPos.offsetY - this.startPos.offsetY;
            
            console.log(this.lastPos.offsetX + "  " +this.lastPos.offsetY);
            // console.log(offsetY);
            this.clear();
            this.drawArea();
            this.ctx.strokeRect(
                this.startPos.offsetX, 
                this.startPos.offsetY, 
                this.width, 
                this.height
                );
            }
        }

    onMouseUp({nativeEvent}) {
        if(this.props.parentState.rectangle === true) {
            this.onSelection = false;
            // console.log("geng");
            
            // Bagian membuat koordinat x dan ya di pojok kiri atas
            //Kasus kuadran 2
            if(this.width < 0 && this.height < 0) {
                this.startPos.offsetX =  this.lastPos.offsetX;
                this.startPos.offsetY =  this.lastPos.offsetY;
            }
            //Kasus Kuadran 1
            else if(this.height < 0) {
                this.startPos.offsetY -=  Math.abs(this.height);
            }
            //kasus Kuadran 3
            else if(this.width < 0) {
                this.startPos.offsetX -=  Math.abs(this.width);
            }
            
            //Absolute width and height
            this.width = Math.abs(this.width);
            this.height = Math.abs(this.height);

            this.select.setCoordinates(this.startPos.offsetX,this.startPos.offsetY);
            this.select.setHeight(this.height);
            this.select.setWidth(this.width);
            
            if(!this.select.empty()) {
                // console.log("check");
                this.mySelection.push(this.select);
                this.currentId += 1;
            }
            console.log("Result: ", this.select);
            console.log(this.mySelection);
        }
    }

    render() {
        //console.log(this.props);
        return (
            <div style = {this.setWorkspaceSetting} >                
                <canvas className="canvas"
                ref = {(ref) => (this.canvas = ref)}
                onMouseDown = {this.onMouseDown}
                onMouseMove = {this.onMouseMove}
                onMouseUp = {this.onMouseUp}
                    />
            </div>
        );
    }
}

export default canvas



// class Canvas extends React.Component {

//     componentDidMount() {
//         let edit = this.props.tools.rectangle;
//         console.log(edit);
//         const canvas = this.refs.canvas
//         // const ctx = canvas.getContext("2d")
//         // const img = this.refs.image

//         window.addEventListener('load', () => {
//             // const canvas = document.getElementById("canvas");
//             const ctx = canvas.getContext("2d");
//             const image = new Image();
//             let onSelection = false;
//             let startX; //initial coordinate for X
//             let startY; //initial coordinate for Y
//             let width = 0;
//             let height = 0;
//             let listSelection = []; //All selection box in workspace
//             let id = 0; //Initial id for selection box

//             image.src = asrap;

//             resize();
//             drawImage();

//             function _selection(x, y, width, height) { //Constructor
//                 this.x = x;
//                 this.y = y;
//                 this.width = width;
//                 this.height = height;
//                 this.label_name = "Label 0";
//                 this.label_x = 0;
//                 this.label_y = 0;
//             }

//             function drawImage() { //insert dataset for labelling
//                 ctx.drawImage(image, 10, 10);
//             }

//             function resize() { //size of workspace
//                 // canvas.height = window.innerHeight;
//                 // canvas.width = window.innerWidth;
//                 canvas.height = 1000;
//                 canvas.width = 800;
//             }

//             function startPosition(e) {//start position when mouse down
//                 onSelection = true;
//                 startX = e.clientX;
//                 startY = e.clientY;

//                 listSelection[id] = new _selection(startX, startY, 0, 0);
//                 // console.log(startX, startY, id);
//             }

//             function endPosition() {//ending position when mouse up
//                 onSelection = false;
//                 listSelection[id].width = width;
//                 listSelection[id].height = height;
//                 listSelection[id].label_x = width / 2 + listSelection[id].x;
//                 listSelection[id].label_y = listSelection[id].y - 10;
//                 if (height < 0) {
//                     listSelection[id].label_y += height;
//                 }
//                 listSelection[id].label_name = "Label " + id;
//                 ctx.fillText(listSelection[id].label_name, listSelection[id].label_x, listSelection[id].label_y);
//                 // console.log(listSelection[id].label_x);
//                 id += 1; //increment id
//             }

//             function drawArea() {//draw all selected area in workspace
//                 drawImage();
//                 for (let i = 0; i < listSelection.length; i++) {
//                     ctx.strokeRect(listSelection[i].x, listSelection[i].y, listSelection[i].width, listSelection[i].height);
//                     ctx.fillText(listSelection[i].label_name, listSelection[i].label_x, listSelection[i].label_y);
//                 }
//             }

//             function clear() {
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);
//             }

//             function draw(e) {
//                 if (!onSelection) { return; }
//                 //setting for selection box
                // ctx.strokeStyle = "red";
                // ctx.lineWidth = 3;

//                 //Setting for labelling
//                 ctx.font = "20px Lato";
//                 ctx.fillStyle = "red";
//                 ctx.textAlign = "center";

//                 width = e.clientX - listSelection[id].x;
//                 height = e.clientY - listSelection[id].y;
//                 // console.log(startX,startY,width,height);
//                 clear();
//                 drawArea();
//                 ctx.strokeRect(listSelection[id].x, listSelection[id].y, width, height);


//             }

//             canvas.addEventListener("mousedown", startPosition);
//             canvas.addEventListener("mouseup", endPosition);
//             canvas.addEventListener("mousemove", draw);

//         });
//     }

//     render() {
//         return (
//             <div>                
//                 <canvas ref="canvas" />
//             </div>
//         )

//     }

// }

// export default Canvas;

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