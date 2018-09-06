import React, { Component } from 'react';
import classNames from 'classnames';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';


class DropdownBox extends Component  {
    state = { ddOpen: false }
    toggle = () => this.setState({
            ddOpen: !this.state.ddOpen
    })
    render() {
        const ddClass = classNames('animated', 'tada');
        return (
                <Dropdown isOpen={this.state.ddOpen} toggle={this.toggle}>
                    <DropdownToggle>
                        dropdown
                    </DropdownToggle>
                    <DropdownMenu className={ddClass}>
                        <DropdownItem onClick={this.props.handleCrop}>Cropper</DropdownItem>
                        <DropdownItem >Modifier</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem >Supprimer</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
        );
    }
}

export default DropdownBox
