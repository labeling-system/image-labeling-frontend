import React, { Component } from 'react';
import { postImage } from '../api/image';
import ErrorBox from '../components/error-box';
import InfoBox from '../components/info-box';

class Others extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            uploaded: false,
            error: '',
        }
        this.handleUpload = this.handleUpload.bind(this);
    }

    async handleUpload(files: FileList) {
        let filenames = []
        Array.from(files).forEach(file => {
            filenames.push(file.name);
        });
        try {
            let result = await postImage(filenames);
            this.setState({ uploaded: true });
            this.setState({ error: '' });
        } catch (err) {
            console.log(err)
            this.setState({ uploaded: false });
            this.setState({ error: 'Error, please contact the administrator' });
        }
    }

    render() {
        return (
            <div id='other'>
                <h2>Upload Images</h2>
                <p>
                    <b className='red'>[WARNING]</b> By uploading new images, you will lost all your labeled images you have
                    now. Please make sure you have download all xml/json output file before.
                </p>

                <ol>
                    <li>Put all images in directory <code>upload</code>.</li>
                    <li>Click the Choose File below, and choose the <code>upload</code> folder.</li>
                </ol>
                {
                    this.state.error != '' ? <ErrorBox error={this.state.error} /> : null
                }
                {
                    this.state.uploaded ?
                        <InfoBox info='Successfully Uploaded Images' /> :
                        <input
                            directory=''
                            webkitdirectory=''
                            type='file'
                            onChange={(e) => this.handleUpload(e.target.files)}
                        />
                }

            </div>
        )
    }
}

export default Others;