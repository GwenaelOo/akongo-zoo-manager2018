import React from 'react';
import { Router, Route, Link, History, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap'

class EventWidget extends React.Component {


    handleEditClic(specieId) {

    }
    render() {
        return (
            <div className="col-xl-4">
            {/* START card */}
            <div className="card">
            <Link to={{
                        pathname: "EventScreen",
                        state: { eventId: this.props.eventData.eventId }
                    }}>
                <div className="row row-flush">
                    <div className="col-5 d-flex align-items-center justify-content-center" style={{background: "url('img/bg2.jpg')", backgroundSize: 'cover'}}></div>
                    <div className="col-7">
                        <div className="p-3">
                            <div className="float-right"><a className="btn btn-primary btn-sm" href="">Register</a>
                            </div>
                            <p>
                                <span className="text-lg">16</span>Aug</p>
                            <p>
                                <strong>EVENT INVITATION</strong>
                            </p>
                            <p>{this.props.eventData.eventName}</p>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
            {/* END card */}
        </div>
        );
    }

}

export default EventWidget;

