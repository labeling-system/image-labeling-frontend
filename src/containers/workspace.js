import React, { Component } from 'react';
import Canvas from "../components/canvas";
import Button from 'react-bootstrap/Button';
import Tools from "../components/tools";
import { STATE_EDIT, STATE_RECTANGLE, STATE_DELETE} from "../util/const";
import { Redirect } from 'react-router-dom';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { getMostUsedLabels } from '../api/label';


class Workspace extends Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: true,
            rectangle: false,
            delete: false,
            anActive: false,
            isInitiated: false,
            data: 'images/data.jpeg',
            buttonText: 'Start',
            labelList : [],
            error: ''  
            
        };
        console.log("lalala");
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handler = this.handler.bind(this);
        this.handleActive = this.handleActive.bind(this);
        // this.handleGetAllImages = this.handleGetAllImages.bind(this);
        // this.handleRedirectToWorkspace = this.handleRedirectToWorkspace.bind(this);
    }

    handleOnClick(parameter, text){
        this.setState({isInitiated: parameter,
                        buttonText: text});
        console.log(parameter);
    }

    async componentDidMount() {
        try {
            let result = await getMostUsedLabels();
            this.setState({ labelList: result.data.labelList });
            
        } catch (err) {
            this.setState({ error: err });
        }
    }

    handleActive(){
        this.setState({anActive: !this.state.anActive});
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
                        <Tools parentState ={this.state} parentHandler = {this.handler} />
                        <Canvas parentState = {this.state} parentActive = {this.handleActive} />
                        {
                            this.state.isInitiated ?
                            <div> 
                                <Button variant="success" onClick={() => this.handleOnClick(false, "Start")}>{this.state.buttonText}</Button> 
                            </div> 
                            
                            : (
                                <Button variant="primary" onClick={() => this.handleOnClick(true, "Save")}>{this.state.buttonText}</Button>
                            )    
                        }
                        {console.log("rectangle: " + this.state.rectangle)}
                        {console.log("edit: " + this.state.edit)}
                        {console.log("delete: " + this.state.delete)}
                        {console.log("active: " + this.state.anActive)}
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
                                            <td>{label}</td>
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


