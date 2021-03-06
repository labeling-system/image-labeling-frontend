import React from 'react';
import { getSelectionImage } from '../api/selection';
import Selection from './selection'
import {ERROR} from '../util/const'
export class canvas extends React.Component {

    constructor(props) {
        super(props);
        this.mySelection = [];
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.setWorkspaceSetting = this.setWorkspaceSetting.bind(this);

        this.state = {
            cursor: "default",
            inputLabel: "",
        }
    }

    currentId = 0;             
    widthSize = 1000;
    heightSize = 800;
    tempWidth = 0;
    tempHeight = 0;
    onSelection = false; 
    onResize = false;
    canResize = false;
    scaledHeight = 0;
    scaledWidth = 0;
    actualHeight = 0;
    actualWidth = 0;

    // Style for canvas
    setWorkspaceSetting(){
        // console.log("ini data: " +this.props.parentState.data)
        let _setWorkspaceSetting = {
            marginTop: "10px",
            marginLeft: "10px",
            display: "flex",
            backgroundImage: "url(" + this.props.parentState.data + ")",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: `${this.heightSize}`,
            width: `${this.widthSize}`,
            position: "relative",
            cursor: `${this.state.cursor}`
        };
        // console.log("yuhu", this.data);
        return _setWorkspaceSetting;
    }

    // Style for input label 
    setInputLabel() {
        let posInputLabel = {
            top: this.getActiveSelection().getY() - 30,
            left: this.getActiveSelection().getX()
        };
        return posInputLabel
    }

    //Show all selection have been selected from daatabase
    async handleGetAllSelection(image_id) {
        let result = null;
        try {
            result = await getSelectionImage(image_id);
        } catch (err) {
            console.log(err);
            
        }    
        if(result != null){
            const count = result.data.count[0];
            const _selections = result.data.selections; 

            for(let i = 0; i < count; i++) {
                let selection = new Selection(this.currentId);
                selection.setCoordinates(_selections[i][0],_selections[i][1]);
                selection.setHeight(parseInt(_selections[i][2]));
                selection.setWidth(parseInt(_selections[i][3]));
                if(_selections[i][4] != null){
                    selection.setLabel(_selections[i][4]);
                }
                this.mySelection.push(selection);
                this.currentId +=1;
                this.props.handleSelections(this.mySelection);
            }
        }
        console.log(this.mySelection);
    }

    // Handle input label
    handleChange = async function(e) {
        await this.setState({
            [e.target.name]: e.target.value
        });
        await this.getActiveSelection().setLabel(this.state.inputLabel);
        await this.props.resetSelectedLabel();
    }

    // Draw all selection from mySelection to canvas
    drawAllSelection() {
        this.ctx.strokeStyle = "red";
        this.ctx.font = "25px Arial";
        for(let i = 0; i < this.mySelection.length; i++) {
            this.ctx.strokeText(this.mySelection[i].getLabel(), this.mySelection[i].getX(), this.mySelection[i].getY() - 5);
            if(this.activeId === this.mySelection[i].getId() && this.props.parentState.resize === true) {
                continue;
            }
            // console.log("check ke ", i);
            this.ctx.strokeRect(
                this.mySelection[i].getX(), 
                this.mySelection[i].getY(), 
                this.mySelection[i].getWidth(), 
                this.mySelection[i].getHeight());
        }
    }

    // Make Active Selection "green"
    drawActiveSelection(id) {
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

    // Get active selection object 
    getActiveSelection() {
        var result = this.mySelection.find(obj => {
            return obj.id === this.activeId
          })        
        return result
    } 
    

    // Delete specific selection with id from mySelection
    deleteSelection(id) {
        if(this.mySelection != null) {
            for(let i = 0; i < this.mySelection.length; i++) {
                if(this.mySelection[i].getId() === id) {
                    this.mySelection.splice(i,1);              
                    this.props.handleSelections(this.mySelection);
                    break;
                }
            }
        }
    }

    // Return clicked selection's id, else return null
    getTargetSelection(x,y) {
        let arr = [];        
        for(let i = 0; i < this.mySelection.length; i++) {
            if(this.isPointInsideRect(x,y,this.mySelection[i].getX(),
                this.mySelection[i].getY(),this.mySelection[i].getWidth(),this.mySelection[i].getHeight())){
                    arr.push(this.mySelection[i].getId());
                }
        }

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
            return id;
        }
        else {
            return null;
        }
    }

    // Clear Canvas
    clear(){
        this.ctx.clearRect(
            0,0,
            (this.widthSize),
            (this.heightSize));
    }

