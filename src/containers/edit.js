import React, { Component } from 'react';
import { getAllImages } from '../api/image';
import { Redirect } from 'react-router-dom';
import { UNLABELED, LABELED, EDITING } from '../util/const';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import { deleteImageById } from '../api/image';

const ID = 0;
const STATUS = 1;
const FILENAME = 2;

const COUNT_PAGE = 25;
const WIDTH_PAGINATION = 4;

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            error: '',
            redirect: false,
            active: 1,
            count: 1,
            editId: '',
            loading: false,
        };
        this.handleGetAllImages = this.handleGetAllImages.bind(this);
        this.handleRedirectToWorkspace = this.handleRedirectToWorkspace.bind(this);
    }

    async handleGetAllImages(page) {
        try {
            let result = await getAllImages(page);
            this.setState({ images: result.data.images });
            this.setState({ error: '' });
            window.scrollTo(0, 0);
        } catch (err) {
            console.log(err);
            this.setState({ error: 'Error, please contact the administrator' });
        }
    }

    async handleDelete(imageId) {
        try {
            await deleteImageById(imageId);
            let result = await getAllImages(1);
            this.setState({ images: result.data.images });
            this.setState({ count: result.data.count})
            this.setState({ error: '' });
        } catch(err) {
            console.log(err);
        }
    }

    // TODO: tell workspace its id
    handleRedirectToWorkspace(imageId, status) {
        if(status !== EDITING){
            this.setState({ redirect: true })
            this.setState({ editId: imageId })
        }
    }

    renderRedirect() {
        if (this.state.redirect) {
            let redirectPage = '/workspace/' + this.state.editId;
            this.setState({ editId: '' });
            return <Redirect to= {redirectPage} />
        }
    }
    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
      
    async componentDidMount() {
        console.log("mounting");
        try {
            console.log("sleeping");
            this.setState({ loading: true });
            await this.sleep(200);
            this.setState({ loading: false });
            console.log("after sleeping");
            let result = await getAllImages(1);
            this.setState({ images: result.data.images });
            this.setState({ count: result.data.count})
            this.setState({ error: '' });
        } catch (err) {
            console.log(err);
            this.setState({ error: 'Error, please contact the administrator' });
        }
    }

    handleChangeActivePage(page) {
        this.setState({active: page});
        this.handleGetAllImages(page);
    }

    render() {
        let active = this.state.active;
        let items = [];
        let max_number = Math.ceil(this.state.count/COUNT_PAGE);

        let start_count = active - WIDTH_PAGINATION;
        let end_count = active + WIDTH_PAGINATION;
        let append = false;
        
        if (end_count >= (max_number - 1)) {
            start_count = start_count - WIDTH_PAGINATION - 2 + (max_number + WIDTH_PAGINATION - end_count);
        }

        if (start_count <= 2) {
            end_count = end_count + WIDTH_PAGINATION + 2 - (start_count + WIDTH_PAGINATION - 1);

            start_count = 1;
        } else {
            let number = 1;
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={() => this.handleChangeActivePage(number)}>
                {number}
                </Pagination.Item>,
            );

            items.push(
                <Pagination.Ellipsis />
            );
        }

        if (end_count >= (max_number - 1)) {
            end_count = max_number;
        } else {
            append = true;
        }

        for (let number = start_count; number <= end_count; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={() => this.handleChangeActivePage(number)}>
                {number}
                </Pagination.Item>,
            );
        }

        if (append) {
            items.push(
                <Pagination.Ellipsis />
            );

            let number = max_number;
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={() => this.handleChangeActivePage(number)}>
                {number}
                </Pagination.Item>,
            );
        }

        return !this.props.isAuth ? <Redirect to='/login'/> : (
            <div id='edit' className='parent-wrapper'>
                {this.renderRedirect()}
                <div className='wrapper'>
                    <h2 className='page-title'>Editor</h2>
                    {
                        this.state.loading?
                        (
                            <div className='edit-loading'>
                                <Spinner animation="border" variant="info" />
                                <span>Fetching images..</span>
                            </div>
                        )
                        :
                        (
                            this.state.images.length !== 0 ?
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Filename</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.images.map((image, i) => (
                                            <tr id={'edit-image-' + image[ID]} key={i} onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.handleRedirectToWorkspace(image[ID],image[STATUS])
                                                }}
                                                className={'edit-row-' + image[STATUS]}
                                            >
                                                
                                                <td>{i + (this.state.active - 1)*COUNT_PAGE + 1}</td>
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
                                                <td>
                                                    {
                                                        image[STATUS] === EDITING? 
                                                        <Button variant="danger" className='edit-image-button' disabled onClick={() => this.handleDelete(image[ID])}>Delete</Button>
                                                        :
                                                        <Button variant="danger" className='edit-image-button' onClick={(e) =>{
                                                            e.stopPropagation();
                                                            this.handleDelete(image[ID])}}>Delete</Button>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table> :
                            <p>There is no images.</p>
                        )
                    }
                    <div className='center'>
                        {
                            this.state.count > COUNT_PAGE && <Pagination>{items}</Pagination>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;