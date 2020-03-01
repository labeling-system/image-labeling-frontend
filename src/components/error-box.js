import React, { Component } from 'react';

export default class ErrorBox extends Component {
    render() {
        return (
            <div className="error-box">{this.props.error}</div>
        );
    }
}