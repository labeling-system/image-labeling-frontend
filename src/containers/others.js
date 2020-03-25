import React, { Component, useState } from 'react';
import { postImage } from '../api/image';
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


class Others extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaded: false,
            error: '',
        }
        this.handleUpload = this.handleUpload.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async handleUpload(files) {
        let filenames = []
        Array.from(files).forEach(file => {
            filenames.push(file.name);
        });
        try {
            await postImage(filenames);
            this.setState({ uploaded: true });
            this.setState({ error: '' });
        } catch (err) {
            console.log(err);
            this.setState({ uploaded: false });
            this.setState({ error: err + ', please contact the administrator' });
        }
    }

    handleClose() {
        this.setState({ error: '' });
    }

    render() {
        return !this.props.isAuth ? <Redirect to='/login'/> : (
            <div id='other' className='parent-wrapper'>
                <div className='wrapper'>
                    <h2 className='page-title'>Upload Images</h2>
                    <Alert variant='danger'>
                        By uploading new images, you will lost all your labeled images you have
                        now. Please make sure you have download all xml/json output file before.
                    </Alert>
                    <p>Please follow this steps to upload images</p>
                    <ol>
                        <li>Put all images in directory <code>upload</code>.</li>
                        <li>Click the Choose File below, and choose the <code>upload</code> folder.</li>
                    </ol>
                    {
                        this.state.error !== '' ? 
                        <Alert variant="danger" onClose={this.handleClose} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                {this.state.error}
                            </p>
                        </Alert>
                        : null
                    }
                    {
                        this.state.uploaded ?
                        <Alert variant='success'>Successfully Uploaded Images</Alert> :
                        <ModalUpload handleUpload={this.handleUpload} />
                    }
                    
                </div>
            </div>
        )
    }
}

function ModalUpload(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Upload
            </Button>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    By uploading new images, you will <b className='red'>lost</b> all your labeled images you have
                    now. Please make sure you have <b className='green'>download</b> all xml/json output file before.
                    If you want to proceed, browse <code>upload</code> folder.
                </Modal.Body>
                <Modal.Footer>
                    <input
                        directory=''
                        webkitdirectory=''
                        type='file'
                        onChange={(e) => {
                            props.handleUpload(e.target.files);
                            handleClose();
                        }}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
} 

export default Others;