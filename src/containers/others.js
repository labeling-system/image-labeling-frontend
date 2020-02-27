import React, { Component } from 'react';

export class Others extends Component {
    constructor(props: any) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(files: FileList) {
        Array.from(files).forEach(file => {
            console.log(file.name);
        });
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
                <input
                    directory=''
                    webkitdirectory=''
                    type='file'
                    onChange={(e) => this.handleUpload(e.target.files)}
                />
            </div>
        )
    }
}

export default Others;