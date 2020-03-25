import React, { Component } from 'react';
import Canvas from "../components/canvas";
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

class Workspace extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isInitiated: false,
            buttonText: "Start"
            
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        // this.handleGetAllImages = this.handleGetAllImages.bind(this);
        // this.handleRedirectToWorkspace = this.handleRedirectToWorkspace.bind(this);
    }

    handleOnClick(parameter, text){
        this.setState({isInitiated: parameter,
                        buttonText: text});
        console.log(parameter);
    }
      
    render(){
        return !this.props.isAuth ? <Redirect to='/login'/> : (
            
            <div>
                <h2>Workspace</h2>
                <Canvas />
                {
                    this.state.isInitiated ? <Button variant="primary" onClick={() => this.handleOnClick(false, "Start")}>{this.state.buttonText}</Button> : <Button variant="success" onClick={() => this.handleOnClick(true, "Save")}>{this.state.buttonText}</Button>
                }
            </div>
                
        )
    }
}

export default Workspace;