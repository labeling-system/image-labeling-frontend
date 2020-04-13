import React, { Component } from 'react';
import Canvas from "../components/canvas";
import Button from 'react-bootstrap/Button';
import Tools from "../components/tools";
import { STATE_EDIT, STATE_RECTANGLE, STATE_DELETE, STATE_RESIZE} from "../util/const";
import { Redirect } from 'react-router-dom';
import { getMostUsedLabels } from '../api/label';
import { pingImage } from '../api/image';
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
            finish: false,
            idData: '',
            data: '',
            buttonText: 'Save',
            isNext: false,
            labelList : [],
            selectedLabel : '',
            intervalId: 0,             
            selections: [],
            error: ''  
             
        };
        
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handler = this.handler.bind(this);
        this.makeActive = this.makeActive.bind(this);
        this.makeNotActive = this.makeNotActive.bind(this);
        this.resetSelectedLabel = this.resetSelectedLabel.bind(this);
        this.handleSelections = this.handleSelections.bind(this);
    }

    // click handler for Save button
    async handleOnClick(){
        let result;
        try {
            result = await saveImage(this.state.idData, this.state.selections);
            console.log(result);
            if (typeof result.data.error === 'undefined')
            {
                this.setState({ idData: result.data.image_id,
                                data: result.data.uri,
                                width: result.data.width,
                                height: result.data.height,
                                selections: [],
                                isNext: true,
                                finish: false});
                console.log(this.state.finish);
                console.log("data hasil req: " +this.state.data)
            }
            else
            {
                console.log(result.data.error);
                alert("All images are done processed!");
                this.setState({finish: true});
            }
        } catch (err) {
            this.setState({ error: err });
        }
        console.log(this.state.data);
        console.log(this.state.idData);
        this.setState({isNext: false})
    }

    resetSelectedLabel() {
        this.setState({selectedLabel : ""});
    }

    async componentDidMount() {
        try {
            let labelResult = await getMostUsedLabels();
            this.setState({ labelList: labelResult.data.labelList });

            // ping backend
            let intervalId = setInterval(async () => {
                await pingImage(1);
            }, 3000);
            this.setState({ intervalId: intervalId });
            
        } catch (err) {
            this.setState({ error: err });
        }

        // get image for the first time
        try {
            let imageResult = await getWorkingImage();
            console.log(imageResult)
            if (typeof imageResult.data.error === 'undefined')
            {
                this.setState({ idData: imageResult.data.image_id,
                                data: imageResult.data.uri,
                                width: imageResult.data.width,
                                height: imageResult.data.height,
                                finish: false});
                console.log(this.state.finish);
            }
            else
            {
                alert("All images are done processed!");
                this.setState({finish: true});
            }
            
        } catch (err) {
            this.setState({ error: err });
        }
    }

    async componentWillUnmount() {
        clearInterval(this.state.intervalId);
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

    handleSelections(mySelections){
        this.setState({selections: mySelections});
        console.log(this.state.selections.length, "yuhu");
        console.log(this.state.selections);
    }

    render() {
        console.log(this.props.isAuth)
        return !this.props.isAuth ? <Redirect to='/login'/> : (       
            <div id="workspace">
                <div className="workspace-wrapper">
                    <div className ="workspace">
                        <Tools parentState ={this.state} parentHandler = {this.handler} parentNotActive = {this.makeNotActive} />
                        <div>
                            <Canvas parentState = {this.state} parentActive = {this.makeActive} parentNotActive = {this.makeNotActive} resetSelectedLabel = {this.resetSelectedLabel} handleSelections = {this.handleSelections}/>
                        </div>
                    </div>
                </div>
                <div id='recommendation'>
                    <div className='recommendation-label'>
                        <h4>Most Used Label</h4>
                        {
                            this.state.labelList.map((label, i) => ( 
                                <Button variant="info" size='lg' onClick={() => this.handleLabelInput(label)}>{label}</Button>
                                ))
                            }
                    </div>
                    <div>
                        {
                            <Button variant="success" size='lg' block onClick={() => this.handleOnClick()} disabled={this.state.finish}>{this.state.buttonText}</Button>
                             
                        }
                    </div>
                </div>
            </div> 
        )
    }    
}

export default Workspace;
