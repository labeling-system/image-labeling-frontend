import React, { Component } from 'react';

export default class InfoBox extends Component {
    render() {
        return (
            <div className="info-box">{this.props.info}</div>
        );
    }
}