import React, { Component } from 'react';
import Canvas from "../components/canvas";
import Button from 'react-bootstrap/Button';
import Tools from "../components/tools";
import { STATE_EDIT, STATE_RECTANGLE, STATE_OTHER} from "../util/const";
import { Redirect } from 'react-router-dom';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { getMostUsedLabels } from '../api/label';
import { pingImage } from '../api/image';


class Workspace extends Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: true,
            rectangle: false,
            other: false,
            isInitiated: false,
            data: 'images/data.jpeg',
            buttonText: 'Start',
            labelList : [],
            error: '',
            intervalId: 0
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handler = this.handler.bind(this);
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

            // ping backend
            let intervalId = setInterval(async () => {
                await pingImage(1);
            }, 3000);
            this.setState({ intervalId: intervalId });

        } catch (err) {
            this.setState({ error: err });
        }
    }

    async componentWillUnmount() {
        clearInterval(this.state.intervalId);
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
        const title = {
            fontWeight: "bold"
        }
        console.log(this.props.isAuth)
        return !this.props.isAuth ? <Redirect to='/login'/> : (       
            <Row>
                <Col>
                    <div className ="workspace">
                        <Tools parentState ={this.state} parentHandler = {this.handler} />
                        <Canvas parentState = {this.state} />
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
                        {console.log("other: " + this.state.other)}
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


