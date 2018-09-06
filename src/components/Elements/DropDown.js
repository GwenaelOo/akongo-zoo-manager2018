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
            <div className="box-placeholder">
                <Dropdown isOpen={this.state.ddOpen} toggle={this.toggle}>
                    <DropdownToggle>
                        dropdown
                    </DropdownToggle>
                    <DropdownMenu className={ddClass}>
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Another action</DropdownItem>
                        <DropdownItem active>Active Item</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Separated link</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default DropdownBox