    //Set (x,y) to upper-left side of selection and set width, height to absolute
    normalize() {
        if(this.height < 0) {
            this.startPos.offsetY -=  Math.abs(this.height);
        }

        if(this.width < 0) {
            this.startPos.offsetX -=  Math.abs(this.width);
        }
        
        //Absolute width and height
        this.width = Math.abs(this.width);
        this.height = Math.abs(this.height);
    }    

    onMouseDown({nativeEvent}) {
        // Start selection
        if(this.props.parentState.rectangle === true) {
            this.ctx.strokeStyle = "red";
            this.onSelection=true;
            const {offsetX, offsetY} = nativeEvent;

            this.select = new Selection(this.currentId);

            this.startPos = {offsetX,offsetY};
            this.lastPos = {offsetX,offsetY};
            this.width = 0;
            this.height = 0;
        }    

        // Handle clicked selection
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
        }

        // Handle resized selection
        else if(this.props.parentState.resize === true) {
            if(!this.canResize) {
                return;
            }
            this.onResize = true;
            
            this.select = this.getActiveSelection();            
            let {offsetX,offsetY} = nativeEvent;
            this.lastPos = {offsetX,offsetY};

            offsetX = this.select.getX();
            offsetY = this.select.getY();
            this.startPos = {offsetX,offsetY};

            this.width = this.select.width;
            this.height = this.select.height;

            console.log(this.startPos.offsetX, "  ", this.startPos.offsetY);
            console.log(this.lastPos.offsetX, "  ", this.lastPos.offsetY);
            console.log(this.width, " ", this.height);
        }
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

            this.setCursor(offsetX,offsetY);
            
            if(!this.onResize) {
                return;
            }

            this.lastPos = {offsetX,offsetY};

            //Handle UpperLeft resize                
            if(this.isPointNWRect(
                this.lastPos.offsetX,this.lastPos.offsetY,
                this.startPos.offsetX, this.startPos.offsetY, this.width, this.height)) {
                    let _height  = this.lastPos.offsetY - this.startPos.offsetY;
                    this.startPos.offsetY = this.lastPos.offsetY;
                    this.height -= _height;
                    let _width  = this.lastPos.offsetX - this.startPos.offsetX;
                    this.startPos.offsetX = this.lastPos.offsetX;
                    this.width -= _width;
                }             
            //Handle UpperRight resize                
            else if(this.isPointNERect(
                this.lastPos.offsetX,this.lastPos.offsetY,
                this.startPos.offsetX, this.startPos.offsetY, this.width, this.height)) {
                    let _height  = this.lastPos.offsetY - this.startPos.offsetY;
                    this.startPos.offsetY = this.lastPos.offsetY;
                    this.height -= _height;
                    this.width = this.lastPos.offsetX - this.startPos.offsetX;
                }   
            //Handle DownLeft resize
            else if(this.isPointSWRect(
                this.lastPos.offsetX,this.lastPos.offsetY,
                this.startPos.offsetX, this.startPos.offsetY, this.width, this.height)) {
                    let _width  = this.lastPos.offsetX - this.startPos.offsetX;
                    this.startPos.offsetX = this.lastPos.offsetX;
                    this.width -= _width;
                    this.height = this.lastPos.offsetY - this.startPos.offsetY;
                }
            //Handle DownRight resize
            else if(this.isPointSERect(
                this.lastPos.offsetX,this.lastPos.offsetY,
                this.startPos.offsetX, this.startPos.offsetY, this.width, this.height)) {
                    this.width = this.lastPos.offsetX - this.startPos.offsetX;
                    this.height = this.lastPos.offsetY - this.startPos.offsetY;
                }
            //Handle Right resize
            else if(this.isPointERect(
                this.lastPos.offsetX,this.lastPos.offsetY,
                this.startPos.offsetX, this.startPos.offsetY, this.width, this.height)) {
                    this.width = this.lastPos.offsetX - this.startPos.offsetX;
                }
            //Handle Left resize
            else if(this.isPointWRect(
                this.lastPos.offsetX,this.lastPos.offsetY,
                this.startPos.offsetX, this.startPos.offsetY, this.width, this.height)) {
                    let _width  = this.lastPos.offsetX - this.startPos.offsetX;
                    this.startPos.offsetX = this.lastPos.offsetX;
                    this.width -= _width;
                }
            //Handle Down resize                
            else if(this.isPointSRect(
                this.lastPos.offsetX,this.lastPos.offsetY,
                this.startPos.offsetX, this.startPos.offsetY, this.width, this.height)) {
                    this.height = this.lastPos.offsetY - this.startPos.offsetY;
                }
            //Handle Up Resize
            else if(this.isPointNRect(
                this.lastPos.offsetX,this.lastPos.offsetY,
                this.startPos.offsetX, this.startPos.offsetY, this.width, this.height)) {
                    let _height  = this.lastPos.offsetY - this.startPos.offsetY;
                    this.startPos.offsetY = this.lastPos.offsetY;
                    this.height -= _height;
                } 
            
           
            this.clear();
            this.drawAllSelection();

