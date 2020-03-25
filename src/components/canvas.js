import React from 'react';
// import data from '../static/img/data.jpeg';
import Selection from './selection'
export class canvas extends React.Component {
    


    constructor(props) {
        super(props);
        this.mySelection = [];
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }


    currentId = 0;             
    widthSize = 1000;
    heightSize = 800;
    tempWidth = 0;
    tempHeight = 0;
    onSelection = false;    
    data = "url(" + this.props.parentState.data + ")";

    setWorkspaceSetting(){
        let _setWorkspaceSetting = {
            marginTop: "10px",
            marginLeft: "10px",
            display: "flex",
            backgroundImage: this.data,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: `${this.heightSize}`,
            width: `${this.widthSize}`,
            cursor: `${this.setCursor()}`
        };
        return _setWorkspaceSetting;
    }


    componentDidMount() {
        this.canvas.width = this.widthSize;
        this.canvas.height = this.heightSize;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2;        
    }

    drawAllSelection() {
        for(let i = 0; i < this.mySelection.length; i++) {
            // console.log("check ke ", i);
            this.ctx.strokeRect(
                this.mySelection[i].getX(), 
                this.mySelection[i].getY(), 
                this.mySelection[i].getWidth(), 
                this.mySelection[i].getHeight());
        }
    }

    drawActiveSelection(id) {
        // console.log("ini id nya ", id);
        if(this.mySelection != null) {
            for(let i = 0; i < this.mySelection.length; i++) {
                if(this.mySelection[i].getId() === id) {
                    if(this.props.parentState.edit === true) {
                        this.ctx.strokeStyle = "green";
                    }
                    this.ctx.strokeRect(
                        this.mySelection[i].getX(), 
                        this.mySelection[i].getY(), 
                        this.mySelection[i].getWidth(), 
                        this.mySelection[i].getHeight());
                    break;
                }                
            }                        
        }                
    }

    deleteSelection(id) {
        // if()
    }

    clear(){
        this.ctx.clearRect(
            0,0,
            (this.widthSize),
            (this.heightSize));
    }

    onMouseDown({nativeEvent}) {
        if(this.props.parentState.rectangle === true) {
            this.ctx.strokeStyle = "red";
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

        }
        // else if(this.props.parentState.edit === false) {

        // }

        else if(this.props.parentState.edit === true) {
            const {offsetX,offsetY} = nativeEvent;
            this.ctx.strokeStyle = "red";
            this.drawAllSelection();
            this.drawActiveSelection(this.getTargetSelection(offsetX,offsetY));
            this.props.parentActive();
            // console.log(this.getTargetSelection(offsetX,offsetY));
        }

        // else if()
    }

    onMouseMove({nativeEvent}) {
        if(this.props.parentState.rectangle === true) {
            if(!this.onSelection) {
                return;
            }
            const {offsetX, offsetY} = nativeEvent;
            this.lastPos = {offsetX,offsetY};
            
            
            this.width = this.lastPos.offsetX - this.startPos.offsetX;
            this.height = this.lastPos.offsetY - this.startPos.offsetY;
            
            console.log(this.lastPos.offsetX + "  " +this.lastPos.offsetY);
            // console.log(offsetY);
            this.clear();
            this.drawAllSelection();
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

    isPointInsideRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight){
        return  (rectX <= pointX) && (rectX + rectWidth >= pointX) &&
                     (rectY <= pointY) && (rectY + rectHeight >= pointY);
    }


    setCursor() {
        if(this.props.parentState.rectangle === true) {
            return "crosshair";
        }
        else {
            return "default"
        }
    }    

    getTargetSelection(x,y) {
        let arr = [];        
        for(let i = 0; i < this.mySelection.length; i++) {
            // console.log(this.mySelection.length);
            if(this.isPointInsideRect(x,y,this.mySelection[i].getX(),
                this.mySelection[i].getY(),this.mySelection[i].getWidth(),this.mySelection[i].getHeight())){
                    // console.log("geng");
                    arr.push(this.mySelection[i].getId());
                }
        }
        // console.log(arr);

        if(arr.length !== 0) {
            let minWidth = this.mySelection[0].getWidth();
            let minHeight = this.mySelection[0].getHeight();
            let id = 0;
            for(let i = 0; i < arr.length; i++) {
                if(this.mySelection[i].getWidth() <= minWidth && this.mySelection[i].getHeight() <= minHeight) {
                    minWidth = this.mySelection[i].getWidth();
                    minHeight = this.mySelection[i].getHeight();
                    id = arr[i];
                }
            }
            // console.log("yg aktif ", id);
            return id;
        }
        else {
            return null;
        }
    }

    render() {
        //console.log(this.props);
        return (
            <div style = {this.setWorkspaceSetting()} >                
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

