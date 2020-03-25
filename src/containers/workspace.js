import React, { Component } from 'react';
import Canvas from "../components/canvas";
import Tools from "../components/tools";
import { STATE_EDIT, STATE_RECTANGLE, STATE_OTHER} from "../util/const";
import { Redirect } from 'react-router-dom';


class Workspace extends Component{
    constructor(props) {
        super(props);
        this.state = {                    
                edit: true,
                rectangle: false,
                other: false            
        }
        this.handler = this.handler.bind(this);

    }

    handler(someState){
        this.setState({[someState]: !this.state[someState]})
        if(this.state.edit === true && someState !== STATE_EDIT) {
            this.setState({edit: false});
        }
        if(this.state.rectangle === true && someState !== STATE_RECTANGLE) {
            this.setState({rectangle: false});
        }
        if(this.state.other === true && someState !== STATE_OTHER) {
            this.setState({other: false});
        }
    }

    render() {        
        return (    
            <div className ="workspace">
                <Tools parentState ={this.state} parentHandler = {this.handler} />
                <Canvas parentState = {this.state} />
                {/* {console.log("rectangle: " + this.state.rectangle)}
                {console.log("edit: " + this.state.edit)}
                {console.log("other: " + this.state.other)} */}
            </div>        
        )
    }
}

export default Workspace;