            this.ctx.strokeStyle = "green";
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
            
            this.normalize();

            this.select.setCoordinates(this.startPos.offsetX,this.startPos.offsetY);
            this.select.setHeight(this.height);
            this.select.setWidth(this.width);
            
            //Insert to mySelection
            if(!this.select.empty()) {
                this.mySelection.push(this.select);            
                this.currentId += 1;
                this.props.handleSelections(this.mySelection);
            }
            
            console.log("Result: ", this.select);
            console.log(this.mySelection);
        }

        else if(this.props.parentState.resize === true) {
            this.onResize = false;
            this.normalize();

            //Update resized selection 
            this.select.setCoordinates(this.startPos.offsetX,this.startPos.offsetY);
            this.select.setHeight(this.height);
            this.select.setWidth(this.width);
            this.props.handleSelections(this.mySelection);

            console.log("Result: ", this.select);
            console.log(this.mySelection);
        }
    }



    //All method for checking point position toward selection
    //For cursor behavior
    isPointInsideRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight){
        return  (rectX <= pointX) && (rectX + rectWidth >= pointX) &&
                     (rectY <= pointY) && (rectY + rectHeight >= pointY);
    }

    isPointNSRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectX <= pointX && rectX + rectWidth >= pointX && pointY >= rectY - ERROR && pointY <= rectY + ERROR )
            || (rectX <= pointX && rectX + rectWidth >= pointX && pointY >= (rectY + rectHeight) - ERROR && pointY <= (rectY + rectHeight) + ERROR);
    }

    isPointEWRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectY <= pointY && rectY + rectHeight >= pointY && pointX >= rectX - ERROR && pointX <= rectX + ERROR)
            || (rectY <= pointY && rectY + rectHeight >= pointY && pointX >= (rectX + rectWidth) - ERROR &&  pointX <= (rectX + rectWidth) + ERROR );
    }

    isPointNESWRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectX + rectWidth + ERROR >= pointX && rectX + rectWidth - ERROR <= pointX &&  rectY + ERROR >= pointY && rectY - ERROR <= pointY )
            || (rectY + rectHeight + ERROR >= pointY && rectY + rectHeight - ERROR <= pointY &&  rectX + ERROR >= pointX && rectX - ERROR <= pointX )
    }
    
    isPointNWSERect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectX + rectWidth + ERROR >= pointX && rectX + rectWidth - ERROR <= pointX && rectY + rectHeight + ERROR >= pointY && rectY + rectHeight - ERROR <= pointY  )
            || (rectY + ERROR >= pointY && rectY - ERROR <= pointY  &&  rectX + ERROR >= pointX && rectX - ERROR <= pointX )
    }

    //For cursor behavior on update resize
    isPointERect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectY <= pointY && rectY + rectHeight >= pointY && pointX >= (rectX + rectWidth) - ERROR &&  pointX <= (rectX + rectWidth) + ERROR );
    }

    isPointWRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectY <= pointY && rectY + rectHeight >= pointY && pointX >= rectX - ERROR && pointX <= rectX + ERROR);            
    }

    isPointNRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectX <= pointX && rectX + rectWidth >= pointX && pointY >= rectY - ERROR && pointY <= rectY + ERROR );            
    }

    isPointSRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectX <= pointX && rectX + rectWidth >= pointX && pointY >= (rectY + rectHeight) - ERROR && pointY <= (rectY + rectHeight) + ERROR);
    }

    isPointNERect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectX + rectWidth + ERROR >= pointX && rectX + rectWidth - ERROR <= pointX &&  rectY + ERROR >= pointY && rectY - ERROR <= pointY )            
    }

    isPointSWRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectY + rectHeight + ERROR >= pointY && rectY + rectHeight - ERROR <= pointY &&  rectX + ERROR >= pointX && rectX - ERROR <= pointX )
    }    

    isPointSERect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectX + rectWidth + ERROR >= pointX && rectX + rectWidth - ERROR <= pointX && rectY + rectHeight + ERROR >= pointY && rectY + rectHeight - ERROR <= pointY  )            
    }
    
    isPointNWRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight) {
        return (rectY + ERROR >= pointY && rectY - ERROR <= pointY  &&  rectX + ERROR >= pointX && rectX - ERROR <= pointX )
    }

    //Handle mouse cursor
    setCursor(x,y) {
        if(this.props.parentState.rectangle === true) {
            if(this.state.cursor === "crosshair") {
                return;
            }
            else{
                this.setState({cursor: "crosshair"});
            }
        }

        if(this.props.parentState.resize === true) {       
            let obj = this.getActiveSelection();

            if(this.isPointEWRect(x,y,obj.getX(),
            obj.getY(),obj.getWidth(),obj.getHeight())
            && this.onResize === false) {
                this.canResize = true;
                if(this.state.cursor === "ew-resize") {
                    return;
                }
                else{
                    this.setState({cursor: "ew-resize"});
                }
            }
            else if(this.isPointNSRect(x,y,obj.getX(),
            obj.getY(),obj.getWidth(),obj.getHeight())
            && this.onResize === false) {
                this.canResize = true;
                if(this.state.cursor === "ns-resize") {
                    return;
                }
                else{
                    this.setState({cursor: "ns-resize"});
                }
            }
            else if(this.isPointNESWRect(x,y,obj.getX(),
            obj.getY(),obj.getWidth(),obj.getHeight())
            && this.onResize === false) {
                this.canResize = true;
                if(this.state.cursor === "nesw-resize") {
                    return;
                }
                else{
                    this.setState({cursor: "nesw-resize"});
                }
            }
            else if(this.isPointNWSERect(x,y,obj.getX(),
            obj.getY(),obj.getWidth(),obj.getHeight())
            && this.onResize === false) {
                this.canResize = true;
                if(this.state.cursor === "nwse-resize") {
                    return;
                }
                else{
                    this.setState({cursor: "nwse-resize"});
                }
            }
            else if (this.onResize === false) {
                this.canResize = false;
                if(this.state.cursor === "default") {
                    return;
                }
                else{
                    this.setState({cursor: "default"});
                }
            }

        }
        if(this.props.parentState.edit === true) {
            if(this.state.cursor === "default") {
                return;
            }
            else{
                this.setState({cursor: "default"});
            }
        }
    }    

    componentDidUpdate() {

        //Initialize mySelection
        if(this.props.parentState.isNext === true){
            if(this.props.parentState.anActive === true){
                this.activeId = null;
                this.props.parentNotActive();
            }
            this.mySelection = [];
            this.clear();
        }
        else{
            //Handle delete selection
            if(this.props.parentState.delete === true ) {
            this.deleteSelection(this.activeId);
            console.log(this.mySelection);
            this.clear();
            this.drawAllSelection();
            this.activeId = null;
            }
            //Rectangle cursor trigger
            if(this.props.parentState.rectangle === true) {
                this.setCursor(0,0);
                this.clear();
                this.drawAllSelection();
                this.activeId = null;
            }
            // Default cursor trigger
            if(this.props.parentState.edit === true) {
                this.setCursor(0,0);
            } 
            
            // Handle onClick change input label state
            if(this.props.parentState.anActive === true) {
                if(this.props.parentState.selectedLabel !== "" && this.props.parentState.selectedLabel !== this.state.inputLabel) {
                    this.setState({inputLabel: this.props.parentState.selectedLabel});
                }
                if (this.getActiveSelection().getLabel() === "") {
                    this.getActiveSelection().setLabel(this.state.inputLabel);
                }
            }
        }
    }

    // Canvas properties
    componentDidMount() {

        this.canvas.width = this.widthSize;
        this.canvas.height = this.heightSize;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2;      

        //Check Redirected from edit or not
        let initialURL = window.location.href;
        let temp = initialURL.split('/')[2].split(':')[0];
        temp = "http://" + temp + ":3000/workspace";
        let result = null;
        if(initialURL !== temp){
            temp += "/";
            try{
                result = initialURL.match(new RegExp(temp  + '(\\w+)'))[1];
                this.handleGetAllSelection(result);
            }
            catch (err){
                alert("Click OK to continue");
            }
        }
    }

    //Render Canvas
    render() {
        return (
            <div id = "canvas" style = {this.setWorkspaceSetting()} >                
                <canvas className="canvas"
                ref = {(ref) => (this.canvas = ref)}
                onMouseDown = {this.onMouseDown}
                onMouseMove = {this.onMouseMove}
                onMouseUp = {this.onMouseUp}
                    />
                {
                    (this.activeId != null && this.props.parentState.edit === true) ?
                    <input name="inputLabel" style = {this.setInputLabel()} type="text" id="input-label" value={this.state.inputLabel} onChange={(e) => {this.handleChange(e)}}/>

                    : null
                }
            </div>
        );
    }
}

export default canvas

