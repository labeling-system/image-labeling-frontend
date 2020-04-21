import React, { Component } from 'react'
import { STATE_EDIT, STATE_RECTANGLE, STATE_DELETE, STATE_RESIZE } from '../util/const'
import { GiArrowCursor } from 'react-icons/gi'
import { MdDelete } from 'react-icons/md'
import { IoMdResize } from 'react-icons/io'
import { FaPlus } from 'react-icons/fa'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'

function renderPopover (value) {
  return (
    <Popover>
      <Popover.Content>{value}</Popover.Content>
    </Popover>
  )
}

export class Tools extends Component {
  constructor (props) {
    super(props)
    this.handleChangeEdit = this.handleChangeEdit.bind(this)
    this.handleChangeRectangle = this.handleChangeRectangle.bind(this)
    this.handleChangeDelete = this.handleChangeDelete.bind(this)
    this.handleChangeResize = this.handleChangeResize.bind(this)
  }

  handleChangeEdit () {
    this.props.parentHandler(STATE_EDIT)
  }

  handleChangeRectangle () {
    this.props.parentNotActive()
    this.props.parentHandler(STATE_RECTANGLE)
  }

  handleChangeDelete () {
    if (this.props.parentState.anActive === true) {
      this.props.parentHandler(STATE_DELETE)
      this.props.parentNotActive()
    }
  }

  handleChangeResize () {
    if (this.props.parentState.anActive === true) {
      this.props.parentHandler(STATE_RESIZE)
    }
  }

  render () {
    return (
      <div id="tools">
        <OverlayTrigger
          placement="right"
          delay={{ show: 250 }}
          overlay={renderPopover('Add selection')}
        >
          <Button variant="outline-info"
            className={this.props.parentState.rectangle ? 'active' : ''}
            onClick={this.handleChangeRectangle}>
            <FaPlus /></Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="right"
          delay={{ show: 250 }}
          overlay={renderPopover('Select selection')}
        >
          <Button variant="outline-info"
            className={this.props.parentState.edit ? 'active' : ''}
            onClick={this.handleChangeEdit}>
            <GiArrowCursor /></Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="right"
          delay={{ show: 250 }}
          overlay={renderPopover('Resize')}
        >
          {
            this.props.parentState.anActive
              ? <Button variant="outline-info"
                className={this.props.parentState.resize ? 'active' : ''}
                name="resize" onClick={this.handleChangeResize}>
                <IoMdResize /></Button>
              : <Button variant='outline-light' className='disabled' disabled>
                <IoMdResize /></Button>

          }
        </OverlayTrigger>

        <OverlayTrigger
          placement="right"
          delay={{ show: 250 }}
          overlay={renderPopover('Delete')}
        >
          {
            this.props.parentState.anActive
              ? <Button variant='outline-info'
                className={this.props.parentState.delete ? 'active' : ''}
                onClick={this.handleChangeDelete}>
                <MdDelete /></Button>
              : <Button variant='outline-light' className='disabled' disabled>
                <MdDelete /></Button>

          }
        </OverlayTrigger>
      </div>
    )
  }
}

export default Tools
