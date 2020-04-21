import React, { Component, useState } from 'react'
import { postImage, deleteAllImages } from '../api/image'
import { Redirect } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Resizer from 'react-image-file-resizer'

class Others extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploaded: false,
      error: '',
      isLoading: false
    }
    this.handleUpload = this.handleUpload.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  getImage (url, file) {
    return new Promise(function (resolve, reject) {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        'JPEG',
        30,
        0,
        uri => {
          const uriFile = uri

          var img = new Image()
          img.onload = function () {
            const _file = []
            _file.push(file.name)
            _file.push(this.width)
            _file.push(this.height)
            _file.push(uriFile)
            resolve(_file)
          }
          img.onerror = function () {
            reject(url)
          }
          img.src = url
        },
        'base64'
      )
    })
  }

  processFiles (files) {
    const _filesPromises = []
    const _URL = window.URL || window.webkitURL

    Array.from(files).forEach(async file => {
      await _filesPromises.push(this.getImage(_URL.createObjectURL(file), file))
    })

    return _filesPromises
  }

  async handleUpload (files) {
    this.setState({ isLoading: true })

    try {
      const _files = await Promise.all(this.processFiles(files))
      await deleteAllImages()
      await postImage(_files)
      this.setState({ uploaded: true })
      this.setState({ error: '' })
    } catch (err) {
      console.log(err)
      this.setState({ uploaded: false })
      this.setState({ error: err + ', please contact the administrator' })
    }
    this.setState({ isLoading: false })
  }

  handleClose () {
    this.setState({ error: '' })
  }

  render () {
    return !this.props.isAuth ? <Redirect to='/login'/> : (
      <div id='other' className='parent-wrapper'>
        <div className='wrapper'>
          <h2 className='page-title'>Upload Images</h2>
          <Alert variant='danger'>
                        By uploading new images, you will lost all your labeled images you have
                        now. Please make sure you have download all xml/json output file before.
          </Alert>
          <p>Choose images from a directory to upload</p>
          {
            this.state.error !== ''
              ? <Alert variant="danger" onClose={this.handleClose} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                  {this.state.error}
                </p>
              </Alert>
              : null
          }
          {
            this.state.uploaded
              ? <Alert variant='success'>Successfully Uploaded Images</Alert>
              : <ModalUpload handleUpload={this.handleUpload} isLoading={this.state.isLoading} />
          }

          <h2 className='page-title'>Download</h2>
          <p>Below is output of selection in JSON and XML format.</p>
          <Button onClick={() => this.downloadXML()}>Download XML</Button> {'  '}
          <Button onClick={() => this.downloadJSON()}>Download JSON</Button>
        </div>
      </div>
    )
  }

  async downloadXML () {
    console.log('download XML')
    try {
      fetch('http://localhost:5000/downloadxml')
        .then(response => {
          response.blob().then(blob => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'label.zip'
            a.click()
          })
          // window.location.href = response.url;
		    })
      this.setState({ error: '' })
    } catch (err) {
      console.log(err)
      this.setState({ error: 'Error, please contact the administrator' })
    }
  }

  async downloadJSON () {
    console.log('download JSON')
    try {
      fetch('http://localhost:5000/downloadjson')
        .then(response => {
          response.blob().then(blob => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'label.zip'
            a.click()
          })
          // window.location.href = response.url;
		    })
      this.setState({ error: '' })
    } catch (err) {
      console.log(err)
      this.setState({ error: 'Error, please contact the administrator' })
    }
  }
}

function ModalUpload (props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      {
        props.isLoading
          ? <Button variant="primary" onClick={handleShow} disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            {' '}Uploading...
          </Button>
          : <Button variant="primary" onClick={handleShow}>
                    Upload
          </Button>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    By uploading new images, you will <b className='red'>lost</b> all your labeled images you have
                    now. Please make sure you have <b className='green'>download</b> all xml/json output file before.
                    If you want to proceed, browse the directory.
        </Modal.Body>
        <Modal.Footer>
          <input
            directory=''
            webkitdirectory=''
            type='file'
            onChange={(e) => {
              props.handleUpload(e.target.files)
              handleClose()
            }}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Others
