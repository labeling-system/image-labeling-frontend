import React, { Component } from 'react';
import Canvas from "../components/canvas";
import { Redirect } from 'react-router-dom';

class Workspace extends Component{
    render(){
        return !this.props.isAuth ? <Redirect to='/login'/> : (
            
            <div>
                <h2>Workspace</h2>                                 
                <Canvas />                
            </div>
                
        )
    }
}

export default Workspace;