import React, { Component, useState } from 'react';
import { postImage } from '../api/image';
import ErrorBox from '../components/error-box';
import InfoBox from '../components/info-box';
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class Others extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaded: false,
            error: '',
        }
        this.handleUpload = this.handleUpload.bind(this);
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
            this.setState({ error: 'Error, please contact the administrator' });
        }
    }

    render() {
        return !this.props.isAuth ? <Redirect to='/login'/> : (
            <div id='other' className='parent-wrapper'>
                <div className='wrapper'>
                    <h2 className='page-title'>Upload Images</h2>
                    <p>
                        <b className='red'>[WARNING]</b> By uploading new images, you will lost all your labeled images you have
                        now. Please make sure you have download all xml/json output file before.
                    </p>

                    <ol>
                        <li>Put all images in directory <code>upload</code>.</li>
                        <li>Click the Choose File below, and choose the <code>upload</code> folder.</li>
                    </ol>
                    {
                        this.state.error !== '' ? <ErrorBox error={this.state.error} /> : null
                    }
                    {
                        this.state.uploaded ?
                        <InfoBox info='Successfully Uploaded Images' /> :
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