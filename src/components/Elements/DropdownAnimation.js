import React, { Component } from 'react';
import classNames from 'classnames';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';


class DropdownBox extends Component  {
    state = { ddOpen: false }
    toggleOn = () => this.setState({
            ddOpen: true
    })
    toggleOff = () => this.setState({
        ddOpen: false
})
    render() {
        const ddClass = classNames('animated', this.props.title);
        return (
            <div className="box-placeholder">
                <Dropdown isOpen={this.state.ddOpen} onMouseOver={this.toggleOn} onMouseLeave={this.toggleOff}>
                    <DropdownToggle>
                        {this.props.title}
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

const DropdownAnimation = props => {
    const ANIMATIONS = ['bounce','flash','pulse','rubberBand','shake','swing','tada','wobble','bounceIn','bounceInDown','bounceInLeft','bounceInRight','bounceInUp','fadeIn','fadeInDown','fadeInDownBig','fadeInLeft','fadeInLeftBig','fadeInRight','fadeInRightBig','fadeInUp','fadeInUpBig','flip','flipInX','flipInY','lightSpeedIn','rotateIn','rotateInDownLeft','rotateInDownRight','rotateInUpLeft','rotateInUpRight','hinge','rollIn','zoomIn','zoomInDown','zoomInLeft','zoomInRight','zoomInUp']
    return (
        <ContentWrapper>
            <div className="content-heading">
                <div>Dropdown Animations
                    <small>Extends the dropdown effects when open just adding an animation class</small>
                </div>
            </div>
            <Row>
                { ANIMATIONS.map((title, i) => (
                    <Col md={3} key={ i }>
                        <DropdownBox title={title}/>
                    </Col>
                ))}
            </Row>
        </ContentWrapper>
    );
}

export default DropdownBox;