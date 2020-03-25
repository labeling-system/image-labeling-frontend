import React, { Component } from 'react'
import { STATE_EDIT, STATE_RECTANGLE, STATE_OTHER} from "../util/const";
export class Tools extends Component {
    constructor(props) {
        super(props);
        this.handleChangeEdit = this.handleChangeEdit.bind(this);
        this.handleChangeRectangle = this.handleChangeRectangle.bind(this);
        this.handleChangeOther = this.handleChangeOther.bind(this);

    }
    handleChangeEdit () {
        this.props.parentHandler(STATE_EDIT);
    }
    handleChangeRectangle () {
        this.props.parentHandler(STATE_RECTANGLE);
    }
    handleChangeOther () {
        this.props.parentHandler(STATE_OTHER);
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
                    className={this.props.parentState.other ? 'active' : 'not-active'}
                    name="other" onClick={this.handleChangeOther}>
                    Other
                </button>     
            </div>
        )
    }
}

export default Tools;
