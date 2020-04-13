import React, { Component, useState } from 'react';
import { postImage, deleteAllImages } from '../api/image';
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Resizer from 'react-image-file-resizer'; 

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

    getImage(url, file){
        return new Promise(function(resolve, reject){

            let uriFile = '';
            Resizer.imageFileResizer(
                file,
                500,
                500,
                'JPEG',
                30,
                0,
                uri => {
                    uriFile = uri;
                },
                'base64'
            );

            var img = new Image()
            img.onload = function(){
                let _file = [];
                _file.push(file.name);
                _file.push(this.width);
                _file.push(this.height);
                _file.push(uriFile);
                resolve(_file);
            }
            img.onerror = function(){
                reject(url)
            }
            img.src = url
        })
    }

    processFiles(files) {
        let _filesPromises = []
        let _URL = window.URL || window.webkitURL;
    
        Array.from(files).forEach(file => {

            _filesPromises.push(this.getImage(_URL.createObjectURL(file), file))
        });

        return _filesPromises;
    }
        
    async handleUpload(files) {
        try {
            let _files = await Promise.all(this.processFiles(files))
            await deleteAllImages();
            await postImage(_files);
            this.setState({ uploaded: true });
            this.setState({ error: '' });
        } catch(err) {
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
                        <li>Put all images in directory <code>public/images</code>.</li>
                        <li>Click the Choose File below, and choose the <code>public/images</code> folder.</li>
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
                    
                    <h2 className='page-title'>Download</h2>
                    <p>Below is output of selection in JSON and XML format.</p>
                    <Button onClick={() => this.downloadXML()}>Download XML</Button> {'  '}
                    <Button onClick={() => this.downloadJSON()}>Download JSON</Button>
                </div>
            </div>
        )
    }

    async downloadXML() {
        console.log('download XML')
        try {
            fetch('http://localhost:5000/downloadxml')
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'label.zip';
					a.click();
				});
				//window.location.href = response.url;
		    });
            this.setState({ error: '' });
        } catch (err) {
            console.log(err);
            this.setState({ error: 'Error, please contact the administrator' });
        }
    }

    async downloadJSON() {
        console.log("download JSON")
        try {
            fetch('http://localhost:5000/downloadjson')
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'label.zip';
					a.click();
				});
				//window.location.href = response.url;
		    });
            this.setState({ error: '' });
        } catch (err) {
            console.log(err);
            this.setState({ error: 'Error, please contact the administrator' });
        }
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
                    If you want to proceed, browse <code>public/images</code> folder.
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