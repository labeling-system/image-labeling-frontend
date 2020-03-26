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
        this.setWorkspaceSetting = this.setWorkspaceSetting.bind(this);

        this.state = {

        }
    }


    currentId = 0;             
    widthSize = 1000;
    heightSize = 800;
    tempWidth = 0;
    tempHeight = 0;
    onSelection = false;    
    data = "url(" + this.props.parentState.data + ")";

    handleChange = (e) => {
        this.getActiveSelection().setLabel(e.target.value)
    }

    setWorkspaceSetting(x,y){
        let _setWorkspaceSetting = {
            marginTop: "10px",
            marginLeft: "10px",
            display: "flex",
            backgroundImage: this.data,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: `${this.heightSize}`,
            width: `${this.widthSize}`,
            position: "relative",
            cursor: `${this.setCursor(x,y)}`
        };
        return _setWorkspaceSetting;
    }

    getActiveSelection() {
        var result = this.mySelection.find(obj => {
            return obj.id === this.activeId
          })
        
        return result
    }

    setInputLabel() {
        let posInputLabel = {
            top: this.getActiveSelection().getY() - 30,
            left: this.getActiveSelection().getX()

        };

        return posInputLabel
    }


    componentDidMount() {
        this.canvas.width = this.widthSize;
        this.canvas.height = this.heightSize;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2;        
    }

    drawAllSelection() {
        this.ctx.strokeStyle = "red";
        this.ctx.font = "25px Arial";
        for(let i = 0; i < this.mySelection.length; i++) {
            // console.log("check ke ", i);
            this.ctx.strokeRect(
                this.mySelection[i].getX(), 
                this.mySelection[i].getY(), 
                this.mySelection[i].getWidth(), 
                this.mySelection[i].getHeight());
            this.ctx.strokeText(this.mySelection[i].getLabel(), this.mySelection[i].getX(), this.mySelection[i].getY() - 5);
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
        if(this.mySelection != null) {
            for(let i = 0; i < this.mySelection.length; i++) {
                if(this.mySelection[i].getId() === id) {
                    this.mySelection.splice(i,1);              
                    break;
                }
            }
        }
    }


    componentDidUpdate() {
        if(this.props.parentState.delete === true ) {
            this.deleteSelection(this.activeId);
            console.log(this.mySelection);
            this.clear();
            this.drawAllSelection();
            this.activeId = null;
            console.log("wak");
        }
        if(this.props.parentState.rectangle === true) {
            this.clear();
            this.drawAllSelection();
            this.activeId = null;
        }
        console.log("geng");
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

        else if(this.props.parentState.edit === true) {
            const {offsetX,offsetY} = nativeEvent;
            this.clear();
            this.drawAllSelection();
            this.activeId = this.getTargetSelection(offsetX,offsetY);
            this.drawActiveSelection(this.activeId);
            console.log("active id :", this.activeId);
            if(this.activeId == null){
                this.props.parentNotActive();
            }
            else {
                this.props.parentActive();
            }
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
            
        else if(this.props.parentState.resize === true) {
            const {offsetX, offsetY} = nativeEvent;
            console.log(offsetX, "  " ,offsetY);
            this.setWorkspaceSetting(offsetX,offsetY);
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

    isPointNSRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectX <= pointX && rectX + rectWidth >= pointX && pointY === rectY)
            || (rectX <= pointX && rectX + rectWidth >= pointX && pointY === rectY + rectHeight);
    }

    isPointEWRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectY <= pointY && rectY + rectHeight >= pointY && pointX === rectX)
            || (rectY <= pointY && rectY + rectHeight >= pointY && pointX === rectX + rectWidth);
    }

    setCursor(x,y) {
        if(this.props.parentState.rectangle === true) {
            return "crosshair";
        }
        if(this.props.parentState.resize === true) {       
            console.log("wak wak")     ;
            let obj = this.getActiveSelection();

            if(this.isPointEWRect(x,y,obj.getX(),
            obj.getY(),obj.getWidth(),obj.getHeight())) {
                console.log("kena  kiri kanan");
                return "ew-resize";
            }
            if(this.isPointNSRect(x,y,obj.getX(),
            obj.getY(),obj.getWidth(),obj.getHeight())) {
                console.log("kena  atas bawah");
                return "ns-resize";
            }

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
                {
                    (this.activeId != null && this.props.parentState.edit === true) ?
                        // (this.props.parentState.delete !== true ||
                        //     this.props.parentState.rectangle !== true ||
                        //         this.props.parentState.resize !== true
                        //      )) ?
                    <input style = {this.setInputLabel()} type="text" id="input-label" onChange={this.handleChange}/>

                    : null
                }
                {/* {this.clear()}
                {this.drawAllSelection()} */}
            </div>
        );
    }
}

export default canvas

