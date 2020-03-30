import React, { Component } from 'react';
import Canvas from "../components/canvas";
import Button from 'react-bootstrap/Button';
import Tools from "../components/tools";
import { STATE_EDIT, STATE_RECTANGLE, STATE_DELETE, STATE_RESIZE} from "../util/const";
import { Redirect } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import { getMostUsedLabels } from '../api/label';

import { getWorkingImage, saveImage } from '../api/selection';


class Workspace extends Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            rectangle: true,
            delete: false,
            resize: false,
            anActive: false,
            isInitiated: false,
            idData: '',
            data: '',
            buttonText: 'Start',
            labelList : [],
            selectedLabel : '',
            error: ''  
             
        };
        
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handler = this.handler.bind(this);
        this.makeActive = this.makeActive.bind(this);
        this.makeNotActive = this.makeNotActive.bind(this);
        this.resetSelectedLabel = this.resetSelectedLabel.bind(this);
        // this.handleGetAllImages = this.handleGetAllImages.bind(this);
        // this.handleRedirectToWorkspace = this.handleRedirectToWorkspace.bind(this);
    }

    async handleOnClick(parameter, text){
        let result;
        if (this.state.isInitiated) {
            //will be changed to save
            result = await getWorkingImage();
        } 
        else {
            result = await getWorkingImage();
        }
        this.setState({ idData: result.data.image_id,
                        data: 'images/' + result.data.filename });

        this.setState({isInitiated: parameter,
                        buttonText: text});
        console.log(parameter);
        console.log(this.state.data);
        console.log(this.state.idData);
    }

    resetSelectedLabel() {
        this.setState({selectedLabel : ""});
    }

    async componentDidMount() {
        try {
            let result = await getMostUsedLabels();
            this.setState({ labelList: result.data.labelList });
            
        } catch (err) {
            this.setState({ error: err });
        }
    }

    makeActive(){
        this.setState({anActive: true});
    }

    makeNotActive(){
        this.setState({anActive: false});
    }

    handleLabelInput(label) {
        this.setState({selectedLabel : label});
    }   


    handler(someState){
        this.setState({[someState]: !this.state[someState]})
        if(this.state.edit === true && someState !== STATE_EDIT) {
            this.setState({edit: false});
        }
        if(this.state.rectangle === true && someState !== STATE_RECTANGLE) {
            this.setState({rectangle: false});
        }
        if(this.state.delete === true && someState !== STATE_DELETE) {
            this.setState({delete: false});
        }
        if(this.state.resize === true && someState !== STATE_RESIZE) {
            this.setState({resize: false});
        }
        
    }

    render() {  
        const title = {
            fontWeight: "bold"
        }
        console.log(this.props.isAuth)
        return !this.props.isAuth ? <Redirect to='/login'/> : (       
            <Row>
                <Col>
                    <div className ="workspace">
                        <Tools parentState ={this.state} parentHandler = {this.handler} parentNotActive = {this.makeNotActive} />
                        <Canvas parentState = {this.state} parentActive = {this.makeActive} parentNotActive = {this.makeNotActive} resetSelectedLabel = {this.resetSelectedLabel}/>
                        {
                            this.state.isInitiated ?
                            <div>
                                <Button variant="success" onClick={() => this.handleOnClick(true, "Next")}>{this.state.buttonText}</Button> 
                            </div> 
                            
                            : (
                                <Button variant="primary" onClick={() => this.handleOnClick(true, "Save")}>{this.state.buttonText}</Button>
                            )    
                        }
                        {console.log("State bapak")}
                        {console.log("rectangle: " + this.state.rectangle)}
                        {console.log("edit: " + this.state.edit)}
                        {console.log("delete: " + this.state.delete)}
                        {console.log("active: " + this.state.anActive)}
                        {console.log("resize: " + this.state.resize)}
                    </div>
                </Col>

                <Col>
                    <Row>
                        <h3 style={title}>Most Used Label</h3>
                    </Row>
                    <Row>
                        <Table striped bordered hover responsive id="tabel">
                            <tbody>
                                {
                                    this.state.labelList.map((label, i) => ( 
                                        <tr key={i}>
                                            <td onClick={() => this.handleLabelInput(label)}>{label}</td>
                                        </tr>))
                                }
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Row> 
        )
    }    
}

export default Workspace;


