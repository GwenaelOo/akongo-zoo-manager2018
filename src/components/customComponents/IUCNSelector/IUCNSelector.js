import React from 'react';
import { Grid, Row, Col, Panel, Button, FormControl } from 'react-bootstrap';


class IUCNSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }
    render() {
        return (
            <div>
                <label htmlFor="userName">{this.props.name}</label>
                <FormControl componentClass="select" defaultValue={this.props.value} required="required" className="form-control">
                    <option></option>
                    <option>Préoccupation mineure (LC)</option>
                    <option>Espèce quasi menacée (NT)</option>
                    <option>Espèce vulnérable (VU)</option>
                    <option>Espèce en danger (EN)</option>
                    <option>En danger critique d'extinction (CR)</option>
                    <option>Éteint à l'état sauvage (EW)</option>
                    <option>Éteint (EX)</option>
                    <option>Données insuffisantes (DD)</option>
                    <option>Non-Évalué (NE)</option>
                </FormControl>
            </div>
        )
    }
}


export default IUCNSelector;