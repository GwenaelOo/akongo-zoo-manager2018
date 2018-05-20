import React from 'react';
import { Grid, Row, Col, Panel, Button, FormControl } from 'react-bootstrap';


class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }
    render() {
        return (
            <div>
                <label htmlFor="userName">{this.props.label}</label>
                <FormControl id={this.props.id} name={this.props.name} placeholder={this.props.placeholder} value={this.state.value} type="text" className="form-control" />
            </div>
        )
    }
}


export default TextInput;