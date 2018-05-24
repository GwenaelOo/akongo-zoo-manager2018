import React, { Component } from 'react'
import Select from 'react-select'

const options = [
    { value: 'LC', label: 'Préoccupation mineure (LC)' },
    { value: 'NT', label: 'Espèce quasi menacée (NT)' },
    { value: 'VU', label: 'Espèce vulnérable (VU)' },
    { value: 'EN', label: 'Espèce en danger (EN)' },
    { value: 'CR', label: "En danger critique d'extinction (CR)" },
    { value: 'EW', label: "Éteint à l'état sauvage (EW)" },
    { value: 'EX', label: 'Éteint (EX)' },
    { value: 'DD', label: 'Données insuffisantes (DD)' },
    { value: 'NE', label: 'Non-Évalué (NE)' },
  ]

class IUCNSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: options
        }
    }
    handleChange(){
        console.log('je change')
    }
    render() {
        return (
            <div>
                <Select options={this.state.options} onChange={this.handleChange()} />
            </div>
        )
    }
}


export default IUCNSelector;