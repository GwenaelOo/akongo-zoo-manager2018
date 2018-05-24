import React from 'react';
import { Router, Route, Link, History, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap'

class EnclosureWidget extends React.Component {


    handleEditClic(enclosureId) {

    }
    render() {

        return (
            <Link to={{
                pathname: "EnclosureScreen",
                state: { enclosureId: this.props.enclosureData.enclosureId }
            }}>
                <div className="card">
                    <div className="row row-flush">
                        <div className="col-8">
                            <img className="img-fluid" src={this.props.enclosureData.enclosureProfilePicture} alt="Demo" />
                        </div>
                        <div className="col-4 bg-info d-flex align-items-center justify-content-center">
                            <div className="text-center">
                                <div className="text-lg mt-0">11&deg;</div>
                                <p>{this.props.enclosureData.enclosureName}</p>
                                <em className="fa fa-sun-o fa-2x"></em>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

        );
    }

}

export default EnclosureWidget;

