import React, { Component } from 'react';
import classNames from 'classnames';
//import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import DropzonePhoto from './DropzonePhoto';

const ddClass = classNames('animated', 'pulse');



class DropzonePhotoDropDown extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayEdit: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.displayEdit) !== JSON.stringify(nextProps.displayEdit)) // Check if it's a new user, you can also use some unique, like the ID
        {
            this.forceUpdate()
        }
    }

    componentWillMount() {

        // this.setState({
        //     displayEdit: this.props.displayEdit
        // })
        // console.log(this.state.displayEdit)
    }

    state = { ddOpen: false }
    toggleOn = () => this.setState({
        ddOpen: true
    })
    toggleOff = () => this.setState({
        ddOpen: false
    })

    render() {
        if (this.state.displayEdit === true) {
            return (

                <Dropdown isOpen={this.state.ddOpen} onMouseOver={this.toggleOn} onMouseLeave={this.toggleOff}>
                    <DropdownToggle style={{ backgroundColor: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)' }} >
                        <i class="fa fa-pencil-square-o fa-3x"></i>
                    </DropdownToggle>
                    <DropdownMenu className={ddClass}>
                        <DropdownItem>Editer</DropdownItem>
                        <DropdownItem>Supprimer</DropdownItem>
                    </DropdownMenu>

                </Dropdown>
            )

        } else {
            return (
                <div>
                </div>
            )
        }

        ;
    }
}

export default DropzonePhotoDropDown;