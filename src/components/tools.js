import React, { Component } from 'react'
import { STATE_EDIT, STATE_RECTANGLE, STATE_DELETE} from "../util/const";
export class Tools extends Component {
    constructor(props) {
        super(props);
        this.handleChangeEdit = this.handleChangeEdit.bind(this);
        this.handleChangeRectangle = this.handleChangeRectangle.bind(this);
        this.handleChangeDelete = this.handleChangeDelete.bind(this);

    }
    handleChangeEdit () {
        this.props.parentHandler(STATE_EDIT);        
    }
    handleChangeRectangle () {
        this.props.parentNotActive();
        this.props.parentHandler(STATE_RECTANGLE);
    }
    handleChangeDelete () {
        if(this.props.parentState.anActive === true){
            this.props.parentHandler(STATE_DELETE);
            this.props.parentNotActive();
        }
    }

    render() {
        return (            
            <div className="tools">

                {/* {console.log("check: " + this.props.parentState)} */}
                <div className="tools-word">Tools: </div>
                <button 
                    className={this.props.parentState.edit ? 'active' : 'not-active'}
                    name="edit" onClick={this.handleChangeEdit}>
                    Edit
                </button>
                <button 
                    className={this.props.parentState.rectangle ? 'active' : 'not-active'}
                    name="rectangle" onClick={this.handleChangeRectangle}>
                    Rectangle
                </button>       
                <button 
                    className={this.props.parentState.delete ? 'active' : 'not-active'}
                    name="delete" onClick={this.handleChangeDelete}>
                    Delete
                </button>     
            </div>
        )
    }
}

export default Tools;
