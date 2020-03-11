import React, { Component } from 'react';
import { getAllImages } from '../api/image';
import { Redirect } from 'react-router-dom';
import { UNLABELED, LABELED, EDITING } from '../util/const';

const ID = 0;
const STATUS = 1;
const FILENAME = 2;

// TODO: implement pagination
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            error: '',
            redirect: false
        };
        this.handleGetAllImages = this.handleGetAllImages.bind(this);
        this.handleRedirectToWorkspace = this.handleRedirectToWorkspace.bind(this);
    }

    // Unused, will be used to implement refresh button
    async handleGetAllImages() {
        try {
            let result = await getAllImages();
            this.setState({ images: result.data.images });
            this.setState({ error: '' });
        } catch (err) {
            console.log(err);
            this.setState({ error: 'Error, please contact the administrator' });
        }

    }

    // TODO: tell workspace its id
    handleRedirectToWorkspace() {
        this.setState({ redirect: true })
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/workspace' />
        }
    }

    async componentDidMount() {
        try {
            let result = await getAllImages();
            this.setState({ images: result.data.images });
            this.setState({ error: '' });
        } catch (err) {
            console.log(err);
            this.setState({ error: 'Error, please contact the administrator' });
        }
    }

    render() {
        return !this.props.isAuth ? <Redirect to='/login'/> : (
            <div id='edit'>
                {this.renderRedirect()}
                <h2>Edit</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Filename</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.images.map((image, i) => (
                                <tr id={'edit-image-' + image[ID]} key={i} onClick={this.handleRedirectToWorkspace}>
                                    <td>{i + 1}</td>
                                    <td>{image[FILENAME]}</td>
                                    {
                                        image[STATUS] === UNLABELED && <td className='edit-image-unlabeled'>{image[STATUS]}</td>
                                    }
                                    {
                                        image[STATUS] === LABELED && <td className='edit-image-labeled'>{image[STATUS]}</td>
                                    }
                                    {
                                        image[STATUS] === EDITING && <td className='edit-image-editing'>{image[STATUS]}</td>
                                    }
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Edit;