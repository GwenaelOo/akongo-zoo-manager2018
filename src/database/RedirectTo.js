
import React from 'react';
import { Router, Route, Redirect, Link, History, withRouter } from 'react-router-dom';

class RedirectTo extends React.Component {

    render() {
        console.log('je suis la pourtant')
       return(
            <Redirect to={this.props.destination} />
        )
    }
}

export default RedirectTo