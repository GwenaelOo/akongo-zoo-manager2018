/*!
 *
 * Angle - Bootstrap Admin App + ReactJS
 *
 * Version: 3.8.8
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import $ from 'jquery';

import { initDatabase } from './config/config'

// App Routes
import Routes from './Routes';
import nav from './Nav/Nav'


// Vendor dependencies
import "./Vendor";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'

// Disable warning "Synchronous XMLHttpRequest on the main thread is deprecated.."
$.ajaxPrefilter(o => o.async = true);


class App extends Component {
  render() {
    initDatabase()
    // specify base href from env varible 'WP_BASE_HREF'
    // use only if application isn't served from the root
    // for development it is forced to root only
    /* global WP_BASE_HREF */
    const basename = process.env.NODE_ENV === 'development' ? '/' : (WP_BASE_HREF || '/');

    return (
        <BrowserRouter basename={basename}>
            <Routes />
        </BrowserRouter>
    );

  }
}

export default App;
